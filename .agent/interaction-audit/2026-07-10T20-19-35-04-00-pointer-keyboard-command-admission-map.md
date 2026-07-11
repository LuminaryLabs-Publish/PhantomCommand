# Pointer and Keyboard Command Admission Map

**Timestamp:** `2026-07-10T20-19-35-04-00`

## Menu input path

```txt
pointer move
  -> screenToSource
  -> hover selection mutation

pointer down
  -> screenToSource
  -> panel activation or menu activation
  -> direct transition state mutation

keyboard
  -> selection mutation, panel activation, or route transition
```

Menu input is presentation-oriented, but it still has no normalized action result or event journal. `PhantomMenu.activate()` uses the same direct activation function and exposes no result.

## Campaign pointer path

```txt
pointer move
  -> screenToSource
  -> direct pointer mutation
  -> optional middle-drag camera mutation

left pointer down
  -> begin drag state

left pointer up
  -> click threshold check
  -> selectAt(world, shift)
     or drag-box selection mutation

right pointer down
  -> order(screenToWorld(pointer))

wheel
  -> pointer-anchored target zoom mutation
```

## Campaign keyboard path

```txt
WASD / arrows
  -> held-key Set
  -> camera velocity update each animation frame

Space
  -> startWave()

1 / 2 / 3
  -> direct towerType mutation

P
  -> direct paused mutation

R
  -> location.reload()

Escape
  -> location.href = './'

F
  -> direct camera focus mutation
```

## Admission problems

### Implicit command identity

The runtime cannot distinguish a pad-selection request from a build request until `selectAt()` examines current mutable selection. A repeated click changes semantic meaning without producing a separate command record.

### Silent rejection

`build()`, `order()`, and `startWave()` return `undefined` for both rejection and success. UI, GameHost, tests, and replay tooling cannot distinguish accepted, rejected, and no-op requests.

### Input-source drift

Keyboard, pointer, and GameHost entry points do not create a shared command envelope. GameHost calls can therefore bypass any future UI-only validation unless all sources are normalized through one adapter.

### Timing drift

Gameplay actions execute immediately inside event handlers, while combat and economy mutate inside the fixed-step loop. No recorded target tick establishes ordering between a user action and simulation updates.

### Presentation/simulation mixing

Camera movement, simulation pause, tower loadout, selection, build, orders, wave start, page reload, and route navigation are handled in the same global listener block. They need typed ownership boundaries even if they remain in one source file initially.

## Recommended command families

```txt
gameplay:
  selection.select-at
  selection.select-box
  selection.clear
  build.select-pad
  build.construct-tower
  order.issue
  wave.start
  loadout.select-tower-type
  simulation.set-paused

presentation:
  camera.pan-intent
  camera.zoom-at
  camera.focus-selection

host/navigation:
  session.restart
  route.return-menu
```

## Shared adapter contract

Every pointer, keyboard, GameHost, and replay request should call one adapter:

```txt
submitCommand({
  source,
  type,
  payload,
  requestedAtFrame
}) -> command receipt
```

The adapter should assign sequence, validate shape, choose a target tick for simulation commands, and return a receipt without mutating simulation state from the event callback.

## Required interaction observations

```txt
lastCommandReceipt
lastActionResult
selectedCommandSequenceRange
pointerSourceCoordinates
cameraIntentState
selectionSnapshot
rejectionReason
```

## Compatibility constraints

Preserve current mouse buttons, drag threshold, key bindings, pointer-anchored zoom, camera damping, selection behavior, and route destinations while adding the command layer.