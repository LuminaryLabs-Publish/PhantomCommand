# Interaction Audit: Save Presence, Route and Resume Admission

**Timestamp:** `2026-07-11T21-31-19-04-00`

## Summary

The current interaction contract has two disconnected steps: the menu emits a Continue URL, then the campaign starts without admitting that intent. This audit replaces implicit navigation semantics with typed commands and results.

## Plan ledger

**Goal:** map every user and browser transition involved in Begin and Continue.

- [x] Map hidden button, pointer and keyboard activation.
- [x] Map save-presence projection.
- [x] Map fade and navigation.
- [x] Map campaign startup and public observation.
- [x] Define typed admission outcomes.
- [ ] Implement command routing.

## Current map

```txt
storage read
  -> Boolean hasCampaignSave

menu item
  -> enabled / disabled
  -> BOUND / EMPTY

activation
  -> beginTransition(url)

frame timer
  -> location.href = game.html?campaign=new|continue

campaign module evaluation
  -> no route admission
  -> no save admission
  -> default state
```

## Required map

```txt
ResolveContinueCapabilityCommand
  -> ContinueCapabilityResult

StartCampaignCommand
  intent: NEW | RESUME
  expectedCandidateId
  expectedCheckpointFingerprint

StartCampaignResult
  STARTED_NEW
  RESUMED
  REJECTED_NO_CANDIDATE
  REJECTED_STALE_CANDIDATE
  REJECTED_INVALID_CHECKPOINT
  FAILED_ROLLED_BACK
```

## Admission rules

```txt
disabled Continue cannot be activated through hidden buttons or GameHost
RESUME requires one selected candidate
route intent and candidate identity must match
rejected resume performs no live campaign mutation
fallback to NEW requires an explicit second user command
navigation success is not campaign-start success
campaign-start success requires first-frame acknowledgement
```
