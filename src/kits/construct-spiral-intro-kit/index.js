export const CONSTRUCT_SPIRAL_INTRO_KIT_ID = "construct-spiral-intro-kit";
export const CONSTRUCT_SPIRAL_INTRO_DOMAIN_PATH = "n:sequence:construct:spiral-intro";

export const DEFAULT_CONSTRUCT_SPIRAL_INTRO_CONFIG = Object.freeze({
  activePieceSeconds: 4.5,
  spiralStepSeconds: 0.35,
  ringStartStepSeconds: 0.9,
  maxActivePieces: 24,
  activeRingWindow: 5,
  spiralTurnOffset: 0.18,
  startAngleTurns: 0,
  settleEpsilonSeconds: 0.0001
});

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeTurns(turns) {
  const wrapped = turns % 1;
  return wrapped < 0 ? wrapped + 1 : wrapped;
}

function requireFiniteNumber(value, fallback) {
  return Number.isFinite(value) ? value : fallback;
}

export function createConstructSpiralIntroPieceId(piece) {
  return piece.id ?? `ring-${piece.ringIndex}:part-${piece.partIndex}`;
}

export function createConstructSpiralIntroSchedule(pieces, config = {}) {
  const settings = {
    ...DEFAULT_CONSTRUCT_SPIRAL_INTRO_CONFIG,
    ...config
  };

  const prepared = pieces.map((piece, sourceIndex) => {
    const ringIndex = Math.max(0, Math.floor(requireFiniteNumber(piece.ringIndex, 0)));
    const partsPerRing = Math.max(1, Math.floor(requireFiniteNumber(piece.partsPerRing, 1)));
    const partIndex = clamp(Math.floor(requireFiniteNumber(piece.partIndex, 0)), 0, partsPerRing - 1);
    const angularTurns = partIndex / partsPerRing;
    const spiralHeadTurns = normalizeTurns(settings.startAngleTurns + ringIndex * settings.spiralTurnOffset);
    const angularDistance = normalizeTurns(angularTurns - spiralHeadTurns);
    const angularRank = Math.round(angularDistance * partsPerRing);
    const scheduledAt = ringIndex * settings.ringStartStepSeconds + angularRank * settings.spiralStepSeconds;

    return Object.freeze({
      ...piece,
      id: createConstructSpiralIntroPieceId({ ...piece, ringIndex, partIndex }),
      sourceIndex,
      ringIndex,
      partIndex,
      partsPerRing,
      angularTurns,
      spiralHeadTurns,
      angularDistance,
      angularRank,
      scheduledAt
    });
  });

  return prepared.sort((a, b) => (
    a.scheduledAt - b.scheduledAt ||
    a.ringIndex - b.ringIndex ||
    a.angularRank - b.angularRank ||
    a.sourceIndex - b.sourceIndex
  ));
}

export function createConstructSpiralIntroKit(options = {}) {
  const settings = {
    ...DEFAULT_CONSTRUCT_SPIRAL_INTRO_CONFIG,
    ...options
  };

  settings.activePieceSeconds = Math.max(0.05, settings.activePieceSeconds);
  settings.spiralStepSeconds = Math.max(0.01, settings.spiralStepSeconds);
  settings.ringStartStepSeconds = Math.max(0.01, settings.ringStartStepSeconds);
  settings.maxActivePieces = Math.max(1, Math.floor(settings.maxActivePieces));
  settings.activeRingWindow = Math.max(1, Math.floor(settings.activeRingWindow));

  let time = 0;
  let schedule = [];
  let states = new Map();
  let newlyActive = [];
  let newlySettled = [];

  function installPieces(pieces) {
    schedule = createConstructSpiralIntroSchedule(pieces, settings);
    states = new Map(schedule.map((piece) => [piece.id, {
      id: piece.id,
      status: "pending",
      activatedAt: null,
      settledAt: null,
      progress: 0
    }]));
    time = 0;
    newlyActive = [];
    newlySettled = [];
    return snapshot();
  }

  function reset() {
    for (const piece of schedule) {
      states.set(piece.id, {
        id: piece.id,
        status: "pending",
        activatedAt: null,
        settledAt: null,
        progress: 0
      });
    }
    time = 0;
    newlyActive = [];
    newlySettled = [];
    return snapshot();
  }

  function getState(piece) {
    return states.get(piece.id);
  }

  function getActivePieces() {
    return schedule.filter((piece) => getState(piece)?.status === "active");
  }

  function getSettledPieces() {
    return schedule.filter((piece) => getState(piece)?.status === "settled");
  }

  function getPendingPieces() {
    return schedule.filter((piece) => getState(piece)?.status === "pending");
  }

  function getFirstUnsettledRing() {
    let first = Infinity;
    for (const piece of schedule) {
      const state = getState(piece);
      if (state && state.status !== "settled") first = Math.min(first, piece.ringIndex);
    }
    return Number.isFinite(first) ? first : 0;
  }

  function canActivatePiece(piece) {
    if (getActivePieces().length >= settings.maxActivePieces) return false;

    const firstUnsettledRing = getFirstUnsettledRing();
    const maxAllowedRing = firstUnsettledRing + settings.activeRingWindow - 1;
    if (piece.ringIndex > maxAllowedRing) return false;

    return piece.scheduledAt <= time;
  }

  function activateReadyPieces() {
    for (const piece of schedule) {
      const state = getState(piece);
      if (!state || state.status !== "pending") continue;
      if (!canActivatePiece(piece)) continue;

      const nextState = {
        id: piece.id,
        status: "active",
        activatedAt: time,
        settledAt: null,
        progress: 0
      };
      states.set(piece.id, nextState);
      newlyActive.push(piece);
    }
  }

  function updateActivePieces() {
    for (const piece of schedule) {
      const state = getState(piece);
      if (!state || state.status !== "active") continue;

      const localTime = Math.max(0, time - state.activatedAt);
      const progress = clamp(localTime / settings.activePieceSeconds, 0, 1);

      if (progress >= 1 - settings.settleEpsilonSeconds) {
        states.set(piece.id, {
          id: piece.id,
          status: "settled",
          activatedAt: state.activatedAt,
          settledAt: time,
          progress: 1
        });
        newlySettled.push(piece);
      } else {
        states.set(piece.id, {
          ...state,
          progress
        });
      }
    }
  }

  function update(dt) {
    const step = Math.max(0, requireFiniteNumber(dt, 0));
    time += step;
    newlyActive = [];
    newlySettled = [];

    updateActivePieces();
    activateReadyPieces();

    return snapshot();
  }

  function getPieceProgress(pieceId) {
    return states.get(pieceId)?.progress ?? 0;
  }

  function getPieceStatus(pieceId) {
    return states.get(pieceId)?.status ?? "missing";
  }

  function snapshot() {
    const active = getActivePieces();
    const settled = getSettledPieces();
    const pending = getPendingPieces();
    const activeRings = active.map((piece) => piece.ringIndex);
    const activeRingMin = activeRings.length ? Math.min(...activeRings) : null;
    const activeRingMax = activeRings.length ? Math.max(...activeRings) : null;
    const lastScheduledAt = schedule.length ? Math.max(...schedule.map((piece) => piece.scheduledAt)) : 0;
    const estimatedTotalSeconds = lastScheduledAt + settings.activePieceSeconds;

    return Object.freeze({
      kitId: CONSTRUCT_SPIRAL_INTRO_KIT_ID,
      domainPath: CONSTRUCT_SPIRAL_INTRO_DOMAIN_PATH,
      time,
      progress: estimatedTotalSeconds > 0 ? clamp(time / estimatedTotalSeconds, 0, 1) : 1,
      estimatedTotalSeconds,
      totalPieces: schedule.length,
      activeCount: active.length,
      settledCount: settled.length,
      pendingCount: pending.length,
      newlyActiveCount: newlyActive.length,
      newlySettledCount: newlySettled.length,
      activeRingMin,
      activeRingMax,
      activeRingWindow: settings.activeRingWindow,
      maxActivePieces: settings.maxActivePieces,
      complete: settled.length === schedule.length,
      settings: { ...settings }
    });
  }

  return Object.freeze({
    id: CONSTRUCT_SPIRAL_INTRO_KIT_ID,
    domainPath: CONSTRUCT_SPIRAL_INTRO_DOMAIN_PATH,
    installPieces,
    reset,
    update,
    snapshot,
    schedule: () => [...schedule],
    activePieces: getActivePieces,
    settledPieces: getSettledPieces,
    pendingPieces: getPendingPieces,
    newlyActivePieces: () => [...newlyActive],
    newlySettledPieces: () => [...newlySettled],
    getPieceProgress,
    getPieceStatus
  });
}
