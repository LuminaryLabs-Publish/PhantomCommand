# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-11T16-49-51-04-00`

## Summary

PhantomCommand is a static pixel-isometric RTS with a procedural graveyard menu and a `640 x 360` campaign. The newest audit documents an order-dependent combat defect: the fixed step captures the unit array, lethal damage deletes units from live state, and a deleted unit can still execute later from the captured array. Continue capability remains the first implementation prerequisite; deterministic combat resolution is now an explicit gate before terminal arbitration and checkpoint fidelity.

## Plan ledger

**Goal:** preserve the full architecture map while routing implementation toward admitted startup, deterministic commands, alive-only combat resolution, exclusive terminal results and replayable checkpoints.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Trace the menu, campaign, combat, render, GameHost, validation and deployment loops.
- [x] Catalogue all domains, implemented kits and offered services.
- [x] Add the combat-resolution and entity-liveness audit set.
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
       + Win/Loss Arbitration Fixture Gate

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
  -> run zero or more exact 1/60 combat updates
  -> draw world, HUD, minimap and overlay
  -> upload through CRT
```

## New combat finding

```txt
Object.values(state.units) is captured
  -> earlier actor kills later actor
  -> damage() deletes later actor from state.units
  -> captured array still contains later actor object
  -> updateUnit(laterActor) still runs
  -> retired actor may move, attack, create a projectile or damage the core
  -> renderer omits the retired actor from state.units
```

The simulation lacks a versioned entity-order policy, liveness index, staged intent/damage phases, exactly-once retirement, eager reference cleanup, combat result identity and committed-frame provenance.

## Domains in use

```txt
static route and page shell
menu selection, panels, settings, save presence, audio and transition
procedural graveyard art and source-canvas presentation
CRT containment, curvature, upload, draw and pointer projection
save candidate, Continue capability and startup admission planning
campaign map, rings, lanes, pads, archetypes and waves
souls economy, sanctum health, selection, messages and camera
browser input, GameHost and command admission planning
spawn queue and first-action policy
entity identity, liveness, stable order and reference graph
target selection, movement and attack intent
melee, tower and projectile damage resolution
retirement, rewards, core breach and wave-clear evidence
fixed-step clock, replay, state fingerprint and frame proof
terminal outcome, lifecycle and checkpoint planning
world, HUD, minimap, overlay and CRT consumers
validation, build, Pages deployment and central tracking
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
phantom-command-combat-resolution-authority-domain
  -> combat-frame input
  -> liveness index
  -> deterministic entity order
  -> spawn admission
  -> unit/target/attack intents
  -> damage resolution policy
  -> exactly-once retirement
  -> reference cleanup
  -> reward and core-breach settlement
  -> wave-clear evidence
  -> CombatResolutionResult
  -> journal, fingerprints and fixtures
```

## Required invariant

```txt
only alive entities may produce intent
retired entities cannot act later in the tick
entity container insertion order cannot change the result
rewards settle once
all references are valid before commit
terminal arbitration consumes one complete combat result
rendering consumes only committed post-cleanup state
```

## Read first

```txt
.agent/trackers/2026-07-11T16-49-51-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/turn-ledger/2026-07-11T16-49-51-04-00.md
.agent/architecture-audit/2026-07-11T16-49-51-04-00-combat-resolution-liveness-authority-dsk-map.md
.agent/render-audit/2026-07-11T16-49-51-04-00-ghost-action-visible-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-11T16-49-51-04-00-spawn-intent-damage-cleanup-loop.md
.agent/interaction-audit/2026-07-11T16-49-51-04-00-command-to-combat-resolution-map.md
.agent/combat-resolution-audit/2026-07-11T16-49-51-04-00-entity-liveness-order-contract.md
.agent/deploy-audit/2026-07-11T16-49-51-04-00-combat-order-liveness-fixture-gate.md
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Do not equate fixed timestep with deterministic combat.
Do not let a retired entity create later same-tick effects.
Do not derive combat order from incidental object insertion order.
Do not claim combat determinism until order, liveness and frame fixtures pass.
```
