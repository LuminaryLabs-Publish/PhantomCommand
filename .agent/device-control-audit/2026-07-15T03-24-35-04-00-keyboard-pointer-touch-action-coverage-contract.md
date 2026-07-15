# Keyboard, Pointer and Touch Action Coverage Contract

**Timestamp:** `2026-07-15T03-24-35-04-00`

## Summary

The campaign currently assumes keyboard plus multi-button mouse and wheel. This contract defines the minimum action coverage required before a keyboard/mouse, touch-only or hybrid device profile may be treated as playable.

## Plan ledger

**Goal:** admit device profiles through capabilities and semantic action coverage rather than through incidental browser-event availability.

- [x] Define required actions.
- [x] Define profile-specific producers.
- [x] Define gesture conflict rules.
- [x] Define visibility and effect acknowledgements.
- [ ] Implement profile descriptors and adapters.
- [ ] Execute the device matrix.

## Required action manifest

| Action | Keyboard/mouse producer | Touch producer required |
|---|---|---|
| Select unit or pad | Primary click | Tap |
| Add/remove selection | Shift + click | Explicit multi-select mode or additive gesture |
| Box-select | Primary drag | Selection drag with owned gesture mode |
| Move or attack order | Secondary click | Order mode plus tap, or explicit order control |
| Pan camera | WASD/arrows or middle drag | Dedicated pan gesture or controls |
| Zoom camera | Wheel | Pinch or visible zoom controls |
| Focus selection | F | Visible focus control |
| Choose tower type | 1, 2, 3 | Visible tower-choice controls |
| Build tower | Pad reactivation | Explicit build confirmation |
| Start wave | Space | Visible wave-start control |
| Pause/resume | P | Visible pause control |
| Restart | R | Visible terminal retry control |
| Exit | Escape | Visible back/menu control |

## Control profile descriptors

```txt
KeyboardMouseProfile
  requires keyboard
  requires fine pointer
  requires secondary action producer
  requires zoom producer

TouchOnlyProfile
  requires coarse pointer and touch
  requires visible campaign controls
  requires explicit gesture ownership
  requires safe-area projection

HybridProfile
  combines both profiles
  de-duplicates commands by commandId and pointer/key sequence
  retires stale control generations after capability or viewport change
```

## Gesture contract

```txt
one active gesture owns each pointer sequence

possible owners:
  selection tap
  selection box
  camera pan
  camera pinch zoom
  order targeting
  control activation

rules:
  no gesture may both select and pan
  no gesture may both build and order
  pinch must cancel pending taps
  pointercancel must retire pending command candidates
  orientation change must retire the predecessor control generation
  synthetic mouse events after touch must not duplicate commands
```

## Admission result

```txt
DeviceControlAdmissionResult
  profileId
  profileRevision
  controlGeneration
  requiredActions
  coveredActions
  unavailableActions
  conflictPolicyRevision
  visibleSurfaceExpected
  status
```

## Acceptance gate

A profile is playable only when `unavailableActions` is empty and the visible control generation has a matching frame acknowledgement. A profile must be rejected or shown a clear unsupported-device state rather than silently admitting an incomplete campaign loop.