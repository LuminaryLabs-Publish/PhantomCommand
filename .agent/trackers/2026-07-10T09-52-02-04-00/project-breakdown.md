# PhantomCommand Project Breakdown

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T09-52-02-04-00`

## Selection

`PhantomCommand` was selected as the oldest eligible documented fallback after comparing the current public `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and excluding `TheCavalryOfRome`.

No checked non-Cavalry repo was new, missing from the ledger, missing root `.agent`, recently added, or otherwise undocumented.

## Current route

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> Begin Campaign or Continue
  -> game.html
  -> src/campaign/campaign-scene.js
```

## Interaction loop

```txt
open index.html
  -> graveyard menu renders through crt-renderer and graveyard-art
  -> Begin Campaign or Continue routes to game.html
  -> game.html imports src/campaign/campaign-scene.js
  -> campaign-scene creates 640 x 360 source canvas and CRT display renderer
  -> inline descriptors define 7 rings, 4 lanes, generated pads, unit archetypes, tower archetypes, waves, camera, input, and campaign state
  -> starter guards and archers spawn around sanctum core
  -> pointer click selects allies or empty build pads
  -> second click on selected empty pad builds selected tower if souls cover selected tower cost
  -> right-click orders selected units or targets nearest enemy
  -> Space starts queued wave spawns
  -> update loop advances wave spawn queue, unit AI, towers, projectiles, damage, rewards, effects, wave clear, win, and loss
  -> draw loop renders rings, lanes, pads, grave props, units, towers, projectiles, effects, HUD, minimap, modal state, and CRT pass
  -> GameHost exposes state, camera, startWave, build, getState, and setZoom
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
campaign-gamehost-diagnostics-next
campaign-fixture-next
central-ledger-sync
```

## Services the kits offer

```txt
crt-renderer-kit: display scaling, source-to-screen pointer mapping, CRT pass.
graveyard-art-kit: menu route visual composition.
menu-route-kit: start/continue/settings route behavior.
campaign-route-shell-kit: game.html canvas route and accessibility copy.
pixel-campaign-runtime-kit: inline rings, lanes, pads, units, towers, waves, input, simulation, drawing, HUD, minimap, save, and GameHost.
construct-spiral-intro-kit: legacy construct profile smoke target, not current live campaign authority.
phantom-command-campaign-source-ledger-kit next: route, source size, rings, lanes, pads, archetypes, towers, and waves as source rows.
phantom-command-action-result-kit next: select, build, order, start-wave, damage, reward, win, and loss rows.
phantom-command-render-readback-kit next: rings, lanes, pads, units, towers, projectiles, HUD, minimap, and CRT consumption rows.
phantom-command-gamehost-diagnostics-kit next: additive JSON-safe campaign proof under GameHost.
phantom-command-campaign-fixture-kit next: DOM-free source/action/render parity proof.
```

## Kits identified

### Current

```txt
crt-renderer-kit
graveyard-art-kit
menu-route-kit
campaign-route-shell-kit
pixel-campaign-runtime-kit
legacy-gamehost-diagnostics-kit
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

### Next-cut

```txt
phantom-command-campaign-source-ledger-kit
phantom-command-source-manifest-kit
phantom-command-source-fingerprint-kit
phantom-command-ring-lane-descriptor-kit
phantom-command-build-pad-descriptor-kit
phantom-command-unit-archetype-kit
phantom-command-tower-archetype-kit
phantom-command-wave-script-kit
phantom-command-action-intent-kit
phantom-command-action-result-kit
phantom-command-simulation-frame-kit
phantom-command-render-readback-kit
phantom-command-gamehost-diagnostics-kit
phantom-command-campaign-fixture-kit
phantom-command-build-fixture-gate-kit
central-ledger-readback-kit
```

## Main finding

`PhantomCommand` should not start next with camera rewrites, larger campaign content, renderer replacement, new enemy art, economy expansion, or RTS system expansion.

The blocker is campaign source/action/render readback. `src/campaign/campaign-scene.js` still owns descriptors, mutation, input, render, HUD, minimap, save-on-win, and `GameHost` inline. The next useful cut is source-owned campaign rows, action result rows, render readback, additive GameHost diagnostics, and a DOM-free campaign fixture.

## Next safe ledge

```txt
PhantomCommand Campaign Source Action Render Readback Refresh + GameHost Fixture Gate
```
