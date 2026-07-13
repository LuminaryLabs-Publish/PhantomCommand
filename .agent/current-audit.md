# PhantomCommand Current Audit

**Timestamp:** `2026-07-13T11-41-10-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `fixed-step-frame-scheduler-authority-audited`

## Summary

The campaign uses a 60 Hz fixed-step accumulator inside a browser RAF loop. Each callback clamps elapsed wall time to 50 ms, updates the camera with variable dt, drains zero to three simulation steps, renders the latest mutable state and samples a second clock for CRT effects. There is no step-drain receipt, dropped-time result, scheduler generation, state interpolation, temporal frame fingerprint or visible-frame acknowledgement.

## Plan ledger

**Goal:** require each campaign frame to expose one complete evidence chain from wall-time admission through deterministic simulation and visible CRT presentation.

- [x] Compare the full Publish repository list with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only PhantomCommand under the oldest eligible rule.
- [x] Read `game.html`, `src/campaign/campaign-scene.js`, `package.json` and prior audits.
- [x] Identify the interaction loop and all active domains.
- [x] Preserve all 20 implemented kits and services.
- [x] Trace elapsed-time clamping, accumulator drain, camera timing, rendering and public diagnostics.
- [x] Add the timestamped audit family and refresh root `.agent` state.
- [ ] Implement and execute the authority later.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central repositories: 0
selected: LuminaryLabs-Publish/PhantomCommand
selection reason: oldest eligible central timestamp, 2026-07-13T05-59-03-04-00
```

## Complete interaction loop

```txt
menu
  -> collect controls
  -> draw procedural 480x270 source canvas
  -> submit CRT WebGL frame
  -> request successor RAF

campaign
  -> RAF supplies `now`
  -> calculate elapsed from `last`
  -> clamp dt to 0.05 seconds
  -> update variable-dt camera velocity, position and zoom
  -> add clamped dt to accumulator
  -> call update(1/60) while accumulator permits
  -> draw world, HUD and minimap from current mutable state
  -> sample performance.now again for CRT shader time
  -> upload source canvas and draw CRT surface
  -> request successor RAF

hitch/background
  -> elapsed can exceed 0.05 seconds
  -> excess time is silently discarded
  -> no visibility generation or resume policy is published
  -> no discontinuity reaches simulation, presentation or diagnostics
```

## Source-backed findings

### Silent wall-time loss

`frame(now)` uses `Math.min(.05, (now-last)/1000)`. Any elapsed time above 50 ms is discarded without a policy revision, amount or terminal result.

### Unreported step drain

The accumulator loop executes `update(1/60)` until the remainder is below one step. It reports no step count, prior/current simulation revision, budget exhaustion or accumulator state.

### Split temporal ownership

Camera motion consumes variable dt, gameplay consumes fixed dt and CRT effects consume a second `performance.now()` sample. No frame envelope proves they describe one presentation moment.

### No interpolation frame

Rendering reads only current mutable state. Previous/current state snapshots and interpolation alpha are absent, producing repeated zero-step frames and full-step jumps at high refresh rates.

### Visibility transitions are unowned

Blur clears input, but no `visibilitychange` state or scheduler generation classifies hidden time, first resumed frame or stale callbacks.

### Public host cannot explain cadence

`window.GameHost` exposes mutable state and direct commands but no scheduler, drain, dropped-time, presentation or visible-frame receipts.

## Domains in use

```txt
menu and campaign route shells
browser document, RAF, focus, visibility and lifecycle
keyboard, pointer, wheel, drag and native-control input
camera integration and screen/world projection
wall-time admission, clamping and fixed-step accumulation
campaign state, waves, spawning, units, towers, projectiles and outcomes
Canvas2D world, HUD, minimap and terminal projection
WebGL CRT upload and presentation
settings, save-presence, audio and minimal victory persistence
construction intro choreography
public diagnostics
source checks, build, Pages deployment and audit tracking
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL creation, shaders, source texture, resize, projection and CRT draw
graveyard-art-kit: procedural menu and panel drawing
menu-route-kit: selection, panel state, transition and navigation
menu-settings-persistence-kit: settings read/write
menu-save-presence-kit: save-key presence scan
menu-audio-kit: ambience, UI tones and delayed close
campaign-route-shell-kit: campaign document, source canvas and assistive description
pixel-campaign-runtime-kit: state, input, selection, building, orders, pause and camera
fixed-step-campaign-simulation-kit: accumulator drain, waves, movement, targeting, projectiles, damage and outcomes
pixel-campaign-render-kit: source-canvas world, HUD, minimap and terminal overlays
legacy-gamehost-diagnostics-kit: public state and direct capabilities
menu-static-check-kit: menu source-marker checks
campaign-static-check-kit: campaign source-marker checks
static-build-copy-kit: deployable static copy
pages-deploy-kit: GitHub Pages deployment
construct-spiral-intro-kit: construction choreography
construct-spiral-schedule-kit: ring and piece timing
construct-piece-id-kit: stable construction identity
construct-piece-state-kit: construction state projection
construct-sequence-update-kit: sequence advancement
```

## Required authority

```txt
phantom-command-fixed-step-frame-scheduler-authority-domain
```

## Required transaction

```txt
CampaignFrameCommand
  -> bind route, scheduler and visibility generations
  -> admit one wall-time sample
  -> classify elapsed, clamped and dropped time
  -> drain an explicit fixed-step budget
  -> publish FixedStepDrainResult and simulation revision
  -> update camera under the same temporal envelope
  -> construct previous/current immutable presentation state
  -> calculate interpolation alpha
  -> publish CampaignPresentationFrame
  -> return Canvas2D and CRT projection results
  -> commit Complete, Partial, Failed, Stale, Superseded or Cancelled
  -> acknowledge the first matching visible frame
```

## Candidate kits

```txt
frame-scheduler-id-kit
frame-scheduler-generation-kit
wall-time-sample-kit
wall-time-clamp-policy-kit
dropped-time-result-kit
fixed-step-budget-kit
fixed-step-drain-command-kit
fixed-step-drain-result-kit
simulation-revision-kit
temporal-state-pair-kit
camera-frame-state-kit
interpolation-alpha-kit
campaign-presentation-frame-kit
presentation-frame-fingerprint-kit
visibility-transition-kit
resume-frame-policy-kit
stale-raf-rejection-kit
frame-projection-command-kit
frame-projection-result-kit
frame-presentation-journal-kit
public-frame-readback-kit
first-visible-frame-ack-kit
high-refresh-cadence-fixture-kit
hitch-drop-time-fixture-kit
visibility-resume-fixture-kit
source-build-pages-scheduler-fixture-kit
```

## Validation boundary

This is documentation-only. No HTML, JavaScript, gameplay, timing, input, rendering, WebGL, persistence, package script or deployment workflow changed.