# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-11T18-21-09-04-00`

## Summary

PhantomCommand is a static pixel-isometric RTS with a procedural graveyard menu and a `640 x 360` campaign. The newest audit isolates a terminal-state race: a final enemy can breach the sanctum and set `lost`, then the same fixed update can observe no remaining enemies, set `won`, overwrite the defeat message, grant the wave-clear reward and write a victory save. The runtime therefore needs one exclusive, latched terminal-outcome transaction fed by committed combat evidence.

## Plan ledger

**Goal:** preserve the complete architecture map while routing implementation toward admitted startup, deterministic commands, liveness-safe combat, one terminal result and a correlated terminal frame.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Trace menu, campaign, combat, terminal mutation, persistence, rendering, GameHost, validation and deployment.
- [x] Catalogue all domains, implemented kits and offered services.
- [x] Add the exclusive terminal-outcome audit set.
- [x] Push documentation directly to `main` without a branch or pull request.
- [ ] Implement and fixture-gate the documented authority boundaries.

## Current implementation queue

```txt
1. Continue Capability Resolver
   + Save Candidate Precedence Fixture Gate

2. Campaign Action Result Authority
   2a. CRT Display/Input Projection Authority
       + CPU/GLSL Parity Fixture Gate

   2b. Campaign Phase Admission Authority
       + Paused/Terminal Mutation Fixture Gate

   2c. Fixed-Step Command Scheduling, Replay and Committed Frame Authority
       + Cadence/Stall/Replay/Frame Fixture Gate

   2d. Combat Resolution and Entity Liveness Authority
       + Dead-Entity/Order/Checkpoint Parity Fixture Gate

   2e. Exclusive Terminal Outcome Transaction
       + Simultaneous Win/Loss, Persistence and Terminal-Frame Fixture Gate

3. Runtime Session Lifecycle Authority
   + Menu/Campaign Teardown Fixture Gate

4. Versioned Campaign Checkpoint Authority
   + Atomic Resume/First-Frame Fixture Gate
```

## Product route

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html?campaign=new|continue
  -> src/campaign/campaign-scene.js
  -> src/menu/crt-renderer.js
```

## Current interaction loop

```txt
menu boot
  -> build graveyard source canvas, CRT, settings and audio
  -> scan raw save presence
  -> route Begin or Continue

campaign boot
  -> construct map, content, camera and mutable state
  -> install pointer, keyboard, wheel and blur listeners
  -> expose mutable GameHost

browser input
  -> mutate selection, orders, construction, wave, pause or camera immediately

RAF
  -> sample and clamp wall-clock delta
  -> update camera
  -> run zero or more exact 1/60 updates
  -> draw world, HUD, minimap and overlay
  -> upload through CRT
```

## New terminal finding

```txt
final enemy reaches sanctum
  -> state.core becomes 0
  -> state.lost = true
  -> enemy deletes itself
  -> update continues
  -> no spawn rows and no enemies remain
  -> wave-clear branch advances final wave
  -> state.won = true
  -> defeat message is overwritten
  -> victory summary is written to localStorage
```

`state.won` and `state.lost` are independent Booleans. There is no terminal candidate identity, precedence policy, arbitration result, latch, run epoch, persistence admission result or first-terminal-frame acknowledgement. The overlay prefers victory when both flags are true, while `GameHost.getState()` exposes both values.

## Domains in use

```txt
static route and page shell
menu selection, panels, settings, save presence, audio and transition
procedural graveyard art and source-canvas presentation
CRT containment, curvature, upload, draw and pointer projection
save candidate, Continue capability and startup admission planning
campaign rings, lanes, pads, archetypes and waves
souls economy, sanctum health, selection, messages and camera
browser input, GameHost and command admission planning
spawn queue, entity identity, combat order and liveness
unit, tower, projectile, damage, retirement and reward resolution
core-breach evidence, final-wave-clear evidence and terminal arbitration
terminal persistence admission, terminal projection and frame proof
fixed-step clock, replay, state fingerprint and checkpoint planning
runtime lifecycle, validation, build, Pages deployment and central tracking
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

## Latest composed domain

```txt
phantom-command-terminal-outcome-authority-domain
  -> terminal evidence input
  -> core-breach and final-wave-clear predicates
  -> exclusive arbitration policy
  -> terminal result identity and latch
  -> terminal persistence admission
  -> terminal UI and message projection
  -> terminal frame correlation
  -> restart/exit admission
  -> journal and fixtures
```

## Required invariant

```txt
exactly one of ACTIVE, VICTORY or DEFEAT is committed per run epoch
combat subsystems produce evidence, not terminal mutation
one policy resolves simultaneous victory and defeat evidence
terminal state is monotonic and idempotent
victory persistence cannot commit after defeat wins arbitration
world, HUD, overlay, CRT and GameHost consume the same TerminalOutcomeResult
restart or exit starts only after the terminal result is committed
```

## Read first

```txt
.agent/trackers/2026-07-11T18-21-09-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/turn-ledger/2026-07-11T18-21-09-04-00.md
.agent/architecture-audit/2026-07-11T18-21-09-04-00-terminal-outcome-authority-dsk-map.md
.agent/render-audit/2026-07-11T18-21-09-04-00-dual-terminal-frame-persistence-gap.md
.agent/gameplay-audit/2026-07-11T18-21-09-04-00-core-breach-final-wave-clear-race.md
.agent/interaction-audit/2026-07-11T18-21-09-04-00-terminal-result-restart-exit-admission-map.md
.agent/terminal-outcome-audit/2026-07-11T18-21-09-04-00-exclusive-outcome-arbitration-contract.md
.agent/deploy-audit/2026-07-11T18-21-09-04-00-terminal-outcome-fixture-gate.md
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Do not treat independent won/lost flags as an outcome model.
Do not persist victory before exclusive arbitration commits.
Do not claim terminal correctness until simultaneous-evidence, persistence and frame fixtures pass.
```