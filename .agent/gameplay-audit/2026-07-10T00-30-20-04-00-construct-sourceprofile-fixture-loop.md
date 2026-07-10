# PhantomCommand Gameplay Audit: Construct SourceProfile Fixture Loop

**Timestamp:** `2026-07-10T00-30-20-04-00`

## Current player loop

```txt
open menu
  -> choose Start or Open Scene
  -> watch construct form from inner rings outward
  -> pan with WASD / arrows
  -> zoom with mouse wheel
  -> Space or Skip completes construct
  -> R or Restart resets construct timing
  -> HUD reports constructed count, phase, build id, and progress
```

## Current runtime loop

```txt
startedAt begins prewarmed
  -> frame computes time/dt
  -> construct(time - startedAt)
  -> accelTime adjusts sequence time
  -> each piece computes local progress from delay
  -> each piece mutates position and rotation
  -> done count derives progress
  -> phase becomes ring N of 10 or command online
  -> HUD mutates bar/count/phase/status
  -> tower and commander idle motion update
  -> pan/zoom/camera update
  -> renderer renders frame
```

## Gameplay state facts

```txt
buildId: smooth-ring-handoff-v6
ring count: 10
ring gaps: all zero
ring part counts: [5,5,5,5,6,8,10,12,16,20]
total pieces: 92
total build seconds: 19.923
main controls: pan, zoom, skip, restart
victory/completion phase: command online
```

## Gameplay blocker

The construct is visually playable, but not source-proven.

There is no fixture-readable action/result surface for the construct because the next durable boundary is still source-profile parity, not gameplay expansion.

## Deferred work

```txt
scenario bootstrap
RTS command loop
resource economy
unit control
construct result authority
new visual objects
camera rewrite
```

## Next gameplay-safe gate

```txt
PhantomCommand SourceProfile Fixture Readback Catch-up + GameHost Gate
```

The next implementation should prove the current construct facts first, then keep future gameplay layers blocked until sourceProfile readback is reliable.
