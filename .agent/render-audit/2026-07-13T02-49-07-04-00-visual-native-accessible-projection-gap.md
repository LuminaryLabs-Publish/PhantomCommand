# Visual, Native and Accessible Projection Gap

**Timestamp:** `2026-07-13T02-49-07-04-00`

## Summary

The canvas presents selected, disabled, panel and campaign status visually, while native controls and the accessibility tree do not receive the same revisioned projection.

## Plan ledger

**Goal:** require visual and accessible surfaces to derive from the same committed command, availability, focus and game-status read models.

- [x] Inspect menu canvas and hidden controls.
- [x] Inspect panel presentation.
- [x] Inspect campaign HUD and live region.
- [x] Record projection mismatches.
- [ ] Implement correlated projections and acknowledgements.

## Projection mismatches

```txt
visual selected item -> not reflected as DOM focus/current state
visual Continue EMPTY -> native button remains enabled/focusable
visual panel open -> native navigation remains active
visual settings values -> no native control values
visual credits content -> no native content projection
visual campaign HUD -> static assistive description only
visual pause/win/loss -> no dynamic announcement
transition result -> no accessible result projection
```

## Required render/read-model boundary

```txt
CommittedCommandResult
  -> MenuAccessibleReadModel or CampaignAccessibleReadModel
  -> visual canvas projection
  -> native control projection
  -> bounded live-status projection
  -> VisualFrameAck
  -> AccessibleResultAck
```

The two acknowledgements must cite the same command and state revision.
