# PhantomCommand Spawn, Intent, Damage and Cleanup Loop

**Timestamp:** `2026-07-11T16-49-51-04-00`

## Summary

The gameplay loop mixes spawn admission, target selection, movement, attacks, damage, deletion, rewards, core breach and wave completion in one mutable update. This makes first-action timing, dead-actor rejection, tie-breaking and terminal evidence implicit rather than versioned gameplay policy.

## Plan ledger

**Goal:** separate the combat tick into explicit gameplay phases with stable inputs, outputs and invariants.

- [x] Trace spawn through wave completion.
- [x] Identify every immediate mutation.
- [x] Identify order-dependent behavior.
- [x] Define a phase-based target loop.
- [ ] Implement the phases and behavioral fixtures.

## Current loop

```txt
update(dt)
  -> decrement spawn timers
  -> spawn due enemies
  -> iterate captured unit array
       decrement cooldown
       choose target
       move or attack
       apply immediate melee damage or create projectile
       delete lethal targets immediately
       grant reward immediately
       enemy may breach core and delete itself
  -> iterate towers and create projectiles
  -> iterate projectiles and apply immediate direct/splash damage
  -> age effects
  -> evaluate wave completion
```

## Gameplay policy currently implicit

```txt
newly spawned enemy may act in the same tick
allies act before enemies because they were inserted first
older enemies act before newer enemies
nearest-target ties use first encountered entity
melee damage is sequential and immediate
mutual lethal attacks are impossible unless explicitly staged
killed captured entity may still act
projectile damage occurs after all unit and tower actions
reward occurs at deletion time
core breach occurs inside enemy update
wave clear occurs after all mutable subsystems
```

## Target phase loop

```txt
phase 1: admit due spawns
phase 2: freeze alive entity set and stable order
phase 3: collect target, movement and attack intents
phase 4: resolve movement policy
phase 5: resolve attacks and projectile emissions
phase 6: resolve direct and splash damage
phase 7: retire dead entities exactly once
phase 8: clean references and settle rewards
phase 9: resolve core-breach events
phase 10: evaluate wave-clear evidence
phase 11: publish CombatResolutionResult
phase 12: arbitrate terminal outcome
```

## Gameplay invariants

```txt
spawn first-action timing is declared
only alive entities produce intents
one entity cannot both retire and act afterward
same-distance targeting has a stable tie-break
rewards cannot duplicate
selected IDs cannot reference retired units
unit targets cannot reference retired units at commit
projectiles targeting retired units are resolved or retired by policy
core damage cannot come from a retired actor
a wave clears only after cleanup and core event resolution
```

## Gameplay fixtures

```txt
spawned enemy acts now vs next tick according to policy
ally kills enemy before enemy turn -> enemy produces no intent
same state with reversed insertion order -> same result
same-distance targets -> stable chosen ID
splash kills multiple enemies -> one reward per enemy
selected ally dies -> selection cleaned before frame
projectile target dies earlier -> projectile policy is deterministic
last enemy dies while another reaches core -> terminal evidence is explicit
```
