# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T11-48-43-04-00`

## Goal

Implement one runtime-session and resource-lifecycle authority so menu and campaign startup, callbacks, WebGL/audio ownership, route transition, context recovery and retirement are explicit and idempotent.

## Plan ledger

- [ ] Add runtime session IDs, generations and lifecycle phases.
- [ ] Convert route startup into a detached candidate-resource transaction.
- [ ] Retain and cancel every RAF request through named leases.
- [ ] Register every canvas, document, window and hidden-button listener in a removable lease registry.
- [ ] Register delayed timers, including AudioContext close timers.
- [ ] Make `createCrtRenderer()` return a typed resource inventory and idempotent `dispose()` result.
- [ ] Retain successful shader handles or explicitly release them after link.
- [ ] Roll back program, shader, buffer and texture candidates on every failure path.
- [ ] Handle `webglcontextlost` and `webglcontextrestored` under context generations.
- [ ] Reject draw, input and successor-RAF scheduling from stale or retiring sessions.
- [ ] Move menu AudioContext, nodes and timers into the runtime resource ledger.
- [ ] Revoke `window.PhantomMenu` and `window.GameHost` during retirement.
- [ ] Make route navigation occur after a typed retirement policy result.
- [ ] Add bounded lifecycle observations and a journal.
- [ ] Add repeated-session, context-loss, duplicate-retirement and stale-callback browser fixtures.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Existing owners to update

```txt
src/menu/crt-renderer.js
src/menu/graveyard-menu.js
src/campaign/campaign-scene.js
crt-renderer-kit
menu-route-kit
menu-audio-kit
campaign-route-shell-kit
pixel-campaign-runtime-kit
window.PhantomMenu
window.GameHost
scripts/check-menu.mjs
scripts/check-campaign.mjs
package.json
```

## Start contract

```txt
RuntimeStartCommand
  commandId
  routeId
  expectedPredecessorGeneration
  requestedAtMs

RuntimeStartResult
  status: Ready | RejectedStale | FailedAllocation | FailedAdmission
  runtimeSessionId
  runtimeGeneration
  resourceLedgerRevision
  webglContextGeneration
  activeLeaseCounts
  reason
```

## Retirement contract

```txt
RuntimeRetireCommand
  retirementId
  runtimeSessionId
  expectedRuntimeGeneration
  reason
  requestedAtMs

RuntimeRetireResult
  status: Retired | AlreadyRetired | RejectedStale | FailedPartialRetirement
  runtimeSessionId
  runtimeGeneration
  cancelledRafCount
  removedListenerCount
  cancelledTimerCount
  deletedWebglResourceCount
  closedAudioContextCount
  revokedHostCount
  residualResourceIds
  reason
```

## Context recovery contract

```txt
WebglContextLossResult
  runtimeSessionId
  runtimeGeneration
  lostContextGeneration
  status: Degraded | Retiring | Failed

WebglContextRestoreResult
  runtimeSessionId
  runtimeGeneration
  restoredContextGeneration
  resourceLedgerRevision
  firstFrameReceiptId
  status: Restored | RejectedRetired | FailedRebuild
```

## Fixture gate

```txt
one RAF owner exists per current route
route retirement removes all predecessor listeners
route retirement cancels all predecessor timers
WebGL resource inventory reaches zero after retirement
AudioContext closes or returns an explicit failure
public hosts are revoked before RETIRED
forced context loss rejects draw acknowledgement
context restoration uses a higher generation
stale callbacks perform zero mutation and schedule no RAF
repeated retirement returns AlreadyRetired
local, built and Pages lifecycle results match
```

## Dependency order

```txt
Campaign World-Pointer Admission Authority
  -> Runtime Session Resource Lifecycle Authority
  -> CRT Display/Input Projection Authority
  -> Menu Audio Activation and Lifecycle Authority
  -> Public Host Quarantine and Committed Read Model Authorities
```

Do not rely on page destruction as proof of cleanup. Every callback and native resource needs an explicit owner and terminal result.