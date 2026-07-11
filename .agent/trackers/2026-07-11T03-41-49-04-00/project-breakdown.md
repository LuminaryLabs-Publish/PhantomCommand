# PhantomCommand Runtime Session Lifecycle Breakdown

**Timestamp:** `2026-07-11T03-41-49-04-00`

## Summary

This breakdown selects PhantomCommand as the one Publish repository for this run and defines the missing lifecycle authority between route startup, recursive RAF execution, input admission, menu/campaign navigation, restart and complete resource disposal.

## Plan ledger

**Goal:** preserve current menu, gameplay and rendering while making every active runtime resource owned, observable, reversible and exactly-once disposable.

- [x] Compare the complete accessible Publish inventory.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all eligible repositories with the central ledger.
- [x] Select only PhantomCommand.
- [x] Read current root `.agent` state.
- [x] Read menu, campaign, CRT renderer and package scripts.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all kits and services.
- [x] Trace RAF, listener, timer, global, audio and WebGL ownership.
- [x] Define lifecycle authority and fixtures.
- [x] Refresh required root `.agent` documents.
- [x] Add timestamped architecture, render, gameplay, interaction, lifecycle and deploy audits.
- [ ] Implement runtime lifecycle authority.
- [ ] Add and run executable fixtures.

## Selection evidence

Accessible repositories:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

`TheCavalryOfRome` was excluded. All other repositories were tracked and had root `.agent` state. PhantomCommand had the oldest central ledger timestamp and also had newer repo-local documentation than the central record, so it was the highest-priority single-repository selection.

## Product description

PhantomCommand is a static browser RTS rendered into a low-resolution source canvas and presented through a WebGL CRT pass. The menu is a procedural graveyard scene. The campaign is an isometric concentric-ring defense map with build pads, ally selection and orders, six waves, a fixed-step combat loop and terminal win/loss overlays.

## Interaction loop

```txt
menu:
  load route
  -> allocate renderer, art, state, listeners and optional audio
  -> recursive RAF draws menu
  -> activate Begin/Continue
  -> timed fade
  -> location navigation

campaign:
  load route
  -> allocate renderer, descriptors, state and listeners
  -> recursive RAF samples input and camera
  -> exact 1/60 simulation updates
  -> draw world/HUD/minimap/overlay
  -> CRT upload and draw
  -> reload or navigate away
```

## Domain inventory

```txt
route and boot
menu selection and panels
settings persistence
save-presence and Continue capability
menu transition timing
procedural audio
graveyard art
source canvas and CRT presentation
campaign geometry and content
campaign mutable state
selection, building and orders
wave spawning
fixed-step AI, combat and economy
camera pan and zoom
world, HUD, minimap and terminal rendering
victory summary persistence
PhantomMenu and GameHost observation
runtime session construction
RAF and run generation
listener and timer leasing
global exposure leasing
audio and WebGL resource ownership
transition admission
startup rollback
ordered disposal
lifecycle journal and observation
static checks, build, Pages and central tracking
```

## Current kits and services

```txt
crt-renderer-kit
  compile/link shaders, allocate WebGL buffer/texture, resize, upload, draw, screen projection

graveyard-art-kit
  generate and draw menu art

menu-route-kit
  selection, panels, activation, transition timing and route choice

menu-settings-persistence-kit
  read/write normalized display and ambience settings

menu-save-presence-kit
  Boolean scan of six storage slots

menu-audio-kit
  create ambience graph, play UI tones and request delayed close

campaign-route-shell-kit
  initialize campaign module and canvas

pixel-campaign-runtime-kit
  construct map/content/state and connect input

fixed-step-campaign-simulation-kit
  spawn, AI, movement, targeting, projectile, damage, reward and terminal update

pixel-campaign-render-kit
  world/entity/HUD/minimap/overlay/source-canvas drawing

legacy-gamehost-diagnostics-kit
  expose direct actions, mutable references and aggregate state

menu-static-check-kit
campaign-static-check-kit
static-build-copy-kit
pages-deploy-kit
retained construct kits
```

## Main finding

The menu and campaign each behave as an implicit runtime session, but there is no object that owns that session.

### Menu-owned resources

```txt
source canvas and context
graveyard art provider
CRT WebGL context/program/buffer/texture
canvas pointer listeners
document key listener
button click listeners
recursive RAF chain
optional AudioContext
master/filter/gain graph
drone oscillator
looping wind source
short-lived UI oscillators
delayed audio-close timer
window.PhantomMenu global
transition state and navigation
```

### Campaign-owned resources

```txt
source canvas and context
CRT WebGL context/program/buffer/texture
canvas pointer/contextmenu/wheel listeners
window keydown/keyup/blur listeners
recursive RAF chain
mutable campaign state
mutable camera and input state
window.GameHost global
reload and exit navigation
```

There is no shared lifecycle state, no exact resource ledger, no retained RAF ID, no listener removal path, no global lease, no startup rollback, no ordered disposal and no typed transition completion result.

## Lifecycle contract

```txt
constructing
  -> running
  -> transitioning | stopping | failed
  -> disposed
```

The owner must guarantee:

```txt
one pending RAF per active session
one generation fence per run
one cleanup entry per acquired resource
one removal per listener
one release per global lease
one close path for audio
one delete path for every WebGL object
zero admitted input/render after terminal transition
idempotent disposal
zero retained resources after startup failure
```

## Candidate lifecycle kits

```txt
phantom-command-runtime-session-authority-kit
phantom-command-runtime-session-id-kit
phantom-command-lifecycle-state-kit
phantom-command-startup-transaction-kit
phantom-command-animation-frame-lease-kit
phantom-command-run-generation-fence-kit
phantom-command-listener-lease-kit
phantom-command-timer-lease-kit
phantom-command-global-exposure-lease-kit
phantom-command-audio-resource-owner-kit
phantom-command-crt-resource-owner-kit
phantom-command-transition-command-kit
phantom-command-transition-result-kit
phantom-command-ordered-dispose-kit
phantom-command-startup-rollback-kit
phantom-command-lifecycle-journal-kit
phantom-command-lifecycle-observation-kit
phantom-command-lifecycle-fixture-kit
```

## Required service contract

```txt
createSession(route, environment, options)
start()
stop(reason)
transition(command)
restart(command)
dispose(reason)
getLifecycleState()
getResourceLedger()
getLastResult()
getJournal()
```

Every operation must return a clone-safe typed result with:

```txt
sessionId
runId
runGeneration
sequence
operation
status
reason
stateBefore
stateAfter
resourceCounts
timestamp or deterministic clock row
```

## Next safe ledge

```txt
PhantomCommand Runtime Session Lifecycle Authority
+ Menu/Campaign Teardown Fixture Gate
```

This remains third in the dependency queue, after Continue resolution and campaign action-result authority.
