# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-14T02-58-28-04-00`  
**Status:** `settings-route-adoption-visible-frame-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with procedural Canvas2D routes, fixed-step combat, CRT WebGL presentation, browser audio and minimal persistence. The current audit isolates the gap between menu settings, stored preferences, campaign adoption and the first visible frame carrying the accepted settings revision.

## Plan ledger

**Goal:** require one canonical settings revision to control every supported route participant and produce an explicit route-adoption result.

- [x] Compare 11 Publish repositories and 10 eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only PhantomCommand as the oldest eligible synchronized entry.
- [x] Trace settings read, mutation, writeback, menu rendering and campaign rendering.
- [x] Preserve all 20 implemented kits and services.
- [x] Define the 22-surface settings authority and fixture gate.
- [x] Add the timestamped audit family and refresh root agent state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable proof remain future work.

## Read this first

```txt
.agent/trackers/2026-07-14T02-58-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T02-58-28-04-00.md
.agent/architecture-audit/2026-07-14T02-58-28-04-00-settings-route-adoption-dsk-map.md
.agent/render-audit/2026-07-14T02-58-28-04-00-settings-visible-frame-parity-gap.md
.agent/gameplay-audit/2026-07-14T02-58-28-04-00-menu-settings-campaign-route-loop.md
.agent/interaction-audit/2026-07-14T02-58-28-04-00-settings-command-route-adoption-result-map.md
.agent/settings-audit/2026-07-14T02-58-28-04-00-settings-schema-capability-adoption-contract.md
.agent/deploy-audit/2026-07-14T02-58-28-04-00-settings-parity-fixture-gate.md
.agent/central-sync-audit/2026-07-14T02-58-28-04-00-repo-ledger-settings-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The victory-save audit at `2026-07-13T21-02-54-04-00`, route-lifecycle audit at `2026-07-13T17-00-59-04-00`, fixed-step scheduler audit at `2026-07-13T11-41-10-04-00` and WebGL lifecycle audit at `2026-07-13T05-59-03-04-00` remain retained.

## Current mismatch

```txt
menu reads and applies crt, grain and ambience
  -> settings document is written without verification
  -> campaign route starts
  -> campaign ignores the document
  -> campaign forces CRT on and grain low
  -> no adoption result or matching frame acknowledgement exists
```

## Required authority

```txt
phantom-command-settings-route-adoption-visible-frame-authority-domain
```

Completion requires a versioned settings document, route capability manifests, typed storage and adoption results, campaign settings application, public revision readback and first settings-frame acknowledgement.