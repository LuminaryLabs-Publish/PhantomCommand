# PhantomCommand Paused and Terminal Command Mutation Loop

**Timestamp:** `2026-07-12T03-00-46-04-00`

## Summary

Pause and terminal state currently stop fixed-step updates, not gameplay commands. The player or public host can therefore modify the campaign while simulation is frozen or after outcome commitment.

## Plan ledger

**Goal:** enumerate every mutation path that must pass through campaign-phase admission.

- [x] Trace wave start.
- [x] Trace construction.
- [x] Trace selection and orders.
- [x] Trace tower-type and pause keys.
- [x] Trace camera actions.
- [x] Trace public host actions.
- [x] Separate gameplay mutation from presentation-only mutation.
- [ ] Implement the policy matrix and zero-mutation fixtures.

## Paused loop

```txt
P key
  -> paused becomes true
  -> update() stops

Space
  -> startWave does not check paused
  -> spawn queue is created
  -> waveActive becomes true
  -> message changes

pointer double-click selected pad
  -> build does not check paused
  -> Souls decrease
  -> tower/pad/effect state changes

right-click order
  -> order does not check paused
  -> target/move/effect state changes

render
  -> paused overlay remains visible over mutated world/HUD/minimap
```

## Terminal loop

```txt
update commits won or lost
  -> later update calls stop
  -> render shows terminal overlay

pointer/keyboard/GameHost remain installed
  -> selectAt can replace selection
  -> build can spend Souls and create tower
  -> order can replace movement/target state
  -> number keys change tower type
  -> P changes paused boolean
  -> camera and raw state owners remain mutable

render
  -> terminal overlay remains visible over post-terminal mutation
```

## Owner mutation map

```txt
startWave -> spawn, waveActive, message
build -> selected pad, Souls, tower ID, pad, towers, effects, message
selectAt -> selected, selectedPad, optional build
order -> unit target, unit move, effects
number keys -> towerType
P -> paused
camera controls -> camera x/z/zoom/velocity
GameHost -> raw state/camera plus startWave/build/setZoom
```

## Required gameplay rule

```txt
no durable gameplay owner mutates unless one action is admitted against one phase revision
```

Presentation-only camera policy may remain available during pause or terminal, but it must be explicit, finite-value checked, session fenced, and frame receipted.

## Required fixture matrix

```txt
PLANNING + START_WAVE -> accepted
PAUSED_PLANNING + START_WAVE -> rejected or explicit queue policy
PAUSED_* + BUILD -> rejected
PAUSED_* + ORDER -> rejected
WON/LOST + BUILD -> rejected
WON/LOST + ORDER -> rejected
WON/LOST + SELECT -> explicit policy
WON/LOST + CAMERA -> explicit presentation policy
all rejections -> unchanged durable fingerprint
```

## Validation boundary

Documentation only. No gameplay mutation path was changed.