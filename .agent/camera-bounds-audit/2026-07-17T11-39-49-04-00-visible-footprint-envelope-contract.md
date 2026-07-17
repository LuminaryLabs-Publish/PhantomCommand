# Camera Bounds Audit — Visible Footprint Envelope Contract

**Timestamp:** `2026-07-17T11-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Contract goal

Define one deterministic camera envelope for the circular grave-ring arena that accounts for the accepted source viewport, isometric projection, vertical framing offset, zoom and overscan policy.

## Inputs

```txt
ArenaRevision
  center
  outerRadius
  optional authored overscan

SourceViewportRevision
  width
  height
  DPR-independent source coordinates
  camera projection origin

ProjectionRevision
  iso coefficients
  vertical source offset

ZoomRevision
  current zoom
  requested target zoom
  minimum and maximum zoom

CameraIntentRevision
  requested center
  optional source/world anchor
  producer type
  route/input generation
```

## Policy choices

The runtime must choose and name one or more invariants:

```txt
center policy
  keep camera center within a circular radius plus authored overscan

sanctum policy
  keep the sanctum inside a protected source region

selection policy
  keep a focused selected-unit centroid inside a protected source region

coverage policy
  retain a minimum projected area or ring landmark set in view

free-look policy
  allow bounded overscan while exposing a return-to-arena affordance
```

A strict whole-viewport-inside-arena rule is not viable with the current zoom range because even the maximum-zoom source footprint extends beyond the arena radius. The policy must therefore be explicit and achievable.

## Solver contract

```txt
compile source-corner world footprint at requested zoom
  -> evaluate requested camera center against policy
  -> preserve anchor when compatible
  -> compute minimal deterministic correction
  -> clamp or reject requested zoom only when policy requires
  -> publish CameraCoverageResult
```

## CameraCoverageResult

```txt
resultId
routeGeneration
arenaRevision
viewportRevision
projectionRevision
cameraGeneration
producer
requestedCenter
acceptedCenter
requestedZoom
acceptedZoom
correction
anchorStatus
coveragePolicy
coverageMetrics
settlementReason
```

## Required invariants

- The result is deterministic for the same revisions and intent.
- Every camera producer uses the same final solver.
- Stale results cannot overwrite a newer camera generation.
- The accepted camera state is committed before source rendering.
- The matching rendered frame publishes `FirstCameraBoundsFrameAck` once.
- Diagnostics expose requested and accepted values without mutable state references.

## Fixture matrix

| Scenario | Required proof |
|---|---|
| Cardinal keyboard pan | Same envelope on all four edges. |
| Diagonal keyboard pan | No square-corner policy leak. |
| Middle drag | Grabbed anchor preserved until explicit boundary correction. |
| Wheel at source edge | Anchor and boundary precedence are deterministic. |
| Minimum zoom | Policy remains achievable and reported. |
| Maximum zoom | Policy remains achievable and reported. |
| Focus selected unit | Selection policy and frame acknowledgement converge. |
| Focus sanctum | Sanctum returns to protected region. |
| Public host mutation | Direct out-of-envelope state cannot bypass settlement. |
| Resize/DPR change | New viewport revision invalidates stale envelopes. |

## Boundary

Proposed contract only. No runtime solver or fixture exists yet.