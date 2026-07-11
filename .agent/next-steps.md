# PhantomCommand Next Steps

**Timestamp:** `2026-07-10T23-40-35-04-00`

## Plan ledger

**Goal:** preserve the current campaign experience while introducing deterministic save resolution, command admission, frame proof, lifecycle ownership, and resume fidelity in dependency order.

- [ ] Resolve Continue capability from one shared immutable candidate decision.
- [ ] Normalize browser, GameHost, and replay requests into typed commands.
- [ ] Sequence commands and assign deterministic target ticks.
- [ ] Separate preflight, application, results, events, fingerprints, and committed frames.
- [ ] Route all render and diagnostic consumers through one committed-frame identity.
- [ ] Add explicit route-session lifecycle and resource teardown.
- [ ] Add versioned full-state save and atomic hydration.
- [ ] Gate each slice with a pure fixture before adding it to `npm run check`.

## Implementation queue

```txt
1. PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. PhantomCommand Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. PhantomCommand Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. PhantomCommand Versioned Save Envelope + Atomic Resume Fidelity Gate
```

Preserve current routes, visuals, controls, source-canvas sizes, simulation constants, balance, content, CRT behavior, and compatibility host fields while adding clone-safe proof boundaries.

## Goal 1: Continue capability resolver

- [ ] Add one stable six-slot registry for three keys across local and session storage.
- [ ] Classify absent, unreadable, invalid JSON, foreign schema, legacy summary, unsupported version, current resumable, and migrated resumable candidates.
- [ ] Add deterministic key/layer/version precedence.
- [ ] Return `continueEnabled`, `selectedCandidate`, `inspectedCandidates`, and `decisionReason`.
- [ ] Make the menu resolve once and expose immutable provenance.
- [ ] Parse `campaign=new|continue` through one shared session-mode service.
- [ ] Make campaign startup consume the same resolver result.
- [ ] Keep `{ scene, souls, wave }` classified as a non-resumable completion summary.
- [ ] Add a DOM-free resolver fixture before integration.

## Goal 2: Campaign action result authority

### State and command boundary

- [ ] Add a pure campaign-state factory with explicit ID counters and tick state.
- [ ] Split simulation-authoritative state from presentation-only camera, pointer, browser-time, and CRT state.
- [ ] Add `CampaignCommand` and `CampaignCommandResult` schemas.
- [ ] Normalize pointer, keyboard, GameHost, and replay requests through source adapters.
- [ ] Allocate monotonic command sequences before preflight.
- [ ] Assign deterministic target ticks, normally `committedTick + 1`.
- [ ] Reject stale, duplicate, unsupported, terminal, and invalid requests through a stable reason vocabulary.

### Command decomposition

- [ ] Separate ally selection, selection toggle, selection clear, pad selection, and build request.
- [ ] Add pure preflight for building, orders, wave start, pause policy, and presentation commands.
- [ ] Return accepted, rejected, or no-op results for every request.
- [ ] Prove rejected and no-op requests preserve the canonical state fingerprint.
- [ ] Apply accepted simulation commands only at the start of their target tick.
- [ ] Drain by `targetTick`, then `sequence`.
- [ ] Allocate entity and event IDs only during accepted application.

### Journals and events

- [ ] Add bounded command and result journals.
- [ ] Add ordered domain events for selection, tower creation, orders, waves, spawning, damage, rewards, sanctum changes, wave clear, and terminal outcomes.
- [ ] Expose first/last retained sequence after deterministic journal eviction.
- [ ] Make all returned rows clone-safe and mutation-proof.

### Committed frame and consumers

- [ ] Add tick IDs, frame IDs, last-applied sequence, and canonical state fingerprints.
- [ ] Publish one immutable `CommittedCampaignFrame` after fixed-step commit.
- [ ] Make world, HUD, minimap, modal, CRT upload/draw, and GameHost observation reference the same frame ID and fingerprint.
- [ ] Record repeated visual frames and multi-tick visual frames explicitly.
- [ ] Preserve legacy GameHost methods as temporary aliases that submit typed commands.
- [ ] Stop adding new direct mutable host fields.

### Fixtures

- [ ] Add action-result fixture cases for accepted, rejected, no-op, terminal, duplicate, and stale commands.
- [ ] Add fixed-step replay proof for identical results, events, IDs, and fingerprints.
- [ ] Add same-tick sequence-order tests.
- [ ] Add accumulator-boundary tests showing browser timing cannot change target ticks.
- [ ] Add committed-frame consumer parity proof.

## Goal 3: Runtime session lifecycle authority

- [ ] Add `createRouteSession({ kind })` with stable session IDs and lifecycle states.
- [ ] Move eager module construction behind an explicit start transaction.
- [ ] Record child ownership for canvases, renderer resources, audio resources, listeners, globals, and RAF requests.
- [ ] Retain every RAF request ID and prevent rescheduling after stop.
- [ ] Replace anonymous listener installation with removable registrations or a ledger.
- [ ] Add reverse-order partial-start rollback.
- [ ] Add idempotent `stop(reason)` and `dispose(reason)`.
- [ ] Add `restart(reason)` that disposes the old session and creates exactly one new session.
- [ ] Route R and Escape through lifecycle authority rather than direct reload/navigation.
- [ ] Scope commands, ticks, frames, persistence, and render observations under the session ID.
- [ ] Add clone-safe lifecycle and resource journals.
- [ ] Add DOM-free lifecycle fixtures and browser resource proof.

## Goal 4: Versioned resume fidelity

After resolver, action, and lifecycle authority are proven:

```txt
versioned full-state save envelope
  -> atomic hydration into a new session
  -> saved/hydrated fingerprint parity
  -> identifier, queue, journal, frame, and lifecycle parity
  -> resume-fidelity fixture
```

## Required validation after implementation

```bash
node tests/phantom-command-candidate-resolver-fixture.mjs
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
new waves, units, towers, or economy systems
save/load UI redesign
camera rewrite
renderer replacement
pixel-art expansion
multiplayer expansion
full campaign module extraction
legacy construct-profile parity work
```
