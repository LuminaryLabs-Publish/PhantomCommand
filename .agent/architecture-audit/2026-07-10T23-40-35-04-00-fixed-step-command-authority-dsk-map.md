# PhantomCommand Fixed-Step Command Authority DSK Map

**Timestamp:** `2026-07-10T23-40-35-04-00`

## Current architecture

```txt
browser input
  -> DOM listener
  -> selectAt / build / order / startWave
  -> direct mutation of live campaign state

requestAnimationFrame
  -> compute browser delta
  -> update camera
  -> accumulate delta
  -> run update(1/60) while a fixed step is due
  -> render mutable state
  -> schedule the next frame

GameHost
  -> exposes mutable state and camera
  -> calls startWave and build directly
  -> returns an aggregate clone without command or frame history
```

The existing fixed-step loop stabilizes simulation integration but does not stabilize request ordering. Browser callbacks run outside the simulation step and mutate the same state consumed by `update()` and `render()`.

## Active domain ownership

| Domain | Current owner | Services | Boundary issue |
| --- | --- | --- | --- |
| selection | `selectAt()` and pointer listeners | ally selection, additive selection, pad selection, clear | pad selection also triggers building on a second click |
| building | `build()` | pad lookup, cost check, tower creation, soul debit, effect, message | silent rejection and no result |
| unit orders | `order()` | selected-unit lookup, target selection, formation offsets, effect | immediate mutation and silent no-selection return |
| wave start | `startWave()` | phase checks, spawn queue creation, message | rejection reasons collapse into `undefined` |
| keyboard input | window listeners | wave, tower type, pause, restart, exit, camera focus | direct mutation and navigation |
| pointer input | canvas listeners | selection, drag, orders, pan, zoom | no source identity or sequence |
| GameHost | global object | state, camera, startWave, build, aggregate state, zoom | mutable authority leaks outside the runtime |
| fixed-step simulation | `frame()` and `update()` | accumulator and exact `1/60` advancement | requests are not drained at tick boundaries |
| render | draw functions and CRT renderer | world, HUD, minimap, modal, CRT | no committed-frame identity |

## Proposed composed domain

```txt
phantom-command-campaign-action-authority-domain
  ├─ phantom-command-action-command-kit
  ├─ phantom-command-command-source-adapter-kit
  ├─ phantom-command-action-sequence-kit
  ├─ phantom-command-target-tick-kit
  ├─ phantom-command-action-preflight-kit
  ├─ phantom-command-action-result-kit
  ├─ phantom-command-fixed-step-command-queue-kit
  ├─ phantom-command-command-application-kit
  ├─ phantom-command-action-journal-kit
  ├─ phantom-command-event-journal-kit
  ├─ phantom-command-state-fingerprint-kit
  ├─ phantom-command-committed-frame-kit
  ├─ phantom-command-render-consumption-kit
  └─ phantom-command-gamehost-observation-kit
```

## Kit contracts

### Action command kit

Produces a clone-safe envelope:

```txt
commandId
sequence
sessionId
source
kind
targetTick
payload
issuedAtFrame
```

Representative kinds:

```txt
selection.replace
selection.toggle
selection.clear
pad.select
build.request
order.move
order.target
wave.start
pause.set
camera.focus
camera.zoom
```

### Command source adapter kit

Normalizes pointer, keyboard, hidden accessibility-button, `window.GameHost`, and replay requests. Adapters may not mutate campaign state.

### Action sequence kit

Allocates one monotonic sequence per campaign session before preflight so rejected requests remain ordered and observable.

### Target tick kit

Maps each simulation command to a deterministic tick, normally `current committed tick + 1`. Stale or invalid ticks return typed rejection.

### Action preflight kit

Purely evaluates committed state and payload. It must not allocate IDs, debit souls, create effects, or mutate selection.

Stable reasons include:

```txt
accepted
no-selection
pad-not-found
pad-occupied
insufficient-souls
wave-already-active
campaign-terminal
wave-script-exhausted
invalid-target
stale-command
unsupported-command
```

### Action result kit

Returns:

```txt
status: accepted | rejected | no-op
reason
sequence
commandId
targetTick
appliedTick
beforeFingerprint
afterFingerprint
eventIds
```

Rejected and no-op results must preserve the fingerprint.

### Fixed-step command queue kit

Drains commands at the start of a simulation tick in this order:

```txt
targetTick ascending
sequence ascending
```

No DOM callback may bypass the queue for simulation-authoritative mutation.

### Command application kit

Owns mutation after accepted preflight, allocates state-owned IDs, and emits domain events.

### Journals

The action journal stores bounded clone-safe command/result rows. The event journal records deterministic state transitions such as selection changes, tower creation, orders, wave start, spawning, damage, rewards, sanctum changes, wave clear, and terminal outcomes.

### State fingerprint kit

Canonicalizes simulation-authoritative fields only. Browser timestamps and visual-only clocks must not enter the fingerprint.

### Committed frame kit

After each fixed tick, publishes an immutable presentation snapshot tied to:

```txt
sessionId
tickId
frameId
lastAppliedSequence
stateFingerprint
```

### Render consumption kit

Records that world, HUD, minimap, modal, CRT, and GameHost consumers observed the same committed frame.

### GameHost observation kit

Adds clone-safe readback while preserving compatibility:

```txt
getCommandJournal()
getResultJournal()
getEventJournal()
getCommittedFrame()
getRenderConsumption()
```

Direct mutable state and camera exposure should be deprecated after compatibility migration, not expanded.

## State split

```txt
CampaignSimulationState
  economy, health, waves, queues, units, towers, projectiles, effects
  selection, campaign flags, messages, ID counters, tick and command sequence

CampaignPresentationState
  camera, pointer, drag, source-canvas dimensions, browser frame time
  CRT settings and render-consumption rows
```

## Dependency order

```txt
Continue resolver
  -> campaign session intent
  -> action authority within that session
  -> lifecycle ownership of the session
  -> versioned save of committed state and journals
```

## Acceptance proof

```txt
same initial state + same ordered commands -> same results, events, and fingerprint
rejected command -> unchanged fingerprint
multiple requests in one browser frame -> deterministic sequence order
requests near accumulator boundaries -> deterministic target ticks
all render consumers -> one shared committed frame ID
GameHost readback -> clone-safe and mutation-proof
```
