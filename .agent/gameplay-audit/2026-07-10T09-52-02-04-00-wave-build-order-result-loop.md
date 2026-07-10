# Gameplay Audit: Wave Build Order Result Loop

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T09-52-02-04-00`

## Current gameplay loop

```txt
player enters campaign
  -> starter guards and archers spawn
  -> player pans and zooms camera
  -> click selects ally or empty build pad
  -> second click on selected pad builds selected tower when souls are sufficient
  -> right click orders selected units or targets enemies
  -> Space starts next wave
  -> spawn queue emits enemies along lanes
  -> units and towers target enemies
  -> projectiles apply damage and rewards
  -> wave clear grants souls
  -> final wave clear sets win state and writes save
  -> core damage can set loss state
```

## Gameplay domains

```txt
souls economy
sanctum core health
ring/lane map
build pad placement
tower selection
tower build acceptance
unit selection
unit order intent
wave start intent
wave spawn queue
ally AI
enemy pathing
tower targeting
projectile damage
reward allocation
wave clear
win/loss
save-on-win
```

## Gameplay proof gap

The gameplay works, but action outcomes are not first-class records.

```txt
- selectAt has accepted selection, pad selection, build-on-repeat, and clear-selection paths without ActionResult rows.
- build silently returns when no pad, tower exists, or souls are insufficient.
- order silently returns when no selected units exist.
- startWave silently returns when wave is active, won, lost, or exhausted.
- damage and reward paths mutate state with no result rows.
- win/loss transitions have no fixture-readable source rows.
- GameHost exposes only aggregate counts and zoom.
```

## Required result rows

```txt
select.unit.accepted
select.pad.accepted
select.clear.no-target
build.accepted
build.rejected.no-pad
build.rejected.occupied-pad
build.rejected.insufficient-souls
order.accepted.move
order.accepted.attack
order.skipped.no-selection
wave-start.accepted
wave-start.rejected.active
wave-start.rejected.won
wave-start.rejected.lost
wave-start.rejected.exhausted
damage.accepted
enemy-kill.rewarded
wave-clear.accepted
campaign-win.accepted
campaign-loss.accepted
save-on-win.accepted
```

## Next safe gameplay ledge

```txt
PhantomCommand Campaign Source Action Render Readback Refresh + GameHost Fixture Gate
```

## Non-goals

```txt
- new waves
- new enemy types
- economy expansion
- camera rewrite
- renderer replacement
- pixel art animation expansion
```
