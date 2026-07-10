import { createCrtRenderer } from "./crt-renderer.js";
import { createGraveyardArt } from "./graveyard-art.js";

const SOURCE_WIDTH = 480;
const SOURCE_HEIGHT = 270;
const SETTINGS_KEY = "phantomCommand.menuSettings";
const SAVE_KEYS = ["phantomCommand.save", "nexus.sceneSnapshot", "phantom.command.campaign"];

const displayCanvas = document.querySelector("#game");
const sceneCanvas = document.createElement("canvas");
sceneCanvas.width = SOURCE_WIDTH;
sceneCanvas.height = SOURCE_HEIGHT;
const sceneContext = sceneCanvas.getContext("2d", { alpha: false });
sceneContext.imageSmoothingEnabled = false;

const art = createGraveyardArt();
const renderer = createCrtRenderer(displayCanvas, sceneCanvas);

function readSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    return {
      crt: saved.crt !== false,
      grain: saved.grain === "high" ? "high" : "low",
      ambience: saved.ambience !== false
    };
  } catch {
    return { crt: true, grain: "low", ambience: true };
  }
}

function hasCampaignSave() {
  try {
    return SAVE_KEYS.some((key) => Boolean(localStorage.getItem(key) || sessionStorage.getItem(key)));
  } catch {
    return false;
  }
}

const settings = readSettings();
const menu = {
  selected: 0,
  items: [
    { id: "new", label: "BEGIN CAMPAIGN", enabled: true },
    { id: "continue", label: "CONTINUE", enabled: hasCampaignSave(), note: hasCampaignSave() ? "BOUND" : "EMPTY" },
    { id: "settings", label: "RITUAL SETTINGS", enabled: true },
    { id: "credits", label: "CREDITS", enabled: true }
  ]
};

const state = {
  pointer: { x: SOURCE_WIDTH / 2, y: SOURCE_HEIGHT / 2, inside: false },
  pointerVelocity: 0,
  menu,
  panel: null,
  settings,
  fade: 0,
  flash: 0,
  transitionStartedAt: null,
  targetUrl: null,
  audio: null
};

function saveSettings() {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch { /* storage may be unavailable */ }
}

function menuHitIndex(point) {
  if (!point.inside || state.panel) return -1;
  if (point.x < 55 || point.x > 245) return -1;
  for (let index = 0; index < menu.items.length; index += 1) {
    const top = 119 + index * 22;
    if (point.y >= top && point.y <= top + 18) return index;
  }
  return -1;
}

function panelHitIndex(point) {
  if (!point.inside || !state.panel || state.panel.type !== "settings") return -1;
  if (point.x < 102 || point.x > 378) return -1;
  for (let index = 0; index < 4; index += 1) {
    const top = 110 + index * 23;
    if (point.y >= top && point.y <= top + 18) return index;
  }
  return -1;
}

function moveSelection(direction) {
  if (state.panel?.type === "settings") {
    state.panel.selected = (state.panel.selected + direction + 4) % 4;
    playUiTone(180 + state.panel.selected * 28, 0.035);
    return;
  }
  if (state.panel) return;
  let next = menu.selected;
  do next = (next + direction + menu.items.length) % menu.items.length;
  while (menu.items[next]?.enabled === false && next !== menu.selected);
  menu.selected = next;
  playUiTone(150 + next * 24, 0.035);
}

function beginTransition(url) {
  if (state.transitionStartedAt !== null) return;
  state.targetUrl = url;
  state.transitionStartedAt = performance.now() * 0.001;
  state.flash = 0.85;
  playUiTone(72, 0.55, "sawtooth");
}

function activateMain(item) {
  if (!item || item.enabled === false) {
    playUiTone(66, 0.08, "square");
    return;
  }
  if (item.id === "new") beginTransition("./game.html?campaign=new");
  if (item.id === "continue") beginTransition("./game.html?campaign=continue");
  if (item.id === "settings") state.panel = { type: "settings", selected: 0 };
  if (item.id === "credits") state.panel = { type: "credits", selected: 0 };
}

function activatePanel() {
  if (!state.panel) return;
  if (state.panel.type === "credits") {
    state.panel = null;
    return;
  }
  switch (state.panel.selected) {
    case 0:
      settings.crt = !settings.crt;
      break;
    case 1:
      settings.grain = settings.grain === "high" ? "low" : "high";
      break;
    case 2:
      settings.ambience = !settings.ambience;
      if (settings.ambience) ensureAudio();
      else stopAmbience();
      break;
    default:
      state.panel = null;
      break;
  }
  saveSettings();
  playUiTone(230, 0.06);
}

function closePanel() {
  if (state.panel) {
    state.panel = null;
    playUiTone(115, 0.05);
  }
}

function ensureAudio() {
  if (!settings.ambience || state.audio) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0.09;
  master.connect(context.destination);

  const drone = context.createOscillator();
  const droneGain = context.createGain();
  const filter = context.createBiquadFilter();
  drone.type = "triangle";
  drone.frequency.value = 43.65;
  droneGain.gain.value = 0.22;
  filter.type = "lowpass";
  filter.frequency.value = 190;
  drone.connect(filter).connect(droneGain).connect(master);
  drone.start();

  const length = context.sampleRate * 2;
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length * 0.15);
  const wind = context.createBufferSource();
  const windFilter = context.createBiquadFilter();
  const windGain = context.createGain();
  wind.buffer = buffer;
  wind.loop = true;
  windFilter.type = "bandpass";
  windFilter.frequency.value = 420;
  windFilter.Q.value = 0.45;
  windGain.gain.value = 0.08;
  wind.connect(windFilter).connect(windGain).connect(master);
  wind.start();
  state.audio = { context, master, drone, wind };
}

function stopAmbience() {
  if (!state.audio) return;
  const audio = state.audio;
  state.audio = null;
  try { audio.master.gain.setTargetAtTime(0, audio.context.currentTime, 0.08); } catch { /* no-op */ }
  window.setTimeout(() => audio.context.close().catch(() => {}), 300);
}

function playUiTone(frequency, duration = 0.05, type = "triangle") {
  ensureAudio();
  if (!state.audio) return;
  const { context, master } = state.audio;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
  oscillator.connect(gain).connect(master);
  oscillator.start();
  oscillator.stop(context.currentTime + duration + 0.02);
}

function onPointerMove(event) {
  const next = renderer.screenToSource(event.clientX, event.clientY);
  state.pointerVelocity = Math.hypot(next.x - state.pointer.x, next.y - state.pointer.y);
  state.pointer = next;
  const panelIndex = panelHitIndex(next);
  if (panelIndex >= 0) state.panel.selected = panelIndex;
  const menuIndex = menuHitIndex(next);
  if (menuIndex >= 0 && menu.items[menuIndex].enabled !== false) menu.selected = menuIndex;
}

displayCanvas.addEventListener("pointermove", onPointerMove);
displayCanvas.addEventListener("pointerdown", (event) => {
  ensureAudio();
  const point = renderer.screenToSource(event.clientX, event.clientY);
  state.pointer = point;
  if (state.panel) {
    const index = panelHitIndex(point);
    if (index >= 0) state.panel.selected = index;
    activatePanel();
    return;
  }
  const index = menuHitIndex(point);
  if (index >= 0) menu.selected = index;
  activateMain(menu.items[menu.selected]);
});
displayCanvas.addEventListener("pointerleave", () => { state.pointer.inside = false; });

document.addEventListener("keydown", (event) => {
  ensureAudio();
  const key = event.key.toLowerCase();
  if (["arrowup", "w"].includes(key)) { moveSelection(-1); event.preventDefault(); }
  if (["arrowdown", "s"].includes(key)) { moveSelection(1); event.preventDefault(); }
  if (["arrowleft", "a"].includes(key) && state.panel?.type === "settings") { activatePanel(); event.preventDefault(); }
  if (["arrowright", "d"].includes(key) && state.panel?.type === "settings") { activatePanel(); event.preventDefault(); }
  if (["enter", " "].includes(key)) {
    if (state.panel) activatePanel();
    else activateMain(menu.items[menu.selected]);
    event.preventDefault();
  }
  if (key === "escape") { closePanel(); event.preventDefault(); }
});

document.querySelectorAll("[data-menu-action]").forEach((button) => {
  button.addEventListener("click", () => activateMain(menu.items.find((item) => item.id === button.dataset.menuAction)));
});

let lastTime = performance.now() * 0.001;
function frame(nowMs) {
  const now = nowMs * 0.001;
  const dt = Math.min(0.05, Math.max(0, now - lastTime));
  lastTime = now;
  state.pointerVelocity *= Math.pow(0.06, dt);
  state.flash = Math.max(0, state.flash - dt * 2.6);

  if (state.transitionStartedAt !== null) {
    const elapsed = now - state.transitionStartedAt;
    state.fade = Math.min(1, Math.max(0, (elapsed - 0.12) / 0.78));
    if (elapsed >= 0.95 && state.targetUrl) window.location.href = state.targetUrl;
  }

  art.draw(sceneContext, {
    time: now,
    pointer: state.pointer,
    pointerVelocity: state.pointerVelocity,
    menu,
    panel: state.panel,
    settings,
    flash: state.flash
  });
  renderer.render(now, { ...settings, fade: state.fade });
  requestAnimationFrame(frame);
}

window.PhantomMenu = {
  getState() {
    return {
      selected: menu.items[menu.selected]?.id,
      panel: state.panel?.type || null,
      settings: { ...settings },
      hasSave: menu.items[1].enabled,
      transitionTarget: state.targetUrl
    };
  },
  activate(action) {
    activateMain(menu.items.find((item) => item.id === action));
  }
};

requestAnimationFrame(frame);
