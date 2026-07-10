# Gameplay Audit: Wave / Build / Order Action Loop

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T05-21-20-04-00`

## Current gameplay loop

```txt
menu start or continue
  -> campaign scene
  -> starter allies spawn
  -> player pans/zooms camera
  -> player selects units or empty pads
  -> player chooses tower type with 1/2/3
  -> second click selected pad attempts build
  -> right-click orders selected units or targets enemies
  -> Space starts wave
  -> spawn queue emits enemies by lane
  -> units/towers acquire targets
  -> projectiles resolve damage/rewards
  -> enemies reaching center damage core
  -> wave clear grants souls
  -> final clear writes save and sets won
  -> core depletion sets lost
```

## Current gameplay proof gap

```txt
select unit accepted/rejected rows missing
select pad accepted/rejected rows missing
build accepted row missing
build rejected no pad row missing
build rejected occupied pad row missing
build rejected insufficient souls row missing
order move row missing
order attack row missing
start-wave accepted row missing
start-wave rejected active/won/lost/done row missing
projectile hit row missing
damage reward row missing
core damage row missing
wave clear row missing
win row missing
loss row missing
save-on-win row missing
```

## Gameplay finding

The current campaign loop is playable enough for proof work. Do not expand enemy art, wave count, tower catalog, economy, or camera behavior until action-result rows and simulation-frame summaries exist.
