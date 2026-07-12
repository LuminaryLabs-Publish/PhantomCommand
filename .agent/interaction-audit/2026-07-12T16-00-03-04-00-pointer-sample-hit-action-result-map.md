# PhantomCommand Pointer Sample, Hit and Action Result Map

**Timestamp:** `2026-07-12T16-00-03-04-00`

## Summary

The current listener converts one raw pointer-down directly into a menu action after a non-terminal hit test. The required interaction model separates physical input, geometry projection, hit evidence, action admission and visible acknowledgement.

## Plan ledger

**Goal:** define terminal results for every pointer path and require zero mutation for all rejected paths.

- [x] Enumerate pointer and non-pointer sources.
- [x] Enumerate containment, hit, policy and transition outcomes.
- [x] Define command and result identities.
- [x] Define stale and duplicate rejection.
- [x] Define first-frame acknowledgement.
- [ ] Implement and execute the map.

## Source kinds

```txt
Pointer
Keyboard
AccessibilityControl
PublicHost
```

`PublicHost` refers to `window.PhantomMenu.activate`; it must be capability-admitted rather than treated as implicit user input.

## Pointer pipeline

```txt
RawPointerEvent
  -> PointerSampleResult
  -> PointerPolicyResult
  -> PointerProjectionResult
  -> MenuContainmentResult
  -> MenuHitTestResult
  -> MenuActionAdmissionResult
  -> MenuActionResult
  -> MenuVisibleFrameAck
```

## Terminal path map

| Path | Required terminal result | Mutation allowed |
|---|---|---|
| primary pointer, current transform, current hit, idle transition | `Committed` | named action only |
| outside contained source | `RejectedOutsideSurface` | none |
| inside source but no control | `RejectedMiss` | none |
| non-primary button | `RejectedPointerPolicy` | none |
| secondary pointer | `RejectedPointerPolicy` | none |
| stale surface/transform/layout/panel | `RejectedStale` | none |
| unsupported CRT inverse | `RejectedUnsupportedTransform` | none |
| repeated physical sequence | `RejectedDuplicate` | none |
| route transition already committed | `RejectedTransition` | none |
| disabled Continue | `RejectedDisabled` | optional rejection feedback only |
| keyboard Enter/Space | `Committed` or semantic rejection | selected control, explicit source |
| hidden accessible button | `Committed` or semantic rejection | named control, explicit source |
| public host call | `Committed` or `RejectedCapability` | named control only after admission |

## Command envelope

```txt
MenuActionCommand {
  commandId
  inputSource
  pointerSampleId
  pointerSequenceId
  hitResultId
  surfaceGeneration
  transformRevision
  layoutRevision
  panelGeneration
  controlId
  actionId
  expectedMenuRevision
  expectedTransitionRevision
}
```

Pointer fields are nullable only for non-pointer sources. A pointer-sourced command without `status=Hit` evidence is structurally invalid.

## Result envelope

```txt
MenuActionResult {
  status
  reason
  commandId
  inputSource
  controlId
  actionId
  predecessorMenuRevision
  menuRevision
  predecessorPanelGeneration
  panelGeneration
  predecessorTransitionRevision
  transitionRevision
  settingsRevision
  firstFrameReceiptId
}
```

## Idempotency

```txt
same pointerSequenceId + same command -> return original terminal result
same pointerSequenceId + different command -> RejectedDuplicateConflict
stale expected revision -> RejectedStale
transition already committed -> RejectedTransition
```

## Observation

A detached observation may expose:

```txt
last pointer projection status
last hit status and control id
last action result status
current menu/panel/transition revisions
bounded rejection counts by reason
first visible acknowledgement
```

It must not expose mutable owners or callable route functions.

## Completion boundary

Every raw input path must terminate in one typed result. Pointer miss and outside-surface paths must be executable fixtures that prove zero selection, settings, panel, audio and navigation mutation.