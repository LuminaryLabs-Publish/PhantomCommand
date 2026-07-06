import assert from "node:assert/strict";
import {
  CONSTRUCT_SPIRAL_INTRO_DOMAIN_PATH,
  CONSTRUCT_SPIRAL_INTRO_KIT_ID,
  createConstructSpiralIntroKit
} from "../src/kits/construct-spiral-intro-kit/index.js";

const ringPartCounts = [5, 5, 5, 6, 8, 10, 12, 15, 18, 22, 26, 32];
const pieces = ringPartCounts.flatMap((partsPerRing, ringIndex) => (
  Array.from({ length: partsPerRing }, (_, partIndex) => ({
    id: `piece-${ringIndex}-${partIndex}`,
    ringIndex,
    partIndex,
    partsPerRing
  }))
));

const kit = createConstructSpiralIntroKit({
  activePieceSeconds: 4.5,
  spiralStepSeconds: 0.35,
  ringStartStepSeconds: 0.9,
  maxActivePieces: 24,
  activeRingWindow: 5
});

assert.equal(kit.id, CONSTRUCT_SPIRAL_INTRO_KIT_ID);
assert.equal(kit.domainPath, CONSTRUCT_SPIRAL_INTRO_DOMAIN_PATH);

let state = kit.installPieces(pieces);
assert.equal(state.totalPieces, pieces.length);
assert.equal(state.pendingCount, pieces.length);
assert.equal(state.activeCount, 0);
assert.equal(state.settledCount, 0);

const schedule = kit.schedule();
assert.equal(schedule.length, pieces.length);
for (let index = 1; index < schedule.length; index += 1) {
  assert.ok(schedule[index].scheduledAt >= schedule[index - 1].scheduledAt);
}

for (let i = 0; i < 1800 && !state.complete; i += 1) {
  state = kit.update(0.1);
  assert.ok(state.activeCount <= 24, `active count exceeded cap: ${state.activeCount}`);
  if (state.activeRingMin !== null && state.activeRingMax !== null) {
    assert.ok(
      state.activeRingMax - state.activeRingMin <= 4,
      `active ring span exceeded window: ${state.activeRingMin}-${state.activeRingMax}`
    );
  }
}

assert.equal(state.complete, true);
assert.equal(state.settledCount, pieces.length);
assert.equal(state.pendingCount, 0);
assert.equal(state.activeCount, 0);

console.log("construct-spiral-intro-kit smoke passed", {
  pieces: pieces.length,
  estimatedTotalSeconds: state.estimatedTotalSeconds
});
