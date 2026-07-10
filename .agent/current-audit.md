# PhantomCommand Current Audit

**Timestamp:** `2026-07-10T17-08-36-04-00`

## Status

```txt
status: campaign-save-admission-resume-fidelity-fixture-gate-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local audit commit is recorded
```

## Selection audit

```txt
Accessible Publish repositories: 10
Eligible non-Cavalry repositories: 9
Central ledger entries present: 9/9
Root .agent state present: 9/9
Excluded: LuminaryLabs-Publish/TheCavalryOfRome
Selected: LuminaryLabs-Publish/PhantomCommand
Selection rule: oldest eligible documented fallback
Prior selected-repo central timestamp: 2026-07-10T15-38-40-04-00
Newer HorrorCorridor repo-local activity observed: 2026-07-10T17-00-54-04-00
```

## Current interaction loop

```txt
index.html menu
  -> read menu settings
  -> search three candidate save keys in localStorage and sessionStorage
  -> enable Continue when any raw value exists
  -> Begin routes to game.html?campaign=new
  -> Continue routes to game.html?campaign=continue
  -> game.html imports campaign-scene.js
  -> query intent is not parsed
  -> candidate saves are not read, classified, validated, or hydrated
  -> fresh descriptors, counters, camera, and campaign state initialize
  -> click or drag selects allies or pads
  -> second click on a selected pad attempts build
  -> right-click attempts move or attack order
  -> Space attempts wave start
  -> fixed-step loop advances spawn, AI, towers, projectiles, damage, rewards, wave state, and win/loss
  -> render loop projects world, HUD, minimap, modal, and CRT
  -> victory writes a minimal completion summary
  -> GameHost exposes mutable state and aggregate diagnostics
```

## Domains in use

```txt
static-route-shell
menu-route
campaign-route
menu-selection-domain
menu-panel-domain
menu-settings-persistence-domain
menu-save-candidate-discovery-domain
menu-transition-domain
menu-audio-domain
graveyard-art-domain
source-canvas-domain
crt-display-domain
campaign-session-intent-domain
campaign-save-key-domain
campaign-save-admission-domain-next
campaign-save-classification-domain-next
campaign-save-envelope-domain-next
campaign-save-hydration-domain-next
campaign-resume-fidelity-domain-next
campaign-session-fingerprint-domain-next
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
win-loss-domain
save-on-win-domain
keyboard-input-domain
pointer-input-domain
camera-pan-zoom-domain
fixed-step-simulation-domain
world-render-domain
hud-projection-domain
minimap-domain
modal-overlay-domain
gamehost-diagnostics-domain
campaign-static-check-domain
static-build-domain
github-pages-deploy-domain
central-ledger-sync-domain
```

## Source-backed kits and services

- `crt-renderer-kit`: display scaling, CRT/grain/fade projection, and source-coordinate pointer mapping.
- `graveyard-art-kit`: procedural menu art composition.
- `menu-route-kit`: menu selection, settings and credits panels, Begin/Continue navigation.
- `menu-settings-persistence-kit`: CRT, grain, and ambience preference persistence.
- `menu-save-presence-kit`: raw presence checks across three keys and two browser storage layers.
- `menu-audio-kit`: synthesized ambience and UI feedback.
- `campaign-route-shell-kit`: accessible campaign canvas route.
- `pixel-campaign-runtime-kit`: inline campaign descriptors, state, input, simulation, rendering, persistence, and diagnostics.
- `fixed-step-campaign-simulation-kit`: accumulator-based `1/60` updates.
- `pixel-campaign-render-kit`: world, HUD, minimap, modal, and CRT projection.
- `legacy-gamehost-diagnostics-kit`: mutable state and camera plus `startWave`, `build`, aggregate `getState`, and `setZoom`.
- `campaign-static-check-kit`: source-pattern assertions.
- `static-build-copy-kit`: static deployment artifact creation.
- `construct-spiral-intro-kit` family: retained legacy construct proof, not authority for the live campaign route.

## Verified source facts

```txt
menu candidate keys:
  phantomCommand.save
  nexus.sceneSnapshot
  phantom.command.campaign

storage layers searched:
  localStorage
  sessionStorage

Continue admission today:
  any non-empty raw value under any candidate key

campaign candidate reads:
  none

campaign session-mode parsing:
  none

campaign save write:
  key: phantomCommand.save
  timing: victory only
  payload: { scene: "grave-ring", souls, wave }

campaign source canvas: 640 x 360
rings: 7
lanes: 4
generated pads: 58
starter allies: 6
tower types: spire, lantern, ward
unit archetypes: guard, archer, runner, shield, zealot, brute, wraith
waves: 6
simulation: fixed 1/60 through an accumulator
```

## Resume-fidelity coverage gap

The current victory summary does not contain enough information to restore the live campaign. It omits at least:

```txt
schema and version
source revision and checksum
session identity and saved-at time
simulation tick and accumulator
uid, pid, and tid counters
core health
waveActive and spawn queue
units, positions, health, cooldowns, targets, movement, animation, and lane state
towers, occupied pads, cooldowns, and indices
projectiles and effects
selection, selected pad, and tower type
camera position, zoom, and target zoom
paused, won, lost, and message state
command sequence and applied-command high-water mark
```

## Main finding

Do not treat raw key presence as proof that Continue is available. `nexus.sceneSnapshot` and `phantom.command.campaign` have no runtime adapters, while `phantomCommand.save` is currently a completion summary rather than a resumable session.

The immediate boundary is a save-admission contract that classifies every candidate before the menu enables Continue, followed by a versioned full-state envelope whose hydration can reproduce the exact campaign fingerprint. Command correlation remains important, but it should consume an authoritative session identity and hydrated baseline rather than being built on an undefined continuation state.

## Next safe ledge

```txt
PhantomCommand Save Admission Authority + Resume Fidelity Fixture Gate
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
save admission fixture: not run because it does not exist yet
resume fidelity fixture: not run because it does not exist yet
pushed to main: documentation only
central ledger update: pending
```
