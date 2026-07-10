# PhantomCommand Current Audit

**Timestamp:** `2026-07-10T18-40-13-04-00`

## Status

```txt
status: continue-capability-resolver-candidate-precedence-fixture-gate-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
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
Prior selected-repo timestamp: 2026-07-10T17-08-36-04-00
```

## Current interaction loop

```txt
index.html menu
  -> read menu settings
  -> call hasCampaignSave() while building Continue.enabled
  -> call hasCampaignSave() again while building Continue.note
  -> each call scans three keys across localStorage and sessionStorage
  -> all evidence collapses to Boolean presence
  -> Continue state remains frozen for the menu page lifetime
  -> Begin routes to game.html?campaign=new
  -> Continue routes to game.html?campaign=continue
  -> campaign-scene.js parses neither session mode nor candidates
  -> fresh descriptors, counters, camera, and campaign state initialize
  -> select units or pads
  -> second selected-pad click attempts build
  -> right-click attempts move or attack order
  -> Space attempts wave start
  -> fixed 1/60 loop advances spawn, AI, towers, projectiles, damage, rewards, wave, and core state
  -> world, HUD, minimap, modal, and CRT render
  -> victory writes { scene, souls, wave }
  -> GameHost exposes mutable state and aggregate counters
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
menu-continue-capability-domain
menu-transition-domain
menu-audio-domain
graveyard-art-domain
source-canvas-domain
crt-display-domain
campaign-session-intent-domain
campaign-save-key-domain
candidate-slot-enumeration-domain-next
candidate-parse-domain-next
candidate-schema-classification-domain-next
candidate-precedence-domain-next
continue-capability-projection-domain-next
candidate-provenance-domain-next
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

- `crt-renderer-kit`: display scaling, CRT/grain/fade projection, and source-coordinate mapping.
- `graveyard-art-kit`: procedural menu art composition.
- `menu-route-kit`: menu selection, panels, Begin/Continue navigation, and credits.
- `menu-settings-persistence-kit`: CRT, grain, and ambience preference persistence.
- `menu-save-presence-kit`: raw presence checks across three keys and two storage layers.
- `menu-audio-kit`: synthesized ambience and UI tones.
- `campaign-route-shell-kit`: accessible campaign canvas route.
- `pixel-campaign-runtime-kit`: inline descriptors, state, input, simulation, rendering, persistence, and diagnostics.
- `fixed-step-campaign-simulation-kit`: accumulator-based `1/60` updates.
- `pixel-campaign-render-kit`: world, HUD, minimap, modal, and CRT projection.
- `legacy-gamehost-diagnostics-kit`: mutable state and camera plus `startWave`, `build`, aggregate `getState`, and `setZoom`.
- `campaign-static-check-kit`: source-pattern assertions.
- `static-build-copy-kit`: static deployment artifact creation.
- `construct-spiral-intro-kit` family: retained legacy construct proof, not live campaign authority.

## Verified source facts

```txt
candidate keys:
  phantomCommand.save
  nexus.sceneSnapshot
  phantom.command.campaign

candidate storage layers:
  localStorage
  sessionStorage

candidate slots scanned: 6
hasCampaignSave return shape: Boolean only
hasCampaignSave calls during menu construction: 2
storage-change refresh: none
selected-candidate provenance: none
candidate precedence contract: none
Continue route: ./game.html?campaign=continue
campaign query parsing: none
campaign candidate reads: none
campaign save write: victory-only { scene, souls, wave }
source canvas: 640 x 360
rings: 7
lanes: 4
generated pads: 58
starter allies: 6
tower types: spire, lantern, ward
unit archetypes: guard, archer, runner, shield, zealot, brute, wraith
waves: 6
simulation: fixed 1/60 through an accumulator
```

## Main finding

The current blocker is not only save format. It is the absence of a single authoritative Continue capability resolver.

The menu and future campaign hydration need to consume the same immutable resolution result. That result must include every inspected slot, parse/classification status, deterministic winner, reason for rejected or shadowed candidates, and a stable capability decision. Without that boundary, menu state can claim Continue is available while campaign startup selects nothing, selects differently, or falls back silently.

The first proof should therefore be slot enumeration and precedence, followed by full-state envelope and hydration fidelity.

## Next safe ledge

```txt
PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
candidate resolver fixture: not run because it does not exist yet
resume fidelity fixture: not run because it does not exist yet
repo-local documentation pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```