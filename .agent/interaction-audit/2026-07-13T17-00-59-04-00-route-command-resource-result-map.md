# Route Command Resource Result Map

**Timestamp:** `2026-07-13T17-00-59-04-00`

## Summary

Navigation commands currently mutate module-local transition fields or call browser location APIs directly. They do not return typed command, retirement or navigation results.

## Plan ledger

**Goal:** map every route command to one terminal result and all required participant receipts.

- [x] Map menu Begin Campaign and Continue.
- [x] Map campaign Escape and restart.
- [x] Map RAF, listener, audio, WebGL and public-host participants.
- [x] Define stale and duplicate rejection.
- [ ] Implement later.

## Command map

```txt
BeginCampaign | Continue | ExitToMenu | RestartCampaign
  -> RouteTransitionCommand
  -> duplicate and stale admission
  -> input-admission freeze receipt
  -> RAF lease retirement receipt
  -> event-listener retirement receipt
  -> audio retirement receipt
  -> CRT disposal receipt
  -> public-host retirement receipt
  -> navigation attempt result
  -> successor route generation
  -> FirstRouteFrameAck
```

## Required rejection reasons

```txt
DuplicateTransition
StaleSourceGeneration
AlreadyRetired
ResourceRetirementFailed
NavigationRejected
NavigationTimedOut
SuccessorStartupFailed
```
