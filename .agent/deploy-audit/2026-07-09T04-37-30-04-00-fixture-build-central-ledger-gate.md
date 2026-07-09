# PhantomCommand Deploy Audit: Fixture Build Central Ledger Gate

**Timestamp:** `2026-07-09T04-37-30-04-00`

## Current deploy/build surface

```txt
package.json
  -> npm run build
  -> node scripts/build-static.mjs
  -> dist static artifact
  -> GitHub Pages workflow uploads artifact from main
```

## Current gap

The static build copies files but does not yet run a `phantom-command-source-profile-fixture` gate before artifact creation. The Pages path can deploy a route whose visual source constants are still only browser-inline.

## Required build gate

```txt
npm run check
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node tests/construct-spiral-intro-kit-smoke.mjs

npm run build
  -> npm run check
  -> node scripts/build-static.mjs
```

This should only be wired after `tests/phantom-command-source-profile-fixture.mjs` exists and passes locally.

## Deploy fixture rows

```txt
fixture_runs_without_dom_canvas_or_three
fixture_build_gate_runs_before_static_artifact_upload
build_preserves_index_route
build_preserves_game_route
build_preserves_legacy_gamehost_surface
build_preserves_smooth_ring_handoff_v6_visual_route
central_ledger_points_to_latest_source_profile_gate
```

## Central ledger gate

```txt
repo-ledger/LuminaryLabs-Publish/PhantomCommand.md
  -> must point at .agent/trackers/2026-07-09T04-37-30-04-00/project-breakdown.md
  -> must point at source-profile audit 2026-07-09T04-37-30-04-00
  -> must point at deploy audit 2026-07-09T04-37-30-04-00
  -> must name the latest internal change log
```

## Do not wire yet

```txt
- Do not fail npm run build on a fixture that does not exist yet.
- Do not edit the Pages workflow during a docs-only pass.
- Do not create branches.
- Do not push anywhere except main.
```

## Validation status

```txt
source-profile fixture exists: no
npm check exists: no
npm run build run in this pass: no
Pages deploy checked in this pass: no
runtime source files changed: no
```

## Deploy verdict

The deploy/build gate should become the enforcement layer for sourceProfile parity, but only after the source modules and fixture script are implemented. This pass documents the exact gate without modifying runtime or workflow files.
