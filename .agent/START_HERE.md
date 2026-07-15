# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-14T23-38-29-04-00`  
**Status:** `isometric-render-order-frame-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with procedural menu art, fixed-step combat, Canvas2D world/HUD/minimap rendering and WebGL CRT presentation. The current audit isolates world painter ordering: towers and units sort by the correct `x + z` isometric depth key, but projectiles, effects and the central sanctum bypass that order, with the sanctum always drawn last.

## Plan ledger

**Goal:** define one stable world render plan that binds simulation snapshot, camera projection, every world item, Canvas2D execution and the matching CRT-visible frame.

- [x] Compare all 11 Publish repositories with ten eligible central ledgers and root `.agent` states.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented or runtime-ahead eligible repository.
- [x] Select only PhantomCommand under the oldest synchronized rule.
- [x] Identify the full interaction loop, domains, all 20 kits and their services.
- [x] Define the 17-surface isometric render-order authority family.
- [x] Add the timestamped audit family and refresh root agent state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable pixel-order fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-14T23-38-29-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T23-38-29-04-00.md
.agent/architecture-audit/2026-07-14T23-38-29-04-00-isometric-render-order-dsk-map.md
.agent/render-audit/2026-07-14T23-38-29-04-00-sanctum-world-occlusion-gap.md
.agent/gameplay-audit/2026-07-14T23-38-29-04-00-simulation-to-depth-ordered-frame-loop.md
.agent/interaction-audit/2026-07-14T23-38-29-04-00-render-frame-command-result-map.md
.agent/render-order-audit/2026-07-14T23-38-29-04-00-world-item-painter-contract.md
.agent/deploy-audit/2026-07-14T23-38-29-04-00-render-order-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-14T23-38-29-04-00-oldest-selection-render-order-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The pause-input audit at `2026-07-14T18-41-11-04-00`, terminal-outcome audit at `2026-07-14T13-40-59-04-00` and all earlier startup, settings, save, lifecycle, scheduler, WebGL, accessibility, input and combat audits remain active.

## Current mismatch

```txt
simulation snapshot
  -> units and towers sort by x + z
  -> projectiles draw after all entities
  -> effects draw after projectiles
  -> depth-zero sanctum draws last
  -> near-side entities may be visually placed behind the sanctum
  -> CRT presents the unreceipted class-order frame
```

## Required authority

```txt
phantom-command-isometric-render-order-frame-authority-domain
```
