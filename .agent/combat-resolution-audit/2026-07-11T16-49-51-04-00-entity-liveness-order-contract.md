# PhantomCommand Entity Liveness and Order Contract

**Timestamp:** `2026-07-11T16-49-51-04-00`

## Summary

Entity identity exists, but liveness and processing order are emergent properties of mutable JavaScript objects. The simulation needs a versioned policy that defines which entities are alive, when new entities become eligible to act, how ties resolve, when retirement becomes authoritative and how references are cleaned.

## Plan ledger

**Goal:** make entity eligibility and combat order explicit, serializable, replayable and independent from object insertion order.

- [x] Identify current identity counters and storage structures.
- [x] Identify current liveness transitions.
- [x] Identify insertion-order dependencies.
- [x] Define the required contract and fixture matrix.
- [ ] Implement the contract.

## Current identity state

```txt
uid -> unit IDs u1, u2, ...
pid -> projectile IDs p1, p2, ...
tid -> tower IDs t1, t2, ...

units -> object keyed by unit ID
towers -> object keyed by tower ID
projectiles -> object keyed by projectile ID
selected -> unit ID array
unit.target -> unit ID or null
projectile.target -> unit ID
pad.tower -> tower ID or null
```

## Current liveness transitions

```txt
lethal damage
  -> delete state.units[id]
  -> remove ID from selected
  -> grant reward

core breach
  -> subtract core
  -> delete state.units[id]

missing projectile target
  -> delete projectile on next projectile update

missing unit target
  -> set local target null during next unit update
```

## Current order dependencies

```txt
Object.values(state.units) uses insertion order
allies are inserted at startup before enemies
enemies are inserted in spawn order
delete does not remove the object from an already captured array
nearest() keeps the first encountered equal-distance candidate
checkpoint or migration rebuild order can alter processing and tie-breaking
```

## Required policy

```txt
EntityOrderPolicy {
  version,
  spawnEligibility: same-tick | next-tick,
  actorOrder: stable-id | initiative-then-id,
  targetTieBreak: distance-then-stable-id,
  damageMode: sequential | simultaneous-batch,
  retirementPoint: after-damage-resolution,
  cleanupPoint: before-terminal-evaluation,
  rewardPoint: after-retirement,
  projectileOrphanPolicy: retire | retarget | resolve-last-position
}
```

## Required liveness index

```txt
EntityLivenessIndex {
  simulationTickId,
  aliveAtStart,
  admittedThisTick,
  retiring,
  retired,
  revision
}
```

## Required invariants

```txt
an ID appears in exactly one liveness partition
only aliveAtStart plus policy-admitted spawns may produce intent
retiring and retired entities cannot produce new intent
retirement is exactly once
all committed references resolve or are null
counter values exceed all committed entity IDs
serialization and hydration preserve policy identity, not incidental object order
```

## Reference cleanup matrix

| Reference | On target retirement |
|---|---|
| `state.selected` | remove retired unit ID |
| `unit.target` | clear or retarget by declared policy |
| `projectile.target` | retire, retarget or preserve last position by policy |
| `state.selectedPad` | retain only if pad remains interactable |
| `pad.tower` | resolve to committed tower ID |
| terminal evidence | preserve immutable source/event row |

## Fixture matrix

```txt
captured dead enemy -> no later action
reversed unit insertion order -> same result
checkpoint object keys reordered -> same result
equal-distance targets -> same chosen target
multiple lethal hits -> one retirement and one reward
selected unit retires -> selection cleaned
projectile target retires -> declared orphan policy
spawn on due tick -> declared first-action timing
identity counters after hydration -> no collision
```
