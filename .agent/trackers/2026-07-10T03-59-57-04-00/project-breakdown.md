# PhantomCommand Project Breakdown

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T03-59-57-04-00`

## Plan ledger

```txt
[x] Checked current public LuminaryLabs-Publish repo list.
[x] Excluded TheCavalryOfRome.
[x] Compared checked repos against central LuminaryLabs-Dev/LuminaryLabs tracking.
[x] Selected one repo only: PhantomCommand.
[x] Read PhantomCommand .agent state.
[x] Read central PhantomCommand repo ledger.
[x] Read package.json, index.html, game.html, build script, menu route, campaign scene, construct kit, and construct smoke test.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified kit services.
[x] Identified implemented, inline, legacy, and next-cut kits.
[x] Updated required root .agent docs.
[x] Added timestamped tracker and turn ledger.
[x] Added architecture, render, gameplay, interaction, campaign-authority, and deploy audits.
[x] Updated kit registry.
[x] Updated central repo ledger.
[x] Added central internal change-log entry.
[ ] Runtime source edit.
[ ] npm run check.
[ ] npm run build.
[ ] Browser route validation.
[ ] Campaign fixture run.
```

## Repo selected

```txt
LuminaryLabs-Publish/PhantomCommand
```

Reason: no checked public non-Cavalry repo was new, ledger-missing, missing root `.agent`, recently added but undocumented, or otherwise undocumented. `PhantomCommand` was the oldest eligible documented fallback after `HorrorCorridor` advanced.

## Files updated

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

## Files added

```txt
.agent/trackers/2026-07-10T03-59-57-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T03-59-57-04-00.md
.agent/architecture-audit/2026-07-10T03-59-57-04-00-campaign-scene-source-manifest-dsk-map.md
.agent/render-audit/2026-07-10T03-59-57-04-00-pixel-campaign-render-readback.md
.agent/gameplay-audit/2026-07-10T03-59-57-04-00-wave-build-action-loop.md
.agent/interaction-audit/2026-07-10T03-59-57-04-00-select-build-order-action-results.md
.agent/campaign-authority-audit/2026-07-10T03-59-57-04-00-campaign-source-fixture-contract.md
.agent/deploy-audit/2026-07-10T03-59-57-04-00-campaign-fixture-build-gate.md
```

## Current interaction loop

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> Begin Campaign or Continue routes to game.html
  -> game.html imports src/campaign/campaign-scene.js
  -> campaign-scene creates 640 x 360 source canvas and CRT renderer
  -> inline descriptors define rings, lanes, pads, unit archetypes, tower types, waves, camera, input, and campaign state
  -> starter guards and archers spawn
  -> pointer selects allies or build pads
  -> second click on selected empty pad builds tower if souls are sufficient
  -> right-click orders selected units or targets enemies
  -> Space starts wave spawn queue
  -> update loop advances enemies, allies, towers, projectiles, damage, rewards, effects, win/loss
  -> draw loop renders pixel campaign world, HUD, minimap, and CRT pass
  -> GameHost returns aggregate campaign state and zoom controls
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

## Kit services

```txt
graveyard-menu route:
  menu selection, save detection, settings persistence, ambience, route transition, CRT render

campaign-scene inline runtime:
  ring map, lane map, build pad generation, unit archetypes, tower archetypes, wave scripts, souls economy, core health, selection, build, order, wave start, unit AI, tower AI, projectile resolution, damage/reward, HUD, minimap, camera, GameHost

construct-spiral-intro-kit:
  generic construct scheduling support retained for legacy tests, not current campaign authority

build-static script:
  static artifact copy without campaign fixture gate
```

## Kits

```txt
implemented: crt-renderer-kit
implemented: graveyard-art-kit
implemented: construct-spiral-intro-kit
implemented: construct-spiral-schedule-kit
implemented: construct-piece-id-kit
implemented: construct-piece-state-kit
implemented: construct-sequence-update-kit
inline-live: legacy-inline-campaign-ring-map-kit
inline-live: legacy-inline-campaign-lane-kit
inline-live: legacy-inline-build-pad-kit
inline-live: legacy-inline-unit-archetype-kit
inline-live: legacy-inline-tower-archetype-kit
inline-live: legacy-inline-wave-script-kit
inline-live: legacy-inline-selection-kit
inline-live: legacy-inline-build-action-kit
inline-live: legacy-inline-order-action-kit
inline-live: legacy-inline-wave-start-kit
inline-live: legacy-inline-unit-ai-kit
inline-live: legacy-inline-projectile-kit
inline-live: legacy-inline-economy-kit
inline-live: legacy-inline-hud-kit
inline-live: legacy-inline-minimap-kit
inline-live: legacy-inline-gamehost-campaign-diagnostics-kit
planned-next: phantom-command-campaign-source-manifest-kit
planned-next: phantom-command-ring-lane-descriptor-kit
planned-next: phantom-command-build-pad-descriptor-kit
planned-next: phantom-command-unit-archetype-kit
planned-next: phantom-command-tower-archetype-kit
planned-next: phantom-command-wave-script-kit
planned-next: phantom-command-action-intent-kit
planned-next: phantom-command-action-result-kit
planned-next: phantom-command-simulation-frame-kit
planned-next: phantom-command-render-readback-kit
planned-next: phantom-command-gamehost-campaign-diagnostics-kit
planned-next: phantom-command-campaign-fixture-kit
planned-next: phantom-command-build-fixture-gate-kit
planned-next: central-ledger-readback-kit
```

## Main finding

`PhantomCommand` should not start next with camera rewrites, larger campaign content, renderer replacement, new enemy art, or economy expansion.

The current blocker is campaign source/readback proof. `src/campaign/campaign-scene.js` now owns descriptors, mutation, render, input, HUD, minimap, save-on-win, and GameHost inline. The next useful cut is to source-own those descriptors, add action results and render readback, then prove them with a DOM-free campaign fixture.

## Next safe ledge

```txt
PhantomCommand Campaign Scene Source Manifest + GameHost Fixture Gate
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
central ledger updated: yes
```
