# PhantomCommand Gameplay Audit: Construct Proof Blocker Loop

**Timestamp:** `2026-07-09T16-20-45-04-00`

## Current player loop

```txt
open index.html
  -> select Start or Open Scene
  -> route to game.html
  -> watch the command platform construct inside-out
  -> pan with WASD or arrow keys
  -> zoom with mouse wheel
  -> skip with Space or Skip button
  -> restart with R or Restart button
  -> reach command online phase
```

## Current runtime loop

```txt
game.html
  -> inline constants define smooth-ring-handoff-v6
  -> ringStartTimes are derived from MOVE_SECONDS * RING_HANDOFF
  -> ring descriptors are derived from width growth and zero-gap policy
  -> ringParts(inner, outer) derives part counts from circumference
  -> makePiece creates start/final positions and rotations
  -> construct(seq) derives local progress for every piece
  -> done count mutates progress and HUD
  -> complete flag sets phase to command online
```

## Gameplay finding

The visible loop is already a working construct proof. The next useful work is not new gameplay.

The blocker is that the active gameplay proof cannot yet prove its own source profile independently of `game.html`.

## Gameplay should not expand yet

```txt
- Do not add RTS units.
- Do not add economy/resource loops.
- Do not add enemy behavior.
- Do not add command issuing.
- Do not add scenario bootstrap.
- Do not rewrite the construct visual.
```

## Required next gameplay proof

```txt
sourceProfile fixture rows prove:
  buildId smooth-ring-handoff-v6
  10 rings
  zero gaps
  [5,5,5,5,6,8,10,12,16,20] ring parts
  92 pieces
  ringStartTimes parity
  totalBuildSeconds parity
  legacy GameHost compatibility
```

## Result authority status

Construct result authority remains deferred.

The current construct has phase/progress readback, but it does not yet emit typed accepted/rejected/complete result records. That should not be cut until sourceProfile parity exists.
