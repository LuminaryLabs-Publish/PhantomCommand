# PhantomCommand Gameplay Audit: Construct Proof SourceProfile Gate Loop

**Timestamp:** `2026-07-09T07-19-41-04-00`

## Current gameplay loop

```txt
open menu
  -> start scene
  -> watch ritual construct form
  -> pan camera
  -> zoom camera
  -> skip or restart the construct
  -> reach command online phase
```

This is a construct proof loop, not yet a complete RTS loop.

## Current controls

```txt
Start button: navigate to game.html
Open Scene link: navigate to game.html
WASD / arrow keys: pan camera target
Mouse wheel: zoom
Space / Skip: force construction complete
R / Restart: restart construction
```

## Gameplay domains in use

```txt
menu-start-domain
scene-entry-domain
construct-formation-domain
construct-progress-domain
camera-pan-domain
camera-zoom-domain
skip-domain
restart-domain
hud-feedback-domain
gamehost-diagnostics-domain
```

## Blocked gameplay domains

```txt
construct-event-result-domain
construct-completion-idempotency-domain
scenario-bootstrap-domain
rts-unit-command-domain
undead-roster-command-domain
building-placement-domain
economy-progression-domain
wave-control-domain
combat-resolution-domain
```

## Main gameplay finding

The current loop should not be expanded into full RTS commands yet. `construct_complete` is still an implicit phase string and progress state inside `game.html`, not a typed idempotent result that can safely unlock scenario bootstrap.

## Required gate before RTS expansion

```txt
sourceProfile parity passes
  -> legacy GameHost fields remain compatible
  -> GameHost sourceProfile readback exists
  -> construct_complete result contract exists
  -> duplicate complete result is idempotent
  -> scenario bootstrap can reject construct_incomplete
  -> scenario bootstrap can reject duplicate_scenario_bootstrap
```

## Next safe ledge

```txt
PhantomCommand SourceProfile Readback Ledger + Fixture Build Consumer Gate
```
