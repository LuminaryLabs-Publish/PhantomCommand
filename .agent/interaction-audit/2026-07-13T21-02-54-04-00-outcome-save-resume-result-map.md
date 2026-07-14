# Outcome Save Resume Result Map

**Timestamp:** `2026-07-13T21-02-54-04-00`

## Summary

Current interactions emit navigation and gameplay changes but no persistence commands or terminal results. This map defines the missing command/result flow.

## Plan ledger

**Goal:** make user-visible Continue and campaign completion depend on typed storage and resume decisions.

- [x] Map current victory and Continue intents.
- [x] Identify missing identities and results.
- [x] Define rejection and degraded states.
- [ ] Implement later.

## Current map

```txt
final-wave completion
  -> direct state mutation
  -> direct localStorage write
  -> no result

menu Continue activation
  -> raw key-presence enabled state
  -> location navigation
  -> no admission result

campaign continue boot
  -> fresh default state
  -> no resume result
```

## Required map

```txt
CampaignOutcomeCommitCommand
  -> Prepared | Committed | Degraded | StorageRejected | Stale | Duplicate
  -> CampaignSaveCommitResult

ContinueCapabilityQuery
  -> Empty | Admitted | Migratable | Incompatible | Malformed | Unavailable
  -> ContinueCapabilityResult

ResumeCommand
  -> Prepared | Resumed | Rejected | Quarantined | Superseded
  -> ResumeAdmissionResult

accepted results
  -> revision-bearing menu/campaign frames
  -> first matching frame acknowledgement
```

## Admission rule

A storage string is data, not a capability. Continue becomes actionable only after a compatible candidate is parsed and admitted.