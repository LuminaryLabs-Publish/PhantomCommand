# PhantomCommand Render Audit: GameHost SourceProfile Consumer Readback

**Timestamp:** `2026-07-09T04-38-39-04-00`

## Render surface

`PhantomCommand` has a browser visual/render surface in `game.html`. It imports Three.js from CDN and creates the renderer, scene, camera, materials, wedge geometry, construct pieces, HUD, and `GameHost` surface inline.

## Current render loop

```txt
game.html
  -> canvas#game
  -> THREE.WebGLRenderer
  -> scene background and fog
  -> perspective camera
  -> ambient, sun, and fill lights
  -> stone materials
  -> wedge and seam geometry
  -> center disc, Grim Reaper Totem proxy, Phantom Commander proxy
  -> construct(seq) mutates piece transforms and HUD
  -> frame(ms) updates construct, proxies, zoom, orbit, pan, camera, and renderer
  -> renderer.render(scene, camera)
  -> window.GameHost.getState() exposes legacy diagnostics
```

## Render-readback gap

```txt
- Render descriptors are not sourced from sourceProfile modules.
- Ring and piece descriptors are computed directly in game.html.
- Wedge geometry creation is coupled to browser/Three runtime.
- Construct animation consumes inline timing values.
- HUD mutation consumes inline progress/phase state.
- GameHost has no additive sourceProfile proof object yet.
```

## Required additive readback

```txt
window.GameHost.getState()
  -> existing legacy fields unchanged
  -> sourceProfile
     -> buildId
     -> profileFingerprint
     -> sourceSnapshot
     -> ringDescriptorSummary
     -> pieceDescriptorSummary
     -> timelineSummary
     -> parity
     -> fixture
     -> centralLedger
```

## Render verdict

Do not extract the renderer or change visuals next. Add readback proof so the browser route reports the same source-owned profile that the DOM-free fixture validates.
