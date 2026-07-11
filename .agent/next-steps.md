# PhantomCommand Next Steps

**Timestamp:** `2026-07-10T21-49-26-04-00`

## Implementation queue

```txt
1. PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. PhantomCommand Campaign Action Result Authority + Fixed-Step Frame Fixture Gate
3. PhantomCommand Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. PhantomCommand Versioned Save Envelope + Atomic Resume Fidelity Gate
```

Preserve current routes, visuals, controls, simulation constants, campaign content, and legacy host fields while adding pure, clone-safe proof boundaries.

## Goal 1: Continue capability resolver

- [ ] Add one stable six-slot candidate registry for three keys across local and session storage.
- [ ] Classify absent, unreadable, invalid JSON, foreign schema, legacy summary, unsupported version, current resumable, and migrated resumable candidates.
- [ ] Add deterministic key/layer/version precedence.
- [ ] Return `continueEnabled`, `selectedCandidate`, `inspectedCandidates`, and `decisionReason`.
- [ ] Make the menu resolve once and expose immutable provenance.
- [ ] Parse `campaign=new|continue` through one shared session-mode service.
- [ ] Make campaign startup consume the same resolver result.
- [ ] Keep `{ scene, souls, wave }` classified as a non-resumable completion summary.
- [ ] Add a DOM-free candidate-resolver fixture and gate `npm run check` only after it passes independently.

## Goal 2: Campaign action result authority

- [ ] Add a pure campaign-state factory.
- [ ] Normalize pointer, keyboard, GameHost, and replay requests into typed commands.
- [ ] Separate pad selection from build admission.
- [ ] Add explicit preflight for build, order, and wave start.
- [ ] Return accepted, rejected, or no-op results with stable reasons.
- [ ] Allocate monotonic command sequences and deterministic target ticks.
- [ ] Prevent DOM callbacks from mutating simulation state directly.
- [ ] Add bounded command, result, and event journals.
- [ ] Add tick/frame IDs, canonical state fingerprints, and immutable committed presentation frames.
- [ ] Record world, HUD, minimap, modal, CRT, and GameHost consumption against one committed frame.
- [ ] Prove rejection preserves the state fingerprint and replay is deterministic.

## Goal 3: Runtime session lifecycle authority

Create one explicit route-session owner for menu and campaign.

- [ ] Add `createRouteSession({ kind })` with stable session IDs and lifecycle states.
- [ ] Move eager module construction behind an explicit start transaction.
- [ ] Record child ownership as canvases, renderer resources, audio resources, listeners, exported globals, and RAF requests are created.
- [ ] Retain every RAF request ID and prevent rescheduling after stop.
- [ ] Replace anonymous listener installation with removable registrations or a listener ledger.
- [ ] Add partial-start rollback in reverse allocation order.
- [ ] Add `stop(reason)` that closes input admission, cancels frames, and stops simulation.
- [ ] Add `dispose(reason)` that removes listeners, closes audio, releases CRT WebGL resources, and clears owned globals.
- [ ] Add idempotent stop/dispose results.
- [ ] Add `restart(reason)` that disposes the old session and creates one new session.
- [ ] Scope action, tick, frame, persistence, and render observations beneath the session ID.
- [ ] Add clone-safe `getLifecycleState()` and bounded lifecycle/resource journals to `PhantomMenu` and `GameHost` without removing existing fields.
- [ ] Add DOM-free lifecycle, listener-ledger, and restart-idempotency fixtures.
- [ ] Add browser proof for one RAF loop, one listener set, and zero live owned resources after disposal.
- [ ] Add fixtures to `npm run check` only after independent success.

## Lifecycle acceptance rows

```txt
start accepted -> one session ID, one listener set, one RAF owner, one CRT resource set
partial start rejected -> every completed allocation rolled back
stop accepted -> no new input, simulation, render, or frame scheduling
stop repeated -> already-stopped result, no duplicate cancellation
dispose accepted -> zero live owned listeners/audio/render resources
dispose repeated -> already-disposed result, no duplicate release
restart accepted -> old session disposed, one new session running
stale input/callback -> rejected with stale-session reason
menu transition -> one accepted transition, duplicate activation rejected
campaign terminal -> gameplay admission closed with stable terminal reason
```

## Goal 4: Versioned resume fidelity

After resolver, action, and lifecycle authority are proven:

```txt
versioned full-state save envelope
  -> atomic hydration into a new session
  -> saved/hydrated fingerprint parity
  -> identifier, command queue, journal, and frame parity
  -> resume-fidelity fixture
```

## Required validation after implementation

```bash
node tests/phantom-command-candidate-resolver-fixture.mjs
node tests/phantom-command-action-result-fixture.mjs
node tests/phantom-command-fixed-step-command-fixture.mjs
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