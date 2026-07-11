# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T11-51-06-04-00`

## Summary

Keep the existing dependency order. The next fixed-step ledge must move all gameplay mutations behind a sequenced command queue, define explicit stall/catch-up behavior and publish immutable committed-tick and render-frame receipts.

## Plan ledger

**Goal:** make command order, simulation progress and visible frame provenance reproducible across display cadence, stalls and replay.

- [ ] Finish save-candidate resolution first.
- [ ] Finish shared CRT display/input projection.
- [ ] Define typed campaign commands and canonical phase admission.
- [ ] Assign one monotonic command sequence and deterministic target tick.
- [ ] Apply admitted commands exactly once inside the fixed-step boundary.
- [ ] Add simulation tick IDs and committed state fingerprints.
- [ ] Replace silent 50 ms truncation with an explicit catch-up/overrun policy.
- [ ] Separate authoritative simulation time from presentation time.
- [ ] Publish render-frame receipts and consumer acknowledgements.
- [ ] Quarantine direct `GameHost` mutation bypasses.
- [ ] Add cadence, stall, replay and frame-correlation fixtures.
- [ ] Complete lifecycle and checkpoint gates afterward.

## Ordered implementation sequence

### Gate 1: Continue capability

1. Enumerate candidate slots.
2. Parse, classify and validate each candidate.
3. Apply deterministic precedence.
4. Publish one typed candidate or rejection.
5. Carry candidate identity into campaign startup.

### Gate 2a: Display/input projection authority

1. Extract one versioned `PresentationTransform`.
2. Mirror shader containment and curvature in CPU projection.
3. Reject stale transform revisions.
4. Use visual-space drag inclusion.
5. Attach projection provenance to commands.

### Gate 2b: Campaign command and phase authority

1. Convert browser callbacks and `GameHost` actions into source adapters.
2. Define `CampaignCommand` with identity, source, phase, sequence and target tick.
3. Add canonical phase and an admission matrix.
4. Return typed accepted, rejected, duplicate and stale results.
5. Retire held input when phase changes.

### Gate 2c: Fixed-step command scheduling and frame authority

1. Add `simulationTickId`, `commandSequence`, `appliedCommandCursor` and `frameId`.
2. Queue commands in deterministic `(targetTick, sequence)` order.
3. Apply commands before the corresponding `update(1/60)` call.
4. Record ordered domain events and a canonical state fingerprint.
5. Publish a `CommittedTickReceipt` after every authoritative tick.
6. Extract a detached immutable render snapshot from that receipt.
7. Version camera and projection state consumed by the frame.
8. Publish a `CommittedFrameReceipt` after world, HUD, minimap, overlay and CRT consumption.
9. Add consumer acknowledgements and stale-frame rejection.

### Clock and stall policy

1. Replace anonymous `last` and `accumulator` variables with a clock owner.
2. Record raw elapsed duration before clamping.
3. Define hidden-tab behavior.
4. Define a maximum catch-up budget.
5. Publish `ClockOverrunResult` whenever elapsed time exceeds policy.
6. Keep authoritative simulation time independent from CRT animation time.
7. Never discard duration without a typed receipt.

### Gate 3: Runtime lifecycle

1. Extract menu and campaign factories.
2. Add session/run identity and lifecycle states.
3. Lease RAF, listeners, timers, globals, audio and CRT resources.
4. Fence stale callbacks by run generation.
5. Complete teardown before navigation, reload or restart.

### Gate 4: Versioned checkpoint and atomic resume

1. Capture only at a committed simulation tick.
2. Include schema, content identity, tick, command cursor and fingerprint.
3. Validate, migrate and stage hydration.
4. Commit a new resume epoch atomically or roll back unchanged.
5. Acknowledge the first resumed frame.

## First target files

```txt
src/campaign/campaign-command.js
src/campaign/campaign-clock.js
src/campaign/campaign-replay.js
src/campaign/campaign-frame.js
src/campaign/campaign-scene.js
src/menu/crt-projection.js
src/menu/crt-renderer.js
tests/fixed-step-cadence.fixture.mjs
tests/stall-policy.fixture.mjs
tests/command-replay.fixture.mjs
tests/frame-correlation.fixture.mjs
scripts/check-campaign-runtime.mjs
package.json
```

## Required fixtures

```txt
candidate precedence
CPU/GLSL projection parity
phase transition and mutation barriers
20/30/60/120 Hz cadence parity
irregular cadence parity
stall and hidden-tab policy
command target-tick ordering
command duplicate/idempotency handling
same-journal state-fingerprint replay
world/HUD/minimap/overlay/CRT frame correlation
GameHost bypass rejection
runtime teardown
checkpoint roundtrip, migration, corruption and rollback
```

## Out of scope for this ledge

```txt
new waves, units or towers
visual redesign
new save-slot UI
networked play
renderer replacement
construct-profile revival
```