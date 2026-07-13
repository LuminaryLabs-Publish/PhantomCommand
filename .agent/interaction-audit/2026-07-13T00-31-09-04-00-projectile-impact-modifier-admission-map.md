# Projectile Impact Modifier Admission Map

**Timestamp:** `2026-07-13T00-31-09-04-00`

## Summary

Projectile impact currently mutates target HP directly and deletes the projectile. There is no command/result boundary that can validate target generation, apply a modifier, reject stale impact or correlate the outcome with movement and rendering.

## Plan ledger

**Goal:** map one projectile impact to one terminal damage-plus-modifier result with zero-mutation rejection paths.

- [x] Map projectile creation and target references.
- [x] Map impact and retirement.
- [x] Map target movement consumption.
- [x] Define admission and terminal results.
- [ ] Implement later.

## Current interaction

```txt
tower update
  -> nearest live enemy
  -> projectile(source, target, spec)
  -> copy target ID, damage, speed, splash, slow and color

projectile update
  -> resolve target from state.units
  -> delete if target missing or age > 5
  -> move toward current target position
  -> on impact, apply damage
  -> draw transient effect
  -> delete projectile

missing
  -> no modifier admission or result
```

## Required result chain

```txt
ProjectileImpactEnvelope
  -> ProjectileImpactAdmissionResult
  -> DamageApplicationResult
  -> CombatModifierApplicationResult
  -> ProjectileRetirementResult
  -> TargetMovementDerivationResult
  -> CombatModifierVisibleFrameAck
```

## Terminal modifier statuses

```txt
applied
refreshed
stacked
resisted
immune
invalid-spec
missing-target
stale-target-generation
stale-projectile-generation
duplicate-impact
rejected-phase
```

## Zero-mutation rule

Rejected, stale, duplicate, invalid or missing-target results must not change HP, active modifiers, movement speed, projectile ownership, combat revision or visible state except for bounded diagnostic observation.
