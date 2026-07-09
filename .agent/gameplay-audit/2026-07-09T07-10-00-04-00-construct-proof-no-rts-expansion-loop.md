# Gameplay Audit: Construct Proof, No RTS Expansion Loop

**Timestamp:** `2026-07-09T07-10-00-04-00`

## Current player loop

```txt
open menu
  -> start/open scene
  -> watch construct assemble
  -> pan camera
  -> zoom camera
  -> skip construct
  -> restart construct
  -> reach command online phase
```

## Current runtime loop

```txt
game.html module load
  -> build scene
  -> compute rings/pieces
  -> start animation loop
  -> construct(seq) moves pieces
  -> HUD updates progress and phase
  -> input updates camera target/zoom
  -> GameHost reports state
```

## Gameplay domains in use

```txt
construct-viewer-loop
camera-pan-loop
camera-zoom-loop
skip-control-loop
restart-control-loop
construct-progress-loop
construct-completion-phase
legacy-gamehost-diagnostics
```

## Gameplay domains deferred

```txt
rts-unit-control
rts-resource-economy
necropolis-building
wave-spawn-control
unit-command-routing
objective-progression
scenario-bootstrap
construct-complete-result
command-journal-replay
```

## Main gap

`complete` is a visual/HUD phase, not yet a typed, idempotent `ConstructEventResult`. That is acceptable for the current route, but scenario bootstrap should not be started until sourceProfile parity exists and construct completion has a stable result envelope.

## Next gameplay-safe gate

```txt
sourceProfile parity passes
  -> GameHost sourceProfile readback is additive
  -> legacy GameHost shape remains unchanged
  -> construct complete result can be added later
  -> scenario bootstrap can reject early/duplicate calls later
```

## Do not expand yet

```txt
- Do not add RTS controls in the next pass.
- Do not add scenario bootstrap before sourceProfile proof.
- Do not rewrite construct animation.
- Do not convert visual completion into gameplay progression without an idempotent result fixture.
```
