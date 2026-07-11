# Architecture Audit: Terminal Outcome Authority DSK Map

**Timestamp:** `2026-07-11T18-21-09-04-00`

## Summary

Terminal state is currently split across combat mutation, wave-clear mutation, message projection, localStorage, overlay precedence and GameHost readback. One composed domain must own evidence admission, simultaneous-result policy, outcome commitment, persistence and consumer correlation.

## Plan ledger

**Goal:** place the terminal boundary after committed combat resolution and before rewards, persistence, rendering, restart and checkpoint capture.

- [x] Map current terminal mutation points.
- [x] Separate evidence production from outcome commitment.
- [x] Define the parent domain and child kits.
- [x] Define result identity and dependency order.
- [ ] Implement the domain after combat-result authority exists.

## Current split

```txt
updateUnit
  -> core breach
  -> lost/message mutation

update
  -> wave clear
  -> reward/won/message/save mutation

drawUI
  -> won-first overlay precedence

GameHost
  -> independent won/lost readback
```

## Required parent domain

```txt
phantom-command-terminal-outcome-authority-domain
```

## Child DSKs and services

| Kit | Services |
|---|---|
| `terminal-evidence-input-kit` | Freeze one combat result, tick, run epoch and candidate evidence set |
| `core-breach-evidence-kit` | Normalize sanctum damage and zero-health evidence |
| `final-wave-clear-evidence-kit` | Normalize final-wave completion evidence after cleanup |
| `terminal-policy-kit` | Own named/versioned precedence, tie and simultaneous-evidence rules |
| `terminal-arbitration-kit` | Evaluate pure predicates and choose one outcome |
| `terminal-outcome-result-kit` | Publish immutable accepted/rejected evidence and outcome identity |
| `terminal-latch-kit` | Make outcome monotonic and idempotent for the run epoch |
| `terminal-transition-kit` | Move campaign phase from active to victory or defeat |
| `terminal-persistence-admission-kit` | Admit or reject completion/checkpoint writes from the result |
| `terminal-message-projection-kit` | Derive one campaign message from the result |
| `terminal-overlay-projection-kit` | Derive one modal overlay from the result |
| `terminal-gamehost-projection-kit` | Publish detached terminal diagnostics |
| `terminal-frame-correlation-kit` | Correlate result, state fingerprint and first visible frame |
| `terminal-restart-exit-kit` | Admit restart/exit commands against result and run epoch |
| `terminal-journal-kit` | Retain bounded evidence, decision and effect rows |
| `simultaneous-outcome-fixture-kit` | Prove the chosen policy for core-zero/final-clear concurrency |
| `terminal-persistence-fixture-kit` | Prove only admitted outcomes write storage |
| `terminal-frame-smoke-kit` | Prove all visible/readback consumers agree |

## Required ownership flow

```txt
CombatResolutionResult
  -> TerminalEvidenceInput
  -> predicate evaluation
  -> policy arbitration
  -> TerminalOutcomeResult commit
  -> phase transition and latch
  -> reward/persistence decisions
  -> message/overlay/GameHost projections
  -> terminal frame acknowledgement
  -> restart/exit admission
```

## Dependency constraints

```txt
combat result must exist before terminal arbitration
terminal result must exist before persistence or terminal rendering
persistence must not mutate the outcome
rendering must not infer precedence from independent flags
restart must increment run epoch and invalidate old evidence
checkpoint capture must include terminal policy/version/result identity
```

## Result schema

```txt
TerminalOutcomeResult {
  resultId,
  runEpoch,
  sourceCombatResultId,
  sourceTickId,
  evidenceRevision,
  policyId,
  policyVersion,
  previousPhase,
  outcome,
  acceptedVictoryEvidence,
  acceptedDefeatEvidence,
  rejectedEvidence,
  persistenceDecision,
  transitionDecision,
  stateFingerprint,
  journalRange
}
```

## Recommended current policy

```txt
policyId: sanctum-survival-v1
simultaneous final-clear + core-zero: DEFEAT
reason: the authored protected objective did not survive the committed combat result
```

The policy may change only through an authored version and fixture update.