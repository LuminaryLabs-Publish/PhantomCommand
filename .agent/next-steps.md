# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T18-21-09-04-00`

## Summary

Implement Continue capability first, then establish command, phase, fixed-step and combat-result identities. The immediate terminal ledge is to replace independent `won` and `lost` mutation with one exclusive, latched `TerminalOutcomeResult` that gates victory persistence, overlays, GameHost readback, restart and exit.

## Plan ledger

**Goal:** make startup, commands, combat, terminal state, persistence and rendering agree on one admitted session, tick, combat result, outcome result and frame.

- [ ] Resolve and admit one Continue candidate.
- [ ] Add typed command and phase admission.
- [ ] Queue commands by target tick and sequence.
- [ ] Add simulation tick and state fingerprint identity.
- [ ] Introduce liveness-safe `CombatResolutionResult`.
- [ ] Collect terminal evidence without mutating terminal state inside combat subsystems.
- [ ] Arbitrate one exclusive outcome with a versioned policy.
- [ ] Latch terminal state for the run epoch.
- [ ] Gate persistence, message, overlay and GameHost projection on the result.
- [ ] Acknowledge the first terminal frame.
- [ ] Add simultaneous-evidence, persistence, restart and frame fixtures.
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

1. Extract pure combat state and `CombatFrameInput`.
2. Build an alive/retiring/retired index.
3. Define spawn first-action and stable actor-order policies.
4. Collect movement, attack and damage intents from alive entities only.
5. Resolve direct, projectile and splash damage by a versioned policy.
6. Retire entities and clean references exactly once.
7. Settle rewards and core-breach evidence exactly once.
8. Evaluate wave-clear evidence after cleanup.
9. Publish `CombatResolutionResult`.

### Gate 2e: Exclusive terminal outcome

1. Remove `state.lost=true` from `updateUnit()`.
2. Remove `state.won=true` and victory save writes from wave-clear mutation.
3. Have combat publish typed `CoreBreachEvidence` and `FinalWaveClearEvidence`.
4. Build `TerminalEvidenceInput` from one committed combat result.
5. Evaluate pure victory and defeat predicates.
6. Apply one named, versioned simultaneous-evidence policy.
7. Publish one `TerminalOutcomeResult` with `ACTIVE | VICTORY | DEFEAT`.
8. Latch the result for the run epoch and reject later terminal mutation.
9. Apply rewards and persistence only after the outcome commit.
10. Project one message and one overlay from the result.
11. Update GameHost from a detached terminal observation.
12. Render and acknowledge the first terminal frame.
13. Admit restart or exit only against the committed outcome and run epoch.

### Gate 3: Runtime lifecycle

1. Extract menu and campaign factories.
2. Add session, run and generation identity.
3. Lease RAF, listeners, timers, globals, audio and CRT resources.
4. Fence stale callbacks.
5. Replace reload restart with an admitted transaction.

### Gate 4: Versioned checkpoint and atomic resume

1. Capture only from a committed tick, combat result and terminal result.
2. Store command cursor, policy versions, entity graph and fingerprint.
3. Validate, migrate and rebuild references in detached state.
4. Prove reconstruction order does not change the next tick.
5. Commit a new resume epoch atomically or roll back unchanged.
6. Acknowledge the first resumed frame.

## First terminal target files

```txt
src/campaign/outcome/terminal-evidence.js
src/campaign/outcome/terminal-policy.js
src/campaign/outcome/terminal-arbitration.js
src/campaign/outcome/terminal-result.js
src/campaign/outcome/terminal-persistence.js
src/campaign/outcome/terminal-projection.js
src/campaign/campaign-scene.js
tests/terminal-simultaneous-evidence.fixture.mjs
tests/terminal-persistence.fixture.mjs
tests/terminal-latch.fixture.mjs
tests/terminal-restart.fixture.mjs
scripts/smoke-terminal-frame.mjs
package.json
```

## Required terminal fixtures

```txt
core above zero + final wave clear -> VICTORY only
core reaches zero + enemies remain -> DEFEAT only
core reaches zero + final enemy removed -> policy-defined single outcome
same evidence submitted twice -> same idempotent result
terminal result followed by later combat evidence -> no outcome change
defeat result -> no victory save write
victory result -> one admitted completion write
world/HUD/overlay/CRT/GameHost -> same outcome, resultId and frameId
restart from terminal -> new run epoch and ACTIVE phase
```

## Out of scope for this ledge

```txt
new waves, units or towers
visual redesign
networked play
renderer replacement
new save-slot UI
balance changes before deterministic combat and terminal fixtures exist
```