# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-15T08-41-37-04-00`  
**Status:** `public-diagnostic-capability-frame-admission-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with procedural menu art, fixed-step combat, Canvas2D world/HUD/minimap rendering and WebGL CRT presentation. The current audit isolates the public diagnostic host: `window.GameHost` publishes live mutable campaign state and camera references plus direct wave, build and zoom functions, so external callers can bypass normal command ownership without typed settlement or matching visible-frame proof.

## Plan ledger

**Goal:** replace ambient raw runtime access with immutable observation and allowlisted, versioned diagnostic commands that settle once and are acknowledged by both render surfaces.

- [x] Compare all 11 Publish repositories with ten eligible central ledgers and root `.agent` states.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented or runtime-ahead eligible repository.
- [x] Select only PhantomCommand through the oldest synchronized rule.
- [x] Identify the full interaction loop, domains, all 20 implemented kits and their services.
- [x] Define the 19-surface public capability authority family.
- [x] Add the timestamped audit family and refresh root agent state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime capability authority and executable browser fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-15T08-41-37-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T08-41-37-04-00.md
.agent/architecture-audit/2026-07-15T08-41-37-04-00-public-diagnostic-capability-dsk-map.md
.agent/render-audit/2026-07-15T08-41-37-04-00-direct-host-mutation-visible-frame-gap.md
.agent/gameplay-audit/2026-07-15T08-41-37-04-00-gamehost-out-of-band-mutation-loop.md
.agent/interaction-audit/2026-07-15T08-41-37-04-00-public-capability-command-result-map.md
.agent/host-capability-audit/2026-07-15T08-41-37-04-00-gamehost-read-write-contract.md
.agent/deploy-audit/2026-07-15T08-41-37-04-00-public-capability-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T08-41-37-04-00-oldest-selection-public-capability-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The device-control audit at `2026-07-15T03-24-35-04-00`, isometric render-order audit at `2026-07-14T23-38-29-04-00`, pause audit at `2026-07-14T18-41-11-04-00`, terminal-outcome audit at `2026-07-14T13-40-59-04-00` and all earlier startup, settings, save, lifecycle, scheduler, WebGL, accessibility, input and combat audits remain active.

## Current mismatch

```txt
window.GameHost publication
  -> live state reference
  -> live camera reference
  -> direct startWave function
  -> direct build function
  -> direct setZoom function
  -> no caller lease or capability revision
  -> no expected state revision or idempotency
  -> no typed mutation result
  -> no capability retirement receipt
  -> no matching Canvas2D and CRT frame acknowledgement
```

## Required authority

```txt
phantom-command-public-diagnostic-capability-frame-admission-authority-domain
```