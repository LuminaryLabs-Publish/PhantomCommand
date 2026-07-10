# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-10T17-08-36-04-00`

## Plan ledger

**Goal:** identify the next source-backed architecture boundary for the live campaign without changing runtime behavior.

```txt
[x] enumerate the full Publish organization inventory
[x] compare eligible repositories with central ledger and root .agent state
[x] exclude TheCavalryOfRome
[x] select one repository only
[x] inspect menu, campaign, persistence, rendering, diagnostics, tests, and deployment
[x] identify the interaction loop
[x] identify all domains in use
[x] identify current and next kits
[x] identify services offered by the kits
[x] refresh required root .agent docs
[x] add timestamped architecture and system audits
[x] keep runtime source unchanged
[x] push only to main
[x] synchronize central repo ledger and internal change log
```

## Selection

`PhantomCommand` was the oldest eligible documented fallback after accounting for a newer repo-local `HorrorCorridor` audit. All nine eligible repositories were already tracked and had root `.agent` state.

## Interaction loop

```txt
menu boot
  -> settings read
  -> raw save-candidate presence scan
  -> Begin or Continue route intent
  -> campaign ignores session intent and candidates
  -> fresh campaign bootstrap
  -> selection, build, order, and wave input
  -> fixed-step combat/economy/core simulation
  -> world, HUD, minimap, modal, and CRT render
  -> victory-only completion-summary write
  -> aggregate GameHost readback
```

## Domain groups

```txt
route and menu
session intent and persistence
campaign descriptors and state
selection and commands
combat and economy simulation
camera and input
world/HUD/minimap/CRT rendering
GameHost diagnostics
source checks, static build, Pages deployment
central ledger synchronization
```

## Current kits

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
campaign-static-check-kit
static-build-copy-kit
construct-spiral-intro-kit family
```

## Main finding

Continue is admitted by any raw value under three candidate keys across two storage layers. No candidate is parsed, classified, or validated. The campaign reads no candidate and writes only a victory summary containing `scene`, `souls`, and `wave`.

That payload cannot restore the live campaign because it omits the simulation baseline, entity and tower state, queues, counters, camera, selection, health, and source identity required for deterministic continuation.

## Next safe ledge

```txt
PhantomCommand Save Admission Authority + Resume Fidelity Fixture Gate
```

## Validation

Documentation only. Runtime source, dependencies, package scripts, routes, controls, visuals, deployment configuration, branches, and pull requests were unchanged. Existing checks were not run. Repo-local and central documentation were pushed directly to `main`.
