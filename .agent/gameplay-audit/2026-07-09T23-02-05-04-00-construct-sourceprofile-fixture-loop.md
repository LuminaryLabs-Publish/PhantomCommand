# PhantomCommand Gameplay Audit: Construct SourceProfile Fixture Loop

**Timestamp:** `2026-07-09T23-02-05-04-00`

## Current player loop

```txt
open index.html
  -> choose Start or Open Scene
  -> watch the construct assemble
  -> pan with WASD/arrows
  -> zoom with mouse wheel
  -> skip with Space or Skip button
  -> restart with R or Restart button
  -> finish when all pieces settle and phase becomes command online
```

## Current runtime loop

```txt
game.html
  -> define profile constants inline
  -> derive rings inline
  -> derive wedge pieces inline
  -> animate pieces through construct(seq)
  -> progress reaches 1 when all pieces are done
  -> HUD reports constructed count and phase
  -> GameHost reports construct-only legacy state
```

## Gameplay authority status

There is no RTS gameplay loop yet. The existing gameplay is a construct proof and route opener.

The next safe step is not to add units, economy, command results, or scenario bootstrap. The construct itself first needs source-profile fixture proof so later gameplay systems can rely on stable source facts.

## Current gameplay domains

```txt
menu-route
scene-route
construct-timeline-inline-math
skip-restart-control
keyboard-pan-control
wheel-zoom-control
hud-projection
legacy-gamehost-diagnostics
construct-spiral-intro-kit
construct-piece-state-machine
source-profile-parity-next
profile-fixture-next
```

## Kit read

`construct-spiral-intro-kit` can schedule generic pieces and report generic piece states. The live game path does not consume it for the `smooth-ring-handoff-v6` descriptor facts.

The smoke test uses a different ring profile and proves the generic kit, not the shipped visual route.

## Main finding

Gameplay work remains blocked by construct source-profile authority. If scenario or RTS mechanics are added first, they will anchor to inline browser facts instead of fixture-readable source descriptors.

## Next gameplay-safe ledge

```txt
PhantomCommand SourceProfile Consumer Refresh + GameHost Fixture Gate
```

## Required fixture expectations

```txt
buildId: smooth-ring-handoff-v6
ringCount: 10
ringGapBase: 0
ringGapGrowth: 0
ringPartCounts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
totalBuildSeconds: 19.923
legacy GameHost fields preserved
scenarioBootstrap: deferred
constructResult: deferred
```
