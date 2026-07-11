# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-10T20-19-35-04-00`

## Goal

Audit the complete menu-to-campaign interaction, domain, service, and kit graph, then make the next campaign-internal proof boundary implementation-ready without changing runtime behavior. Preserve the existing Continue-resolver queue head while documenting how input must become a typed action result, deterministic fixed-step admission, committed frame, render-consumption row, and bounded GameHost observation.

## Plan ledger

- [x] Enumerate the complete accessible `LuminaryLabs-Publish` repository inventory.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select exactly one repository through the oldest documented-selection rule.
- [x] Read the current root `.agent` state and prior PhantomCommand tracker.
- [x] Read the live menu, campaign, CRT renderer, package scripts, checks, and Pages workflow.
- [x] Identify the complete interaction loop.
- [x] Identify active, planned, and follow-on domains.
- [x] Identify all source-backed kits and retained legacy kits.
- [x] Identify every service currently offered by those kits.
- [x] Trace every player-facing campaign action and its preconditions.
- [x] Trace action mutation into the fixed-step simulation, render pass, and GameHost readback.
- [x] Add architecture, render, gameplay, interaction, command-authority, and deploy audits.
- [x] Refresh all required root `.agent` documents and the kit registry.
- [x] Update the central repository ledger.
- [x] Add a central internal change-log entry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.

## Repository inventory comparison

```txt
PhantomCommand       selected / prior 2026-07-10T18-40-13-04-00
ZombieOrchard        tracked  / 2026-07-10T18-49-54-04-00
TheUnmappedHouse     tracked  / 2026-07-10T19-00-19-04-00
MyCozyIsland         tracked  / 2026-07-10T19-11-19-04-00
PrehistoricRush      tracked  / 2026-07-10T19-30-36-04-00
AetherVale           tracked  / 2026-07-10T19-38-41-04-00
IntoTheMeadow        tracked  / 2026-07-10T19-48-39-04-00
TheOpenAbove         tracked  / 2026-07-10T19-58-34-04-00
HorrorCorridor       tracked  / 2026-07-10T20-08-46-04-00
TheCavalryOfRome     excluded by rule
```

No eligible repository was new, absent from the ledger, missing root `.agent` state, or otherwise undocumented. `PhantomCommand` was therefore the oldest eligible fallback.

## Product and route read

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html?campaign=new|continue
  -> src/campaign/campaign-scene.js
```

The live campaign is a static Vite browser game with a `640 x 360` source canvas, seven rings, four lanes, 58 generated pads, six starter allies, three tower types, seven unit archetypes, six waves, fixed `1/60` simulation, world/HUD/minimap/modal rendering, CRT post-processing, victory-only persistence, and `window.GameHost` diagnostics.

## Current interaction loop

```txt
menu page load
  -> read CRT, grain, and ambience settings
  -> scan three save keys across localStorage and sessionStorage twice
  -> collapse all candidate evidence into one Boolean
  -> choose Begin or Continue
  -> animate a route transition
  -> campaign ignores campaign=new|continue and initializes fresh
  -> pointer and keyboard events mutate campaign state directly
  -> click ally or pad to change selection
  -> click an already-selected empty pad to attempt build
  -> right-click to attempt move or attack order
  -> press Space to attempt wave start
  -> fixed-step update advances spawning, AI, towers, projectiles, damage, rewards, waves, and core state
  -> render reads live mutable state and camera
  -> CRT uploads the source canvas and presents the frame
  -> GameHost exposes mutable state/camera plus aggregate counters
```

## Campaign action matrix

| Action | Current admission | Current result |
|---|---|---|
| Select ally | nearest ally within radius | implicit mutation / `undefined` |
| Select pad | nearest unoccupied pad within radius | implicit mutation / `undefined` |
| Build tower | selected pad, empty pad, enough souls | silent return or mutation / `undefined` |
| Order allies | at least one selected ally | silent return or mutation / `undefined` |
| Start wave | not active, not won/lost, wave remains | silent return or mutation / `undefined` |
| Choose tower type | number key | direct mutation / no result |
| Pause | `P` key | direct mutation / no result |
| Restart | `R` key | full page reload |
| Focus camera | `F` key | direct presentation mutation |

## Domains in use

```txt
route and menu:
  static-route-shell, menu-route, campaign-route
  menu selection, panels, settings persistence, save presence, Continue capability
  transition, synthesized audio, graveyard art, source canvas, CRT display

session and persistence:
  campaign session intent and save-key ownership
  candidate enumeration, parse, classification, precedence, capability, and provenance next
  versioned save envelope and hydration follow-on

campaign content and simulation:
  ring map, lanes, build pads, unit/tower archetypes, wave script
  souls economy, sanctum health, selection, build, order, wave start
  AI, pathing, targeting, projectiles, damage, rewards, effects, win/loss, save-on-win
  fixed-step accumulator

input, presentation, proof, and deploy:
  keyboard and pointer input, camera pan/zoom
  world render, HUD, minimap, modal, CRT
  GameHost diagnostics, source-pattern checks, static build, Pages deployment

newly mapped campaign-proof boundaries:
  action command, preflight, result, sequence, fixed-step queue
  action journal, event journal, state fingerprint, committed frame
  render consumption, bounded GameHost observation, DOM-free fixtures
```

## Kits and services

### Source-backed kits

- `crt-renderer-kit`: nearest-neighbor source upload, contain mapping, CRT curve, scanlines, grain, aberration, fade, resize, and pointer conversion.
- `graveyard-art-kit`: procedural menu scene composition.
- `menu-route-kit`: menu selection, panels, Begin/Continue navigation, and credits.
- `menu-settings-persistence-kit`: CRT, grain, and ambience preference persistence.
- `menu-save-presence-kit`: raw presence scans across six storage slots.
- `menu-audio-kit`: synthesized ambience and UI tones.
- `campaign-route-shell-kit`: campaign page and accessible canvas host.
- `pixel-campaign-runtime-kit`: descriptors, mutable state, input, actions, simulation, persistence, rendering, and diagnostics.
- `fixed-step-campaign-simulation-kit`: accumulator-driven `1/60` simulation updates.
- `pixel-campaign-render-kit`: world, entities, HUD, minimap, modal, selection rectangle, and CRT projection.
- `legacy-gamehost-diagnostics-kit`: mutable state/camera access, `startWave`, `build`, aggregate `getState`, and `setZoom`.
- `campaign-static-check-kit`: source-pattern assertions.
- `static-build-copy-kit`: deployable static artifact construction.
- `construct-spiral-intro-kit`, `construct-spiral-schedule-kit`, `construct-piece-id-kit`, `construct-piece-state-kit`, and `construct-sequence-update-kit`: retained legacy construct proof, not live campaign authority.

### Queue-head kits retained

```txt
phantom-command-candidate-slot-registry-kit
phantom-command-save-classifier-kit
phantom-command-candidate-precedence-kit
phantom-command-save-candidate-resolver-kit
phantom-command-continue-capability-kit
phantom-command-candidate-provenance-kit
phantom-command-campaign-session-mode-kit
phantom-command-candidate-resolver-fixture-kit
```

### Next campaign-proof kits

```txt
phantom-command-action-command-kit
phantom-command-action-preflight-kit
phantom-command-action-result-kit
phantom-command-action-sequence-kit
phantom-command-fixed-step-command-queue-kit
phantom-command-action-journal-kit
phantom-command-event-journal-kit
phantom-command-state-fingerprint-kit
phantom-command-committed-frame-kit
phantom-command-render-consumption-kit
phantom-command-gamehost-observation-kit
phantom-command-action-fixture-kit
phantom-command-build-fixture-gate-kit
```

## Main finding

The queue head remains the shared Continue-capability resolver. The next campaign-internal blocker is that every meaningful interaction mutates live state directly and returns no typed outcome. Invalid build, order, and wave-start requests silently return. `selectAt()` also conflates target selection with a build attempt on a repeated pad click.

Because browser events mutate state outside the fixed-step queue, no stable sequence identifies which simulation tick admitted an action. The renderer then consumes live state with no committed frame ID or fingerprint, and `GameHost.getState()` exposes aggregate counters with no command/result/render correlation. The current regex checks cannot prove acceptance, rejection reasons, deterministic tick admission, or rendered consumption.

## Implementation order

```txt
1. Continue capability resolver and session-mode authority
2. Typed campaign commands and preflight
3. Accepted/rejected/no-op action results
4. Stable action sequence and fixed-step queue
5. Bounded command/result/event journals
6. State fingerprint and committed-frame snapshot
7. Render-consumption and GameHost observation rows
8. DOM-free action and fixed-step fixtures
9. Versioned save envelope and resume fidelity
```

## Validation state

Documentation only. Runtime source, package scripts, dependencies, routes, gameplay, rendering, persistence, and deployment configuration were not changed. No branch or pull request was created.