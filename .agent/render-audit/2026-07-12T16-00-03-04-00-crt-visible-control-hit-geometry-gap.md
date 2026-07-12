# PhantomCommand CRT Visible-Control Hit Geometry Gap

**Timestamp:** `2026-07-12T16-00-03-04-00`

## Summary

The menu draws controls into a 480 × 270 source canvas, then the CRT shader applies aspect containment and optional radial curvature before presentation. Pointer input reverses only containment. It does not invert the active CRT curve, and a failed containment/hit result does not stop action dispatch.

## Plan ledger

**Goal:** make the visible control geometry and the pointer-admission geometry one revisioned transform, then prove the accepted action in the first rendered menu frame.

- [x] Trace source-canvas geometry.
- [x] Trace display containment and CRT curvature.
- [x] Trace viewport-to-source pointer projection.
- [x] Compare visible and logical coordinate spaces.
- [x] Record missing transform identity and frame acknowledgement.
- [ ] Implement shared or invertible geometry.

## Render path

```txt
480 × 270 source canvas
  -> graveyard/menu/panel drawing
  -> WebGL source texture upload
  -> containUv based on output/source aspect
  -> optional curveUv with uCurve=0.035
  -> aberration, grain, vignette and fade
  -> display framebuffer
```

## Input path

```txt
clientX/clientY
  -> canvas bounding rectangle normalization
  -> reverse aspect containment
  -> source x/y and inside boolean
  -> uncurved menu/panel rectangle hit test
```

## Geometry mismatch

The visible shader performs:

```txt
centered = uv * 2 - 1
r2 = dot(centered, centered)
centered *= 1 + r2 * uCurve
```

The input path has no inverse of that operation. With CRT enabled, the control row visible at one display location is tested against a different uncurved source location. The current menu layout is left-weighted, where radial displacement is non-zero.

## Containment failure is not terminal

`screenToSource()` returns `inside=false` for letterbox pixels. `menuHitIndex()` and `panelHitIndex()` then return `-1`, but pointer-down still dispatches the current selected action or row.

```txt
outside visible source
  -> containment=false
  -> hit=-1
  -> previous selection retained
  -> previous selection executed
```

## Missing render/input provenance

```txt
surface generation
source-canvas revision
viewport rectangle revision
DPR revision
containment transform revision
CRT enabled/disabled revision
curve coefficient revision
visible control layout revision
hit-test geometry revision
accepted action result id
first visible menu frame receipt
```

## Required render contract

```txt
MenuRenderGeometry {
  surfaceGeneration
  sourceSize
  displayRect
  devicePixelRatio
  containmentTransform
  crtEnabled
  curveCoefficient
  layoutRevision
  controlShapes[]
}

PointerProjectionResult {
  surfaceGeneration
  transformRevision
  viewportPoint
  visibleUv
  sourcePoint
  containmentStatus
  inverseCurveStatus
}
```

Rendering and hit testing must cite the same immutable geometry descriptor. An unsupported inverse transform must reject pointer activation rather than approximating against stale or different geometry.

## Required proof

```txt
CRT off: visible center and logical center match for every control
CRT on: visible center and logical hit match for every control
letterbox: all pointer actions rejected
row gaps: all pointer actions rejected
resize/DPR change: stale transform results rejected
accepted action: first displayed highlight/panel/fade cites result id
```

## Validation boundary

Runtime rendering was not changed and no pixel or pointer fixture was run. This audit does not claim the visible and logical geometries are currently aligned.