# PhantomCommand Known Gaps

**Timestamp:** `2026-07-14T18-41-11-04-00`

## Summary

The visible pause overlay does not own command admission. Only simulation `update()` stops; camera and direct gameplay commands remain mutable.

## Plan ledger

**Goal:** keep every blocker to authoritative pause and resume explicit.

- [x] Record current source-backed pause gaps.
- [ ] Close them through runtime implementation and executable headless/browser proof.

## Current pause gaps

```txt
PauseStateRevision: absent
PausePolicyRevision: absent
strict versus tactical pause distinction: absent
held-key settlement: absent
drag/pointer settlement: absent
camera freeze policy: absent
keyboard command admission result: absent
pointer command admission result: absent
wheel command admission result: absent
GameHost command admission result: absent
wave-start pause guard: absent
tower-build pause guard: absent
unit-order pause guard: absent
selection pause guard: absent
camera pan/zoom/focus pause guard: absent
blocked-command journal: absent
stale input rejection on resume: absent
FirstPausedFrameAck: absent
FirstResumedCampaignFrameAck: absent
source/build/Pages pause fixtures: absent
```

## Current risks

```txt
PAUSED can be visible while state mutates
a wave can be queued while paused
souls and towers can change while paused
orders can be prepared while paused
camera can move behind the overlay
public GameHost capabilities can bypass UI policy
resume can adopt unclassified paused mutations
tests can pass without executing pause behavior
```

## Retained gaps

Terminal outcome, browser-startup, settings, durable save/resume, route-resource retirement, scheduler, WebGL recovery, accessibility, spatial/keyboard input, public-host and combat gaps remain retained in their timestamped audits.
