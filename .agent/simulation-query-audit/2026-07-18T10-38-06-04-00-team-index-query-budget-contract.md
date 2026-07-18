# Simulation Query Audit — Team Index and Query Budget Contract

**Timestamp:** `2026-07-18T10-38-06-04-00`  
**Status:** `campaign-target-query-work-budget-authority-audited`

## Source inventory

```txt
enemies()
  -> Object.values(state.units)
  -> filter enemy team

allies()
  -> Object.values(state.units)
  -> filter player team

updateUnit()
  -> query enemies for an untargeted player
  -> query allies for an untargeted enemy

updateTowers()
  -> query enemies once per tower every fixed tick

updateProjectiles()
  -> query enemies for splash candidates at impact
```

## Source-visible construction floor

The initial state creates six player units and zero enemies. Before the first wave, each player has no target and calls `enemies()` on every accepted fixed tick.

```txt
enemies() calls per idle tick: 6
arrays per call: Object.values array + filtered array = 2
arrays per idle tick: 12
conditional arrays at 60 accepted ticks: 720 / second
additional arrays per tower per tick: 2
```

This excludes browser and engine internals and is not a memory-size or GC claim.

## Proposed settlement policy

- Partition live units once when membership changes or once per accepted simulation generation.
- Reuse stable enemy and ally views within that generation.
- Preserve deterministic iteration order.
- Count requester queries and candidate inspections separately.
- Reject stale indexes before mutation.
- Define an explicit overflow policy before imposing a hard budget.
- Publish source-owned counters separately from browser-profiler observations.

## Minimal implementation cut

```txt
src/campaign/campaign-scene.js
src/campaign/combat-team-index.js
src/campaign/target-query.js
scripts/check-campaign.mjs
tests/browser/campaign-target-query.html
```

## Proof requirements

- Idle pre-wave allocation observation.
- One, ten and maximum-supported tower query observation.
- Deterministic target parity for recorded input seeds.
- Target death and retarget settlement.
- Splash candidate parity.
- Source, artifact and Pages parity.

## Boundary

No runtime optimization was implemented and no performance claim is made.