# PhantomCommand Agent State

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Latest audit:** `2026-07-18T10-38-06-04-00`  
**Status:** `campaign-target-query-work-budget-authority-audited`

## Summary

PhantomCommand combines a procedural Canvas2D menu, WebAudio, a fixed-step isometric campaign, Canvas2D world/HUD/minimap rendering, WebGL CRT presentation, persistence, static validation, build and Pages delivery.

The current audit isolates combat target-query work. `enemies()` and `allies()` rebuild two arrays per call. Untargeted units query per unit, every tower queries every fixed tick, and splash projectiles query at impact. The initial six-player pre-wave state creates a source-visible minimum of 12 query arrays per accepted tick, conditionally 720 per second at 60 accepted ticks. This is source arithmetic, not a profiler result or demonstrated regression.

## Intent

Give one campaign combat authority ownership of stable team indexes, deterministic target-query results, query-work budgets, stale-generation rejection and matching presented-frame proof.

## Checklist

- [x] Compare the complete 11-repository Publish inventory with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers, root `.agent` states and synchronized heads.
- [x] Select only PhantomCommand through the oldest documented-selection rule.
- [x] Identify the complete menu, campaign, simulation and presentation loops.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define 20 campaign target-query product/runtime/fixture surfaces.
- [x] Add the timestamped audit family.
- [ ] Implement indexed team views, query settlement and executable parity fixtures.

## Complete interaction loop

```txt
menu
  -> settings, save presence, procedural art, audio and CRT
  -> campaign route

campaign
  -> select units and pads
  -> build towers and issue orders
  -> start waves
  -> fixed-step spawn, movement and combat
  -> rebuild enemy/ally arrays for target queries
  -> mutate units, projectiles, resources and outcomes
  -> render world, HUD, minimap and CRT frame
```

## Inventory

```txt
implemented source-backed kits: 20
proposed campaign target-query authority surfaces: 20
```

## Required parent domain

`phantom-command-campaign-target-query-work-budget-authority-domain`

## Read this pass first

```txt
.agent/trackers/2026-07-18T10-38-06-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-18T10-38-06-04-00.md
.agent/architecture-audit/2026-07-18T10-38-06-04-00-campaign-target-query-work-budget-dsk-map.md
.agent/render-audit/2026-07-18T10-38-06-04-00-target-query-generation-presentation-gap.md
.agent/gameplay-audit/2026-07-18T10-38-06-04-00-campaign-combat-target-query-loop.md
.agent/interaction-audit/2026-07-18T10-38-06-04-00-target-query-command-result-map.md
.agent/simulation-query-audit/2026-07-18T10-38-06-04-00-team-index-query-budget-contract.md
.agent/deploy-audit/2026-07-18T10-38-06-04-00-target-query-budget-fixture-gate.md
.agent/central-sync-audit/2026-07-18T10-38-06-04-00-oldest-selection-target-query-reconciliation.md
```

## Retained authorities

Menu pointer-target admission, camera coverage, input-region arbitration, middle-pan convergence, marquee geometry, wheel zoom, motion preference, campaign audio, pointer capture/cancellation, pointer feedback, menu audio lifecycle, diagnostics, device coverage, render order, pause input, terminal settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility, combat modifiers, campaign bootstrap, keyboard commands and broad spatial input remain separate retained authorities.