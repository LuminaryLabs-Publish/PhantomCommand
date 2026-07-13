# PhantomCommand Validation

**Timestamp:** `2026-07-12T22-05-12-04-00`

## Summary

This documentation-only run verifies the current New/Continue path. Source inspection proves that Continue is enabled from raw storage presence, the campaign ignores route intent and saved values, every campaign boot creates fresh defaults, and the final-victory record is not a complete checkpoint.

## Plan ledger

**Goal:** separate source-backed bootstrap/resume defects from unimplemented schema, hydration, commit, rollback and browser proof.

- [x] Compare the Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome` and select only `PhantomCommand`.
- [x] Verify required root `.agent` files and the new timestamped audit family.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Inspect menu save presence, navigation, campaign initialization, victory save, rendering and static checks.
- [x] Preserve the concurrent keyboard-admission audit family.
- [x] Change documentation only.
- [ ] Execute campaign bootstrap/resume fixtures after implementation.

## Proven from source

```txt
menu scans phantomCommand.save, nexus.sceneSnapshot and phantom.command.campaign
any non-empty localStorage/sessionStorage value enables Continue
New routes to game.html?campaign=new
Continue routes to game.html?campaign=continue
campaign source does not parse location.search or URLSearchParams
campaign source does not read any save key
campaign always initializes souls=145, core=24, wave=0
campaign always creates six starting allied units
victory writes only scene, souls and wave
R reloads the campaign document
no checkpoint schema/version/checksum exists
no participant hydration or migration exists
no atomic bootstrap commit/rollback exists
no first visible bootstrap-result frame acknowledgement exists
```

## Proven documentation state

```txt
START_HERE current: yes
current-audit current: yes
next-steps current: yes
known-gaps current: yes
validation current: yes
kit-registry current after final update: yes
tracker and turn ledger present: yes
architecture/render/gameplay/interaction/campaign-resume/deploy audits present: yes
keyboard-admission predecessor retained: yes
central ledger and internal change log required: yes
```

## Existing checks can establish, when run

```txt
menu and campaign entry files exist
campaign source includes expected authored/runtime/render tokens
CRT renderer symbols exist
window.GameHost token exists
static build includes source files
```

## Existing checks cannot establish

```txt
New versus Continue intent admission
validated checkpoint availability
storage parse/schema/version/checksum behavior
migration compatibility
complete participant capture and hydration
cross-reference and ID validation
atomic install and verified rollback
stale/duplicate bootstrap rejection
one terminal CampaignBootstrapResult
first visible run-generation frame acknowledgement
source/build/Pages resume parity
```

## Required deterministic fixtures

```txt
fixture:campaign-fresh-run-preset
fixture:campaign-continue-roundtrip
fixture:campaign-missing-slot
fixture:campaign-malformed-save
fixture:campaign-unsupported-version
fixture:campaign-checksum-mismatch
fixture:campaign-source-incompatible
fixture:campaign-missing-participant
fixture:campaign-broken-reference
fixture:campaign-id-counter-collision
fixture:campaign-bootstrap-rollback
fixture:campaign-bootstrap-stale-duplicate
fixture:campaign-visible-restored-frame
```

## Required browser matrix

```txt
source route, built output and GitHub Pages
New with no checkpoint
New with an existing checkpoint
Continue with a valid non-default checkpoint
Continue with missing, malformed and unsupported checkpoints
non-default economy, wave, entities, pads, selection and camera
commit failure and rollback
first visible world/HUD/minimap/CRT generation receipt
```

## Change boundary

```txt
runtime source changed: no
menu behavior changed: no
campaign behavior changed: no
save schema or storage behavior changed: no
checkpoint hydration changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
target branch: main
npm run check executed: no
npm run build executed: no
browser resume smoke executed: no
Pages resume smoke executed: no
resume fixtures available: no
```

## Claim boundary

The audit proves that current Continue availability is unvalidated and campaign boot is always fresh. It does not claim checkpoint compatibility, migration, hydration, rollback, restored-state correctness, visible-generation parity or deployed Continue behavior is implemented.