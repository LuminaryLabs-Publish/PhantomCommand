# PhantomCommand Gameplay Audit: Wave Build Order Result Loop

**Timestamp:** `2026-07-10T12-40-45-04-00`

## Current gameplay loop

```txt
starter allies spawn
  -> player selects ally or build pad
  -> selected empty pad can build tower if souls allow
  -> right-click orders selected units or targets enemy
  -> Space starts wave
  -> wave queue spawns enemies by lane
  -> units and towers acquire targets
  -> projectiles resolve damage
  -> enemy death rewards souls
  -> enemy reaches core and damages sanctum
  -> wave clear grants souls
  -> final wave clear wins and writes save payload
```

## Gameplay domains

```txt
selection-domain
build-action-domain
order-action-domain
wave-start-action-domain
wave-script-domain
unit-ai-domain
enemy-pathing-domain
ally-targeting-domain
tower-targeting-domain
projectile-domain
damage-reward-domain
souls-economy-domain
sanctum-core-health-domain
win-loss-domain
save-on-win-domain
```

## Missing result rows

```txt
select ally accepted/no-op
select pad accepted/no-op
build accepted
build rejected because no pad
build rejected because pad occupied
build rejected because insufficient souls
order accepted to move
order accepted to target enemy
order no-op because nothing selected
start wave accepted
start wave rejected because wave active
start wave rejected because campaign won/lost
spawn frame summary
damage frame summary
reward frame summary
wave clear summary
loss summary
win summary
```

## Fixture ladder

```txt
1. Source descriptor rows for rings, lanes, pads, archetypes, towers, and waves.
2. Action intent records for select/build/order/start-wave.
3. ActionResult rows for accepted/rejected/no-op paths.
4. SimulationFrame summaries for spawn/unit/tower/projectile/damage/reward/wave clear/win/loss.
5. RenderReadback rows consuming source and simulation rows.
6. Additive GameHost campaign diagnostics.
7. Build/check gate.
```

## Next safe ledge

```txt
PhantomCommand Campaign Source Action Render Readback Refresh + GameHost Fixture Gate
```
