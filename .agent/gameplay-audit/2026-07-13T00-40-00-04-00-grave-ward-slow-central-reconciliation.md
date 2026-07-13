# Grave Ward Slow Gameplay Reconciliation

**Timestamp:** `2026-07-13T00-40-00-04-00`

## Summary

The Grave Ward currently behaves as a low-damage tower with distinct visuals. Its authored control value survives projectile construction but is ignored at impact, so enemies move at unchanged archetype speed.

## Plan ledger

**Goal:** document the exact gameplay no-op and the proof required before describing the Ward as a slowing tower.

- [x] Confirm Ward cost, damage, rate, projectile speed and slow payload.
- [x] Confirm projectile state retains the payload.
- [x] Confirm impact applies damage but no modifier.
- [x] Confirm movement reads `u.speed` directly.
- [x] Confirm no duration, stacking, expiry or cleanup exists.
- [ ] Implement one deterministic slow effect and compare movement later.

## Current loop

```txt
build Grave Ward for 55 souls
  -> tower fires damage 7 projectile
  -> projectile carries slow = 0.34
  -> projectile reaches target
  -> impact damages target
  -> transient effect is created
  -> projectile is deleted
  -> target speed remains runner/shield/zealot/brute/wraith base speed
```

## Gameplay risks

```txt
advertised control function is absent
55-soul purchase can be misread as stronger than implemented
multiple Ward hits have undefined semantics
future direct speed mutation would complicate expiry and replay
no target generation exists for stale impact rejection
no restart/death retirement contract exists
```

## Completion proof

```txt
one Ward hit creates an accepted target modifier
slowed enemy travels less distance over equal fixed steps than control enemy
magnitude semantics are explicit
duration expires at the authored step
refresh/stacking/cap rules are deterministic
death and restart retire modifiers exactly once
first visible frame cites the accepted modifier revision
source, build and Pages behavior agree
```

## Claim boundary

The current source does not slow enemies. This audit changes documentation only.