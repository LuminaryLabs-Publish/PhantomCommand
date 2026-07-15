# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-15T03-24-35-04-00`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with procedural menu art, fixed-step combat, Canvas2D world/HUD/minimap rendering and WebGL CRT presentation. The current audit isolates device-control coverage: touch pointers can select, box-select and activate pads, but the required wave, unit-order, tower-choice, camera, pause and terminal actions remain bound to keyboard, multi-button mouse or wheel inputs.

## Plan ledger

**Goal:** make every admitted keyboard/mouse, touch-only or hybrid device profile capable of executing the complete campaign through one semantic action contract.

- [x] Compare all 11 Publish repositories with ten eligible central ledgers and root `.agent` states.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented or runtime-ahead eligible repository.
- [x] Select only PhantomCommand through the oldest synchronized rule.
- [x] Identify the full interaction loop, domains, all 20 kits and their services.
- [x] Define the 22-surface device-control authority family.
- [x] Add the timestamped audit family and refresh root agent state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime controls and executable touch/hybrid fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-15T03-24-35-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T03-24-35-04-00.md
.agent/architecture-audit/2026-07-15T03-24-35-04-00-device-control-action-coverage-dsk-map.md
.agent/render-audit/2026-07-15T03-24-35-04-00-touch-control-surface-visible-frame-gap.md
.agent/gameplay-audit/2026-07-15T03-24-35-04-00-touch-wave-order-immobility-loop.md
.agent/interaction-audit/2026-07-15T03-24-35-04-00-device-action-command-result-map.md
.agent/device-control-audit/2026-07-15T03-24-35-04-00-keyboard-pointer-touch-action-coverage-contract.md
.agent/deploy-audit/2026-07-15T03-24-35-04-00-device-control-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T03-24-35-04-00-oldest-selection-device-control-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The isometric render-order audit at `2026-07-14T23-38-29-04-00`, pause audit at `2026-07-14T18-41-11-04-00`, terminal-outcome audit at `2026-07-14T13-40-59-04-00` and all earlier startup, settings, save, lifecycle, scheduler, WebGL, accessibility, input and combat audits remain active.

## Current mismatch

```txt
touch-only route
  -> primary-pointer selection works
  -> default pad activation can build
  -> no wave-start producer
  -> no unit-order producer
  -> no tower-type producer
  -> no complete pan or zoom producer
  -> no pause, restart, exit or focus producer
  -> campaign cannot be completed through the admitted player surface
```

## Required authority

```txt
phantom-command-device-control-action-coverage-authority-domain
```