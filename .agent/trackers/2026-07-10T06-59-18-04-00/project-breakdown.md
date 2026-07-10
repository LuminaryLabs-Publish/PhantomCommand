# PhantomCommand Project Breakdown

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T06-59-18-04-00`

## Selection

The current public `LuminaryLabs-Publish` repo list was compared against central `LuminaryLabs-Dev/LuminaryLabs` tracking and sampled root `.agent` state.

No checked public non-Cavalry repo was new, absent from the central ledger, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`PhantomCommand` was selected as the oldest eligible documented fallback. Its prior central tracking was `2026-07-10T05-21-20-04-00`.

## Evidence read

```txt
current public LuminaryLabs-Publish repository list
central LuminaryLabs-Dev/LuminaryLabs Publish ledger entries
PhantomCommand .agent root docs and kit registry
package.json
game.html
src/campaign/campaign-scene.js
```

## Current interaction loop

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> Begin Campaign or Continue routes to game.html
  -> game.html imports src/campaign/campaign-scene.js
  -> campaign-scene creates 640 x 360 source canvas and CRT display renderer
  -> inline descriptors define 7 rings, 4 lane angles, generated build pads, archetypes, tower types, scripted waves, camera, input, and campaign state
  -> starter guards and archers spawn around the sanctum
  -> pointer click selects units or build pads
  -> second click on selected empty pad builds selected tower if souls cover cost
  -> right-click orders selected units or targets enemies
  -> Space starts queued wave spawns
  -> update loop advances wave spawn queue, unit AI, towers, projectiles, damage, rewards, effects, wave clear, win, and loss
  -> draw loop renders rings, lanes, pads, props, units, towers, projectiles, effects, HUD, minimap, modal state, and CRT pass
  -> GameHost exposes aggregate state, camera, startWave, build, getState, and setZoom
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

## Services and kits

Implemented services:

```txt
graveyard menu route, save detection, settings persistence, route transition, CRT render
640 x 360 campaign source canvas, CRT display adapter, ring/lane/pad generation, unit archetypes, tower archetypes, wave scripts, selection, build, order, wave start, unit AI, tower targeting, projectiles, damage, rewards, HUD, minimap, save-on-win, aggregate GameHost diagnostics, static artifact copy
```

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
phantom-command-campaign-source-ledger-kit
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

`PhantomCommand` should not start next with camera rewrites, larger campaign content, renderer replacement, new enemy art, or economy expansion.

The blocker is still source/action/render proof. `src/campaign/campaign-scene.js` owns descriptors, mutation, rendering, input, HUD, minimap, save-on-win, and `GameHost` inline. The next useful cut is a source ledger plus action/render readback rows proven by a DOM-free campaign fixture.

## Next safe ledge

```txt
PhantomCommand Campaign Source Ledger Readback Refresh + GameHost Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
construct smoke: not run
campaign fixture: not run because it does not exist yet
browser smoke: not run
pushed to main: yes, documentation only
```
