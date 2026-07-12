# Background Click Begin-Campaign Loop

**Timestamp:** `2026-07-12T09-28-05-04-00`

## Summary

The initial selected menu item is Begin Campaign. A pointerdown anywhere on the canvas, including the graveyard background or letterbox margins, can therefore begin a new campaign even when no menu row was targeted.

## Plan ledger

**Goal:** make menu progression depend on an explicit target rather than the previously highlighted selection.

- [x] Identify initial selection state.
- [x] Trace menu miss behavior.
- [x] Trace transition admission.
- [x] Document the reachable gameplay effect.
- [x] Define miss-safe progression requirements.
- [ ] Implement and verify later.

## Reachable loop

```txt
menu.selected = Begin Campaign
  -> pointerdown on non-menu background
  -> menuHitIndex() returns -1
  -> selected item remains Begin Campaign
  -> activateMain(Begin Campaign)
  -> beginTransition(game.html?campaign=new)
  -> campaign route loads
```

## Settings variant

```txt
settings panel selected row = CRT
  -> pointerdown outside every settings row
  -> panelHitIndex() returns -1
  -> selected row remains CRT
  -> activatePanel()
  -> CRT preference toggles
```

## Required gameplay result

```txt
Miss
  -> no transition
  -> no setting mutation
  -> no tone representing action success
  -> no route or settings revision change
```

Only a current `Hit` or an explicit keyboard/native-button command may execute a menu action.