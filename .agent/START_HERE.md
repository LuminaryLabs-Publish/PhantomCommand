# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-13T05-59-03-04-00`  
**Status:** `webgl-context-lifecycle-recovery-authority-central-reconciled`

## Summary

PhantomCommand is a static pixel-isometric campaign with a procedural canvas menu, fixed-step combat, CRT WebGL presentation, browser persistence and public diagnostics. The current boundary is WebGL Context Lifecycle and Recovery Authority: both routes allocate one context, program, buffer and source texture at module boot, but neither route handles context loss, restoration, resource reconstruction, disposal, typed presentation failure or first recovered-frame proof.

## Plan ledger

**Goal:** make the menu and campaign CRT surface survive or clearly report context loss through one revisioned resource lifecycle and one visible-frame result.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only PhantomCommand as the oldest eligible central entry.
- [x] Trace CRT construction, shader/program creation, buffer and texture allocation, resize, upload, draw, RAF scheduling and public raw-GL exposure.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define the parent WebGL lifecycle authority and candidate kit family.
- [x] Add the timestamped tracker and audit family.
- [x] Refresh root `.agent` state and central tracking.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime recovery and executable context-loss fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-13T05-59-03-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T05-59-03-04-00.md
.agent/architecture-audit/2026-07-13T05-59-03-04-00-webgl-context-lifecycle-recovery-dsk-map.md
.agent/render-audit/2026-07-13T05-59-03-04-00-crt-context-loss-visible-frame-gap.md
.agent/gameplay-audit/2026-07-13T05-59-03-04-00-menu-campaign-presentation-liveness-loop.md
.agent/interaction-audit/2026-07-13T05-59-03-04-00-context-event-resource-result-map.md
.agent/webgl-lifecycle-audit/2026-07-13T05-59-03-04-00-context-generation-resource-rebuild-contract.md
.agent/deploy-audit/2026-07-13T05-59-03-04-00-webgl-context-loss-fixture-gate.md
.agent/central-sync-audit/2026-07-13T05-59-03-04-00-repo-ledger-webgl-lifecycle-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The Accessible Command and Focus Projection audit at `2026-07-13T02-49-07-04-00` remains retained.

## Current mismatch

```txt
module boot
  -> allocate one WebGL context and one resource set
  -> expose raw gl

context loss
  -> no context event owner
  -> no generation retirement
  -> no resource rebuild
  -> no typed degraded/fatal result
  -> no first recovered-frame acknowledgement
```

## Required authority

```txt
phantom-command-webgl-context-lifecycle-recovery-authority-domain
```

Completion requires typed context state, deterministic resource retirement/reconstruction, presentation-failure isolation, bounded fallback UI, public readback and source/build/Pages context-loss proof.