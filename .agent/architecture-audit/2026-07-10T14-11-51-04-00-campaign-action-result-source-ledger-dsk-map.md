# Architecture audit: campaign action result source ledger DSK map

Timestamp: 2026-07-10T14-11-51-04-00

## Current route

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html
  -> src/campaign/campaign-scene.js
  -> createCrtRenderer(canvas, scene)
  -> inline campaign source, update, draw, input, save, and GameHost
```

## DSK/domain map

| Domain | Current owner | Service | Missing proof |
| --- | --- | --- | --- |
| Route/menu | `index.html`, `graveyard-menu.js` | menu, continue, route to campaign | route/source fingerprint row |
| Campaign shell | `game.html` | accessible canvas shell | scene module contract row |
| Display | `crt-renderer.js` | source-to-display mapping and CRT pass | source frame readback row |
| Campaign source | `campaign-scene.js` | rings, lanes, pads, archetypes, towers, waves | source-owned descriptors and manifest |
| Interaction | `selectAt`, `order`, `build`, `startWave` | select/build/order/wave commands | accepted/rejected ActionResult rows |
| Simulation | `update`, `updateUnit`, `updateTowers`, `updateProjectiles` | spawn, AI, damage, reward, win/loss | deterministic frame summaries |
| Render | `drawWorld`, `drawUI`, `drawMinimap` | rings, lanes, pads, units, towers, HUD, minimap | render consumption/readback rows |
| Diagnostics | `window.GameHost` | aggregate state and control hooks | additive campaign proof surface |
| Legacy construct | `construct-spiral-intro-kit` | separate proof kit | demoted from live-route authority |

## Architecture blocker

`src/campaign/campaign-scene.js` is the route composer and the authority for source descriptors, mutations, render projection, and diagnostics. That makes the current campaign hard to fixture without browser/canvas timing.

## Next architecture ledge

Extract source rows and pure proof helpers first. The live scene should consume them additively only after a DOM-free campaign fixture proves source shape, action results, simulation frames, render readback, and `GameHost` legacy compatibility.
