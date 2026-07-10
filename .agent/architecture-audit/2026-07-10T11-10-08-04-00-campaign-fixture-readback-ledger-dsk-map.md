# Architecture Audit — Campaign Fixture Readback Ledger DSK Map

**Timestamp:** `2026-07-10T11-10-08-04-00`

## Current DSK shape

```txt
Route shell
  index.html
  game.html

Menu kits
  graveyard-menu.js
  graveyard-art.js
  crt-renderer.js

Campaign runtime
  src/campaign/campaign-scene.js
    owns source canvas
    owns CRT adapter call
    owns rings, lanes, pads, archetypes, tower types, waves
    owns input, selection, build, order, start wave
    owns update, AI, projectiles, damage, rewards, win/loss
    owns draw, HUD, minimap, modal
    owns save-on-win
    owns window.GameHost

Legacy proof support
  construct-spiral-intro-kit
  construct smoke test
```

## Required DSK breakdown

```txt
campaign-source-ledger-kit
  route, module, source canvas dimensions, version rows

campaign-descriptor-kit
  rings, lanes, pads, unit archetypes, tower archetypes, waves

campaign-action-kit
  select, deselect, build, reject-build, order, target, start-wave

campaign-simulation-kit
  spawn, move, attack, projectile, damage, reward, clear, win, loss

campaign-render-readback-kit
  rings, lanes, pads, props, units, towers, projectiles, HUD, minimap, CRT pass

campaign-gamehost-diagnostics-kit
  JSON-safe source, action, simulation, render, fixture, and legacy fields

campaign-fixture-kit
  DOM-free rows proving source/action/render/GameHost parity
```

## Boundary finding

`campaign-scene.js` is useful as the live reference, but it is not yet a source of auditable rows. The next implementation should keep behavior unchanged while extracting proof-producing helpers.

## Do not start next

```txt
renderer replacement
camera rewrite
extra campaign content
new enemy art
larger economy
RTS expansion
legacy construct deletion
```
