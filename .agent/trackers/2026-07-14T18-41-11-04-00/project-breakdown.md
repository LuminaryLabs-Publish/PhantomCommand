# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-14T18-41-11-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Selected under:** oldest eligible synchronized documentation rule  
**Status:** `pause-input-command-admission-authority-audited`

## Summary

PhantomCommand has a complete small campaign loop and a visible pause overlay, but pause is currently only a simulation-update boolean. Camera movement, zoom, selection, building, orders, wave admission and direct route commands remain active while `PAUSED` is visible. This audit defines one explicit pause policy and command-admission boundary without changing runtime code.

## Plan ledger

**Goal:** make pause and resume authoritative transactions that define exactly which commands may mutate the campaign, camera, presentation and route while simulation time is suspended.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledger entries and ten root `.agent` states.
- [x] Compare all eligible current `main` heads with their recorded documentation heads.
- [x] Confirm zero new, missing, root-agent-missing or runtime-ahead eligible repositories.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand`, the oldest synchronized eligible entry.
- [x] Identify the complete interaction loop.
- [x] Identify every active domain.
- [x] Preserve all 20 implemented kit surfaces and offered services.
- [x] Define a 22-surface pause/input authority family.
- [x] Add the timestamped audit family and refresh root agent state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime authority and executable source/browser/build/Pages fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0
selected repository: PhantomCommand
selection reason: oldest synchronized central documentation timestamp
prior central timestamp: 2026-07-14T13-40-59-04-00
reviewed repository head: 4a28dcb7d96d492e37a996c31d4083ff9b5a1377
```

## Complete interaction loop

```txt
menu route
  -> draw procedural graveyard menu to Canvas2D
  -> submit through CRT presentation
  -> begin or continue the campaign

campaign bootstrap
  -> create rings, pads, units, towers, waves and mutable state
  -> attach pointer, wheel, keyboard and blur listeners
  -> publish window.GameHost
  -> start recursive RAF and 60 Hz fixed-step accumulation

active campaign
  -> keyboard and pointer events directly mutate camera, selection, orders, build state and wave state
  -> update() advances waves, units, towers, projectiles, rewards and terminal flags
  -> render() draws world, HUD, minimap and overlays through CRT

pause path
  -> P toggles state.paused
  -> update() returns before simulation mutation
  -> RAF, render and camera integration continue
  -> pointer pan, wheel zoom, selection, build and order handlers remain admitted
  -> Space can call startWave() while paused
  -> number keys can change tower type while paused
  -> F can recenter the camera while paused
  -> R and Escape remain immediate route commands
  -> no typed pause result, admission policy or first paused-frame acknowledgement exists

resume
  -> P toggles the same boolean
  -> previously mutated camera, build, order or wave state becomes active
  -> no pause revision or stale-input rejection proves what was accepted while paused
```

## Domains in use

```txt
static HTML routes and ES module lifecycle
browser document, blur and route lifecycle
DOM root and accessibility fallback
Canvas2D source rendering
WebGL context, shader and CRT presentation
procedural menu art, settings, save presence, audio and navigation
campaign rings, pads, units, towers and wave catalog
keyboard, pointer, wheel, context-menu and blur input
camera pan, zoom, focus and projection
selection, tower building and unit orders
fixed-step scheduling and mutable simulation
wave admission, queueing, spawning and completion
movement, targeting, projectiles, damage and rewards
pause state, command admission and resume policy
sanctum health, victory, defeat and terminal presentation
localStorage persistence and reload retry
GameHost diagnostics and direct capabilities
first paused-frame evidence
source checks, static build, Pages deployment and central tracking
```

## Implemented kits and offered services

```txt
implemented source-backed kits: 20
planned pause/input authority surfaces: 22
```

```txt
crt-renderer-kit: WebGL acquisition, shaders, buffers, textures, resize, screen mapping, upload and CRT draw
graveyard-art-kit: procedural menu, graveyard, title, panel and selection drawing
menu-route-kit: selection, panels, fade, transition and navigation
menu-settings-persistence-kit: settings parsing, defaults, mutation and storage write
menu-save-presence-kit: local/session save-key presence scan
menu-audio-kit: AudioContext ambience, wind, UI tones and delayed close
campaign-route-shell-kit: campaign HTML, source canvas and static instructions
pixel-campaign-runtime-kit: state, keyboard/pointer input, selection, building, orders, pause and camera
fixed-step-campaign-simulation-kit: accumulator, waves, spawning, movement, targeting, projectiles, damage, rewards and terminal flags
pixel-campaign-render-kit: world, entities, HUD, minimap, overlays and CRT submission
legacy-gamehost-diagnostics-kit: public campaign snapshot, wave start, build and zoom capabilities
menu-static-check-kit: menu source-marker checks
campaign-static-check-kit: campaign source-marker checks
static-build-copy-kit: static route and source copying into dist
pages-deploy-kit: GitHub Pages publication
construct-spiral-intro-kit: concentric construction choreography
construct-spiral-schedule-kit: ring and piece scheduling
construct-piece-id-kit: stable construction identity
construct-piece-state-kit: construction-state projection
construct-sequence-update-kit: construction sequence advancement
```

## Source-backed findings

```txt
simulation update gated by paused: yes
recursive RAF gated by paused: no
render gated by paused: no
camera key integration gated by paused: no
middle-button pan gated by paused: no
wheel zoom gated by paused: no
selection gated by paused: no
tower build gated by paused: no
unit orders gated by paused: no
wave start gated by paused: no
tower-type selection gated by paused: no
camera focus command gated by paused: no
route exit/reload policy versioned: no
held-input settlement on pause: no
PauseStateRevision: absent
PausePolicyRevision: absent
typed pause/resume results: absent
blocked-command journal: absent
first paused-frame acknowledgement: absent
first resumed-frame acknowledgement: absent
pause browser fixtures: absent
```

## Main finding

`state.paused` only gates `update()`. The recursive RAF, camera integration, rendering and every event listener continue to run. `startWave()`, `build()`, `selectAt()`, `order()`, wheel zoom, middle-button pan, tower-type changes and camera focus contain no pause admission guard. The visible `PAUSED` overlay can therefore coexist with accepted gameplay and camera mutations. The behavior may be intended as a tactical planning mode, but no explicit policy, revision, result or proof distinguishes tactical pause from strict pause.

## Required authority

```txt
phantom-command-pause-input-command-admission-authority-domain
```

```txt
CampaignPauseCommand
  -> bind RunId, InputRevision, SchedulerRevision, CameraRevision and PausePolicyRevision
  -> classify strict pause versus an explicit tactical-planning mode
  -> settle held keys, drag state and pointer ownership
  -> atomically publish one PauseStateRevision
  -> publish CampaignPauseResult
  -> acknowledge FirstPausedFrameAck

PausedCommandAdmission
  -> classify each keyboard, pointer, wheel and public-host command
  -> allow only policy-approved commands
  -> reject or journal blocked wave, build, order, selection and camera mutations
  -> preserve route escape and resume according to policy
  -> cite the active PauseStateRevision in every result

CampaignResumeCommand
  -> bind the accepted pause revision
  -> reject stale pre-pause key and pointer work
  -> require fresh input where policy demands it
  -> resume the fixed-step scheduler from the accepted state
  -> publish CampaignResumeResult
  -> acknowledge FirstResumedCampaignFrameAck
```

## Planned authority surfaces

```txt
campaign-run-identity-kit
input-command-envelope-kit
pause-policy-revision-kit
campaign-pause-command-kit
pause-state-revision-kit
held-input-settlement-kit
keyboard-command-admission-kit
pointer-command-admission-kit
wheel-command-admission-kit
camera-freeze-policy-kit
wave-start-admission-kit
tower-build-admission-kit
unit-order-admission-kit
selection-admission-kit
route-command-admission-kit
fixed-step-pause-gate-kit
pause-result-kit
paused-command-journal-kit
first-paused-frame-ack-kit
campaign-resume-command-kit
stale-input-rejection-kit
source-build-pages-pause-fixture-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, gameplay behavior, camera behavior, input behavior, rendering, persistence, package scripts, dependencies, workflows and deployment were not changed. `npm run check`, `npm run build`, browser pause fixtures, built-output smokes and Pages smokes were not run.
