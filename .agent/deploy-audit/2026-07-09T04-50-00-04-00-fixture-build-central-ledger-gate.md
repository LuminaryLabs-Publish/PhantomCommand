# PhantomCommand Deploy Audit: Fixture Build Central Ledger Gate

**Timestamp:** `2026-07-09T04-50-00-04-00`

## Current deploy/build surface

`package.json` currently maps build to:

```txt
npm run build -> node scripts/build-static.mjs
```

`scripts/build-static.mjs` removes and recreates `dist/`, then copies static artifacts if present:

```txt
index.html
game.html
docs
config
```

No source-profile fixture currently runs before static artifact copy.

## Deploy gap

```txt
- Build does not prove the live smooth-ring-handoff-v6 profile before static output.
- Build does not prove ring descriptor parity before static output.
- Build does not prove piece descriptor parity before static output.
- Build does not prove timeline parity before static output.
- Build does not prove GameHost sourceProfile readback before static output.
- Build does not prove central ledger latest-tracker parity before static output.
- GitHub Pages deploy can upload a static route whose construct source is still inline-only.
```

## Target build gate

```txt
npm run build
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node tests/construct-spiral-intro-kit-smoke.mjs
  -> node scripts/build-static.mjs
  -> dist contains index.html and game.html
```

The fixture must be DOM-free and must not require browser, canvas, Three.js, `requestAnimationFrame`, or `performance.now`.

## Required fixture/build rows

```txt
fixture_runs_without_dom_canvas_or_three
profile_build_id_matches_live_game_html
ring_part_counts_match_live_array
piece_descriptor_count_matches_92
timeline_total_build_seconds_matches_19_923
gamehost_source_diagnostics_shape_is_additive
sourceprofile_consumer_readback_matches_fixture
legacy_gamehost_fields_are_unchanged
central_ledger_points_to_latest_source_profile_gate
fixture_build_gate_runs_before_static_artifact_upload
```

## Central ledger gate

The fixture/build gate should check that central tracking points at the current source-profile gate:

```txt
central ledger path:
  LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/PhantomCommand.md

expected latest tracker:
  LuminaryLabs-Publish/PhantomCommand:.agent/trackers/2026-07-09T04-50-00-04-00/project-breakdown.md

expected internal change log:
  LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-09T04-50-00-04-00-phantom-command-sourceprofile-central-gate.md
```

## Do not change yet

```txt
- Do not rewrite the Pages workflow before fixture source exists.
- Do not upload a new artifact based only on docs.
- Do not wire scenario bootstrap into build validation yet.
- Do not create a branch or PR.
```

## Validation status this pass

```txt
runtime source changed: no
build script changed: no
fixture implemented: no
fixture run: no
npm run build: no
browser smoke: no
branch created: no
pull request created: no
pushed to main: yes
```

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Freeze + Fixture Build Central Ledger Gate
```
