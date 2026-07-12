# PhantomCommand Campaign Phase Admission Fixture Gate

**Timestamp:** `2026-07-12T03-00-46-04-00`

## Summary

Current static checks can confirm source patterns but cannot prove that paused or terminal actions perform zero mutation. Deployment readiness requires pure phase fixtures, browser interaction proof, public-host parity, and first-visible-frame evidence.

## Plan ledger

**Goal:** define the minimum executable evidence required before phase admission is considered implemented on Pages.

- [x] Review current `npm run check` and build scripts.
- [x] Identify missing pure phase and action fixtures.
- [x] Identify missing browser and public-host proof.
- [x] Identify missing frame-correlation proof.
- [ ] Implement and wire fixtures into the repository check gate.
- [ ] Execute build and deployed Pages smoke after implementation.

## Required pure fixtures

```txt
campaign phase derivation for every legal state
invalid overlapping boolean combinations
legal transition table
illegal transition rejection
paused START_WAVE result and fingerprint
paused BUILD result and fingerprint
paused ORDER result and fingerprint
terminal BUILD/ORDER/SELECT results and fingerprints
active-wave duplicate START_WAVE
stale phase revision
build-during-wave product policy
```

## Required adapter fixtures

```txt
keyboard and GameHost START_WAVE parity
pointer and GameHost BUILD parity
pointer and GameHost ORDER parity
finite camera payload policy
raw owner quarantine
rejected action zero mutation
```

## Required browser smoke

```txt
load campaign
capture PLANNING fingerprint
pause
attempt wave/build/order
confirm typed rejections and stable fingerprint
resume and start wave
force WON and LOST fixtures independently
attempt post-terminal gameplay actions
confirm stable terminal fingerprint
confirm overlay, HUD, minimap and world cite one phase revision
```

## Required deployment gate

```txt
npm run check
npm run build
local browser phase smoke
GitHub Pages deployment success
Pages browser phase smoke
artifact or screenshot evidence for accepted/rejected action frames
```

## Current status

```txt
phase fixtures: absent
browser phase smoke: absent
public-host parity fixture: absent
phase/action/frame receipt fixture: absent
Pages phase smoke: absent
```

## Validation boundary

No checks were run in this documentation-only audit. Existing checks do not prove phase admission or mutation fencing.