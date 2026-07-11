# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-11T18-21-09-04-00`

## Summary

This breakdown selected only `LuminaryLabs-Publish/PhantomCommand`. The repository can produce contradictory terminal state in one fixed update: a final enemy can destroy the sanctum, delete itself, and thereby permit the final-wave-clear branch to set victory and write a victory summary after defeat evidence already exists.

## Plan ledger

**Goal:** identify the full product loop, domains, kits and services, then define one exclusive terminal-outcome authority between combat resolution and persistence/rendering.

- [x] Enumerate 10 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare nine eligible repositories with central tracking.
- [x] Confirm 9/9 central ledgers and 9/9 root `.agent` folders.
- [x] Select `PhantomCommand`, the oldest eligible central entry.
- [x] Read menu, campaign, update, core breach, enemy retirement, wave clear, persistence, rendering and diagnostics.
- [x] Identify the interaction loop.
- [x] Identify all active and missing domains.
- [x] Identify all implemented kits and their services.
- [x] Define the terminal authority DSK and fixture gate.
- [x] Refresh required root `.agent` files.
- [x] Add timestamped architecture and system audits.
- [x] Push only to `main` and create no branch or PR.
- [ ] Runtime implementation remains future work.

## Selection comparison

```txt
PhantomCommand     2026-07-11T16-49-51-04-00 selected
ZombieOrchard      2026-07-11T17-01-11-04-00
TheUnmappedHouse   2026-07-11T17-10-50-04-00
AetherVale         2026-07-11T17-20-20-04-00
IntoTheMeadow      2026-07-11T17-30-56-04-00
PrehistoricRush    2026-07-11T17-39-47-04-00
MyCozyIsland       2026-07-11T17-50-37-04-00
TheOpenAbove       2026-07-11T18-01-38-04-00
HorrorCorridor     2026-07-11T18-11-21-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
menu -> Begin/Continue -> campaign construction -> browser commands
-> fixed 1/60 combat updates -> core/wave evidence -> mutable won/lost flags
-> world/HUD/minimap/terminal overlay -> CRT -> GameHost readback
-> reload restart or menu exit
```

## Terminal race

```txt
last final-wave enemy reaches core
  -> core = 0
  -> lost = true
  -> enemy deleted
  -> update continues
  -> no enemies or spawn rows remain
  -> wave advances
  -> won = true
  -> clear reward granted
  -> victory message and localStorage summary committed
```

The overlay reads `won` before `lost`, so the visible result is victory. `GameHost.getState()` can expose both flags as true.

## Domains

```txt
route/menu/startup
save presence and future Continue admission
CRT display and pointer projection
campaign content and mutable state
browser commands and fixed-step scheduling
spawn, targeting, movement and combat resolution
entity liveness, retirement and rewards
core-breach and final-wave-clear evidence
terminal policy, arbitration, latch and result
persistence admission
terminal message, overlay, CRT and GameHost projection
restart/exit and runtime lifecycle
checkpoint, validation, build and Pages deployment
```

## Implemented kits and offered services

```txt
crt-renderer-kit                     WebGL CRT upload/draw/resize/projection
graveyard-art-kit                    procedural menu art
menu-route-kit                       selection, panels and navigation
menu-settings-persistence-kit        menu setting storage
menu-save-presence-kit               Boolean save presence
menu-audio-kit                       ambience and UI tones
campaign-route-shell-kit             campaign page bootstrap
pixel-campaign-runtime-kit           content, state, input, orders, waves and camera
fixed-step-campaign-simulation-kit   spawn, AI, movement, combat, rewards, core and wave mutation
pixel-campaign-render-kit            world, HUD, minimap and terminal overlay
legacy-gamehost-diagnostics-kit      mutable readback and direct actions
menu-static-check-kit                menu source checks
campaign-static-check-kit            campaign source checks
static-build-copy-kit                dist assembly
pages-deploy-kit                     GitHub Pages deployment
construct-spiral-intro-kit           retained intro scheduling
construct-spiral-schedule-kit        retained piece timing
construct-piece-id-kit               retained identity
construct-piece-state-kit            retained state
construct-sequence-update-kit        retained sequence update
```

## Required composed domain

```txt
phantom-command-terminal-outcome-authority-domain
  -> terminal-evidence-input-kit
  -> core-breach-evidence-kit
  -> final-wave-clear-evidence-kit
  -> terminal-policy-kit
  -> terminal-arbitration-kit
  -> terminal-outcome-result-kit
  -> terminal-latch-kit
  -> terminal-transition-kit
  -> terminal-persistence-admission-kit
  -> terminal-message-projection-kit
  -> terminal-overlay-projection-kit
  -> terminal-gamehost-projection-kit
  -> terminal-frame-correlation-kit
  -> terminal-restart-exit-kit
  -> terminal-journal-kit
  -> simultaneous-outcome-fixture-kit
  -> terminal-persistence-fixture-kit
  -> terminal-frame-smoke-kit
```

## Recommended policy

For the current survival objective, defeat wins simultaneous evidence when the sanctum reaches zero in the same committed combat result that clears the final wave. The exact choice must be named, versioned and fixture-backed.

## Files in this audit set

```txt
.agent/turn-ledger/2026-07-11T18-21-09-04-00.md
.agent/architecture-audit/2026-07-11T18-21-09-04-00-terminal-outcome-authority-dsk-map.md
.agent/render-audit/2026-07-11T18-21-09-04-00-dual-terminal-frame-persistence-gap.md
.agent/gameplay-audit/2026-07-11T18-21-09-04-00-core-breach-final-wave-clear-race.md
.agent/interaction-audit/2026-07-11T18-21-09-04-00-terminal-result-restart-exit-admission-map.md
.agent/terminal-outcome-audit/2026-07-11T18-21-09-04-00-exclusive-outcome-arbitration-contract.md
.agent/deploy-audit/2026-07-11T18-21-09-04-00-terminal-outcome-fixture-gate.md
```

## Validation boundary

Documentation only. No runtime, rendering, persistence, package, dependency or deployment behavior changed. No branch or pull request was created.