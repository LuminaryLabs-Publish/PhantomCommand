# Settings Parity Fixture Gate

**Timestamp:** `2026-07-14T02-58-28-04-00`

## Summary

Current checks assert source markers only. They do not load a settings document, change a value, navigate between routes, inspect renderer application or compare source, built output and deployed Pages behavior.

## Plan ledger

**Goal:** block settings-readiness claims until executable cross-route and deployment-parity evidence exists.

- [x] Inspect `npm run check` coverage.
- [x] Identify missing settings fixtures.
- [x] Define source, browser, build and Pages gates.
- [ ] Implement and execute the gates later.

## Required fixtures

```txt
settings schema/default fixture
legacy document migration fixture
malformed document rejection fixture
storage unavailable/degraded fixture
menu CRT off visible-frame fixture
menu grain high visible-frame fixture
menu ambience on/off lifecycle fixture
menu-to-campaign CRT parity fixture
menu-to-campaign grain parity fixture
campaign unsupported ambience result fixture
stale settings command rejection fixture
participant adoption rollback fixture
public settings readback fixture
first settings revision frame acknowledgement fixture
production build parity fixture
GitHub Pages parity fixture
```

## Current check limitations

```txt
scripts/check-menu.mjs
  -> confirms menu, navigation, host and CRT source markers
  -> does not execute settings parsing, writeback or rendering

scripts/check-campaign.mjs
  -> confirms campaign and CRT source markers
  -> does not verify settings read or route parity

npm run build
  -> copies static files
  -> does not execute browser behavior
```

## Promotion rule

Do not mark settings adoption complete until a real browser proves that the same accepted revision controls menu and campaign presentation, storage failures are observable, unsupported capabilities are explicit, and the built plus Pages-hosted outputs match source behavior.

## Validation boundary

No fixture was added or run in this documentation-only audit.