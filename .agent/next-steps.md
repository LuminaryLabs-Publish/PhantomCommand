# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T16-49-51-04-00`

## Summary

Implement Continue capability first, then establish command, phase and fixed-step identities before replacing mutable combat iteration with a deterministic liveness-safe pipeline. Combat resolution must complete before terminal arbitration and checkpoint fidelity can be trusted.

## Plan ledger

**Goal:** make startup, commands, combat, terminal state and rendering agree on one admitted session, tick, combat result and frame.

- [ ] Resolve and admit one Continue candidate.
- [ ] Add typed command and phase admission.
- [ ] Queue commands by target tick and sequence.
- [ ] Add simulation tick and state fingerprint identity.
- [ ] Introduce combat frame input and liveness index.
- [ ] Define stable entity and target tie-break order.
- [ ] Collect movement, attack and damage intents.
- [ ] Resolve damage, retirement, rewards and cleanup exactly once.
- [ ] Publish `CombatResolutionResult` before terminal arbitration.
- [ ] Render only committed post-cleanup state.
- [ ] Add order, liveness, checkpoint parity and frame-provenance fixtures.
- [ ] Continue with lifecycle and checkpoint work afterward.

## Ordered implementation sequence

### Gate 1: Continue capability resolver

1. Define six canonical candidate slots.
2. Read each slot independently.
3. Parse and classify candidates.
4. Validate schema, content revision and fingerprints.
5. Apply deterministic precedence.
6. Publish `ContinueCapabilityResult`.
7. Carry selected identity into campaign startup.
8. Revalidate and stage hydration.
9. Commit new or continued startup atomically.
10. Acknowledge the first startup frame.

### Gate 2a: Display/input projection authority

1. Extract a versioned `PresentationTransform`.
2. Mirror contain and CRT curvature on CPU.
3. Reject stale transform revisions.
4. Use visual-space drag inclusion.
5. Attach projection provenance to commands.

### Gate 2b: Command and phase authority

1. Convert browser and GameHost callbacks into source adapters.
2. Define `CampaignCommand` with session, sequence and target tick.
3. Replace independent paused/won/lost authority with one phase.
4. Add phase admission and typed results.
5. Retire held input on phase transitions.

### Gate 2c: Fixed-step command, replay and frame authority

1. Add `simulationTickId`, command sequence and applied cursor.
2. Queue by `(targetTick, sequence)`.
3. Apply accepted commands before the target update.
4. Record ordered domain events.
5. Calculate canonical state fingerprints.
6. Publish committed tick and frame receipts.

### Gate 2d: Combat resolution and entity liveness

1. Extract pure combat state and `CombatFrameInput` from `campaign-scene.js`.
2. Build an alive/retiring/retired index for each tick.
3. Define spawn first-action policy.
4. Define stable actor order and distance-tie policy.
5. Collect movement, targeting and attack intents from alive entities only.
6. Normalize direct, projectile and splash damage intents.
7. Apply a versioned sequential or simultaneous damage policy.
8. Retire entities exactly once.
9. Clean selection, target and projectile references before commit.
10. Settle rewards and core-breach events exactly once.
11. Evaluate wave-clear evidence after cleanup.
12. Publish `CombatResolutionResult` and event range.
13. Feed terminal arbitration only from that result.
14. Acknowledge the first frame consuming the result.

### Gate 2e: Exclusive terminal outcome

1. Remove terminal mutation from subsystem iteration.
2. Collect core-breach and final-wave-clear evidence.
3. Evaluate pure victory and defeat predicates.
4. Arbitrate one `ACTIVE | VICTORY | DEFEAT` result.
5. Latch the result for the run epoch.
6. Gate persistence and rendering on the result.

### Gate 3: Runtime lifecycle

1. Extract menu and campaign factories.
2. Add session, run and generation identity.
3. Lease RAF, listeners, timers, globals, audio and CRT resources.
4. Fence stale callbacks.
5. Replace reload restart with an admitted transaction.

### Gate 4: Versioned checkpoint and atomic resume

1. Capture only from a committed tick and combat result.
2. Store command cursor, combat policy versions, entity graph and fingerprint.
3. Validate, migrate and rebuild references in detached state.
4. Prove reconstruction order does not change the next tick.
5. Commit a new resume epoch atomically or roll back unchanged.
6. Acknowledge the first resumed frame.

## First combat target files

```txt
src/campaign/combat/combat-frame.js
src/campaign/combat/entity-liveness.js
src/campaign/combat/entity-order.js
src/campaign/combat/target-policy.js
src/campaign/combat/intent-collection.js
src/campaign/combat/damage-resolution.js
src/campaign/combat/entity-retirement.js
src/campaign/combat/reference-cleanup.js
src/campaign/combat/combat-result.js
src/campaign/campaign-scene.js
tests/combat-dead-entity.fixture.mjs
tests/combat-order-parity.fixture.mjs
tests/combat-checkpoint-order.fixture.mjs
scripts/smoke-combat-frame.mjs
package.json
```

## Required combat fixtures

```txt
earlier actor kills later captured actor -> no later action
same state with reversed insertion order -> same fingerprint
equal-distance targets -> stable chosen ID
spawn due this tick -> declared first-action behavior
two lethal hits -> one retirement and one reward
retired selected entity -> selection cleaned
retired projectile target -> declared orphan result
checkpoint hydration in another order -> same next tick
core breach and last enemy death -> explicit terminal evidence
first visible frame -> no unexplained dead-source effect
```

## Out of scope for this ledge

```txt
new waves, units or towers
visual redesign
networked play
renderer replacement
new save-slot UI
balance changes before deterministic combat fixtures exist
```
