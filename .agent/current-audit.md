# PhantomCommand Current Audit

**Timestamp:** `2026-07-10T15-38-40-04-00`

## Summary

`PhantomCommand` is a static Vite browser game with a graveyard menu and a live pixel-isometric campaign. The current playable route remains `game.html -> src/campaign/campaign-scene.js`.

This audit identifies a stronger immediate boundary than visual or content expansion: the menu emits distinct new/continue session intents, but the campaign always initializes a fresh run. The same runtime also handles descriptors, input, mutation, fixed-step simulation, rendering, persistence, and diagnostics inline without command/result correlation.

Runtime source was not changed.

## Selection audit

```txt
Accessible Publish repositories: 10
Eligible non-Cavalry repositories: 9
Central ledger entries present: 9/9
Root .agent/START_HERE.md present: 9/9
Excluded: LuminaryLabs-Publish/TheCavalryOfRome
Selected: LuminaryLabs-Publish/PhantomCommand
Selection rule: oldest eligible documented fallback
Prior selected-repo central timestamp: 2026-07-10T14-11-51-04-00
```

## Current interaction loop

```txt
index.html menu
  -> settings and save-presence read
  -> Begin routes to game.html?campaign=new
  -> Continue routes to game.html?campaign=continue
  -> game.html imports campaign-scene.js
  -> query intent is not parsed
  -> save state is not hydrated
  -> fresh campaign descriptors and state initialize
  -> click/drag selects allies or pads
  -> second click on selected pad attempts build
  -> right-click attempts move/attack order
  -> Space attempts wave start
  -> fixed-step loop advances spawn, AI, towers, projectiles, damage, rewards, wave state, win/loss
  -> render loop projects world, HUD, minimap, modal, and CRT
  -> victory writes a minimal completion payload
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
menu-save-presence-domain
menu-transition-domain
menu-audio-domain
graveyard-art-domain
source-canvas-domain
crt-display-domain
campaign-session-intent-domain
campaign-save-schema-domain
campaign-save-hydration-domain
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

- `crt-renderer-kit`: display scaling, CRT/grain/fade pass, source-coordinate pointer mapping.
- `graveyard-art-kit`: menu art composition.
- `menu-route-kit`: menu selection, panels, Begin/Continue navigation, credits.
- `menu-settings-persistence-kit`: CRT, grain, and ambience preference persistence.
- `menu-save-presence-kit`: save-key presence detection for Continue gating.
- `menu-audio-kit`: synthesized ambience and UI feedback.
- `campaign-route-shell-kit`: accessible campaign canvas route.
- `pixel-campaign-runtime-kit`: campaign descriptors, state, input, simulation, rendering, persistence, and diagnostics inline.
- `fixed-step-campaign-simulation-kit`: accumulator-based `1/60` updates inline.
- `pixel-campaign-render-kit`: world/HUD/minimap/modal/CRT projection inline.
- `legacy-gamehost-diagnostics-kit`: mutable state, camera, startWave, build, aggregate getState, setZoom.
- `campaign-static-check-kit`: source-pattern smoke assertions.
- `static-build-copy-kit`: static artifact creation.
- `construct-spiral-intro-kit` family: retained legacy construct proof, not live campaign authority.

## Verified source facts

```txt
source canvas: 640 x 360
ring count: 7
lane count: 4
generated build pad count: 58
starter allies: 4 guards + 2 archers
tower types: spire, lantern, ward
unit archetypes: guard, archer, runner, shield, zealot, brute, wraith
wave count: 6
simulation: fixed 1/60 with accumulator
menu save keys checked: 3
campaign save reads: 0
campaign save writes: victory-only minimal payload
```

## Main finding

Do not start next with renderer replacement, camera rewrites, new waves, economy expansion, enemy art, RTS scenario expansion, or legacy construct-profile work.

The immediate blocker is session and command authority. Continue is a menu-only promise; campaign session mode and save hydration do not exist. `build`, `order`, and `startWave` return silently on rejected paths, selection and build are coupled, there is no ordered command/result journal, and no immutable readback links a session intent to simulation and rendered output.

## Next safe ledge

```txt
PhantomCommand Campaign Session Authority + Command Correlation Fixture Gate
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
session fixture: not run because it does not exist yet
local clone validation: blocked by container DNS resolution for github.com
```
