# Terminal Result and Restart Command Map

**Timestamp:** `2026-07-11T13-28-37-04-00`

## Summary

Terminal state is observed through mutable booleans, while `R` performs an untyped page reload. There is no acknowledgement of the terminal result, no run-epoch retirement and no guarantee that input, frame and persistence work from the prior run are fenced before restart.

## Plan ledger

**Goal:** route terminal acknowledgement and restart through typed commands bound to one terminal result and run epoch.

- [x] Trace terminal overlay and key handling.
- [x] Trace `R`, Escape and `GameHost` surfaces.
- [x] Identify missing terminal and restart identities.
- [x] Define admission and result contracts.
- [ ] Implement after phase and lifecycle ownership exist.

## Current interaction map

```txt
terminal state
  -> overlay reads won/lost
  -> no explicit acknowledgement

R key
  -> location.reload()
  -> browser tears down implicitly
  -> new module-scope state is constructed

Escape
  -> navigate to menu
  -> no typed terminal exit or teardown result

GameHost
  -> reads won and lost
  -> no terminalResultId
  -> no acknowledge or restart service
```

## Required commands

### AcknowledgeTerminal

```txt
commandId
runId
runEpoch
terminalResultId
source
```

### RestartCampaign

```txt
commandId
sessionId
runId
expectedRunEpoch
expectedTerminalResultId
source
```

## Admission rules

```txt
acknowledgement requires a committed terminal result
acknowledgement is idempotent
restart requires terminal phase or an explicit debug policy
restart rejects stale terminal result IDs
restart retires held input and pending commands
restart advances run epoch
restart revokes predecessor frame and persistence work
restart publishes a typed result and first new-run frame receipt
```

## Required interaction result

```txt
RestartCampaignResult
  commandId
  priorRunId
  priorRunEpoch
  priorTerminalResultId
  nextRunId
  nextRunEpoch
  accepted
  reason
  firstFrameId
```

## Fixture rows

```txt
R after victory
R after defeat
R before terminal -> rejected or explicit debug policy
repeated R -> one restart
stale predecessor terminal ID -> rejected
Escape after terminal -> ordered exit and teardown
GameHost restart -> same command path as keyboard
first new-run frame contains no predecessor terminal identity
```