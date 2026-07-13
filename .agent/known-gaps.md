# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T22-00-46-04-00`

## Summary

The leading keyboard gap is Campaign Keyboard Command Admission Authority. Global listeners accept held and one-shot keys without current route/focus evidence, editable-target exclusion, repeat policy, lifecycle generations, command identity, consumer receipts or visible-frame proof.

## Plan ledger

**Goal:** close keyboard ownership, repeat, generation, result and proof gaps while preserving spatial-input, campaign-action, lifecycle and persistence boundaries.

- [x] Record global route/focus ownership gaps.
- [x] Record editable-target and repeat-policy gaps.
- [x] Record keyboard generation and lifecycle gaps.
- [x] Record command identity, result and receipt gaps.
- [x] Record browser, build and Pages proof gaps.
- [x] Preserve prior authority queues.
- [ ] Implement in dependency order.

## Route and focus gaps

```txt
campaign keyboard surface ID
active route capability
keyboard session generation
focus generation
canvas/document focus policy
editable-target exclusion
surface retirement
listener lease and teardown
```

## Event and repeat gaps

```txt
keyboard event envelope
source event ID
monotonic sequence
physical code versus logical key policy
held versus one-shot classification
event.repeat policy
one-shot command ID
duplicate command rejection
stale generation rejection
```

## Held-state lifecycle gaps

```txt
generation-bound held-state revision
typed key-down and key-up results
typed clear result
blur generation retirement
visibilitychange generation retirement
pagehide teardown
pageshow successor generation
stale keyup rejection
exactly-once listener retirement
```

## One-shot command gaps

```txt
Space wave command result
1/2/3 tower-selection command result
P pause command result
F camera-focus command result
R reload navigation result
Escape menu navigation result
Campaign Action Result correlation
camera/phase/navigation consumption receipts
zero-mutation rejection proof
```

## Concrete current risks

```txt
holding P can toggle pause repeatedly
future focused form/editor controls can trigger campaign shortcuts
inactive or transitioning route can still receive global keys
blur clears held state but retires no event generation
late keyup can be interpreted without lifecycle identity
reload and navigation have no exactly-once terminal result
accepted effects cannot be correlated with the visible CRT frame
```

## Result and render gaps

```txt
CampaignKeyboardCommand
CampaignKeyboardResult
typed rejection reasons
bounded keyboard observation
bounded keyboard journal
campaign/camera/navigation consumption receipts
source-frame and CRT-presented-frame correlation
first visible keyboard-result frame acknowledgement
stale result/frame rejection
```

## Test gaps

```txt
pause auto-repeat exactly-once
wave/tower/focus/navigation repeat rejection
editable-target zero mutation
inactive route zero mutation
blur and visibility generation retirement
pagehide/pageshow lifecycle
stale keyup zero mutation
held movement release
duplicate command ID
listener teardown
source/build/Pages parity
first visible keyboard-result frame
```

## Retained campaign gaps

```txt
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
Versioned Full Campaign Checkpoint Capture Authority
Campaign Bootstrap and Continue Resume Authority
```

## Retained lifecycle/product gaps

```txt
Runtime Session Resource Lifecycle Authority
Menu Audio Activation and Lifecycle Authority
WebGL context loss/restore and disposal
save schema, migration and atomic hydration
complete campaign replay and restored-frame proof
```

## Completion boundary

A held-key Set, blur clear, changed pause flag or moved camera is not keyboard admission proof. Completion requires current route/focus and generation evidence, repeat/duplicate/stale classification, one terminal result, consumer receipts, zero mutation for rejection and a first-visible-frame acknowledgement.