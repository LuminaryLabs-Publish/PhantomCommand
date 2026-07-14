# Durable Outcome and Resumed Frame Gap

**Timestamp:** `2026-07-13T21-02-54-04-00`

## Summary

The campaign renders `GRAVE RING SECURED` from `state.won` regardless of whether browser persistence succeeded. The menu later renders Continue from raw key presence. Neither visible surface carries a save generation, commit result, compatibility result or resume revision.

## Plan ledger

**Goal:** correlate visible victory and Continue/resume presentation with one accepted durable generation.

- [x] Trace victory state to Canvas2D terminal overlay.
- [x] Trace storage attempt and swallowed failure.
- [x] Trace raw key presence to menu Continue.
- [x] Confirm no frame-level persistence provenance exists.
- [ ] Add revision-bearing frame envelopes and acknowledgements later.

## Gap

```txt
simulation sets won=true
  -> UI renders secured outcome
  -> storage write may succeed or fail silently
  -> no durability state reaches the frame

menu scans any non-empty save string
  -> Continue appears enabled
  -> no schema or compatibility result reaches the frame

continue route boots
  -> fresh campaign state is rendered
  -> no resumed-generation acknowledgement exists
```

## Required frame evidence

```txt
CampaignOutcomeFrameEnvelope
  campaignSessionId
  campaignStateRevision
  outcome
  saveGeneration
  saveCommitStatus
  durabilityMode

ResumeFrameEnvelope
  saveGeneration
  resumeAdmissionStatus
  reconstructedStateRevision
  sourceFrameRevision

FirstDurableOutcomeFrameAck
FirstResumedFrameAck
```

No rendering behavior changed in this audit.