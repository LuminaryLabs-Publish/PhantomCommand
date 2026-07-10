# PhantomCommand Gameplay Audit: Construct SourceProfile Proof Loop

**Timestamp:** `2026-07-10T02-02-24-04-00`

## Current player loop

```txt
open menu
  -> Start or Open Scene
  -> watch command platform construct
  -> pan with WASD/arrows
  -> zoom with mouse wheel
  -> skip with Space or Skip button
  -> restart with R or Restart button
  -> finish at command online
```

## Current gameplay authority

Gameplay is currently a construct spectacle, not an RTS loop. The only player actions are route start, pan, zoom, skip, and restart.

The construct's source truth lives in `game.html` constants and inline functions. `construct-spiral-intro-kit` is generic scheduling machinery, but the live route does not consume it as the source of truth.

## Current loop facts

```txt
build id: smooth-ring-handoff-v6
ring count: 10
gap policy: zero-gap
live ring parts: [5,5,5,5,6,8,10,12,16,20]
live total pieces: 92
move seconds: 2.6
ring handoff: 0.72
part stagger: 0.025
prewarm seconds: 0.45
total build seconds: 19.923
```

## Gameplay blocker

Do not start scenario bootstrap or RTS gameplay yet. The construct itself needs source-owned proof first:

```txt
source profile -> normalized profile -> rings -> pieces -> timing -> parity report -> GameHost sourceProfile -> fixture rows -> build gate
```

Until that exists, downstream gameplay would be built on browser-monolithic construct assumptions.

## Deferred gameplay kits

```txt
scenario-bootstrap-kit
construct-result-authority-kit
phantom-command-objective-kit
phantom-command-unit-command-kit
phantom-command-economy-kit
phantom-command-combat-loop-kit
```

## Next safe gameplay ledge

```txt
PhantomCommand SourceProfile Ledger Catch-up + GameHost Fixture Gate
```

The only gameplay-facing change in the next implementation should be additive readback and fixture proof. Visible controls and scene behavior should stay unchanged.
