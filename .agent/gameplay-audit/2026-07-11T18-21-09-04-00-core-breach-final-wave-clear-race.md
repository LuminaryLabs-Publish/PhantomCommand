# Gameplay Audit: Core Breach and Final-Wave Clear Race

**Timestamp:** `2026-07-11T18-21-09-04-00`

## Summary

A final enemy can satisfy defeat and victory conditions in the same fixed update. The breaching enemy deletes itself after reducing the sanctum to zero; the later wave-clear predicate then observes an empty enemy set and completes the final wave.

## Plan ledger

**Goal:** preserve the exact gameplay reproduction and define the evidence handoff required to eliminate contradictory terminal mutation.

- [x] Trace enemy movement to the sanctum.
- [x] Trace core damage and enemy deletion.
- [x] Trace remaining update phases.
- [x] Trace final-wave reward, message and save write.
- [ ] Replace mutation with typed evidence and exclusive arbitration.

## Reproduction

```txt
state.wave = waves.length - 1
state.waveActive = true
state.spawn = []
state.core <= finalEnemy.core
state.units contains one final enemy
finalEnemy is within the sanctum stop radius
```

One fixed update:

```txt
updateUnit(finalEnemy)
  -> moveToward core returns true
  -> core becomes zero
  -> delete finalEnemy
  -> lost = true
  -> defeat message assigned

update continues
  -> towers and projectiles update
  -> effects update
  -> waveActive && no spawn && no enemies
  -> waveActive = false
  -> wave increments to waves.length
  -> souls reward granted
  -> won = true
  -> victory message assigned
  -> localStorage victory summary written
```

## Gameplay consequences

```txt
destroyed sanctum can be reported as secured
player can receive final clear reward after defeat evidence
menu can later detect a victory save from a defeated run
terminal overlay hides the contradictory defeat flag
checkpoint work would serialize an ambiguous outcome
replay cannot explain which terminal condition won
```

## Required gameplay change

```txt
combat phase
  -> emit CoreBreachEvidence and FinalWaveClearEvidence
  -> commit CombatResolutionResult

terminal phase
  -> arbitrate evidence once
  -> commit TerminalOutcomeResult
  -> apply only effects allowed by that result
```

## Policy-sensitive effects

```txt
wave index advancement
final-wave souls reward
victory message
victory persistence
allowed restart/exit actions
```

These effects must be planned after arbitration and committed atomically with the selected outcome.

## Required fixtures

```txt
last enemy breaches zero-health core -> one policy-defined outcome
last enemy dies while core survives -> victory
core reaches zero while enemies remain -> defeat
simultaneous evidence reordered -> same outcome and fingerprint
repeated evidence -> no duplicate reward or write
```