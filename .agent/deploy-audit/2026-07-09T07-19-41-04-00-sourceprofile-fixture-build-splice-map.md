# PhantomCommand Deploy Audit: SourceProfile Fixture Build Splice Map

**Timestamp:** `2026-07-09T07-19-41-04-00`

## Current deploy/build path

```txt
package.json
  -> npm run build
  -> node scripts/build-static.mjs
  -> remove dist
  -> recreate dist
  -> copy index.html
  -> copy game.html
  -> copy docs if present
  -> copy config if present
```

GitHub Pages deployment is documented as running from `main` through `.github/workflows/deploy-pages.yml`.

## Current gap

No fixture runs before static artifact copy.

That means a Pages artifact can be built even if `game.html` constants drift from future source-profile modules.

## Required build-gate splice

```txt
npm run build
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node tests/construct-spiral-intro-kit-smoke.mjs
  -> node scripts/build-static.mjs
  -> dist artifact copy
```

Only add this splice after the source-profile fixture exists and passes standalone.

## Fixture rows that should block build

```txt
profile_build_id_matches_live_game_html
ring_part_counts_match_live_array
piece_descriptor_count_matches_92
timeline_total_build_seconds_matches_19_923
source_fingerprint_is_stable
profile_parity_report_has_no_errors
gamehost_source_diagnostics_shape_is_additive
legacy_gamehost_fields_are_unchanged
central_ledger_points_to_latest_source_profile_gate
fixture_runs_without_dom_canvas_or_three
fixture_build_gate_runs_before_static_artifact_upload
```

## Deploy conclusion

Keep deployment on `main`. Do not create branches. Do not change Pages workflow until fixture source exists and local build proof passes.
