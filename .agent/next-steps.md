# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T19-58-07-04-00`

## Summary

The next campaign-input boundary is Campaign Spatial Input Admission Authority, but it should consume the typed Campaign Action Result path rather than introduce another direct mutation route. Implement surface ownership, pointer identity, visible CRT projection and correct selection geometry before enabling browser or public replay fixtures.

## Plan ledger

**Goal:** create one deterministic pointer transaction from DOM evidence through visible/source/world projection, typed spatial result, campaign action result and first-visible-frame proof.

- [ ] Complete Campaign Action Result Authority first.
- [ ] Introduce campaign input-surface identity and generation.
- [ ] Introduce focus generation and surface-retirement rules.
- [ ] Add pointer sample IDs and monotonic sequences.
- [ ] Enforce primary pointer and supported button policies.
- [ ] Bind pointerdown, move, up, cancel and capture loss to one pointer identity.
- [ ] Add `setPointerCapture`, `lostpointercapture` and `pointercancel` handling.
- [ ] Add viewport and CRT transform revisions.
- [ ] Implement inverse visible CRT projection or disable curvature for interactive geometry.
- [ ] Return a typed `SourceContainmentResult`.
- [ ] Reject outside-source input with zero selection, order, camera or feedback mutation.
- [ ] Return a revisioned `WorldProjectionResult`.
- [ ] Replace two-corner rectangle selection with source-space membership or a complete four-corner polygon.
- [ ] Add typed point-selection and selected-pad hit results.
- [ ] Add typed order-target admission results.
- [ ] Add typed pan and wheel-anchor results.
- [ ] Reject stale transform, camera, entity-set and selection revisions.
- [ ] Publish bounded spatial-input observations and a journal.
- [ ] Route accepted spatial results into typed campaign actions.
- [ ] Add first-visible-spatial-result frame acknowledgement.
- [ ] Add deterministic geometry, cancellation and zero-mutation fixtures.
- [ ] Add source, built-output and GitHub Pages browser parity fixtures.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Existing owners to update

```txt
src/menu/crt-renderer.js
src/campaign/campaign-scene.js
crt-renderer-kit
pixel-campaign-runtime-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
campaign-static-check-kit
scripts/check-campaign.mjs
package.json
game.html
```

## Required command shape

```txt
CampaignSpatialInputCommand {
  commandId
  sequence
  sourceKind
  surfaceId
  surfaceGeneration
  focusGeneration
  pointerId
  pointerType
  button
  gestureId?
  viewportTransformRevision
  crtTransformRevision
  cameraRevision
  entityRevision?
  selectionRevision?
  sourcePoint
  actionKind
}
```

## Required result shape

```txt
CampaignSpatialInputResult {
  commandId
  status
  reason?
  containmentResult
  sourcePoint?
  worldPoint?
  selectionPolygon?
  selectedEntityIds[]
  targetEntityId?
  cameraDelta?
  predecessorSelectionRevision?
  expectedSuccessorSelectionRevision?
  predecessorCameraRevision?
  expectedSuccessorCameraRevision?
}
```

## Minimal correction sequence

```txt
1. Fence current browser ingress behind one spatial dispatcher.
2. Add surface, focus, pointer and gesture identity.
3. Enforce source containment before any world projection.
4. Unify visible CRT and logical input transforms.
5. Add camera and entity revisions to projection results.
6. Evaluate rectangle membership in source space or a full polygon.
7. Return one terminal spatial result.
8. Feed accepted results into Campaign Action Result Authority.
9. Prove zero mutation for rejected evidence.
10. Acknowledge the first visible successor frame.
```

## Fixture gate

```txt
letterbox/pillarbox outside-source rejection
CRT on/off projection probes
pointer identity mismatch
pointercancel and lost capture
point selection hit/miss
additive selection
four drag directions
40 x 20 cancellation-ratio regression
camera translation and min/default/max zoom
order target hit/miss/stale
pan and wheel-anchor results
zero mutation after every rejection
source/build/Pages parity
first visible spatial-result frame
```

## Dependency order

```txt
Runtime Session Resource Lifecycle Authority
  -> Campaign Action Result Authority
  -> Campaign Spatial Input Admission Authority
  -> CRT Display/Input Projection Authority
  -> Campaign Phase Admission Authority
  -> Fixed-Step Command Scheduling Replay Authority
  -> Public Host Committed Read Model
```

Do not patch only the rectangle math. The correction requires source containment, visible-transform parity, pointer ownership, revisioned projection, typed terminal results and visible-frame proof.
