# Letterbox Pointer and Visible Target Gap

**Timestamp:** `2026-07-12T09-28-05-04-00`

## Summary

The CRT renderer uses contain scaling and correctly classifies letterbox coordinates as outside the source frame. The input path still activates the highlighted menu command after an outside-surface result, so the visible render surface and actionable pointer surface do not agree.

## Plan ledger

**Goal:** require the actionable pointer surface to match the rendered source frame and its current targets.

- [x] Inspect contain projection in GLSL and `screenToSource()`.
- [x] Confirm source frame dimensions and full-viewport canvas behavior.
- [x] Confirm outside-source coordinates return `inside=false`.
- [x] Trace the outside result into pointer activation.
- [x] Define first-class render/input surface provenance.
- [ ] Add executable visual/input alignment fixtures after implementation.

## Render path

```txt
480x270 source canvas
  -> WebGL texture
  -> containUv() letterboxes to viewport
  -> CRT curve, grain, vignette and fade
  -> full-viewport display canvas
```

## Input path

```txt
viewport pointer
  -> screenToSource()
  -> source x/y plus inside flag
  -> menuHitIndex() returns -1 when outside
  -> pointerdown still activates current selection
```

## Gap

```txt
visible target: no menu row under pointer
projection result: OutsideSurface
actual action: current selected command executes
```

## Required frame/input receipt

```txt
MenuSurfaceReceipt
  surfaceGeneration
  sourceWidth
  sourceHeight
  viewportBounds
  fitMode
  visibleSourceBounds
  crtEnabled
  presentedFrameId
```

Every pointer hit result must cite the same `surfaceGeneration` and visible-source bounds used by the presented frame.

## Required proof

```txt
letterbox margins are inert
curved CRT pixels outside source targets remain inert
resize creates a new surface generation
stale pre-resize hit results are rejected
pointer target receipt matches the presented menu frame
```