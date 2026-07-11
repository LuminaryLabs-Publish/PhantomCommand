# Campaign Action Result Authority DSK Map

**Timestamp:** `2026-07-11T03-31-26-04-00`

## Current authority map

```txt
pointer event / keyboard event / GameHost call
  -> direct function call
  -> immediate mutation of live state or camera
  -> undefined return for success, rejection, and no-op
  -> later fixed-step simulation reads the mutation
  -> render reads the latest mutable state
```

## Active command surfaces

| Surface | Current service | Current result |
|---|---|---|
| `selectAt(world, add)` | select ally, toggle ally, select pad, trigger build, clear selection | `undefined` |
| `build()` | validate selected pad, tower occupancy, soul cost, create tower, spend souls | `undefined` |
| `order(world)` | reject empty selection, choose enemy or move formation, create effect | `undefined` |
| `startWave()` | validate terminal/wave state, create spawn queue, mark active | `undefined` |
| number keys | assign `state.towerType` | no result |
| `p` key | toggle `state.paused` | no result |
| `GameHost.startWave/build` | invoke live mutation functions | no command identity or result |

## Domain split required

```txt
phantom-command-action-authority-domain
  command source
    -> browser-pointer-source-adapter-kit
    -> browser-keyboard-source-adapter-kit
    -> gamehost-source-adapter-kit
    -> replay-source-adapter-kit

  command definition
    -> action-command-envelope-kit
    -> action-sequence-kit
    -> target-tick-policy-kit
    -> command-payload-validator-kit

  decision
    -> action-preflight-kit
    -> action-reason-catalog-kit
    -> action-result-kit

  application
    -> fixed-step-command-queue-kit
    -> command-application-kit
    -> domain-event-journal-kit
    -> state-fingerprint-kit

  presentation
    -> committed-frame-kit
    -> render-consumption-kit
    -> crt-upload-ack-kit
    -> gamehost-command-observation-kit

  proof
    -> action-result-fixture-kit
    -> fixed-step-replay-fixture-kit
    -> frame-consumption-fixture-kit
```

## Command envelope

```txt
commandId
sessionId
sourceKind
sourceId
sequence
requestedAtFrame
requestedAtTick
assignedTargetTick
actionType
payload
```

Action types should initially cover:

```txt
select-point
select-rectangle
clear-selection
select-tower-type
select-pad
build-selected-pad
order-selected-units
start-wave
set-pause
focus-selection
```

## Result envelope

```txt
commandId
sequence
targetTick
status: accepted | rejected | no-op
reason
preStateFingerprint
postStateFingerprint
appliedTick
events
changedPaths
```

Required rejection and no-op reasons include:

```txt
terminal-state
paused
wave-active
all-waves-complete
no-selected-pad
pad-occupied
unknown-tower-type
insufficient-souls
no-selected-units
invalid-world-point
selection-unchanged
pause-unchanged
```

## Invariants

- A source request creates at most one command.
- A command receives exactly one monotonic sequence within one campaign session.
- Accepted mutations apply only at an explicit fixed-step boundary.
- Rejected and no-op requests produce terminal results without mutation.
- Browser, GameHost, and replay requests use the same preflight and application path.
- Every applied command appears in one bounded journal row.
- Every committed frame names the tick range, state fingerprint, and consumed command sequence.
- Rendering and diagnostics never claim a command was presented without a committed-frame acknowledgement.

## Compatibility

Preserve current controls, balance, source-canvas size, visual output, `GameHost.getState()` fields, and route behavior while adding clone-safe authority observations beside them.