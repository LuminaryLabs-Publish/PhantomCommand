# PhantomCommand Current Audit

**Timestamp:** `2026-07-14T18-41-11-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `pause-input-command-admission-authority-audited`

## Summary

Pause currently stops only fixed-step simulation mutation. Camera movement, zoom, selection, building, orders, tower-type changes, wave admission, route commands and direct GameHost capabilities remain active while the paused overlay is visible.

## Plan ledger

**Goal:** turn pause into an explicit command-admission state with typed pause, blocked-command and resume results.

- [x] Compare the complete Publish list with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only PhantomCommand under the oldest synchronized rule.
- [x] Read campaign state, input, camera, scheduler, render and public-host paths.
- [x] Identify the interaction loop and active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Add the timestamped pause/input audit family.
- [ ] Implement and execute the authority later.

## Current loop

```txt
menu route
  -> draw procedural graveyard menu and enter campaign

campaign bootstrap
  -> create state, input, camera and fixed-step RAF

active campaign
  -> direct input mutates camera, selection, build, orders and wave state
  -> fixed-step update advances simulation
  -> render submits Canvas2D through CRT

pause
  -> P toggles state.paused
  -> update() returns
  -> RAF, rendering, camera integration and event handlers continue
  -> wheel, middle drag, selection, build, orders and startWave remain admitted
  -> GameHost.startWave, build and setZoom remain direct capabilities

resume
  -> P toggles the boolean
  -> paused mutations become active without an accepted policy result
```

## Source-backed findings

```txt
state.paused gates update(): yes
state.paused gates camera update: no
state.paused gates pointer listeners: no
state.paused gates wheel zoom: no
state.paused gates startWave(): no
state.paused gates build(): no
state.paused gates order(): no
state.paused gates selection: no
state.paused gates public GameHost capabilities: no
held-input settlement: absent
typed pause/resume results: absent
first paused/resumed frame acknowledgements: absent
```

## Domains in use

```txt
static routes and ES module lifecycle
browser document, blur and route lifecycle
Canvas2D and CRT WebGL presentation
menu art, settings, save presence, audio and navigation
campaign rings, pads, units, towers and waves
keyboard, pointer, wheel and public-host commands
camera pan, zoom, focus and projection
selection, tower building and unit orders
fixed-step scheduling and simulation
wave, combat, reward and terminal rules
pause state, command admission and resume policy
persistence and reload retry
source checks, build, Pages and central tracking
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL CRT acquisition, mapping, upload and draw
graveyard-art-kit: procedural menu drawing
menu-route-kit: panels, fades and navigation
menu-settings-persistence-kit: settings defaults and writeback
menu-save-presence-kit: save-key scanning
menu-audio-kit: ambience, wind and UI tones
campaign-route-shell-kit: campaign document and source canvas
pixel-campaign-runtime-kit: state, input, selection, building, orders, pause and camera
fixed-step-campaign-simulation-kit: waves, movement, combat, rewards and terminal flags
pixel-campaign-render-kit: world, HUD, minimap, overlays and CRT submission
legacy-gamehost-diagnostics-kit: state readback and direct capabilities
menu-static-check-kit: menu source checks
campaign-static-check-kit: campaign source checks
static-build-copy-kit: static dist copy
pages-deploy-kit: Pages publication
construct-spiral-intro-kit: intro choreography
construct-spiral-schedule-kit: sequence timing
construct-piece-id-kit: piece identity
construct-piece-state-kit: state projection
construct-sequence-update-kit: sequence advancement
```

## Required authority

```txt
phantom-command-pause-input-command-admission-authority-domain
```

## Required transaction

```txt
CampaignPauseCommand
  -> bind run, input, scheduler, camera and policy revisions
  -> settle held keys and pointer ownership
  -> publish PauseStateRevision and CampaignPauseResult
  -> acknowledge FirstPausedFrameAck

PausedCommandAdmission
  -> classify every keyboard, pointer, wheel and GameHost command
  -> accept only policy-approved commands
  -> reject or journal blocked campaign and camera mutations

CampaignResumeCommand
  -> bind the accepted pause revision
  -> reject stale pre-pause work
  -> resume from the accepted state
  -> publish CampaignResumeResult and FirstResumedCampaignFrameAck
```

## Validation boundary

Documentation only. Runtime, input, camera, gameplay, rendering, persistence, HTML, package scripts, dependencies, workflows and deployment were not changed.
