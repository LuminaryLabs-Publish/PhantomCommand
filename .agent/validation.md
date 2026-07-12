# PhantomCommand Validation

**Timestamp:** `2026-07-12T11-40-50-04-00`

## Summary

This run changed documentation only. Source inspection proves that containment metadata exists, but campaign pointer handlers do not use it before state or camera mutation. It also proves that visible CRT curvature and CPU input projection do not share one inverse-compatible transform.

## Plan ledger

**Goal:** distinguish source-coordinate calculation from admitted, visible-world campaign interaction.

- [x] Inspect `screenToSource()` containment and `inside` classification.
- [x] Inspect CRT shader contain and curve transforms.
- [x] Inspect campaign point selection, rectangle selection, orders, pan and wheel paths.
- [x] Confirm outside-surface coordinates reach `screenToWorld()` and mutation owners.
- [x] Confirm camera/display generations and typed results are absent.
- [x] Document authority, command, result, observation and fixture requirements.
- [ ] Execute fixtures after implementation.

## Proven from source

```txt
campaign source frame is 640x360
renderer uses contain projection
screenToSource returns x, y and inside
letterbox coordinates can return out-of-range x/y with inside=false
campaign handlers retain the flag but do not admit against it
right-click always calls order(screenToWorld(pointer))
left drag can select from outside-surface coordinates
middle drag mutates camera from source-coordinate deltas
wheel mutates zoom and camera around the projected point
visible CRT mode applies curveUv before texture sampling
CPU screenToSource does not invert curveUv
```

## Existing checks prove

```txt
campaign HTML and module references exist
campaign source contains expected rings, lanes, content and host tokens
CRT source contains expected texture-upload and resolution tokens
static build copies deployable source files
```

## Existing checks do not prove

```txt
letterbox selection/order/pan/zoom are inert
CRT-enabled input matches visible pixels
source-to-world projection uses a current camera revision
drag and pan have bounded gesture ownership
stale display, camera or gesture results are rejected
campaign pointer commands return typed terminal results
applied results correlate with visible frames
local and Pages behavior match
```

## Change boundary

```txt
runtime source changed: no
menu behavior changed: no
campaign behavior changed: no
pointer behavior changed: no
camera behavior changed: no
simulation changed: no
rendering changed: no
audio changed: no
persistence changed: no
navigation changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser campaign-pointer smoke: not run
Pages campaign-pointer smoke: not run
```

## Required fixtures

```txt
fixture:campaign-letterbox-point-noop
fixture:campaign-letterbox-order-noop
fixture:campaign-letterbox-pan-noop
fixture:campaign-letterbox-wheel-noop
fixture:campaign-drag-boundary-policy
fixture:crt-curve-inverse-roundtrip
fixture:display-generation-stale-rejection
fixture:camera-revision-stale-rejection
fixture:gesture-lease-cancellation
fixture:campaign-pointer-command-frame-correlation
smoke:campaign-pointer-browser
smoke:campaign-pointer-pages
```

No campaign pointer correctness, visible-pixel parity, stale-result rejection, gesture ownership or deployment-readiness claim is made.