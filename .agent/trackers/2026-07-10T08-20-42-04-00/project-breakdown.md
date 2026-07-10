# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-10T08-20-42-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/PhantomCommand`

Reason: the current public `LuminaryLabs-Publish` page shows 9 repositories. `TheCavalryOfRome` remains excluded. No checked non-Cavalry repo was new, central-ledger missing, missing root `.agent`, recently added, or otherwise undocumented. `PhantomCommand` was the oldest eligible documented fallback after `HorrorCorridor` advanced to `2026-07-10T08-11-35-04-00`.

## Current repo read

`PhantomCommand` is a static Vite browser game with a graveyard menu route and a live campaign route.

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html
  -> src/campaign/campaign-scene.js
```

The live campaign route remains `game.html -> src/campaign/campaign-scene.js`. `game.html` is only the canvas shell and accessibility copy. `campaign-scene.js` owns the active game source, simulation, rendering, input, HUD, minimap, save-on-win, and `window.GameHost` readback inline.

## Interaction loop

```txt
open index.html
  -> graveyard menu renders through crt-renderer and graveyard-art
  -> Begin Campaign routes to game.html?campaign=new
  -> Continue routes to game.html?campaign=continue when save exists
  -> game.html imports src/campaign/campaign-scene.js
  -> campaign-scene creates a 640 x 360 source canvas and CRT display renderer
  -> inline rings, lanes, generated pads, archetypes, tower types, waves, camera, input, and campaign state initialize
  -> starter guards and archers spawn around sanctum core
  -> pointer click selects allies or empty pads
  -> second click on selected empty pad attempts build using selected tower type and souls
  -> right-click orders selected units or targets nearby enemies
  -> number keys 1/2/3 switch tower type
  -> Space starts the queued wave
  -> update loop advances spawn queue, unit AI, towers, projectiles, damage, rewards, wave clear, win, and loss
  -> draw loop renders rings, lanes, pads, props, units, towers, projectiles, effects, HUD, minimap, modal state, and CRT pass
  -> window.GameHost exposes aggregate state, camera, startWave, build, getState, and setZoom
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
campaign-action-result-next
campaign-render-readback-next
campaign-gamehost-diagnostics-next
campaign-fixture-next
central-ledger-sync
```

## Kit services

Current services:

```txt
menu route
settings persistence
save detection
static campaign route shell
CRT renderer
campaign rings
lane entry paths
build-pad generation
unit archetypes
tower archetypes
wave scripts
souls economy
selection
build action
order action
wave start action
spawn queue
unit AI
tower AI
projectiles
damage and rewards
HUD projection
minimap projection
GameHost aggregate state
static artifact copy
```

Needed next services:

```txt
campaign source ledger
descriptor fingerprints
source manifest
ring/lane/pad descriptor readback
unit/tower/wave source readback
action intent rows
ActionResult rows
simulation frame rows
render-consumption rows
GameHost campaign diagnostics
DOM-free campaign fixture
build fixture gate
central ledger readback
```

## Kits

Implemented / present:

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
static-build-copy-kit
```

Next-cut kits:

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

Do not start next with camera rewrites, larger campaign content, renderer replacement, new enemy art, or economy expansion.

The blocker is campaign source/action/render proof. `src/campaign/campaign-scene.js` still owns descriptors, mutation, input, render, HUD, minimap, save-on-win, and GameHost inline. The next cut should source-own those rows and fixture-prove them before any visual/gameplay expansion.

## Next safe ledge

```txt
PhantomCommand Campaign Source Action Render Proof Refresh + GameHost Fixture Gate
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
pushed to main: pending at file creation time
central ledger update: pending at file creation time
```
