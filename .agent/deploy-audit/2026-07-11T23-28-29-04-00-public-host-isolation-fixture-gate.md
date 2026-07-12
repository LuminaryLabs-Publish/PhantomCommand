# Deploy Audit: Public Host Isolation Fixture Gate

**Timestamp:** `2026-07-11T23-28-29-04-00`

## Summary

The current campaign check only asserts that `window.GameHost` exists. That assertion does not prove the host is safe. Deployment should eventually require proof that the public API exposes no runtime owner, rejects invalid and stale commands, and reports only committed frame-correlated observations.

## Plan ledger

**Goal:** define the validation gate required before the public host is treated as a supported automation surface.

- [x] Inspect the current package and campaign static check.
- [x] Identify the current positive existence assertion.
- [x] Define pure host fixtures.
- [x] Define browser lifecycle and frame fixtures.
- [x] Define a deployment gate.
- [ ] Implement and run the gate.

## Current check gap

`scripts/check-campaign.mjs` verifies only that campaign source contains `window.GameHost`. It does not reject:

```txt
raw state or camera properties
direct mutation functions
non-finite numeric admission
unversioned read results
missing session/run/phase identity
missing frame provenance
stale hosts surviving navigation
```

## Required pure fixtures

```txt
public API schema contains only approved fields
raw owner references are absent
read results are detached and immutable
attempted read-result mutation cannot affect runtime
command schema rejects missing and malformed fields
finite-value policy rejects NaN and Infinity
capability policy rejects unsupported commands
session/run/phase fences reject stale commands
terminal policy rejects prohibited commands
legacy adapter exposes no owner handle
```

## Required browser fixtures

```txt
window.GameHost is frozen
GameHost.state is undefined
GameHost.camera is undefined
accepted command returns ACCEPTED_PENDING or COMMITTED
rejected command performs zero visible and internal mutation
getCommittedState remains stable until a frame commit
following committed frame cites commandId and frameId
HUD and host read model agree on souls, core, wave and outcome
NaN zoom leaves camera and visible frame unchanged
navigation to menu retires the campaign host
back/forward cache does not revive a stale host session
```

## Recommended package gate

```txt
npm run check
npm run test:host
npm run smoke:host
npm run build
```

## Deployment rule

GitHub Pages deployment should not advertise or depend on the host automation surface until pure host isolation tests and a real browser frame-correlation smoke pass. The existing static check may continue to verify the API entrypoint, but it should assert the approved surface rather than mere global presence.

## Validation boundary

No checks, package scripts, workflow or deployment artifacts changed in this documentation-only run.
