# PhantomCommand Gameplay Audit

**Timestamp:** `2026-07-09T16-10-00-04-00`

## Current gameplay loop

```txt
load menu
  -> enter construct scene
  -> watch platform assemble
  -> pan across construct with WASD/arrows
  -> zoom with wheel
  -> skip with Space or Skip button
  -> restart with R or Restart button
  -> wait for phase command online
```

## Gameplay state today

The current route is not a full RTS/gameplay loop yet.

It is a construct proof with control affordances:

```txt
pan
zoom
skip
restart
construct progress
phase display
legacy GameHost diagnostics
```

## Gameplay domains in use

```txt
construct-formation-viewing
construct-progress-phase
camera-pan-zoom
skip-restart-control
legacy-gamehost-state
```

## Gameplay domains deferred

```txt
construct-result-authority
scenario-bootstrap
unit-selection
unit-command
resource-economy
win-loss-rules
save-load
networking
```

## Main gameplay gap

The app still lacks a typed `ConstructResult` or scenario bootstrap contract.

That is acceptable for now because the construct itself is not source-owned yet. Adding a gameplay layer before proving sourceProfile parity would lock new systems onto an inline browser source of truth.

## Next implementation rule

```txt
1. Prove sourceProfile parity.
2. Add browser consumer readback.
3. Gate build on fixture proof.
4. Only then define ConstructResult and scenario bootstrap.
```

## Gameplay finding

Gameplay expansion should remain blocked. The next valuable gameplay-adjacent proof is that the current construct has a stable, source-owned identity and can be consumed by future gameplay logic without scraping inline browser code.
