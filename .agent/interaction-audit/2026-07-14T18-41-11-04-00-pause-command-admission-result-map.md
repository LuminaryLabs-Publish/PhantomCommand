# Pause Command Admission Result Map

**Timestamp:** `2026-07-14T18-41-11-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

Current handlers mutate state directly and return no result. The target map converts each surface into a command evaluated against the active pause revision.

## Plan ledger

**Goal:** replace implicit boolean checks with typed, observable command admission.

- [x] Inventory keyboard, pointer, wheel, route and public-host commands.
- [ ] Assign command IDs and input revisions.
- [ ] Publish accepted, rejected and deferred results.
- [ ] Reject stale pre-pause work after resume.

## Result map

```txt
CampaignPauseCommand
  -> CampaignPauseResult

WaveStartCommand
TowerBuildCommand
UnitOrderCommand
SelectionCommand
CameraPanCommand
CameraZoomCommand
CameraFocusCommand
RouteExitCommand
CampaignReloadCommand
PublicHostCommand
  -> PausedCommandAdmissionResult
     accepted | rejected | deferred | duplicate | stale | retired

CampaignResumeCommand
  -> CampaignResumeResult
  -> FirstResumedCampaignFrameAck
```

Every result must cite `RunId`, `PauseStateRevision`, `PausePolicyRevision`, `CommandId` and `InputRevision`.
