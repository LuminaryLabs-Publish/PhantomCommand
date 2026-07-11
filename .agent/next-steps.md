# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T15-08-41-04-00`

## Summary

Implement Continue capability first. The menu, campaign startup and future checkpoint system need one shared resolver that reads every candidate slot independently, validates and ranks candidates deterministically, carries the selected identity into startup and either commits a resumed run atomically or leaves the fresh campaign untouched.

## Plan ledger

**Goal:** make menu capability, route intent, selected save identity, hydrated campaign state and first resumed frame agree on one typed startup result.

- [ ] Define the six candidate slots explicitly.
- [ ] Return a typed read result for every slot.
- [ ] Parse and classify every readable nonempty payload.
- [ ] Define supported schemas and content revisions.
- [ ] Define deterministic candidate precedence and tie-breaking.
- [ ] Publish a typed `ContinueCapabilityResult` to the menu.
- [ ] Carry the selected candidate ID and fingerprint into campaign startup.
- [ ] Revalidate the exact candidate before hydration.
- [ ] Stage hydration without mutating live campaign state.
- [ ] Commit either a fresh run or a resumed run atomically.
- [ ] Publish a typed `CampaignStartupResult` and first-frame acknowledgement.
- [ ] Add pure, storage-failure and browser parity fixtures.
- [ ] Continue with projection, command, phase, replay, terminal, lifecycle and checkpoint gates afterward.

## Ordered implementation sequence

### Gate 1: Continue capability resolver

1. Create `save-slot-registry.js` with the six canonical slots.
2. Read slots independently so one denied or failed slot cannot hide the others.
3. Normalize slot results into `empty`, `read`, `denied` or `failed`.
4. Parse nonempty values without throwing through the menu loop.
5. Classify candidate kind:
   - current resumable checkpoint
   - current completion summary
   - supported legacy snapshot
   - unsupported legacy payload
   - malformed payload
6. Validate schema version, content revision and required fields.
7. Calculate a stable raw hash and candidate fingerprint.
8. Apply a versioned precedence policy.
9. Publish one selected candidate or a typed no-capability result.
10. Render Continue from the result rather than raw presence.

### Gate 1b: Campaign startup admission

1. Parse `campaign=new|continue` through one startup-mode kit.
2. For new mode, explicitly reject candidate hydration.
3. For continue mode, require a selected candidate identity.
4. Re-read the exact slot at campaign startup.
5. Reject changed raw hashes or stale candidate fingerprints.
6. Build a detached hydration plan.
7. Validate references, counters, phase and content identity.
8. Commit the complete candidate state atomically.
9. Roll back unchanged on any failure.
10. Publish `CampaignStartupResult` and first-frame receipt.

### Gate 2a: Display/input projection authority

1. Extract one versioned `PresentationTransform`.
2. Mirror shader containment and curvature in CPU projection.
3. Reject stale transform revisions.
4. Use visual-space drag inclusion.
5. Attach projection provenance to commands.

### Gate 2b: Campaign command and phase authority

1. Convert browser callbacks and `GameHost` actions into source adapters.
2. Define `CampaignCommand` with identity, source, phase, sequence and target tick.
3. Replace independent `paused`, `won` and `lost` authority with one phase.
4. Add an admission matrix and typed command results.
5. Retire held input when phase changes.

### Gate 2c: Fixed-step command scheduling and frame authority

1. Add `simulationTickId`, `commandSequence`, `appliedCommandCursor` and `frameId`.
2. Queue commands in deterministic `(targetTick, sequence)` order.
3. Apply commands before the corresponding fixed update.
4. Record ordered domain events and a canonical state fingerprint.
5. Publish committed tick and frame receipts.

### Gate 2d: Exclusive terminal-outcome transaction

1. Remove terminal mutation from subsystem iteration.
2. Collect core-breach and final-wave-clear evidence.
3. Evaluate pure victory and defeat predicates.
4. Arbitrate one `ACTIVE | VICTORY | DEFEAT` result.
5. Latch the result for the run epoch.
6. Gate persistence and projection on that result.

### Gate 3: Runtime lifecycle

1. Extract menu and campaign factories.
2. Add session, run and generation identity.
3. Lease RAF, listeners, timers, globals, audio and CRT resources.
4. Fence stale callbacks by generation.
5. Replace reload restart with an admitted transaction.

### Gate 4: Versioned checkpoint and atomic resume

1. Capture only from a committed tick.
2. Include schema, content identity, tick, command cursor, phase and fingerprint.
3. Validate, migrate and stage hydration.
4. Commit a new resume epoch atomically or roll back unchanged.
5. Acknowledge the first resumed frame.

## First target files

```txt
src/persistence/save-slot-registry.js
src/persistence/save-candidate.js
src/persistence/save-precedence.js
src/persistence/continue-capability.js
src/campaign/campaign-startup.js
src/campaign/campaign-hydration.js
src/menu/graveyard-menu.js
src/campaign/campaign-scene.js
tests/continue-candidate-resolver.fixture.mjs
tests/continue-storage-failure.fixture.mjs
tests/campaign-startup.fixture.mjs
scripts/check-continue-runtime.mjs
package.json
```

## Required Continue fixtures

```txt
all slots empty -> disabled / no-candidate
malformed payload only -> disabled / invalid-candidate
unsupported schema only -> disabled / unsupported-schema
one valid current checkpoint -> selected
valid legacy plus current checkpoint -> current selected
malformed higher slot plus valid lower slot -> valid lower selected
two valid candidates with equal timestamps -> deterministic tie-break
one storage layer denied -> remaining slots still evaluated
candidate changes after menu resolution -> startup rejects stale candidate
new mode with valid candidate present -> fresh state, no hydration
continue mode with valid candidate -> admitted resumed state
continue hydration failure -> no partial mutation
menu result, URL mode, startup result and first frame share one identity
```

## Out of scope for this ledge

```txt
new waves, units or towers
visual redesign
new save-slot selection UI
networked play
renderer replacement
construct-profile revival
full checkpoint schema implementation beyond the minimal resolver contract
```