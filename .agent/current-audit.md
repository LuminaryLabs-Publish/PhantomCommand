# Current Audit

**Timestamp:** `2026-07-18T10-38-06-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `campaign-target-query-work-budget-authority-audited`

## Summary

Campaign targeting rebuilds team arrays inside the fixed-step hot path. `enemies()` and `allies()` each allocate an `Object.values` array and a filtered array. Untargeted units query independently, every tower queries every accepted tick, and splash impacts query again.

## Intent

Publish one stable combat-team index per accepted generation, serve deterministic target-query results from that index, settle query work explicitly and bind visible combat frames to the accepted generation.

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude Cavalry of Rome.
- [x] Select PhantomCommand as the oldest synchronized eligible repository.
- [x] Preserve the complete 20-kit service inventory.
- [x] Trace unit, tower and projectile query paths.
- [x] Derive the source-visible idle query construction floor.
- [x] Add the `2026-07-18T10-38-06-04-00` audit family.
- [ ] Implement stable team indexes and typed query/budget results.
- [ ] Execute deterministic source, artifact and Pages fixtures.

## Interaction loop

```txt
accepted fixed tick
  -> spawn and membership mutations
  -> update each unit
  -> rebuild enemy/ally arrays when target is missing
  -> update each tower and rebuild enemy array
  -> choose nearest targets
  -> update projectiles and splash candidates
  -> apply combat mutations
  -> present campaign frame without query-generation proof
```

## Domains in use

```txt
browser routes, modules, DOM, RAF and input lifecycle
procedural menu, settings, save presence, audio and transition
Canvas2D campaign world, HUD, minimap and overlays
WebGL source upload and CRT presentation
campaign units, towers, waves, resources, selection and outcomes
fixed-step spawn, movement, targeting, combat, projectiles and effects
team membership indexes, deterministic target queries and work budgets
persistence, diagnostics, static checks, build and Pages
```

## Current gap

```txt
shared enemy/ally index per generation: absent
query arrays per enemies/allies call: 2 source-visible arrays
pre-wave idle calls per accepted tick: 6 enemies() calls
pre-wave idle arrays per accepted tick: 12
conditional arrays at 60 accepted ticks: 720 / second
additional arrays per tower per accepted tick: 2
TargetQueryResult: absent
TargetQueryBudgetResult: absent
CombatTargetQueryDigest: absent
FirstTargetQueryBoundFrameAck: absent
```

## Required authority

`phantom-command-campaign-target-query-work-budget-authority-domain`

## Boundary

Documentation only. No runtime targeting, combat, gameplay, rendering, test, build or deployment behavior changed.