# Route Lifecycle Fixture Gate

**Timestamp:** `2026-07-13T17-00-59-04-00`

## Summary

Current static checks validate source markers but do not execute route retirement, navigation failure or successor-frame behavior.

## Plan ledger

**Goal:** require executable source, built-output and Pages proof before route-lifecycle readiness is claimed.

- [x] Identify missing fixture classes.
- [x] Define source/build/Pages parity.
- [x] Preserve current package and deployment behavior.
- [ ] Add and run fixtures after implementation.

## Required fixtures

```txt
menu new-campaign transition retires one route generation
menu continue transition retires one route generation
campaign Escape retires campaign resources before menu adoption
campaign restart retires and replaces one campaign generation
duplicate transition is rejected
RAF callback after retirement is rejected
listeners stop affecting retired state
AudioContext and ambience nodes close or suspend per policy
CRT program buffer and texture receive disposal receipts
window.PhantomMenu and window.GameHost reject retired calls
navigation failure shows bounded fallback or restores predecessor
successor startup failure is surfaced
first successor visible frame acknowledges transition ID
source build and Pages behavior agree
```

## Checks not run

```txt
npm run check
npm run build
browser route-lifecycle fixtures
built-output route-lifecycle fixtures
GitHub Pages route-lifecycle fixtures
```
