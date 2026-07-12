# PhantomCommand Validation

**Timestamp:** `2026-07-12T04-18-44-04-00`

## Summary

This run changed documentation only. Source inspection found one lazily created menu AudioContext, one ambience graph, transient UI-tone voices and a delayed close timer, but no context-state admission, resume path, lifecycle generation, page-event ownership, retirement receipt or browser fixture.

## Plan ledger

**Goal:** distinguish source-level audio presence from lifecycle correctness.

- [x] Inspect menu settings and audio creation.
- [x] Inspect ambience graph and UI-tone creation.
- [x] Inspect disable, transition and RAF paths.
- [x] Inspect current static menu check.
- [x] Document lifecycle/result/fixture requirements.
- [ ] Execute fixtures after implementation.

## Proven from source

```txt
AudioContext created lazily from user input path
master, drone and looping wind nodes created and started
state.audio used as the only readiness guard
context.state never inspected
context.resume never called
stop clears state.audio and schedules context.close after 300 ms
transition changes location without explicit audio teardown
visibilitychange/pagehide/pageshow listeners absent
static menu check reads source text only
```

## Existing checks prove

```txt
menu canvas and module references exist
menu labels and campaign URL exist
PhantomMenu global exists
graveyard/CRT source tokens exist
static build copies src
```

## Existing checks do not prove

```txt
audio starts or resumes
suspended contexts recover
node/timer leases retire
rapid toggle generations remain isolated
navigation stops audio
bfcache restoration is safe
settings match audible state
```

## Change boundary

```txt
runtime source changed: no
audio behavior changed: no
navigation changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
browser audio smoke: unavailable
```

## Required fixtures

```txt
fixture:audio-start-idempotence
fixture:suspended-context-resume
fixture:audio-toggle-generation
fixture:audio-voice-lease-retirement
fixture:audio-delayed-close-fencing
smoke:audio-pagehide-bfcache
smoke:audio-transition-teardown
smoke:audio-pages
```

No audio lifecycle, audible-state, teardown or bfcache correctness claim is made.
