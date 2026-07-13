# Slow Duration, Stacking and Expiry Contract

**Timestamp:** `2026-07-13T00-31-09-04-00`

## Summary

The source supplies only a slow magnitude. A complete control effect requires explicit semantics for interpretation, duration, stacking, refresh, resistance, movement derivation and retirement.

## Plan ledger

**Goal:** define deterministic Grave Ward slow semantics without mutating authored unit base speed.

- [x] Record the current `slow: .34` payload.
- [x] Separate base speed from derived current speed.
- [x] Define duration and stacking decisions as authored policy.
- [x] Define expiry and target-retirement behavior.
- [ ] Choose concrete balance values and implement later.

## Required effect specification

```txt
CombatEffectSpec {
  effectSpecId
  version
  kind: slow
  magnitudeMode: multiplier-reduction | final-multiplier
  magnitude
  durationSeconds
  stackingPolicy: strongest | additive-capped | multiplicative-capped | none
  refreshPolicy: refresh-duration | preserve-longest | replace
  maxStacks
  resistanceTags
  sourceFingerprint
}
```

The current value `0.34` is ambiguous. It could mean reduce speed by 34 percent or set speed to 34 percent. The implementation must select one interpretation in authored data rather than infer it inside impact code.

## Target state

```txt
ActiveCombatModifier {
  modifierId
  effectSpecId
  effectSpecVersion
  sourceEntityId
  sourceProjectileId
  targetEntityId
  targetGeneration
  appliedStep
  expiresStep
  magnitude
  stackCount
  revision
}
```

## Movement derivation

```txt
baseSpeed = archetype.speed
activeSlowSet = live modifiers for target generation
currentSpeed = derive(baseSpeed, activeSlowSet, stacking policy, cap)
```

The archetype and unit base speed remain unchanged. Expiry or retirement therefore restores speed by removing modifier state, not by attempting to reverse an earlier mutation.

## Retirement rules

```txt
expiry boundary -> retire once
target death or replacement -> retire all target modifiers once
run restart -> retire all run modifiers once
stale predecessor callback -> zero mutation
duplicate retirement -> idempotent result
```

## Required fixtures

```txt
single Ward hit
second hit before expiry
second hit after expiry
strongest-policy comparison
configured cap
immune or resistant target
target death before expiry
run restart with active slow
fixed-step expiry boundary
first visible slow-state frame
```
