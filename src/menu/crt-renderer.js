const VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uScene;
uniform vec2 uResolution;
uniform vec2 uSourceResolution;
uniform float uTime;
uniform float uCrtEnabled;
uniform float uGrain;
uniform float uCurve;
uniform float uAberration;
uniform float uFade;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 containUv(vec2 uv) {
  float outputAspect = uResolution.x / max(1.0, uResolution.y);
  float sourceAspect = uSourceResolution.x / max(1.0, uSourceResolution.y);
  if (outputAspect > sourceAspect) {
    float scale = sourceAspect / outputAspect;
    uv.x = (uv.x - 0.5) / scale + 0.5;
  } else {
    float scale = outputAspect / sourceAspect;
    uv.y = (uv.y - 0.5) / scale + 0.5;
  }
  return uv;
}

vec2 curveUv(vec2 uv) {
  vec2 centered = uv * 2.0 - 1.0;
  float r2 = dot(centered, centered);
  centered *= 1.0 + r2 * uCurve;
  return centered * 0.5 + 0.5;
}

void main() {
  vec2 uv = containUv(vUv);
  vec2 frameUv = uv;
  if (uCrtEnabled > 0.5) uv = curveUv(uv);
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    gl_FragColor = vec4(0.003, 0.004, 0.006, 1.0);
    return;
  }

  vec2 texel = 1.0 / uSourceResolution;
  float edge = uAberration * texel.x * (0.35 + length(uv - 0.5));
  float red = texture2D(uScene, uv + vec2(edge, 0.0)).r;
  float green = texture2D(uScene, uv).g;
  float blue = texture2D(uScene, uv - vec2(edge, 0.0)).b;
  vec3 color = vec3(red, green, blue);

  if (uCrtEnabled > 0.5) {
    float sourceLine = uv.y * uSourceResolution.y;
    float scanline = 0.90 + 0.10 * sin(sourceLine * 3.14159265);
    float grille = 0.965 + 0.035 * sin(gl_FragCoord.x * 3.14159265);
    float flicker = 0.985 + 0.015 * sin(uTime * 17.0);
    float noise = (hash21(gl_FragCoord.xy + floor(uTime * 48.0)) - 0.5) * uGrain;
    color *= scanline * grille * flicker;
    color += noise;
    color = floor(max(color, 0.0) * 96.0) / 96.0;
  }

  vec2 vignetteUv = frameUv * (1.0 - frameUv.yx);
  float vignette = pow(clamp(vignetteUv.x * vignetteUv.y * 18.0, 0.0, 1.0), 0.22);
  color *= mix(0.16, 1.0, vignette);
  color *= 1.0 - clamp(uFade, 0.0, 1.0);
  gl_FragColor = vec4(color, 1.0);
}`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "Unknown shader compilation error";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createProgram(gl) {
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "Unknown shader link error");
  }
  return program;
}

export function createCrtRenderer(canvas, sourceCanvas) {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    powerPreference: "high-performance"
  });
  if (!gl) throw new Error("WebGL is required for the Phantom Command CRT renderer.");

  const program = createProgram(gl);
  const position = gl.getAttribLocation(program, "aPosition");
  const uniforms = Object.fromEntries([
    "uScene", "uResolution", "uSourceResolution", "uTime", "uCrtEnabled",
    "uGrain", "uCurve", "uAberration", "uFade"
  ].map((name) => [name, gl.getUniformLocation(program, name)]));

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1,
    -1, 1, 1, -1, 1, 1
  ]), gl.STATIC_DRAW);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sourceCanvas.width, sourceCanvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(window.innerWidth * dpr));
    const height = Math.max(1, Math.floor(window.innerHeight * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
  }

  function screenToSource(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const nx = (clientX - rect.left) / Math.max(1, rect.width);
    const ny = (clientY - rect.top) / Math.max(1, rect.height);
    const outputAspect = rect.width / Math.max(1, rect.height);
    const sourceAspect = sourceCanvas.width / sourceCanvas.height;
    let x = nx;
    let y = ny;
    if (outputAspect > sourceAspect) {
      const visibleWidth = sourceAspect / outputAspect;
      x = (nx - (1 - visibleWidth) * 0.5) / visibleWidth;
    } else {
      const visibleHeight = outputAspect / sourceAspect;
      y = (ny - (1 - visibleHeight) * 0.5) / visibleHeight;
    }
    return { x: x * sourceCanvas.width, y: y * sourceCanvas.height, inside: x >= 0 && x <= 1 && y >= 0 && y <= 1 };
  }

  function render(timeSeconds, settings = {}) {
    resize();
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, sourceCanvas);
    gl.uniform1i(uniforms.uScene, 0);
    gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.uSourceResolution, sourceCanvas.width, sourceCanvas.height);
    gl.uniform1f(uniforms.uTime, timeSeconds);
    gl.uniform1f(uniforms.uCrtEnabled, settings.crt === false ? 0 : 1);
    gl.uniform1f(uniforms.uGrain, settings.grain === "high" ? 0.075 : 0.035);
    gl.uniform1f(uniforms.uCurve, settings.crt === false ? 0 : 0.035);
    gl.uniform1f(uniforms.uAberration, settings.crt === false ? 0 : 1.2);
    gl.uniform1f(uniforms.uFade, Number(settings.fade || 0));
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  return { render, resize, screenToSource, gl };
}
