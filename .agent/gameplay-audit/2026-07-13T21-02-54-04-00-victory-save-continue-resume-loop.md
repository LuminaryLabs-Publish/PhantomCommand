# Victory Save Continue Resume Gameplay Loop

**Timestamp:** `2026-07-13T21-02-54-04-00`

## Summary

The final wave marks victory and writes a small marker record. Continue is a menu capability only; it is not backed by a resumable gameplay state.

## Plan ledger

**Goal:** document the exact gameplay-state participants that a reliable save and resume transaction must cover.

- [x] Trace final-wave completion.
- [x] Trace rewards, `won`, message and save write.
- [x] Identify omitted campaign participants.
- [x] Trace Continue back to fresh initialization.
- [ ] Implement a canonical reconstruction or full-snapshot policy later.

## Current loop

```txt
last enemy removed
  -> wave clears
  -> wave increments
  -> souls reward applies
  -> won=true
  -> completion message applies
  -> marker save attempts
  -> gameplay becomes terminal

Continue
  -> navigate with campaign=continue
  -> initialize default souls/core/wave/units/towers/pads/camera
  -> resume does not occur
```

## Missing participants

```txt
campaign seed or authored version
souls and core
wave and waveActive
spawn queue
allied/enemy units and stable IDs
towers and occupied pads
projectiles and effects policy
selection and selected pad
tower type
camera state
UID/PID/TID counters
simulation time and accumulator policy
won/lost/paused state
schema and compatibility revision
```

## Policy decision required

Choose one explicit model:

1. Checkpoint reconstruction from authored campaign version plus a bounded checkpoint descriptor.
2. Complete deterministic snapshot with versioned migration.

A marker-only record must not be presented as resumable campaign state.