# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T16-00-03-04-00`

## Summary

The next implementation boundary is Menu Pointer-Hit Admission Authority. Refactor the existing menu and CRT owners so pointer-sourced actions require a current visible-control hit and every miss or stale result performs zero mutation.

## Plan ledger

**Goal:** implement one deterministic pointer pipeline from event sampling through visible geometry, typed hit admission, action commit and first-frame acknowledgement.

- [ ] Extract immutable main-menu and settings control descriptors.
- [ ] Add surface, transform, layout and panel generations.
- [ ] Version viewport bounds, source size, DPR, CRT state and curve coefficient.
- [ ] Implement inverse CRT projection or shared display-space hit geometry.
- [ ] Replace integer-only hit functions with typed `MenuHitTestResult`.
- [ ] Make `inside=false` terminal `RejectedOutsideSurface`.
- [ ] Make no-control hits terminal `RejectedMiss`.
- [ ] Require primary pointer and admitted button.
- [ ] Add pointer sequence, capture and cancel policy.
- [ ] Construct pointer-sourced actions only from `status=Hit` evidence.
- [ ] Keep keyboard and hidden controls as explicit input sources.
- [ ] Add `MenuActionCommand` and terminal `MenuActionResult`.
- [ ] Fence stale surface, transform, layout and panel results.
- [ ] Deduplicate repeated pointer sequences.
- [ ] Fence actions after route transition commit.
- [ ] Return zero mutation for every rejected path.
- [ ] Publish detached input/action observations and bounded journal.
- [ ] Correlate accepted results with the first visible menu frame.
- [ ] Add Node geometry and policy fixtures.
- [ ] Add browser source-route, built-output and Pages fixtures.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Existing owners to update

```txt
src/menu/graveyard-menu.js
src/menu/crt-renderer.js
src/menu/graveyard-art.js
index.html
menu-route-kit
crt-renderer-kit
graveyard-art-kit
menu-settings-persistence-kit
menu-audio-kit
menu-static-check-kit
window.PhantomMenu
scripts/check-menu.mjs
package.json
```

## Control descriptor

```txt
MenuControlDescriptor {
  controlId
  actionId
  panelKind
  enabled
  sourceShape
  visibleShape
  layoutRevision
  panelGeneration
}
```

## Geometry descriptor

```txt
MenuRenderGeometry {
  surfaceGeneration
  transformRevision
  sourceSize
  displayRect
  devicePixelRatio
  crtEnabled
  curveCoefficient
  layoutRevision
  panelGeneration
  controls[]
}
```

## Pointer command

```txt
MenuPointerSample {
  sampleId
  sequenceId
  pointerId
  pointerType
  isPrimary
  button
  buttons
  viewportPoint
  surfaceGeneration
  transformRevision
}

MenuActionCommand {
  commandId
  inputSource
  pointerSampleId
  hitResultId
  controlId
  actionId
  expectedMenuRevision
  expectedPanelGeneration
  expectedTransitionRevision
}
```

## Terminal results

```txt
Committed
RejectedOutsideSurface
RejectedMiss
RejectedPointerPolicy
RejectedUnsupportedTransform
RejectedStale
RejectedDuplicate
RejectedTransition
RejectedDisabled
RejectedCapability
```

## Minimal correction sequence

```txt
1. Calculate pointer policy result.
2. Project against current geometry.
3. Return typed containment and hit results.
4. On any rejection, return without calling activateMain/activatePanel.
5. On Hit, build one command for the named control.
6. Commit selection/panel/settings/transition mutation once.
7. Publish terminal result and first-frame acknowledgement.
```

## Fixture gate

```txt
main control centers commit expected actions
main row gaps reject with zero mutation
empty graveyard and letterbox reject with zero mutation
settings row centers commit expected mutations
settings row gaps reject with zero mutation
secondary mouse and secondary touch reject
CRT-on/off visible geometry matches hit geometry
resize/DPR stale results reject
keyboard and accessibility controls retain parity
one physical sequence produces one result
source, build and Pages results match
```

## Dependency order

```txt
Runtime Session Resource Lifecycle Authority
  -> CRT Display/Input Projection Authority
  -> Menu Pointer-Hit Admission Authority
  -> Campaign Bootstrap and Continue Resume Authority
  -> Public Host Committed Read Model
```

Do not fix the defect by merely checking `index >= 0` in one listener and leaving geometry, stale-result, pointer-policy and proof gaps unowned. Update the existing owners under one explicit authority.