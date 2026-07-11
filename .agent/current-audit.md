# PhantomCommand Current Audit

**Timestamp:** `2026-07-11T19-48-09-04-00`

## Summary

PhantomCommand allocates both menu and campaign runtimes at module scope. Each page starts an untracked recursive RAF, installs anonymous listeners, publishes mutable globals and creates CRT WebGL resources without a dispose service; the menu can also own an AudioContext and delayed close timer. Navigation, reload and Escape rely on document replacement rather than an admitted teardown transaction, and no pagehide/pageshow or bfcache policy fences retained callbacks.

## Plan ledger

**Goal:** define one authoritative runtime-session boundary across menu and campaign startup, callback ownership, teardown, navigation, restart, bfcache behavior and first replacement-frame proof.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `PhantomCommand`.
- [x] Read menu, campaign and CRT source.
- [x] Identify the complete interaction loop.
- [x] Identify all active and missing domains.
- [x] Identify all implemented kits and services.
- [x] Define lifecycle commands, leases, retirement results and fixture gates.
- [ ] Implement and execute the lifecycle authority.

## Selection audit

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

## Complete interaction loop

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

## Concrete ownership defects

### Recursive RAF ownership is discarded

Both entry modules call `requestAnimationFrame(frame)` and each frame schedules the next callback. No RAF ID is retained, no stop flag is checked and no generation is captured.

### Listener retirement is impossible to prove

Menu and campaign listeners are installed at module scope. Most handlers are anonymous closures, so deterministic `removeEventListener` calls cannot be issued later. There is no listener ledger or teardown result.

### CRT resources have no disposal service

`createCrtRenderer()` allocates a WebGL program, compiled shaders, a buffer and a texture, then returns `{ render, resize, screenToSource, gl }`. It exposes no `dispose()` method, context-loss policy or resource retirement receipt.

### Menu audio has split ownership

The menu can allocate an `AudioContext`, oscillator, looping buffer source, gains and filter. `stopAmbience()` schedules an anonymous 300 ms close timer, but navigation has no mandatory audio stop and the timer itself is not owned or cancelled.

### Globals remain mutable capabilities

`window.PhantomMenu` and `window.GameHost` are published without session or generation identity. They are not revoked before navigation, reload or a future restart.

### Navigation bypasses lifecycle admission

Menu transition assigns `window.location.href`; campaign restart uses `location.reload()` and Escape assigns `location.href="./"`. These paths publish no stop, dispose, navigation or restart result.

### bfcache behavior is undefined

Neither page listens for `pagehide` or `pageshow`. A persisted page can retain JavaScript, WebGL and audio ownership, but no resume, cold-restart or disposal policy exists.

## Domains in use

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

## Implemented kits and services

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

Services include menu routing and fade, settings persistence, save-presence scanning, procedural graveyard drawing, AudioContext ambience and tones, CRT WebGL setup/rendering, campaign content and state, selection/build/orders/waves/pause/camera input, fixed-step combat, world/HUD/minimap/overlay rendering, GameHost diagnostics, checks, build and Pages deployment.

## Required parent domain

```txt
phantom-command-runtime-session-lifecycle-authority-domain
```

Candidate kits:

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

## Required transaction

```txt
StartSessionCommand
  -> allocate sessionId and runtimeGeneration
  -> create a resource lease registry
  -> construct menu or campaign under candidate ownership
  -> install callbacks and globals through recorded leases
  -> render and acknowledge the first session frame
  -> publish ReadySessionResult

StopSessionCommand
  -> move lifecycle phase to STOPPING
  -> reject new commands
  -> cancel RAF and timers
  -> fence stale callbacks
  -> publish StopSessionResult

DisposeSessionCommand
  -> remove listeners
  -> stop and close audio
  -> delete CRT texture, buffer, program and shaders
  -> revoke globals
  -> retire resources in reverse dependency order
  -> publish retirement receipts and DisposeSessionResult

NavigateCommand or RestartCommand
  -> require successful stop/dispose
  -> perform navigation or construct a new generation
  -> publish result only after first replacement frame
```

## Required invariants

```txt
exactly one live RAF chain per page session
every listener, timer, audio node, WebGL object and global has one owner
teardown is idempotent
stale callbacks reject after generation changes
navigation begins only after required retirement succeeds
bfcache resume follows an explicit resume-or-cold-restart policy
restart advances session and runtime generation
first replacement frame commits before readiness is exposed
repeated menu/campaign/restart cycles do not grow owned resources
```

## Validation boundary

Documentation only. Runtime, rendering, audio, navigation and deployment behavior were not changed.
