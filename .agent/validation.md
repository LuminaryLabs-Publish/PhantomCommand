# PhantomCommand Validation

**Timestamp:** `2026-07-12T07-29-32-04-00`

## Summary

This run changed documentation only. Source inspection proves the menu creates a Web Audio graph, stores a partial owner object, clears that object before delayed close, and never observes or resumes a suspended/interrupted context. No browser lifecycle or teardown fixture currently exists.

## Plan ledger

**Goal:** distinguish audio graph construction from admitted, observable and disposable audio lifecycle correctness.

- [x] Inspect persisted ambience settings.
- [x] Inspect `ensureAudio()`, `stopAmbience()` and `playUiTone()`.
- [x] Inspect all stored and unstored audio nodes.
- [x] Inspect pointer and keyboard activation paths.
- [x] Inspect transition timing and navigation.
- [x] Confirm no visibility, pagehide, statechange or dispose handling exists.
- [x] Inspect current static menu checks.
- [x] Document lifecycle commands, results, generations and fixture requirements.
- [ ] Execute fixtures after implementation.

## Proven from source

```txt
ambience defaults enabled unless persisted false
first pointerdown or keydown calls ensureAudio()
ensureAudio returns when state.audio is truthy
ensureAudio creates AudioContext, master, drone and looping wind source
ensureAudio never observes AudioContext.state
ensureAudio never calls context.resume()
stopAmbience clears state.audio before context close
stopAmbience schedules an untracked 300 ms delayed close
rapid re-enable can create a replacement before predecessor close
UI tone oscillators are transient and not registered
no visibilitychange listener exists
no pagehide listener exists
no AudioContext statechange listener exists
navigation performs no explicit audio disposal
```

## Existing checks prove

```txt
menu and campaign HTML/module references exist
menu labels and campaign URLs exist
PhantomMenu and GameHost globals exist
CRT and campaign source tokens exist
static build copies source files
```

## Existing checks do not prove

```txt
browser user activation was admitted
audio context reached running state
suspended or interrupted context can resume
one current graph generation exists
rapid toggles cannot overlap contexts
all nodes and timers retire on stop
navigation and pagehide dispose audio
settings projection matches runtime audio state
stale delayed callbacks are rejected
```

## Change boundary

```txt
runtime source changed: no
menu behavior changed: no
campaign behavior changed: no
audio behavior changed: no
rendering changed: no
persistence changed: no
navigation changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser audio smoke: not run
```

## Required fixtures

```txt
fixture:audio-lifecycle-state-machine
fixture:context-generation
fixture:graph-generation
fixture:stale-command-rejection
fixture:node-registry-disposal
fixture:delayed-close-cancellation
fixture:rapid-toggle-replacement
fixture:idempotent-stop-dispose
smoke:first-pointer-audio-activation
smoke:first-keyboard-audio-activation
smoke:suspended-context-resume
smoke:background-foreground-audio
smoke:audio-statechange-interruption
smoke:navigation-audio-retirement
smoke:pagehide-audio-retirement
smoke:pages-audio-lifecycle
```

No audio activation, running-state, interruption recovery, rapid-toggle safety, ordered teardown or browser compatibility claim is made.