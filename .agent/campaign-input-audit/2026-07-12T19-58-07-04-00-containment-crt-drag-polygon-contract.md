# Campaign Input Containment, CRT and Drag Polygon Contract

**Timestamp:** `2026-07-12T19-58-07-04-00`

## Summary

Campaign spatial input requires one contract spanning surface containment, visible CRT geometry, pointer ownership and selection polygon membership. The present implementation has none of these as revisioned, typed results.

## Plan ledger

**Goal:** define the exact acceptance contract for click, drag, order, pan and zoom gestures.

- [x] Record current containment behavior.
- [x] Record current CRT inverse gap.
- [x] Record current pointer-lifecycle gap.
- [x] Record current rectangle-to-world defect.
- [x] Define acceptance and cancellation invariants.
- [ ] Implement and fixture the contract.

## Surface contract

```txt
InputSurface {
  surfaceId
  surfaceGeneration
  canvasBounds
  sourceWidth
  sourceHeight
  viewportTransformRevision
  crtTransformRevision
  focusGeneration
}
```

A pointer sample is admissible only when it cites the current surface and focus generations.

## Containment contract

```txt
SourceContainmentResult {
  sampleId
  status: Inside | Outside | Stale | Failed
  normalizedOutputPoint
  containedSourcePoint?
  viewportTransformRevision
}
```

`Outside` is terminal and must cause zero gameplay or camera mutation.

## CRT inverse contract

The visible shader applies radial scale:

```txt
centered = uv * 2 - 1
centered *= 1 + dot(centered, centered) * curve
```

Input must either:

```txt
A. numerically invert the same transform within a declared tolerance, or
B. render without curvature for interactive geometry.
```

The chosen policy and transform revision must be explicit.

## Gesture contract

```txt
SelectionGesture {
  gestureId
  pointerId
  pointerType
  startSampleId
  currentSampleId
  captureState
  sourceStart
  sourceCurrent
  surfaceGeneration
  transformRevision
}
```

Only the owning pointer may update or terminate the gesture. `pointercancel`, `lostpointercapture`, blur and surface retirement must produce one terminal cancelled result.

## Rectangle membership contract

Preferred implementation:

```txt
project each candidate entity world position into current source space
select when projected point lies inside the visible source rectangle
```

Alternative implementation:

```txt
inverse-project all four source rectangle corners
construct the complete convex world polygon
perform point-in-polygon membership
```

Using only two inverse-projected corners is prohibited.

## Exact regression row

```txt
camera: x=0, z=0
zoom: 1
source rectangle: (300,160) to (340,180)
expected world polygon corners:
  (-83.33,-55.56)
  (-55.56,-83.33)
  (-27.78,-55.56)
  (-55.56,-27.78)
expected: entities projecting inside the source rectangle are selected
current result: world-z interval collapses to approximately zero
```

## Completion proof

```txt
containment fixtures pass
CRT visible/source probes pass
pointer identity and cancellation fixtures pass
four-direction rectangle membership passes
camera and zoom revision rejection passes
first visible selection/order/camera frame cites the terminal results
source, dist and Pages results agree
```
