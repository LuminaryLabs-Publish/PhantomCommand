# PhantomCommand Current Audit

**Timestamp:** `2026-07-11T23-28-29-04-00`

## Summary

The campaign publishes its live gameplay and camera owners through `window.GameHost`. The public surface includes raw `state` and `camera` references plus untyped `startWave`, `build` and `setZoom` functions. External same-page code can mutate gameplay, terminal, camera and presentation inputs outside the browser interaction path and outside fixed-step command ordering. `getState()` returns a detached subset, but it samples the mutable owners without a committed frame ID, run epoch, phase revision or render receipt.

## Plan ledger

**Goal:** define a public host boundary that exposes immutable committed observations and routes every mutation through capability-scoped, revision-fenced commands.

- [x] Compare the current Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Inspect the menu and campaign public globals.
- [x] Trace public references and callable mutators into live runtime state.
- [x] Identify the complete interaction loop, domains, kits and services.
- [x] Define owner quarantine, command admission and committed read-model contracts.
- [ ] Implement and execute the documented fixtures.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

PhantomCommand     2026-07-11T21-31-19-04-00 selected oldest
ZombieOrchard      2026-07-11T21-40-49-04-00
TheUnmappedHouse   2026-07-11T21-48-44-04-00
AetherVale         2026-07-11T22-02-01-04-00
MyCozyIsland       2026-07-11T22-20-00-04-00
PrehistoricRush    2026-07-11T22-38-54-04-00
TheOpenAbove       2026-07-11T23-12-03-04-00
HorrorCorridor     2026-07-11T23-18-16-04-00
IntoTheMeadow      2026-07-11T23-22-14-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/PhantomCommand` is in scope for Publish changes.

## Complete interaction loop

```txt
menu module evaluation
  -> create source canvas, art, CRT renderer, settings and menu state
  -> attach pointer, keyboard and hidden-button listeners
  -> start recursive menu RAF
  -> publish window.PhantomMenu

campaign module evaluation
  -> create rings, pads, archetypes, waves, camera and input owners
  -> create mutable campaign state, entities and IDs
  -> attach pointer, wheel, keyboard, keyup and blur listeners
  -> start recursive campaign RAF
  -> publish window.GameHost

browser interaction
  -> pointer and keyboard callbacks mutate selection, orders, wave, pause and camera
  -> RAF samples held input and updates camera
  -> fixed accumulator calls update(1/60)
  -> combat, economy and terminal fields mutate
  -> CPU canvas renders world, HUD, minimap and overlay
  -> CRT renderer submits the source canvas

public host interaction
  -> caller reads or mutates GameHost.state and GameHost.camera directly
  -> caller invokes startWave, build or setZoom without a command envelope
  -> getState samples mutable state and camera independently of render commit
  -> no command receipt, run/phase fence or frame provenance is returned
```

## Source-backed defects

### Raw gameplay owner is public

`window.GameHost.state` is the same object consumed by update, rendering, input callbacks and persistence. Public code can directly change:

```txt
souls
core
wave
waveActive
spawn
units
towers
projectiles
effects
selected
selectedPad
towerType
paused
won
lost
message
```

No validation, command ID, expected revision, phase check or journal row is involved.

### Raw camera owner is public

`window.GameHost.camera` exposes:

```txt
x
z
zoom
targetZoom
min
max
vx
vz
```

Public mutation can bypass zoom clamps, finite-number checks, camera bounds and input ordering. The camera is read by world/screen transforms and every render projection.

### Public mutators are untyped

The host exposes:

```txt
startWave()
build()
setZoom(value)
```

These return no result. They do not accept a command ID, expected run epoch, phase revision, frame revision or caller capability. `build()` depends on mutable ambient `selectedPad` and `towerType`, while `startWave()` uses ambient campaign state.

### Non-finite zoom is admitted

`setZoom(z)` assigns `clamp(z, min, max)`. The clamp is built from `Math.min` and `Math.max`, so `NaN` remains `NaN`. On the next RAF, `camera.zoom` becomes `NaN`, and world projection produces non-finite screen coordinates.

### Public terminal mutation bypasses arbitration

A caller can execute:

```js
GameHost.state.won = true;
```

The fixed-step update then exits early because `state.won` is true. The next render displays the victory overlay, but no terminal predicate, persistence policy, terminal result or save receipt was committed.

### Readback is not a committed frame

`getState()` structured-clones a subset of live state and camera fields. It includes no:

```txt
runId
runEpoch
phaseRevision
simulationTick
frameId
renderReceipt
stateFingerprint
commandSequence
```

A caller can mutate `state.souls`, immediately call `getState()`, and observe the new value while the canvas still represents the prior RAF.

### Menu global also lacks lifecycle identity

`window.PhantomMenu` exposes `getState()` and `activate(action)` without a menu session ID or disposal fence. Its state is less dangerous because `activateMain()` still checks item enablement, but the surface remains an unversioned global owned by a module-level RAF and listeners.

## Domains in use

```txt
static route and page shell
menu selection, panels, settings, audio and fade transition
save-key discovery and Continue capability projection
procedural graveyard art and source-canvas presentation
CRT WebGL setup, contain mapping, upload, resize and draw
campaign route intent and startup admission
campaign rings, lanes, pads, archetypes, waves, economy and core health
selection, construction, orders, pause, camera and fixed-step simulation
unit, tower, projectile, combat, rewards and terminal mutation
world, HUD, minimap and terminal overlay rendering
public menu and campaign host projection
public host capability descriptors and owner quarantine: missing
typed public command admission and result authority: missing
committed host read model and frame provenance: missing
checkpoint, command, phase, combat, terminal and lifecycle authority: planned
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

## Offered services

```txt
menu routing, fade and hidden-button activation
settings persistence
raw save-presence scanning across three keys and two storage scopes
procedural graveyard source-canvas drawing
AudioContext ambience and UI tones
CRT WebGL creation, containment mapping, texture upload and rendering
campaign content and default-state construction
selection, building, orders, wave start, pause and camera control
fixed-step spawning, AI, movement, targeting, damage, rewards and terminal mutation
world, HUD, minimap and terminal overlay rendering
mutable GameHost owner exposure and untyped zoom/wave/build control
source-pattern checks, static build and GitHub Pages deployment
```

## Required parent domain

```txt
phantom-command-public-host-capability-authority-domain
```

Candidate kits:

```txt
phantom-command-host-surface-policy-kit
phantom-command-host-session-identity-kit
phantom-command-host-capability-descriptor-kit
phantom-command-host-owner-handle-quarantine-kit
phantom-command-host-read-capability-kit
phantom-command-host-command-capability-kit
phantom-command-host-command-envelope-kit
phantom-command-host-command-id-kit
phantom-command-host-command-admission-kit
phantom-command-host-run-epoch-fence-kit
phantom-command-host-phase-revision-fence-kit
phantom-command-host-finite-value-policy-kit
phantom-command-host-command-result-kit
phantom-command-host-committed-read-model-kit
phantom-command-host-frame-provenance-kit
phantom-command-host-state-fingerprint-kit
phantom-command-host-observation-journal-kit
phantom-command-legacy-gamehost-adapter-kit
phantom-command-host-mutation-isolation-fixture-kit
phantom-command-host-read-model-coherence-fixture-kit
phantom-command-host-stale-command-fixture-kit
phantom-command-host-terminal-command-fixture-kit
```

## Required public surface

```txt
window.GameHost = {
  version,
  sessionId,
  capabilities,
  getCommittedState(),
  getJournal(),
  submit(command)
}
```

The public object must not contain raw runtime owners, render objects, collections or direct mutation functions.

## Required command transaction

```txt
HostCommand
  -> validate host session and capability
  -> validate command ID and command schema
  -> validate finite values and bounded payload
  -> validate expected run epoch and phase revision
  -> route to the existing authoritative owner
  -> commit or reject through the fixed-step command path
  -> publish a typed HostCommandResult
  -> correlate any visible effect with a committed frame
  -> append one bounded journal row
```

Required result classes:

```txt
REJECTED_INVALID_COMMAND
REJECTED_UNSUPPORTED_CAPABILITY
REJECTED_STALE_SESSION
REJECTED_STALE_RUN
REJECTED_STALE_PHASE
REJECTED_TERMINAL
ACCEPTED_PENDING
COMMITTED
FAILED
```

## Required invariants

```txt
public host exposes no mutable owner reference
read results are detached and immutable
read results describe one committed frame only
all numeric command fields are finite and bounded
all mutations require a declared capability
all commands carry command ID, session and expected run/phase identity
terminal state cannot be created through raw host mutation
host command effects use the same authority as browser input
stale commands perform zero mutation
render and host observations cite the same frame provenance
legacy compatibility cannot reintroduce owner handles
```

## Validation boundary

Documentation only. Runtime source, persistence, gameplay, rendering, package scripts and deployment were not changed. Host isolation, finite command admission and committed read-model coherence remain unproved until the documented fixtures exist and pass.
