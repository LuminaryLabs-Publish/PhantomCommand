# Terminal Command and Settlement Result Map

**Timestamp:** `2026-07-14T13-40-59-04-00`

## Summary

Current interaction mutates campaign terminal state through function order rather than commands and typed results. This map defines the minimum command/result surfaces needed for deterministic terminal admission and retry.

## Plan ledger

**Goal:** convert terminal mutation into explicit proposals, one settlement result and one successor-run command.

- [x] Map current direct interactions.
- [x] Define command envelopes and result classes.
- [x] Define stale and duplicate behavior.
- [ ] Implement and validate later.

## Current direct interactions

```txt
Space -> startWave() -> mutable queue
unit breach -> state.core mutation -> state.lost mutation
wave clear -> state.wave and state.souls mutation
final clear -> state.won mutation -> localStorage write
R -> location.reload()
Escape -> location.href = './'
```

## Required command map

```txt
StartWaveCommand
  -> Accepted | AlreadyActive | Complete | Terminal | Stale | Rejected

TerminalProposalCommand
  -> AcceptedProposal | DuplicateProposal | StaleProposal | InvalidProposal

CampaignTerminalSettlementCommand
  -> NoTerminal | Accepted | ConflictResolved | Duplicate | Stale | Failed

RewardSettlementCommand
  -> Applied | AlreadyApplied | NotEligible | Stale | Failed

VictorySaveCommitCommand
  -> Committed | NotEligible | StorageUnavailable | Failed

CampaignRetryCommand
  -> Accepted | Duplicate | MissingPredecessor | Stale | Failed
```

## Required invariants

```txt
one RunId has at most one accepted terminal result
one StepId can produce multiple proposals but one settlement
reward receipt cites the accepted outcome
save receipt cites the accepted victory outcome
terminal UI cites the same outcome fingerprint
retry cites the predecessor outcome and allocates a new RunId
late predecessor steps cannot mutate the successor
```

## Public readback

`window.GameHost.getState()` should expose one immutable terminal result rather than independent `won` and `lost` booleans.

No interaction behavior was changed.