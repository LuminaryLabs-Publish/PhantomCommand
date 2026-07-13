# Route Transition Visible Frame Gap

**Timestamp:** `2026-07-13T17-00-59-04-00`

## Summary

The menu fades to black while its RAF and CRT draw loop continue, then assigns `location.href`. Campaign exit and reload also replace the document directly. The outgoing route has no disposal frame, navigation result or proof that the successor route produced a visible frame.

## Plan ledger

**Goal:** correlate the final outgoing frame, resource retirement, navigation and the first visible successor frame.

- [x] Trace menu fade and CRT submission.
- [x] Trace campaign exit and reload.
- [x] Record missing route and frame identities.
- [x] Define terminal projection states.
- [ ] Implement and prove later.

## Current gap

```txt
outgoing Frame N
  -> fade progresses
  -> CRT resources remain active
  -> location navigation begins
  -> no RouteTransitionResult
  -> no final-retirement frame fingerprint
  -> no FirstRouteFrameAck from successor
```

## Required frame envelope

```txt
RouteFrameEnvelope
  routeGeneration
  transitionId
  sourceFrameId
  retirementState
  navigationState
  fallbackState
  successorGeneration
```

## Terminal results

```txt
Complete
Partial
Failed
Cancelled
Superseded
TimedOut
```

A complete route transition requires a final accepted outgoing projection or route-independent fallback and a matching first visible successor frame.
