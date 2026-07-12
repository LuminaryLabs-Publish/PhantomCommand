# Continue Resume Browser Fixture Gate

**Timestamp:** `2026-07-12T13-59-50-04-00`

## Summary

The current `npm run check` scripts inspect source tokens only. They do not navigate from menu to campaign, inject saves, validate launch intent, observe hydration, compare state, or inspect the first rendered frame.

## Plan ledger

**Goal:** require executable local, built-output and GitHub Pages proof before claiming New/Continue persistence support.

- [x] Review package scripts and current static checks.
- [x] Identify missing bootstrap, storage and frame assertions.
- [x] Define deterministic fixture rows.
- [ ] Implement fixtures and add them to required CI/build gates.

## Existing checks

```txt
npm run check
  -> check-menu.mjs
     -> verifies canvas/module/source tokens
     -> verifies BEGIN CAMPAIGN and new URL
     -> does not verify Continue URL, save parsing or probe semantics

  -> check-campaign.mjs
     -> verifies campaign source tokens and dimensions
     -> does not verify URL query consumption or hydration

npm run build
  -> copies deployable static source
  -> does not execute runtime behavior
```

## Required deterministic fixtures

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
```

## Browser matrix

| Surface | New | Valid Continue | Invalid Continue | Storage failure | First-frame proof |
|---|---:|---:|---:|---:|---:|
| Vite/dev | required | required | required | required | required |
| built static output | required | required | required | required | required |
| GitHub Pages | required | required | required | required | required |

## Required observations

```txt
menu Continue enabled only after Admissible probe result
launch intent mode and ID
selected save key, scope, version and fingerprint
bootstrap terminal status and revision
state fingerprint after commit
campaign HUD values
GameHost immutable read model
source frame and CRT presented frame IDs
no mutation after rejected hydration
```

## Required screenshot/state probes

```txt
valid save with non-default souls/core/wave/camera
  -> first frame visibly differs from default
  -> HUD and GameHost match saved values
  -> screenshot fingerprint is tied to bootstrap revision

invalid save
  -> no restored frame acknowledgement
  -> bounded recovery/error projection
  -> default/live graph remains unchanged
```

## CI requirement

The bootstrap fixtures must be included in the required verification command rather than remaining optional documentation. Static token checks may remain as fast preflight checks but cannot satisfy behavior proof.

## Validation boundary

No test or workflow was changed in this pass. The fixture gate is specified but unavailable and unexecuted.