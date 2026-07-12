# PhantomCommand Validation

**Timestamp:** `2026-07-12T13-59-50-04-00`

## Summary

This run changed documentation only. Source inspection proves that the menu enables Continue from unvalidated storage presence, emits a `campaign=continue` query, and the campaign ignores that query, reads no save and always builds default state. The only campaign writer stores an incomplete unversioned victory payload.

## Plan ledger

**Goal:** distinguish a visible Continue option from executable, complete and frame-proven campaign resume behavior.

- [x] Inspect configured save keys and storage scopes.
- [x] Confirm the menu does not parse or validate save bytes.
- [x] Confirm the menu emits distinct New and Continue URLs.
- [x] Confirm the campaign consumes neither query value.
- [x] Confirm the campaign reads no save.
- [x] Inspect default state, default units and ID construction.
- [x] Inspect the victory save payload and silent failure handling.
- [x] Review current menu/campaign static checks.
- [x] Document bootstrap, hydration and fixture requirements.
- [ ] Execute fixtures after implementation.

## Proven from source

```txt
SAVE_KEYS contains three keys
hasCampaignSave checks localStorage and sessionStorage
hasCampaignSave returns true for any truthy bytes
no JSON parse occurs during menu probing
Begin navigates to game.html?campaign=new
Continue navigates to game.html?campaign=continue
campaign-scene.js does not read location.search or URLSearchParams
campaign always initializes souls=145, core=24, wave=0
campaign always creates six default allied units
campaign never reads a save payload
victory writes only scene, souls and wave
storage write errors are swallowed
```

## Existing checks prove

```txt
menu and campaign HTML/module references exist
BEGIN CAMPAIGN and new-route source tokens exist
campaign dimensions and core source tokens exist
CRT source upload tokens exist
static build includes source files
```

## Existing checks do not prove

```txt
Continue is enabled only for valid saves
Continue URL is checked by the menu smoke
campaign launch query is consumed
New and Continue produce distinct state
valid saves hydrate complete campaign state
invalid saves are rejected without mutation
save writes succeed or return typed failures
IDs and references remain valid after resume
first HUD, GameHost and CRT frame cite the bootstrap revision
local, built and Pages resume behavior matches
```

## Change boundary

```txt
runtime source changed: no
menu behavior changed: no
campaign behavior changed: no
save behavior changed: no
input behavior changed: no
camera behavior changed: no
simulation changed: no
rendering changed: no
audio changed: no
navigation changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser bootstrap/resume smoke: not run
Pages bootstrap/resume smoke: not run
```

## Required fixtures

```txt
fixture:save-probe-missing
fixture:save-probe-valid-current
fixture:save-probe-malformed
fixture:save-probe-foreign
fixture:save-probe-unsupported-version
fixture:new-bootstrap-default-state
fixture:new-bootstrap-predecessor-save-policy
fixture:continue-bootstrap-complete-state
fixture:continue-bootstrap-migrated-state
fixture:continue-invalid-save-no-mutation
fixture:continue-storage-unavailable
fixture:hydration-id-reference-integrity
fixture:hydration-next-id-continuity
fixture:bootstrap-stale-result-rejection
fixture:first-visible-restored-frame
fixture:gamehost-bootstrap-read-model
smoke:bootstrap-resume-browser
smoke:bootstrap-resume-built-output
smoke:bootstrap-resume-pages
```

No functional Continue, hydration, migration or deployment-readiness claim is made.