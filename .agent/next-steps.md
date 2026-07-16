# Next Steps

**Generated:** `2026-07-16T10-38-36-04-00`  
**Status:** `wheel-zoom-delta-anchor-convergence-authority-audited`

## Plan ledger

**Goal:** replace the direct wheel mutation with one normalized, revision-bound zoom transaction that keeps the intended world point beneath the pointer throughout camera convergence.

- [ ] Normalize `WheelEvent.deltaY` using `deltaMode` for pixel, line and page units.
- [ ] Define bounded line-height and page-height conversion policy values.
- [ ] Coalesce high-frequency trackpad evidence into a stable wheel-command revision.
- [ ] Record route, canvas, pointer, camera and policy revisions on admission.
- [ ] Reject evidence from retired routes or stale camera generations.
- [ ] Snapshot the world-space anchor beneath the pointer before changing zoom.
- [ ] Derive the accepted clamped `targetZoom` from normalized evidence.
- [ ] Solve camera position against the stored world anchor while zoom eases.
- [ ] Settle exact no-op results at min/max zoom rather than emitting ambiguous movement.
- [ ] Publish `WheelZoomResult` for accepted, unchanged, superseded, invalid and retired commands.
- [ ] Publish `FirstWheelZoomFrameAck` for the first frame using the accepted zoom revision.
- [ ] Publish `ZoomAnchorConvergenceAck` when the target and anchor tolerances settle.
- [ ] Add mouse-wheel pixel-mode fixtures.
- [ ] Add line-mode and page-mode fixtures.
- [ ] Add smooth trackpad and momentum-burst fixtures.
- [ ] Prove identical normalized zoom intent across representative device units.
- [ ] Prove the world point beneath an off-center pointer remains stable through easing.
- [ ] Prove clamped zoom produces an explicit unchanged result.
- [ ] Run `npm run check`, `npm run build`, built-output smoke and Pages-origin fixtures.

## Required first vertical slice

```txt
line-mode wheel event over an off-center world point
  -> WheelZoomAdmissionCommand
  -> normalized pixel-equivalent delta
  -> accepted target zoom and world-anchor snapshot
  -> camera anchor solve during easing
  -> WheelZoomResult
  -> rendered matching camera frame
  -> FirstWheelZoomFrameAck
  -> ZoomAnchorConvergenceAck
```

## Keep separate

Fixed-step campaign simulation, selection, orders, pointer capture, motion preference, pause admission, route retirement, WebGL recovery and deployment remain separate authorities composed through route, camera and frame revisions.