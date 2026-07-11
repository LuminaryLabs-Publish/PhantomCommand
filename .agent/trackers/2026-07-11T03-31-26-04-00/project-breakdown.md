# PhantomCommand Project Breakdown Tracker

**Timestamp:** `2026-07-11T03-31-26-04-00`

## Plan ledger

**Goal:** make every campaign interaction resolve through one deterministic command transaction so browser input, GameHost, replay, simulation, rendering, and diagnostics agree on what was requested, accepted, applied, and presented.

- [x] Enumerate the ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Confirm all eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` as the oldest eligible documented fallback.
- [x] Read the current root audit state and active campaign source.
- [x] Trace pointer, keyboard, GameHost, fixed-step, render, persistence, and deployment paths.
- [x] Identify the interaction loop, domains, kits, and kit services.
- [x] Map command admission, target-tick, application, result, event, fingerprint, and frame-consumption gaps.
- [x] Add timestamped architecture, render, gameplay, interaction, action-authority, deploy, and turn-ledger records.
- [x] Refresh the required root `.agent` documents and kit registry.
- [x] Update the central repo ledger and add an internal change-log entry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.

## Selected repository

`LuminaryLabs-Publish/PhantomCommand`

All nine eligible non-Cavalry repositories were already tracked and documented. The central timestamps at selection were:

```txt
PhantomCommand       2026-07-11T01-20-51-04-00  selected
ZombieOrchard        2026-07-11T01-31-15-04-00
TheUnmappedHouse     2026-07-11T01-38-28-04-00
MyCozyIsland         2026-07-11T02-02-59-04-00
AetherVale           2026-07-11T02-10-13-04-00
IntoTheMeadow        2026-07-11T02-28-12-04-00
PrehistoricRush      2026-07-11T02-48-17-04-00
TheOpenAbove         2026-07-11T03-01-38-04-00
HorrorCorridor       2026-07-11T03-18-44-04-00
TheCavalryOfRome     excluded by rule
```

## Current interaction loop

```txt
menu evaluates
  -> reads settings and raw save presence
  -> Begin or Continue emits a route query
  -> campaign ignores the route mode and creates fresh mutable state
  -> pointer, keyboard, and GameHost invoke direct mutation functions
  -> direct requests can apply between simulation ticks
  -> frame callback advances camera with variable dt
  -> accumulator applies zero or more exact 1/60 simulation steps
  -> world, HUD, minimap, modal, and CRT read the live mutable state
  -> GameHost exposes mutable state plus an aggregate clone
  -> victory writes a three-field completion summary
```

## Domains in use

```txt
route and menu
  static shell, menu selection, settings, credits, raw Continue capability,
  fade transition, procedural audio, graveyard art, source canvas, CRT display

campaign content and state
  seven rings, four lanes, generated pads, unit and tower archetypes,
  six waves, souls economy, sanctum health, selection, messages, terminal state

interaction and commands
  pointer conversion, ally and pad selection, rectangle selection,
  tower-type choice, build, unit order, wave start, pause, restart, focus

simulation
  variable frame clock, fixed-step accumulator, spawn queue, unit AI,
  movement, targeting, projectiles, damage, rewards, effects, win and loss

presentation and proof
  world, entity, HUD, minimap, selection, modal, CRT, GameHost,
  victory summary, source checks, build, Pages deployment, central audit sync
```

## Implemented kits and services

```txt
crt-renderer-kit
  WebGL program, source upload, nearest filtering, containment mapping,
  CRT curve, grain, aberration, fade, resize, pointer conversion

graveyard-art-kit
  procedural menu composition and animation

menu-route-kit
  selection, settings and credits panels, activation, fade, route emission

menu-settings-persistence-kit
  CRT, grain, and ambience preference reads and writes

menu-save-presence-kit
  raw three-key by two-storage-layer presence scan

menu-audio-kit
  lazy AudioContext, drone, wind, and UI tones

campaign-route-shell-kit
  campaign canvas entry point and module bootstrap

pixel-campaign-runtime-kit
  descriptors, mutable state, input, simulation, persistence, render, diagnostics

fixed-step-campaign-simulation-kit
  frame-dt clamp, accumulator, and exact 1/60 update steps

pixel-campaign-render-kit
  world, entities, selection, HUD, minimap, terminal modal, CRT projection

legacy-gamehost-diagnostics-kit
  mutable state and camera references, direct startWave/build calls,
  aggregate state clone, zoom control

menu-static-check-kit / campaign-static-check-kit
  source-pattern assertions

static-build-copy-kit
  static artifact creation

pages-deploy-kit
  syntax checks, source checks, artifact validation, Pages upload and deploy

retained construct kits
  historical construct-intro proof, inactive in the live pixel campaign
```

## Principal result

The campaign has no command-result authority. `selectAt()`, `build()`, `order()`, and `startWave()` mutate live state and return `undefined` for success, rejection, and no-op. `selectAt()` additionally combines selection, deselection, pad targeting, and second-click building in one callback.

Commands do not enter the fixed-step accumulator. Browser callbacks and GameHost calls can mutate state between simulation steps, have no session-scoped command ID, no monotonic sequence, no deterministic target tick, no pure preflight, no terminal result, no event journal, and no canonical state fingerprint.

The frame callback separately applies variable-dt camera motion, zero or more fixed simulation steps, and rendering. It publishes no frame ID, step range, applied-command list, state fingerprint, render-consumption row, or CRT upload acknowledgement. Therefore the current runtime cannot replay a request sequence or prove that the world, HUD, minimap, modal, CRT, and GameHost observed the same committed state.

## Required composed domain

```txt
phantom-command-action-authority-domain
  -> action-source-adapter-kit
  -> action-command-envelope-kit
  -> action-sequence-kit
  -> target-tick-policy-kit
  -> action-preflight-kit
  -> action-result-kit
  -> fixed-step-command-queue-kit
  -> command-application-kit
  -> domain-event-journal-kit
  -> state-fingerprint-kit
  -> committed-frame-kit
  -> render-consumption-kit
  -> gamehost-command-observation-kit
  -> action-result-fixture-kit
  -> fixed-step-replay-fixture-kit
  -> frame-consumption-fixture-kit
```

## Ordered implementation queue

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Save Envelope + Atomic Resume Fidelity Gate
```

The Continue resolver remains first because command IDs, target ticks, journals, fingerprints, and frames must belong to one admitted campaign session. This pass makes the second gate source-complete and implementation-ready without changing runtime behavior.