# Terminal Outcome Authority DSK Map

**Timestamp:** `2026-07-11T13-28-37-04-00`

## Summary

The campaign mutates defeat during unit iteration and victory during later wave-clear evaluation. This map defines one composed domain that collects evidence, arbitrates exactly one outcome, latches it, gates persistence and correlates terminal presentation.

## Plan ledger

**Goal:** replace independent `won` and `lost` mutation sites with one fixed-step terminal transaction.

- [x] Map current defeat, victory, save, overlay and diagnostics owners.
- [x] Identify the simultaneous breach/clear path.
- [x] Define parent domain and child DSK responsibilities.
- [x] Preserve command, phase, replay and frame authority as dependencies.
- [ ] Implement and fixture-gate the boundary.

## Current ownership split

```txt
updateUnit
  -> core breach
  -> lost mutation
  -> enemy deletion

update
  -> wave-clear evaluation
  -> won mutation
  -> victory message
  -> localStorage success write

drawUI
  -> Boolean priority: won before lost

GameHost
  -> independent won/lost observation
```

## Parent domain

```txt
phantom-command-terminal-outcome-authority-domain
```

## Evidence DSK

```txt
phantom-command-terminal-evaluation-input-kit
phantom-command-core-breach-predicate-kit
phantom-command-final-wave-clear-predicate-kit
phantom-command-terminal-event-kit
```

Services:

```txt
collect core health, wave, spawn and enemy facts
record core-breach and wave-clear events
preserve prior phase and outcome
attach run epoch, tick and state fingerprint
perform no terminal mutation
```

## Arbitration DSK

```txt
phantom-command-outcome-priority-policy-kit
phantom-command-exclusive-outcome-arbitration-kit
phantom-command-terminal-transition-kit
phantom-command-terminal-latch-kit
```

Services:

```txt
evaluate defeat and victory predicates
resolve simultaneous evidence deterministically
require defeat when coreHealth <= 0
require positive core for victory
commit one ACTIVE, VICTORY or DEFEAT transition
reject a second terminal transition in the same run epoch
```

## Result and persistence DSK

```txt
phantom-command-terminal-result-kit
phantom-command-terminal-persistence-policy-kit
phantom-command-terminal-save-admission-kit
```

Services:

```txt
publish typed terminal result
attach reason, tick, epoch and fingerprint
admit success persistence only from committed victory
reject persistence after defeat or conflicting evidence
correlate checkpoint candidate with terminal result ID
```

## Projection and observation DSK

```txt
phantom-command-terminal-frame-receipt-kit
phantom-command-terminal-observation-kit
```

Services:

```txt
project one outcome to message, overlay and diagnostics
publish first terminal frame identity
record world, HUD, minimap, overlay, CRT and GameHost acknowledgements
reject mixed terminal revisions
```

## Proof DSK

```txt
phantom-command-terminal-outcome-fixture-kit
```

Required rows:

```txt
breach before final wave
final-wave victory with positive core
simultaneous breach and final clear
duplicate terminal evaluation
late predecessor tick
victory persistence acceptance
defeat persistence rejection
terminal replay parity
restart epoch retirement
first terminal frame correlation
```

## Contracts

### TerminalEvaluationInput

```txt
runId
runEpoch
tickId
priorPhase
priorOutcome
coreHealth
waveIndex
waveCount
waveActive
spawnCount
enemyCount
coreBreachEvents
waveClearEvents
stateFingerprintBefore
```

### TerminalOutcomeResult

```txt
resultId
runId
runEpoch
tickId
status
reason
transitioned
latched
coreHealth
waveIndex
stateFingerprintAfter
persistenceDecision
```

### TerminalFrameReceipt

```txt
frameId
terminalResultId
tickId
runEpoch
stateFingerprint
presentationRevision
consumerAcks
```

## Dependency order

```txt
Continue resolver
  -> display/input projection
  -> campaign command and phase admission
  -> fixed-step command/tick/frame authority
  -> exclusive terminal-outcome transaction
  -> lifecycle restart epoch
  -> checkpoint capture and resume
```