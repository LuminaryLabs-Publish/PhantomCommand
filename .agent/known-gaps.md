# PhantomCommand Known Gaps

**Timestamp:** `2026-07-15T08-41-37-04-00`

## Summary

The campaign publishes mutable runtime owners and direct mutation functions through an ambient global. Observation, mutation, caller identity, expected revisions, retirement and visible-frame evidence are not separated.

## Plan ledger

**Goal:** maintain an explicit list of unresolved public capability, settlement, lifecycle and evidence gaps.

- [x] Record source-backed host capability gaps.
- [x] Separate source evidence from unexecuted browser claims.
- [ ] Close each gap with implementation and executable proof.

## Gaps

```txt
public capability policy revision: absent
public capability set identity: absent
diagnostic caller lease: absent
immutable campaign snapshot contract: absent
immutable camera snapshot contract: absent
campaign state revision: absent
camera state revision: absent
public command envelope: absent
expected revision admission: absent
public command idempotency: absent
allowlisted campaign commands: absent
allowlisted camera commands: absent
typed public mutation result: absent
capability retirement result: absent
late-caller rejection: absent
route/runtime generation binding: absent
Canvas2D frame revision: absent
CRT frame revision: absent
first public mutation visible-frame acknowledgement: absent
public capability browser fixture: absent
source/build/Pages capability parity: absent
```

## Source-backed mismatch

```txt
published directly:
  mutable state object
  mutable camera object
  startWave function
  build function
  setZoom function

published safely only in part:
  getState returns a cloned summary

missing:
  capability restriction
  caller identity
  expected revisions
  exactly-once settlement
  typed results
  retirement
  frame evidence
```

The campaign static check requires the `window.GameHost` marker but does not constrain the public members or prove safe settlement.

## Retained gaps

Earlier device-control, render-order, pause, terminal-outcome, startup, settings, save, lifecycle, scheduler, WebGL, accessibility, spatial-input, keyboard-input and combat-modifier gaps remain active until implemented and proven.