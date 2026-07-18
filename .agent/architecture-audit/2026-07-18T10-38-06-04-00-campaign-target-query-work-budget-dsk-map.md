# Architecture Audit — Campaign Target Query Work Budget DSK Map

**Timestamp:** `2026-07-18T10-38-06-04-00`  
**Status:** `campaign-target-query-work-budget-authority-audited`

## Current ownership

```txt
fixed-step-campaign-simulation-kit
  -> state.units object
  -> enemies() and allies() ad hoc team projections
  -> updateUnit per-unit target lookup
  -> updateTowers per-tower target lookup
  -> updateProjectiles splash lookup
  -> nearest() linear scan
  -> combat mutation

pixel-campaign-render-kit
  -> consumes the post-update unit, tower, projectile and effect state
  -> has no combat-query generation digest
```

## Current DSK/domain gap

Team membership and target-query work are implicit helper behavior inside one monolithic campaign module. No owner publishes a stable enemy/ally index for one accepted tick, no query result carries a generation, and no budget result explains how much target-query work was accepted.

## Proposed parent domain

`phantom-command-campaign-target-query-work-budget-authority-domain`

## Proposed command/result flow

```txt
CampaignCombatGenerationAdmissionCommand
  -> binds simulation tick, unit membership and tower membership revisions
  -> CampaignCombatGenerationResult

CombatTeamIndexSettlementCommand
  -> partitions live units once per accepted generation
  -> CombatTeamIndexResult

TargetQueryCommand
  -> consumes one accepted team-index generation
  -> applies range, team and nearest-target policy
  -> TargetQueryResult

TargetQueryBudgetSettlementCommand
  -> records query count, candidate count, fallback and rejection reason
  -> TargetQueryBudgetResult

CombatProjectionCommitCommand
  -> binds combat mutations and render state to the accepted query generation
  -> CombatTargetQueryDigest
  -> FirstTargetQueryBoundFrameAck
```

## Proposed surfaces

| Surface | Responsibility |
|---|---|
| `campaign-combat-generation-admission-kit` | Admit one simulation/query generation. |
| `campaign-unit-membership-revision-kit` | Publish stable unit membership identity. |
| `campaign-combat-team-index-kit` | Partition live units once per generation. |
| `campaign-enemy-query-view-kit` | Expose the accepted enemy view. |
| `campaign-ally-query-view-kit` | Expose the accepted ally view. |
| `campaign-target-query-scratch-lease-kit` | Own reusable query scratch. |
| `campaign-target-query-admission-kit` | Validate team, range, generation and budget. |
| `campaign-nearest-target-selection-kit` | Apply deterministic nearest-target policy. |
| `campaign-unit-target-query-kit` | Serve player/enemy unit targeting. |
| `campaign-tower-target-query-kit` | Serve tower targeting. |
| `campaign-projectile-splash-query-kit` | Serve impact-area candidate lookup. |
| `campaign-stale-team-index-rejection-kit` | Reject stale membership generations. |
| `campaign-target-query-work-observation-kit` | Count accepted queries and candidates. |
| `campaign-target-query-budget-policy-kit` | Define bounded work policy. |
| `campaign-target-query-budget-settlement-kit` | Publish accepted, degraded or rejected work. |
| `campaign-combat-target-query-digest-kit` | Bind combat state to query generation. |
| `first-target-query-bound-frame-ack-kit` | Prove matching visible projection. |
| `campaign-target-query-determinism-fixture-kit` | Prove target parity and ordering. |
| `campaign-target-query-deployment-parity-kit` | Prove source, artifact and Pages parity. |

## Compatibility boundary

Keep wave composition, unit/tower statistics, nearest-target semantics, attack cadence, projectile behavior, rewards, camera, controls and rendered presentation unchanged unless a separately admitted gameplay change is authorized.