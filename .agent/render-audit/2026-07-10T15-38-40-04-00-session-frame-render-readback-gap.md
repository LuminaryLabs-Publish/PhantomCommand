# Render audit: session-frame render readback gap

Timestamp: `2026-07-10T15-38-40-04-00`

## Current render surface

The live campaign renders into a `640 x 360` source canvas with image smoothing disabled, then sends that source through `createCrtRenderer` for display scaling, CRT, grain, and fade presentation.

The campaign draw stack currently includes:

```txt
ring annuli
four enemy lanes
58 generated build pads
procedural grave markers
sanctum
units
build towers
projectiles
effects
selection indicators
health bars
resource/wave HUD
tower picker
control help
minimap
pause/win/loss overlay
CRT display pass
```

## Current ownership problem

`render()` consumes live mutable campaign state directly after the fixed-step loop. There is no immutable render frame descriptor and no correlation row linking:

```txt
menu session intent
  -> hydrated or fresh campaign state
  -> accepted/rejected command
  -> fixed simulation frame
  -> world draw consumption
  -> HUD/minimap projection
  -> CRT submit
```

This means screenshots and aggregate `GameHost.getState()` values cannot prove whether a Continue session restored data, whether a rejected command left render state unchanged, or which simulation frame produced a displayed HUD/minimap result.

## Render services already present

- source-canvas scene composition
- isometric world-to-screen and screen-to-world conversion
- camera pan and zoom projection
- painter-ordered entity rendering
- effect and projectile rendering
- HUD and minimap projection
- modal state overlay
- display-canvas fit and source pointer mapping
- CRT/grain/fade post pass

## Required readback rows

```txt
RenderFrameRow
  frameId
  sessionId
  sessionMode
  simulationTick
  commandSequenceHighWater
  camera
  sourceWidth
  sourceHeight
  ringCount
  laneCount
  padCount
  allyCount
  enemyCount
  towerCount
  projectileCount
  effectCount
  selectedUnitIds
  selectedPadId
  souls
  core
  wave
  waveActive
  won
  lost

RenderConsumerRow
  frameId
  consumer: world | hud | minimap | overlay | crt
  consumedSourceRevision
  consumedStateFingerprint
  submitted
```

## Next render boundary

Keep all current drawing code and presentation unchanged. Add JSON-safe frame/readback construction before draw helpers consume state, expose only immutable snapshots to diagnostics, and prove correlation through a DOM-free fixture before renderer extraction or visual polish.
