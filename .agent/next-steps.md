# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T07-38-25-04-00`

## Summary

Keep the existing dependency order. The newly documented campaign-phase authority belongs inside the second gate, before any command reaches fixed-step application. Pause and terminal overlays cannot be trusted until all gameplay mutation sources share that admission boundary.

## Plan ledger

**Goal:** implement deterministic Continue and campaign commands while enforcing one authoritative phase mutation barrier.

- [ ] Finish save-candidate resolution first.
- [ ] Normalize browser and `GameHost` actions into typed commands.
- [ ] Add canonical campaign phase and legal transitions.
- [ ] Add a complete command-to-phase admission matrix.
- [ ] Retire held/drag input on pause, terminal and transition entry.
- [ ] Apply admitted gameplay commands only in fixed-step updates.
- [ ] Publish typed results, journals, fingerprints and committed frames.
- [ ] Finish runtime lifecycle ownership.
- [ ] Finish versioned checkpoint capture and atomic resume.
- [ ] Add phase, replay, lifecycle and resume fixture gates.

## Ordered implementation sequence

### Gate 1: Continue capability

1. Enumerate all candidate slots once.
2. Parse and classify each candidate independently.
3. Validate schema, content identity and provenance.
4. Apply deterministic precedence.
5. Publish one candidate or typed rejection.
6. Pass candidate identity into campaign startup.

### Gate 2: Campaign action and phase authority

1. Extract browser callbacks and `GameHost` mutators into source adapters.
2. Define `CampaignCommand` with command ID, source, session, run, observed phase, sequence and target tick.
3. Define canonical phases: `BOOTING`, `ACTIVE`, `PAUSED`, `WON`, `LOST`, `TRANSITIONING`, `DISPOSED`.
4. Replace writes to `paused`, `won` and `lost` with typed phase transitions.
5. Add legal transition preflight and monotonic phase sequence.
6. Add command-to-phase admission matrix.
7. Reject select/build/order/start-wave outside `ACTIVE`.
8. Decide and encode camera policy outside `ACTIVE`.
9. Retire held keys, drag and middle-pan state on phase changes.
10. Run gameplay preflight after phase preflight.
11. Queue admitted gameplay commands for deterministic fixed-step application.
12. Publish accepted, rejected, idempotent and duplicate results.
13. Record stable reason codes and bounded events.
14. Publish canonical state fingerprints and immutable committed frames.
15. Correlate world, HUD, minimap, overlay and CRT consumption.

### Gate 3: Runtime lifecycle

1. Extract menu and campaign factories from module scope.
2. Add session/run identity and lifecycle states.
3. Lease RAF, listeners, timers, globals, audio and CRT resources.
4. Fence stale callbacks by run generation.
5. Complete teardown before navigation, reload or restart.
6. Expose detached lifecycle observation.

### Gate 4: Versioned checkpoint and atomic resume

1. Capture only at a committed simulation tick.
2. Add schema and campaign content identity.
3. Capture canonical detached authoritative state.
4. Add stable checkpoint fingerprint.
5. Validate and migrate supported candidates.
6. Stage hydration and rebuild references off-line.
7. Validate entity, relationship, counter, phase and terminal invariants.
8. Commit one new resume epoch atomically or roll back unchanged.
9. Reset transient input, wall time and accumulator.
10. Acknowledge the first world/HUD/minimap/overlay/CRT frame.

## Phase admission matrix

| Command family | ACTIVE | PAUSED | WON/LOST | TRANSITIONING | DISPOSED |
|---|---:|---:|---:|---:|---:|
| select/build/order/start wave | allow with gameplay preflight | reject | reject | reject | reject |
| pause | transition | idempotent/reject duplicate | reject | reject | reject |
| resume | reject/no-op | transition | reject | reject | reject |
| camera | explicit policy | explicit policy | explicit policy | reject | reject |
| restart/exit | typed lifecycle command | typed lifecycle command | typed lifecycle command | idempotent/reject duplicate | reject |

## First target files

```txt
src/campaign/campaign-phase.js
src/campaign/campaign-command.js
src/campaign/phase-admission.js
src/campaign/command-preflight.js
src/campaign/command-queue.js
src/campaign/committed-frame.js
src/runtime/runtime-session.js
src/campaign/campaign-scene.js
tests/phase-admission.fixture.mjs
tests/phase-frame.fixture.mjs
scripts/check-phase-admission.mjs
package.json
```

## Required fixtures

```txt
candidate precedence
phase transition legality
paused select/build/order/start-wave rejection
won/lost mutation rejection
source parity across pointer/keyboard/GameHost
rejected fingerprint immutability
fixed-step replay
phase/frame correlation
runtime teardown
checkpoint roundtrip/corruption/migration/rollback
browser pause, terminal and Continue smoke
```

## Out of scope for this ledge

```txt
new waves, units or towers
visual polish
new save-slot UI
networked play
renderer replacement
construct-profile revival
```