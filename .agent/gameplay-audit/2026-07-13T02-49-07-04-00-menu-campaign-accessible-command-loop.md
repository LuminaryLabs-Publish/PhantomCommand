# Menu and Campaign Accessible Command Loop

**Timestamp:** `2026-07-13T02-49-07-04-00`

## Summary

The game has a complete visual interaction loop but no complete accessible gameplay loop. The menu has hidden buttons without shared focus/selection authority, and the campaign exposes instructions without dynamic command or status projection.

## Plan ledger

**Goal:** map the playable loop from an accessible command source through game mutation and accessible result.

- [x] Trace menu activation.
- [x] Trace panel actions.
- [x] Trace campaign commands and HUD state.
- [x] Identify missing results and progression feedback.
- [ ] Add executable accessible gameplay fixtures.

## Current loop

```txt
menu
  -> visual or hidden control activation
  -> possible duplicate/divergent command attempts
  -> visual fade/navigation
  -> no typed accessible result

campaign
  -> global key/pointer command
  -> mutable game state
  -> fixed-step simulation
  -> canvas HUD and terminal overlay
  -> no dynamic accessible state
```

## Required loop

```txt
AccessibleCommand
  -> exact command admission
  -> gameplay result
  -> committed game revision
  -> visual projection
  -> bounded accessible projection
  -> matching acknowledgements
```

## Required campaign status fields

```txt
route and run generation
paused/won/lost
souls and sanctum health
wave index and wave-active state
selected tower type
selection/build/order result
current message
status revision
```
