# Fixed-Step Scheduler Fixture Gate

**Timestamp:** `2026-07-13T11-41-10-04-00`

## Summary

The existing source checks verify markers but do not execute cadence, hitch, visibility, replay or visible-frame behavior. Scheduler readiness requires deterministic source, built-output and deployed-origin fixtures.

## Plan ledger

**Goal:** define the minimum executable gate before fixed-step scheduling or smooth high-refresh presentation can be considered proven.

- [x] Record current package commands.
- [x] Separate static checks from runtime proof.
- [x] Define pure scheduler fixtures.
- [x] Define browser, build and Pages fixtures.
- [ ] Implement and execute later.

## Current commands

```txt
npm run check
  -> scripts/check-menu.mjs
  -> scripts/check-campaign.mjs

npm run build
  -> scripts/build-static.mjs
```

These commands do not currently prove scheduler results or visible cadence.

## Pure fixtures

```txt
60 Hz exact cadence
90 Hz cadence
120 Hz cadence
144 Hz cadence
zero-step frame sequence
multi-step frame sequence
50 ms clamp boundary
250 ms hitch with explicit dropped-time result
pause accumulator policy
win/loss terminal drain
restart generation retirement
deterministic replay from admitted wall-time samples
```

## Browser fixtures

```txt
requestAnimationFrame cadence instrumentation
visibility hidden/resumed generation change
stale predecessor callback rejection
camera/simulation temporal-envelope correlation
Canvas2D and CRT frame-ID parity
first matching visible-frame acknowledgement
GameHost detached scheduler readback
render failure without scheduler death
```

## Build and deployment fixtures

```txt
source route
built static output
GitHub Pages origin

all must agree on:
  fixed step
  step budget
  dropped-time classification
  simulation revision sequence
  presentation frame fingerprint
  visible acknowledgement
```

## Failure gate

No readiness claim is allowed when any fixture reports silent dropped time, unbounded step drain, stale generation mutation, source/CRT frame mismatch, missing visible acknowledgement or source/build/Pages divergence.

## Validation status

```txt
npm run check: not run
npm run build: not run
pure scheduler fixtures: unavailable
browser cadence fixtures: unavailable
built-output scheduler smoke: not run
Pages scheduler smoke: not run
```