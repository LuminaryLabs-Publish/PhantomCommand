# Interaction Audit: Select Build Order Action Result Map

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T09-52-02-04-00`

## Current input surface

```txt
mouse move: update source pointer
left pointer drag: box select allies
left pointer click: select ally, select pad, or clear selection
second click on selected pad: build selected tower
right click: order selected units or attack nearest enemy
wheel: zoom around pointer
WASD/arrows: pan camera
1/2/3: choose tower type
Space: start wave
P: pause
R: reload
Escape: route to menu
F: focus selected units or center
```

## Current interaction problem

Input routes directly mutate state or silently return.

```txt
- selectAt returns nothing.
- order returns nothing.
- build returns nothing.
- startWave returns nothing.
- camera and tower-type commands mutate state without ActionResult rows.
- no rejected/no-op reason catalog exists.
- no fixture can prove accepted/rejected/ignored rows without browser input.
```

## Required action result map

```txt
ActionIntent
  source: pointer | keyboard | GameHost | fixture
  type: select | build | order | start-wave | choose-tower | set-zoom | focus | pause | reload | route-menu
  payload

ActionResult
  status: accepted | rejected | ignored | no-op
  reason
  beforeSummary
  afterSummary
  changed
  events
  diagnostics
```

## High-priority rows

```txt
select.unit.accepted
select.pad.accepted
select.box.accepted
select.clear.no-target
build.accepted
build.rejected.no-selected-pad
build.rejected.occupied-pad
build.rejected.insufficient-souls
order.accepted.move
order.accepted.attack
order.ignored.no-selection
wave-start.accepted
wave-start.rejected.active
wave-start.rejected.complete
choose-tower.accepted
set-zoom.accepted
pause.toggled
```

## Recommendation

Build the ActionIntent and ActionResult layer as a DOM-free helper first. Keep `campaign-scene.js` behavior unchanged until fixture rows prove parity for click, build, order, and wave-start paths.
