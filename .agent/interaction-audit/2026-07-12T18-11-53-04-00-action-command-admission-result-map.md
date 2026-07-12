# Campaign Action Command and Result Map

**Timestamp:** `2026-07-12T18-11-53-04-00`

## Current map

```txt
keyboard, pointer, wheel or public GameHost
  -> direct function or field mutation
  -> no action identity or source identity
  -> no expected revision or typed admission
  -> mutation or silent undefined return
  -> no terminal result
```

## Required map

```txt
input intent
  -> CampaignActionCommand
  -> schema, session, source and revision checks
  -> duplicate or stale rejection
  -> detached CampaignActionPlan
  -> participant prepare results
  -> atomic commit or rollback
  -> CampaignActionResult
  -> feedback and readback projection
  -> CampaignActionVisibleFrameAck
```

## Source kinds

```txt
Keyboard
PointerClick
PointerDrag
PointerOrder
Wheel
AccessibleControl
PublicGameHost
Replay
Fixture
```

## Revision dependencies

| Action | Required evidence |
|---|---|
| Start wave | session, campaign, phase and wave revision |
| Build | session, campaign, selection, economy, pad and tower-type revisions |
| Select | session, campaign, world-pointer result and selection revision |
| Rectangle select | session, campaign, pointer region and selection revision |
| Order | session, campaign, selection and target revisions |
| Tower type | session, campaign and allowed-type registry revision |
| Pause | session, campaign and phase revision |
| Restart | session, generation and phase policy |
| Camera or zoom | session, camera revision and surface generation |

## Terminal statuses

```txt
Committed
RejectedInvalidSchema
RejectedUnsupportedAction
RejectedSource
RejectedPhase
RejectedSelection
RejectedTarget
RejectedOccupied
RejectedInsufficientResources
RejectedTerminal
RejectedPaused
RejectedStale
RejectedDuplicate
RejectedNoEffect
FailedPrepare
FailedCommit
RolledBack
```

## Zero-mutation fence

Every rejection must return before changing campaign state, pads, entities, selection, economy, spawn queues, effects, messages, camera or persistence.

## Consumer receipts

```txt
CampaignStateCommitReceipt
CampaignFeedbackProjectionResult
CampaignReadbackProjectionResult
CampaignActionVisibleFrameAck
```

No interaction behavior was changed in this audit.