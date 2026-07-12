# Campaign Action Result Visible Feedback Gap

**Timestamp:** `2026-07-12T18-11-53-04-00`

## Summary

Campaign rendering consumes mutable state, not terminal action results. A rejected build, wave start or order produces no explicit rejection model, so the HUD can retain predecessor messaging and the visible frame cannot prove whether an action committed or was ignored.

## Current path

```txt
input or GameHost call
  -> void campaign helper
  -> direct mutation or silent return
  -> drawWorld/drawUI read current state
  -> CRT presents source canvas
```

## Gaps

```txt
no action-result projection model
no rejection feedback policy
no predecessor/successor campaign revision on the frame
no action ID on HUD/message changes
no changed-resource set
no first-visible-action-frame acknowledgement
no stale-frame rejection
no browser/build/Pages visual parity fixture
```

## Concrete examples

- `build()` returns silently when no pad is selected, the pad is occupied or souls are insufficient.
- `startWave()` returns silently when a wave is active, the campaign is terminal or all waves are complete.
- `order()` returns silently when no player unit is selected.
- `state.message` changes only on selected successful paths, so rejected attempts can leave unrelated predecessor copy visible.

## Required frame receipt

```txt
CampaignActionVisibleFrameAck {
  frameId
  actionId
  actionStatus
  campaignRevision
  renderRevision
  messageRevision
  visibleAt
}
```

## Required invariants

```txt
accepted action result is visible or intentionally non-visual with an explicit projection result
rejected action result cannot masquerade as success
HUD and public readback cite the same successor revision
stale action results cannot update a newer frame
one visible acknowledgement references one terminal result
```

No rendering behavior was changed in this audit.