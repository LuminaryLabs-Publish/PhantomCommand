# Deploy Audit: Build Script Fixture Splice Map

**Timestamp:** `2026-07-09T07-10-00-04-00`

## Current build path

```txt
npm run build
  -> node scripts/build-static.mjs
  -> rm dist
  -> mkdir dist
  -> copy index.html
  -> copy game.html
  -> copy docs if present
  -> copy config if present
```

## Current deploy issue

The build script copies static files but does not prove sourceProfile parity before artifact creation. That means a Pages artifact can be produced even if `game.html` and source-owned construct records drift.

## Required future build gate

```txt
npm run build
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node tests/construct-spiral-intro-kit-smoke.mjs
  -> node scripts/build-static.mjs
```

This should happen only after the source-profile fixture exists and passes locally.

## Deployment acceptance rows

```txt
fixture_runs_before_static_copy
fixture_fails_build_on_profile_drift
fixture_fails_build_on_ring_descriptor_drift
fixture_fails_build_on_piece_descriptor_drift
fixture_fails_build_on_total_build_seconds_drift
fixture_fails_build_on_missing_gamehost_sourceprofile_shape
fixture_fails_build_on_legacy_gamehost_shape_change
fixture_fails_build_on_central_ledger_pointer_drift
static_copy_preserves_index_html
static_copy_preserves_game_html
pages_artifact_contains_current_routes
```

## Current validation result

No build or deploy validation was run in this documentation pass. Runtime source was not changed.
