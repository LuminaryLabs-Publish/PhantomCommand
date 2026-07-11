# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-11T11-51-06-04-00`

## Summary

PhantomCommand is a static pixel-isometric RTS with a procedural graveyard menu and a grave-ring campaign. The campaign runs combat in `1/60` steps, but browser callbacks mutate selection, construction, orders, wave state, pause state and tower choice immediately between simulation ticks. The current audit defines the missing command-scheduling, clock-overrun and committed-frame authority needed for deterministic replay.

## Plan ledger

**Goal:** preserve the current game while making every authoritative mutation apply at a declared simulation tick and every rendered frame prove which committed state, camera and projection it consumed.

- [ ] Finish Continue candidate resolution and pass one typed startup mode into the campaign.
- [ ] Finish shared CRT display/input projection before pointer commands are admitted.
- [ ] Normalize browser and `GameHost` actions into typed command envelopes.
- [ ] Add canonical campaign phase and mutation admission.
- [ ] Queue admitted commands by sequence and target tick.
- [ ] Advance one monotonic simulation tick ID for every `1/60` update.
- [ ] Make stall, visibility and catch-up behavior explicit instead of silently discarding time.
- [ ] Publish state fingerprints and immutable committed-tick receipts.
- [ ] Correlate world, HUD, minimap, overlay and CRT output with one render-frame receipt.
- [ ] Add cadence, stall, replay and frame-correlation fixtures.
- [ ] Complete lifecycle ownership and versioned checkpoint resume after command/frame authority.

## Current implementation queue

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority
   2a. CRT Display/Input Projection Authority + CPU/GLSL Parity Fixture Gate
   2b. Campaign Phase Admission + Paused/Terminal Mutation Fixture Gate
   2c. Fixed-Step Command Scheduling, Replay and Committed Frame Authority
       + Cadence/Stall/Replay/Frame Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Campaign Checkpoint Authority + Atomic Resume/First-Frame Fixture Gate
```

## Selection result

The current Publish inventory contains ten accessible repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state. `PhantomCommand` was the oldest eligible ledger entry at the start of this run and was the only Publish repository changed.

## Product route

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html?campaign=new|continue
  -> src/campaign/campaign-scene.js
```

## Current interaction loop

```txt
browser event
  -> pointer/key handler
  -> immediate live-state or camera mutation

animation frame
  -> wall-clock delta capped at 50 ms
  -> variable-step camera pan and zoom
  -> accumulator += capped delta
  -> zero to three exact 1/60 simulation updates
  -> render live world, HUD, minimap and overlay
  -> CRT render uses independent performance.now time
  -> next RAF
```

The simulation step is fixed, but command application and camera/projection state are not tick-owned. Browser event ordering relative to RAF therefore affects which tick observes each mutation.

## Main finding

```txt
fixed simulation update: yes
fixed command application: no
simulation tick identity: no
command sequence/target tick: no
stall and dropped-time receipt: no
state fingerprint: no
committed render-frame identity: no
replay journal: no
```

`frame()` caps wall-clock delta at `.05`, so longer stalls are silently discarded. Pointer and key callbacks invoke `selectAt`, `build`, `order`, `startWave`, pause and tower changes directly. Camera pan and zoom advance with variable frame delta outside the fixed-step loop. The rendered frame then combines the latest fixed-step state, variable camera state and independent CRT time without publishing a correlation receipt.

## Domains in use

```txt
route shell, menu, settings, save presence, audio and procedural art
CRT containment, curvature, source upload and display projection
pointer, source-canvas, isometric world and drag-selection projection
campaign content, economy, health, selection, camera and terminal state
build, order, wave, spawn, AI, combat, projectile and reward simulation
wall-clock sampling, accumulator and fixed-step update
world, HUD, minimap, overlay and CRT rendering
GameHost diagnostics and direct mutation bypasses
Continue, command, phase, lifecycle and checkpoint authority candidates
command scheduling, replay, state fingerprint and committed-frame authority candidates
source checks, static build, Pages deployment and central synchronization
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

The complete current, planned and fixed-step authority service map is in `.agent/kit-registry.json`.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/trackers/2026-07-11T11-51-06-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T11-51-06-04-00.md
.agent/architecture-audit/2026-07-11T11-51-06-04-00-fixed-step-command-frame-authority-dsk-map.md
.agent/render-audit/2026-07-11T11-51-06-04-00-simulation-tick-render-frame-correlation-gap.md
.agent/gameplay-audit/2026-07-11T11-51-06-04-00-event-command-fixed-step-loop.md
.agent/interaction-audit/2026-07-11T11-51-06-04-00-event-command-target-tick-admission-map.md
.agent/simulation-clock-audit/2026-07-11T11-51-06-04-00-catchup-stall-replay-contract.md
.agent/deploy-audit/2026-07-11T11-51-06-04-00-cadence-replay-frame-fixture-gate.md
```

## Validation state

Documentation only. Runtime source, scripts, dependencies, routes, gameplay, rendering, persistence and deployment configuration did not change. No branch or pull request was created. Existing checks are source-pattern checks; cadence, stall, replay and committed-frame fixtures do not yet exist and were not run.