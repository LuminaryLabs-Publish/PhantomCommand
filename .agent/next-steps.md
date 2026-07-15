# PhantomCommand Next Steps

**Timestamp:** `2026-07-15T03-24-35-04-00`

## Summary

Implement Device Control Action Coverage Authority before claiming touch or hybrid-device playability. Keep current keyboard and mouse behavior as adapters, but route every producer through semantic campaign commands and add a visible touch profile that covers the complete loop.

## Plan ledger

**Goal:** replace modality-bound direct mutation with complete, versioned device profiles and typed action settlement.

- [ ] Add `RequiredActionManifest` for selection, order, construction, wave, camera, pause and terminal actions.
- [ ] Add `DeviceCapabilityProfile` for keyboard, fine pointer, coarse pointer, touch, hover and hybrid states.
- [ ] Add versioned `ControlProfileDescriptor` and `ControlGeneration` identities.
- [ ] Convert keyboard, pointer and wheel listeners into adapters that emit semantic commands.
- [ ] Add a responsive touch control layer for wave start, order mode, tower choice, pan, zoom, pause, restart, exit and focus.
- [ ] Preserve tap and box selection while preventing selection/pan/order conflicts.
- [ ] Add pinch cancellation, pointer-cancel settlement and synthetic-mouse duplicate suppression.
- [ ] Add explicit build confirmation rather than relying only on repeated pad selection.
- [ ] Publish `DeviceControlAdmissionResult` with required and covered actions.
- [ ] Publish one typed result for every campaign and camera action.
- [ ] Add `FirstDeviceControlSurfaceFrameAck`.
- [ ] Add `FirstDeviceActionEffectFrameAck`.
- [ ] Execute keyboard/mouse, touch-only and hybrid browser matrices.
- [ ] Run the same matrix against source, built output and GitHub Pages.

## Completion gate

```txt
one route revision
one device-capability revision
one admitted control profile
complete required-action coverage
one active gesture owner per pointer sequence
one terminal result per semantic command
one matching Canvas2D and CRT action-effect frame
```

Do not claim mobile or touch playability until the complete gate passes on a real or emulated touch browser.