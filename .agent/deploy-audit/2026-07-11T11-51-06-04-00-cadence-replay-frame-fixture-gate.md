# Cadence, Replay and Frame Fixture Gate

**Timestamp:** `2026-07-11T11-51-06-04-00`

## Summary

Current checks inspect source patterns only. Deployment must be gated by executable cadence, stall, replay and frame-correlation fixtures before fixed-step determinism is claimed.

## Plan ledger

**Goal:** prevent releases where command order or committed state changes with display cadence or stalls.

- [x] Inventory existing checks.
- [x] Identify missing behavioral proof.
- [x] Define the minimum deployment gate.
- [ ] Implement scripts and wire them into `npm run check`.

## Existing gate

```txt
npm run check
  -> check-menu.mjs
  -> check-campaign.mjs

npm run build
  -> build-static.mjs
```

The campaign check matches source text. It does not execute the clock, command queue, replay or render consumers.

## Required Node fixtures

```txt
fixture:fixed-step-cadence
fixture:irregular-cadence
fixture:stall-policy
fixture:target-tick-order
fixture:command-replay
fixture:state-fingerprint
fixture:frame-correlation
fixture:gamehost-gateway
```

## Required browser smoke

```txt
smoke:campaign-cadence
  -> run scripted commands at multiple RAF schedules
  -> inject a visible stall
  -> simulate hidden and visible transitions
  -> inspect command, tick and frame journals
  -> verify final fingerprint and frame acknowledgements
```

## Deployment admission

```txt
source checks pass
projection fixtures pass
phase fixtures pass
cadence and stall fixtures pass
command replay fingerprint matches
frame consumers acknowledge one committed receipt
GameHost bypass is rejected
static build succeeds
browser cadence smoke passes
```

## Failure policy

Any cadence-dependent state, silent dropped time, command-order divergence, replay fingerprint mismatch, mixed-frame consumer revision or direct mutation bypass must fail deployment.