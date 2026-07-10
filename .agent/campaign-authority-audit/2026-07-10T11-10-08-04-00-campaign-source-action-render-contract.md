# Campaign Authority Audit — Source Action Render Contract

**Timestamp:** `2026-07-10T11-10-08-04-00`

## Current authority

`src/campaign/campaign-scene.js` is the live authority for the campaign route.

It owns:

```txt
source canvas dimensions
ring descriptors
lane angles
pad generation
unit archetypes
tower archetypes
wave scripts
campaign state
selection
build/order/start-wave actions
unit/tower/projectile simulation
HUD/minimap/rendering
save-on-win
GameHost aggregate state
```

## Authority risk

The route is compact and playable, but there is no separate source manifest or fixture-readback layer. This makes future content, economy, renderer, and RTS changes likely to drift from the actual live route.

## Required contract

```txt
campaignSourceManifest.route === game.html
campaignSourceManifest.sceneModule === src/campaign/campaign-scene.js
campaignSource.sourceWidth === 640
campaignSource.sourceHeight === 360
campaignSource.ringCount === 7
campaignSource.laneCount === 4
campaignSource.towerTypes includes spire, lantern, ward
campaignSource.unitArchetypes includes guard, archer, runner, shield, zealot, brute, wraith
campaignSource.waveCount === 6
campaignActionResults cover select, build, order, start-wave, damage, reward, win, loss
campaignRenderReadback covers rings, lanes, pads, units, towers, projectiles, HUD, minimap, CRT
GameHost keeps legacy fields and adds JSON-safe campaign proof rows
```

## Next safe ledge

```txt
PhantomCommand Campaign Fixture Readback Ledger Refresh + GameHost Gate
```
