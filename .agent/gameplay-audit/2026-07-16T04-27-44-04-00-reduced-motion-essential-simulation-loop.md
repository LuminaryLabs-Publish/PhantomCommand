# Gameplay Audit — Reduced Motion and Essential Simulation Loop

**Timestamp:** `2026-07-16T04-27-44-04-00`

## Summary

Campaign movement, targeting, projectiles, damage, rewards and terminal settlement are gameplay truth. A reduced-motion policy must change presentation intensity without slowing, skipping or duplicating those fixed-step results.

## Plan ledger

**Goal:** preserve the full campaign loop while replacing optional visual motion with lower-motion feedback.

- [x] Trace input through fixed-step simulation and rendering.
- [x] Mark simulation state as essential.
- [x] Mark camera easing, hit rings, bobbing and shader flicker as adaptable presentation.
- [x] Define visible alternatives for accepted gameplay results.
- [ ] Execute deterministic normal-versus-reduced comparison fixtures.

## Essential loop

```txt
input command
  -> selection build order wave or camera intent
  -> fixed-step campaign update
  -> movement targeting projectile damage reward core and terminal results
  -> immutable accepted state
  -> presentation adapters consume state plus motion policy
```

## Must remain unchanged

```txt
wave cadence and spawn counts
unit speed and targeting
attack cooldowns and damage
projectile settlement
souls and build costs
sanctum damage
victory and defeat gates
selection and command hit regions
pause retry and exit meaning
```

## May be adapted

```txt
camera interpolation can become immediate or shorter
entity bobbing and decorative animation can become static
hit rings and pulses can become brief opacity changes
projectile trails can become static or lower-displacement markers
terminal transitions can become immediate
CRT flicker and temporal grain can be disabled
```

## Required proof

A fixture must feed the same command stream into normal and reduced presentation modes and prove identical simulation snapshots while allowing different visual descriptors and frame hashes.