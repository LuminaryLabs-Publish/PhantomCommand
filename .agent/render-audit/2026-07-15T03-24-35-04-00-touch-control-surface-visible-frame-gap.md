# Touch Control Surface Visible-Frame Gap

**Timestamp:** `2026-07-15T03-24-35-04-00`

## Summary

The campaign route renders the entire game into a full-screen canvas and exposes no visible DOM control layer. Desktop instructions are present only in a one-pixel screen-reader section. Touch users receive no visible wave, order, tower, pan, zoom, pause, restart, exit or focus controls and no frame acknowledgement proves that a device-appropriate control profile is present.

## Plan ledger

**Goal:** make the accepted control profile a versioned presentation participant with visible-frame evidence.

- [x] Inspect `game.html` visual and semantic surfaces.
- [x] Inspect Canvas2D HUD control instructions.
- [x] Identify absent touch-control projections.
- [x] Define control-surface and action-effect frame acknowledgements.
- [ ] Implement responsive semantic controls.
- [ ] Execute viewport and device pixel probes.

## Current render path

```txt
game.html
  -> full-screen canvas
  -> touch-action:none
  -> no visible DOM controls
  -> sr-only desktop instructions

Canvas2D source frame
  -> HUD text lists WASD, wheel, drag, RMB and Space
  -> no touch affordances
  -> no device-profile revision

CRT frame
  -> uploads and presents the source canvas
  -> no accepted-control-profile fingerprint
  -> no FirstDeviceControlSurfaceFrameAck
```

## Visible-frame requirements

```txt
ControlSurfaceDescriptor
  controlGeneration
  deviceProfileRevision
  viewportRevision
  routeRevision
  campaignStateRevision
  visibleActions
  semanticActions
  safeAreaInsets
  gestureRegions

FirstDeviceControlSurfaceFrameAck
  controlGeneration
  sourceCanvasFrameId
  crtFrameId
  visibleControlIds
  actionCoverageFingerprint

FirstDeviceActionEffectFrameAck
  commandId
  actionResultRevision
  campaignOrCameraRevision
  sourceCanvasFrameId
  crtFrameId
```

## Required proof matrix

| Profile | Required visible proof |
|---|---|
| Keyboard and mouse | Existing HUD hints remain legible and commands reach matching frames. |
| Touch only | Wave, order, tower choice, pan, zoom, pause and terminal controls are visible and reachable. |
| Hybrid | Touch controls and mouse/keyboard adapters coexist without duplicate commands. |
| Narrow viewport | Controls respect safe areas and do not cover essential HUD or battlefield targets. |
| Orientation change | One control generation is retired and one replacement generation is acknowledged. |

## Validation boundary

No browser screenshot, touch emulation, pixel probe or deployed-origin fixture was run. This file records a source-backed projection gap, not a reproduced device screenshot.