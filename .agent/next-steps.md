# Next Steps

**Generated:** `2026-07-18T10-38-06-04-00`  
**Status:** `campaign-target-query-work-budget-authority-audited`

## Intent

Replace repeated ad hoc team-array construction with one generation-owned combat index while preserving deterministic nearest-target gameplay.

## Checklist

### Phase 1: Membership generation

- [ ] Define `CampaignCombatGenerationResult` with tick and membership revisions.
- [ ] Publish unit membership changes on spawn, death, reset and terminal cleanup.
- [ ] Build stable enemy and ally views once per accepted generation.
- [ ] Preserve deterministic iteration order.

### Phase 2: Query service

- [ ] Define `TargetQueryCommand` and `TargetQueryResult`.
- [ ] Separate unit, tower and projectile-splash producers.
- [ ] Preserve existing-target retention as an explicit result.
- [ ] Define equal-distance tie ordering.
- [ ] Reject stale team indexes before combat mutation.

### Phase 3: Work budget

- [ ] Count query requests, candidate inspections and retained-target fast paths.
- [ ] Define source-owned counters separately from browser profiler observations.
- [ ] Publish `TargetQueryBudgetResult`.
- [ ] Define explicit degraded/rejected behavior before imposing a hard cap.
- [ ] Lease and retire reusable query scratch through the campaign lifecycle.

### Phase 4: Frame proof

- [ ] Publish `CombatTargetQueryDigest`.
- [ ] Bind units, projectiles, HUD and minimap to the accepted combat generation.
- [ ] Publish `FirstTargetQueryBoundFrameAck`.

### Phase 5: Fixtures

- [ ] Six-player pre-wave idle query fixture.
- [ ] One, ten and maximum-supported tower fixtures.
- [ ] Equal-distance deterministic target fixture.
- [ ] Target death and same-tick retarget fixture.
- [ ] Splash candidate parity fixture.
- [ ] Source, built-artifact and Pages parity fixtures.

## Recommended file cut

```txt
src/campaign/campaign-scene.js
src/campaign/combat-team-index.js
src/campaign/target-query.js
scripts/check-campaign.mjs
tests/browser/campaign-target-query.html
```

## Compatibility constraints

Preserve wave composition, unit and tower statistics, range gates, nearest-target semantics, cooldowns, projectile behavior, rewards, camera, controls, CRT presentation and deployment unless a separately admitted gameplay change requires otherwise.

## Claim boundary

Do not claim lower allocation, better frame time, deterministic parity or deployment readiness until executable observations and parity fixtures pass.