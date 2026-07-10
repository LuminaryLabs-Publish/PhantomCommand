# PhantomCommand Current Audit

**Timestamp:** `2026-07-10T05-21-20-04-00`

## Summary

`PhantomCommand` is a static Vite canvas game with a graveyard menu route and a live 2D campaign route.

The active route remains `game.html -> src/campaign/campaign-scene.js`. The campaign scene is source-rich but proof-poor: it owns descriptors, mutation, rendering, input, HUD, minimap, save-on-win, and GameHost inline.

This pass updates repo-local docs and central tracking around the next proof cut: campaign source/action/readback refresh, GameHost diagnostics, and DOM-free campaign fixture gate.

Runtime source was not changed.

## Selection audit

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T04-58-56-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T04-50-40-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T04-40-52-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T04-29-10-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T04-22-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T04-11-36-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T05-11-51-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible fallback / prior central latest 2026-07-10T03-59-57-04-00
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
campaign-source-manifest-next
campaign-descriptor-fingerprint-next
campaign-action-result-next
campaign-simulation-frame-next
campaign-render-readback-next
campaign-gamehost-diagnostics-next
campaign-fixture-next
central-ledger-sync
```

## Kit services in use

```txt
graveyard-menu route:
  menu state, save detection, settings persistence, audio ambience, route transition, CRT display

campaign-scene inline runtime:
  ring descriptors, lane descriptors, build pad generation, unit archetypes, tower archetypes, wave scripts, state mutation, targeting, projectiles, HUD, minimap, camera, input, GameHost

construct-spiral-intro-kit:
  generic construct scheduling support retained for legacy tests, not the live campaign route authority

build-static script:
  copies index.html, game.html, src, docs, and config into dist without campaign fixture gating
```

## Kits

Current explicit kits:

```txt
crt-renderer-kit
graveyard-art-kit
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

Current inline/runtime kits:

```txt
legacy-inline-campaign-ring-map-kit
legacy-inline-campaign-lane-kit
legacy-inline-build-pad-kit
legacy-inline-unit-archetype-kit
legacy-inline-tower-archetype-kit
legacy-inline-wave-script-kit
legacy-inline-selection-kit
legacy-inline-build-action-kit
legacy-inline-order-action-kit
legacy-inline-wave-start-kit
legacy-inline-unit-ai-kit
legacy-inline-projectile-kit
legacy-inline-economy-kit
legacy-inline-hud-kit
legacy-inline-minimap-kit
legacy-inline-gamehost-campaign-diagnostics-kit
legacy-static-build-copy-kit
```

Next-cut kits:

```txt
phantom-command-campaign-source-manifest-kit
phantom-command-campaign-descriptor-fingerprint-kit
phantom-command-ring-lane-descriptor-kit
phantom-command-build-pad-descriptor-kit
phantom-command-unit-archetype-kit
phantom-command-tower-archetype-kit
phantom-command-wave-script-kit
phantom-command-action-intent-kit
phantom-command-action-result-kit
phantom-command-simulation-frame-kit
phantom-command-render-readback-kit
phantom-command-gamehost-campaign-diagnostics-kit
phantom-command-campaign-fixture-kit
phantom-command-build-fixture-gate-kit
central-ledger-readback-kit
```

## Main finding

Do not start next with renderer replacement, camera rewrite, larger economy, more enemy types, expanded campaign content, or visual polish.

The immediate blocker is source ownership and action/readback proof. `src/campaign/campaign-scene.js` owns campaign descriptors, mutation, rendering, input, HUD, minimap, save-on-win, and `GameHost` in one file. It needs source manifests, action-result rows, simulation-frame summaries, render readback, fixture rows, and additive `GameHost` diagnostics before additional gameplay or visual expansion.

## Next safe ledge

```txt
PhantomCommand Campaign Source Action Readback Refresh + GameHost Fixture Gate
```
