# PhantomCommand Gameplay Audit — Wave Build Order Proof Loop

**Timestamp:** `2026-07-10T08-20-42-04-00`

## Current gameplay loop

```txt
start campaign
  -> starter guards and archers protect sanctum
  -> player pans/zooms around rings
  -> player selects allies or empty build pads
  -> player builds spire / lantern / ward when souls are sufficient
  -> player right-click orders selected units or targets enemies
  -> player starts wave with Space
  -> spawn queue emits enemies on lane angles
  -> enemy units path toward sanctum core
  -> ally and tower AI target enemies
  -> projectiles apply damage
  -> dead enemies grant souls
  -> cleared waves grant bonus souls
  -> final wave win writes save
  -> core reaching zero triggers loss
```

## Gameplay domains

```txt
starter-ally-domain
wave-script-domain
spawn-queue-domain
enemy-lane-domain
enemy-core-rush-domain
ally-selection-domain
ally-order-domain
build-pad-domain
tower-build-domain
tower-targeting-domain
projectile-hit-domain
damage-domain
reward-domain
wave-clear-domain
win-loss-domain
save-on-win-domain
```

## Current proof state

The gameplay is functional but not fixture-readable.

Missing rows:

```txt
select accepted / rejected
build accepted / rejected / insufficient souls / occupied pad / no pad
order accepted / no selected units / target enemy / move point
start-wave accepted / already active / won / lost / no waves left
damage applied / target missing / kill reward
wave clear bonus
win save intent
loss reason
simulation frame summary
```

## Next gameplay services

```txt
phantom-command-action-intent-kit
phantom-command-action-result-kit
phantom-command-wave-result-kit
phantom-command-damage-result-kit
phantom-command-reward-result-kit
phantom-command-win-loss-result-kit
phantom-command-simulation-frame-kit
phantom-command-gameplay-fixture-kit
```

## Recommendation

Do not expand waves, enemies, economy, or camera behavior until action result rows and simulation frame summaries are stable.
