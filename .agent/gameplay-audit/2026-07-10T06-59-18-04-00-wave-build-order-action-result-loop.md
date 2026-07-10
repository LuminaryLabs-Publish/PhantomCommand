# Gameplay Audit — Wave / Build / Order Action Result Loop

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T06-59-18-04-00`

## Current gameplay loop

```txt
select ally or empty pad
  -> selected units or selectedPad mutates inline
  -> second selected pad click attempts build
  -> build silently returns if pad missing, occupied, or souls too low
  -> right-click order mutates selected units target or move position
  -> Space calls startWave
  -> startWave silently returns if wave active, won, lost, or wave index exhausted
  -> update advances spawn queue, unit AI, tower AI, projectiles, damage, rewards, effects, wave clear, win, and loss
```

## Gameplay authority gaps

```txt
- select has no ActionResult.
- build has no accepted/rejected result row.
- insufficient souls, occupied pad, and missing pad are silent returns.
- order has no target/move result row.
- startWave has no accepted/rejected result row.
- damage and rewards are not retained as simulation events.
- wave clear, win, loss, and save-on-win are not fixture-readable rows.
- GameHost exposes aggregate counters but not action journal or simulation frame summary.
```

## Required gameplay proof rows

```txt
select ally accepted
select empty pad accepted
clear selection accepted
build spire accepted
build rejected: missing pad
build rejected: occupied pad
build rejected: insufficient souls
order move accepted
order attack accepted
start wave accepted
start wave rejected: already active
spawn enemy frame
unit attack frame
tower fire frame
projectile hit frame
damage reward frame
wave clear frame
win frame
loss frame
```

## Stop condition

A DOM-free fixture should prove the same source dimensions, ring count, lane count, generated pad count, starter unit count, tower catalog, wave count, build outcomes, order outcomes, start-wave outcomes, and GameHost legacy fields before campaign expansion.
