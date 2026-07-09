# PhantomCommand Deploy Audit: Fixture Build Script Wire Map

**Timestamp:** `2026-07-09T01-20-59-04-00`

## Current deploy surface

```txt
package.json
  -> npm run build
  -> node scripts/build-static.mjs

scripts/build-static.mjs
  -> remove dist
  -> recreate dist
  -> copy index.html
  -> copy game.html
  -> copy docs if present
  -> copy config if present
```

## Current gap

`npm run build` does not yet execute a sourceProfile fixture.

The static artifact can be uploaded without proving that the live construct profile, ring descriptors, piece descriptors, timeline, fingerprint, source snapshot, parity report, GameHost source diagnostics, and central ledger pointer are valid.

## Build gate target

```txt
npm run build
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node tests/construct-spiral-intro-kit-smoke.mjs
  -> node scripts/build-static.mjs
```

Wire this only after the new fixture passes as a standalone Node script.

## Acceptance rows

```txt
fixture_runs_without_dom_canvas_or_three
sourceprofile_fixture_passes_before_static_copy
construct_spiral_intro_smoke_still_passes
build_copies_index_and_game_after_fixtures
pages_artifact_contains_current_static_routes
```

## Deploy rule

Do not change the Pages workflow or runtime route behavior in the same pass unless the sourceProfile fixture and current static build behavior are already passing.
