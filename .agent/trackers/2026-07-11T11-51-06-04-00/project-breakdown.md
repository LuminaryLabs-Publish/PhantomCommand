# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-11T11-51-06-04-00`

## Summary

This pass selects PhantomCommand as the oldest eligible Publish repository and audits the missing fixed-step command, replay and committed-frame boundary. The game owns a fixed `1/60` combat update, but command application, camera movement and frame publication remain browser-frame dependent.

## Plan ledger

**Goal:** identify the full interaction loop, all domains, all kits and services, then define the exact authority required for deterministic command scheduling and render proof.

- [x] Compare the ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible central-ledger entries and nine root `.agent` states.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand`.
- [x] Read campaign source, CRT source, package scripts and prior audits.
- [x] Identify interaction loops, domains, services and implemented kits.
- [x] Trace event callbacks, accumulator updates, camera updates, rendering and `GameHost` bypasses.
- [x] Define fixed-step command, replay, overrun and committed-frame DSKs.
- [x] Add timestamped architecture, render, gameplay, interaction, simulation-clock and deploy audits.
- [ ] Runtime implementation and executable fixtures remain future work.

## Repository comparison

```txt
PhantomCommand     2026-07-11T09-40-19-04-00 selected
ZombieOrchard      2026-07-11T10-00-12-04-00
TheUnmappedHouse   2026-07-11T10-18-05-04-00
AetherVale         2026-07-11T10-38-55-04-00
IntoTheMeadow      2026-07-11T10-50-14-04-00
PrehistoricRush    2026-07-11T10-58-10-04-00
MyCozyIsland       2026-07-11T11-19-10-04-00
TheOpenAbove       2026-07-11T11-31-06-04-00
HorrorCorridor     2026-07-11T11-39-11-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
menu
  -> source canvas, procedural art, CRT, settings, audio and save presence
  -> Begin or Continue navigation

campaign browser event
  -> pointer/key callback
  -> direct state/camera mutation

campaign RAF
  -> cap dt at 50 ms
  -> variable-step camera update
  -> accumulator-driven 1/60 combat updates
  -> live-state world/HUD/minimap/overlay render
  -> CRT upload/draw with independent wall-clock time
  -> next RAF
```

## Domains in use

```txt
route and static page shell
menu selection, panels, transition, settings, save presence and audio
procedural graveyard art and source canvas
CRT contain, curve, upload, draw and partial pointer projection
source/world projection, wheel anchoring and drag selection
campaign descriptors, map, lanes, pads, units, towers and waves
economy, core health, selection, messages, camera and identity counters
build, order, wave, pause, spawn, AI, pathing, targeting and combat
projectiles, effects, rewards, terminal progression and victory summary
wall-clock frame sampling, accumulator and fixed-step simulation
world, HUD, minimap, modal overlay and CRT presentation
GameHost diagnostics and direct mutation bypass
Continue, command, phase, lifecycle and checkpoint authority candidates
fixed-step command scheduling, replay, state fingerprint and frame authority candidates
source checks, build, Pages deployment and central ledger synchronization
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `crt-renderer-kit` | WebGL setup, source upload, contain framing, CRT curvature, scanlines, grain, resize, draw and contain-only pointer mapping |
| `graveyard-art-kit` | Procedural menu world and animated source-canvas drawing |
| `menu-route-kit` | Menu selection, panels, Begin/Continue route and fade |
| `menu-settings-persistence-kit` | CRT, grain and ambience persistence |
| `menu-save-presence-kit` | Boolean scan of save keys across storage layers |
| `menu-audio-kit` | Lazy procedural ambience and UI tones |
| `campaign-route-shell-kit` | Campaign page bootstrap |
| `pixel-campaign-runtime-kit` | Content, state, selection, construction, orders, wave and camera input |
| `fixed-step-campaign-simulation-kit` | `1/60` spawn, AI, combat, projectiles, rewards and terminal state |
| `pixel-campaign-render-kit` | World, HUD, minimap, overlay and source-frame drawing |
| `legacy-gamehost-diagnostics-kit` | State/camera readback and direct mutation functions |
| `menu-static-check-kit` | Menu source-pattern checks |
| `campaign-static-check-kit` | Campaign source-pattern checks |
| `static-build-copy-kit` | Static artifact assembly |
| `pages-deploy-kit` | GitHub Pages deployment |
| retained construct kits | Intro, schedule, IDs, piece state and sequence updates |

## Main finding

```txt
fixed combat timestep: present
fixed command scheduling: absent
explicit stall policy: absent
command replay journal: absent
state fingerprint: absent
committed tick/frame receipts: absent
```

Browser callbacks can mutate state immediately before or after any accumulator tick. The 50 ms frame clamp silently drops longer elapsed duration. Camera motion and CRT time are variable-frame. A rendered frame cannot prove which command cursor, tick, state fingerprint, camera revision or projection revision it consumed.

## New DSK boundary

```txt
phantom-command-fixed-step-command-frame-authority-domain
```

Child responsibilities:

```txt
monotonic frame sampling
visibility and stall policy
bounded catch-up
simulation tick identity
command identity, sequence and target tick
deterministic queue and exactly-once application
ordered event and replay journal
canonical state fingerprint
committed tick receipt
immutable render snapshot
committed frame receipt
consumer acknowledgements
cadence, stall, replay and frame fixtures
```

## Validation

Documentation only. Runtime source, scripts, dependencies, routes, gameplay, rendering, persistence and deployment configuration were unchanged. Existing checks are source-pattern checks and do not execute cadence, stall, replay or frame-correlation behavior.