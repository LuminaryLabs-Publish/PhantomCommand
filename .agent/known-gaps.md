# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T16-00-03-04-00`

## Summary

The leading documented gap is Menu Pointer-Hit Admission Authority. Pointer misses and letterbox clicks can execute stale selected actions, settings-panel misses can mutate stale selected rows, and pointer geometry does not invert the visible CRT curve.

## Plan ledger

**Goal:** close pointer policy, geometry, hit admission, zero-mutation rejection and visible-proof gaps while preserving the campaign bootstrap, phase, fixed-step, combat, lifecycle and persistence queues.

- [x] Record main-menu miss and stale-selection gaps.
- [x] Record settings-panel miss and stale-row gaps.
- [x] Record containment and CRT transform gaps.
- [x] Record pointer policy, result and fixture gaps.
- [x] Preserve previous authority queues.
- [ ] Implement in dependency order.

## Pointer policy gaps

```txt
input source identity
pointer sample id
pointer sequence id
primary-pointer policy
primary-button policy
pointer capture
pointer cancel
pointer down/up coherence
drag threshold
duplicate sequence rejection
```

## Geometry gaps

```txt
menu surface generation
source-canvas revision
viewport/display rectangle revision
DPR revision
containment transform revision
CRT state and curve revision
inverse CRT input projection
control layout revision
panel generation
visible/logical geometry parity
```

## Hit and admission gaps

```txt
typed containment result
typed control hit result
control identity
terminal miss rejection
terminal outside-surface rejection
stale transform/layout/panel rejection
MenuActionCommand
MenuActionResult
transition admission result
zero-mutation rejection fence
first visible action-frame acknowledgement
```

## Concrete current risks

```txt
empty graveyard click launches previously selected route
letterbox click launches previously selected route
row-gap click launches previously selected route
settings gap click toggles previously selected setting
settings miss can close the panel
secondary mouse button can activate
secondary pointer can activate
visible curved control and logical hit rectangle can disagree
public PhantomMenu activation has no capability/source identity
```

## Test gaps

```txt
main row center hits
main row gap misses
empty canvas misses
wide/tall letterbox misses
settings row center hits
settings row gap misses
CRT forward/inverse geometry
primary/secondary pointer policy
stale resize/DPR rejection
duplicate sequence rejection
zero settings/storage/audio/navigation mutation after miss
keyboard/accessibility parity
source/build/Pages parity
```

## Retained campaign gaps

```txt
Campaign Bootstrap and Continue Resume Authority
Campaign Action Result Authority
Campaign World-Pointer Admission Authority
Public Host Owner Quarantine and Typed Command Admission
Campaign Phase Admission Authority
Fixed-Step Command Scheduling Replay and Committed Frame Authority
Public Host Committed Read Model
Combat Resolution and Entity Liveness Authority
Exclusive Terminal Outcome Transaction
Versioned Full Campaign Checkpoint Capture Authority
```

## Retained lifecycle/product gaps

```txt
Runtime Session Resource Lifecycle Authority
CRT Display/Input Projection Authority
Menu Audio Activation and Lifecycle Authority
WebGL context loss/restore and disposal
save schema, migration and atomic hydration
complete campaign replay and restored-frame proof
```

## Completion boundary

Do not count a selected menu item, `inside` boolean, integer hit index, visible highlight or successful route transition as pointer-admission proof. Completion requires current visible-geometry hit evidence, typed rejection with zero mutation for every miss/stale path, one terminal action result and a first-visible-frame acknowledgement.