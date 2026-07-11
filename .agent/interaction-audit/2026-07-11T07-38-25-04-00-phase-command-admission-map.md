# Phase Command Admission Map

**Timestamp:** `2026-07-11T07-38-25-04-00`

## Summary

Keyboard, pointer, wheel and `GameHost` sources currently bypass a shared command boundary. Campaign phase must be checked after source normalization and before any mutation.

## Plan ledger

**Goal:** map every interaction source to typed commands and one phase-aware admission service.

- [x] Inventory browser and host sources.
- [x] Map direct mutators.
- [x] Define normalized command kinds.
- [x] Define phase admission ordering.
- [ ] Replace callback mutation with command emission.
- [ ] Add source-parity fixtures.

## Current source map

| Source | Current direct behavior |
|---|---|
| left click/drag | selection mutation; double-click empty pad may build |
| right click | move or target order |
| middle drag | camera pan |
| wheel | camera zoom around pointer |
| Space | start wave |
| 1/2/3 | change selected tower type |
| P | toggle Boolean pause |
| R | page reload |
| Escape | navigate to menu |
| F | recenter camera on selection |
| WASD/arrows | camera velocity every RAF |
| `GameHost.startWave` | direct wave mutation |
| `GameHost.build` | direct economy/tower mutation |
| `GameHost.setZoom` | direct camera target mutation |

## Target command kinds

```txt
SelectPoint
SelectRegion
BuildTower
IssueOrder
StartWave
SetTowerType
PauseCampaign
ResumeCampaign
PanCamera
ZoomCamera
FocusSelection
RestartCampaign
ExitCampaign
```

## Admission order

```txt
raw source event
  -> normalize coordinates and intent
  -> assign source, command ID and sequence
  -> attach sessionId/runId/observedPhase
  -> phase admission matrix
  -> gameplay preflight
  -> queue for deterministic target tick or route to presentation/lifecycle owner
  -> typed result
  -> bounded journal and observation
```

## Stable rejection reasons

```txt
PAUSED_GAMEPLAY_BLOCKED
TERMINAL_STATE_LOCKED
TRANSITION_IN_PROGRESS
SESSION_DISPOSED
STALE_SESSION
STALE_RUN
STALE_OBSERVED_PHASE
INVALID_COMMAND_FOR_PHASE
NO_SELECTION
NO_BUILD_PAD
PAD_OCCUPIED
INSUFFICIENT_SOULS
WAVE_ALREADY_ACTIVE
CAMPAIGN_COMPLETE
```

## Source parity requirement

The same logical command from pointer, keyboard or `GameHost` must receive the same phase and gameplay result. `GameHost` must not remain a privileged mutation bypass.

## Input retirement

Entering `PAUSED`, `WON`, `LOST` or `TRANSITIONING` must retire:

```txt
held movement keys
active drag selection
middle-pan state
queued gameplay commands not yet applied, according to declared policy
stale source events carrying the prior observed phase
```

## Observation

```txt
phase
phaseSequence
lastAcceptedCommand
lastRejectedCommand and reason
pending command count
retired input count
state fingerprint
latest committed frame ID
```