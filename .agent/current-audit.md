# PhantomCommand Current Audit

**Timestamp:** `2026-07-10T06-59-18-04-00`

## Summary

`PhantomCommand` is a static Vite canvas game with a graveyard menu route and a live 2D campaign route.

The active route remains `game.html -> src/campaign/campaign-scene.js`. The campaign scene is source-rich but proof-poor: it owns descriptors, mutation, rendering, input, HUD, minimap, save-on-win, and GameHost inline.

This pass updates repo-local docs and central tracking around the next proof cut: campaign source ledger readback, action-result rows, render readback, GameHost diagnostics, and DOM-free campaign fixture gate.

Runtime source was not changed.

## Selection audit

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T06-48-54-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T06-30-49-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T06-21-03-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T06-08-36-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T05-49-25-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T05-40-17-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T05-28-12-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible fallback / prior central latest 2026-07-10T05-21-20-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

No checked public non-Cavalry repo was new, central-ledger absent, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

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
  -> second click on selected empty pad builds selected tower if souls cover cost
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
campaign-descriptor-fingerprint-next
campaign-action-result-next
campaign-simulation-frame-next
campaign-render-readback-next
campaign-gamehost-diagnostics-next
campaign-fixture-next
central-ledger-sync
```

## Main finding

Do not start next with renderer replacement, camera rewrite, larger economy, more enemy types, expanded campaign content, or visual polish.

The immediate blocker is source ownership and action/readback proof. `src/campaign/campaign-scene.js` owns campaign descriptors, mutation, rendering, input, HUD, minimap, save-on-win, and `GameHost` in one file. It needs source ledger rows, action-result rows, simulation-frame summaries, render readback, fixture rows, and additive `GameHost` diagnostics before additional gameplay or visual expansion.

## Next safe ledge

```txt
PhantomCommand Campaign Source Ledger Readback Refresh + GameHost Fixture Gate
```
