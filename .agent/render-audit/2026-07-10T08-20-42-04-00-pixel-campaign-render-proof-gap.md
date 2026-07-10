# PhantomCommand Render Audit — Pixel Campaign Proof Gap

**Timestamp:** `2026-07-10T08-20-42-04-00`

## Render surface

`PhantomCommand` has a visual/render surface.

```txt
src/campaign/campaign-scene.js
  -> creates 640 x 360 source canvas
  -> draws pixel campaign world into 2D canvas
  -> passes source canvas through createCrtRenderer(canvas, scene)
  -> CRT renderer uploads source canvas to WebGL texture
  -> fragment shader applies contain, curve, scanline, grille, flicker, grain, aberration, vignette, fade
```

## Current render loop

```txt
render()
  -> drawWorld()
  -> drawUI()
  -> crt.render(performance.now()/1000, { crt: true, grain: "low", fade: 0 })
```

`drawWorld()` renders rings, lanes, pads, props, towers, units, projectiles, effects, and sanctum.

`drawUI()` renders HUD, tower selector, help text, minimap, modal win/loss/pause copy, and drag rectangle.

## Render domains

```txt
low-resolution-source-canvas
crt-display-renderer
contain-and-letterbox-uv
curve-uv-crt-warp
scanline-and-grille-post
chromatic-aberration-post
pixel-quantization-post
vignette-post
ring-render-domain
lane-render-domain
pad-render-domain
grave-prop-render-domain
unit-render-domain
tower-render-domain
projectile-render-domain
effect-render-domain
sanctum-render-domain
hud-render-domain
minimap-render-domain
drag-selection-render-domain
modal-state-render-domain
```

## Render proof gap

There is no source-owned render ledger for:

```txt
which rings were expected
which lanes were expected
which pads were expected
which units/towers/projectiles were consumed
which HUD fields were projected
which minimap fields were projected
which CRT settings were applied
which source size and display size were used
which render fallback occurred, if any
```

## Next render services

```txt
phantom-command-render-expectation-kit
phantom-command-render-consumption-ledger-kit
phantom-command-render-snapshot-normalizer-kit
phantom-command-crt-pass-readback-kit
phantom-command-hud-readback-kit
phantom-command-minimap-readback-kit
phantom-command-gamehost-render-proof-kit
```

## Recommendation

Keep the current visual route intact. Add render readback rows around the existing draw pass before changing camera, pixel art, enemy animation, CRT settings, or renderer implementation.
