# PhantomCommand Validation

**Timestamp:** `2026-07-12T19-58-07-04-00`

## Summary

This documentation-only run verifies the current campaign spatial-input paths. Source inspection proves that source containment is ignored, visible CRT curvature is not inverted, pointer gestures have no identity/capture lifecycle, and rectangle selection uses an incomplete inverse transform. It does not prove a runtime correction or deployed input safety.

## Plan ledger

**Goal:** separate source-backed spatial-input defects from unimplemented surface, pointer, transform, result and browser proof.

- [x] Compare the Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome` and select only `PhantomCommand`.
- [x] Verify required root `.agent` files and the new timestamped audit family.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Inspect campaign pointer ingress, CRT projection, selection, order, camera and rendering.
- [x] Change documentation only.
- [ ] Execute campaign spatial-input fixtures after implementation.

## Proven from source

```txt
screenToSource calculates an inside flag
campaign pointer handlers do not enforce inside
CRT rendering applies radial curvature when enabled
screenToSource reverses aspect containment only
pointer ID, capture, cancel and lost-capture handling are absent
left drag transforms only source min/min and max/max corners
selection membership tests a world-axis box from those two points
40 x 20 source rectangle can collapse tested world-z width to zero
right-click orders use raw projected world points
middle drag and wheel zoom use raw projected source points
surface, focus, transform, camera, entity and selection revisions are absent
terminal spatial-input results and visible-frame acknowledgements are absent
```

## Proven documentation state

```txt
START_HERE current: yes
current-audit current: yes
next-steps current: yes
known-gaps current: yes
validation current: yes
kit-registry current: yes
tracker and turn ledger present: yes
architecture/render/gameplay/interaction/campaign-input/deploy audits present: yes
central ledger and internal change log required: yes
```

## Existing checks can establish, when run

```txt
campaign entry files exist
campaign source includes expected authored/runtime/render tokens
CRT renderer symbols exist
window.GameHost token exists
static build includes source files
```

## Existing checks cannot establish

```txt
outside-source zero mutation
visible CRT/source projection parity
pointer ownership and capture lifecycle
pointer cancellation safety
correct rectangle selection membership
point-selection hit accuracy
order-target admission
camera pan and wheel-anchor admission
stale transform/camera/entity/selection rejection
terminal CampaignSpatialInputResult
CampaignActionResult correlation
first visible spatial-result frame acknowledgement
source/build/Pages input parity
```

## Required deterministic fixtures

```txt
fixture:campaign-source-containment
fixture:campaign-crt-inverse-projection
fixture:campaign-pointer-identity
fixture:campaign-pointer-cancel
fixture:campaign-point-selection
fixture:campaign-drag-selection-four-directions
fixture:campaign-drag-selection-cancellation-ratios
fixture:campaign-order-target
fixture:campaign-camera-pan
fixture:campaign-wheel-anchor
fixture:campaign-stale-transform
fixture:campaign-stale-camera
fixture:campaign-stale-entities
fixture:campaign-zero-mutation-rejections
fixture:campaign-visible-spatial-frame
```

## Required browser matrix

```txt
source route, built output and GitHub Pages
CRT enabled and disabled
matching, wide and tall aspect ratios
mouse, pen and touch-capable pointer sequences
single-pointer and multi-pointer paths
point, additive and drag selection
right-click order
middle-pan and wheel zoom
minimum, default and maximum zoom
stale and cancelled gestures
first visible spatial-result frame
```

## Change boundary

```txt
runtime source changed: no
campaign behavior changed: no
pointer behavior changed: no
selection/order/camera behavior changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
target branch: main
npm run check executed: no
npm run build executed: no
browser spatial-input smoke executed: no
Pages spatial-input smoke executed: no
spatial-input fixtures available: no
```

## Claim boundary

The audit proves that current campaign spatial input can disagree with visible geometry and lacks typed admission, ownership and result proof. It does not claim the defect is fixed, selection membership is correct, pointer gestures are isolated or the deployed route passed geometry fixtures.
