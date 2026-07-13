# Campaign Resume Fixture and Deployment Gate

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Timestamp:** `2026-07-12T22-05-12-04-00`

## Summary

The current static checks prove source markers and copy behavior, not New/Continue semantics. Deployment readiness for resume requires executable storage, bootstrap, roundtrip, rejection, rollback and visible-frame proof against source, built output and GitHub Pages.

## Plan ledger

**Goal:** define the minimum evidence required before claiming Continue works in production.

- [x] Inspect package scripts and campaign static checks.
- [x] Confirm no persistence or route-intent execution exists in checks.
- [x] Define source-level fixtures.
- [x] Define browser and built-output fixtures.
- [x] Define Pages parity and artifact requirements.
- [ ] Implement and execute the gate later.

## Current proof surface

```txt
npm run check
  -> check-menu.mjs
  -> check-campaign.mjs

check-campaign.mjs
  -> reads HTML and source files
  -> asserts source strings and basic campaign markers
  -> does not execute menu, storage, route intent or campaign hydration

npm run build
  -> static copy only
```

## Missing executable proof

```txt
New starts authored defaults
Continue availability validates a compatible checkpoint
Continue hydrates non-default state
Continue never silently starts New
invalid/missing/unsupported checkpoints produce typed failure
checkpoint migration is deterministic
candidate failure preserves predecessor
duplicate/stale bootstrap commands do not commit
first frame cites the committed generation
source, dist and Pages behavior match
```

## Required test layers

### Headless state fixtures

```txt
fresh-run preset fingerprint
checkpoint encode/decode roundtrip
migration chain
participant hydration
cross-reference validation
atomic commit and rollback
stale/duplicate command rejection
```

### Browser fixtures

```txt
seed valid checkpoint
load menu and observe ContinueAvailabilityResult
activate Continue
assert restored HUD, entities, wave and camera
assert first frame generation receipt

seed malformed checkpoint
assert typed failure and no gameplay frame

activate New with an existing checkpoint
assert fresh preset and explicit checkpoint-preservation/reset policy
```

### Built-output fixtures

Run the same browser matrix against `dist/` after `npm run build`.

### Pages smoke

```txt
public URL loads menu
valid checkpoint enables Continue
Continue restores non-default state
invalid checkpoint does not impersonate New
visible frame receipt matches source/build contract
```

## Required artifacts

```txt
command transcript
fixture result JSON
checkpoint fixture files and hashes
source commit SHA
build artifact hash
browser console log
first-frame receipt
screenshots for fresh, restored and rejected flows
Pages URL and observed commit
```

## Gate

Do not claim campaign persistence or Continue readiness until all layers pass with matching schema, source fingerprint, state fingerprint and frame generation.

## Validation boundary

No command, build, browser or Pages test was run during this documentation-only audit.