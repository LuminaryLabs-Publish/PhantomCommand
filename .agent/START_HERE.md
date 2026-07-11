# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-11T05-50-43-04-00`

## Summary

PhantomCommand is a static pixel-isometric RTS with a procedural graveyard menu and a fixed-step grave-ring campaign. The fourth architecture gate is now fully mapped: Continue must restore a versioned, validated checkpoint through an atomic resume transaction rather than navigate into a fresh campaign from a three-field completion summary.

## Plan ledger

**Goal:** preserve current gameplay and presentation while implementing the four authority gates required for deterministic Continue, commands, lifecycle and full-session resume.

- [ ] Implement the Continue capability resolver and save-candidate precedence fixtures.
- [ ] Implement typed campaign commands and fixed-step action-result authority.
- [ ] Implement runtime-session lifecycle ownership and ordered teardown.
- [ ] Implement versioned checkpoint capture at committed simulation ticks.
- [ ] Add schema/content identity, migration, invariant validation and canonical fingerprints.
- [ ] Stage hydration off-line and commit one new resume epoch atomically.
- [ ] Add rollback, first-frame acknowledgement and bounded persistence observation.
- [ ] Add roundtrip, corruption, migration and browser resume fixture gates.

## Current implementation queue

```txt
1. PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. PhantomCommand Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. PhantomCommand Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. PhantomCommand Versioned Campaign Checkpoint Authority + Atomic Resume/First-Frame Fixture Gate
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state. `PhantomCommand` was selected by the oldest documented-selection rule from its prior `2026-07-11T03-41-49-04-00` timestamp.

```txt
PhantomCommand       selected / 2026-07-11T03-41-49-04-00
ZombieOrchard        tracked  / 2026-07-11T03-48-31-04-00
TheUnmappedHouse     tracked  / 2026-07-11T04-00-07-04-00
AetherVale           tracked  / 2026-07-11T04-28-33-04-00
IntoTheMeadow        tracked  / 2026-07-11T04-49-30-04-00
MyCozyIsland         tracked  / 2026-07-11T05-10-36-04-00
TheOpenAbove         tracked  / 2026-07-11T05-25-29-04-00
HorrorCorridor       tracked  / 2026-07-11T05-28-29-04-00
PrehistoricRush      tracked  / 2026-07-11T05-39-11-04-00
TheCavalryOfRome     excluded
```

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
menu module import
  -> allocate art, source canvas, CRT, mutable state and listeners
  -> read settings
  -> scan three keys across local/session storage
  -> collapse save evidence to Boolean presence
  -> Begin or Continue starts a timed fade
  -> navigate to game.html?campaign=new|continue

campaign module import
  -> ignore campaign mode and candidate identity
  -> allocate fresh pads, units, counters, camera, input and state
  -> browser/GameHost actions mutate live state
  -> apply exact 1/60 simulation steps
  -> render world, HUD, minimap, overlay and CRT
  -> victory writes { scene, souls, wave }
```

## Persistence finding

The existing save is a completion summary, not resumable campaign state. It cannot restore:

```txt
units, towers or pad ownership
spawn queue or projectiles
selection or camera continuity
uid/pid/tid counters
fixed-step tick or command sequence
terminal and pause state
schema/content identity or fingerprint
```

The campaign has no load/hydration path, does not read `campaign=continue`, and publishes no resume epoch or first-frame acknowledgement.

## Required resume chain

```txt
resolved candidate
  -> schema/content admission
  -> migration when supported
  -> canonical fingerprint validation
  -> staged state graph and rebuilt references
  -> invariant validation
  -> atomic resume commit
  -> new resume epoch
  -> first world/HUD/minimap/CRT frame acknowledgement
```

## Domains in use

```txt
route shell and menu presentation
settings persistence and procedural audio
save presence, candidate provenance and Continue capability
menu transition timing and navigation
campaign content, mutable state and fixed-step simulation
selection, building, orders, wave start, pause and camera input
spawning, AI, combat, economy and terminal progression
world, HUD, minimap, overlay and CRT rendering
victory-summary persistence
PhantomMenu and GameHost diagnostics
runtime allocation, RAF, listeners, globals, audio, WebGL and navigation lifecycle
checkpoint schema, content identity, capture, migration, validation, hydration,
atomic resume, rollback, epoch, journal and first-frame proof
source checks, static build, Pages deployment and central audit sync
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

The exact current and planned service map is in `.agent/kit-registry.json`.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/trackers/2026-07-11T05-50-43-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T05-50-43-04-00.md
.agent/architecture-audit/2026-07-11T05-50-43-04-00-versioned-checkpoint-resume-dsk-map.md
.agent/render-audit/2026-07-11T05-50-43-04-00-resume-first-frame-consumption-gap.md
.agent/gameplay-audit/2026-07-11T05-50-43-04-00-checkpoint-hydration-campaign-loop.md
.agent/interaction-audit/2026-07-11T05-50-43-04-00-continue-resume-command-result-map.md
.agent/persistence-audit/2026-07-11T05-50-43-04-00-checkpoint-envelope-atomic-resume-contract.md
.agent/deploy-audit/2026-07-11T05-50-43-04-00-roundtrip-corruption-first-frame-fixture-gate.md
```

## Validation state

Documentation only. Runtime source, scripts, dependencies, routes, gameplay, rendering, persistence and deployment configuration did not change. No branch or pull request was created. Checkpoint/resume fixtures and browser first-frame smoke do not yet exist and were not run.
