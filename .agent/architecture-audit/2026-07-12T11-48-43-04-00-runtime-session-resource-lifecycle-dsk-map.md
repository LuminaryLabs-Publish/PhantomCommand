# Architecture Audit: Runtime Session Resource Lifecycle DSK Map

**Timestamp:** `2026-07-12T11-48-43-04-00`

## Summary

Menu and campaign startup currently allocate browser callbacks and GPU/audio resources directly. There is no aggregate runtime owner capable of proving readiness, rejecting stale callbacks, recovering a lost WebGL context or retiring all resources exactly once.

## Plan ledger

**Goal:** define a composed DSK boundary from route startup through resource admission, active-frame ownership, failure handling and idempotent retirement.

- [x] Identify route, RAF, listener, timer, WebGL, audio and public-host owners.
- [x] Separate resource allocation from session commit.
- [x] Define lifecycle phases and generation fences.
- [x] Define loss, restore and retirement results.
- [x] Define observation, journal and browser proof.
- [ ] Implement and execute the domain.

## Parent domain

```txt
phantom-command-runtime-session-resource-lifecycle-authority-domain
```

## DSK composition

```txt
session identity and phase
  runtime-session-id-kit
  runtime-session-generation-kit
  runtime-session-phase-kit
  runtime-start-command-kit
  runtime-start-result-kit

resource ownership
  runtime-resource-ledger-kit
  raf-lease-kit
  dom-listener-lease-kit
  timer-lease-kit
  audio-resource-lease-kit

WebGL lifecycle
  webgl-context-generation-kit
  webgl-resource-inventory-kit
  webgl-context-loss-result-kit
  webgl-context-restore-result-kit

transition and retirement
  route-transition-retirement-kit
  runtime-retire-command-kit
  runtime-retire-result-kit
  runtime-idempotent-disposal-kit
  stale-runtime-callback-rejection-kit
  public-host-revocation-kit

observation and proof
  runtime-lifecycle-observation-kit
  runtime-lifecycle-journal-kit
  repeated-menu-session-fixture-kit
  repeated-campaign-session-fixture-kit
  webgl-context-loss-browser-fixture-kit
  route-retirement-browser-smoke-kit
  pages-runtime-lifecycle-smoke-kit
```

## Lifecycle phases

```txt
NEW
  -> STARTING
  -> READY
  -> RETIRING
  -> RETIRED

STARTING or READY
  -> DEGRADED on recoverable context loss
  -> FAILED on unrecoverable allocation or restoration failure

RETIRED
  -> no callback, input, draw, audio or host mutation is admissible
```

## Required start result

```txt
RuntimeStartResult
  status: Ready | RejectedStale | FailedAllocation | FailedAdmission
  runtimeSessionId
  runtimeGeneration
  routeId
  resourceLedgerRevision
  webglContextGeneration
  listenerLeaseCount
  rafLeaseCount
  timerLeaseCount
  audioLeaseCount
  reason
```

## Required retirement result

```txt
RuntimeRetireResult
  status: Retired | AlreadyRetired | RejectedStale | FailedPartialRetirement
  runtimeSessionId
  runtimeGeneration
  retirementId
  cancelledRafCount
  removedListenerCount
  cancelledTimerCount
  deletedWebglResourceCount
  closedAudioContextCount
  revokedHostCount
  residualResourceIds
  reason
```

## Invariants

```txt
Every callback cites one runtime session and generation.
Only READY sessions admit input, simulation and rendering.
One session has at most one active RAF owner per route.
Every installed listener and timer has a removable lease.
Every WebGL shader, program, buffer and texture appears in the resource ledger.
Context restoration creates a new context generation and cannot revive a retired session.
Retirement is idempotent and returns the same terminal meaning on duplicates.
Public hosts are revoked before retirement completes.
No stale callback can schedule a successor RAF after retirement.
```

## Existing owners to update later

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

This audit changes documentation only.