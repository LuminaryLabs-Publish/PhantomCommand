# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-15T13-41-25-04-00`  
**Status:** `menu-audio-unlock-lifecycle-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with procedural Canvas2D menu art, browser audio, fixed-step combat, Canvas2D world/HUD/minimap rendering and WebGL CRT presentation. The current audit isolates menu audio lifecycle: the menu creates persistent audio sources after input but has no explicit suspended-context resume, visibility or route settlement, source retirement receipts, stale callback rejection or audible/silent acknowledgement.

## Plan ledger

**Goal:** give browser audio one generation-bound unlock, projection, settlement and retirement contract while preserving current menu and campaign behavior.

- [x] Compare all 11 Publish repositories with ten eligible central ledgers and root `.agent` states.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented or runtime-ahead eligible repository.
- [x] Select only PhantomCommand through the oldest synchronized rule.
- [x] Identify the full interaction loop, domains, all 20 implemented kits and their services.
- [x] Define the 18-surface menu-audio lifecycle authority family.
- [x] Add the timestamped audit family and refresh root agent state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime audio authority and executable browser fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-15T13-41-25-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T13-41-25-04-00.md
.agent/architecture-audit/2026-07-15T13-41-25-04-00-menu-audio-lifecycle-dsk-map.md
.agent/render-audit/2026-07-15T13-41-25-04-00-menu-transition-audio-settlement-gap.md
.agent/gameplay-audit/2026-07-15T13-41-25-04-00-menu-to-campaign-audio-loop.md
.agent/interaction-audit/2026-07-15T13-41-25-04-00-audio-command-result-map.md
.agent/audio-audit/2026-07-15T13-41-25-04-00-context-source-route-retirement-contract.md
.agent/deploy-audit/2026-07-15T13-41-25-04-00-browser-audio-lifecycle-fixture-gate.md
.agent/central-sync-audit/2026-07-15T13-41-25-04-00-oldest-selection-audio-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The public-capability audit at `2026-07-15T08-41-37-04-00`, device-control audit at `2026-07-15T03-24-35-04-00`, render-order audit at `2026-07-14T23-38-29-04-00` and all earlier pause, terminal, startup, settings, save, lifecycle, scheduler, WebGL, accessibility, input and combat audits remain active.

## Current mismatch

```txt
accepted menu input
  -> ensureAudio creates or reuses a mutable audio graph
  -> existing suspended contexts are not explicitly resumed
  -> persistent drone and wind start without leases
  -> route fade and navigation do not request audio settlement
  -> visibility and page retirement have no audio owner
  -> delayed close is not bound to a generation
  -> no audible or silent lifecycle acknowledgement
```

## Required authority

```txt
phantom-command-menu-audio-unlock-lifecycle-authority-domain
```