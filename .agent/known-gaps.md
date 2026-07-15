# PhantomCommand Known Gaps

**Timestamp:** `2026-07-15T03-24-35-04-00`

## Summary

The campaign has no complete device-control admission contract. Touch reaches only a subset of primary-pointer actions while critical campaign actions remain keyboard, multi-button mouse or wheel only.

## Plan ledger

**Goal:** maintain an explicit list of unresolved control-coverage, gesture and evidence gaps.

- [x] Record source-backed action-coverage gaps.
- [x] Separate source evidence from unexecuted device claims.
- [ ] Close each gap with implementation and executable proof.

## Gaps

```txt
device capability revision: absent
required action manifest: absent
control profile descriptor: absent
control generation identity: absent
touch control surface: absent
touch wave-start producer: absent
touch unit-order producer: absent
touch tower-type producer: absent
touch camera-pan producer: absent
touch camera-zoom producer: absent
touch pause producer: absent
touch restart producer: absent
touch exit producer: absent
touch focus producer: absent
additive touch selection policy: absent
selection/pan/order gesture arbitration: absent
pinch cancellation policy: absent
pointercancel settlement: absent
synthetic mouse duplicate suppression: absent
typed campaign action results: absent
first control-surface frame acknowledgement: absent
first action-effect frame acknowledgement: absent
touch-only browser fixture: absent
hybrid-input browser fixture: absent
source/build/Pages control parity: absent
```

## Source-backed mismatch

```txt
touch reachable:
  primary-pointer tap selection
  primary-pointer box selection
  repeated pad activation using current tower type

touch unreachable through normal player UI:
  start wave
  move or attack order
  choose tower type
  complete camera pan and zoom
  focus selection
  pause or resume
  restart
  exit to menu
```

The normal campaign cannot progress through a touch-only player surface because the first wave starts through Space and no visible touch wave action exists.

## Retained gaps

Earlier render-order, pause, terminal-outcome, startup, settings, save, lifecycle, scheduler, WebGL, accessibility, spatial-input, keyboard-input and combat-modifier gaps remain active until implemented and proven.