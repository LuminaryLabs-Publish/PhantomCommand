# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-12T03-00-46-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Scope:** documentation-only campaign phase admission audit

## Summary

PhantomCommand was selected as the oldest eligible documented Publish repository after the full ten-repository inventory was compared against central tracking. The campaign currently freezes fixed-step simulation for pause and terminal flags, but input handlers and public capabilities still mutate wave, economy, selection, orders, camera and effects without phase admission.

## Plan ledger

**Goal:** document one phase authority that makes every campaign action legal, rejected, or presentation-only against a revisioned phase.

- [x] Compare the full Publish inventory with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible ledger entries and nine root `.agent` surfaces.
- [x] Select only `PhantomCommand`.
- [x] Inspect campaign state, update, actions, input, render and public host paths.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits.
- [x] Identify services offered by the kits.
- [x] Define the campaign phase admission parent domain and candidate kits.
- [x] Add render, gameplay, interaction, phase and deploy audits.
- [x] Refresh required root `.agent` files.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection

```txt
LuminaryLabs-Publish repositories: 10
eligible after Cavalry exclusion: 9
new or central-ledger-missing: 0
root-.agent-missing: 0
selected: PhantomCommand
selection basis: oldest eligible central timestamp, 2026-07-12T01-20-00-04-00
```

## Interaction loop

```txt
construct mutable campaign state
  -> attach direct browser and GameHost mutation paths
  -> fixed-step update checks paused/won/lost
  -> browser commands do not check the same phase
  -> render projects the resulting live owners
```

## Main findings

```txt
Space while paused mutates spawn queue, waveActive and message
build while paused mutates Souls, pads, towers and effects
order while paused mutates unit targets/moves and effects
build/order/select remain reachable after won/lost
phase is overlapping booleans without identity or revision
accepted/rejected results do not exist
visible overlays have no phase/action receipt
```

## Domains in use

```txt
menu route, settings, save-presence, audio and procedural source rendering
campaign content, economy, waves, units, towers, projectiles and core health
selection, construction, orders, pause, camera and fixed-step simulation
combat, rewards and terminal mutation
CPU world/HUD/minimap/overlay rendering
WebGL CRT presentation and pointer projection
browser input and public host capabilities
source checks, build, deployment and audit tracking
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

## Services

```txt
menu routing and settings persistence
save presence and audio
procedural source-canvas drawing
CRT/WebGL presentation and pointer mapping
campaign state/content construction
wave, build, selection, order, pause and camera mutation
fixed-step AI/combat/reward/terminal processing
HUD/minimap/overlay rendering
legacy public diagnostics and mutation
static checks, build and Pages deployment
```

## Required parent domain

```txt
phantom-command-campaign-phase-admission-authority-domain
```

The parent must own phase schema, revision, transition table, action policy, admission, typed results, paused/terminal fences, public-host adapters, stale rejection, render receipts, journal and fixtures.

## Validation boundary

No runtime, package, dependency, rendering, gameplay, persistence or deployment code changed. No branch or pull request was created.