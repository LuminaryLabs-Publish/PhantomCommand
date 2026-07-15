# Menu Audio Command and Result Map

**Timestamp:** `2026-07-15T13-41-25-04-00`

## Summary

Current input handlers call mutable audio helpers directly. Required commands must bind gesture, policy, route and generation identities and terminate with immutable results.

## Plan ledger

**Goal:** define exactly-once interaction admission for audio unlock, cues and settlement.

- [x] Map pointer and keyboard producers.
- [x] Map settings and route producers.
- [x] Define command and result identities.
- [ ] Implement admission and idempotency.

## Command map

```txt
pointerdown or keydown
  -> MenuAudioUnlockCommand
     AudioPolicyRevision
     PreferenceRevision
     GestureId
  -> MenuAudioUnlockResult

selection move activate panel or route action
  -> MenuAudioProjectionCommand
     AudioContextGeneration
     CueId
     InteractionRevision
  -> MenuAudioProjectionResult

ambience toggle visibility change pagehide or route transition
  -> MenuAudioSettlementCommand
     AudioContextGeneration
     SettlementReason
     ExpectedRouteRevision
  -> MenuAudioSettlementResult
```

## Rejection classes

```txt
unsupported
not-unlocked
suspended-unresumable
stale-generation
duplicate-cue
preference-disabled
route-retired
page-retired
already-settled
```

## Acknowledgements

```txt
FirstAudibleMenuFrameAck
FirstSilentRouteTransitionAck
```

No commands or runtime results were implemented.