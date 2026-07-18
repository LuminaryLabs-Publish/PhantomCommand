# Interaction Audit — Pointer Target Command/Result Map

**Timestamp:** `2026-07-17T23-41-44-04-00`  
**Status:** `menu-pointer-target-admission-authority-audited`

## Current producer map

```txt
pointermove
  -> screenToSource
  -> update pointer location
  -> update selected row only when hit-test succeeds

pointerdown on main menu
  -> screenToSource
  -> menuHitIndex
  -> optionally update selected row
  -> unconditionally activate selected row

pointerdown on settings panel
  -> screenToSource
  -> panelHitIndex
  -> optionally update selected row
  -> unconditionally activate selected row

keyboard Enter/Space
  -> intentionally activate selected row
```

## Required separation

```txt
KeyboardSelectionActivateCommand
  -> selection-based activation is valid

MenuPointerEvidenceCommand
  -> pointer-location-based target decision is required

MenuPointerTargetResult
  -> outside-source | background | disabled | main-item | settings-item | dismiss

MenuActionAdmissionCommand
  -> action only when target result is accepted

MenuActionResult
  -> navigated | setting-mutated | panel-changed | rejected
```

## Rejection rules

| Pointer result | Required result |
|---|---|
| Outside CRT source | Reject; no action. |
| Menu background | Reject; no action. |
| Disabled Continue row | Reject with disabled reason. |
| Valid main row | Admit that row only. |
| Settings background | Reject; no mutation. |
| Valid settings row | Admit that row only. |
| Credits dismiss region | Apply an explicitly authored dismiss policy. |

## Stale-state rule

Pointer action must not consume `menu.selected` or `state.panel.selected` after a target miss. Those values remain useful for keyboard focus and visual state, but are not pointer evidence.

## Frame proof

Each admitted pointer action should carry an action generation into the next route, panel or settings frame and publish `FirstMenuPointerActionFrameAck`. Rejections should leave the visible state unchanged except for an optional explicit rejection cue.

## Boundary

No command, result, pointer or rendering implementation changed.