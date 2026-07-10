# Continue Provenance Render Gap

**Timestamp:** `2026-07-10T18-40-13-04-00`

## Current render surfaces

```txt
menu source canvas 480 x 270
  -> graveyard art
  -> Continue label/note
  -> CRT display

campaign source canvas 640 x 360
  -> ring world
  -> units, towers, projectiles, effects
  -> HUD
  -> minimap
  -> paused/win/loss modal
  -> CRT display
```

## Gap

The menu renders `CONTINUE` as enabled from Boolean key presence and only shows `BOUND` or `EMPTY`. It cannot render which save was selected, why a candidate was rejected, whether the payload is legacy or foreign, or whether campaign startup accepted the same candidate.

The campaign render has no session-mode, candidate ID, schema version, hydration result, or state fingerprint provenance. A screenshot of the campaign cannot distinguish a valid resumed session from a fresh state reached through the Continue route.

## Required additive readback

```txt
menu.continueCapability.enabled
menu.continueCapability.decisionReason
menu.continueCapability.selectedSlotId
menu.continueCapability.classification
session.mode
session.entryStatus
session.selectedSlotId
session.schemaVersion
session.fingerprint
```

This readback should be JSON-safe and diagnostic. It does not require new visible HUD elements in the first implementation.

## Preserve

- Pixel-isometric world composition.
- CRT renderer and source resolutions.
- HUD, minimap, modal, camera, and gameplay framing.
- Existing `PhantomMenu` and `GameHost` compatibility fields.

## Acceptance

A browser or fixture must be able to prove that the candidate shown as resumable by the menu is the exact candidate accepted by campaign startup, without inferring from pixels.