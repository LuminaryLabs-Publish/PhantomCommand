# Grave Ward Projectile Without Slow Loop

**Timestamp:** `2026-07-13T00-31-09-04-00`

## Summary

The Grave Ward is priced and authored as a control tower, but its slow payload is never consumed. In current gameplay it behaves as a seven-damage projectile tower with a distinct color, not as an admitted slowing system.

## Plan ledger

**Goal:** bind the tower's authored control value to target movement under deterministic duration and stacking rules.

- [x] Trace tower selection and construction.
- [x] Trace Ward projectile creation.
- [x] Trace projectile impact.
- [x] Trace enemy movement speed consumption.
- [x] Record missing gameplay results.
- [ ] Implement later.

## Current loop

```txt
select Grave Ward
  -> spend 55 souls
  -> build tower on free pad
  -> tower finds nearest enemy inside range 52
  -> tower fires every 1 / 1.45 seconds
  -> projectile carries damage 7 and slow 0.34
  -> impact applies damage and visual effect
  -> slow payload is discarded
  -> enemy moves with authored base speed
```

## Gameplay consequences

```txt
control role does not exist in simulation
Ward value is lower than its authored description implies
no duration or refresh decision exists
multiple Ward hits cannot stack or refresh predictably
no resistance or immunity policy exists
no status state survives between impacts
no replayable modifier result exists
```

## Required acceptance

```txt
one Ward hit against a live enemy
  -> returns Applied or an explicit non-applied result
  -> creates one target-bound slow instance
  -> reduces derived movement speed by the authored policy
  -> preserves base speed
  -> expires at a deterministic fixed-step boundary
  -> returns one retirement result
```
