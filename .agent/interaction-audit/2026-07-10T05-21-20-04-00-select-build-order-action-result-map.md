# Interaction Audit: Select / Build / Order Action Result Map

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T05-21-20-04-00`

## Current interactions

```txt
pointer click:
  select unit or select pad

second click selected empty pad:
  build selected tower if souls are enough

right-click:
  order selected units to move or target enemy

keyboard:
  Space start wave
  1/2/3 choose tower type
  WASD/arrows pan
  wheel zoom
  P pause
  R reload
  Escape menu
  F focus selected or center
```

## Needed action result map

```txt
SelectUnitResult
SelectPadResult
ClearSelectionResult
BuildTowerResult
OrderMoveResult
OrderAttackResult
StartWaveResult
ChooseTowerTypeResult
PanCameraResult
ZoomCameraResult
PauseResult
FocusCameraResult
SaveOnWinResult
```

## Needed reason codes

```txt
accepted
no-hit
no-selected-pad
occupied-pad
insufficient-souls
no-selected-units
no-target-enemy
wave-already-active
campaign-won
campaign-lost
wave-list-complete
invalid-tower-type
camera-clamped
```

## Interaction finding

Input can remain in `campaign-scene.js` while source modules are added. The first change should be nonvisual: action intent and action result rows, then `GameHost` readback.
