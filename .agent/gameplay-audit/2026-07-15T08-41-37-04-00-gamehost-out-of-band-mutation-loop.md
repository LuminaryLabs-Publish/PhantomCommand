# GameHost Out-of-Band Mutation Loop

**Timestamp:** `2026-07-15T08-41-37-04-00`

## Summary

The normal campaign loop mutates state through browser listeners and fixed-step simulation. `window.GameHost` creates a second mutation path that can change the same owners directly between simulation steps and frames.

## Plan ledger

**Goal:** preserve diagnostic usefulness while ensuring campaign truth changes through one admitted, versioned settlement path.

- [x] Trace normal player and simulation mutations.
- [x] Trace public state, camera and function exposure.
- [x] Identify bypassed guards and missing results.
- [x] Define allowlisted command settlement.
- [ ] Implement and prove the authority.

## Normal loop

```txt
browser input
  -> selection order build wave camera or pause mutation
  -> fixed-step update
  -> movement targeting combat reward and terminal settlement
  -> Canvas2D render
  -> CRT present
```

## Out-of-band loop

```txt
external caller
  -> obtain GameHost.state or GameHost.camera
  -> mutate fields directly
  -> or call startWave build or setZoom
  -> bypass caller admission expected revision and idempotency
  -> next update and render consume changed values
```

## Source-permitted mutations

```txt
state.souls
state.core
state.wave
state.waveActive
state.spawn
state.units
state.towers
state.projectiles
state.effects
state.paused
state.won
state.lost
camera.x
camera.z
camera.zoom
camera.targetZoom
```

## Required gameplay rule

```txt
all external writes
  -> immutable command envelope
  -> allowlist classification
  -> expected revision check
  -> exactly-once campaign or camera settlement
  -> typed result
  -> matching visible-frame acknowledgement
```

No gameplay mutation was executed in this run.