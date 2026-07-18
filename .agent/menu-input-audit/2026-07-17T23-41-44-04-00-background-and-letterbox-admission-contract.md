# Menu Input Audit — Background and Letterbox Admission Contract

**Timestamp:** `2026-07-17T23-41-44-04-00`  
**Status:** `menu-pointer-target-admission-authority-audited`

## Source evidence

`menuHitIndex(point)` returns `-1` when the pointer is outside the CRT source, when a panel is open, when the x coordinate is outside the menu column or when no row contains the y coordinate.

`panelHitIndex(point)` returns `-1` when the pointer is outside the CRT source, when the active panel is not Settings, when x is outside the settings column or when no settings row contains y.

The pointer-down handler does not treat `-1` as a rejection. It preserves the selected row and invokes the corresponding activation function.

## Required target contract

```txt
outside-source
  -> reject
  -> no tone requiring action semantics
  -> no transition or mutation

background
  -> reject
  -> preserve selection and panel state

valid main item
  -> resolve exact action id
  -> enforce enabled state
  -> admit action

valid settings item
  -> resolve exact setting id
  -> admit one mutation

credits panel
  -> define explicit dismiss region or explicit anywhere-to-dismiss policy
```

## Input-source contract

```txt
keyboard/gamepad-like navigation
  -> selection state is authoritative

pointer input
  -> current pointer target is authoritative
  -> selection state may be updated after a valid hit
  -> selection state must not substitute for a missed hit
```

## Required result fields

```txt
source: pointer
insideSource: boolean
layer: main | settings | credits | none
targetKind: item | dismiss | background | outside
targetId: string | null
enabled: boolean
accepted: boolean
reason: accepted | outside-source | background | disabled | stale-generation
```

## Validation matrix

| Surface | Valid target | Background | Outside source |
|---|---|---|---|
| Main menu | Exact row action | No action | No action |
| Settings | Exact setting mutation | No mutation | No mutation |
| Credits | Explicit dismiss policy | Policy-defined | No action |

## Boundary

This audit defines the contract only. No pointer behavior changed.