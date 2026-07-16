# Render Audit — Pointer Anchor Visible Frame Gap

**Timestamp:** `2026-07-16T10-38-36-04-00`  
**Status:** `wheel-zoom-delta-anchor-convergence-authority-audited`

## Plan ledger

**Goal:** bind each accepted wheel-zoom revision to a rendered camera frame that preserves the intended world-space pointer anchor.

- [x] Trace browser pointer coordinates through CRT contain mapping.
- [x] Trace source coordinates through isometric screen-to-world projection.
- [x] Trace target zoom mutation and RAF easing.
- [x] Identify the missing frame-bound anchor acknowledgement.
- [ ] Add executable image/coordinate fixtures.

## Current frame path

```txt
WheelEvent(clientX, clientY)
  -> crt.screenToSource
  -> screenToWorld with current camera.zoom
  -> mutate camera.targetZoom
  -> screenToWorld again with unchanged camera.zoom
  -> zero x/z correction

next RAF frames
  -> ease camera.zoom toward targetZoom
  -> drawWorld with changed projection
  -> draw HUD and minimap
  -> upload source canvas
  -> CRT WebGL frame
```

## Visible mismatch

The code records an apparent pointer anchor but does not carry it into the frames where zoom actually changes. The first changed camera frame has no result proving:

```txt
accepted wheel revision == camera zoom revision
stored world anchor == world point under pointer
camera translation == anchor-preserving solve
Canvas2D frame == accepted camera snapshot
CRT frame == same source frame
```

## Required acknowledgements

```txt
FirstWheelZoomFrameAck {
  zoomRevision
  cameraRevision
  sourceFrameRevision
  crtFrameRevision
  pointerSourcePosition
  worldAnchor
  observedAnchorError
}

ZoomAnchorConvergenceAck {
  zoomRevision
  settledZoom
  targetZoom
  anchorError
  tolerance
  settledFrameRevision
}
```

## Fixture targets

- Zoom in at center, four corners and intermediate off-center positions.
- Zoom out at the same positions.
- Compare world coordinates before and after every changed frame.
- Exercise pixel, line and page wheel units.
- Exercise smooth trackpad bursts and momentum.
- Exercise min/max clamp no-op cases.
- Exercise camera-bound clamping where exact anchor preservation may be impossible and must be explicitly classified.
- Compare source, built artifact and deployed Pages behavior.

## Validation boundary

No frame capture, coordinate comparison, GPU readback, browser fixture or deployed-origin smoke was executed. No visible defect is claimed for every device; the gap is missing ownership and proof.