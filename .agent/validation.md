# PhantomCommand Validation

**Timestamp:** `2026-07-11T23-28-29-04-00`

## Summary

This run changed internal documentation only. It source-inspected the menu and campaign globals, confirmed raw `state` and `camera` owner exposure, traced the public mutators and documented the missing command, session, phase and frame contracts. Runtime source, gameplay, rendering, persistence, package scripts, dependencies and deployment were not changed.

## Plan ledger

**Goal:** record exactly what was observed and what remains unproved.

- [x] Confirm `window.GameHost` exposes the live campaign state owner.
- [x] Confirm `window.GameHost` exposes the live camera owner.
- [x] Confirm public `startWave`, `build` and `setZoom` mutators exist.
- [x] Confirm `setZoom(NaN)` can produce non-finite camera state.
- [x] Confirm public terminal flags can bypass terminal arbitration.
- [x] Confirm `getState()` has no committed-frame provenance.
- [x] Document host-isolation, command-admission and read-model fixtures.
- [ ] Execute fixtures after implementation.

## Static observations

```txt
public campaign global: window.GameHost
raw gameplay owner exposed: yes
raw camera owner exposed: yes
public direct mutators: 3
command envelope: absent
command ID: absent
host session ID: absent
expected run epoch: absent
expected phase revision: absent
finite numeric admission: absent
typed command result: absent
committed host read model: absent
simulation tick in getState: absent
frame ID in getState: absent
render receipt in getState: absent
state fingerprint in getState: absent
bounded host journal: absent
stale-host rejection: absent
```

## Source examples

```txt
GameHost.state.won = true
  -> update exits early on won
  -> next overlay can show victory without terminal result

GameHost.setZoom(NaN)
  -> targetZoom becomes NaN
  -> following RAF makes zoom non-finite

GameHost.state.souls = 999; GameHost.getState()
  -> readback changes before a following render commit is proven
```

## Change boundary

```txt
runtime source changed: no
persistence behavior changed: no
gameplay changed: no
rendering changed: no
audio changed: no
navigation changed: no
package scripts changed: no
dependencies changed: no
deployment workflow changed: no
branch created: no
pull request created: no
```

## Commands and fixtures

```txt
npm run check: not run
npm run build: not run
browser smoke: not run
host owner-isolation fixture: unavailable
host command-admission fixture: unavailable
finite-value fixture: unavailable
stale session/run/phase fixture: unavailable
terminal host-command fixture: unavailable
host read-model coherence fixture: unavailable
host/render frame-correlation fixture: unavailable
legacy compatibility fixture: unavailable
```

No public host isolation, command safety, finite camera admission, terminal integrity, committed read-model coherence or frame-correlation claim is made.
