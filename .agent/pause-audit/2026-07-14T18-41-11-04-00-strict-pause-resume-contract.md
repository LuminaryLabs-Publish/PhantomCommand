# Strict Pause and Resume Contract

**Timestamp:** `2026-07-14T18-41-11-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

Define strict pause as an atomic command-admission mode, not merely an early return from simulation update.

## Plan ledger

**Goal:** guarantee that a paused campaign has one explicit mutation policy and resumes without stale input.

- [ ] Allocate `PauseStateRevision`.
- [ ] Version `PausePolicyRevision`.
- [ ] Settle held keyboard, drag and pointer state on pause.
- [ ] Block campaign mutation under strict pause.
- [ ] Freeze camera under strict pause.
- [ ] Preserve only resume and policy-approved route commands.
- [ ] Journal rejected commands.
- [ ] Require fresh input after resume where necessary.
- [ ] Publish paused and resumed frame acknowledgements.
- [ ] Prove public GameHost commands follow the same policy.

## Contract

```txt
Active
  -> CampaignPauseCommand
  -> Pausing
  -> participant preparation receipts
  -> Paused(PauseStateRevision)

Paused
  -> each command classified against PausePolicyRevision
  -> no unclassified direct mutation
  -> visible frame cites PauseStateRevision

Paused
  -> CampaignResumeCommand
  -> clear stale input
  -> Resuming
  -> Active(successor input revision)
  -> FirstResumedCampaignFrameAck
```

## Failure behavior

If any mandatory participant cannot adopt pause or resume, preserve the predecessor state and publish a typed failure. Never expose a paused overlay while mutation ownership remains unknown.
