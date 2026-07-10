# PhantomCommand Current Audit

**Timestamp:** `2026-07-10T11-10-08-04-00`

## Summary

`PhantomCommand` is a static Vite canvas game with a graveyard menu route and a live 2D campaign route.

The active route remains `game.html -> src/campaign/campaign-scene.js`. The campaign scene is source-rich but proof-poor: it owns descriptors, mutation, input, simulation, rendering, HUD, minimap, save-on-win, and `GameHost` inline.

This pass updates repo-local docs and central tracking around the next proof cut: campaign fixture readback ledger, action/result rows, render consumption rows, additive GameHost diagnostics, and build fixture gate.

Runtime source was not changed.

## Selection audit

```txt
No checked public non-Cavalry repo was new, central-ledger absent, missing root .agent, recently added, or otherwise undocumented.
LuminaryLabs-Publish/TheCavalryOfRome remained excluded by rule.
PhantomCommand was selected as the oldest eligible documented fallback after HorrorCorridor advanced to 2026-07-10T10-58-54-04-00.
```

## Current interaction loop

```txt
open index.html
  -> graveyard menu uses crt-renderer and graveyard-art
  -> Begin Campaign routes to game.html?campaign=new
  -> Continue routes to game.html?campaign=continue when save exists
  -> game.html imports src/campaign/campaign-scene.js
  -> campaign-scene creates a 640 x 360 source canvas and CRT display renderer
  -> inline rings, lane angles, pads, archetypes, tower types, waves, camera, input, and campaign state initialize
  -> starter guards and archers spawn around the sanctum
  -> pointer click selects units or build pads
  -> repeat click on selected empty pad builds selected tower if souls cover cost
  -> right-click orders selected units or targets nearest enemy
  -> Space starts the next wave queue
  -> update loop advances spawns, units, towers, projectiles, effects, wave clear, win, and loss
  -> draw loop renders rings, lanes, pads, grave props, units, towers, projectiles, effects, HUD, minimap, modal state, and CRT pass
  -> window.GameHost exposes state, camera, startWave, build, getState, and setZoom
```

## Domains in use

```txt
static-route-shell
menu-route
campaign-route
vite-static-build
static-artifact-copy
low-resolution-source-canvas
crt-display-renderer
pixel-campaign-render-loop
ring-map-domain
lane-domain
build-pad-domain
unit-archetype-domain
tower-archetype-domain
wave-script-domain
souls-economy-domain
sanctum-core-health-domain
selection-domain
build-action-domain
order-action-domain
wave-start-action-domain
unit-ai-domain
enemy-pathing-domain
ally-targeting-domain
tower-targeting-domain
projectile-domain
damage-reward-domain
effect-domain
camera-pan-zoom-domain
keyboard-input-domain
pointer-input-domain
hud-projection-domain
minimap-domain
save-on-win-domain
legacy-gamehost-campaign-diagnostics
construct-spiral-intro-kit-legacy-support
campaign-source-ledger-next
campaign-source-fingerprint-next
campaign-action-result-next
campaign-simulation-frame-next
campaign-render-readback-next
campaign-gamehost-fixture-next
central-ledger-sync
```

## Kits and services

```txt
crt-renderer-kit: source canvas display, CRT pass, pointer source mapping.
graveyard-art-kit: menu art composition.
menu-route-kit: start, continue, settings, local save detection.
campaign-route-shell-kit: game.html canvas route and accessible controls.
pixel-campaign-runtime-kit: inline rings, lanes, pads, units, towers, waves, input, update, draw, HUD, minimap, save, GameHost.
legacy-gamehost-diagnostics-kit: aggregate state, camera, startWave, build, setZoom.
construct-spiral-intro-kit: legacy construct profile proof target, not current campaign authority.
phantom-command-campaign-source-ledger-kit next: source-owned campaign rows.
phantom-command-action-result-kit next: select/build/order/start-wave/damage/reward/win/loss rows.
phantom-command-simulation-frame-kit next: deterministic spawn/unit/tower/projectile frame summaries.
phantom-command-render-readback-kit next: render consumption rows.
phantom-command-gamehost-diagnostics-kit next: JSON-safe campaign diagnostics.
phantom-command-campaign-fixture-kit next: DOM-free campaign parity proof.
phantom-command-build-fixture-gate-kit next: build/check integration.
```

## Main finding

Do not start next with renderer replacement, camera rewrite, larger economy, more enemy types, expanded campaign content, RTS system expansion, construct-profile work, or visual polish.

The immediate blocker is campaign fixture readback. `src/campaign/campaign-scene.js` owns campaign descriptors, mutation, input, simulation, rendering, HUD, minimap, save-on-win, and `GameHost` in one file.

It needs source ledger rows, action-result rows, simulation-frame summaries, render readback, fixture rows, and additive `GameHost` diagnostics before additional gameplay or visual expansion.

## Next safe ledge

```txt
PhantomCommand Campaign Fixture Readback Ledger Refresh + GameHost Gate
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
construct smoke: not run
campaign fixture: not run because proof files do not exist yet
browser smoke: not run
```
