# New and Continue Bootstrap Result Map

**Timestamp:** `2026-07-12T22-15-00-04-00`

## Summary

The current interaction returns only navigation. It does not return bootstrap admission, checkpoint-read, hydration, commit or visible-frame results.

## Plan ledger

**Goal:** map one user intent to exactly one terminal bootstrap result and first visible frame.

- [x] Map current New and Continue effects.
- [x] Define typed results.
- [ ] Implement later.

## Required result chain

```txt
MenuActivationResult
  -> CampaignEntryIntent
  -> CampaignBootstrapAdmissionResult
  -> NewRunPresetResult | CampaignSaveReadResult
  -> CampaignHydrationResult
  -> CampaignStateValidationResult
  -> CampaignBootstrapCommitResult | CampaignBootstrapRollbackResult
  -> CampaignBootstrapResult
  -> CampaignGenerationFrameAck
```

## Terminal statuses

```txt
committed-fresh
committed-restored
unavailable
malformed
unsupported-version
checksum-failed
migration-failed
invariant-failed
stale
duplicate
rolled-back
```
