# Focus, Keyboard and Native Activation Map

**Timestamp:** `2026-07-13T02-49-07-04-00`

## Summary

A native button keyboard activation can pass through the document keydown handler and the button click listener. Those paths resolve action identity from different state.

## Plan ledger

**Goal:** define one activation envelope and deduplication policy for pointer, keyboard, native, assistive and public sources.

- [x] Map all menu activation sources.
- [x] Map focused-control versus visual-selection identity.
- [x] Map panel-specific keyboard meaning.
- [x] Record conflict and duplicate cases.
- [ ] Implement exact admission later.

## Activation sources

```txt
canvas pointerdown -> visual menu.selected
document Arrow/WASD -> visual selection mutation
document Enter/Space -> visual menu.selected or panel.selected
hidden button click -> data-menu-action
assistive technology -> native button click
window.PhantomMenu.activate -> supplied action string
```

## Concrete conflict

```txt
DOM focus: Continue
visual selection: Begin Campaign
key: Enter

document keydown
  -> activate Begin Campaign
  -> transitionStartedAt set

native button click
  -> attempt Continue
  -> transition guard ignores second route

observed outcome: Begin Campaign
focused control identity: Continue
```

## Panel conflict

```txt
visual Settings panel open
DOM focus remains on a background nav button
Enter/Space
  -> document handler activates current panel row
  -> native click can activate background nav action
```

## Required envelope

```txt
AccessibleActivationEnvelope {
  activationId
  eventSequenceId
  sourceKind
  surfaceId
  focusGeneration
  focusedControlId?
  visualCommandId?
  requestedCommandId?
  availabilityRevision
  routeRevision
}
```

Exactly one terminal result must be published for each event sequence.
