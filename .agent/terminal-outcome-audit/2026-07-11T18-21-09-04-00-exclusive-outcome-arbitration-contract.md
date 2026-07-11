# Terminal Outcome Audit: Exclusive Outcome Arbitration Contract

**Timestamp:** `2026-07-11T18-21-09-04-00`

## Summary

Terminal outcome must be a single committed value, not a pair of mutable Booleans. This contract makes combat an evidence producer and makes one versioned policy responsible for choosing, latching and projecting the result.

## Plan ledger

**Goal:** define exact invariants, inputs, result fields and side-effect rules for terminal convergence.

- [x] Define terminal phases and evidence types.
- [x] Define simultaneous-evidence policy ownership.
- [x] Define idempotency and stale-result rejection.
- [x] Define persistence and frame correlations.
- [ ] Implement after `CombatResolutionResult` exists.

## State model

```txt
ACTIVE
VICTORY
DEFEAT
RESTARTING
EXITING
```

Only `ACTIVE` may admit new gameplay combat. `VICTORY` and `DEFEAT` are terminal and monotonic for the current run epoch.

## Evidence input

```txt
TerminalEvidenceInput {
  inputId,
  sessionId,
  runEpoch,
  simulationTickId,
  combatResultId,
  evidenceRevision,
  coreBreachEvidence[],
  waveClearEvidence[],
  finalWaveClearEvidence[],
  previousOutcome,
  preFingerprint,
  policyId,
  policyVersion
}
```

## Arbitration rules

1. Reject foreign session/run evidence.
2. Reject stale revisions.
3. Return the existing result for an exact duplicate.
4. If a terminal result is already latched, reject later mutation.
5. Evaluate victory and defeat predicates without side effects.
6. Apply one named simultaneous-evidence policy.
7. Commit one outcome and one transition.
8. Plan rewards and persistence from the committed outcome.
9. Publish one journal range and state fingerprint.

## Current recommended policy

```txt
policyId: sanctum-survival-v1
victory: final wave cleared and sanctum health > 0
defeat: sanctum health <= 0
simultaneous evidence: defeat wins
```

## Persistence rules

```txt
ACTIVE -> no terminal write
VICTORY -> one completion write admitted
DEFEAT -> victory write rejected
exact duplicate -> no duplicate write
stale/foreign evidence -> no write
storage error -> outcome stays committed; persistence result records failure
```

## Projection rules

```txt
message, overlay, GameHost and CRT derive from TerminalOutcomeResult
no consumer reads independent won/lost flags
all consumers acknowledge the same resultId and runEpoch
first terminal frame includes persistence status and state fingerprint
```

## Restart rules

```txt
restart validates terminal result and run epoch
restart creates a new run epoch
old evidence and callbacks are fenced
new state begins ACTIVE
first new frame acknowledges the new epoch
```

## Invariants

```txt
exactly one outcome per run epoch
outcome never regresses or changes terminal class
one reward and one persistence plan per result
no victory persistence for a defeat result
no terminal presentation without a committed result
same evidence order produces the same outcome and fingerprint
```