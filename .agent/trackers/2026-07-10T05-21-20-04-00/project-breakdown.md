# PhantomCommand Project Breakdown

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Run timestamp:** `2026-07-10T05-21-20-04-00`

## Selection

The current public `LuminaryLabs-Publish` repository list was checked. `TheCavalryOfRome` was excluded by rule.

No checked public non-Cavalry repo was new, missing from central tracking, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`PhantomCommand` was selected as the oldest eligible documented fallback. Its central ledger was still at `2026-07-10T03-59-57-04-00` after `HorrorCorridor` advanced to `2026-07-10T05-11-51-04-00`.

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

## Evidence read

```txt
package.json
game.html
scripts/build-static.mjs
src/menu/graveyard-menu.js
src/campaign/campaign-scene.js
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
central LuminaryLabs-Dev/LuminaryLabs repo-ledger entries
```

## Current interaction loop

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> graveyard menu renders through crt-renderer and graveyard-art
  -> Begin Campaign or Continue routes to game.html
  -> game.html imports src/campaign/campaign-scene.js
  -> campaign-scene creates 640 x 360 source canvas and CRT display renderer
  -> inline descriptors define 7 rings, 4 lanes, generated pads, unit archetypes, tower archetypes, waves, camera, input, and campaign state
  -> starter guards and archers spawn around sanctum core
  -> pointer click selects units or empty build pads
  -> second click on selected empty pad calls build when souls cover selected tower cost
  -> right-click orders selected units or targets nearest enemy
  -> Space starts queued wave spawns
  -> update loop advances wave spawn queue, unit AI, towers, projectiles, damage, rewards, effects, wave clear, win, and loss
  -> draw loop renders rings, lanes, pads, props, units, towers, projectiles, effects, HUD, minimap, modal state, and CRT pass
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
campaign-source-manifest-next
campaign-descriptor-fingerprint-next
campaign-action-result-next
campaign-simulation-frame-next
campaign-render-readback-next
campaign-gamehost-diagnostics-next
campaign-fixture-next
central-ledger-sync
```

## Kit services

```txt
crt-renderer-kit:
  display canvas fitting, source canvas scaling, CRT/grain/fade rendering, screen-to-source pointer mapping

graveyard-menu-kit:
  menu selection, save detection, settings persistence, route transitions, ambience, CRT menu rendering

campaign-scene inline runtime:
  rings, lanes, pads, archetypes, towers, waves, souls, core, selection, build, order, wave start, unit AI, tower AI, projectiles, damage, rewards, HUD, minimap, camera, save-on-win, GameHost

construct-spiral-intro-kit:
  generic construct scheduling support retained for legacy smoke coverage, not current live campaign authority

build-static script:
  static artifact copy into dist without campaign fixture gating
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

`PhantomCommand` should not start next with camera rewrites, larger campaign content, renderer replacement, enemy art expansion, or economy expansion.

The blocker is campaign source/action/render proof. `src/campaign/campaign-scene.js` owns descriptors, mutation, rendering, input, HUD, minimap, save-on-win, and GameHost inline. The next useful cut is source-owned descriptors, action-result rows, simulation-frame summaries, render readback, and additive GameHost campaign diagnostics proven by a DOM-free fixture.

## Next safe ledge

```txt
PhantomCommand Campaign Source Action Readback Refresh + GameHost Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run check: not run
npm run build: not run
construct smoke: not run
campaign fixture: not run because it does not exist yet
browser smoke: not run
pushed to main: yes, documentation only
central ledger updated: pending until central sync commit
```
