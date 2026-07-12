# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T01-20-00-04-00`

## Summary

Preserve Continue admission and public-host quarantine as earlier gates, then unify the CRT display and pointer projection. The immediate projection ledge is a pure, immutable descriptor with matching CPU and GLSL adapters, followed by outside-region admission and browser pixel-pick fixtures.

## Plan ledger

**Goal:** close visible/semantic coordinate drift without creating a second render, input or command authority.

- [ ] Preserve Continue/checkpoint Gate 1.
- [ ] Preserve public-host owner quarantine and typed command admission.
- [ ] Add one immutable projection descriptor.
- [ ] Move contain and curve constants into the descriptor.
- [ ] Compile CPU and GLSL adapters from the same descriptor.
- [ ] Make pointer mapping settings-aware.
- [ ] Return typed mapping results with projection and surface revisions.
- [ ] Reject letterbox, pillarbox and curved-black regions.
- [ ] Require campaign commands to consume admitted mapping results.
- [ ] Correlate mapping, command and visible frame.
- [ ] Add pure parity and browser pixel-pick fixtures.

## Immediate safe ledge

1. Extract pure contain and curve reference functions.
2. Add `ProjectionDescriptor` with source size, output size, CRT enablement and curve strength.
3. Make shader uniforms and `screenToSource()` consume the descriptor.
4. Declare `CENTER_GREEN` as the semantic sample policy.
5. Return `MAPPED_INSIDE_VISIBLE_SOURCE` or a typed rejection.
6. Reject campaign actions when mapping is not admitted.
7. Add numeric parity fixtures before changing higher-level command routing.

## Full implementation sequence

1. Add `src/projection/projection-descriptor.js`.
2. Add `src/projection/contain-projection.js`.
3. Add `src/projection/curve-projection.js`.
4. Add `src/projection/pointer-mapping-result.js`.
5. Refactor `src/menu/crt-renderer.js` to compile render and input adapters from one descriptor.
6. Pass menu CRT settings revision into the active descriptor.
7. Update menu pointer paths to consume typed results.
8. Update campaign click, drag, order, pan and wheel paths to reject outside results.
9. Add projection and surface revisions.
10. Add projection frame receipts.
11. Add pure CPU/GLSL reference fixtures.
12. Add menu and campaign browser pixel-pick smokes.

## Target files

```txt
src/menu/crt-renderer.js
src/menu/graveyard-menu.js
src/campaign/campaign-scene.js
src/projection/projection-descriptor.js
src/projection/contain-projection.js
src/projection/curve-projection.js
src/projection/pointer-mapping-result.js
tests/projection-reference.fixture.mjs
tests/projection-parity.fixture.mjs
tests/projection-revision.fixture.mjs
scripts/smoke-menu-projection.mjs
scripts/smoke-campaign-projection.mjs
scripts/check-menu.mjs
scripts/check-campaign.mjs
package.json
```

## Required fixtures

```txt
contain parity for wide, tall and equal aspects
curved parity at center, quadrants, edges and corners
CRT-disabled menu pointer parity
CRT-enabled menu pointer parity
curved-black-region rejection
campaign center and edge selection parity
campaign right-click order parity
campaign drag-selection parity
wheel-anchor parity
resize and CRT-toggle stale-result rejection
first frame after projection revision receipt
```

## Do not claim

Do not claim pointer accuracy, CRT input parity, border rejection, zoom-anchor correctness or frame-coherent targeting until these fixtures pass on `main`.