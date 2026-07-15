# Device Control Action Coverage DSK Map

**Timestamp:** `2026-07-15T03-24-35-04-00`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

PhantomCommand has a coherent campaign simulation but no device-neutral command admission layer. Browser listeners mutate campaign and camera state directly, and required actions are distributed across keyboard keys, pointer buttons and the mouse wheel. This audit defines a future DSK authority that preserves those inputs while adding complete touch and hybrid-device coverage.

## Plan ledger

**Goal:** place device capability, control-surface ownership, gesture arbitration and semantic campaign commands behind one composable authority boundary.

- [x] Identify current input producers and mutation targets.
- [x] Separate semantic actions from browser event details.
- [x] Define device-profile and action-manifest services.
- [x] Define visible-control and action-effect acknowledgements.
- [ ] Implement the DSK family.
- [ ] Convert direct listeners into adapters.
- [ ] Add deterministic browser fixtures.

## Current architecture

```txt
browser keyboard events
  -> direct campaign, camera, route and pause mutation

canvas pointer events
  -> inspect e.button
  -> direct selection, drag, camera pan or unit-order mutation

canvas wheel events
  -> direct camera zoom mutation

GameHost methods
  -> direct wave, build and zoom mutation

fixed-step simulation and RAF
  -> consume already-mutated state
  -> draw Canvas2D
  -> present through CRT
```

## Required parent domain

```txt
phantom-command-device-control-action-coverage-authority-domain
```

## Planned DSK surfaces

| Planned kit | Services |
|---|---|
| `device-capability-profile-kit` | Detect and normalize keyboard, mouse, touch, hover, coarse-pointer and hybrid capabilities. |
| `required-action-manifest-kit` | Declare the complete campaign action set and required coverage by route/state. |
| `control-profile-descriptor-kit` | Describe keyboard/mouse, touch and hybrid control profiles. |
| `control-generation-kit` | Assign document, route, viewport and control-generation identity. |
| `touch-control-surface-kit` | Produce semantic visible controls for touch-required actions. |
| `pointer-gesture-arbitration-kit` | Own active pointers and distinguish selection, box-select, pan, zoom and order gestures. |
| `camera-pan-action-kit` | Normalize keyboard, mouse and touch camera-pan intent. |
| `camera-zoom-action-kit` | Normalize wheel, pinch and visible zoom-control intent. |
| `unit-selection-action-kit` | Normalize tap, click and box selection. |
| `unit-order-action-kit` | Normalize right-click and touch order/attack intent. |
| `tower-type-selection-action-kit` | Normalize number keys and touch tower-choice controls. |
| `tower-build-action-kit` | Normalize explicit build confirmation and pad identity. |
| `wave-start-action-kit` | Normalize Space and touch wave-start controls. |
| `pause-action-kit` | Normalize keyboard and visible pause controls. |
| `restart-action-kit` | Normalize reload/retry through an explicit command result. |
| `route-exit-action-kit` | Normalize Escape/back navigation with route ownership. |
| `camera-focus-action-kit` | Normalize focus-selection intent. |
| `command-idempotency-kit` | Reject duplicate, stale and superseded action commands. |
| `device-control-result-kit` | Publish admission, rejection and action-coverage receipts. |
| `first-control-surface-frame-ack-kit` | Prove the admitted controls are visibly projected. |
| `first-action-effect-frame-ack-kit` | Prove a command result reaches simulation and presentation. |
| `device-control-fixture-kit` | Execute touch-only, keyboard/mouse and hybrid browser matrices. |

## Semantic action contract

```txt
CampaignActionCommand
  commandId
  routeRevision
  campaignRevision
  controlGeneration
  actorId
  actionType
  actionPayload
  sourceProfile
  pointerOrKeyReceipt

CampaignActionResult
  accepted | rejected | duplicate | stale | unavailable
  resultingCampaignRevision
  resultingCameraRevision
  affectedEntities
  controlProfileReceipt
  rejectionReason
```

## Admission flow

```txt
DeviceControlAdmissionCommand
  -> resolve device capabilities
  -> load required action manifest
  -> choose compatible control profiles
  -> verify complete action coverage
  -> prepare DOM and canvas producers
  -> settle gesture ownership
  -> publish DeviceControlAdmissionResult
  -> project controls
  -> publish FirstDeviceControlSurfaceFrameAck

accepted input
  -> translate browser event or visible control into CampaignActionCommand
  -> validate route, state, target and command identity
  -> settle one semantic result
  -> update simulation or camera through owned services
  -> publish FirstDeviceActionEffectFrameAck
```

## Domain boundaries

```txt
browser adapters own:
  keyboard events
  pointer events
  wheel events
  touch and gesture events
  DOM control activation

control authority owns:
  device classification
  control profile selection
  action coverage
  gesture arbitration
  command identity and results

campaign domains own:
  selection
  unit orders
  tower choice and construction
  wave start
  pause and terminal commands

presentation domains own:
  visible controls
  HUD state
  action feedback
  first matching frame evidence
```

## Validation gate

No device profile is admitted unless every required action has at least one reachable producer and the accepted profile has both a visible-control acknowledgement and an action-effect acknowledgement.