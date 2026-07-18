# Gameplay Audit — Campaign Combat Target Query Loop

**Timestamp:** `2026-07-18T10-38-06-04-00`  
**Status:** `campaign-target-query-work-budget-authority-audited`

## Gameplay loop

```txt
select defenders
  -> place towers
  -> start wave
  -> spawn enemies by lane
  -> units and towers search for targets
  -> move, attack, fire projectiles and apply damage
  -> earn souls, protect the sanctum and clear waves
```

## Current targeting behavior

- Player units without a live target rebuild the enemy list and choose the nearest candidate.
- Enemy units without a live target rebuild the ally list and choose the nearest candidate.
- Every tower rebuilds the enemy list every fixed tick before selecting the nearest candidate in range.
- Splash projectiles rebuild the enemy list at impact.
- Existing live targets are retained until invalid, preserving simple target persistence.

## Gameplay authority gap

The gameplay result is valid only implicitly. There is no typed result recording the accepted team membership, candidate set, range policy, nearest-target tie behavior, query generation or work budget that produced an attack decision.

## Required compatibility

A future indexed query path must preserve:

```txt
team filtering
nearest-distance policy
range gates
existing-target retention
unit movement fallback
tower cooldown and rate semantics
projectile impact and splash behavior
wave rewards and terminal outcomes
```

## Validation needed

- Compare old and new target IDs across deterministic fixtures.
- Exercise equal-distance candidates and define stable tie ordering.
- Exercise target death between ticks.
- Exercise no-enemy idle and high-tower states.
- Prove identical wave, reward and terminal results for the same input sequence.

## Boundary

This turn documents target-query ownership only. No balance, unit, tower, wave, reward or combat behavior changed.