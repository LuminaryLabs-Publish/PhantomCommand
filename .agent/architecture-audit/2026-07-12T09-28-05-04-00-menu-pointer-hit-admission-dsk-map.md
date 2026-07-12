# Menu Pointer-Hit Admission DSK Map

**Timestamp:** `2026-07-12T09-28-05-04-00`

## Summary

The menu already owns projection and hit-test helpers, but action execution is not bound to the current hit result. The missing parent domain coordinates input event identity, target generations, hit admission and terminal results.

## Plan ledger

**Goal:** define the domain and kit composition required to make pointer misses inert and pointer hits current, explicit and observable.

- [x] Identify existing owners.
- [x] Identify the authority gap.
- [x] Define candidate kits.
- [x] Define command and result boundaries.
- [x] Define invariants and fixture gates.
- [ ] Implement after this documentation pass.

## Existing owners

```txt
src/menu/crt-renderer.js
  -> screenToSource()

src/menu/graveyard-menu.js
  -> menuHitIndex()
  -> panelHitIndex()
  -> pointermove listener
  -> pointerdown listener
  -> activateMain()
  -> activatePanel()
```

## Parent domain

```txt
phantom-command-menu-pointer-hit-admission-authority-domain
```

## Candidate kits

```txt
menu-input-session-kit
menu-surface-generation-kit
menu-panel-generation-kit
menu-selection-revision-kit
pointer-event-envelope-kit
source-coordinate-projection-kit
pointer-containment-result-kit
menu-hit-target-kit
menu-hit-test-result-kit
pointer-activation-command-kit
pointer-activation-admission-kit
pointer-miss-result-kit
menu-action-result-kit
pointer-action-observation-kit
pointer-action-journal-kit
background-miss-fixture-kit
letterbox-miss-fixture-kit
settings-panel-miss-fixture-kit
pointer-target-browser-smoke-kit
```

## Domain transaction

```txt
PointerEvent
  -> allocate pointerEventId
  -> project client coordinates into current source surface
  -> classify InsideSurface or OutsideSurface
  -> hit-test against current menu or panel generation
  -> produce Hit, Miss, Disabled or Stale
  -> admit activation only for current Hit
  -> execute one target action
  -> publish typed MenuActionResult
  -> correlate result with route or settings revision
  -> append bounded observation and journal row
```

## Invariants

```txt
Miss performs zero action
OutsideSurface performs zero action
Hit target belongs to the current event
Hit target belongs to the current surface and panel generation
stale selection or target revision performs zero action
disabled targets return rejection, not fallback activation
pointer and keyboard activation are separate command types
one admitted pointer event executes at most one action
```

## Integration order

```txt
update crt-renderer projection result
  -> update menu and panel hit-test result types
  -> split pointer and keyboard activation paths
  -> add typed action results
  -> expose diagnostics and journals
  -> wire fixtures and browser smoke
```