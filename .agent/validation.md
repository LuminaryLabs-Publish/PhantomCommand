# PhantomCommand Validation

**Timestamp:** `2026-07-12T05-49-04-04-00`

## Summary

This run changed documentation only. Source inspection proves that the menu emits distinct Begin and Continue URLs and scans three save keys, but the campaign module reads neither the query nor storage. Every launch builds the same default state, while the terminal save is minimal and unconsumed.

## Plan ledger

**Goal:** distinguish visible save affordances from executable resume correctness.

- [x] Inspect menu save-presence scanning.
- [x] Inspect Begin and Continue transition URLs.
- [x] Inspect campaign startup and default state construction.
- [x] Inspect all campaign storage reads and writes.
- [x] Inspect restart and public host paths.
- [x] Inspect current static menu and campaign checks.
- [x] Document bootstrap, envelope, hydration, result and fixture requirements.
- [ ] Execute fixtures after implementation.

## Proven from source

```txt
SAVE_KEYS contains three legacy keys
hasCampaignSave accepts any truthy string from localStorage or sessionStorage
Begin emits game.html?campaign=new
Continue emits game.html?campaign=continue
campaign-scene.js never reads location.search
campaign-scene.js performs no storage read
campaign startup always constructs default camera, state and six units
victory writes phantomCommand.save with scene, souls and wave only
victory write returns no typed result
R reloads the current page without an explicit restart transaction
```

## Existing checks prove

```txt
menu and campaign HTML/module references exist
menu labels and campaign URLs exist
PhantomMenu and GameHost globals exist
campaign source contains expected gameplay tokens
static build copies source files
```

## Existing checks do not prove

```txt
Continue candidate JSON is parseable
candidate schema and producer are compatible
Begin and Continue produce different bootstrap modes
saved state is hydrated
entity references and counters remain valid
save writes are durable
new-run save policy is correct
resumed state reaches the first visible frame
menu capability matches campaign capability
```

## Change boundary

```txt
runtime source changed: no
campaign behavior changed: no
persistence behavior changed: no
navigation changed: no
rendering changed: no
audio changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser resume smoke: not run
```

## Required fixtures

```txt
fixture:launch-intent-parse
fixture:malformed-save-rejection
fixture:unrelated-key-rejection
fixture:legacy-save-migration
fixture:new-run-save-policy
fixture:hydration-reference-validation
fixture:entity-counter-reseed
fixture:save-roundtrip-parity
fixture:first-resumed-frame
smoke:menu-begin-route
smoke:menu-continue-route
smoke:pages-campaign-resume
```

No campaign-resume, save-compatibility, hydration, durability or first-frame correctness claim is made.