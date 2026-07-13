# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-13T17-00-59-04-00`  
**Status:** `route-session-resource-retirement-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with a procedural Canvas2D menu, fixed-step combat, CRT WebGL presentation, browser audio, persistence and public hosts. The current audit isolates Route Session Resource Retirement Authority: both routes allocate RAF, listeners, GPU resources and public capabilities without a generation or disposal contract, and menu audio also remains lifecycle-unbound.

## Plan ledger

**Goal:** make menu-to-campaign, campaign-to-menu and campaign-restart transitions retire one complete resource generation before successor readiness is claimed.

- [x] Compare all ten Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm nine eligible central-ledger entries.
- [x] Select only PhantomCommand as the oldest eligible entry.
- [x] Trace route resource allocation, fade, navigation, exit and reload.
- [x] Preserve 20 implemented kits and services.
- [x] Define the route-lifecycle authority and fixture gate.
- [x] Add the timestamped audit family.
- [x] Push only to main; create no branch or pull request.
- [ ] Runtime implementation and executable lifecycle proof remain future work.

## Read this first

```txt
.agent/trackers/2026-07-13T17-00-59-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T17-00-59-04-00.md
.agent/architecture-audit/2026-07-13T17-00-59-04-00-route-session-resource-retirement-dsk-map.md
.agent/render-audit/2026-07-13T17-00-59-04-00-route-transition-visible-frame-gap.md
.agent/gameplay-audit/2026-07-13T17-00-59-04-00-menu-campaign-route-liveness-loop.md
.agent/interaction-audit/2026-07-13T17-00-59-04-00-route-command-resource-result-map.md
.agent/route-lifecycle-audit/2026-07-13T17-00-59-04-00-route-generation-resource-retirement-contract.md
.agent/deploy-audit/2026-07-13T17-00-59-04-00-route-lifecycle-fixture-gate.md
.agent/central-sync-audit/2026-07-13T17-00-59-04-00-repo-ledger-route-lifecycle-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The fixed-step scheduler audit at `2026-07-13T11-41-10-04-00` and WebGL context lifecycle audit at `2026-07-13T05-59-03-04-00` remain retained.

## Current mismatch

```txt
route boots
  -> resources and public hosts are allocated
  -> recursive RAF and listeners become ambient
  -> navigation or reload is requested
  -> browser teardown is expected to clean everything
  -> no retirement or navigation result
  -> no first successor-frame acknowledgement
```

## Required authority

```txt
phantom-command-route-session-resource-retirement-authority-domain
```

Completion requires route generations, resource manifests, cancellable leases, disposal receipts, typed navigation outcomes, failure fallback, retired public-host behavior and source/build/Pages successor-frame proof.
