# Outcome, Reward, Save and Retry Contract

**Timestamp:** `2026-07-14T13-40-59-04-00`

## Summary

Terminal state, wave rewards, victory persistence and retry currently settle independently. This contract requires them to consume one accepted campaign outcome.

## Plan ledger

**Goal:** prevent rewards, saves, presentation and retry from diverging from terminal truth.

- [x] Identify current terminal consumers.
- [x] Define one immutable outcome artifact.
- [x] Define participant receipts and rollback boundaries.
- [ ] Implement and execute fixtures later.

## Required artifact

```txt
CampaignOutcomeArtifact {
  outcomeId
  runId
  stepId
  waveId
  outcome: victory | defeat
  reason
  core
  soulsBefore
  rewardPolicyRevision
  rewardDelta
  soulsAfter
  campaignRevision
  fingerprint
}
```

## Participant receipts

```txt
TerminalStateReceipt
RewardSettlementReceipt
SaveCommitReceipt
GameHostPublicationReceipt
TerminalProjectionReceipt
FirstTerminalFrameAck
RetryLineageReceipt
```

## Atomicity boundary

```txt
mandatory
  accepted terminal result
  state projection
  reward settlement
  public readback

conditional
  victory save candidate only for accepted victory

observable degraded result
  storage unavailable or save failure

never allowed
  victory save for accepted defeat
  wave-clear reward applied twice
  visible victory for accepted defeat
  retry without predecessor citation
```

## Retry contract

```txt
CampaignRetryCommand {
  commandId
  predecessorOutcomeId
  predecessorFingerprint
}

CampaignRetryResult {
  successorRunId
  lineageId
  resetReceipts
  stalePredecessorWorkRejected
}
```

## Retention

Retain a bounded journal of accepted outcomes and retry lineage. Raw mutable flags are not sufficient evidence.

No runtime contract was implemented.