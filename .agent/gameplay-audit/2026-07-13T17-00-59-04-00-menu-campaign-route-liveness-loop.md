# Menu Campaign Route Liveness Loop

**Timestamp:** `2026-07-13T17-00-59-04-00`

## Summary

The game has a live menu loop and a live campaign loop, but no application-level owner transitions between them. Route replacement is expected to terminate all predecessor activity.

## Plan ledger

**Goal:** preserve menu and campaign gameplay semantics while making route replacement deterministic and observable.

- [x] Record menu boot and transition behavior.
- [x] Record campaign boot, Escape exit and R restart behavior.
- [x] Record predecessor liveness during navigation.
- [x] Define bounded continuation and failure policy.
- [ ] Implement later.

## Loop

```txt
menu active
  -> input audio art CRT RAF
  -> transition requested
  -> fade while predecessor remains live
  -> location assignment
  -> implicit teardown

campaign active
  -> input camera simulation Canvas2D CRT RAF
  -> Escape or R
  -> location assignment or reload
  -> implicit teardown
```

## Gameplay policy requirement

Once a route transition is admitted, new gameplay-affecting commands must be rejected for the retiring generation. The last accepted state must remain stable while resources retire. A failed navigation must either restore the predecessor generation under a typed result or show a route-independent failure state.
