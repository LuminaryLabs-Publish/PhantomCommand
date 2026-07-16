# PhantomCommand Agent State

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Latest audit:** `2026-07-16T00-00-40-04-00`  
**Status:** `campaign-audio-event-projection-authority-audited`

## Summary

PhantomCommand combines a procedural Canvas2D menu, menu-owned WebAudio, a fixed-step isometric grave-ring campaign, Canvas2D world/HUD/minimap rendering, WebGL CRT presentation, local persistence, static validation, build and Pages delivery. The active audit isolates campaign audio: the menu owns ambience and UI tones, but `game.html` loads only `campaign-scene.js`, and accepted wave, build, order, combat, core-damage, pause, win and loss transitions have no campaign audio projection or audible-result evidence.

## Plan ledger

**Goal:** project campaign sound only from accepted gameplay transitions while keeping campaign truth in the simulation and preserving browser audio lifecycle, preference, deduplication and voice-budget ownership.

- [x] Compare the full 11-repository Publish inventory with ten central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Identify one documentation-ahead mismatch: central tracking recorded PhantomCommand head `cdb3e9346211d0ddac8bf08798a79259e9f7f78b`, while `main` was `d7df091b3a898e99f804e2af00a307b4df96b09d`.
- [x] Select only PhantomCommand before the oldest-documented fallback.
- [x] Trace menu audio, campaign boot, gameplay transitions, rendering, lifecycle, validation and deployment.
- [x] Preserve all 20 implemented kits and their services.
- [x] Define one parent campaign-audio authority and 21 coordinating surfaces.
- [x] Add the timestamped tracker and focused audit family.
- [ ] Implement semantic campaign audio events, lifecycle-safe projection and executable browser fixtures.

## Complete interaction loop

```txt
menu
  -> restore settings and save presence
  -> user gesture creates menu AudioContext
  -> ambience and UI tones project
  -> route to campaign

campaign
  -> keyboard pointer and wheel input
  -> fixed-step waves movement combat rewards and terminal settlement
  -> Canvas2D world HUD minimap effects and overlays
  -> WebGL CRT presentation
  -> no campaign AudioContext cue registry or audio result

terminal
  -> win or loss message and overlay
  -> optional victory save marker
  -> no authored terminal cue or audiovisual convergence acknowledgement
```

## Inventory

```txt
implemented source-backed kits: 20
planned campaign-audio authority surfaces: 22
```

## Required parent domain

`phantom-command-campaign-audio-event-projection-authority-domain`

## Read this pass first

```txt
.agent/trackers/2026-07-16T00-00-40-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T00-00-40-04-00.md
.agent/architecture-audit/2026-07-16T00-00-40-04-00-campaign-audio-event-projection-dsk-map.md
.agent/render-audit/2026-07-16T00-00-40-04-00-silent-campaign-audiovisual-frame-gap.md
.agent/gameplay-audit/2026-07-16T00-00-40-04-00-silent-wave-build-combat-outcome-loop.md
.agent/interaction-audit/2026-07-16T00-00-40-04-00-campaign-audio-command-result-map.md
.agent/audio-audit/2026-07-16T00-00-40-04-00-campaign-unlock-cue-ambience-lifecycle-contract.md
.agent/deploy-audit/2026-07-16T00-00-40-04-00-campaign-audio-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T00-00-40-04-00-documentation-ahead-campaign-audio-reconciliation.md
```

## Retained authorities

Pointer-gesture capture and cancellation, pointer feedback, menu audio lifecycle, public diagnostics, device coverage, isometric render order, pause admission, terminal conflict settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility, combat modifiers, campaign bootstrap, keyboard commands and spatial input remain separate retained authorities.