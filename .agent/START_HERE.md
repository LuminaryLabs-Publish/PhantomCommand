# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-14T07-58-22-04-00`  
**Status:** `browser-route-startup-readiness-failure-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with a procedural Canvas2D menu, fixed-step combat, CRT WebGL presentation, browser audio and minimal persistence. The current audit isolates browser-route startup: both routes perform DOM, Canvas2D, WebGL, shader, resource, listener, host and RAF work during top-level module evaluation without a typed startup result, fallback, retry, rollback or first visible-frame acknowledgement.

## Plan ledger

**Goal:** make each route prove required browser capabilities, atomically adopt one startup attempt and expose an independently usable fallback when startup fails.

- [x] Compare 11 Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only PhantomCommand as the oldest eligible synchronized entry.
- [x] Trace menu and campaign bootstrap through first frame.
- [x] Preserve all 20 implemented kits and services.
- [x] Define the 24-surface startup authority and browser fixture gate.
- [x] Add the timestamped audit family and refresh root agent state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable browser proof remain future work.

## Read this first

```txt
.agent/trackers/2026-07-14T07-58-22-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T07-58-22-04-00.md
.agent/architecture-audit/2026-07-14T07-58-22-04-00-browser-route-startup-readiness-dsk-map.md
.agent/render-audit/2026-07-14T07-58-22-04-00-blank-canvas-first-frame-startup-gap.md
.agent/gameplay-audit/2026-07-14T07-58-22-04-00-campaign-startup-unavailable-input-loop.md
.agent/interaction-audit/2026-07-14T07-58-22-04-00-startup-attempt-failure-retry-result-map.md
.agent/startup-readiness-audit/2026-07-14T07-58-22-04-00-route-bootstrap-capability-failure-contract.md
.agent/deploy-audit/2026-07-14T07-58-22-04-00-browser-startup-fault-injection-fixture-gate.md
.agent/central-sync-audit/2026-07-14T07-58-22-04-00-repo-ledger-startup-readiness-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The settings audit at `2026-07-14T02-58-28-04-00`, durable-save audit at `2026-07-13T21-02-54-04-00`, route-lifecycle audit at `2026-07-13T17-00-59-04-00`, scheduler audit at `2026-07-13T11-41-10-04-00` and WebGL audit at `2026-07-13T05-59-03-04-00` remain retained.

## Current mismatch

```txt
route module begins
  -> required browser resources are acquired through top-level side effects
  -> listeners, host and RAF are published only after risky work

startup failure
  -> no RouteStartupResult
  -> no independent DOM fallback
  -> no retry or safe route escape
  -> no candidate rollback receipt
  -> no FirstRouteFrameAck
```

## Required authority

```txt
phantom-command-browser-route-startup-readiness-failure-authority-domain
```

Completion requires attempt identity, capability probes, candidate resource manifests, atomic adoption, typed failure and rollback, DOM-owned fallback and retry, public host publication after acceptance, first-frame acknowledgement and source/build/Pages fault-injection parity.