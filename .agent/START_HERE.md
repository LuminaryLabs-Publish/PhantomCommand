# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-11T07-38-25-04-00`

## Summary

PhantomCommand is a static pixel-isometric RTS with a procedural graveyard menu and a fixed-step grave-ring campaign. The current audit refines the second implementation gate: pause, win and loss stop fixed-step updates but do not stop direct pointer, keyboard or `GameHost` mutation, so campaign phase must become part of typed command admission.

## Plan ledger

**Goal:** preserve current gameplay and presentation while implementing deterministic Continue, command admission, lifecycle ownership and full-session resume.

- [ ] Implement the Continue capability resolver and save-candidate precedence fixtures.
- [ ] Implement typed campaign commands and fixed-step action-result authority.
- [ ] Add canonical campaign phase and a complete command-to-phase admission matrix inside action authority.
- [ ] Reject gameplay mutation while paused, terminal, transitioning or disposed.
- [ ] Correlate world, HUD, minimap, overlay and CRT consumption to one committed phase/frame.
- [ ] Implement runtime-session lifecycle ownership and ordered teardown.
- [ ] Implement versioned checkpoint capture, validation, atomic resume and first-frame proof.
- [ ] Add executable candidate, action, phase, lifecycle and checkpoint fixture gates.

## Current implementation queue

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority
   2a. Campaign Phase Admission + Paused/Terminal Mutation Fixture Gate
   2b. Fixed-Step Replay + Committed Frame Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Campaign Checkpoint Authority + Atomic Resume/First-Frame Fixture Gate
```

## Selection result

The current Publish inventory contains ten accessible repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state. `HorrorCorridor` was skipped because a same-window documentation sequence was actively writing there; `PhantomCommand` was selected as the oldest stable eligible fallback.

## Product route

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html?campaign=new|continue
  -> src/campaign/campaign-scene.js
```

The campaign uses a `640 x 360` source canvas, seven rings, four lanes, generated build pads, six starter allies, three tower types, seven unit archetypes, six waves, exact `1/60` simulation steps, HUD, minimap, terminal overlay, CRT presentation, victory-summary persistence and `window.GameHost`.

## Current interaction loop

```txt
menu boot
  -> settings and raw save-presence scan
  -> Begin or Continue navigation

campaign boot
  -> allocate descriptors, counters, camera, input and mutable state
  -> attach browser callbacks
  -> callbacks mutate live state directly
  -> RAF updates camera
  -> fixed accumulator calls update(1/60)
  -> update returns early for paused/won/lost
  -> render world, HUD, minimap and overlay
  -> CRT upload/draw
  -> repeat
```

## Main finding

```txt
state.paused/won/lost
  -> stop update()
  -> do not stop selectAt(), build(), order() or all startWave paths
  -> do not stop camera mutation
  -> do not prevent GameHost bypass
  -> do not carry phase sequence or typed result
```

The overlay can therefore display `PAUSED`, `GRAVE RING SECURED` or `SANCTUM LOST` while authoritative state changes underneath it.

## Required phase chain

```txt
source intent
  -> typed CampaignCommand
  -> session/run/observed-phase preflight
  -> campaign phase admission matrix
  -> gameplay preflight
  -> fixed-step application when applicable
  -> typed result and phase event
  -> committed state/frame fingerprint
  -> world/HUD/minimap/overlay/CRT acknowledgement
```

## Domains in use

```txt
route shell and menu presentation
settings persistence and procedural audio
save presence, candidate provenance and Continue capability
campaign content, mutable state and fixed-step simulation
selection, building, orders, wave, phase and camera interaction
spawning, AI, combat, economy and terminal progression
world, HUD, minimap, modal overlay and CRT rendering
victory-summary persistence
GameHost diagnostics
runtime allocation, lifecycle and deployment proof
checkpoint capture, migration, hydration, atomic resume and first-frame proof
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

The exact current, planned and phase-authority service map is in `.agent/kit-registry.json`.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/trackers/2026-07-11T07-38-25-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T07-38-25-04-00.md
.agent/architecture-audit/2026-07-11T07-38-25-04-00-campaign-phase-admission-dsk-map.md
.agent/render-audit/2026-07-11T07-38-25-04-00-paused-terminal-overlay-state-correlation-gap.md
.agent/gameplay-audit/2026-07-11T07-38-25-04-00-paused-terminal-mutation-loop.md
.agent/interaction-audit/2026-07-11T07-38-25-04-00-phase-command-admission-map.md
.agent/phase-authority-audit/2026-07-11T07-38-25-04-00-campaign-phase-mutation-barrier-contract.md
.agent/deploy-audit/2026-07-11T07-38-25-04-00-phase-admission-fixture-gate.md
```

## Validation state

Documentation only. Runtime source, scripts, dependencies, routes, gameplay, rendering, persistence and deployment configuration did not change. No branch or pull request was created. Phase-admission fixtures and browser phase smoke do not yet exist and were not run.