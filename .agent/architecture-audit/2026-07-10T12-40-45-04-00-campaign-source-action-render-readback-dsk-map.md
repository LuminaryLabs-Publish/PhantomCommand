# PhantomCommand Architecture Audit: Campaign Source Action Render Readback DSK Map

**Timestamp:** `2026-07-10T12-40-45-04-00`

## Architecture read

`PhantomCommand` has a clean route distinction between menu and campaign, but the active campaign route still concentrates source, mutation, simulation, render, and diagnostics in `src/campaign/campaign-scene.js`.

## DSK/domain map

```txt
menu-route-kit
  -> graveyard menu, start route, continue route, settings, local save detection

crt-renderer-kit
  -> source canvas mapping, CRT display pass, pointer source mapping

campaign-route-shell-kit
  -> game.html canvas route and control copy

pixel-campaign-runtime-kit
  -> rings, lanes, pads, units, towers, waves, input, simulation, draw, HUD, minimap, save, GameHost

legacy-gamehost-diagnostics-kit
  -> aggregate wave, souls, core, unit/tower counts, win/loss, zoom

construct-spiral-intro-kit
  -> legacy construct/profile smoke target, not live campaign authority

phantom-command-campaign-source-ledger-kit next
  -> route, scene module, source canvas, ring, lane, pad, archetype, tower, wave rows

phantom-command-source-fingerprint-kit next
  -> stable fingerprints for campaign source descriptors

phantom-command-action-intent-kit next
  -> select, build, order, start-wave, damage, reward, win, loss intents

phantom-command-action-result-kit next
  -> accepted/rejected/no-op action results and reasons

phantom-command-simulation-frame-kit next
  -> spawn, unit, tower, projectile, damage, wave clear, win/loss frame summaries

phantom-command-render-readback-kit next
  -> rings, lanes, pads, props, units, towers, projectiles, HUD, minimap, CRT pass consumption rows

phantom-command-gamehost-diagnostics-kit next
  -> additive JSON-safe GameHost campaign block

phantom-command-campaign-fixture-kit next
  -> DOM-free source/action/render/GameHost parity proof
```

## Critical seam

```txt
src/campaign/campaign-scene.js
  -> inline descriptors
  -> state mutation
  -> update/draw loops
  -> aggregate GameHost
  -> no source/action/render proof rows yet
```

## Recommendation

Add source-owned descriptor rows and fixture-readable action/render summaries before importing those helpers into `campaign-scene.js`.

Keep all current route, controls, visuals, and GameHost legacy fields unchanged until fixture proof exists.
