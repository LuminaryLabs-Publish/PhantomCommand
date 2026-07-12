# PhantomCommand Validation

**Timestamp:** `2026-07-12T03-00-46-04-00`

## Summary

This run changed internal documentation only. It source-inspected campaign phase booleans, fixed-step gating, wave start, construction, selection, orders, keyboard, pointer, camera, rendering, and `GameHost`; confirmed pause and terminal states stop simulation but not all command mutation; and documented the missing phase identity, action policy, typed result, mutation fence, and visible-frame contracts.

## Plan ledger

**Goal:** record exactly what was observed and what remains unproved.

- [x] Confirm `update()` exits for paused, won, and lost.
- [x] Confirm `startWave()` rejects active/terminal/exhausted states but not paused.
- [x] Confirm `build()` has no pause, wave, or terminal phase guard.
- [x] Confirm `selectAt()` can call `build()` without phase admission.
- [x] Confirm `order()` has no pause or terminal guard.
- [x] Confirm keyboard and pointer handlers mutate live state directly.
- [x] Confirm `GameHost` exposes raw state/camera and direct mutators.
- [x] Confirm render overlay has no phase/action/frame provenance.
- [x] Document pure and browser fixture gates.
- [ ] Execute fixtures after implementation.

## Static observations

```txt
campaign booleans: paused, waveActive, won, lost
canonical phase enum: absent
phase ID/revision: absent
legal transition table: absent
action policy matrix: absent
fixed-step simulation pause fence: present
wave-start paused fence: absent
build paused fence: absent
build terminal fence: absent
order paused fence: absent
order terminal fence: absent
selection phase fence: absent
public-host phase fence: absent
typed action result: absent
stale phase rejection: absent
phase/action/tick/frame receipt: absent
```

## Source examples

```txt
update:
  if paused || won || lost -> return

startWave:
  reject waveActive || won || lost || wave >= waves.length
  paused is not checked
  accepted path replaces spawn[], sets waveActive, changes message

build:
  checks selected pad, occupancy and Souls
  no phase check
  accepted path spends Souls, creates tower, appends effect

order:
  checks only selected length and live unit lookup
  no phase check
  accepted path replaces target/move and appends effect

render:
  overlays when paused || won || lost
  visible label precedence is won, then lost, then paused
  no phase revision or action result is projected
```

## Change boundary

```txt
runtime source changed: no
campaign action behavior changed: no
pause behavior changed: no
terminal behavior changed: no
pointer or keyboard behavior changed: no
rendering changed: no
persistence behavior changed: no
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
phase derivation fixture: unavailable
transition table fixture: unavailable
paused mutation fixture: unavailable
terminal mutation fixture: unavailable
wave admission fixture: unavailable
build policy fixture: unavailable
public-host phase parity fixture: unavailable
stale phase-revision fixture: unavailable
phase/action/frame receipt fixture: unavailable
Pages smoke: not run
```

No campaign-phase correctness, pause safety, terminal immutability, legal transition, action-admission, public-host parity, or phase/frame-correlation claim is made.