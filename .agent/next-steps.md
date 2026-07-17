# Next Steps

**Generated:** `2026-07-17T06-38-14-04-00`  
**Status:** `campaign-input-region-arbitration-authority-audited`

## Intent

Make visible source-region ownership authoritative before selection, marquee and order commands mutate campaign state.

## Checklist

### Phase 1: Region manifest

- [ ] Publish source viewport, world, HUD, controls, minimap and modal regions from the render layout.
- [ ] Give the manifest a route, frame, viewport and overlay revision.
- [ ] Resolve topmost visible region with the same z-order used by rendering.

### Phase 2: Pointer admission

- [ ] Enforce `screenToSource().inside` before `screenToWorld()`.
- [ ] Bind pointerdown, move and up to one gesture and region-manifest revision.
- [ ] Retire world gestures when a modal opens, the viewport changes or the route exits.
- [ ] Define explicit passive or navigation behavior for the minimap.

### Phase 3: Command settlement

- [ ] Require an accepted world region for click selection.
- [ ] Require an accepted world region for marquee selection.
- [ ] Require an accepted world region for right-click orders.
- [ ] Publish `InputRegionDecisionResult` and `WorldCommandAdmissionResult`.
- [ ] Publish `FirstRegionBoundCommandFrameAck`.

### Phase 4: Fixtures

- [ ] HUD click does not select or order.
- [ ] Tower-control drag does not marquee-select.
- [ ] Passive minimap RMB does not order.
- [ ] Modal overlay suspends world commands.
- [ ] Letterbox/pillarbox evidence is rejected.
- [ ] Unobscured world click, drag and order preserve existing behavior.
- [ ] Run source, built-artifact and Pages-origin parity fixtures.

## Recommended file cut

```txt
src/campaign/campaign-scene.js
src/campaign/input-region-manifest.js
src/campaign/input-region-authority.js
tests/browser/campaign-input-regions.html
```

## Compatibility constraints

Preserve the 640×360 source surface, CRT mapping, UI layout, camera transforms, selection rules, order semantics, fixed-step simulation, rendering appearance, saves, audio and deployment.

## Claim boundary

Do not claim pointer-region correctness until source, artifact and Pages fixtures prove that presentation-region evidence cannot fall through into world mutation.