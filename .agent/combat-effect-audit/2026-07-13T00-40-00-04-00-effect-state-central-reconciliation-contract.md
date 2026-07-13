# Combat Effect State Contract

**Timestamp:** `2026-07-13T00-40-00-04-00`

## Summary

A combat effect must be a stable specification plus a target-bound live instance. PhantomCommand currently has only a floating `slow` number on the Ward and its projectiles. It lacks effect identity, unambiguous magnitude, duration, stacking, refresh, resistance, active state, expiry and retirement.

## Plan ledger

**Goal:** define deterministic slow-effect semantics without mutating authored unit speed destructively.

- [x] Separate immutable effect specification from live target modifier instances.
- [x] Define required fixed-step timestamps and revisions.
- [x] Define stacking, refresh and resistance decision points.
- [x] Define derived movement and exactly-once retirement.
- [ ] Choose authored slow semantics and duration during implementation.

## Required specification

```txt
CombatEffectSpec {
  effectSpecId
  version
  kind: Slow
  magnitude
  magnitudeMode: ReductionFraction | FinalMultiplier
  durationSteps
  stackingPolicy
  refreshPolicy
  maximumStacks
  resistancePolicy
  contentFingerprint
}
```

## Required live state

```txt
ActiveCombatModifier {
  modifierId
  effectSpecId
  effectSpecVersion
  sourceEntityId
  sourceGeneration
  targetEntityId
  targetGeneration
  appliedStep
  expiresStep
  stackCount
  targetModifierRevision
}
```

## Required invariants

```txt
base speed remains immutable
current speed is derived from base speed and accepted active modifiers
modifier application and damage share one atomic impact commit
expiry occurs only at fixed-step boundaries
refresh and stacking are explicit and bounded
target death, replacement and restart retire active modifiers exactly once
stale and duplicate impacts perform zero mutation
observations do not expose mutable target internals
```

## Required fixtures

```txt
single slow application
slowed versus unslowed distance comparison
exact duration and expiry
refresh behavior
stacking and cap behavior
resistance and immunity
stale projectile generation
duplicate impact
target death and replacement retirement
run restart with active modifier
```

## Claim boundary

No effect semantics were selected and no live modifier state was implemented.