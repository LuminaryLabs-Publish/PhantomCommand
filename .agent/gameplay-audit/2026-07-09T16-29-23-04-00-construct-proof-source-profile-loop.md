# PhantomCommand Gameplay Audit

**Timestamp:** `2026-07-09T16-29-23-04-00`

## Current gameplay loop

```txt
player opens menu
  -> routes to scene
  -> watches construct form
  -> pans around construct
  -> zooms in or out
  -> skips to completion or restarts
  -> construct reaches command online
```

## Current proof loop

```txt
startedAt and totalBuild define construct progress
  -> construct(seq) computes local progress per piece
  -> piece transforms animate from start to final
  -> progress is done / parts.length
  -> phase is ring N of 10 or command online
  -> HUD mirrors progress and phase
  -> GameHost exposes legacy construct state
```

## Gameplay domains

```txt
construct-intro-watch-loop
camera-pan-loop
zoom-control-loop
skip-restart-loop
phase-progression-loop
legacy-gamehost-readback-loop
```

## Gap

The scene is not ready for RTS scenario bootstrap because the current construct proof has no source-owned profile parity. Adding units, economy, enemy logic, or objectives now would bury the live construct contract deeper inside `game.html`.

## Next gameplay-safe cut

```txt
source profile proof
  -> DOM-free fixture
  -> additive GameHost sourceProfile diagnostics
  -> legacy construct state still present
  -> scenario bootstrap remains deferred until source parity passes
```
