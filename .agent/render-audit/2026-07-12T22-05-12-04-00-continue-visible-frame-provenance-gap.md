# Continue Visible-Frame Provenance Gap

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Timestamp:** `2026-07-12T22-05-12-04-00`

## Summary

The menu can visibly advertise Continue and transition to the campaign route, but no renderer or frame receipt proves that the displayed campaign came from the selected checkpoint. The campaign always draws the same fresh defaults, and frame output carries no route intent, checkpoint ID, run generation or bootstrap result.

## Plan ledger

**Goal:** require the first world, HUD, minimap and CRT frame after New or Continue to cite the exact committed bootstrap generation.

- [x] Trace the visible Continue label and transition.
- [x] Trace campaign frame construction and CRT presentation.
- [x] Confirm no saved-state hydration occurs before rendering.
- [x] Confirm no frame cites route intent, checkpoint or run generation.
- [x] Define the minimum visible-frame receipt.
- [ ] Implement and capture proof later.

## Current visible loop

```txt
menu sees truthy storage
  -> draws CONTINUE as enabled
  -> user activates Continue
  -> fade reaches 1
  -> browser navigates to game.html?campaign=continue

campaign module
  -> ignores campaign=continue
  -> creates wave 0, souls 145, core 24 and six starting allies
  -> renders world, HUD and minimap
  -> CRT presents the fresh frame
```

The visual result can look healthy while contradicting the user's selected operation.

## Missing frame evidence

```txt
entryIntent
bootstrapCommandId
bootstrapResultKind
runId
runGeneration
checkpointId
checkpointRevision
checkpointFingerprint
participantStateFingerprint
renderRevision
CRT presentation revision
browser composition acknowledgement
```

## Required receipt

```txt
CampaignGenerationFrameReceipt {
  frameId
  entryIntent
  bootstrapCommandId
  bootstrapResultId
  runId
  runGeneration
  checkpointId | null
  participantStateFingerprint
  renderRevision
  crtRevision
  presentedAt
  visible: true
}
```

## Required invariants

```txt
New frame cites FreshCommitted
Continue frame cites RestoredCommitted
Unavailable or invalid Continue produces no gameplay frame
first HUD values derive from the committed participant state
world entity counts match the same participant fingerprint
minimap and main world cite the same generation
CRT presentation does not acknowledge a predecessor frame as successor proof
```

## Fixture requirements

```txt
fresh New frame at authored defaults
Continue frame with non-default souls/core/wave/entities/camera
invalid checkpoint shows typed failure without fresh-campaign impersonation
unsupported checkpoint version shows typed failure
source, built output and Pages produce matching frame receipts
```

## Validation boundary

No rendering behavior changed and no browser screenshot or visible-frame fixture was captured.