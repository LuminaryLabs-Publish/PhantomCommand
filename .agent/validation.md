# PhantomCommand Validation

**Timestamp:** `2026-07-12T18-11-53-04-00`

## Summary

This documentation-only run verifies the current campaign action paths. Source inspection proves that action helpers either mutate shared state or return silently, and that no command identity, terminal result, state revision or first-visible-frame receipt exists. It does not prove a runtime correction or deployed action safety.

## Plan ledger

**Goal:** separate source-backed campaign action defects from unimplemented command, revision, transaction, result and browser proof.

- [x] Compare the Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome` and select only `PhantomCommand`.
- [x] Verify required root `.agent` files and the new timestamped audit family.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Inspect campaign helpers, keyboard/pointer ingress, fixed-step updates, rendering and public host exposure.
- [x] Change documentation only.
- [ ] Execute campaign-action fixtures after implementation.

## Proven from source

```txt
startWave returns silently for active, terminal or exhausted campaign states
build returns silently for missing pad, occupied pad or insufficient souls
order returns silently for empty selection
order skips selected IDs that no longer resolve
selectAt combines selection and second-click build
number keys replace towerType directly
P toggles paused directly
R reloads the document
GameHost exposes startWave, build and setZoom direct mutators
all campaign action helpers return undefined
fixed-step update and renderer consume the same mutable aggregate
action IDs, source identities and campaign revisions are absent
terminal action results and visible-frame acknowledgements are absent
```

## Proven documentation state

```txt
START_HERE current: yes
current-audit current: yes
next-steps current: yes
known-gaps current: yes
validation current: yes
kit-registry current: yes
tracker and turn ledger present: yes
architecture/render/gameplay/interaction/campaign-action/deploy audits present: yes
central ledger and internal change log required: yes
```

## Existing checks can establish, when run

```txt
campaign entry files exist
campaign source includes expected authored/runtime/render tokens
CRT renderer symbols exist
window.GameHost token exists
static build includes source files
```

## Existing checks cannot establish

```txt
campaign action command identity
source/capability admission
expected-revision admission
duplicate action idempotency
stale action rejection
explicit rejection reasons
zero mutation after rejection
build and wave atomicity
prepare failure rollback
terminal CampaignActionResult
feedback/readback result projection
first visible action-frame acknowledgement
source/build/Pages action parity
```

## Required deterministic fixtures

```txt
fixture:wave-start-results
fixture:build-results
fixture:selection-results
fixture:order-results
fixture:tower-type-results
fixture:pause-restart-policy
fixture:duplicate-action-id
fixture:stale-campaign-revision
fixture:stale-resource-revisions
fixture:zero-mutation-rejections
fixture:build-atomicity
fixture:wave-start-atomicity
fixture:prepare-failure-rollback
fixture:public-gamehost-source
```

## Required browser matrix

```txt
source route, built output and GitHub Pages
keyboard, pointer and public GameHost sources
successful and rejected wave/build/order paths
selection and rectangle selection
valid and invalid tower types
pause and restart policy
stale and duplicate actions
HUD feedback and public readback
first visible action frame
```

## Change boundary

```txt
runtime source changed: no
campaign behavior changed: no
action behavior changed: no
simulation behavior changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
target branch: main
npm run check executed: no
npm run build executed: no
browser action smoke executed: no
Pages action smoke executed: no
action-result fixtures available: no
```

## Claim boundary

The audit proves that current action calls cannot distinguish success from rejection and that action effects are not revisioned or correlated with a visible frame. It does not claim the defect is fixed, campaign actions are idempotent, rollback exists, or the deployed route has passed action fixtures.