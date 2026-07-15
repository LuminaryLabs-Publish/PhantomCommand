# Direct Host Mutation Visible Frame Gap

**Timestamp:** `2026-07-15T08-41-37-04-00`

## Summary

Canvas2D and CRT rendering consume campaign and camera objects that are also published directly through `window.GameHost`. External mutation can therefore alter a later visible frame without a render-plan revision, source-frame identity, presented-frame identity or acknowledgement tying the visible result to the mutation.

## Plan ledger

**Goal:** make every admitted public diagnostic mutation produce one traceable Canvas2D source frame and one matching CRT-presented frame.

- [x] Trace `GameHost.state` and `GameHost.camera` into `drawWorld`, `drawUI`, `drawMinimap` and CRT upload.
- [x] Confirm rendering occurs on the next recursive RAF.
- [x] Confirm no mutation or frame revision is published.
- [x] Define source and presented-frame acknowledgement requirements.
- [ ] Execute browser pixel or frame-receipt fixtures.

## Current path

```txt
external mutation
  -> live state or camera object changes immediately
  -> no command result
  -> no accepted state revision
  -> next RAF calls render()
  -> Canvas2D draws current object values
  -> CRT uploads the source canvas
  -> visible frame has no mutation identity
```

## Missing evidence

```txt
CampaignStateRevision: absent
CameraStateRevision: absent
PublicDiagnosticMutationResult: absent
CanvasFrameRevision: absent
CrtFrameRevision: absent
FirstPublicMutationVisibleFrameAck: absent
stale-frame rejection: absent
mixed-revision detection: absent
```

## Required render contract

```txt
accepted public mutation result
  -> immutable campaign and camera revisions
  -> Canvas2D render command binds both revisions
  -> CanvasFrameResult publishes source-frame identity
  -> CRT present command binds CanvasFrameResult
  -> CrtFrameResult publishes displayed-frame identity
  -> FirstPublicMutationVisibleFrameAck cites both results
```

No visible defect or external mutation was reproduced. This audit records only the source-permitted frame-evidence gap.