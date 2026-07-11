# PhantomCommand Input and Host Command Admission Map

**Timestamp:** `2026-07-10T23-40-35-04-00`

## Input sources

```txt
canvas pointermove
canvas pointerdown
canvas pointerup
canvas contextmenu
canvas wheel
window keydown
window keyup
window blur
window.GameHost.startWave()
window.GameHost.build()
window.GameHost.setZoom()
```

## Current admission paths

| Source | Request | Current behavior | Result |
| --- | --- | --- | --- |
| left click | ally or pad selection | calls `selectAt()` immediately | `undefined` |
| second click on selected pad | tower build | `selectAt()` calls `build()` immediately | `undefined` |
| drag selection | select allies in rectangle | writes `state.selected` immediately | none |
| right click | move or target order | calls `order()` immediately | `undefined` |
| Space | start wave | calls `startWave()` immediately | `undefined` |
| keys 1-3 | tower type | writes `state.towerType` immediately | none |
| P | pause | toggles `state.paused` immediately | none |
| F | focus camera | writes camera state immediately | none |
| R | restart | calls `location.reload()` | navigation side effect |
| Escape | exit | assigns `location.href` | navigation side effect |
| GameHost.startWave | start wave | direct function call | `undefined` |
| GameHost.build | build | direct function call | `undefined` |
| GameHost.setZoom | zoom | writes `camera.targetZoom` | none |

## Authority problem

DOM events and GameHost calls are separate public entry points into the same mutable state. They do not share:

```txt
source identity
session identity
command ID
sequence
target tick
preflight
result
reason
journal row
state fingerprint
committed frame
```

This prevents deterministic comparison between user input, automated proof, replay, and future network or editor sources.

## Required adapter output

```txt
CampaignCommandRequest
  source
  sourceEventId
  sessionId
  kind
  payload
  requestedTargetTick
  observedFrameId
```

The command authority then adds:

```txt
commandId
sequence
resolvedTargetTick
```

## Source adapters

### Pointer adapter

```txt
click ally -> selection command
click empty pad -> pad-select command
second pad activation -> explicit build request, not implicit call from selection
rectangle drag -> selection-replace command
right click near enemy -> target-order command
right click elsewhere -> move-order command
```

### Keyboard adapter

```txt
Space -> wave-start command
1/2/3 -> tower-type presentation command or state command with explicit ownership
P -> pause command
F -> camera-focus presentation command
R -> lifecycle restart request
Escape -> lifecycle route-exit request
```

Restart and exit must not remain ordinary campaign commands because they own session lifecycle and resource teardown.

### GameHost adapter

Compatibility methods should submit the same commands as browser input and return typed results or command receipts. New direct mutator methods must not be added.

```txt
submitCommand(command)
getCommandResult(commandId)
getCommandJournal()
getCommittedFrame()
```

Existing `startWave()` and `build()` may remain temporary aliases that call `submitCommand()`.

## Admission states

```txt
starting -> reject gameplay commands
running -> admit supported commands
paused -> admit only policy-approved commands
won -> reject simulation commands with campaign-terminal
lost -> reject simulation commands with campaign-terminal
stopping -> reject with session-stopping
disposed -> reject with stale-session
```

## Blur and stuck-input behavior

`blur` currently clears keys and pointer drag state. The command boundary should additionally record the cancellation of uncommitted presentation gestures without fabricating simulation commands.

## Acceptance proof

```txt
- pointer, keyboard, and GameHost sources produce the same command schema
- no input handler mutates simulation state directly
- one source request creates at most one command
- duplicate source-event IDs are rejected or deduplicated deterministically
- commands are ordered by sequence and target tick
- restart and exit route through lifecycle authority
- clone-safe journals identify every accepted, rejected, and no-op request
```
