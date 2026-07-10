# PhantomCommand Render Audit: Pixel Campaign Render Readback

**Timestamp:** `2026-07-10T03-59-57-04-00`

## Current render surface

`PhantomCommand` renders the campaign route through a low-resolution source canvas and CRT display adapter.

```txt
campaign-scene.js
  -> scene canvas 640 x 360
  -> draw rings, lanes, pads, props, entities, projectiles, effects, sanctum, HUD, minimap
  -> crt.render(display canvas)
```

## Current render consumers

```txt
rings: generated from seven inline inner/outer rows
lanes: four inline angles
pads: generated from ring/lane rows
props: deterministic grave marker loop inside drawWorld
units: player/enemy rectangle sprites with four-frame procedural bob
build towers: diamond pad base plus tower body
projectiles: small colored squares
effects: ellipses with life/age fade
HUD: souls, sanctum, wave, message, tower buttons, controls
minimap: rings plus unit dots
CRT pass: createCrtRenderer output
```

## Missing readback

```txt
sourceCanvasSize
crtScaleMode
ringRowsConsumed
laneRowsConsumed
padRowsConsumed
unitRowsRendered
towerRowsRendered
projectileRowsRendered
effectRowsRendered
hudRowsRendered
minimapRowsRendered
cameraReadback
fixtureRenderSummary
```

## Why this blocks visual expansion

The current scene is already trying to be a pixel/isometric campaign view. Better art, animation, camera, or enemy sprites should come after render readback proves exactly which descriptors were consumed.

Without render rows, a future visual change cannot tell whether a bad frame came from source data, simulation state, camera transform, or draw consumption.

## Next render-safe proof

Add a render-readback helper that can be used by a DOM-free fixture and by additive `GameHost.getState().campaign.render` diagnostics.
