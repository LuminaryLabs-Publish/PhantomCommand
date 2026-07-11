# Menu and Campaign Lifecycle Fixture Gate

**Timestamp:** `2026-07-11T03-41-49-04-00`

## Summary

The existing `check` scripts verify source structure. The next lifecycle gate must execute ownership behavior independently of the browser, then confirm real browser remount and navigation behavior.

## Plan ledger

**Goal:** require deterministic lifecycle fixtures before claiming safe restart, route transition or resource disposal.

- [x] Record current package scripts.
- [x] Define DOM-free fixture adapters.
- [x] Define required fixture matrix.
- [x] Define browser smoke.
- [ ] Add scripts after implementation.
- [ ] Run on `main` and in Pages deployment.

## Current gate

```txt
npm run check
npm run build
```

These do not execute runtime lifecycle behavior.

## Proposed scripts

```txt
npm run check
npm run fixture:lifecycle
npm run build
npm run smoke:browser-lifecycle
```

## Fake adapters

```txt
FakeAnimationFrameScheduler
FakeClock
FakeEventTarget
FakeDocument
FakeWindowLocation
FakeGlobalObject
FakeAudioContext
FakeWebGLRenderingContext
FakeCanvas
```

## Fixture matrix

```txt
menu startup success
menu startup failure at each acquisition step
campaign startup success
campaign startup failure at each acquisition step
one RAF chain over many frames
stop/start generation isolation
duplicate transition request
menu Begin teardown
menu Continue teardown
campaign Restart teardown
campaign Exit teardown
global lease conflict and restoration
listener add/remove parity
timer cancel/settle parity
audio stop/disconnect/close parity
CRT create/delete parity
render-after-dispose rejection
double dispose
two mount/dispose cycles
```

## Browser lifecycle smoke

```txt
1. Open menu.
2. Capture lifecycle snapshot and active resource counts.
3. Interact with settings and audio.
4. Begin campaign.
5. Assert menu reaches disposed before navigation.
6. Assert campaign owns one RAF and one listener set.
7. Exercise camera and gameplay.
8. Return to menu or restart.
9. Assert campaign reaches disposed.
10. Remount both routes.
11. Assert no duplicate input, audio, RAF or WebGL work.
```

## Deployment policy

Do not call the lifecycle gate complete until:

```txt
all fixtures pass
browser smoke passes
static build succeeds
Pages artifact includes the lifecycle modules
main contains the exact passing commit
```
