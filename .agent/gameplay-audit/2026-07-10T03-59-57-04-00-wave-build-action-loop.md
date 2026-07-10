# PhantomCommand Gameplay Audit: Wave Build Action Loop

**Timestamp:** `2026-07-10T03-59-57-04-00`

## Current gameplay loop

```txt
initial state
  -> souls 145
  -> core 24
  -> wave 0
  -> six player units spawn around sanctum

build loop
  -> player chooses tower type with 1/2/3
  -> click empty pad selects pad
  -> click selected pad calls build()
  -> build silently returns if no pad, occupied pad, or insufficient souls
  -> accepted build mutates pad.tower, subtracts souls, creates tower, adds effect, updates message

wave loop
  -> Space calls startWave()
  -> startWave silently returns if waveActive, won, lost, or all waves complete
  -> accepted wave queues enemies with type, spawn time, and lane
  -> update spawns enemies when queue time reaches zero
  -> enemies move toward center or attack allies
  -> enemies reaching sanctum reduce core
  -> towers/allies target enemies and deal damage
  -> dead enemies grant souls
  -> clear wave grants bonus souls and next message
  -> final clear sets won and writes localStorage save
  -> core depletion sets lost
```

## Missing gameplay proof rows

```txt
select accepted / cleared / no target
build accepted
build rejected no pad
build rejected occupied pad
build rejected insufficient souls
order accepted move
order accepted attack
order rejected no selected units
startWave accepted
startWave rejected already active
startWave rejected won/lost
spawn enemy rows
projectile hit rows
damage reward rows
wave clear rows
win save row
loss row
```

## Safe gameplay ledge

Add action-result helpers and a deterministic campaign fixture before adding waves, enemy types, economy, or animation complexity.
