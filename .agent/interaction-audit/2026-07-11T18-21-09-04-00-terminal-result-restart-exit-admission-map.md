# Interaction Audit: Terminal Result, Restart and Exit Admission

**Timestamp:** `2026-07-11T18-21-09-04-00`

## Summary

Terminal transition, restart and exit are not command/result flows. Combat mutates terminal flags, `R` reloads the document, Escape navigates to the menu, and GameHost exposes direct live actions. None of these operations proves which run or terminal result it belongs to.

## Plan ledger

**Goal:** route terminal evidence and post-terminal user actions through typed, epoch-scoped admission.

- [x] Trace keyboard and GameHost ingress.
- [x] Trace terminal mutation and display.
- [x] Identify reload/navigation bypasses.
- [x] Define command and result boundaries.
- [ ] Implement after session/phase identity exists.

## Current ingress

```txt
combat update
  -> mutates won/lost/message/storage directly

R key
  -> location.reload()

Escape key
  -> location.href = './'

GameHost
  -> exposes mutable state, camera, startWave and build
```

## Missing command envelopes

```txt
TerminalEvidenceCommand
RestartRunCommand
ExitCampaignCommand
PersistTerminalResultCommand
```

Each requires:

```txt
commandId
sessionId
runEpoch
sourceResultId
sequence
targetTick
requestedAction
```

## Admission matrix

| Phase | Terminal evidence | Restart | Exit | Build/order/wave |
|---|---:|---:|---:|---:|
| `ACTIVE` | yes | policy | yes | yes |
| `VICTORY` | stale/duplicate only | yes | yes | no |
| `DEFEAT` | stale/duplicate only | yes | yes | no |
| `RESTARTING` | no | duplicate/no-op | policy | no |
| `EXITING` | no | no | duplicate/no-op | no |

## Required flow

```txt
CombatResolutionResult
  -> terminal evidence adapter
  -> TerminalOutcomeResult
  -> phase commit
  -> persistence/projection effects

RestartRunCommand
  -> validate terminal result and run epoch
  -> retire input and callbacks
  -> create next run epoch
  -> construct fresh campaign state
  -> acknowledge first active frame

ExitCampaignCommand
  -> validate session and phase
  -> stop campaign resources
  -> navigate after teardown result
```

## Required results

```txt
TerminalEvidenceAdmissionResult
RestartRunResult
ExitCampaignResult
TerminalPersistenceResult
```

## Guardrail

Reload and navigation may remain browser adapters, but they must execute only after the corresponding admitted result. They cannot be the authority transaction themselves.