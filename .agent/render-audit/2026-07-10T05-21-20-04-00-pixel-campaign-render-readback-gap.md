# Render Audit: Pixel Campaign Render Readback Gap

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T05-21-20-04-00`

## Visual/render surface

The live campaign route renders a 640 x 360 source canvas through `crt-renderer` into the display canvas.

## Current render chain

```txt
campaign-scene.js
  -> drawWorld()
  -> drawUI()
  -> drawMinimap()
  -> crt.render(...)
```

## Current rendered domains

```txt
grave rings
lane paths
build pads
grave props
sanctum core
units
towers
projectiles
effects
HUD
minimap
pause/win/loss modal
CRT pass
```

## Current readback gap

`GameHost.getState()` exposes aggregate campaign state but not render consumption rows.

Missing rows:

```txt
ring render count
lane render count
pad render count
occupied pad count
unit render count by team/type
tower render count by type
projectile render count
effect render count
HUD field values
minimap source counts
CRT pass options
camera bounds and zoom clamp
selected unit/pad projection
```

## Render finding

Do not replace the renderer first. Add a render-readback helper and fixture rows that prove what the current renderer consumes before visual expansion or CRT replacement.
