# PhantomCommand Interaction Audit: Select Build Order Action Result Map

**Timestamp:** `2026-07-10T12-40-45-04-00`

## Interaction surface

```txt
pointer move maps through CRT source coordinates
left click selects allies or build pads
left drag selects multiple allies
repeat click on selected empty pad builds tower
right-click orders selected units or targets enemy
mouse wheel zooms at pointer
keyboard 1/2/3 switches tower type
Space starts wave
P pauses
R reloads
Escape returns to menu
F focuses selected units or sanctum
```

## Action result map

```txt
selectAt
  accepted:select-ally
  accepted:select-pad
  noop:clear-selection
  noop:empty-click

build
  accepted:build-tower
  rejected:no-selected-pad
  rejected:pad-occupied
  rejected:insufficient-souls

order
  accepted:order-target-enemy
  accepted:order-move
  noop:no-selected-units

startWave
  accepted:start-wave
  rejected:wave-active
  rejected:campaign-won
  rejected:campaign-lost
  rejected:no-waves-remaining

towerType
  accepted:set-tower-spire
  accepted:set-tower-lantern
  accepted:set-tower-ward

camera
  accepted:pan
  accepted:wheel-zoom
  accepted:focus-selection
```

## Readback requirements

```txt
ActionResult.action
ActionResult.status
ActionResult.reason
ActionResult.before
ActionResult.after
ActionResult.changed
ActionResult.sourceIds
ActionResult.renderConsumerHints
```

## Non-goal

Do not retune controls, camera, or tower behavior before action results and fixture rows prove current behavior.
