const W = 480;
const H = 270;

const FONT = {
  " ":["00000","00000","00000","00000","00000","00000","00000"],
  "A":["01110","10001","10001","11111","10001","10001","10001"],
  "B":["11110","10001","10001","11110","10001","10001","11110"],
  "C":["01111","10000","10000","10000","10000","10000","01111"],
  "D":["11110","10001","10001","10001","10001","10001","11110"],
  "E":["11111","10000","10000","11110","10000","10000","11111"],
  "F":["11111","10000","10000","11110","10000","10000","10000"],
  "G":["01111","10000","10000","10111","10001","10001","01111"],
  "H":["10001","10001","10001","11111","10001","10001","10001"],
  "I":["11111","00100","00100","00100","00100","00100","11111"],
  "J":["00111","00010","00010","00010","10010","10010","01100"],
  "K":["10001","10010","10100","11000","10100","10010","10001"],
  "L":["10000","10000","10000","10000","10000","10000","11111"],
  "M":["10001","11011","10101","10101","10001","10001","10001"],
  "N":["10001","11001","10101","10011","10001","10001","10001"],
  "O":["01110","10001","10001","10001","10001","10001","01110"],
  "P":["11110","10001","10001","11110","10000","10000","10000"],
  "Q":["01110","10001","10001","10001","10101","10010","01101"],
  "R":["11110","10001","10001","11110","10100","10010","10001"],
  "S":["01111","10000","10000","01110","00001","00001","11110"],
  "T":["11111","00100","00100","00100","00100","00100","00100"],
  "U":["10001","10001","10001","10001","10001","10001","01110"],
  "V":["10001","10001","10001","10001","10001","01010","00100"],
  "W":["10001","10001","10001","10101","10101","11011","10001"],
  "X":["10001","10001","01010","00100","01010","10001","10001"],
  "Y":["10001","10001","01010","00100","00100","00100","00100"],
  "Z":["11111","00001","00010","00100","01000","10000","11111"],
  "0":["01110","10011","10101","10101","11001","10001","01110"],
  "1":["00100","01100","00100","00100","00100","00100","01110"],
  "2":["01110","10001","00001","00010","00100","01000","11111"],
  "3":["11110","00001","00001","01110","00001","00001","11110"],
  "4":["00010","00110","01010","10010","11111","00010","00010"],
  "5":["11111","10000","10000","11110","00001","00001","11110"],
  "6":["01110","10000","10000","11110","10001","10001","01110"],
  "7":["11111","00001","00010","00100","01000","01000","01000"],
  "8":["01110","10001","10001","01110","10001","10001","01110"],
  "9":["01110","10001","10001","01111","00001","00001","01110"],
  ".":["00000","00000","00000","00000","00000","00110","00110"],
  ":":["00000","00110","00110","00000","00110","00110","00000"],
  "-":["00000","00000","00000","11111","00000","00000","00000"],
  "!":["00100","00100","00100","00100","00100","00000","00100"],
  ">" :["10000","01000","00100","01000","10000","00000","00000"],
  "/":["00001","00010","00010","00100","01000","01000","10000"]
};

const palette = {
  night0: "#03050a",
  night1: "#07101a",
  night2: "#111a27",
  cloud: "#182335",
  cloudLight: "#253149",
  moon: "#d5deae",
  moonShade: "#9fae8b",
  groundFar: "#0a1213",
  ground: "#101817",
  groundNear: "#151c19",
  stoneDark: "#242b2d",
  stone: "#3a4240",
  stoneLight: "#58615b",
  moss: "#303d31",
  bone: "#c4c9ad",
  spectral: "#70e4bc",
  spectralHot: "#c2ffe5",
  ember: "#e9b36a",
  text: "#d8dfcb",
  textDim: "#69766e",
  black: "#010203"
};

function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6D2B79F5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function textWidth(text, scale) {
  return Math.max(0, String(text).length * 6 * scale - scale);
}

function drawPixelText(ctx, text, x, y, scale, color, options = {}) {
  const value = String(text).toUpperCase();
  const align = options.align || "left";
  let startX = Math.round(x);
  if (align === "center") startX -= Math.floor(textWidth(value, scale) / 2);
  if (align === "right") startX -= textWidth(value, scale);
  if (options.shadow) drawPixelText(ctx, value, startX + scale, y + scale, scale, options.shadow, { align: "left" });
  ctx.fillStyle = color;
  for (let i = 0; i < value.length; i += 1) {
    const glyph = FONT[value[i]] || FONT[" "];
    for (let row = 0; row < 7; row += 1) {
      for (let col = 0; col < 5; col += 1) {
        if (glyph[row][col] === "1") ctx.fillRect(startX + i * 6 * scale + col * scale, Math.round(y) + row * scale, scale, scale);
      }
    }
  }
}

function drawDither(ctx, x, y, w, h, color, phase = 0) {
  ctx.fillStyle = color;
  for (let yy = 0; yy < h; yy += 2) {
    for (let xx = (yy + phase) % 4; xx < w; xx += 4) ctx.fillRect(Math.round(x + xx), Math.round(y + yy), 1, 1);
  }
}

function drawMoon(ctx, x, y, radius) {
  for (let py = -radius; py <= radius; py += 1) {
    const span = Math.floor(Math.sqrt(radius * radius - py * py));
    ctx.fillStyle = py < -radius * 0.15 ? palette.moon : palette.moonShade;
    ctx.fillRect(x - span, y + py, span * 2, 1);
  }
  ctx.fillStyle = "#7e8d78";
  ctx.fillRect(x - 10, y - 9, 6, 3);
  ctx.fillRect(x + 7, y + 3, 8, 4);
  ctx.fillRect(x - 17, y + 11, 5, 3);
}

function drawTree(ctx, tree, parallaxX) {
  const x = Math.round(tree.x + parallaxX * tree.depth);
  const y = Math.round(tree.y);
  ctx.fillStyle = tree.color;
  ctx.fillRect(x - tree.w / 2, y - tree.h, tree.w, tree.h);
  const branch = (x0, y0, x1, y1, width) => {
    ctx.strokeStyle = tree.color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(Math.round(x0), Math.round(y0));
    ctx.lineTo(Math.round(x1), Math.round(y1));
    ctx.stroke();
  };
  branch(x, y - tree.h + 4, x - tree.spread, y - tree.h - tree.arm, Math.max(1, tree.w - 1));
  branch(x - tree.spread, y - tree.h - tree.arm, x - tree.spread - 8, y - tree.h - tree.arm - 5, 1);
  branch(x, y - tree.h + 8, x + tree.spread, y - tree.h - tree.arm + 2, Math.max(1, tree.w - 1));
  branch(x + tree.spread, y - tree.h - tree.arm + 2, x + tree.spread + 10, y - tree.h - tree.arm - 3, 1);
}

function drawGrave(ctx, grave, parallaxX, selectedGlow = false) {
  const scale = grave.scale;
  const x = Math.round(grave.x + parallaxX * grave.depth);
  const y = Math.round(grave.y);
  const w = Math.max(4, Math.round(grave.w * scale));
  const h = Math.max(6, Math.round(grave.h * scale));
  ctx.fillStyle = "#070a0b";
  ctx.fillRect(x - w / 2 + 2, y - h + 3, w + 2, h);
  ctx.fillStyle = grave.dark;
  if (grave.type === 1) {
    ctx.fillRect(x - Math.floor(w / 2), y - h + Math.floor(h * 0.24), w, Math.floor(h * 0.76));
    ctx.fillRect(x - Math.floor(w * 0.32), y - h, Math.floor(w * 0.64), Math.floor(h * 0.32));
  } else if (grave.type === 2) {
    ctx.fillRect(x - 1, y - h, 3, h);
    ctx.fillRect(x - Math.floor(w / 2), y - h + Math.floor(h * 0.26), w, 3);
  } else {
    ctx.fillRect(x - Math.floor(w / 2), y - h, w, h);
    ctx.fillStyle = grave.light;
    ctx.fillRect(x - Math.floor(w / 2) + 1, y - h + 1, Math.max(1, w - 2), 1);
  }
  ctx.fillStyle = palette.moss;
  if (grave.moss) ctx.fillRect(x - Math.floor(w / 2), y - Math.floor(h * 0.35), Math.max(2, Math.floor(w * 0.5)), 1);
  ctx.fillStyle = palette.groundNear;
  ctx.fillRect(x - Math.floor(w * 0.72), y, Math.floor(w * 1.44), Math.max(1, Math.round(scale * 2)));
  if (selectedGlow) {
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = palette.spectral;
    ctx.fillRect(x - Math.floor(w / 2) - 1, y - h - 2, w + 2, 1);
    ctx.globalAlpha = 1;
  }
}

function drawFence(ctx, y, shift) {
  ctx.fillStyle = "#080b0b";
  for (let x = -10; x < W + 10; x += 18) {
    const px = Math.round(x + shift);
    ctx.fillRect(px, y - 18, 2, 19);
    ctx.fillRect(px - 1, y - 20, 4, 3);
  }
  ctx.fillRect(0, y - 13, W, 2);
  ctx.fillRect(0, y - 5, W, 2);
}

function drawFogBand(ctx, y, time, speed, alpha, offset = 0) {
  ctx.globalAlpha = alpha;
  const drift = ((time * speed + offset) % (W + 90)) - 90;
  ctx.fillStyle = "#93ad9f";
  for (let i = 0; i < 7; i += 1) {
    const x = Math.round(drift + i * 86);
    ctx.fillRect(x, y + (i % 2) * 2, 66, 2);
    ctx.fillRect(x + 12, y - 2 + (i % 3), 38, 2);
    drawDither(ctx, x, y - 4, 70, 10, "#b7c8bd", i);
  }
  ctx.globalAlpha = 1;
}

function drawCrow(ctx, x, y, frame, scale = 1) {
  ctx.fillStyle = palette.black;
  const flap = frame % 2 === 0 ? 0 : 2;
  ctx.fillRect(Math.round(x), Math.round(y), 3 * scale, scale);
  ctx.fillRect(Math.round(x - 3 * scale), Math.round(y - flap * scale), 3 * scale, scale);
  ctx.fillRect(Math.round(x + 3 * scale), Math.round(y - flap * scale), 3 * scale, scale);
}

function drawReaper(ctx, time, parallaxX) {
  const x = Math.round(385 + parallaxX * 0.16);
  const y = 201;
  const sway = Math.round(Math.sin(time * 0.7) * 1.5);
  ctx.fillStyle = "#050708";
  ctx.beginPath();
  ctx.moveTo(x - 24, y);
  ctx.lineTo(x - 16 + sway, y - 53);
  ctx.lineTo(x - 8 + sway, y - 69);
  ctx.lineTo(x + 2 + sway, y - 77);
  ctx.lineTo(x + 12 + sway, y - 68);
  ctx.lineTo(x + 18 + sway, y - 48);
  ctx.lineTo(x + 26, y);
  ctx.fill();
  ctx.fillRect(x - 8 + sway, y - 76, 18, 14);
  ctx.fillStyle = palette.spectral;
  ctx.globalAlpha = 0.55 + Math.sin(time * 2.4) * 0.16;
  ctx.fillRect(x - 3 + sway, y - 70, 2, 1);
  ctx.fillRect(x + 4 + sway, y - 70, 2, 1);
  ctx.globalAlpha = 1;
  ctx.strokeStyle = "#161c1b";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + 11, y - 63);
  ctx.lineTo(x + 36, y - 111);
  ctx.stroke();
  ctx.fillStyle = "#252d2a";
  ctx.fillRect(x + 33, y - 114, 20, 2);
  ctx.fillRect(x + 49, y - 113, 3, 6);
}

function drawMenuTablet(ctx) {
  ctx.fillStyle = "#080d0f";
  ctx.fillRect(44, 105, 214, 122);
  ctx.fillStyle = palette.stoneDark;
  ctx.fillRect(48, 102, 206, 120);
  ctx.fillStyle = palette.stone;
  ctx.fillRect(51, 105, 200, 114);
  ctx.fillStyle = palette.stoneLight;
  ctx.fillRect(52, 106, 198, 2);
  ctx.fillStyle = "#151c1c";
  ctx.fillRect(56, 112, 190, 101);
  drawDither(ctx, 58, 114, 186, 97, "#2d3834", 1);
  ctx.fillStyle = palette.moss;
  ctx.fillRect(49, 104, 54, 3);
  ctx.fillRect(49, 107, 31, 2);
  ctx.fillRect(205, 216, 44, 2);
}

function drawMenuItems(ctx, menu, time) {
  const pulse = 0.65 + Math.sin(time * 4.2) * 0.25;
  for (let index = 0; index < menu.items.length; index += 1) {
    const item = menu.items[index];
    const y = 124 + index * 22;
    const selected = index === menu.selected;
    const color = item.enabled === false ? palette.textDim : selected ? palette.spectralHot : palette.text;
    if (selected) {
      ctx.globalAlpha = pulse;
      ctx.fillStyle = palette.spectral;
      ctx.fillRect(62, y - 3, 176, 17);
      ctx.globalAlpha = 0.16;
      ctx.fillRect(58, y - 5, 184, 21);
      ctx.globalAlpha = 1;
      drawPixelText(ctx, ">", 64, y, 2, palette.spectralHot);
    }
    drawPixelText(ctx, item.label, 78, y, 2, color, { shadow: "#050707" });
    if (item.note) drawPixelText(ctx, item.note, 238, y + 2, 1, item.enabled === false ? "#46504c" : palette.textDim, { align: "right" });
  }
}

function drawPanel(ctx, panel, settings) {
  ctx.globalAlpha = 0.88;
  ctx.fillStyle = "#020405";
  ctx.fillRect(38, 50, 404, 178);
  ctx.globalAlpha = 1;
  ctx.fillStyle = palette.stoneDark;
  ctx.fillRect(53, 60, 374, 158);
  ctx.fillStyle = "#111716";
  ctx.fillRect(58, 65, 364, 148);
  drawDither(ctx, 60, 67, 360, 144, "#26302c", 2);

  if (panel.type === "credits") {
    drawPixelText(ctx, "THE NECROMANCERS LEDGER", 240, 78, 2, palette.spectralHot, { align: "center", shadow: "#07100c" });
    drawPixelText(ctx, "A LUMINARY LABS PRODUCTION", 240, 117, 1, palette.text, { align: "center" });
    drawPixelText(ctx, "BUILT WITH NEXUS ENGINE", 240, 135, 1, palette.text, { align: "center" });
    drawPixelText(ctx, "THE DEAD REMEMBER EVERY COMMAND", 240, 163, 1, palette.textDim, { align: "center" });
    drawPixelText(ctx, "ESC OR ENTER TO RETURN", 240, 196, 1, palette.spectral, { align: "center" });
    return;
  }

  drawPixelText(ctx, "RITUAL SETTINGS", 240, 78, 2, palette.spectralHot, { align: "center", shadow: "#07100c" });
  const rows = [
    ["CRT FILTER", settings.crt ? "ON" : "OFF"],
    ["PHOSPHOR GRAIN", settings.grain.toUpperCase()],
    ["AMBIENCE", settings.ambience ? "ON" : "OFF"],
    ["RETURN", ""]
  ];
  for (let i = 0; i < rows.length; i += 1) {
    const y = 116 + i * 23;
    const selected = panel.selected === i;
    if (selected) {
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = palette.spectral;
      ctx.fillRect(104, y - 4, 272, 17);
      ctx.globalAlpha = 1;
    }
    drawPixelText(ctx, rows[i][0], 116, y, 1, selected ? palette.spectralHot : palette.text);
    drawPixelText(ctx, rows[i][1], 365, y, 1, selected ? palette.spectralHot : palette.textDim, { align: "right" });
  }
}

export function createGraveyardArt(seed = 0x5048414e) {
  const random = mulberry32(seed);
  const stars = Array.from({ length: 48 }, () => ({ x: Math.floor(random() * W), y: 12 + Math.floor(random() * 93), light: random() > 0.78 }));
  const trees = Array.from({ length: 13 }, (_, i) => ({
    x: -20 + i * 42 + random() * 20,
    y: 169 + random() * 15,
    h: 24 + random() * 36,
    w: random() > 0.6 ? 3 : 2,
    spread: 7 + random() * 11,
    arm: 8 + random() * 12,
    depth: 0.03 + random() * 0.06,
    color: random() > 0.5 ? "#070d10" : "#091112"
  }));
  const graves = [];
  for (let row = 0; row < 5; row += 1) {
    const y = 154 + row * 20;
    const count = 11 + row * 3;
    for (let i = 0; i < count; i += 1) {
      const scale = 0.48 + row * 0.17 + random() * 0.08;
      graves.push({
        x: (i + 0.35 + random() * 0.35) * (W / count),
        y: y + random() * 7,
        w: 8 + random() * 6,
        h: 11 + random() * 10,
        scale,
        type: Math.floor(random() * 3),
        moss: random() > 0.42,
        depth: 0.08 + row * 0.025,
        dark: random() > 0.5 ? palette.stoneDark : "#303738",
        light: random() > 0.5 ? palette.stoneLight : "#4d5653"
      });
    }
  }
  graves.sort((a, b) => a.y - b.y);

  return {
    width: W,
    height: H,
    draw(ctx, state) {
      const time = state.time || 0;
      const pointer = state.pointer || { x: W / 2, y: H / 2 };
      const parallaxX = Math.max(-1, Math.min(1, (pointer.x - W / 2) / (W / 2))) * 10;
      const parallaxY = Math.max(-1, Math.min(1, (pointer.y - H / 2) / (H / 2))) * 3;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = palette.night0;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = palette.night1;
      ctx.fillRect(0, 36, W, 102);
      ctx.fillStyle = palette.night2;
      ctx.fillRect(0, 72, W, 67);
      drawDither(ctx, 0, 50, W, 90, "#172234", 1);

      for (const star of stars) {
        const twinkle = star.light && Math.sin(time * 2.2 + star.x) > 0.4;
        ctx.fillStyle = twinkle ? "#c8d9be" : "#607064";
        ctx.fillRect(star.x + Math.round(parallaxX * 0.04), star.y + Math.round(parallaxY * 0.05), twinkle ? 2 : 1, 1);
      }

      drawMoon(ctx, 384 + Math.round(parallaxX * 0.04), 54 + Math.round(parallaxY * 0.04), 31);
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = palette.cloud;
      const cloudShift = ((time * 2.2) % 230) - 60;
      ctx.fillRect(cloudShift, 54, 98, 7);
      ctx.fillRect(cloudShift + 18, 49, 48, 6);
      ctx.fillRect(cloudShift + 195, 79, 112, 6);
      ctx.fillRect(cloudShift + 218, 74, 55, 6);
      ctx.globalAlpha = 1;

      ctx.fillStyle = "#060b0e";
      ctx.fillRect(0, 133, W, 34);
      for (let x = 0; x < W; x += 24) {
        const rise = 3 + ((x * 17) % 9);
        ctx.fillRect(x, 129 - rise, 18, rise + 5);
      }
      trees.forEach((tree) => drawTree(ctx, tree, parallaxX));
      drawFence(ctx, 163, parallaxX * 0.15);

      ctx.fillStyle = palette.groundFar;
      ctx.fillRect(0, 150, W, 43);
      ctx.fillStyle = palette.ground;
      ctx.fillRect(0, 185, W, 46);
      ctx.fillStyle = palette.groundNear;
      ctx.fillRect(0, 224, W, 46);
      drawDither(ctx, 0, 169, W, 100, "#283129", 2);

      for (const grave of graves) drawGrave(ctx, grave, parallaxX);
      drawReaper(ctx, time, parallaxX);

      const crowTime = (time * 23) % (W + 80) - 40;
      drawCrow(ctx, crowTime, 74 + Math.sin(time * 2) * 6, Math.floor(time * 8), 1);
      drawCrow(ctx, W - crowTime * 0.66, 93 + Math.cos(time * 1.6) * 7, Math.floor(time * 7), 1);

      drawFogBand(ctx, 164, time, 10, 0.12, 0);
      drawFogBand(ctx, 206, time, -17, 0.18, 140);
      drawFogBand(ctx, 244, time, 22, 0.22, 280);

      drawPixelText(ctx, "PHANTOM", 54, 34, 4, palette.text, { shadow: "#09110e" });
      drawPixelText(ctx, "COMMAND", 54, 66, 4, palette.spectral, { shadow: "#07100c" });
      drawPixelText(ctx, "THE DEAD AWAIT YOUR ORDER", 57, 96, 1, palette.textDim);

      drawMenuTablet(ctx);
      drawMenuItems(ctx, state.menu, time);

      const flame = 2 + Math.round(Math.sin(time * 9) * 1);
      ctx.fillStyle = palette.ember;
      ctx.fillRect(282, 202 - flame, 2, flame);
      ctx.fillStyle = palette.spectral;
      ctx.fillRect(287, 205 - flame, 2, flame + 1);

      drawPixelText(ctx, "ARROWS OR W S TO CHOOSE   ENTER TO CONFIRM", 240, 255, 1, "#53615a", { align: "center" });
      if (state.menu.items[1]?.enabled === false) drawPixelText(ctx, "NO SOUL IS CURRENTLY BOUND", 472, 10, 1, "#48534e", { align: "right" });

      if (state.panel) drawPanel(ctx, state.panel, state.settings);

      if (state.flash > 0) {
        ctx.globalAlpha = Math.min(1, state.flash);
        ctx.fillStyle = palette.spectralHot;
        ctx.fillRect(0, 0, W, H);
        ctx.globalAlpha = 1;
      }
    }
  };
}
