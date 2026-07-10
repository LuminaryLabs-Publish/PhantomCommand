# PhantomCommand Interaction Audit — Select Build Order Action Result Map

**Timestamp:** `2026-07-10T08-20-42-04-00`

## Inputs in use

```txt
pointermove -> source pointer tracking / middle-drag pan
pointerdown left -> start drag selection
pointerup left -> selectAt() or drag select
pointerdown right -> order(screenToWorld(pointer))
wheel -> zoom around pointer
keydown WASD/arrows -> pan camera
keydown Space -> startWave()
keydown 1/2/3 -> tower type selection
keydown P -> pause toggle
keydown R -> reload
keydown Escape -> return to menu
keydown F -> focus selected units or sanctum
```

## Interaction loop

```txt
screen input
  -> crt.screenToSource
  -> screenToWorld when needed
  -> selectAt / order / build / startWave / set tower type / camera mutation
  -> state mutation inline
  -> render and GameHost aggregate reflect result later
```

## Current gap

Interactions mutate state directly or return nothing. The runtime cannot currently report a stable accepted/rejected/no-op reason for each command.

Examples:

```txt
selectAt finds no unit or pad -> clears selection silently
selectAt same pad twice -> build() with no result
build no pad -> no result
build occupied pad -> no result
build insufficient souls -> no result
order with no selected units -> no result
startWave when active/won/lost/out of waves -> no result
```

## Needed interaction services

```txt
pointer-source-coordinate-kit
campaign-action-envelope-kit
selection-preflight-kit
build-preflight-kit
order-preflight-kit
wave-start-preflight-kit
action-result-reason-catalog-kit
action-result-journal-kit
GameHost-action-readback-kit
DOM-free-action-fixture-kit
```

## Recommendation

Add action result rows first, then adapt `campaign-scene.js` to continue mutating exactly as today while exposing proof rows through additive `GameHost.getState().campaign` diagnostics.
