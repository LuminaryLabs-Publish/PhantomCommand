# PhantomCommand Next Steps

**Timestamp:** `2026-07-14T07-58-22-04-00`

## Summary

Implement Browser Route Startup Readiness and Failure Authority before treating either route as reliably bootable across browsers and deployed output.

## Plan ledger

**Goal:** move route initialization from top-level side effects to one staged attempt that either publishes a proved first frame or leaves a usable DOM fallback.

- [ ] Add parser-owned fallback containers and accessible status to `index.html` and `game.html`.
- [ ] Wrap menu and campaign boot in explicit `main(startupCommand)` entrypoints.
- [ ] Define route ID, startup attempt ID, source revision and build revision.
- [ ] Probe the DOM root and Canvas2D context before route state creation.
- [ ] Return typed WebGL, shader compile and program link results.
- [ ] Prepare CRT resources without publishing them as live.
- [ ] Prepare menu/campaign state, listener leases, public host and RAF lease as candidates.
- [ ] Execute one source-frame probe and one CRT-frame probe.
- [ ] Atomically adopt every participant or retire every candidate.
- [ ] Publish `RouteStartupResult` and immutable public readback.
- [ ] Publish `FirstRouteFrameAck` for the accepted attempt.
- [ ] Add DOM fallback retry, reload and campaign return-to-menu commands.
- [ ] Allocate a new attempt for every retry and reject stale completion.
- [ ] Classify audio and storage failure as optional/degraded where appropriate.
- [ ] Add real-browser success and fault-injection fixtures.
- [ ] Require source, `dist` and GitHub Pages startup parity.

## Do not claim complete until

```txt
required startup failures never leave an unexplained blank route
candidate listeners, frames and GPU resources are retired on failure
fallback controls remain visible and operable without WebGL
retry cannot adopt stale predecessor work
public host publication cites the accepted startup attempt
first source and CRT frames cite the same attempt
source, build and Pages pass the same fault matrix
```

## Retained work

The settings, durable save/resume, route retirement, scheduler, WebGL recovery, accessibility, input and combat plans remain active and are not superseded.