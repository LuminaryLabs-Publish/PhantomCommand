# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-10T21-49-26-04-00`

## Plan ledger

**Goal:** Reconfirm the current PhantomCommand product architecture and document the missing runtime-session lifecycle boundary without changing gameplay, rendering, routes, or persistence.

- [x] Enumerate the complete accessible `LuminaryLabs-Publish` repository set.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare all nine eligible repositories against `LuminaryLabs-Dev/LuminaryLabs/repo-ledger`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select `LuminaryLabs-Publish/PhantomCommand` as the oldest eligible documented fallback.
- [x] Read the menu route, campaign route, CRT renderer, package scripts, and current `.agent` state.
- [x] Identify the interaction loop.
- [x] Identify domains in use.
- [x] Identify implemented kits and their services.
- [x] Map animation-frame, listener, audio, WebGL, transition, reload, and GameHost ownership.
- [x] Add architecture, render, gameplay, interaction, lifecycle, and deploy audits.
- [x] Refresh required root `.agent` files.
- [x] Push directly to `main` with no branch or pull request.
- [x] Update the central repo ledger and internal change log.

## Selection comparison

```txt
PhantomCommand       selected / prior 2026-07-10T20-19-35-04-00
ZombieOrchard        tracked  / 2026-07-10T20-30-23-04-00
TheUnmappedHouse     tracked  / 2026-07-10T20-38-24-04-00
MyCozyIsland         tracked  / 2026-07-10T20-48-55-04-00
PrehistoricRush      tracked  / 2026-07-10T21-00-16-04-00
AetherVale           tracked  / 2026-07-10T21-08-52-04-00
IntoTheMeadow        tracked  / 2026-07-10T21-19-36-04-00
TheOpenAbove         tracked  / 2026-07-10T21-31-01-04-00
HorrorCorridor       tracked  / 2026-07-10T21-39-22-04-00
TheCavalryOfRome     excluded by rule
```

## Interaction loop

```txt
menu module evaluation
  -> create source canvas, WebGL CRT renderer, art, settings, menu state, and optional audio
  -> install canvas, document, and hidden-button listeners
  -> start recursive requestAnimationFrame loop
  -> Begin or Continue starts a timed fade
  -> browser navigation loads game.html
  -> campaign module evaluation creates descriptors, mutable campaign state, source canvas, and CRT renderer
  -> install canvas and window listeners
  -> start recursive requestAnimationFrame loop
  -> camera update
  -> fixed 1/60 simulation updates
  -> world, HUD, minimap, modal, and CRT render
  -> R reloads the page or Escape navigates to the menu
```

## Domains in use

```txt
route/menu: menu selection, panels, settings, save presence, transition, audio, art
campaign/session: route intent, fresh state construction, persistence summary, win/loss
simulation: rings, lanes, pads, units, towers, waves, economy, AI, damage, projectiles
input/camera: pointer selection, drag selection, orders, wheel zoom, keyboard pan and actions
render: source canvas, world, HUD, minimap, modal overlay, CRT WebGL presentation
proof/deploy: GameHost, source-pattern checks, static build, Pages deployment, central ledger
lifecycle gap: session state, RAF ownership, listener ledger, startup rollback, resource disposal, restart proof
```

## Implemented kits and services

- `crt-renderer-kit`: WebGL program, source texture upload, nearest sampling, containment mapping, CRT effects, resize, and pointer conversion.
- `graveyard-art-kit`: procedural menu scene composition.
- `menu-route-kit`: menu navigation, panels, route emission, and timed fade transition.
- `menu-settings-persistence-kit`: CRT, grain, and ambience preference persistence.
- `menu-save-presence-kit`: raw save presence across three keys and two storage layers.
- `menu-audio-kit`: lazy AudioContext, drone, wind, and UI tones.
- `campaign-route-shell-kit`: campaign canvas route.
- `pixel-campaign-runtime-kit`: descriptors, mutable state, input, action mutation, simulation, persistence, rendering, and diagnostics.
- `fixed-step-campaign-simulation-kit`: accumulator-driven `1/60` updates.
- `pixel-campaign-render-kit`: world, entity, HUD, minimap, modal, selection, and CRT projection.
- `legacy-gamehost-diagnostics-kit`: mutable state/camera and aggregate control/readback.
- `campaign-static-check-kit`: source-pattern assertions.
- `static-build-copy-kit`: deployable static artifact copy.
- Legacy construct kits remain retained proof and are not live campaign authority.

## Main finding

PhantomCommand has route construction authority but no explicit runtime-session lifecycle authority. Both routes start at module evaluation, install listeners, and recursively schedule animation frames without retaining frame IDs. The menu owns AudioContext resources and both routes own CRT WebGL programs, buffers, textures, and shader objects, but no route-level `stop()`, `dispose()`, rollback, restart, lifecycle state, or resource journal exists.

Navigation and reload currently rely on document destruction for cleanup. That is adequate for a single conventional page visit, but it cannot prove idempotent teardown, partial-start rollback, embedded remount safety, fixture isolation, or release of audio and GPU resources.

## Implementation order

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority + Fixed-Step Frame Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Save Envelope + Atomic Resume Fidelity Gate
```

## Validation boundary

This pass changed documentation only. No runtime source, package script, dependency, route, rendering output, persistence behavior, or deployment configuration changed.