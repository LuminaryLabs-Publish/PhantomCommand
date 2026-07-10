# Architecture Audit — Campaign Source Ledger Readback DSK Map

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T06-59-18-04-00`

## Current architecture

`PhantomCommand` is a static Vite canvas campaign game.

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html
  -> src/campaign/campaign-scene.js
```

`game.html` is a thin shell. `campaign-scene.js` owns the current live route authority.

## DSK/domain breakdown

```txt
Route DSK
  domains: index route, menu route, campaign route, static build copy
  services: menu launch, continue launch, game route shell
  gap: route/source manifest is not fixture-readable

Render DSK
  domains: low-resolution source canvas, CRT display adapter, pixel draw loop, HUD, minimap
  services: draw rings, lanes, pads, props, units, towers, projectiles, effects, HUD, minimap, CRT pass
  gap: no render-consumption ledger rows

Campaign source DSK
  domains: ring map, lane angles, generated pads, unit archetypes, tower archetypes, wave scripts
  services: initialize campaign facts inline
  gap: descriptors are not source-owned outside campaign-scene.js

Interaction/action DSK
  domains: selection, build, right-click order, wave start, tower hotkeys, camera input
  services: mutate inline campaign state
  gap: no ActionIntent or ActionResult rows

Simulation DSK
  domains: spawn queue, enemy pathing, ally targeting, tower targeting, projectiles, damage, rewards, wave clear, win, loss
  services: tick campaign state inline
  gap: no deterministic simulation-frame summaries

GameHost DSK
  domains: state readback, camera, startWave, build, getState, setZoom
  services: aggregate counters and imperative controls
  gap: no source ledger, action journal, render readback, fixture status, selected-state, or wave-source diagnostics
```

## Target authority flow

```txt
CampaignSourceLedger
  -> DescriptorFingerprint
  -> RingLaneDescriptorRows
  -> BuildPadDescriptorRows
  -> Unit/Tower/Wave descriptor rows
  -> ActionIntent
  -> ActionResult
  -> SimulationFrameSummary
  -> RenderReadbackRows
  -> GameHost.campaign diagnostics
  -> DOM-free campaign fixture
  -> build gate
```

## Next-cut services

```txt
source ledger: route, scene module, source dimensions, ring/lane/pad/archetype/tower/wave counts
fingerprint service: stable hashes for descriptors and generated pad rows
action service: select/build/order/start-wave accepted/rejected rows
simulation service: spawn, unit, tower, projectile, damage, reward, clear, win/loss summaries
render service: source-consumption rows for rings, lanes, pads, units, towers, projectiles, HUD, minimap, CRT
GameHost service: additive JSON-safe campaign diagnostics without removing legacy fields
fixture service: DOM-free parity rows before campaign-scene consumes helpers
```

## Non-goals

```txt
renderer replacement
new enemy art
larger economy
more waves
camera rewrite
legacy construct-kit deletion
```
