# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-14T18-41-11-04-00`  
**Status:** `pause-input-command-admission-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with Canvas2D rendering, CRT WebGL presentation, fixed-step combat and browser input. The current audit isolates pause ownership: `state.paused` stops `update()`, but camera integration, rendering, pointer actions, building, orders, selection, wave admission and public capabilities remain active behind the visible `PAUSED` overlay.

## Plan ledger

**Goal:** define one explicit pause and resume authority that controls simulation, camera, direct commands, public capabilities and visible-frame proof.

- [x] Compare all 11 Publish repositories with ten central ledgers and root `.agent` states.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no new, missing, undocumented or runtime-ahead eligible repository.
- [x] Select only PhantomCommand under the oldest synchronized rule.
- [x] Identify the full interaction loop, domains, all 20 kits and their services.
- [x] Define the 22-surface pause/input authority family.
- [x] Add the timestamped audit family and refresh root agent state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-14T18-41-11-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T18-41-11-04-00.md
.agent/architecture-audit/2026-07-14T18-41-11-04-00-pause-input-command-admission-dsk-map.md
.agent/render-audit/2026-07-14T18-41-11-04-00-paused-frame-command-ownership-gap.md
.agent/gameplay-audit/2026-07-14T18-41-11-04-00-paused-state-mutation-loop.md
.agent/interaction-audit/2026-07-14T18-41-11-04-00-pause-command-admission-result-map.md
.agent/pause-audit/2026-07-14T18-41-11-04-00-strict-pause-resume-contract.md
.agent/deploy-audit/2026-07-14T18-41-11-04-00-pause-input-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-14T18-41-11-04-00-repo-ledger-pause-input-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The terminal-outcome audit at `2026-07-14T13-40-59-04-00` and all earlier browser-startup, settings, save, lifecycle, scheduler, WebGL, accessibility, input and combat audits remain active.

## Current mismatch

```txt
P displays PAUSED
  -> simulation update stops
  -> RAF and render continue
  -> camera and direct command handlers continue
  -> build, order, selection and wave-start state may change
  -> resume adopts those mutations without a policy result
```

## Required authority

```txt
phantom-command-pause-input-command-admission-authority-domain
```
