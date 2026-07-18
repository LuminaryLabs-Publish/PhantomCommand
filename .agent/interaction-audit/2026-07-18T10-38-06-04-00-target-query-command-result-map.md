# Interaction Audit — Target Query Command/Result Map

**Timestamp:** `2026-07-18T10-38-06-04-00`  
**Status:** `campaign-target-query-work-budget-authority-audited`

## Producer-to-result map

```txt
wave spawn, unit death, build and reset
  -> unit/tower membership revision
  -> CampaignCombatGenerationAdmissionCommand
  -> CampaignCombatGenerationResult

accepted combat generation
  -> CombatTeamIndexSettlementCommand
  -> CombatTeamIndexResult

unit/tower/projectile query producer
  -> TargetQueryCommand
  -> TargetQueryResult

query observations
  -> TargetQueryBudgetSettlementCommand
  -> TargetQueryBudgetResult

combat mutation and render projection
  -> CombatProjectionCommitCommand
  -> CombatTargetQueryDigest
  -> FirstTargetQueryBoundFrameAck
```

## Required result fields

```txt
generationId
simulationTick
membershipRevision
requesterId
requesterKind
requesterTeam
candidateTeam
range
candidateCount
selectedTargetId
selectedDistance
acceptedWorkUnits
settlement: accepted | empty | degraded | rejected-stale | rejected-budget
reason
```

## Producer separation

Unit, tower and projectile-splash requests should remain distinct producers while sharing one accepted team-index generation. A unit retaining a live target should emit a retained-target result rather than silently bypassing query accounting.

## Rejection behavior

Stale membership revisions must not mutate combat state. Budget rejection must have an explicit gameplay policy rather than silently choosing a different target or skipping an attack.

## Boundary

This is a proposed contract map. No commands, results or runtime services were implemented.