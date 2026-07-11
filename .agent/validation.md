# PhantomCommand Validation

**Timestamp:** `2026-07-11T09-40-19-04-00`

## Summary

This pass changed documentation only. Source inspection confirms that the CRT shader and pointer mapper use different transforms, while existing checks only assert that both `curveUv` and `screenToSource` exist. No executable fixture currently proves that a displayed point maps back to the source or world point visually under the cursor.

## Plan ledger

**Goal:** separate verified repository facts from planned projection, command, phase, lifecycle and resume proof.

- [x] Confirm default branch is `main`.
- [x] Confirm no branch or pull request was created.
- [x] Read CRT shader, pointer mapping, menu hit tests, campaign interaction and current `.agent` state.
- [x] Verify CRT curve is omitted from `screenToSource()`.
- [x] Verify drag selection converts two inverse-projected corners into a world AABB.
- [x] Record current scripts and missing fixtures.
- [ ] Run behavioral validation after projection authority exists.

## Current scripts

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs
```

## This pass

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
persistence changed: no
deployment workflow changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
```

## Verified by source inspection

```txt
shader containment: containUv(vUv)
shader CRT geometry: curveUv(uv) when enabled
pointer containment: implemented
pointer CRT curve: absent
pointer transform revision: absent
pointer projection result: untyped object
menu uses screenToSource: yes
campaign click/order/wheel uses screenToSource: yes
drag selection visual-space test: no
drag selection inverse corners: 2
drag selection world AABB: yes
CPU/GLSL parity fixture: absent
```

## Missing future gates

```txt
npm run fixture:crt-projection-parity
npm run fixture:pointer-roundtrip
npm run fixture:pointer-boundaries
npm run fixture:wheel-anchor
npm run fixture:drag-selection
npm run fixture:candidate-resolver
npm run fixture:action-authority
npm run fixture:phase-admission
npm run fixture:fixed-step-replay
npm run fixture:lifecycle
npm run fixture:checkpoint
npm run smoke:pointer-browser
npm run smoke:resume
```

## Projection fixture assertions

```txt
CRT disabled display-to-source samples match containment math
CRT enabled samples match curveUv(containUv(displayUv))
center, corners, edge and radial samples remain within tolerance
letterbox and pillarbox regions reject with stable reasons
resize and CRT setting changes advance transform revision
stale projection revision rejects before command mutation
menu hit tests use the visually sampled source point
campaign click and right-click use the same source/world point
wheel zoom preserves the visually anchored world point
drag selection equals projected-entity inclusion in the drawn rectangle
```

## Browser smoke

```txt
open menu with CRT enabled
hover and activate items near center and outer menu bounds
open campaign at several aspect ratios
click allies and pads near center and outer rings
right-click visible enemies and ground points
wheel zoom while pointer is near outer rings
box-select allies using tight rectangles
repeat with CRT disabled
compare action target to visibly sampled point
```

## Current claim boundary

```txt
repo inventory compared: yes
root .agent state confirmed: yes
documentation pushed to main: yes
runtime projection implementation: no
CRT pointer parity: no
drag-selection visual parity: no
wheel-anchor proof: no
projection/frame proof: no
```