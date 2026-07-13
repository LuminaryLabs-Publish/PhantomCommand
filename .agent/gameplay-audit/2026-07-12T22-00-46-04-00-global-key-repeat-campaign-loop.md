# Global Key Repeat Campaign Loop

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Timestamp:** `2026-07-12T22-00-46-04-00`

## Summary

Campaign keyboard handling combines continuous held movement and one-shot actions in one global keydown path. Held movement is naturally Set-based, but pause, wave, tower selection, reload, menu navigation and camera focus execute immediately for every admitted keydown event.

## Plan ledger

**Goal:** separate held-state transitions from exactly-once gameplay commands and lifecycle-safe navigation.

- [x] Inventory continuous and one-shot keys.
- [x] Trace repeat-sensitive effects.
- [x] Trace blur and route lifecycle behavior.
- [x] Define typed consumer receipts.
- [ ] Implement command separation later.

## Current key map

```txt
held movement:
  W/A/S/D
  Arrow keys

one-shot campaign/camera actions:
  Space -> startWave
  1/2/3 -> select tower type
  P -> toggle pause
  F -> focus camera and set target zoom

one-shot lifecycle/navigation actions:
  R -> location.reload
  Escape -> navigate to ./
```

## Repeat-sensitive path

```txt
keydown P
  -> add p to held Set
  -> paused = !paused
  -> repeated keydown P
  -> paused = !paused again
  -> final phase depends on repeat count
```

Space re-enters `startWave()` on repeat, relying on live-state guards rather than command deduplication. Reload, navigation and focus similarly lack command identity and exactly-once terminal results.

## Gameplay consequences

```txt
pause state can oscillate during one physical hold
commands remain active without canvas focus proof
future focused controls can trigger campaign shortcuts
held movement has no generation after blur/visibility transitions
phase and camera consumers publish no admission receipt
```

## Required consumption order

```txt
admitted held-state transition
  -> generation-bound held snapshot
  -> camera consumption receipt

admitted one-shot command
  -> Campaign Action Result Authority
  -> phase/camera/navigation receipt
  -> visible successor-frame acknowledgement
```

## Validation boundary

No gameplay behavior changed. No auto-repeat, focus or lifecycle fixture was executed.