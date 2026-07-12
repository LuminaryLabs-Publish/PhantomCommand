# PhantomCommand Menu Miss and Stale-Action Loop

**Timestamp:** `2026-07-12T16-00-03-04-00`

## Summary

The menu treats selection as both hover state and action target. Pointer misses preserve the previous selection and pointer-down then executes it. This makes empty-space clicks gameplay-significant even though no visible control was hit.

## Plan ledger

**Goal:** separate hover selection from action evidence so only an admitted current control hit can trigger pointer-sourced navigation or settings mutation.

- [x] Trace main-menu hover and pointer-down behavior.
- [x] Trace settings-panel selection and activation.
- [x] Trace transition dedupe and disabled-item behavior.
- [x] Record concrete player-facing failure cases.
- [ ] Implement typed rejection and fixtures.

## Current main-menu loop

```txt
pointer move over Begin
  -> selected = Begin

pointer move to empty graveyard area
  -> hit = -1
  -> selected remains Begin

pointer down on empty graveyard area
  -> hit = -1
  -> selected remains Begin
  -> activateMain(Begin)
  -> transition to campaign=new
```

Equivalent stale actions can open Settings or Credits and can attempt Continue when it is selected.

## Current settings loop

```txt
open Settings
  -> selected row = CRT

pointer move over Ambience
  -> selected row = Ambience

pointer down in an empty panel region
  -> hit = -1
  -> selected row remains Ambience
  -> activatePanel()
  -> ambience toggles
```

When the fourth row is selected, a miss can close the settings panel.

## Gameplay consequences

```txt
accidental campaign launch
accidental Continue attempt
unexpected panel open/close
unexpected CRT/grain/ambience change
settings persistence after a miss
unearned UI tone and transition feedback
pointer behavior that disagrees with visible affordances
```

## State coupling

The same mutable fields are used for both presentation and command selection:

```txt
menu.selected
state.panel.selected
state.panel
state.transitionStartedAt
state.targetUrl
settings.crt
settings.grain
settings.ambience
```

No command envelope records the input source, hit evidence or predecessor revision.

## Required gameplay rule

```txt
hover may update selection
pointer miss may update pointer observation only
pointer hit may create one action command
keyboard activation may use current selection with explicit Keyboard source
accessibility button activation may name its control directly
```

## Required result map

```txt
Hit Begin       -> CommittedNavigation(new)
Hit Continue    -> CommittedNavigation(continue) or RejectedDisabled
Hit Settings    -> CommittedPanelOpen(settings)
Hit Credits     -> CommittedPanelOpen(credits)
Hit setting row -> CommittedSettingMutation
Miss            -> RejectedMiss, zero gameplay/settings mutation
Outside surface -> RejectedOutsideSurface, zero mutation
Stale result    -> RejectedStale, zero mutation
Duplicate       -> RejectedDuplicate, zero mutation
```

## Fixture cases

```txt
miss after hovering each main-menu item
click each vertical row gap
click left/right of menu bounds
click top/bottom letterbox
miss after hovering each settings row
non-primary mouse button
second touch while primary touch is active
resize between pointer sample and action admission
transition already started
```

## Validation boundary

No gameplay, settings, navigation or audio behavior was changed. The miss-to-action defect remains active.