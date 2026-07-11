# PhantomCommand Next Steps

**Timestamp:** `2026-07-10T20-19-35-04-00`

## Implementation queue

```txt
1. PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. PhantomCommand Campaign Action Result Authority + Fixed-Step Frame Fixture Gate
3. PhantomCommand Versioned Save Envelope + Atomic Resume Fidelity Gate
```

Preserve current routes, visuals, controls, simulation constants, campaign content, and legacy `window.GameHost` fields while adding pure, clone-safe proof boundaries.

## Goal 1: Continue capability resolver

Create one pure, deterministic resolver consumed by both menu admission and campaign startup.

### Plan ledger

- [ ] Add `src/campaign/save-candidate-registry.js` with three keys and two storage layers.
- [ ] Give all six slots stable IDs, schema ownership, and priority.
- [ ] Add a DOM-free classifier and resolver.
- [ ] Preserve absent, unreadable, invalid-json, foreign-schema, legacy-summary, unsupported-version, resumable-current, and resumable-migrated classifications.
- [ ] Return `continueEnabled`, `selectedCandidate`, `inspectedCandidates`, and `decisionReason`.
- [ ] Make menu initialization call the resolver once.
- [ ] Expose immutable resolver output through `PhantomMenu.getState()`.
- [ ] Parse `campaign=new|continue` in a shared session-mode service.
- [ ] Make campaign startup consume the same resolution result.
- [ ] Keep the existing `{ scene, souls, wave }` payload classified as a non-resumable completion summary.
- [ ] Add `tests/phantom-command-candidate-resolver-fixture.mjs`.
- [ ] Prove all six slots are inspected exactly once.
- [ ] Prove precedence and rejection reasons are deterministic.
- [ ] Add the fixture to `npm run check` only after independent success.

## Goal 2: Campaign action result authority

Normalize every gameplay request into a typed command, evaluate preconditions at a deterministic fixed-step boundary, and retain accepted, rejected, and no-op results.

### Plan ledger

- [ ] Add a pure campaign-state factory usable without DOM or WebGL.
- [ ] Add `src/campaign/action-command.js` with stable command types and payload validation.
- [ ] Add one monotonic command-sequence allocator per campaign session.
- [ ] Normalize pointer, keyboard, GameHost, and replay requests through one `submitCommand()` adapter.
- [ ] Separate pad selection from tower construction.
- [ ] Add explicit preflight for `build`, `order`, and `wave.start`.
- [ ] Return `accepted`, `rejected`, or `no-op` results with stable reasons.
- [ ] Preserve state fingerprints before and after execution.
- [ ] Schedule simulation commands to deterministic target ticks.
- [ ] Ensure DOM callbacks never mutate simulation state directly.
- [ ] Add bounded command, result, and event journals.
- [ ] Add `tickId` and `frameId` counters.
- [ ] Add a canonical simulation-state fingerprint.
- [ ] Commit an immutable presentation snapshot after simulation.
- [ ] Record world, HUD, minimap, modal, and CRT consumption against one committed frame.
- [ ] Add clone-safe GameHost observations while preserving legacy fields.
- [ ] Add `tests/phantom-command-action-result-fixture.mjs`.
- [ ] Add `tests/phantom-command-fixed-step-command-fixture.mjs`.
- [ ] Add `tests/phantom-command-frame-consumption-fixture.mjs`.
- [ ] Prove rejected commands leave the state fingerprint unchanged.
- [ ] Prove identical command sequences and target ticks yield identical results and fingerprints.
- [ ] Prove all presentation surfaces report the same committed frame.
- [ ] Add fixtures to `npm run check` only after independent success.

## Action-result acceptance rows

```txt
build accepted -> one tower, one soul debit, one pad link
build rejected / no-selected-pad -> unchanged fingerprint
build rejected / pad-occupied -> unchanged fingerprint
build rejected / insufficient-souls -> unchanged fingerprint
order rejected / no-selected-units -> unchanged fingerprint
order accepted / move -> selected allies receive deterministic destinations
order accepted / attack -> selected allies receive target ID
wave accepted -> deterministic spawn queue
wave rejected / wave-already-active -> unchanged fingerprint
wave rejected / campaign-won -> unchanged fingerprint
wave rejected / campaign-lost -> unchanged fingerprint
wave rejected / no-wave-remaining -> unchanged fingerprint
one terminal result per valid command
monotonic command, tick, result, event, and frame IDs
render and GameHost fingerprints equal committed-frame fingerprint
```

## Goal 3: Versioned resume fidelity

After the resolver and action authority are proven:

```txt
versioned full-state save envelope
  -> atomic hydration
  -> saved/hydrated fingerprint parity
  -> identifier counter parity
  -> fixed-step queue and journal parity
  -> committed-frame parity
  -> resume-fidelity fixture
```

## Required validation after implementation

```bash
node tests/phantom-command-candidate-resolver-fixture.mjs
node tests/phantom-command-action-result-fixture.mjs
node tests/phantom-command-fixed-step-command-fixture.mjs
node tests/phantom-command-frame-consumption-fixture.mjs
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
