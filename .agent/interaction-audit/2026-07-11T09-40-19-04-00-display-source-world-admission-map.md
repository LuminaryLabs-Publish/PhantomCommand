# Display/Source/World Admission Map

**Timestamp:** `2026-07-11T09-40-19-04-00`

## Summary

Pointer-derived actions need projection admission before phase or gameplay admission. A coordinate computed under stale dimensions, CRT settings or camera state must not reach selection, building, order or zoom mutation.

## Plan ledger

**Goal:** define typed admission from browser coordinates to campaign intent.

- [x] Identify menu and campaign pointer sources.
- [x] Identify display, source and world boundaries.
- [x] Define stable projection rejection reasons.
- [ ] Integrate projection results with campaign commands.

## Admission order

```txt
browser event
  -> active runtime/session check
  -> PresentationTransform lookup
  -> display containment admission
  -> CRT source projection
  -> source boundary admission
  -> transform revision admission
  -> optional camera revision admission
  -> source-to-world projection
  -> command construction
  -> campaign phase admission
  -> gameplay preflight
```

## Stable reasons

```txt
OUTSIDE_CANVAS
OUTSIDE_CONTAINED_FRAME
CURVED_OUTSIDE_SOURCE
STALE_TRANSFORM_REVISION
STALE_CAMERA_REVISION
NONFINITE_COORDINATE
UNSUPPORTED_POINTER_SOURCE
NO_WORLD_PROJECTION
```

## Source parity

Menu pointer move, menu pointer down, campaign pointer move, click, right-click, wheel and drag endpoints must consume the same `displayToSource()` service. `GameHost` commands that supply source/world coordinates must declare their coordinate space and revision rather than bypassing projection authority.

## Observation row

```txt
{
  requestId,
  eventType,
  transformRevision,
  cameraRevision,
  displayPoint,
  sourcePoint,
  worldPoint,
  accepted,
  reason
}
```

Observation must be detached, bounded and safe for diagnostics.