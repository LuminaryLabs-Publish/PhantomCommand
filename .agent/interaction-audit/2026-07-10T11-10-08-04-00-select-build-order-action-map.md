# Interaction Audit — Select Build Order Action Map

**Timestamp:** `2026-07-10T11-10-08-04-00`

## Current input map

```txt
pointermove -> CRT source coordinate mapping
left pointerdown/up -> drag select or click select
shift-click -> additive selection
repeat selected empty pad click -> build selected tower
right-click -> order selected units or target nearest enemy
wheel -> zoom around pointer
WASD / arrow keys -> pan camera
1 / 2 / 3 -> tower type selection
Space -> start wave
P -> pause
R -> reload
Escape -> menu route
F -> focus selected units
```

## Interaction gap

Input handlers call runtime functions directly. The current route has no command envelope, no preflight row, no rejection reason row, and no fixture-readable action journal.

## Required interaction contracts

```txt
PointerSourceEvent
CampaignCommandEnvelope
CampaignCommandPreflight
CampaignActionIntent
CampaignActionResult
CampaignCommandJournal
CampaignRejectedReasonCatalog
CampaignInputFixtureRows
```

## Next safe action

Keep existing controls unchanged and add additive command/action rows that can be proven in `tests/phantom-command-campaign-fixture.mjs` before changing camera, selection feel, or build/order UX.
