# PhantomCommand Deploy Audit: Fixture Build Before Static Artifact

**Timestamp:** `2026-07-09T04-38-39-04-00`

## Current deploy surface

```txt
package.json
  -> npm run build
  -> node scripts/build-static.mjs
  -> dist static artifact
  -> GitHub Pages workflow uploads artifact from main
```

## Current gap

`npm run build` does not yet run a sourceProfile fixture. The route can build even though the live source constants are still only browser-inline.

## Required future gate

```txt
npm run check
  -> node tests/phantom-command-source-profile-fixture.mjs
  -> node tests/construct-spiral-intro-kit-smoke.mjs

npm run build
  -> npm run check
  -> node scripts/build-static.mjs
```

Only wire this after the sourceProfile fixture exists and passes locally.

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

## Validation status

```txt
source-profile fixture exists: no
npm check exists: no
npm run build run in this pass: no
Pages deploy checked in this pass: no
runtime source files changed: no
```

## Verdict

The deploy gate should enforce sourceProfile parity later. This pass documents the gate and keeps runtime/workflow files unchanged.
