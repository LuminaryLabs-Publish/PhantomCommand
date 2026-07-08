# PhantomCommand Fixture Check Integration

**Timestamp:** `2026-07-08T18-29-21-04-00`

## Current deploy surface

The repo deploys a static app through GitHub Pages from `main`.

Current local route:

```txt
index.html -> game.html
```

Current validation gap:

```txt
npm run build copies deployable files
construct-spiral-intro-kit-smoke exists
phantom-command-source-profile-fixture does not exist yet
GitHub Pages validation is not part of this docs-only pass
```

## Target check sequence after implementation

```txt
node tests/phantom-command-source-profile-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run build
static route smoke for index.html
static route smoke for game.html
GameHost getState readback check
```

## Deploy safety rule

The fixture should be added to the validation path only after it exists and passes locally.

Do not break Pages deployment by adding a missing test script to `npm run build` before the fixture file is committed.

## CI / Pages acceptance rows

```txt
build_copies_index_html
build_copies_game_html
build_copies_source_profile_modules
fixture_runs_before_browser_splice
legacy_gamehost_shape_smoke_passes
pages_artifact_still_contains_static_routes
```

## Stop line

This pass did not change workflow files. The next implementation should touch deploy validation only after source-profile modules and fixture rows are in place.