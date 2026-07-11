# Interaction Audit: Stop, Dispose, Navigate and Restart Admission

**Timestamp:** `2026-07-11T19-48-09-04-00`

## Summary

Current input callbacks can trigger navigation or reload without lifecycle admission. A typed command map is required so duplicate, stale and wrong-phase requests cannot create overlapping teardown or replacement work.

## Plan ledger

**Goal:** define lifecycle command admission and result semantics.

- [x] Trace input and global mutation paths.
- [x] Define command/result categories.
- [ ] Implement the admission matrix.

## Commands

```txt
StartSessionCommand
StopSessionCommand
DisposeSessionCommand
NavigateCommand
RestartCommand
SuspendForBfcacheCommand
ResumeFromBfcacheCommand
```

## Admission matrix

```txt
CREATED    -> Start
STARTING   -> no duplicate Start
READY      -> Stop, Navigate, Restart, Suspend
STOPPING   -> duplicate Stop returns retained result
STOPPED    -> Dispose
DISPOSING  -> duplicate Dispose returns retained result
DISPOSED   -> Navigate or new-generation Start
FAILED     -> Dispose or cold replacement only
```

## Result fields

```txt
commandId
sessionId
runtimeGeneration
previousPhase
nextPhase
accepted | duplicate | stale | rejected | failed
leaseCountsBefore
leaseCountsAfter
retirementReceipts
navigationTarget
replacementSessionId
firstFrameId
failure
```
