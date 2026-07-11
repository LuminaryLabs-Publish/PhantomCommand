# Committed Frame Render Consumption Gap

**Timestamp:** `2026-07-10T20-19-35-04-00`

## Current render path

```txt
requestAnimationFrame
  -> update camera from held keys
  -> add browser dt to accumulator
  -> execute zero or more fixed 1/60 simulation updates
  -> drawWorld() from live state and camera
  -> drawUI() from live state and input drag
  -> CRT renderer uploads the source canvas with texSubImage2D
  -> fullscreen WebGL pass applies nearest sampling, curvature, scanlines, grain, aberration, vignette, and fade
  -> schedule next requestAnimationFrame
```

## Source-backed render services

### `pixel-campaign-render-kit`

```txt
ring and lane projection
build-pad rendering
unit and tower ordering
projectile and effect rendering
sanctum rendering
selection indicators
health bars
HUD projection
build-card projection
minimap projection
pause/win/loss modal projection
selection rectangle projection
```

### `crt-renderer-kit`

```txt
source-to-display contain mapping
nearest-neighbor source texture
source-coordinate pointer mapping
CRT curvature
scanlines and grille
flicker and grain
chromatic aberration
vignette and fade
DPR-limited resize
```

## Gap

`render()` reads `state`, `camera`, and `input.drag` directly after the accumulator loop. No immutable presentation snapshot is committed. There is no `frameId`, `tickId`, command-sequence range, state fingerprint, action-result list, or source-state revision attached to the rendered frame.

This creates several proof failures:

```txt
- a build can appear without a retained accepted result
- an invalid build can silently fail without a retained rejection
- a wave can start without identifying the command or tick that admitted it
- several simulation ticks can execute before one render with no correlation row
- a render can occur with zero simulation ticks and no explicit reuse marker
- HUD, minimap, modal, and world output cannot prove they consumed the same committed state
- CRT submission cannot identify the source frame uploaded
- GameHost readback cannot be matched to the visible frame
```

## Required committed presentation snapshot

```txt
frameId
tickId
simulationTime
stateFingerprint
commandSequenceStart
commandSequenceEnd
actionResultIds
camera
selection
worldCounts
hud
minimap
modal
sourceCanvasSize
```

## Required render-consumption row

```txt
frameId
stateFingerprint
worldConsumed
hudConsumed
minimapConsumed
modalConsumed
crtSourceUploaded
sourceCanvasWidth
sourceCanvasHeight
outputWidth
outputHeight
renderedAt
```

## Renderer ownership rule

The renderer may keep high-performance local caches and raw graphics resources, but its public proof surface should be immutable and JSON-safe. It must not expose the WebGL context, mutable state, or mutable camera as evidence.

## Compatibility constraints

```txt
- preserve the 640 x 360 campaign source canvas
- preserve nearest-neighbor source sampling
- preserve ring, lane, entity, HUD, minimap, modal, and CRT output
- preserve current camera behavior and zoom limits
- preserve current draw order
- preserve existing window.GameHost fields while adding bounded observations
```

## Validation fixture target

A DOM-free fixture should submit a known command sequence, advance exact fixed ticks, create one committed frame, and assert that world, HUD, minimap, modal, CRT, and GameHost observations all report the same `frameId` and `stateFingerprint`.