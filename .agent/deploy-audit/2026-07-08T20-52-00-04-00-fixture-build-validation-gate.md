# PhantomCommand Fixture Build Validation Gate

**Timestamp:** `2026-07-08T20-52-00-04-00`

## Current deploy/build surface

```txt
package.json
  -> npm run build
  -> node scripts/build-static.mjs
  -> dist static artifact
  -> GitHub Pages workflow uploads artifact
```

## Current validation gap

The build currently copies the static route. It does not yet prove the source-profile fixture rows before artifact creation.

## Required build-gate sequence

```txt
node tests/phantom-command-source-profile-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
node scripts/build-static.mjs
```

Only wire this into `npm run build` after the new source-profile fixture passes standalone.

## Build-gate acceptance rows

```txt
fixture_runs_without_dom_canvas_or_three
profile_parity_report_has_no_errors
legacy_gamehost_fields_are_unchanged
sourceProfile_shape_is_additive
central_ledger_points_to_latest_source_profile_gate
static_artifact_copy_still_outputs_index_and_game_routes
```

## Non-goals

```txt
- Do not change Pages workflow before local fixture exists.
- Do not add Playwright as part of this gate.
- Do not replace the current static build script.
- Do not add branch or PR flow.
```

## Main finding

The deploy path is simple and should remain simple. The next sourceProfile pass only needs to add a fixture-before-copy proof layer without changing the public route.
