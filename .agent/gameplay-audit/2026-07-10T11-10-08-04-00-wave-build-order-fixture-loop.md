# Gameplay Audit — Wave Build Order Fixture Loop

**Timestamp:** `2026-07-10T11-10-08-04-00`

## Current gameplay loop

```txt
starter allies spawn
player selects unit or pad
player builds tower when selected pad + enough souls exist
player orders selected units with right click
player starts wave with Space
wave queue spawns enemies by lane and cadence
enemies path to core or attack allies
allies and towers acquire targets
projectiles apply damage
rewards add souls on enemy death
wave clear grants bonus souls
final clear writes win save
core damage can trigger loss
```

## Current blocker

The gameplay loop works, but it does not emit fixture-readable rows. Accepted and rejected paths are mostly state mutation or silent no-op.

## Required action/result rows

```txt
selectUnit.accepted
selectUnit.rejected
selectPad.accepted
buildTower.accepted
buildTower.rejected_no_pad
buildTower.rejected_occupied
buildTower.rejected_insufficient_souls
orderMove.accepted
orderTarget.accepted
startWave.accepted
startWave.rejected_active
startWave.rejected_terminal
damage.applied
reward.applied
waveClear.applied
win.applied
loss.applied
```

## Next fixture gate

A DOM-free fixture should prove ring count, lane count, pad count, tower catalog, archetype catalog, wave shape, build accept/reject rows, order rows, wave rows, win/loss rows, and legacy GameHost compatibility.
