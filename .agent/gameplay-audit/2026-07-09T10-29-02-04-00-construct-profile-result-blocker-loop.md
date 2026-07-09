# Gameplay Audit: Construct Profile Result Blocker Loop

**Timestamp:** `2026-07-09T10-29-02-04-00`

## Current gameplay state

`PhantomCommand` is currently a construct proof, not a full RTS gameplay loop.

The menu presents a single-player PvE RTS prototype, but the live route is an opening construct sequence with pan, zoom, skip, and restart controls.

## Current interaction loop

```txt
open index.html
  -> choose Start or Open Scene
  -> game.html loads construct proof
  -> player watches smooth-ring-handoff-v6 platform build
  -> player can pan camera with WASD/arrows
  -> player can zoom with mouse wheel
  -> player can skip with Space or button
  -> player can restart with R or button
  -> completed build sets phase to command online
```

## Gameplay domains present now

```txt
main-menu-routing
construct-sequence-viewing
camera-pan-control
camera-zoom-control
skip-command
restart-command
hud-progress-reporting
construct-completion-phase
GameHost diagnostics
```

## Gameplay domains implied but blocked

```txt
construct_complete event
construct completion idempotency
scenario bootstrap command
scenario bootstrap result
undead unit selection
unit order routing
wave control
economy
building placement
combat resolution
RTS win/loss state
```

## Current blocker

The transition from construct proof into gameplay is not source-owned.

`construct(seq)` mutates visual state and HUD values, but there is no typed `ConstructEventResult` that can be consumed by a scenario bootstrap reducer.

## Required precondition before RTS expansion

```txt
sourceProfile parity passes
  -> construct descriptors proven
  -> timeline proven
  -> GameHost sourceProfile readback proven
  -> construct_complete emitted once
  -> duplicate construct_complete rejected
  -> scenario_bootstrap accepts only after construct_complete
  -> duplicate scenario_bootstrap rejected
```

## Gameplay recommendation

Do not add units, buildings, enemies, economy, or command panels next.

The next gameplay-safe step is to define construct completion as an idempotent result after the source profile fixture is implemented and consumed additively.
