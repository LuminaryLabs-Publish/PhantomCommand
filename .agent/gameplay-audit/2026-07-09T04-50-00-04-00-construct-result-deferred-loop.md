# PhantomCommand Gameplay Audit: Construct Result Deferred Loop

**Timestamp:** `2026-07-09T04-50-00-04-00`

## Gameplay status

`PhantomCommand` is currently a construct-viewer proof, not a full RTS gameplay slice.

The active player loop is pan, zoom, skip, restart, and watch the command platform construct itself. The Phantom Commander and Grim Reaper Totem are visual proxies only.

## Current gameplay loop

```txt
open index.html
  -> start scene
  -> game.html begins construct animation
  -> player watches ring handoff build inward/outward sequence
  -> player pans with WASD/arrows
  -> player zooms with wheel
  -> player skips with Space or Skip button
  -> player restarts with R or Restart button
  -> phase reaches command online when all pieces settle
```

## Current gameplay domains

```txt
menu-start
scene-open
construct-sequence
ring-formation
piece-motion
camera-pan
camera-zoom
skip-command
restart-command
hud-progress
construct-complete-visual-phase
phantom-commander-visual-proxy
grim-reaper-totem-visual-proxy
legacy-gamehost-state
```

## Deferred gameplay domains

```txt
construct-event-envelope
construct-event-result
construct-completion-idempotency
construct-event-journal
scenario-bootstrap-command
scenario-bootstrap-result
scenario-bootstrap-snapshot
necropolis-command-loop
unit-command-loop
resource-loop
enemy-wave-loop
objective-loop
rts-boundary-placeholder
```

## Why construct result is deferred

The source profile is not yet source-owned.

Construct completion currently emerges from inline visual state:

```txt
done === parts.length
  -> complete = true
  -> phase = command online
  -> HUD changes
  -> GameHost reports phase/progress/pieces/rings
```

That is not enough to safely bootstrap gameplay, because there is no stable source snapshot proving which construct profile produced the completed scene.

## Required ordering

```txt
sourceProfile parity fixture passes
  -> GameHost sourceProfile readback passes
  -> fixture build gate passes
  -> central ledger parity row passes
  -> ConstructEventEnvelope
  -> ConstructEventResult
  -> ConstructEventJournal
  -> ScenarioBootstrapCommand
  -> ScenarioBootstrapResult
  -> RTS boundary placeholder
```

## Gameplay services currently offered

```txt
route to game
animate construction
pan camera target
zoom camera distance
skip construct
restart construct
report progress
report phase
report total pieces
report ring counts
```

## Gameplay services needed next

```txt
create construct source event envelope
emit construct_complete only after sourceProfile parity passes
reject duplicate construct_complete
block scenario bootstrap until construct_complete exists
reject duplicate scenario bootstrap
journal construct and bootstrap results
expose construct result through GameHost only after sourceProfile readback is stable
```

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Freeze + Fixture Build Central Ledger Gate
```
