# PhantomCommand Known Gaps

**Timestamp:** `2026-07-13T05-59-03-04-00`

## Summary

The leading presentation gap is WebGL Context Lifecycle and Recovery Authority. Menu and campaign CRT rendering assume one context and one resource set remain valid forever; context loss, restoration, partial allocation, disposal and recovered-frame proof are unowned.

## Plan ledger

**Goal:** close context identity, resource lifetime, failure isolation, recovery, fallback and proof gaps without weakening existing menu, campaign or fixed-step ownership.

- [x] Record one-shot context and resource allocation.
- [x] Record missing context-loss and restoration handling.
- [x] Record missing resource retirement and rebuild.
- [x] Record RAF liveness and source/display divergence risks.
- [x] Record raw GL capability escape.
- [x] Record deterministic and deployed proof gaps.
- [ ] Implement in dependency order.

## Context lifecycle gaps

```txt
stable CRT surface ID
WebGL context ID and generation
context state machine
loss reason and event sequence
restore admission policy
stale event rejection
route lifecycle binding
context disposal result
```

## Resource ownership gaps

```txt
resource-generation ID
owned shader/program records
owned buffer and texture records
uniform/attribute location generation
partial-allocation cleanup
idempotent disposal
resource rebuild candidate
atomic restored-resource adoption
raw GL capability quarantine
```

## Presentation gaps

```txt
source-frame revision
presentation command ID
context/resource predecessor revisions
typed upload and draw results
last successfully presented frame
source/display divergence classification
render exception isolation
first recovered-frame acknowledgement
```

## Recovery and fallback gaps

```txt
approved preventDefault policy
submission pause while lost
provider-independent DOM failure status
bounded retry or route exit
restore timeout
rebuild rejection reason
probe-frame validation
last-good-frame or degraded presentation policy
```

## Concrete current risks

```txt
context loss can leave the display blank with no game-owned explanation
restoration cannot recreate captured program/buffer/texture handles
source canvas and simulation can advance while the visible CRT surface is unavailable
synchronous rendering failure can stop successor RAF scheduling
partial shader/program allocation has no complete cleanup transaction
raw gl exposure allows untracked external mutation
menu and campaign have no common presentation health readback
boot-time WebGL failure can abort before route-owned recovery UI exists
```

## Test gaps

```txt
menu context-loss fixture
campaign context-loss fixture
successful context restore and resource rebuild
failed shader rebuild
failed texture allocation
stale restored-event rejection
partial resource cleanup
RAF continuation under degraded presentation
first recovered-frame correlation
source/build/Pages lifecycle parity
```

## Retained authority gaps

```txt
Accessible Command and Focus Projection Authority
Combat Modifier Application Authority
Runtime Session Resource Lifecycle Authority
Campaign Bootstrap and Continue Resume Authority
Campaign Keyboard Command Admission Authority
Campaign Action Result Authority
Campaign Spatial Input Admission Authority
Menu Pointer-Hit Admission Authority
Public Host Owner Quarantine and Typed Command Admission
CRT Display/Input Projection Authority
Campaign Phase Admission Authority
Fixed-Step Command Scheduling Replay and Committed Frame Authority
Public Host Committed Read Model
Combat Resolution and Entity Liveness Authority
Exclusive Terminal Outcome Transaction
Menu Audio Activation and Lifecycle Authority
complete campaign replay
source/build/Pages production proof
```

## Completion boundary

A successful initial draw is not lifecycle proof. Completion requires identified context/resource generations, deterministic loss and restore results, complete rebuild/disposal, bounded fallback, public health readback and a matching first recovered visible frame.