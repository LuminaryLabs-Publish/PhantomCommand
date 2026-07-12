# PhantomCommand Menu Miss, Containment and CRT-Curve Contract

**Timestamp:** `2026-07-12T16-00-03-04-00`

## Summary

Menu pointer activation currently has three independent truth gaps: containment failure is not terminal, control-hit failure is not terminal, and the visible CRT transform is not inverted for input. The combined result is that pixels with no visible control can execute a stale selected action.

## Plan ledger

**Goal:** define one geometry and admission contract where only a current visible control hit can authorize pointer-sourced mutation.

- [x] Record source and display coordinate spaces.
- [x] Record main-menu and settings control bounds.
- [x] Record miss and stale-selection behavior.
- [x] Record pointer policy omissions.
- [x] Record required rejection semantics.
- [ ] Implement and verify.

## Current geometry

```txt
source size: 480 × 270
main menu x: 55..245
main rows: top=119 + index*22, height=18, count=4
settings x: 102..378
settings rows: top=110 + index*23, height=18, count=4
```

The gaps between rows are valid source pixels but not controls.

## Current containment contract

```txt
screenToSource
  -> reverse letterbox containment
  -> return x, y, inside

menuHitIndex/panelHitIndex
  -> reject when inside=false
  -> reject outside control rectangles

pointerdown
  -> ignore rejection as action evidence
  -> execute predecessor selection
```

Containment currently informs hit testing but does not govern dispatch.

## Current curve contract

```txt
render: containUv -> optional curveUv
input: reverse containment only
```

No revision links the shader coefficient, settings state, viewport rectangle and pointer projection. Toggling CRT changes visible geometry without changing logical hit geometry.

## Required rules

```txt
inside=false is terminal RejectedOutsideSurface
inside=true + no current control is terminal RejectedMiss
CRT enabled requires inverse mapping or shared display-space controls
unknown/stale transform is terminal RejectedUnsupportedTransform or RejectedStale
no rejection path may call activateMain or activatePanel
no pointer path may use predecessor selection as hit evidence
```

## Pointer policy

Required admission fields:

```txt
pointerId
pointerType
isPrimary
button
buttons
sequence id
pointer-down surface generation
pointer-up surface generation
cancel status
capture status
```

The initial minimal policy should admit primary mouse button 0 and primary touch/pen only. Other inputs should return typed rejections without feedback that resembles a committed action.

## Mutation fence

The following must remain unchanged for all rejected pointer results:

```txt
menu.selected
state.panel
state.panel.selected
settings.crt
settings.grain
settings.ambience
state.transitionStartedAt
state.targetUrl
state.fade
state.flash
localStorage settings bytes
audio graph state, except optional explicit rejection cue policy
```

## Proof matrix

```txt
4 main rows × center hit
3 main row gaps × miss
outside left/right/top/bottom × miss
letterbox at wide and tall aspect × outside
4 settings rows × center hit
3 settings row gaps × miss
CRT on/off × every case
DPR 1/2 × every case
mouse/touch/pen primary policy
resize between sample and commit
transition already active
```

## Completion boundary

The contract is not complete until browser fixtures assert both the terminal result and the absence of all fenced mutations for every rejection path.