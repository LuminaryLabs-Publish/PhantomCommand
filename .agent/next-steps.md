# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T09-28-05-04-00`

## Goal

Implement one menu pointer-hit admission authority so only the row targeted by the current pointer event can execute, while keyboard activation remains explicitly selection-based.

## Plan ledger

- [ ] Introduce menu input session, surface generation, panel generation and selection revision identities.
- [ ] Normalize each pointer event into a bounded event envelope.
- [ ] Preserve the existing contain projection and explicit `inside` result.
- [ ] Replace integer-only hit tests with typed `Hit` and `Miss` results.
- [ ] Bind every hit target to the current menu or panel generation.
- [ ] Admit pointer activation only from the current event's `Hit` result.
- [ ] Make pointer `Miss` return a typed no-op result.
- [ ] Keep keyboard Enter and Space on a separate selection-based command path.
- [ ] Reject stale hit results after panel, route or selection-generation changes.
- [ ] Publish bounded pointer-action observations and a journal.
- [ ] Add deterministic miss fixtures and real-browser pointer smokes.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Existing owners to update

```txt
src/menu/graveyard-menu.js
src/menu/crt-renderer.js
menu-route-kit
crt-renderer-kit
window.PhantomMenu diagnostics
scripts/check-menu.mjs
package.json
```

## Command contract

```txt
MenuPointerActivationCommand
  commandId
  inputSessionId
  surfaceGeneration
  panelGeneration
  selectionRevision
  pointerEventId
  clientX
  clientY
  sourceProjection
  hitResult
  requestedAtMs
```

## Hit result contract

```txt
MenuHitTestResult
  pointerEventId
  surfaceGeneration
  panelGeneration
  status: Hit | Miss | OutsideSurface | Stale
  targetKind: MenuItem | SettingsRow | CreditsPanel | None
  targetId
  targetIndex
  sourceX
  sourceY
  insideSource
```

## Result contract

```txt
MenuPointerActivationResult
  commandId
  pointerEventId
  status: Applied | Miss | RejectedStale | RejectedDisabled | RejectedTransitioning
  targetId
  previousSelectionRevision
  committedSelectionRevision
  routeTarget
  settingsRevision
  reason
  committedAtMs
```

## Fixture gate

```txt
background click with Begin selected performs zero action
left and right letterbox clicks perform zero action
top and bottom letterbox clicks perform zero action
click between menu rows performs zero action
disabled Continue row returns RejectedDisabled
settings panel background click performs zero mutation
settings panel outside click performs zero mutation
current row hit executes exactly that row
stale hit from a prior panel generation performs zero mutation
keyboard Enter still activates the selected row
hidden native buttons still activate through native click semantics
pointer result is correlated with route or settings revision
```

## Dependency order

```txt
Menu Pointer-Hit Admission Authority
  -> CRT Display/Input Projection Authority
  -> Runtime Session Lifecycle Authority
  -> Public Host and Committed Read Model Authorities
```

Do not infer a pointer target from the previously highlighted selection. Require a hit result from the current pointer event.