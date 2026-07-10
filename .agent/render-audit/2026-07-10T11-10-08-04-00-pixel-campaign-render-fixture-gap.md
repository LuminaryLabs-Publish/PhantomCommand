# Render Audit — Pixel Campaign Render Fixture Gap

**Timestamp:** `2026-07-10T11-10-08-04-00`

## Current render surface

```txt
scene canvas: 640 x 360
public canvas: #game
adapter: createCrtRenderer(canvas, scene)
world renderer: drawWorld()
entity renderer: drawEntity()
UI renderer: drawUI()
minimap renderer: drawMinimap()
final pass: crt.render(...)
```

## Current render ownership

`src/campaign/campaign-scene.js` directly renders rings, lanes, build pads, graves, units, towers, projectiles, effects, sanctum, HUD, tower controls, minimap, drag rectangle, pause/win/loss modal, and CRT pass.

## Gap

There is no render-readback ledger proving which source descriptors were consumed. A screenshot or canvas draw is not enough for the next proof cut.

## Required render rows

```txt
sourceCanvasReadback
ringRenderRows
laneRenderRows
padRenderRows
gravePropRenderRows
unitRenderRows
towerRenderRows
projectileRenderRows
effectRenderRows
hudRenderRows
minimapRenderRows
modalRenderRows
crtPassReadback
renderFallbackRows
```

## Next safe render work

Add `src/campaign/render-readback.js` and expose additive JSON-safe render summaries through a campaign fixture and `GameHost.getState().campaign.render` before renderer replacement or visual polish.
