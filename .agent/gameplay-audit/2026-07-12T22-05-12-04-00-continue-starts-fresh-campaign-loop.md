# Continue Starts a Fresh Campaign Loop

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Timestamp:** `2026-07-12T22-05-12-04-00`

## Summary

Continue is currently a route label, not a gameplay operation. The menu enables it from raw storage presence, but the campaign never reads the route intent or checkpoint and always starts at wave 0 with the default economy, core, units and camera.

## Plan ledger

**Goal:** isolate the exact gameplay divergence between advertised continuation and installed campaign state.

- [x] Trace menu save detection.
- [x] Trace New and Continue URLs.
- [x] Trace campaign initialization.
- [x] Trace the only save writer.
- [x] Enumerate omitted checkpoint participants.
- [x] Define zero-mutation failure and successful resume outcomes.
- [ ] Implement and execute resume proof later.

## Exact failure loop

```txt
player finishes campaign
  -> localStorage phantomCommand.save = { scene, souls, wave }
  -> returns to menu later
  -> menu detects non-empty string
  -> Continue becomes enabled
  -> player activates Continue
  -> browser opens game.html?campaign=continue
  -> campaign ignores query and storage
  -> state starts at wave=0, souls=145, core=24
  -> six starting allies are created
  -> player sees a new campaign under a Continue action
```

The same mismatch can occur with malformed or foreign save strings because presence is not validity.

## State lost or silently replaced

```txt
campaign time and fixed-step boundary
souls and core
wave, waveActive and spawn queue
unit roster, HP, targets, moves and animation state
towers, types, cooldowns and pad occupancy
projectiles and effects
uid, pid and tid counters
selection, selected pad and tower type
camera position, velocity, zoom and target zoom
pause, win, loss and message state
run/checkpoint identity and source fingerprint
```

The existing three-field victory record is not sufficient to reconstruct these participants.

## Semantic outcomes required

```txt
NewCommitted
RestoredCommitted
ContinueUnavailable
CheckpointMalformed
CheckpointUnsupported
CheckpointIncompatible
CheckpointInvariantFailed
BootstrapStale
BootstrapDuplicate
BootstrapRolledBack
```

`ContinueUnavailable` and every failure result must create zero gameplay mutation. They must not impersonate success by starting a fresh run.

## Gameplay invariants

```txt
New begins from one authored preset
Continue begins from one validated checkpoint
resume preserves all declared durable participants
transient reset policy is explicit and deterministic
entity references and ID counters remain valid
wave phase and spawn queue remain coherent
pad occupancy and towers remain reciprocal
camera and selection cannot reference missing state
first simulation step follows the restored fixed-step boundary
```

## Validation boundary

No gameplay behavior changed. No new-run, continue, invalid-save or roundtrip fixture was run.