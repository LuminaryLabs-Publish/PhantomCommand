# Continue Save Visible-Frame Truth Gap

**Timestamp:** `2026-07-12T13-59-50-04-00`

## Summary

The menu can visually report `CONTINUE · BOUND`, but the campaign’s first frame is always rendered from default state. There is no bootstrap revision, save fingerprint, hydration result or visible-frame receipt proving that the displayed world came from the selected save.

## Plan ledger

**Goal:** correlate menu save admission, campaign hydration, GameHost state, source-canvas rendering and CRT presentation through one committed bootstrap revision.

- [x] Trace menu save-presence projection.
- [x] Trace campaign startup and first draw.
- [x] Confirm the route query is ignored.
- [x] Confirm the first frame has no restored-state provenance.
- [ ] Add bootstrap-to-frame receipts.

## Current visible path

```txt
menu probes storage
  -> Continue appears BOUND
  -> user activates Continue
  -> fade and navigation
  -> campaign constructs default state
  -> default allied units and resources render
  -> CRT presents the default source canvas
  -> GameHost exposes default counts
```

## Contradiction

```txt
menu claim: a campaign is resumable
campaign state: default new campaign
canvas/HUD: default souls, core, wave, units and camera
GameHost: default snapshot
save identity in frame: absent
```

A malformed, foreign or minimal victory payload can enable the menu state without changing the campaign frame.

## Missing render provenance

```txt
launchIntentId
saveKey and storageScope
saveFingerprint
bootstrapRevision
hydrationResultId
stateFingerprint
sourceFrameId
crtPresentedFrameId
firstVisibleFrameReceiptId
GameHost bootstrap revision
HUD bootstrap revision
```

## Required frame contract

```txt
CampaignBootstrapResult committed
  -> source renderer reads immutable committed state
  -> HUD and minimap cite bootstrapRevision
  -> GameHost exposes immutable stateFingerprint
  -> CRT presents sourceFrameId
  -> CampaignVisibleFrameAck records
       bootstrapRevision
       stateFingerprint
       sourceFrameId
       crtPresentedFrameId
       viewport size
       timestamp
```

## Required probes

```txt
new campaign first frame shows default state and CommittedNew
valid continue first frame shows saved state and CommittedContinue
invalid save never produces a restored frame
failed candidate leaves predecessor/default frame unchanged
HUD, minimap and GameHost match the same state fingerprint
local, built and Pages screenshots cite equivalent bootstrap results
```

## Validation boundary

No rendering behavior changed. The current static checks assert source tokens and dimensions but do not execute menu-to-campaign navigation, save hydration or pixel/state provenance.