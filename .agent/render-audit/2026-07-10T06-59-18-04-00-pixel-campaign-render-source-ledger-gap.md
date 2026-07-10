# Render Audit — Pixel Campaign Source Ledger Gap

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T06-59-18-04-00`

## Visual surface

The repo has a visual/render surface. The live campaign route creates a 640 x 360 source canvas and passes it through `crt-renderer` into the visible game canvas.

## Current render loop

```txt
campaign state
  -> drawWorld()
  -> rings and lane lines
  -> generated build pads
  -> grave props
  -> sorted units and towers
  -> projectiles and effects
  -> sanctum core
  -> drawUI()
  -> HUD, tower cards, controls, minimap, modal state
  -> crt.render()
```

## Render authority gap

Render currently proves that the browser can draw the scene, but it does not prove that the source descriptors were consumed correctly.

Missing rows:

```txt
source canvas size row
ring render count row
lane render count row
pad render count and selected-pad row
unit render count by archetype/team row
tower render count by type row
projectile/effect render count row
HUD source values row
minimap source values row
CRT pass row
GameHost render readback row
```

## Next render proof contract

```txt
RenderReadbackRow
  id
  sourceId
  descriptorFingerprint
  expectedCount
  consumedCount
  selectedIds
  visibleState
  diagnostics
```

## Non-goal

Do not replace the CRT renderer, pixel art style, source canvas, minimap, or HUD before source/readback fixture rows exist.
