# Deploy Audit: Browser Audio Lifecycle Fixture Gate

**Timestamp:** `2026-07-12T04-18-44-04-00`

## Current check

`scripts/check-menu.mjs` performs source-text assertions. It does not create an AudioContext or exercise browser lifecycle events.

## Required fixtures

```txt
pure audio state-machine fixture
fake-context start/resume/suspend/close fixture
rapid toggle generation fixture
delayed-close stale callback fixture
voice lease retirement fixture
real-browser gesture startup smoke
real-browser suspension/resume smoke
pagehide/bfcache smoke
transition teardown smoke
Pages audio smoke
```

## Browser matrix

```txt
Chromium
WebKit
ambience initially on/off
context running/suspended
rapid on/off/on
normal navigation
pagehide persisted/non-persisted
bfcache restore
```

Deployment is not audio-lifecycle complete until all mandatory leases retire and settings/audible observations agree.
