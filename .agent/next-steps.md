# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T01-20-51-04-00`

## Plan ledger

**Goal:** establish one deterministic session-admission authority before implementing action replay, lifecycle ownership, or full resume hydration.

- [ ] Add a stable registry for the six current storage slots.
- [ ] Read every slot through an injected storage adapter.
- [ ] Parse and classify every candidate without mutating storage.
- [ ] Encode deterministic key, layer, version, and migration precedence.
- [ ] Return one immutable Continue capability decision.
- [ ] Parse `campaign=new|continue` through one route-intent service.
- [ ] Make campaign startup consume the same resolver result used by the menu.
- [ ] Expose clone-safe provenance through PhantomMenu and future GameHost startup observations.
- [ ] Add DOM-free candidate-resolution and session-admission fixtures.
- [ ] Add the fixtures to `npm run check` and the Pages validation step only after they pass independently.

## Implementation queue

```txt
1. PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. PhantomCommand Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. PhantomCommand Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. PhantomCommand Versioned Save Envelope + Atomic Resume Fidelity Gate
```

Preserve current routes, visuals, controls, source-canvas sizes, simulation constants, balance, content, CRT behavior, and compatibility diagnostic fields.

## Goal 1: Continue capability resolver

### Slot registry

- [ ] Define stable IDs for all three keys in local and session storage.
- [ ] Record layer, key, priority, expected authority, and supported adapters.
- [ ] Keep registry order data-driven and versioned.

### Candidate inspection

- [ ] Distinguish absent, unreadable, empty, invalid JSON, foreign shape, unsupported version, completion summary, legacy resumable, current resumable, and migrated resumable.
- [ ] Compute payload fingerprints without exposing raw payloads.
- [ ] Retain inspection evidence for every slot.
- [ ] Ensure storage errors do not crash menu startup.

### Precedence and decision

- [ ] Select at most one resumable candidate through explicit precedence.
- [ ] Define deterministic tie behavior.
- [ ] Return `continueEnabled`, `selectedCandidate`, `inspectedCandidates`, `decisionReason`, `resolverVersion`, and `decisionFingerprint`.
- [ ] Keep the current `{ scene, souls, wave }` payload as `legacy-completion-summary` and non-resumable.
- [ ] Make the menu resolve once per resolver generation instead of calling `hasCampaignSave()` twice.

### Route and startup admission

- [ ] Parse `new`, `continue`, and invalid route modes.
- [ ] Return typed accepted, rejected, or no-op route activation results.
- [ ] Reject Continue when no resumable candidate exists.
- [ ] Do not silently convert rejected Continue to a fresh campaign.
- [ ] Stage and validate fresh or hydrated state before session commit.
- [ ] Correlate menu decision, transition admission, and campaign startup by IDs and fingerprints.

### Diagnostics

- [ ] Replace `PhantomMenu.getState().hasSave` as the primary proof with a clone-safe admission projection.
- [ ] Expose selected slot ID, candidate kind, version, scene, counts, decision reason, and fingerprint.
- [ ] Never expose raw storage values through browser globals.

### Fixtures

- [ ] Add `tests/phantom-command-candidate-resolver-fixture.mjs`.
- [ ] Add `tests/phantom-command-session-admission-fixture.mjs`.
- [ ] Cover all six slots, invalid data, unsupported versions, completion summaries, multiple valid candidates, precedence, ties, storage errors, mutation resistance, stable fingerprints, and route modes.
- [ ] Prove `new` consumes no candidate.
- [ ] Prove accepted `continue` consumes exactly the selected candidate.
- [ ] Prove rejected `continue` commits no fresh or hydrated session.

## Goal 2: Campaign action result authority

After startup admission is proven:

```txt
source request
  -> typed command
  -> monotonic sequence
  -> deterministic target tick
  -> pure preflight
  -> accepted/rejected/no-op result
  -> fixed-step application
  -> ordered events
  -> canonical state fingerprint
  -> committed frame
  -> render and GameHost consumption rows
```

Preserve the detailed action-authority work already recorded in the `2026-07-10T23-40-35-04-00` audit set.

## Goal 3: Runtime session lifecycle authority

- [ ] Add explicit menu and campaign route sessions.
- [ ] Own and cancel RAF requests.
- [ ] register and remove listeners.
- [ ] dispose AudioContext and CRT WebGL resources.
- [ ] add partial-start rollback, stop, dispose, and restart.
- [ ] reject stale callbacks by session identity.

## Goal 4: Versioned resume fidelity

After resolver, action, and lifecycle authority:

```txt
versioned full-state save envelope
  -> atomic hydration into a new session
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
