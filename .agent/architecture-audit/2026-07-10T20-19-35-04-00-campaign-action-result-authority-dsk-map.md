# Campaign Action Result Authority DSK Map

**Timestamp:** `2026-07-10T20-19-35-04-00`

## Purpose

Define the smallest campaign-internal boundary that turns raw pointer and keyboard events into deterministic, inspectable action outcomes without extracting or rewriting the entire campaign runtime.

## Current authority map

```txt
src/campaign/campaign-scene.js
  owns map and gameplay descriptors
  owns mutable state and identifier counters
  owns input listeners
  owns action admission and mutation
  owns the fixed-step accumulator
  owns AI, combat, economy, and win/loss mutation
  owns rendering and CRT submission
  owns persistence write
  owns GameHost diagnostics
```

The live campaign is one authority surface. It contains no explicit transition from request to preflight, result, committed simulation tick, rendered frame, or readback observation.

## Current action entry points

| Function or path | Request source | Preconditions | Rejection behavior | Success behavior |
|---|---|---|---|---|
| `selectAt(world, add)` | pointer-up | nearest ally or unoccupied pad | clears selection on empty | mutates selection; repeated pad click calls `build()` |
| `build()` | repeated pad click or `GameHost.build` | selected pad, no tower, enough souls | silent `return` | spends souls, allocates tower ID, mutates pad/tower state |
| `order(world)` | right-click | selected ally IDs | silent `return` | assigns target or movement positions |
| `startWave()` | Space or `GameHost.startWave` | inactive, not won/lost, wave remains | silent `return` | builds spawn queue and sets wave active |
| tower type keys | keyboard | none | none | direct `state.towerType` mutation |
| pause key | keyboard | none | none | direct `state.paused` mutation |
| focus key | keyboard | selected units optional | none | direct camera mutation |
| restart key | keyboard | none | none | page reload |

## Architectural problem

```txt
browser event
  -> direct mutable function call
  -> optional silent return
  -> mutation happens between simulation ticks
  -> next accumulator step observes whatever state exists
  -> render reads that live state
  -> GameHost returns unrelated aggregate counters
```

There is no stable evidence of:

```txt
what was requested
who requested it
when it was requested
which state was inspected
why it was accepted or rejected
which tick committed it
which entities changed
which event rows were emitted
which state fingerprint resulted
which frame rendered that result
```

## Proposed composed DSK boundary

```txt
phantom-command-action-command-kit
  -> normalizes UI and GameHost requests
  -> assigns commandId and sequence

phantom-command-action-preflight-kit
  -> evaluates one request against one committed state
  -> returns explicit admission facts

phantom-command-action-result-kit
  -> returns accepted | rejected | no-op
  -> preserves reason and affected IDs

phantom-command-fixed-step-command-queue-kit
  -> schedules accepted mutation for a deterministic tick
  -> never mutates simulation state from DOM listeners

phantom-command-action-journal-kit
  -> retains bounded immutable command/result rows

phantom-command-event-journal-kit
  -> retains bounded gameplay event rows

phantom-command-state-fingerprint-kit
  -> fingerprints canonical simulation state

phantom-command-committed-frame-kit
  -> commits tick, command range, state fingerprint, and presentation snapshot

phantom-command-render-consumption-kit
  -> records which committed frame reached world, HUD, minimap, modal, and CRT

phantom-command-gamehost-observation-kit
  -> exposes bounded immutable observations without raw mutable references
```

## Command contract

```txt
commandId
sequence
source: pointer | keyboard | gamehost | replay
requestedAtFrame
executeAtTick
type
payload
```

Initial command types:

```txt
selection.select-at
selection.clear
build.select-pad
build.construct-tower
order.issue
wave.start
loadout.select-tower-type
simulation.set-paused
camera.focus-selection
```

Route navigation and page reload should remain host commands, not simulation commands.

## Preflight contract

```txt
commandId
sequence
stateFingerprintBefore
admitted
reason
normalizedPayload
dependencies
```

Required rejection reasons:

```txt
no-target
no-selected-pad
pad-occupied
insufficient-souls
no-selected-units
wave-already-active
campaign-won
campaign-lost
no-wave-remaining
invalid-tower-type
invalid-payload
```

## Result contract

```txt
commandId
sequence
status: accepted | rejected | no-op
reason
executedAtTick
stateFingerprintBefore
stateFingerprintAfter
affectedEntityIds
events
```

## Committed-frame contract

```txt
frameId
tickId
simulationTime
commandSequenceStart
commandSequenceEnd
actionResultIds
stateFingerprint
cameraSnapshot
renderSnapshot
```

## Composition rules

1. DOM listeners only normalize requests and enqueue commands.
2. GameHost must use the same command path as pointer and keyboard input.
3. Preflight and mutation must execute against one deterministic tick boundary.
4. Rejected requests must still produce result rows.
5. `selectAt()` must stop hiding a build request inside selection logic.
6. Camera-only requests must not affect the simulation fingerprint.
7. Rendering must consume a committed snapshot, not the mutable simulation object.
8. Journals must be bounded and clone-safe.
9. Existing controls, constants, rendering, and legacy GameHost fields must remain compatible during the additive slice.

## Dependency order

```txt
Continue capability resolver and session mode
  -> action command schema
  -> preflight and result schema
  -> deterministic fixed-step queue
  -> action and event journals
  -> state fingerprint
  -> committed frame
  -> render consumption
  -> GameHost observation
  -> DOM-free fixtures
```

## Safe boundary

Do not split the full monolithic campaign file during this proof. Add pure functions and narrow adapters first. Preserve all gameplay tuning, visual output, route behavior, and existing public diagnostics while the new immutable observation path is established.