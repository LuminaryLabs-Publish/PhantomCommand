# Interaction Audit — Campaign Audio Command and Result Map

**Timestamp:** `2026-07-16T00-00-40-04-00`  
**Status:** `campaign-audio-event-projection-authority-audited`

## Summary

Campaign audio should be admitted as a typed projection command after gameplay settlement. The command must bind campaign, event, frame, camera, preference and lifecycle revisions so repeated RAF snapshots or stale route work cannot create duplicate or late sound.

## Plan ledger

**Goal:** define deterministic admission, execution and result states for campaign audio effects.

- [x] Identify command inputs.
- [x] Define admission rejections and suppression states.
- [x] Define provider result states.
- [x] Define audible and visible-frame acknowledgements.
- [ ] Implement the command/result protocol.

## Command

```txt
CampaignAudioProjectionCommand
  commandId
  documentGeneration
  campaignSessionId
  campaignRevision
  eventId
  eventType
  eventPayload
  acceptedFrameRevision
  cameraRevision
  audioPolicyRevision
  lifecycleRevision
```

## Admission

```txt
validate campaign session and route ownership
validate stable event identity
reject stale campaign or lifecycle revision
reject duplicate or superseded event
observe provider capability
resolve mute and category policy
require or await accepted user-gesture unlock
resolve cue descriptor and priority
reserve voice and per-frame budget
resolve listener and optional source transform
```

## Results

| Result | Meaning |
|---|---|
| `played` | Provider accepted and started the admitted cue. |
| `muted` | Current authored preference suppressed the cue. |
| `unavailable` | Browser/provider capability was unavailable. |
| `locked` | No accepted unlock gesture existed yet. |
| `duplicate` | The event identity was already consumed. |
| `budget-suppressed` | Priority or concurrency policy rejected the cue. |
| `suspended` | Lifecycle state prohibited playback. |
| `stale` | Campaign, frame, route or policy revision no longer matched. |
| `failed` | Provider execution failed after admission. |
| `retired` | Route or context retirement settled the command. |

## Acknowledgements

```txt
FirstAudibleCampaignCueAck
  campaignSessionId
  eventId
  projectionResultId
  providerStartedAt

FirstCampaignAudioVisualConvergenceAck
  campaignSessionId
  eventId
  projectionResultId
  presentedFrameRevision
```

## Required invariants

- One semantic event can produce at most one non-layered cue set per policy revision.
- Repeated render snapshots cannot replay a cue.
- Muted, unavailable and budget-suppressed events still produce typed results.
- Route retirement invalidates pending commands and stops owned loops.
- A provider error cannot mutate campaign state.
- A visual-frame acknowledgement must reference the same accepted event revision as the audio result.

## Validation boundary

No protocol, provider adapter or acknowledgement is implemented.