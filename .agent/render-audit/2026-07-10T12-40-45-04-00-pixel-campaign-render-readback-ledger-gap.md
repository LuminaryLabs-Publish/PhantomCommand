# PhantomCommand Render Audit: Pixel Campaign Render Readback Ledger Gap

**Timestamp:** `2026-07-10T12-40-45-04-00`

## Render surface

The live campaign renders through a 640 x 360 source canvas and CRT display adapter.

Current render consumers include:

```txt
rings
lanes
build pads
grave props
units
towers
projectiles
effects
HUD
minimap
modal pause/win/loss state
CRT pass
```

## Gap

The draw loop consumes live state directly, but there is no render readback ledger proving what source rows were rendered or skipped.

```txt
ring rendering has no source row id
lane rendering has no source row id
pad rendering has no pad descriptor parity
unit/tower/projectile draws have no source/action frame ids
HUD reads aggregate state directly
minimap reads aggregate state directly
CRT pass has no source consumption row
GameHost cannot report render-readback status
```

## Required render proof rows

```txt
renderReadback.sourceWidth === 640
renderReadback.sourceHeight === 360
renderReadback.ringRows.length === 7
renderReadback.laneRows.length === 4
renderReadback.padRows match generated pad descriptors
renderReadback.unitRows include starter allies and spawned enemies
renderReadback.towerRows include built spire/lantern/ward rows
renderReadback.projectileRows include projectile source/result ids
renderReadback.hudRows include souls/core/wave/message state
renderReadback.minimapRows include unit and sanctum marker counts
renderReadback.crtPassRows include source canvas and display adapter metadata
```

## Render non-goal

Do not replace the renderer, change the CRT effect, redraw enemy art, or expand pixel animation before the render readback ledger exists.
