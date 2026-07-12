# Project Breakdown: PhantomCommand Public Host Capability Authority

**Timestamp:** `2026-07-11T23-28-29-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`

## Summary

PhantomCommand exposes live mutable campaign and camera owners through `window.GameHost`. Public callers can bypass browser input, fixed-step scheduling, phase checks, terminal arbitration and frame publication. This breakdown records the complete interaction loop, domains, implemented kits and services, then defines a public capability boundary built from owner quarantine, typed command admission and an immutable committed read model.

## Plan ledger

**Goal:** preserve useful diagnostics and automation without allowing the public host to become a second runtime authority.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Select only `PhantomCommand` through the oldest documented-selection fallback.
- [x] Read the menu, campaign, package and static campaign check surfaces.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Identify all implemented kits.
- [x] Identify the services offered by those kits.
- [x] Trace raw owner exposure and public mutation paths.
- [x] Define the public host capability authority and fixtures.
- [x] Refresh required root `.agent` documents.
- [x] Add timestamped architecture and system audits.
- [ ] Runtime implementation remains future work.

## Selection

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

Only `LuminaryLabs-Publish/PhantomCommand` is changed in the Publish organization.

## Interaction loop

```txt
index.html
  -> load graveyard-menu.js
  -> create procedural graveyard source canvas
  -> create shared CRT renderer
  -> load settings and raw save presence
  -> attach pointer, keyboard and hidden-button input
  -> start menu RAF
  -> publish window.PhantomMenu

menu action
  -> Begin emits game.html?campaign=new
  -> Continue emits game.html?campaign=continue
  -> Settings mutates and persists menu settings
  -> Credits opens a local panel

game.html
  -> load campaign-scene.js
  -> create rings, pads, archetypes and waves
  -> create mutable camera, input, IDs and campaign state
  -> seed six player units
  -> attach pointer, wheel, keyboard, keyup and blur input
  -> start campaign RAF
  -> publish window.GameHost

campaign RAF
  -> sample held camera input
  -> integrate camera velocity, bounds and zoom
  -> accumulate clamped wall-clock delta
  -> run update(1/60) while accumulator permits
  -> update spawning, units, towers, projectiles, effects and terminal state
  -> draw world, HUD, minimap and overlays to CPU canvas
  -> submit the CPU canvas through CRT WebGL
  -> schedule the next RAF

public host path
  -> external code receives raw state and camera references
  -> external code may directly mutate owners
  -> external code may call startWave, build or setZoom
  -> getState samples mutable owners without frame provenance
```

## Domains in use

```txt
static HTML route and page shell
menu state, selection, panels and transitions
menu settings persistence
raw save-presence discovery and Continue projection
menu audio context, ambience and UI tones
procedural graveyard source-canvas art
CRT WebGL setup, source upload, containment and presentation
campaign content definitions: rings, lanes, pads, archetypes, towers and waves
campaign startup and default-state construction
browser pointer, wheel, keyboard and blur input
selection, group selection, movement orders and attack orders
tower selection, construction and economy
wave admission, spawn queue and enemy lane entry
fixed-step clock and simulation
unit AI, targeting, movement and melee/ranged attacks
projectile movement, impact, splash and damage
entity death, rewards, core breach and terminal mutation
camera pan, focus, zoom and world/screen transforms
CPU world, entity, effect, HUD, minimap and terminal rendering
CRT post-presentation
public menu and campaign diagnostics globals
public host owner quarantine and capability policy: missing
public command admission, sequencing and typed results: missing
committed read model and frame provenance: missing
checkpoint, phase, combat, terminal and lifecycle authorities: planned
source-pattern validation
static artifact build and GitHub Pages deployment
central repo tracking and internal audit state
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

## Services offered by each kit

```txt
crt-renderer-kit
  WebGL context/program creation
  source texture upload
  viewport and source-resolution uniforms
  contain mapping and screen-to-source mapping
  CRT, grain, curve, scanline and fade presentation

graveyard-art-kit
  procedural menu graveyard drawing
  menu, panel, pointer, flash and atmospheric projection

menu-route-kit
  menu item selection
  Begin and Continue URL emission
  fade transition and delayed navigation
  hidden accessible button activation

menu-settings-persistence-kit
  localStorage read/write
  CRT, grain and ambience settings normalization

menu-save-presence-kit
  scan three keys across localStorage and sessionStorage
  project Boolean Continue availability

menu-audio-kit
  AudioContext creation
  drone and wind ambience
  UI oscillator tones
  ambience fade and context close

campaign-route-shell-kit
  campaign canvas entrypoint
  source canvas and CRT composition
  document-level controls and menu return

pixel-campaign-runtime-kit
  content constants and mutable campaign state
  entity/tower/projectile ID allocation
  unit and effect construction
  selection, orders, tower building and wave start
  camera control and public GameHost publication

fixed-step-campaign-simulation-kit
  clamped RAF delta and accumulator
  60 Hz update loop
  spawning, AI, movement, targeting and combat
  projectiles, effects, rewards and core damage
  wave completion and terminal mutation

pixel-campaign-render-kit
  isometric world/screen transforms
  rings, lanes, pads and grave decoration
  entity, projectile and effect drawing
  HUD, tower bar, minimap and terminal overlay
  CRT submit

legacy-gamehost-diagnostics-kit
  raw state owner exposure
  raw camera owner exposure
  direct startWave, build and setZoom mutation
  detached subset read through getState

menu-static-check-kit
  menu shell, source-pattern and dependency assertions

campaign-static-check-kit
  campaign shell, source-pattern and CRT assertions
  current assertion that window.GameHost exists

static-build-copy-kit
  copy HTML, source and static files into dist

pages-deploy-kit
  run checks and build
  upload static Pages artifact
  deploy from main

construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
  retained concentric construction sequencing and state services
```

## Main finding

The current public campaign surface is:

```txt
window.GameHost = {
  state,            // live mutable gameplay owner
  camera,           // live mutable camera owner
  startWave,        // direct mutation
  build,            // direct mutation using ambient selection
  getState,         // unversioned mutable-owner sample
  setZoom           // direct mutation without finite-value validation
}
```

This creates an alternate runtime path:

```txt
public script or automation
  -> mutate live owner or call direct mutator
  -> bypass browser command intent
  -> bypass phase and run revision checks
  -> bypass fixed-step command ordering
  -> bypass terminal and persistence policy
  -> change sampled state before a matching render commit
```

## Concrete reachable defects

```txt
GameHost.state.won = true
  -> state update exits early
  -> next frame displays victory
  -> no terminal result or success-save admission exists

GameHost.setZoom(NaN)
  -> targetZoom becomes NaN
  -> following frame makes zoom NaN
  -> worldToScreen and screenToWorld lose finite coordinates

GameHost.state.souls = 999
  -> getState reports 999 immediately
  -> canvas can still show the prior value until the next RAF

GameHost.camera.min = -100
  -> future zoom admission uses a publicly mutated bound

GameHost.state.units = {}
  -> entity graph is replaced outside combat and liveness authority
```

## Required domain

```txt
phantom-command-public-host-capability-authority-domain
```

## Candidate kits

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

## Required proof

```txt
public host exposes no state, camera or renderer owner handle
returned observations are detached and immutable
mutating returned data cannot change runtime state
all public mutations require a declared capability
all commands carry command ID, host session and expected run/phase identity
all numeric command inputs are finite and bounded
stale commands perform zero mutation
terminal commands cannot bypass terminal authority
host and browser actions reach the same internal command handlers
getCommittedState changes only when a frame is committed
host read model and visible canvas cite the same frameId and render receipt
old globals reject work after teardown or navigation
legacy compatibility cannot re-expose owner handles
```

## Validation

Documentation only. No runtime, persistence, gameplay, rendering, navigation or deployment behavior changed. No host-isolation, command-safety or committed-frame coherence claim is made.
