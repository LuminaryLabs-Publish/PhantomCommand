# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-13T11-41-10-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `fixed-step-frame-scheduler-authority-audited`

## Summary

PhantomCommand combines a procedural menu, a mutable pixel-isometric campaign, fixed-step combat, Canvas2D world/HUD/minimap projection, WebGL CRT presentation, browser persistence, static checks and Pages delivery. The current audit isolates the frame scheduler boundary: wall time, camera motion, fixed-step simulation, source rendering and CRT time are advanced through related but unversioned clocks, with no dropped-time receipt, step-drain result, interpolation frame or first matching visible-frame acknowledgement.

## Plan ledger

**Goal:** establish one authoritative frame transaction from wall-time sampling through fixed-step drain, camera update, immutable presentation snapshot, CRT submission and visible-frame proof.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm every eligible repository head matches its recorded repo-local documentation head.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` as the oldest eligible central entry.
- [x] Read the route shell, campaign state, input, camera, fixed-step loop, rendering, CRT submission, checks and current agent state.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 20 implemented kit surfaces and their offered services.
- [x] Define the fixed-step frame scheduler authority family.
- [x] Add tracker, turn-ledger, architecture, render, gameplay, interaction, scheduler, deploy and central-sync audits.
- [x] Refresh `START_HERE.md`, `current-audit.md`, `next-steps.md`, `known-gaps.md`, `validation.md` and `kit-registry.json`.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime scheduler implementation and executable cadence fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent folders: 9
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
repo-local-newer-than-central repositories: 0

PhantomCommand     2026-07-13T05-59-03-04-00 selected
HorrorCorridor     2026-07-13T07-00-29-04-00
ZombieOrchard      2026-07-13T07-41-11-04-00
PrehistoricRush    2026-07-13T08-39-12-04-00
TheUnmappedHouse   2026-07-13T09-03-20-04-00
TheOpenAbove       2026-07-13T09-40-27-04-00
AetherVale         2026-07-13T10-05-15-04-00
MyCozyIsland       2026-07-13T10-41-40-04-00
IntoTheMeadow      2026-07-13T10-59-22-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
menu route
  -> create procedural 480x270 source canvas
  -> process pointer/keyboard/native controls
  -> draw menu and panels
  -> upload source to CRT WebGL renderer
  -> submit display frame
  -> request successor RAF

campaign route
  -> create mutable campaign, input and camera state
  -> RAF supplies wall-clock timestamp
  -> derive dt and clamp it to 50 ms
  -> update camera with variable dt
  -> add clamped dt to the simulation accumulator
  -> drain zero to three fixed 1/60 s simulation steps
  -> draw current world, HUD and minimap into 640x360 source canvas
  -> sample a second `performance.now()` for CRT effects
  -> upload and draw the CRT frame
  -> request successor RAF

background/hitch path
  -> browser delays RAF
  -> elapsed wall time can exceed 50 ms
  -> dt is silently clamped
  -> discarded wall time receives no result or diagnostic
  -> simulation exposes only the latest complete step
  -> render has no interpolation alpha or temporal provenance
```

## Domains in use

```txt
route and browser lifecycle
menu state, panels, navigation, settings, save presence and audio
keyboard, pointer, wheel, drag and native-control input
camera pan, velocity, target zoom and screen/world projection
wall-time sampling and RAF scheduling
fixed-step accumulation, step drain and pause admission
campaign state, waves, spawning, units, towers, projectiles and effects
combat, rewards, outcomes and minimal persistence
Canvas2D world, HUD, minimap and terminal projection
WebGL CRT upload, shader effects and display submission
construction intro choreography and piece sequencing
public diagnostics and bounded readback
static checks, build, Pages deployment and audit tracking
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL creation, shader/program setup, source texture, resize, screen projection and CRT draw
graveyard-art-kit: procedural menu art and panel drawing
menu-route-kit: selection, panels, transition and navigation
menu-settings-persistence-kit: settings read/write
menu-save-presence-kit: browser save-key presence scan
menu-audio-kit: ambience, UI tones and delayed close
campaign-route-shell-kit: campaign document, source canvas and assistive description
pixel-campaign-runtime-kit: mutable state, input, selection, building, orders, pause and camera
fixed-step-campaign-simulation-kit: accumulator drain, waves, movement, targeting, projectiles, damage and outcomes
pixel-campaign-render-kit: source-canvas world, HUD, minimap and terminal overlays
legacy-gamehost-diagnostics-kit: public state and direct capabilities
menu-static-check-kit: menu source-marker checks
campaign-static-check-kit: campaign source-marker checks
static-build-copy-kit: deployable static copy
pages-deploy-kit: GitHub Pages deployment
construct-spiral-intro-kit: construction intro choreography
construct-spiral-schedule-kit: ring and piece timing
construct-piece-id-kit: stable construction identity
construct-piece-state-kit: construction state projection
construct-sequence-update-kit: sequence advancement
```

## Source-backed findings

1. `frame(now)` computes `dt = min(0.05, elapsed)`, silently discarding wall time beyond 50 ms.
2. The accumulator drains fixed `1/60` steps but returns no step count, dropped-time amount, simulation revision or terminal drain result.
3. Camera motion uses variable `dt` while gameplay uses fixed steps, so camera and world do not share one temporal envelope.
4. Rendering reads only the latest mutable state. There is no previous/current snapshot pair or interpolation alpha.
5. At refresh rates above 60 Hz, zero-step frames repeat a pose; the next stepped frame jumps to the successor pose.
6. `render()` samples `performance.now()` again, so CRT shader time is not identified with the RAF sample that drove camera and simulation.
7. No `visibilitychange` policy classifies background suspension, first resumed frame, discarded time or scheduler generation.
8. `GameHost` exposes state and direct mutations without frame, scheduler or visible-result correlation.

## Required authority

```txt
phantom-command-fixed-step-frame-scheduler-authority-domain
```

## Required transaction

```txt
CampaignFrameCommand
  -> bind route, session, scheduler and visibility generations
  -> accept one WallTimeSample
  -> classify elapsed, clamped and dropped wall time
  -> return a FixedStepDrainResult with step count and simulation revision
  -> update camera under the same frame envelope
  -> retain previous and current immutable presentation snapshots
  -> calculate bounded interpolation alpha
  -> build one CampaignPresentationFrame
  -> submit Canvas2D and CRT projection from that exact frame
  -> publish Presented, Partial, Failed, Stale, Superseded or Cancelled
  -> acknowledge the first matching visible display frame
```

## Candidate authority kits

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
camera-frame-state-kit
previous-current-state-pair-kit
interpolation-alpha-kit
campaign-presentation-frame-kit
presentation-frame-fingerprint-kit
visibility-transition-kit
resume-frame-policy-kit
scheduler-pause-admission-kit
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

This run changes documentation only. It does not alter HTML, JavaScript, input, simulation, camera, rendering, WebGL, persistence, scripts, dependencies or deployment.