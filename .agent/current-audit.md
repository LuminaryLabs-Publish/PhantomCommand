# PhantomCommand Current Audit

**Timestamp:** `2026-07-10T03-59-57-04-00`

## Summary

`PhantomCommand` is now a static Vite canvas game with a graveyard menu route and a live 2D campaign route.

The previous docs focused on the old inline smooth-ring construct in `game.html`. Current source shows `game.html` is now a thin shell importing `src/campaign/campaign-scene.js`.

This pass updates repo-local docs and central tracking around the new proof cut: campaign source manifest, action-result rows, render readback, additive `GameHost` diagnostics, and a DOM-free campaign fixture.

Runtime source was not changed.

## Selection audit

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T03-01-42-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T02-51-39-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T02-38-56-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T02-31-58-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T02-19-14-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T02-10-16-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible fallback / prior central latest 2026-07-10T02-02-24-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T03-49-48-04-00
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
campaign-action-result-next
campaign-render-readback-next
campaign-gamehost-fixture-next
central-ledger-sync
```

## Kit services in use

```txt
graveyard-menu route:
  menu state, save detection, settings persistence, audio ambience, route transition, CRT display

campaign-scene inline runtime:
  ring descriptors, lane descriptors, build pad generation, unit archetypes, tower archetypes, wave scripts, state mutation, targeting, projectiles, HUD, minimap, camera, input, GameHost

construct-spiral-intro-kit:
  still present as generic construct scheduling support, but not the live campaign route authority

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

The immediate blocker is source ownership and action/readback proof. `src/campaign/campaign-scene.js` owns campaign descriptors, mutation, rendering, input, HUD, minimap, and `GameHost` in one file. It needs source manifests, action-result rows, render readback, fixture rows, and additive `GameHost` diagnostics before additional gameplay or visual expansion.

## Next safe ledge

```txt
PhantomCommand Campaign Scene Source Manifest + GameHost Fixture Gate
```
