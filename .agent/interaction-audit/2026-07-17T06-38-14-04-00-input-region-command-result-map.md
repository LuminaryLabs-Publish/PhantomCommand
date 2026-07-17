# Input Region Command / Result Map

**Timestamp:** `2026-07-17T06-38-14-04-00`

## Current path

```txt
pointer event
  -> setPointer()
  -> {x, y, inside}
  -> pointerdown / pointerup
  -> screenToWorld()
  -> selectAt() / marquee mutation / order()
```

## Missing decisions

```txt
source-inside admission
visible topmost region
modal suspension
minimap policy
HUD/control policy
gesture-region lease
stale frame rejection
typed command settlement
matching rendered-frame acknowledgement
```

## Required map

```txt
InputRegionManifestCommand
  -> SourceRegionManifestResult

PointerRegionAdmissionCommand
  -> InputRegionDecisionResult
     accepted | rejected
     region: world | hud | controls | minimap | modal | excluded

WorldCommandAdmissionCommand
  -> WorldCommandAdmissionResult
     selectedIds | orderedIds | target | rejectionReason

RenderRegionBoundCommandCommand
  -> FirstRegionBoundCommandFrameAck
```

## Rejection reasons

```txt
outside-source
occluded-by-hud
occluded-by-controls
occluded-by-minimap
modal-active
stale-route
stale-frame
stale-region-manifest
stale-gesture
unsupported-region-command
```

## Boundary

The map is proposed documentation. Existing pointer handlers and gameplay commands remain unchanged.