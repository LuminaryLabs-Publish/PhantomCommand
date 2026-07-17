# Source Region Occlusion Contract

**Timestamp:** `2026-07-17T06-38-14-04-00`

## Authority

`phantom-command-campaign-input-region-arbitration-authority-domain`

## Region model

```txt
excluded
  browser point is outside the contained 640x360 source surface

world
  source point is not covered by a higher-priority visible region

hud
  status, message and resource panel

controls
  bottom tower-selection strip

minimap
  top-right map surface

modal
  full-screen pause, victory or loss overlay
```

## Priority

```txt
modal > controls > hud > minimap > world > excluded
```

The manifest must be generated from the same layout constants and state used by the renderer. Hard-coded duplicate rectangles in the input path are not sufficient authority.

## Gesture rules

- A gesture is admitted against one manifest revision.
- A world gesture remains world-owned only while its route, viewport and manifest revisions remain valid.
- Modal activation retires active world gestures.
- HUD, controls and passive minimap evidence must not fall through to world commands.
- `inside:false` evidence is rejected before `screenToWorld()`.
- Every rejection is typed and observable.

## Result contract

```txt
InputRegionDecisionResult {
  gestureId,
  sourcePoint,
  sourceInside,
  regionId,
  regionKind,
  manifestRevision,
  frameRevision,
  accepted,
  rejectionReason
}
```

## Frame proof

`FirstRegionBoundCommandFrameAck` must identify the accepted command result, gameplay revision, camera revision, region manifest revision and rendered frame.

## Boundary

No region manifest or runtime arbitration was implemented by this documentation pass.