# Interaction Audit: Window GameHost Command Admission Map

**Timestamp:** `2026-07-11T23-28-29-04-00`

## Summary

Browser input and public host calls currently reach campaign mutation through different paths. Browser controls carry implicit event context, while `window.GameHost` exposes ambient functions and raw owner references. Neither path produces a typed command result, but the public path also bypasses the normal interaction intent entirely.

## Plan ledger

**Goal:** converge browser and public interaction on one command contract without exposing runtime owners.

- [x] Map browser pointer, keyboard and wheel ingress.
- [x] Map public host ingress.
- [x] Identify shared internal actions.
- [x] Define command envelope and admission stages.
- [x] Define compatibility behavior.
- [ ] Implement one command routing path.

## Current browser ingress

```txt
pointer click
  -> selectAt(worldPoint, additive)

right click
  -> order(worldPoint)

Space
  -> startWave()

1, 2, 3
  -> direct towerType mutation

P
  -> direct paused mutation

R
  -> location.reload()

F
  -> direct camera target mutation

wheel
  -> direct targetZoom mutation

held WASD/arrows
  -> camera velocity mutation in RAF
```

## Current public ingress

```txt
GameHost.startWave()
  -> direct call

GameHost.build()
  -> direct call using ambient selectedPad and towerType

GameHost.setZoom(value)
  -> direct targetZoom mutation

GameHost.state / camera
  -> unrestricted direct mutation
```

## Required command envelope

```txt
HostCommand {
  commandId,
  capability,
  hostSessionId,
  expectedRunEpoch,
  expectedPhaseRevision,
  expectedFrameId?,
  payload
}
```

Initial supported capabilities should be narrow:

```txt
campaign.wave.start
campaign.camera.zoom
campaign.camera.focus
campaign.selection.clear
```

Tower construction should require an explicit pad ID and tower type rather than ambient selection state. Direct arbitrary state patching must never be supported.

## Admission map

```txt
submit(command)
  -> validate envelope and command ID
  -> validate declared capability
  -> validate host session lifecycle
  -> validate run epoch and phase revision
  -> validate finite, bounded payload
  -> apply pause and terminal policy
  -> translate to internal campaign command
  -> schedule against fixed-step authority
  -> return REJECTED or ACCEPTED_PENDING
  -> publish COMMITTED with tick/frame receipt later
```

## Required interaction results

```txt
REJECTED_INVALID_COMMAND
REJECTED_UNSUPPORTED_CAPABILITY
REJECTED_STALE_HOST
REJECTED_STALE_RUN
REJECTED_STALE_PHASE
REJECTED_PAUSED
REJECTED_TERMINAL
REJECTED_INVALID_TARGET
REJECTED_INSUFFICIENT_SOULS
ACCEPTED_PENDING
COMMITTED
FAILED
```

## Compatibility rule

A temporary `legacy-gamehost-adapter-kit` may translate old method calls into typed commands, but it must:

```txt
expose no state or camera owner
return a typed result
validate finite inputs
carry current host/run/phase identity
remain capability-limited
be observable as legacy usage
```

## Required fixtures

```txt
browser and host wave start share one handler
browser and host zoom share finite-value policy
host build cannot use ambient selectedPad
unknown capability is rejected
command ID duplicate is idempotent or rejected deterministically
stale run/phase command performs zero mutation
terminal command performs zero mutation
accepted command receives later tick/frame correlation
```
