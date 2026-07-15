# Device Action Command and Result Map

**Timestamp:** `2026-07-15T03-24-35-04-00`

## Summary

Current browser listeners mutate campaign and camera state directly. This map separates physical inputs from semantic commands so keyboard, mouse, wheel, touch and hybrid controls can share one action contract.

## Plan ledger

**Goal:** ensure every physical producer resolves to one semantic command, one terminal result and one matching visible effect.

- [x] Map current physical inputs.
- [x] Map semantic campaign actions.
- [x] Define command and result identities.
- [x] Define duplicate and stale rejection.
- [ ] Route adapters through the command boundary.
- [ ] Add action-result fixtures.

## Current mapping

| Physical input | Current mutation | Touch-only status |
|---|---|---|
| Left click or primary pointer | Select unit/pad or box-select | Partially available |
| Shift + left click | Add/remove selection | No reliable touch equivalent |
| Second click on selected pad | Build current tower type | Available only for default/current type |
| Right click | Move or attack order | Unavailable |
| Middle drag | Camera pan | Unavailable |
| Wheel | Camera zoom | Unavailable |
| WASD or arrows | Camera pan | Unavailable |
| Space | Start next wave | Unavailable |
| 1, 2, 3 | Select tower type | Unavailable |
| P | Pause/resume | Unavailable |
| R | Reload/restart | Unavailable |
| Escape | Exit to menu | Unavailable |
| F | Focus selected units | Unavailable |
| GameHost direct methods | Start wave, build, zoom | Not a player-facing control surface |

## Semantic command set

```txt
SelectUnitsCommand
ClearSelectionCommand
OrderUnitsCommand
SelectBuildPadCommand
SelectTowerTypeCommand
BuildTowerCommand
StartWaveCommand
PanCameraCommand
ZoomCameraCommand
FocusCameraCommand
PauseCampaignCommand
ResumeCampaignCommand
RestartCampaignCommand
ExitCampaignCommand
```

## Command envelope

```txt
CampaignActionCommand
  commandId
  actionType
  actionPayload
  sourceDeviceProfile
  controlGeneration
  routeRevision
  campaignRevision
  cameraRevision
  targetIds
  pointerSequenceId optional
```

## Result envelope

```txt
CampaignActionResult
  commandId
  status
  rejectionReason optional
  previousCampaignRevision
  resultingCampaignRevision
  previousCameraRevision
  resultingCameraRevision
  affectedIds
  costReceipt optional
  firstEffectFrameExpected
```

## Admission rules

```txt
reject when:
  command identity already settled
  route or control generation is stale
  campaign is paused and policy blocks the action
  terminal state blocks the action
  selected entity or pad identity is stale
  action has no admitted producer in the active profile
  gesture ownership conflicts with another active pointer

commit when:
  all predicates pass
  one semantic mutation is prepared
  all affected state adopts atomically
  one result is journaled
```

## Visible-effect rule

A successful action is not complete for player-facing proof until the accepted result revision appears in one Canvas2D source frame and the corresponding CRT-presented frame.