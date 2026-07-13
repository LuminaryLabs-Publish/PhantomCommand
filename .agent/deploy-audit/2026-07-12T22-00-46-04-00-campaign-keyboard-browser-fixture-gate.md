# Campaign Keyboard Browser Fixture Gate

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Timestamp:** `2026-07-12T22-00-46-04-00`

## Summary

The current campaign check is a static source-token smoke. It does not dispatch keyboard events, vary focus or lifecycle state, simulate auto-repeat, inspect zero-mutation rejections, or correlate accepted commands with the visible CRT frame.

## Plan ledger

**Goal:** require executable source, built-output and GitHub Pages proof before keyboard admission can be considered complete.

- [x] Identify current static-check boundary.
- [x] Define focus, repeat, lifecycle and duplicate fixtures.
- [x] Define zero-mutation assertions.
- [x] Define visible-frame and deployment parity gates.
- [ ] Implement and run the fixtures later.

## Existing proof boundary

```txt
scripts/check-campaign.mjs
  -> reads HTML, campaign source, CRT source and build source
  -> asserts expected tokens
  -> dispatches no KeyboardEvent
  -> owns no browser or Pages observation
```

## Required deterministic fixtures

```txt
fixture:keyboard-pause-repeat-once
fixture:keyboard-wave-repeat-rejection
fixture:keyboard-tower-selection-repeat-rejection
fixture:keyboard-editable-target-zero-mutation
fixture:keyboard-inactive-route-zero-mutation
fixture:keyboard-blur-generation-retirement
fixture:keyboard-visibility-generation-retirement
fixture:keyboard-pagehide-teardown
fixture:keyboard-pageshow-successor-generation
fixture:keyboard-stale-keyup-zero-mutation
fixture:keyboard-held-movement-release
fixture:keyboard-duplicate-command-id
fixture:keyboard-listener-retirement
fixture:keyboard-visible-result-frame
```

## Required browser matrix

```txt
source route
built dist route
GitHub Pages route

canvas focused
canvas unfocused
editable control focused
document hidden and restored
pagehide/pageshow lifecycle

single key press
held auto-repeat
rapid alternating keys
stale keyup after generation change

Space, 1, 2, 3, P, F, R, Escape
WASD and Arrow movement
```

## Required assertions

```txt
P toggles once per admitted physical press
repeat one-shot events produce typed rejection and zero mutation
editable targets receive zero campaign shortcut mutation
inactive or retired surfaces receive zero mutation
blur/visibility/pagehide clear held input exactly once
predecessor-generation keyup does not alter successor held state
listeners are removed on route retirement
accepted commands produce one terminal result
camera/phase/navigation consumers publish receipts
first visible frame cites the accepted result
source, build and Pages observations agree
```

## Execution status

```txt
npm run check: not run
npm run build: not run
browser keyboard smoke: not run
Pages keyboard smoke: not run
keyboard fixtures available: no
runtime or deployment changed: no
```

## Claim boundary

Static token matches are not keyboard admission proof. The gate remains blocked until browser events, lifecycle transitions, zero-mutation assertions, consumer receipts and visible-frame correlation pass on source, built and deployed routes.