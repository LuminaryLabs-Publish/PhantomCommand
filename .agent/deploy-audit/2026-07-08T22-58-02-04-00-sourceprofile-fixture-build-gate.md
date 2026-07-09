# PhantomCommand Deploy Audit — SourceProfile Fixture Build Gate

**Timestamp:** `2026-07-08T22-58-02-04-00`

## Current deploy/build surface

```txt
package.json
  -> npm run build
  -> node scripts/build-static.mjs
  -> static files copied into dist
.github/workflows/deploy-pages.yml
  -> expected Pages artifact upload path
```

## Missing build gate

The current build does not yet run a PhantomCommand source-profile fixture because that fixture has not been implemented.

## Required order

```txt
1. Add source-profile modules.
2. Add DOM-free tests/phantom-command-source-profile-fixture.mjs.
3. Run fixture standalone.
4. Run construct-spiral-intro-kit smoke as regression guard.
5. Wire fixture into build only after standalone pass.
6. Keep build-static behavior unchanged except for preflight validation.
7. Keep GitHub Pages publish from main.
```

## Build acceptance rows

```txt
fixture_runs_without_dom_canvas_or_three
fixture_build_gate_runs_before_static_artifact_upload
profile_parity_report_has_no_errors
legacy_gamehost_fields_are_unchanged
central_ledger_points_to_latest_source_profile_gate
```

## Validation status

This pass did not run local build or workflow validation. It only documented the gate and updated repo-local plus central tracking.
