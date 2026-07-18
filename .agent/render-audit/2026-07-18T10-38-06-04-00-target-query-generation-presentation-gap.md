# Render Audit — Target Query Generation Presentation Gap

**Timestamp:** `2026-07-18T10-38-06-04-00`  
**Status:** `campaign-target-query-work-budget-authority-audited`

## Current render path

```txt
fixed-step update
  -> unit and tower target queries
  -> movement, attack and damage mutation
  -> drawWorld
  -> drawUI and minimap
  -> CRT source upload and presentation
```

The renderer consumes the latest mutable campaign state but does not receive a combat-team index generation, target-query budget result or combat-query digest. A frame therefore cannot prove which target-query generation produced its visible unit actions, projectiles, damage and HUD values.

## Source-backed concern

Repeated team-array construction occurs before presentation. This audit does not claim that the construction currently misses a frame budget. It records that query work and the visible frame are not joined by one accepted generation or observable settlement.

## Required proof

```txt
CombatTeamIndexResult
  -> TargetQueryResult set
  -> TargetQueryBudgetResult
  -> combat mutations
  -> CombatTargetQueryDigest
  -> Canvas2D world and HUD
  -> CRT presentation
  -> FirstTargetQueryBoundFrameAck
```

## Fixtures needed

- Idle pre-wave frame with six player units and zero enemies.
- Multi-tower frame with no enemies.
- Wave frame with stable nearest-target outcomes.
- Target death and same-tick retarget frame.
- Splash-impact candidate frame.
- Source, built artifact and Pages parity.

## Claim boundary

No dropped frame, visual mismatch, performance regression or deterministic failure was reproduced. No rendering code changed.