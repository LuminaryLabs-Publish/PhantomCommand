# PhantomCommand Next Steps

**Timestamp:** `2026-07-13T17-00-59-04-00`

## Summary

Implement Route Session Resource Retirement Authority before claiming safe navigation, reload, cleanup or successor readiness. Start with route generations and resource manifests, then add cancellable leases, typed retirement, navigation results, fallback and first-frame proof.

## Plan ledger

**Goal:** preserve current menu and campaign behavior while making browser resource ownership explicit and bounded.

### Identity and manifest

- [ ] Add `RouteGeneration` and `RouteTransitionId`.
- [ ] Publish one resource manifest per active route.
- [ ] Include RAF, listeners, timeouts, audio, WebGL, canvases and public capabilities.
- [ ] Reject commands from retired generations.

### Leases and retirement

- [ ] Retain and cancel RAF callback IDs.
- [ ] Register listeners through removable leases.
- [ ] Add CRT renderer `dispose()` with shader, program, buffer and texture receipts.
- [ ] Add audio suspend/close policy for transition, pagehide and failure.
- [ ] Retire `window.PhantomMenu` and `window.GameHost` through generation-aware facades.
- [ ] Make retirement idempotent.

### Navigation

- [ ] Replace direct location mutation with `RouteTransitionCommand`.
- [ ] Freeze duplicate menu transitions.
- [ ] Route Escape and restart through the same authority.
- [ ] Publish Accepted, Failed, Cancelled, Superseded and TimedOut results.
- [ ] Restore the predecessor or show a route-independent fallback when navigation fails.

### Visible proof

- [ ] Publish the last accepted outgoing frame ID.
- [ ] Carry transition ID into successor startup.
- [ ] Publish `FirstRouteFrameAck`.
- [ ] Expose last transition, retirement and visible-frame receipts through detached readback.

### Fixtures

- [ ] Add menu-to-campaign, campaign-to-menu and restart fixtures.
- [ ] Inject RAF, listener, audio and CRT disposal failures.
- [ ] Test duplicate transition, stale callbacks and public-host calls.
- [ ] Test blocked navigation and successor startup failure.
- [ ] Run source, built-output and Pages parity checks.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Dependency order

```txt
Route Generation
  -> Resource Manifest
  -> Lease Registration
  -> Command Admission Freeze
  -> Resource Retirement
  -> Navigation Result
  -> Failure Fallback or Restore
  -> Successor Generation
  -> FirstRouteFrameAck
  -> source/build/Pages proof
```
