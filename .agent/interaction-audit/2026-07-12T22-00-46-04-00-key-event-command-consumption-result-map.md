# Key Event Command Consumption Result Map

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Timestamp:** `2026-07-12T22-00-46-04-00`

## Summary

The campaign currently maps DOM keyboard events directly to a held Set or immediate mutations. This map introduces explicit admission, command and consumption result boundaries.

## Plan ledger

**Goal:** turn every keyboard event into either a typed zero-mutation rejection or one identified held-state/one-shot result.

- [x] Map current event-to-effect paths.
- [x] Add route, focus, repeat and lifecycle admission stages.
- [x] Add held-state and one-shot result branches.
- [x] Add consumer and visible-frame receipts.
- [ ] Implement later.

## Current map

```txt
keydown
  -> normalize key
  -> add to held Set
  -> optional direct mutation
  -> undefined result

keyup
  -> remove from held Set
  -> undefined result

blur
  -> clear keys and pointer flags
  -> undefined result
```

## Required map

```txt
KeyboardEventEnvelope
  -> RouteSurfaceAdmissionResult
  -> FocusEditableTargetAdmissionResult
  -> RepeatPolicyResult
  -> GenerationSequenceAdmissionResult

held key
  -> HeldStateTransitionResult
  -> CameraInputConsumptionReceipt

one-shot key
  -> CampaignKeyboardCommand
  -> CampaignActionResult / CameraCommandResult / NavigationResult

all branches
  -> CampaignKeyboardResult
  -> KeyboardObservation + bounded journal
  -> first visible frame acknowledgement when accepted
```

## Rejection reasons

```txt
inactive-route
retired-surface
focus-not-owned
editable-target
unsupported-key
repeat-not-admitted
stale-generation
duplicate-command
lifecycle-closed
consumer-rejected
```

## Zero-mutation rule

Every rejected event must leave held keys, pause, wave state, tower type, camera, location and render-correlated revisions unchanged.

## Validation boundary

No input dispatcher or typed result currently exists. This file defines the target map only.