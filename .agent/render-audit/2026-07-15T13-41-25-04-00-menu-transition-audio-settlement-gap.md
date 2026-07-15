# Menu Transition Audio Settlement Gap

**Timestamp:** `2026-07-15T13-41-25-04-00`

## Summary

The menu has a versionless visual transition and a separate versionless audio graph. The Canvas2D/WebGL fade can complete and navigation can begin without an audio settlement result or a matching silent acknowledgement.

## Plan ledger

**Goal:** bind the accepted menu transition, final visual frame and audio settlement to one route revision.

- [x] Trace `beginTransition()` through fade and navigation.
- [x] Trace persistent audio ownership during the same interval.
- [x] Record missing audiovisual convergence evidence.
- [ ] Add executable browser proof.

## Current path

```txt
menu action
  -> beginTransition(url)
  -> play transition tone
  -> animate fade in RAF
  -> assign window.location.href

parallel audio state
  -> persistent drone remains started
  -> persistent wind remains started
  -> no route-settlement command
  -> no silent acknowledgement
```

## Missing evidence

```txt
RouteRevision
AudioContextGeneration
MenuTransitionFrameRevision
MenuAudioSettlementResult
FirstSilentRouteTransitionAck
stale transition rejection
source/build/Pages browser fixture
```

This is a source-backed coordination gap. No audible overlap or visible defect was reproduced.