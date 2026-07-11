# Project Breakdown: PhantomCommand Runtime Session Lifecycle

**Timestamp:** `2026-07-11T19-48-09-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`

## Summary

PhantomCommand allocates both menu and campaign runtimes at module scope. Each page starts an untracked recursive RAF, installs anonymous listeners, publishes mutable globals and creates CRT WebGL resources without a dispose service; the menu can also own an AudioContext and delayed close timer. Navigation, reload and Escape rely on document replacement rather than an admitted teardown transaction, and no pagehide/pageshow or bfcache policy fences retained callbacks.

## Plan ledger

**Goal:** document the current interaction loop, domains, kits and services, then define the exact lifecycle authority needed for deterministic teardown and restart.

- [x] Compare the complete Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `PhantomCommand`.
- [x] Read root `.agent` state.
- [x] Read `graveyard-menu.js`, `campaign-scene.js` and `crt-renderer.js`.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits and services.
- [x] Define lifecycle DSK boundary and fixture gate.
- [x] Refresh required root `.agent` files.
- [x] Add timestamped audit files.
- [ ] Runtime implementation remains future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0

PhantomCommand     2026-07-11T18-21-09-04-00 selected
ZombieOrchard      2026-07-11T18-28-40-04-00
TheUnmappedHouse   2026-07-11T18-38-45-04-00
AetherVale         2026-07-11T18-48-21-04-00
IntoTheMeadow      2026-07-11T19-01-08-04-00
PrehistoricRush    2026-07-11T19-09-25-04-00
MyCozyIsland       2026-07-11T19-20-22-04-00
TheOpenAbove       2026-07-11T19-28-28-04-00
HorrorCorridor     2026-07-11T19-38-14-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
menu module evaluation
  -> create source canvas, graveyard art and CRT WebGL resources
  -> read settings and save presence
  -> install canvas, document and hidden-button listeners
  -> lazily create AudioContext, oscillators, buffer source and close timer
  -> schedule an untracked recursive RAF
  -> publish window.PhantomMenu

Begin or Continue
  -> set a fade target
  -> RAF repeatedly checks elapsed time
  -> assign window.location.href
  -> rely on browser navigation for cleanup

campaign module evaluation
  -> create source canvas and CRT WebGL resources
  -> construct map, camera, input and mutable state
  -> install canvas and window listeners
  -> schedule an untracked recursive RAF
  -> publish mutable window.GameHost

restart or exit
  -> location.reload() or location.href
  -> no typed stop, dispose, retirement receipt or generation fence
```

## Domains

```txt
static route and page shell
menu selection, panels, settings, save presence, audio and fade transition
procedural graveyard art and source-canvas presentation
CRT WebGL setup, shaders, buffer, texture, upload, resize and draw
campaign rings, lanes, pads, archetypes, waves, economy and core health
selection, construction, orders, pause, camera and fixed-step simulation
unit, tower, projectile, combat, rewards and terminal mutation
world, HUD, minimap, overlay and GameHost projection
runtime session identity and lifecycle phase: missing
RAF, listener, timer, audio, WebGL and global capability ownership: missing
navigation, restart, bfcache and stale-callback fencing: missing
teardown ordering, retirement receipts and first replacement frame: missing
validation, static build, Pages deployment and central tracking
```

## Implemented kits

```txt
crt-renderer-kit
graveyard-art-kit
menu-route-kit
menu-settings-persistence-kit
menu-save-presence-kit
menu-audio-kit
campaign-route-shell-kit
pixel-campaign-runtime-kit
fixed-step-campaign-simulation-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
menu-static-check-kit
campaign-static-check-kit
static-build-copy-kit
pages-deploy-kit
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

## Services

```txt
menu routing and fade
settings persistence and save-presence scan
procedural graveyard drawing
AudioContext ambience and UI tones
CRT WebGL creation, contain framing, upload and rendering
campaign content/state construction
selection, building, orders, waves, pause and camera input
fixed-step spawning, AI, movement, targeting, damage, rewards and terminal mutation
world, HUD, minimap and overlay rendering
mutable GameHost diagnostics and actions
source-pattern checks, static build and Pages deployment
```

## Main finding

Current lifecycle authority is delegated to browser navigation. That is insufficient for deterministic resource ownership, bfcache behavior, restart, tests and future in-page composition. Both pages need explicit runtime factories and one lease-backed session lifecycle.

## Required domain

```txt
phantom-command-runtime-session-lifecycle-authority-domain
```

## Candidate kits

```txt
phantom-command-runtime-session-id-kit
phantom-command-runtime-generation-kit
phantom-command-lifecycle-phase-kit
phantom-command-resource-lease-registry-kit
phantom-command-raf-lease-kit
phantom-command-listener-lease-kit
phantom-command-timer-lease-kit
phantom-command-audio-context-lease-kit
phantom-command-crt-resource-lease-kit
phantom-command-global-capability-lease-kit
phantom-command-stale-callback-fence-kit
phantom-command-navigation-exit-command-kit
phantom-command-restart-command-kit
phantom-command-teardown-plan-kit
phantom-command-reverse-retirement-kit
phantom-command-teardown-result-kit
phantom-command-first-session-frame-kit
phantom-command-lifecycle-journal-kit
phantom-command-menu-campaign-teardown-fixture-kit
phantom-command-bfcache-resume-fixture-kit
phantom-command-restart-leak-fixture-kit
```

## Validation

Documentation-only. No runtime source or deployment behavior changed.
