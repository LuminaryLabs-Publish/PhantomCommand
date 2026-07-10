# Render Audit: Pixel Campaign Render Readback Ledger Gap

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T09-52-02-04-00`

## Render surface

`PhantomCommand` has a visual/render surface:

```txt
source canvas 640 x 360
  -> CRT display renderer
  -> rings and lanes
  -> generated build pads
  -> grave props
  -> units and towers
  -> projectiles and effects
  -> HUD
  -> minimap
  -> paused/win/loss modal
```

## Current render loop

```txt
frame(now)
  -> update fixed 1/60 simulation steps
  -> render()
  -> drawWorld()
  -> drawUI()
  -> crt.render(performance.now()/1000, { crt: true, grain: "low", fade: 0 })
```

## Render proof gap

The live renderer draws useful campaign state, but it does not emit rows describing what was consumed, skipped, fallback-rendered, or projected.

```txt
- no ring render consumption rows.
- no lane render consumption rows.
- no build pad render consumption rows.
- no grave prop render source rows.
- no unit/tower/projectile/effect render readback rows.
- no HUD source row for souls/core/wave/message.
- no minimap source row for rings/player/enemies/allies.
- no CRT pass readback row.
- no camera frame row connecting zoom/pan to render output.
- no GameHost render diagnostics.
```

## Required render readback ledger

```txt
renderReadback = {
  frameId,
  sourceWidth,
  sourceHeight,
  camera: { x, z, zoom },
  ringsDrawn,
  lanesDrawn,
  padsDrawn,
  gravePropsDrawn,
  unitsDrawn,
  towersDrawn,
  projectilesDrawn,
  effectsDrawn,
  hudRows,
  minimapRows,
  crtPass,
  fallbackRows,
  unsupportedRows
}
```

## Recommendation

Do not replace the pixel renderer or CRT pass next. Add source-owned descriptors and render-readback rows first, then prove them through a DOM-free campaign fixture before visual polish or new campaign content.
