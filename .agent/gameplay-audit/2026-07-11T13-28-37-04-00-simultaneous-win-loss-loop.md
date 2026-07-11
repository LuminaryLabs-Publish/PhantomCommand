# Simultaneous Win/Loss Gameplay Loop

**Timestamp:** `2026-07-11T13-28-37-04-00`

## Summary

The fixed update can admit defeat during enemy movement and victory during wave completion. Because both branches mutate shared terminal booleans independently, the final-wave breach case produces a contradictory terminal state.

## Plan ledger

**Goal:** isolate the exact gameplay ordering that permits simultaneous outcomes and define the atomic replacement.

- [x] Trace enemy core approach.
- [x] Trace core damage and enemy deletion.
- [x] Trace remaining subsystem updates.
- [x] Trace wave-clear and final-wave completion.
- [x] Trace victory persistence.
- [ ] Replace mutation sites with evidence and arbitration.

## Current loop

```txt
update(1/60)
  -> spawn processing
  -> Object.values(state.units).forEach(updateUnit)
       enemy moves toward center
       if center reached:
         core -= enemy.core
         delete enemy
         if core <= 0:
           core = 0
           lost = true
           loss message
  -> update towers
  -> update projectiles
  -> update effects
  -> if waveActive and spawn empty and enemies empty:
       waveActive = false
       wave += 1
       souls reward
       if wave >= waves.length:
         won = true
         victory message
         write victory save
```

## Reachable fixture state

```txt
core: 1
wave: waves.length - 1
waveActive: true
spawn: []
units: exactly one enemy at breach threshold
```

One fixed update can yield:

```txt
core: 0
wave: waves.length
lost: true
won: true
```

## Why the current early return does not help

`update()` returns early only when `lost` or `won` was already true at the beginning of the tick. Defeat is admitted after that check, so the rest of the current tick still executes.

## Required replacement

```txt
subsystem updates
  -> emit domain evidence only
  -> no won/lost mutation

end-of-tick terminal evaluator
  -> read complete post-combat facts
  -> evaluate defeat and victory
  -> arbitrate exactly one outcome
  -> commit once
  -> latch for run epoch
```

## Priority policy

```txt
if coreHealth <= 0:
  DEFEAT
else if final wave clear:
  VICTORY
else:
  ACTIVE
```

## Compatibility projections

Legacy booleans may remain temporarily as derived read-only fields:

```txt
won = terminalOutcome === VICTORY
lost = terminalOutcome === DEFEAT
```

They must never be independent mutation targets.

## Gameplay fixture matrix

```txt
non-final breach -> defeat
final clear, core positive -> victory
final breach, last enemy -> defeat
final clear and delayed projectile -> declared policy
multiple breach events in one tick -> one defeat result
repeated terminal evaluation -> idempotent result
post-terminal command -> rejected by phase admission
```