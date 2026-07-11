# PhantomCommand Lifecycle Idempotency Fixture Gate

**Timestamp:** `2026-07-10T21-49-26-04-00`

## Current gate

```txt
npm run check
  -> scripts/check-menu.mjs
  -> scripts/check-campaign.mjs

npm run build
  -> scripts/build-static.mjs
```

The current checks inspect source patterns. They do not construct route sessions, advance frames, dispatch interactions, stop sessions, dispose resources, or remount routes.

## Required fixtures

```txt
tests/phantom-command-menu-lifecycle-fixture.mjs
tests/phantom-command-campaign-lifecycle-fixture.mjs
tests/phantom-command-crt-resource-fixture.mjs
tests/phantom-command-listener-ledger-fixture.mjs
tests/phantom-command-restart-idempotency-fixture.mjs
```

## DOM-free contract fixture

Prove the pure lifecycle owner:

```txt
created -> starting -> running
running -> stopped
stopped -> disposed
running -> disposed through ordered stop
stop twice is idempotent
dispose twice is idempotent
partial start failure rolls back all recorded resources
restart produces one new session and disposes the old session
stale-session input is rejected
```

## Browser fixture

Using a real browser runtime:

```txt
menu mount -> one RAF loop, expected listener count, one CRT resource set
menu transition -> duplicate activation rejected
menu dispose -> no frame submissions, zero live owned resources
menu remount -> one new loop and no duplicate event handling
campaign mount -> one RAF loop and one listener set
campaign dispose -> no simulation or render advancement
campaign restart -> new session ID and fresh deterministic initial state
CRT dispose -> texture, buffer, program, and shaders released once
```

## Gate ordering

```txt
1. run lifecycle contract fixtures independently
2. run existing source checks
3. run candidate resolver and action fixtures when implemented
4. run browser lifecycle/resource fixture
5. add successful fixtures to npm run check
6. run npm run build
7. permit Pages deployment only after all gates pass
```

## Required assertions

- Exactly one active session per route host.
- Exactly one retained RAF request per running session.
- No RAF callback reschedules after stop or dispose.
- Every registered listener has one removal result.
- Every owned audio and WebGL resource has one release result.
- Remaining owned resources are zero after dispose.
- Duplicate stop/dispose calls do not throw or double release.
- Old-session callbacks cannot mutate new-session state.
- Existing visual output, controls, routes, and fixed-step constants remain unchanged.

## Current validation state

```txt
lifecycle contract fixture: absent / not run
browser lifecycle fixture: absent / not run
CRT disposal fixture: absent / not run
listener ledger fixture: absent / not run
restart idempotency fixture: absent / not run
npm run check: not run in this documentation pass
npm run build: not run in this documentation pass
```

Do not add placeholder fixture names to the package gate until each fixture passes independently.