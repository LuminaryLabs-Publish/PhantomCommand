# Next Steps

**Generated:** `2026-07-16T23-59-01-04-00`  
**Status:** `isometric-middle-pan-anchor-convergence-authority-audited`

## Plan ledger

**Goal:** replace duplicated middle-pan camera math with one revision-bound gesture transaction using the canonical isometric inverse transform.

- [ ] Allocate one pan generation on accepted middle-button pointerdown.
- [ ] Bind document, route, canvas, source viewport, pointer, camera and zoom revisions.
- [ ] Reject gesture starts outside the active source viewport.
- [ ] Capture the exact world anchor under the accepted source position.
- [ ] Normalize ordered source dx/dy evidence.
- [ ] Convert source deltas with the same coefficients used by `screenToWorld`.
- [ ] Remove the duplicated `1 / 0.72` horizontal conversion.
- [ ] Define arbitration between simultaneous keyboard pan and middle pan.
- [ ] Settle campaign camera bounds and report intentional clamp divergence.
- [ ] Reject stale, cancelled, blurred or route-retired evidence.
- [ ] Publish `MiddlePanAdmissionResult`.
- [ ] Publish `MiddlePanResult` with requested and settled camera revisions.
- [ ] Publish `FirstMiddlePanFrameAck`.
- [ ] Publish `PanAnchorConvergenceAck`.
- [ ] Add horizontal, vertical and diagonal gesture fixtures.
- [ ] Repeat fixtures at minimum, default and maximum zoom.
- [ ] Add camera-boundary, blur, resize, letterbox and pillarbox fixtures.
- [ ] Run `npm run check`, `npm run build`, built-output smoke and Pages-origin fixtures.

## Required first vertical slice

```txt
middle pointerdown at source position
  -> MiddlePanAdmissionCommand
  -> grabbed world-anchor snapshot
  -> horizontal source delta
  -> canonical inverse-transform camera displacement
  -> MiddlePanResult
  -> matching rendered camera revision
  -> FirstMiddlePanFrameAck
  -> PanAnchorConvergenceAck
```

## Keep separate

Marquee selection, wheel zoom, pointer capture, keyboard movement, fixed-step simulation, orders, building, pause, route retirement, WebGL recovery and deployment remain separate authorities composed through route, pointer, camera and frame revisions.