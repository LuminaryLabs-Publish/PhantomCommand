# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T09-40-19-04-00`

## Summary

Keep the existing dependency order, but add display/input projection parity inside campaign action authority before pointer-derived commands are admitted. A typed command is not deterministic if the visible point under the cursor and the source/world coordinate in the command are produced by different transforms.

## Plan ledger

**Goal:** implement deterministic Continue and campaign commands with one shared CRT display, pointer, source-canvas and isometric world projection contract.

- [ ] Finish save-candidate resolution first.
- [ ] Extract one versioned `PresentationTransform` shared by render and input.
- [ ] Reproduce contain and CRT curvature in CPU pointer projection.
- [ ] Return typed projection results with revision and rejection reason.
- [ ] Replace world-AABB drag selection with source-screen inclusion.
- [ ] Normalize browser and `GameHost` actions into typed commands.
- [ ] Add canonical campaign phase and legal transitions.
- [ ] Apply admitted gameplay commands only in fixed-step updates.
- [ ] Publish typed results, journals, fingerprints and committed frames.
- [ ] Finish runtime lifecycle ownership and checkpoint resume.
- [ ] Add projection, phase, replay, lifecycle and resume fixtures.

## Ordered implementation sequence

### Gate 1: Continue capability

1. Enumerate all candidate slots once.
2. Parse and classify each candidate independently.
3. Validate schema, content identity and provenance.
4. Apply deterministic precedence.
5. Publish one candidate or typed rejection.
6. Pass candidate identity into campaign startup.

### Gate 2a: Display/input projection authority

1. Extract shader containment and radial curve parameters into `PresentationTransform`.
2. Version the transform on resize, source-resolution change and CRT settings change.
3. Implement pure `containDisplayUv()` and `curveSourceUv()` helpers used by CPU tests.
4. Implement `displayToSource()` that mirrors shader source sampling.
5. Return `insideDisplay`, `insideSource`, source coordinate, transform revision and reason.
6. Reject pointer commands projected with a stale transform revision.
7. Use the same result for menu hover, activation, campaign click, order and wheel anchor.
8. Keep source/world conversion separate and pure.
9. For drag selection, project selectable entities to source-screen space and test the visual rectangle.
10. Record projection provenance in typed campaign commands and debug observation.

### Gate 2b: Campaign action and phase authority

1. Extract browser callbacks and `GameHost` mutators into source adapters.
2. Define `CampaignCommand` with command ID, source, session, run, projection revision, observed phase, sequence and target tick.
3. Add canonical phase, legal transitions and command-to-phase admission.
4. Reject select/build/order/start-wave outside `ACTIVE`.
5. Retire held keys, drag and middle-pan state on phase changes.
6. Run gameplay preflight after projection and phase preflight.
7. Queue admitted gameplay commands for deterministic fixed-step application.
8. Publish accepted, rejected, idempotent and duplicate results.

### Gate 2c: Fixed-step and committed-frame authority

1. Apply commands at deterministic target ticks.
2. Record ordered domain events.
3. Publish canonical state fingerprints.
4. Commit immutable frame identity including projection and phase revisions.
5. Correlate world, HUD, minimap, overlay and CRT consumption.

### Gate 3: Runtime lifecycle

1. Extract menu and campaign factories from module scope.
2. Add session/run identity and lifecycle states.
3. Lease RAF, listeners, timers, globals, audio and CRT resources.
4. Fence stale callbacks by run generation.
5. Complete teardown before navigation, reload or restart.

### Gate 4: Versioned checkpoint and atomic resume

1. Capture only at a committed simulation tick.
2. Add schema and campaign content identity.
3. Capture canonical detached authoritative state.
4. Validate, migrate and stage hydration.
5. Commit one new resume epoch atomically or roll back unchanged.
6. Acknowledge the first resumed frame.

## First target files

```txt
src/menu/crt-projection.js
src/menu/crt-renderer.js
src/menu/graveyard-menu.js
src/campaign/isometric-projection.js
src/campaign/campaign-command.js
src/campaign/campaign-scene.js
tests/crt-projection-parity.fixture.mjs
tests/pointer-roundtrip.fixture.mjs
tests/drag-selection.fixture.mjs
scripts/check-projection.mjs
package.json
```

## Required fixtures

```txt
CPU versus shader projection samples
CRT enabled and disabled pointer parity
letterbox and pillarbox rejection
resize/settings transform revision
menu hit-test visual parity
campaign click/order visual parity
wheel-anchor stability
drag selection visual inclusion
stale projection rejection
candidate precedence
phase transition and mutation barriers
fixed-step replay and frame correlation
runtime teardown
checkpoint roundtrip/corruption/migration/rollback
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