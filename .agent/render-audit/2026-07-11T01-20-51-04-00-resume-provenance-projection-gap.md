# Resume Provenance Projection Gap

**Timestamp:** `2026-07-11T01-20-51-04-00`

## Current visual behavior

The menu renders Continue as either `BOUND` or `EMPTY`. That visual state is derived from raw non-empty storage presence and contains no selected key, layer, schema, version, scene, wave, validity, or rejection reason.

```txt
storage values
  -> Boolean presence
  -> Continue enabled
  -> BOUND / EMPTY
```

The campaign route then renders a fresh session regardless of whether navigation used `campaign=new` or `campaign=continue`.

## Gap

There is no render-neutral admission observation that can be projected consistently by:

```txt
menu art
hidden HTML controls
PhantomMenu diagnostics
campaign startup overlay
GameHost diagnostics
future test harnesses
```

A malformed string and a valid resumable envelope would produce the same menu presentation. A completion summary and a current active-session save would also produce the same presentation.

## Required projection row

```js
{
  routeMode,
  continueEnabled,
  decisionReason,
  selectedSlotId,
  selectedKind,
  selectedVersion,
  selectedScene,
  inspectedCount,
  resumableCount,
  rejectedCount,
  decisionFingerprint
}
```

The row must remain render-neutral. The menu can map it to concise copy such as `BOUND`, `EMPTY`, `INVALID`, or `COMPLETED`, while diagnostics expose full clone-safe provenance.

## Campaign consumption proof

The first campaign-render observation must reference the same startup-admission ID and selected-candidate fingerprint used by the menu decision. A fresh route must explicitly prove that no candidate was consumed. A rejected Continue request must not silently display a fresh campaign as though resume succeeded.

## Non-goals

Do not redesign the menu, replace CRT rendering, add save-slot UI, or alter campaign visuals before admission proof exists.
