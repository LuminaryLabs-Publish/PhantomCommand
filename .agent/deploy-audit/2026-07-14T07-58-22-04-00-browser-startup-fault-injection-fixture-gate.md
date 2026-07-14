# Browser Startup Fault-Injection Fixture Gate

**Timestamp:** `2026-07-14T07-58-22-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

Current checks prove source markers and the build copies files. They do not execute either route or test startup failures. This gate defines the minimum browser proof needed before startup readiness can be claimed.

## Plan ledger

**Goal:** require the same startup acceptance and failure behavior in source, `dist` and GitHub Pages.

- [x] Record current check and build boundaries.
- [x] Define a real-browser success matrix.
- [x] Define required fault injection.
- [x] Define fallback, rollback and retry assertions.
- [x] Define source/build/Pages parity evidence.
- [ ] Implement and run the fixtures later.

## Current proof

```txt
npm run check
  -> read HTML and JavaScript as text
  -> assert regular-expression markers
  -> no browser execution

npm run build
  -> copy index.html, game.html, src, docs and config
  -> no import, context or frame validation
```

## Required success fixtures

```txt
menu route publishes accepted RouteStartupResult
menu route publishes PhantomMenu for the accepted attempt
menu route acknowledges first source and CRT frame
campaign route publishes accepted RouteStartupResult
campaign route publishes GameHost for the accepted attempt
campaign route acknowledges first tick, source frame and CRT frame
```

## Required fault fixtures

```txt
remove #game before module start
return null from Canvas2D getContext
return null from WebGL getContext
force vertex compile failure
force fragment compile failure
force program link failure
force source texture upload failure
force first draw failure
prevent first RAF callback
fail optional AudioContext
fail browser storage
```

## Assertions for required failures

```txt
route does not claim readiness
candidate listeners are absent
candidate RAF is absent
candidate public host is absent
candidate resources are retired
DOM fallback is visible
fallback is keyboard reachable
retry starts a new attempt
stale predecessor completion is rejected
safe route escape remains available
```

## Assertions for optional failures

```txt
route reports degraded capability
required route functionality remains usable
no unhandled rejection reaches the page
result identifies the unavailable optional capability
```

## Parity matrix

```txt
source server
built dist server
GitHub Pages
```

Each environment must publish matching result schemas, capability classification and first-frame evidence.

## Gate

Do not mark browser-route startup authority complete until every required fixture passes in all three environments.

## Validation boundary

Fixtures were specified but not implemented or executed.