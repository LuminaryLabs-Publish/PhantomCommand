# PhantomCommand Validation

**Timestamp:** `2026-07-12T11-48-43-04-00`

## Summary

This run changed documentation only. Source inspection proves that both routes own unconditional recursive RAF loops and anonymous listener sets, while the CRT renderer owns WebGL resources without disposal or context recovery and menu audio owns a delayed close timer without aggregate retirement.

## Plan ledger

**Goal:** distinguish normal page destruction from explicit, tested runtime-session cleanup.

- [x] Inspect menu RAF, transition and listeners.
- [x] Inspect campaign RAF, fixed-step frame and listeners.
- [x] Inspect CRT shader/program/buffer/texture ownership.
- [x] Confirm no renderer dispose or context-loss handling exists.
- [x] Inspect AudioContext graph and delayed close timer.
- [x] Confirm public hosts are not explicitly revoked.
- [x] Document lifecycle authority, result and fixture requirements.
- [ ] Execute fixtures after implementation.

## Proven from source

```txt
menu calls requestAnimationFrame(frame) recursively
campaign calls requestAnimationFrame(frame) recursively
neither route retains a cancellable RAF ID
most route listeners are anonymous closures
createCrtRenderer allocates two shaders, program, buffer and texture
createCrtRenderer returns no dispose service or inventory
successful shader objects are not explicitly deleted
no webglcontextlost or webglcontextrestored listeners exist
stopAmbience schedules AudioContext.close with a 300ms timeout
PhantomMenu and GameHost are assigned to window without retirement
Escape and reload depend on browser navigation for cleanup
```

## Existing checks prove

```txt
menu HTML and module references exist
campaign HTML and module references exist
expected menu, campaign and CRT source tokens exist
static build copies deployable source files
```

## Existing checks do not prove

```txt
one active RAF owner per route
listeners are removed on route retirement
pending timers are cancelled or completed
WebGL resources are deleted
context loss produces a typed degraded result
context restoration rebuilds one admitted resource generation
AudioContext ownership terminates
public hosts are revoked
stale callbacks cannot mutate or schedule successors
repeated local and Pages sessions do not accumulate resources
```

## Change boundary

```txt
runtime source changed: no
menu behavior changed: no
campaign behavior changed: no
pointer behavior changed: no
camera behavior changed: no
simulation changed: no
rendering changed: no
audio changed: no
persistence changed: no
navigation changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser runtime lifecycle smoke: not run
Pages runtime lifecycle smoke: not run
```

## Required fixtures

```txt
fixture:menu-single-raf-owner
fixture:campaign-single-raf-owner
fixture:menu-listener-retirement
fixture:campaign-listener-retirement
fixture:timer-retirement
fixture:webgl-resource-inventory
fixture:webgl-context-loss-result
fixture:webgl-context-restore-generation
fixture:audio-close-receipt
fixture:public-host-revocation
fixture:duplicate-retirement-idempotency
fixture:stale-callback-no-mutation
fixture:repeated-route-session
smoke:runtime-lifecycle-browser
smoke:runtime-lifecycle-built-output
smoke:runtime-lifecycle-pages
```

No runtime cleanup, context recovery, stale-callback rejection or deployment-readiness claim is made.