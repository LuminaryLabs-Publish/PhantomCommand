# Interaction Audit — Select / Build / Order Fixture Map

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T06-59-18-04-00`

## Interaction surfaces

```txt
pointer click: select ally or pad
pointer drag: select ally group
right click: order selected allies or target nearest enemy
wheel: zoom around pointer
WASD/arrows: camera pan
number keys: tower type
Space: start wave
P: pause
R: reload
Escape: return to menu
F: focus selected units or sanctum
```

## Fixture priority

The next fixture should focus on gameplay-changing actions first:

```txt
select ally
select pad
clear selection
build tower
order selected units
start wave
```

Camera, zoom, pause, reload, and route escape can be documented later as separate input rows once campaign source/action proof exists.

## Action result map

```txt
ActionIntent
  id
  action: select | build | order | start-wave
  inputSource: pointer | keyboard | fixture | GameHost
  target
  beforeSummary

ActionResult
  intentId
  status: accepted | rejected | no_mutation
  reason
  afterSummary
  events
  legacyStateCompatible
```

## Required rejection reasons

```txt
build:missing-pad
build:occupied-pad
build:insufficient-souls
order:no-selection
start-wave:already-active
start-wave:campaign-won
start-wave:campaign-lost
start-wave:complete
select:no-target
```

## GameHost implication

`window.GameHost.getState()` should keep legacy aggregate fields and add a JSON-safe `campaign` block with latest action, selected units, selected pad, tower type, wave source, source fingerprint, render readback summary, and fixture status.
