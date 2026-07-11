# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T03-31-26-04-00`

## Plan ledger

**Goal:** establish one admitted campaign session, then route every gameplay request through deterministic fixed-step command authority before lifecycle and full resume work.

- [ ] Resolve the six current storage slots through one deterministic Continue decision.
- [ ] Make menu route intent and campaign startup consume the same admission result.
- [ ] Define explicit command types for selection, build, order, wave, pause, and focus behavior.
- [ ] Normalize pointer, keyboard, GameHost, replay, and fixture requests through source adapters.
- [ ] Assign session-scoped command IDs, monotonic sequences, and deterministic target ticks.
- [ ] Run pure preflight and return accepted, rejected, or no-op terminal results.
- [ ] Apply accepted gameplay commands only at fixed-step boundaries.
- [ ] Publish bounded command, result, and domain-event journals.
- [ ] Compute canonical simulation-state fingerprints after each committed tick.
- [ ] Commit immutable presentation frames with render-consumption and CRT acknowledgement rows.
- [ ] Prove action results, replay determinism, and frame coherence with DOM-free fixtures.
- [ ] Add lifecycle ownership and versioned resume only after the earlier gates pass.

## Ordered implementation queue

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Save Envelope + Atomic Resume Fidelity Gate
```

Preserve routes, controls, source-canvas sizes, visual output, content, simulation constants, balance, CRT behavior, and legacy diagnostic fields while adding typed authority beside them.

## Goal 1: Continue capability resolver

### Slot and candidate authority

- [ ] Define stable IDs for the three keys across local and session storage.
- [ ] Read candidates through an injected adapter.
- [ ] Classify absent, unreadable, invalid, foreign, unsupported, completion-summary, legacy resumable, current resumable, and migrated candidates.
- [ ] Define deterministic key, layer, version, and migration precedence.
- [ ] Keep `{ scene, souls, wave }` classified as a non-resumable legacy completion summary.
- [ ] Return one clone-safe decision with inspected candidates, selected candidate, reason, version, and fingerprint.

### Route and startup

- [ ] Parse `campaign=new|continue` once.
- [ ] Reject Continue when no resumable candidate exists.
- [ ] Do not silently replace rejected Continue with a fresh campaign.
- [ ] Stage and validate fresh or hydrated state before committing a session.
- [ ] Correlate menu decision, route admission, and campaign startup by IDs and fingerprints.

### Fixtures

- [ ] Add `tests/phantom-command-candidate-resolver-fixture.mjs`.
- [ ] Add `tests/phantom-command-session-admission-fixture.mjs`.
- [ ] Cover all six slots, failures, invalid data, unsupported versions, completion summaries, multiple candidates, precedence, ties, mutation resistance, and route modes.

## Goal 2: Campaign action result authority

### Command definitions

Initial action types:

```txt
select-point
select-rectangle
clear-selection
select-tower-type
select-pad
build-selected-pad
order-selected-units
start-wave
set-pause
focus-selection
```

- [ ] Separate pad selection from build execution.
- [ ] Make build payloads explicit about pad ID and tower type.
- [ ] Make order payloads explicit about selected unit IDs, target point, and optional enemy target.
- [ ] Classify pause and camera operations as gameplay or presentation commands.

### Source adapters

- [ ] Add browser pointer adapter.
- [ ] Add browser keyboard adapter.
- [ ] Add GameHost adapter.
- [ ] Add replay and fixture adapters.
- [ ] Ensure adapters translate input but never mutate campaign state.

### Sequence and target tick

- [ ] Allocate one monotonic sequence per admitted campaign session.
- [ ] Assign commands observed before application to `currentTick + 1`.
- [ ] Apply multiple same-tick commands in sequence order.
- [ ] Return the prior terminal result for duplicate command IDs.
- [ ] Reject stale-session commands.

### Preflight and result

- [ ] Make preflight pure and immutable.
- [ ] Return typed accepted, rejected, or no-op results.
- [ ] Preserve explicit reasons for terminal state, active wave, missing pad, occupied pad, insufficient souls, no selected units, invalid point, and unchanged selection.
- [ ] Record pre- and post-state fingerprints and changed paths.

### Fixed-step application

- [ ] Queue accepted commands by target tick.
- [ ] Apply commands before simulation services for the declared tick.
- [ ] Emit ordered domain events.
- [ ] Bound command, result, and event journals with dropped-row counters.
- [ ] Keep journal truncation outside simulation authority.

### Committed frame

- [ ] Create an immutable presentation snapshot after tick commit.
- [ ] Record frame ID, tick range, applied command sequences, and state fingerprint.
- [ ] Record world, HUD, minimap, modal, source-canvas, and CRT consumption results.
- [ ] Preserve the last successful frame when a consumer fails.
- [ ] Expose clone-safe observations through GameHost.

### Fixtures

- [ ] Add `tests/phantom-command-action-result-fixture.mjs`.
- [ ] Add `tests/phantom-command-fixed-step-replay-fixture.mjs`.
- [ ] Add `tests/phantom-command-frame-consumption-fixture.mjs`.
- [ ] Prove equivalent RAF chunking produces identical results, events, tick fingerprints, and final state.
- [ ] Prove browser, GameHost, replay, and fixture sources have result parity.

## Goal 3: Runtime session lifecycle authority

- [ ] Add explicit menu and campaign session IDs.
- [ ] Own and cancel RAF requests.
- [ ] Register and remove listeners through a ledger.
- [ ] Dispose AudioContext and CRT WebGL resources.
- [ ] Add partial-start rollback, stop, dispose, and restart.
- [ ] Reject stale callbacks by session identity.

## Goal 4: Versioned resume fidelity

```txt
versioned full-state save envelope
  -> atomic hydration into a new admitted session
  -> saved/hydrated fingerprint parity
  -> ID, queue, journal, frame, and lifecycle parity
  -> resume-fidelity fixture
```

## Required validation after implementation

```bash
node tests/phantom-command-candidate-resolver-fixture.mjs
node tests/phantom-command-session-admission-fixture.mjs
node tests/phantom-command-action-result-fixture.mjs
node tests/phantom-command-fixed-step-replay-fixture.mjs
node tests/phantom-command-frame-consumption-fixture.mjs
node tests/phantom-command-menu-lifecycle-fixture.mjs
node tests/phantom-command-campaign-lifecycle-fixture.mjs
node tests/phantom-command-crt-resource-fixture.mjs
node tests/phantom-command-restart-idempotency-fixture.mjs
node tests/phantom-command-resume-fidelity-fixture.mjs
npm run check
npm run build
```

## Defer until after proof

```txt
new units, waves, towers, or economy systems
save-slot UI redesign
camera rewrite
renderer replacement
pixel-art expansion
multiplayer
full campaign module extraction
legacy construct-profile parity
```