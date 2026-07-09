# Deploy Audit: SourceProfile Fixture Build Gate

**Timestamp:** `2026-07-09T10-20-44-04-00`

## Current build surface

```txt
package.json
  -> npm run build
  -> node scripts/build-static.mjs
```

The build path copies static artifacts but does not yet run a source-profile fixture gate.

## Required gate before deploy confidence

```txt
node tests/phantom-command-source-profile-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run build
```

After the source-profile fixture exists and passes standalone, `npm run build` should run it before static artifact copy.

## Build-gate fixture rows

```txt
fixture_runs_without_dom_canvas_or_three
fixture_build_gate_runs_before_static_artifact_upload
central_ledger_points_to_latest_source_profile_gate
legacy_gamehost_fields_are_unchanged
sourceprofile_consumer_readback_matches_fixture
```

## Current validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm build: not run
browser smoke: not run
```
