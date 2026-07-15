# PhantomCommand Known Gaps

**Timestamp:** `2026-07-15T13-41-25-04-00`

## Summary

Menu audio resources are created and mutated through local helpers without generation identity, context-state admission, route/visibility settlement, exact retirement or browser proof.

## Plan ledger

**Goal:** keep unresolved menu-audio policy, ownership, lifecycle and evidence gaps explicit.

- [x] Record source-backed audio lifecycle gaps.
- [x] Separate source evidence from unexecuted browser claims.
- [ ] Close each gap with implementation and executable proof.

## Gaps

```txt
menu audio policy revision: absent
AudioContext generation identity: absent
browser capability result: absent
accepted unlock result: absent
existing suspended-context resume: absent
context state observer: absent
persistent ambience source leases: absent
transient cue leases: absent
cue idempotency: absent
ambience and UI-cue policy separation: absent
visibility settlement policy: absent
route-transition settlement: absent
pagehide retirement: absent
source stop receipts: absent
source disconnect receipts: absent
context close receipt: absent
delayed-close generation binding: absent
late callback rejection: absent
MenuAudioUnlockResult: absent
MenuAudioProjectionResult: absent
MenuAudioSettlementResult: absent
FirstAudibleMenuFrameAck: absent
FirstSilentRouteTransitionAck: absent
browser lifecycle fixture: absent
source/build/Pages audio parity: absent
```

## Source-backed mismatch

```txt
present:
  AudioContext creation
  master gain
  persistent drone
  looping wind
  transient UI tones
  settings-triggered delayed close

missing:
  explicit resume for an existing suspended context
  route and visibility settlement
  exact source retirement
  callback generation ownership
  immutable lifecycle results
  audible and silent acknowledgements
```

`ensureAudio()` returns whenever `state.audio` exists, regardless of context state. `stopAmbience()` is reached only from the settings toggle and schedules an unversioned delayed close. New and Continue navigate after a visual fade without an explicit audio settlement command.

## Retained gaps

Earlier public-capability, device-control, render-order, pause, terminal-outcome, startup, settings, save, lifecycle, scheduler, WebGL, accessibility, spatial-input, keyboard-input and combat-modifier gaps remain active until implemented and proven.