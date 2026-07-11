# Render Audit: Continue UI and Startup Provenance Gap

**Timestamp:** `2026-07-11T15-08-41-04-00`

## Summary

The menu visually presents Continue as either `BOUND` or `EMPTY`, but that projection is based on raw storage presence rather than a validated resumable candidate. The campaign's first rendered frame then contains no evidence that Continue mode or any selected candidate was consumed.

## Plan ledger

**Goal:** require the menu frame and first campaign frame to project one shared candidate-resolution and startup identity.

- [x] Trace menu item enablement and note projection.
- [x] Trace route transition and campaign frame construction.
- [x] Identify missing candidate and startup provenance.
- [x] Define visual and diagnostic acknowledgements.
- [ ] Implement browser frame fixtures.

## Current menu projection

```txt
hasCampaignSave() == true
  -> Continue enabled
  -> note = BOUND

hasCampaignSave() == false
  -> Continue disabled
  -> note = EMPTY
```

`BOUND` currently means only that one nonempty string was observed. It does not mean:

```txt
JSON parsed
schema supported
content matched
candidate selected
checkpoint resumable
startup likely to succeed
```

## Current campaign projection

```txt
Continue navigation
  -> game.html?campaign=continue
  -> default campaign state constructed
  -> first frame draws wave 1/6, souls 145, core 24
  -> no candidate or startup-mode badge
  -> GameHost exposes no startup result
```

The user receives a Continue affordance but the first visible campaign frame is a fresh run with no explanation.

## Required menu render state

```txt
continueCapabilityId
status: enabled | disabled | degraded
reason
selectedCandidateKind
selectedCandidateAge
selectedCandidateSlot
policyVersion
```

The normal visual UI may remain compact, but detached diagnostics must expose the full typed result.

## Required campaign first-frame state

```txt
startupResultId
startupMode: new | continue
candidateId
runId
runEpoch
stateFingerprint
frameId
```

The HUD does not need to display all fields. `GameHost` or a bounded debug projection must prove that the first frame consumed the same startup result the menu admitted.

## Required frame contract

```txt
menu committed frame
  -> ContinueCapabilityResult acknowledged
  -> selected candidate identity attached to transition

campaign first frame
  -> CampaignStartupResult acknowledged
  -> mode and candidate identity match transition
  -> rendered state fingerprint matches hydrated state
```

## Failure presentation

If candidate startup fails after navigation:

```txt
show typed failure reason
preserve candidate evidence for diagnostics
do not silently start a fresh run under Continue mode
offer explicit return-to-menu or start-new action
```

## Fixture expectations

```txt
malformed payload -> Continue disabled, EMPTY or INVALID reason
valid candidate -> Continue enabled and BOUND with candidate identity
candidate changed during transition -> startup failure frame, not fresh campaign
new mode -> first frame reports new and no candidate
continue mode -> first frame reports continue and selected candidate
```

## Validation boundary

Documentation only. Menu rendering, CRT rendering, campaign rendering and `GameHost` were not changed.