# Interaction Audit — Wheel Zoom Command and Result Map

**Timestamp:** `2026-07-16T10-38-36-04-00`  
**Status:** `wheel-zoom-delta-anchor-convergence-authority-audited`

## Plan ledger

**Goal:** replace direct camera mutation with one typed wheel command/result path that can reject stale evidence and prove visible convergence.

- [x] Map current wheel listener and camera mutations.
- [x] Define admission, result and acknowledgement surfaces.
- [x] Define no-op, invalid, stale and constrained outcomes.
- [ ] Implement and test the command path.

## Current direct path

```txt
wheel event
  -> preventDefault
  -> setPointer
  -> read raw deltaY
  -> mutate targetZoom
  -> attempt direct camera x/z correction
  -> no result
  -> RAF changes projection
```

## Proposed command path

```txt
WheelEvidence
  -> WheelZoomAdmissionCommand
  -> WheelZoomResult
  -> ZoomAnchorConvergenceCommand
  -> accepted camera snapshot
  -> rendered frame
  -> FirstWheelZoomFrameAck
  -> ZoomAnchorConvergenceAck
```

## Result classifications

| Status | Meaning |
|---|---|
| `accepted` | Normalized evidence produced a new target and anchor-bound zoom revision. |
| `unchanged` | The normalized command settled at the current clamped target. |
| `constrained` | Camera/world bounds prevent exact anchor preservation; bounded error is reported. |
| `superseded` | A newer coalesced trackpad/wheel revision replaced this work. |
| `invalid` | Units, coordinates or numeric evidence are invalid. |
| `retired` | Route, canvas or camera generation no longer owns the evidence. |
| `unsupported` | The environment cannot supply the required wheel/camera capability. |

## Command fields

```txt
commandId
routeGeneration
canvasRevision
cameraRevision
pointerSourceX
pointerSourceY
rawDeltaX
rawDeltaY
deltaMode
timestamp
policyVersion
```

## Settlement fields

```txt
normalizedDeltaPixels
previousZoom
targetZoom
worldAnchorX
worldAnchorZ
zoomRevision
cameraRevision
anchorPolicy
status
reason
```

## Interaction consistency

Primary selection, drag selection and secondary orders must either consume the latest accepted camera snapshot or carry the camera revision used when their source coordinates were captured. This prevents a wheel transition and a click/order transition from silently interpreting the same pointer coordinate against different projections.

## Validation boundary

No commands, typed results, revision guards or interaction fixtures were implemented.