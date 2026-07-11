# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T13-28-37-04-00`

## Summary

Keep the current dependency order, but add an explicit terminal-outcome transaction inside the fixed-step command and phase gate. The next implementation must prevent one tick from committing both defeat and victory, prevent success persistence after defeat evidence, and publish one terminal result consumed by rendering, diagnostics, replay and checkpoints.

## Plan ledger

**Goal:** make command order, simulation progress, terminal outcome and visible frame provenance reproducible and internally consistent.

- [ ] Finish save-candidate resolution first.
- [ ] Finish shared CRT display/input projection.
- [ ] Define typed campaign commands and canonical phase admission.
- [ ] Assign command sequence and deterministic target tick.
- [ ] Apply admitted commands exactly once inside the fixed-step boundary.
- [ ] Collect terminal evidence without mutating `won` or `lost` during subsystem updates.
- [ ] Arbitrate exactly one `ACTIVE | VICTORY | DEFEAT` result per tick.
- [ ] Latch terminal outcome for the run epoch.
- [ ] Gate success persistence on the committed terminal result.
- [ ] Publish committed tick, terminal and frame receipts.
- [ ] Quarantine direct `GameHost` mutation and raw Boolean outcome exposure.
- [ ] Add simultaneous breach/clear, persistence and frame fixtures.
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
3. Replace `paused`, `won` and `lost` phase authority with one canonical campaign phase.
4. Add an admission matrix and typed command results.
5. Retire held input when phase changes.

### Gate 2c: Fixed-step command scheduling and frame authority

1. Add `simulationTickId`, `commandSequence`, `appliedCommandCursor` and `frameId`.
2. Queue commands in deterministic `(targetTick, sequence)` order.
3. Apply commands before the corresponding `update(1/60)` call.
4. Record ordered domain events and a canonical state fingerprint.
5. Publish a `CommittedTickReceipt` after every authoritative tick.
6. Extract a detached render snapshot.
7. Version camera and projection state.
8. Publish a `CommittedFrameReceipt` after all consumers acknowledge the frame.

### Gate 2d: Exclusive terminal-outcome transaction

1. Remove terminal mutations from `updateUnit()` and wave-clear branches.
2. Emit evidence rows instead:
   - `CORE_BREACHED`
   - `FINAL_WAVE_CLEARED`
   - `WAVE_CLEARED`
3. Build `TerminalEvaluationInput` after combat subsystems finish.
4. Evaluate defeat and victory predicates without mutating state.
5. Apply a versioned arbitration policy:
   - defeat when `coreHealth <= 0`
   - victory only when final wave is clear and `coreHealth > 0`
   - otherwise active
6. Commit one `TerminalOutcomeResult` atomically.
7. Latch victory or defeat for the current run epoch.
8. Derive message, overlay, persistence and `GameHost` projection from the result.
9. Reject victory persistence when defeat evidence exists.
10. Correlate the first terminal frame with the result ID and state fingerprint.

### Clock and stall policy

1. Replace anonymous `last` and `accumulator` variables with a clock owner.
2. Record raw elapsed duration before clamping.
3. Define hidden-tab behavior.
4. Define a maximum catch-up budget.
5. Publish `ClockOverrunResult` for excess time.
6. Keep authoritative simulation time independent from CRT animation time.
7. Never discard duration without a receipt.

### Gate 3: Runtime lifecycle

1. Extract menu and campaign factories.
2. Add session, run and generation identity.
3. Lease RAF, listeners, timers, globals, audio and CRT resources.
4. Fence stale callbacks by generation.
5. Replace `location.reload()` restart with an admitted restart transaction.
6. Retire the prior terminal result and advance the run epoch.
7. Complete teardown before navigation or reload.

### Gate 4: Versioned checkpoint and atomic resume

1. Capture only from a committed tick and terminal result.
2. Include schema, content identity, tick, command cursor, outcome and fingerprint.
3. Validate, migrate and stage hydration.
4. Commit a new resume epoch atomically or roll back unchanged.
5. Acknowledge the first resumed frame.

## First target files

```txt
src/campaign/campaign-outcome.js
src/campaign/campaign-phase.js
src/campaign/campaign-command.js
src/campaign/campaign-clock.js
src/campaign/campaign-frame.js
src/campaign/campaign-scene.js
src/menu/crt-projection.js
src/menu/crt-renderer.js
tests/terminal-outcome.fixture.mjs
tests/terminal-persistence.fixture.mjs
tests/terminal-frame.fixture.mjs
scripts/check-campaign-runtime.mjs
package.json
```

## Required terminal fixtures

```txt
core breach before final wave -> defeat only
final wave clear with positive core -> victory only
simultaneous last-enemy breach and final-wave clear -> defeat only
no state contains both victory and defeat
terminal outcome cannot change inside one run epoch
victory save rejected after core breach
victory save includes terminal result ID and fingerprint
overlay and GameHost consume one terminal result
replay journal reproduces terminal outcome and state fingerprint
restart advances run epoch and clears predecessor terminal identity
first terminal frame acknowledges terminal result ID
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