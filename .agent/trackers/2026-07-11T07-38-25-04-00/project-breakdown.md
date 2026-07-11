# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-11T07-38-25-04-00`

## Summary

This run selected `LuminaryLabs-Publish/PhantomCommand` after the current Publish inventory was compared with the central ledger. `HorrorCorridor` was skipped because a same-window documentation sequence was actively writing there. The audit found that `paused`, `won` and `lost` are render/update flags, not authoritative interaction phases: pointer and keyboard callbacks can still mutate selection, towers, orders and wave state while the pause or terminal overlay is visible.

## Plan ledger

**Goal:** preserve the current game while defining one campaign-phase admission boundary that decides which commands may mutate authoritative state in active, paused, terminal, transitioning and disposed sessions.

- [x] Compare the ten accessible Publish repositories with the nine eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Avoid the actively changing `HorrorCorridor` documentation head.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` as the oldest stable eligible fallback.
- [x] Read campaign input, fixed-step update, render, persistence and current `.agent` state.
- [x] Identify the interaction loop, domains, services and kits.
- [x] Trace pause, terminal and transition action admission.
- [x] Define a phase matrix, typed rejection reasons and render correlation requirements.
- [x] Add architecture, render, gameplay, interaction, phase-authority and deploy audits.
- [x] Refresh root `.agent` routing documents and kit registry.
- [ ] Implement typed commands and phase admission.
- [ ] Add executable paused/terminal mutation fixtures and browser smoke.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-undocumented repositories: 0
active same-window repo skipped: HorrorCorridor
selected stable fallback: PhantomCommand
excluded: TheCavalryOfRome
```

## Current interaction loop

```txt
menu module boot
  -> settings and raw save-presence scan
  -> Begin or Continue route navigation

campaign module boot
  -> allocate descriptors, camera, input, counters and mutable state
  -> attach pointer, wheel, keyboard, blur and context-menu callbacks
  -> callbacks mutate live state immediately
  -> RAF updates camera regardless of campaign pause/terminal state
  -> fixed accumulator calls update(1/60)
  -> update returns early for paused/won/lost
  -> render world, HUD, minimap and pause/terminal overlay
  -> CRT upload and draw
  -> repeat
```

## Exact phase defect

```txt
P toggles state.paused
  -> update() stops simulation mutation
  -> pointer callbacks remain admitted
  -> selectAt() can select and double-click-build
  -> order() can rewrite unit targets/moves
  -> Space can call startWave() because it has no paused guard
  -> tower type and camera can change
  -> render immediately shows mutations beneath PAUSED overlay

won or lost
  -> update() stops
  -> pointer selection/build/order remain admitted
  -> terminal overlay is not an authoritative mutation barrier
```

## Required authority

```txt
CampaignPhase
  BOOTING
  ACTIVE
  PAUSED
  WON
  LOST
  TRANSITIONING
  DISPOSED

source intent
  -> typed CampaignCommand
  -> session/run/phase preflight
  -> allowed, rejected or idempotent result
  -> fixed-step application for gameplay commands
  -> phase transition event
  -> committed state/frame fingerprint
  -> overlay and CRT consumption acknowledgement
```

## Current domains

```txt
route/menu presentation and settings
save presence and Continue routing
campaign content and mutable state
selection, build, order, wave and camera input
fixed-step spawning, AI, combat, economy and terminal state
world, HUD, minimap, modal overlay and CRT rendering
victory-summary persistence
GameHost diagnostics
runtime lifecycle and deployment proof
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

## Candidate phase kits

```txt
phantom-command-campaign-phase-kit
phantom-command-phase-transition-kit
phantom-command-phase-admission-matrix-kit
phantom-command-phase-command-preflight-kit
phantom-command-phase-reason-catalog-kit
phantom-command-paused-input-retirement-kit
phantom-command-terminal-mutation-barrier-kit
phantom-command-phase-result-kit
phantom-command-phase-event-journal-kit
phantom-command-phase-frame-correlation-kit
phantom-command-phase-observation-kit
phantom-command-phase-admission-fixture-kit
```

## Validation boundary

Documentation only. Runtime source, package scripts, dependencies, gameplay, rendering, persistence and deployment were not changed. No branch or pull request was created. Existing source checks were not run because no runtime code changed. Behavioral phase-admission fixtures do not exist.