# Exclusive Terminal Outcome Contract

**Timestamp:** `2026-07-11T13-28-37-04-00`

## Summary

This contract defines terminal outcome as one monotonic run-scoped value rather than two mutable booleans. It coordinates fixed-step evaluation, phase transition, persistence, presentation, replay and restart.

## Plan ledger

**Goal:** define the invariants and typed results required to make victory and defeat mutually exclusive and observable.

- [x] Define canonical outcome values.
- [x] Define evaluation input and arbitration policy.
- [x] Define transition, latch and persistence invariants.
- [x] Define observation and restart boundaries.
- [ ] Implement and validate the contract.

## Canonical state

```txt
CampaignPhase
  BOOTSTRAP
  ACTIVE
  PAUSED
  TERMINAL
  DISPOSING
  DISPOSED

TerminalOutcome
  NONE
  VICTORY
  DEFEAT
```

## Invariants

```txt
ACTIVE and PAUSED require TerminalOutcome.NONE
TERMINAL requires exactly one of VICTORY or DEFEAT
VICTORY and DEFEAT are mutually exclusive
terminal outcome is monotonic for one run epoch
compatibility won/lost fields are derived read-only projections
success persistence requires VICTORY
failure persistence, when added, requires DEFEAT
```

## Evaluation policy v1

```txt
if coreHealth <= 0:
  outcome = DEFEAT
  reason = CORE_DESTROYED
else if waveIndex >= waveCount and spawnCount == 0 and enemyCount == 0:
  outcome = VICTORY
  reason = FINAL_WAVE_CLEARED
else:
  outcome = NONE
```

Defeat dominates simultaneous evidence because the mission objective requires the sanctum to survive.

## Transition rules

```txt
NONE -> VICTORY allowed once
NONE -> DEFEAT allowed once
VICTORY -> any other outcome rejected
DEFEAT -> any other outcome rejected
prior-epoch result -> rejected
same result repeated -> idempotent acknowledgement
```

## TerminalOutcomeResult

```txt
resultId
policyVersion
runId
runEpoch
tickId
priorOutcome
nextOutcome
reason
transitioned
latched
evidenceIds
coreHealth
waveIndex
waveCount
stateFingerprintBefore
stateFingerprintAfter
persistenceDecisionId
```

## Persistence rule

```txt
terminal result
  -> verify run epoch and state fingerprint
  -> verify outcome == VICTORY
  -> verify coreHealth > 0
  -> issue success persistence decision
  -> write versioned candidate
  -> acknowledge storage result
```

A rejected or failed storage operation must remain visible in the result journal and must not alter the terminal outcome.

## Presentation rule

```txt
TerminalOutcomeResult
  -> one detached TerminalRenderSnapshot
  -> world/HUD/minimap/overlay/CRT/GameHost consumers
  -> one TerminalFrameReceipt
```

No consumer may independently infer outcome from core, wave or Boolean fields.

## Restart rule

```txt
acknowledged terminal result
  -> admitted RestartCampaign command
  -> retire input, commands, timers and frame work
  -> advance run epoch
  -> clear terminal result identity
  -> construct new active state
  -> commit first new-run frame
```

## Compatibility migration

During migration:

```txt
state.won = state.terminalOutcome === "VICTORY"
state.lost = state.terminalOutcome === "DEFEAT"
```

Writes to `state.won` or `state.lost` must be removed or rejected.

## Required proof

```txt
outcome exclusivity
outcome monotonicity
simultaneous evidence priority
persistence admission
storage failure observation
render consumer agreement
replay result parity
restart epoch separation
```