# Touch Wave and Order Immobility Loop

**Timestamp:** `2026-07-15T03-24-35-04-00`

## Summary

Touch pointers can enter the campaign and perform primary-button selection, but the first wave starts only through Space or direct `GameHost.startWave()`. Unit orders require secondary-button input, camera pan requires middle-button or keyboard input, zoom requires wheel input and tower choice requires number keys. The normal touch-only player loop stalls before the first wave.

## Plan ledger

**Goal:** guarantee that an admitted touch-only player can execute the complete start, defend, build, command, pause and terminal loop.

- [x] Trace touch-reachable campaign mutations.
- [x] Trace keyboard, middle-button, secondary-button and wheel-only actions.
- [x] Identify the first hard progression gate.
- [x] Define required semantic campaign actions.
- [ ] Implement touch action producers.
- [ ] Prove a complete six-wave touch-only campaign fixture.

## Current touch path

```txt
open game.html on touch-only device
  -> campaign boot succeeds
  -> one canvas receives pointer events
  -> tap can select one ally or pad
  -> drag can box-select allies
  -> second tap on selected empty pad can build default spire
  -> no Space producer exists
  -> first wave remains inactive
  -> no right-click producer exists
  -> selected units cannot receive move or attack orders
  -> no middle-button, wheel or keyboard camera producer exists
  -> battlefield navigation is incomplete
```

## Required gameplay actions

```txt
campaign navigation
  camera pan
  camera zoom
  camera focus

unit command
  single selection
  additive selection
  box selection
  move order
  attack order

construction
  pad selection
  tower type selection
  explicit build confirmation

campaign lifecycle
  start next wave
  pause or resume
  restart after failure
  exit to menu
```

## Settlement requirement

Every action must produce one typed result and mutate at most one accepted campaign or camera revision. Gesture cancellation, orientation changes and hybrid-device input must not produce duplicate builds, duplicated orders or repeated wave starts.

## Completion fixture

```txt
touch-only browser
  -> enter campaign
  -> pan and zoom
  -> select units
  -> issue a move order
  -> select each tower type
  -> build a tower
  -> start the first wave
  -> pause and resume
  -> reach a terminal result
  -> restart or exit
  -> verify each action result reaches a matching visible frame
```

No touch gameplay execution was performed during this documentation run.