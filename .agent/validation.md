# PhantomCommand Validation

**Timestamp:** `2026-07-09T04-38-39-04-00`

## Validation performed in this pass

```txt
- Listed the accessible LuminaryLabs-Publish repo set available through the GitHub connector.
- Compared the Publish repo set against central LuminaryLabs-Dev/LuminaryLabs repo-ledger entries.
- Confirmed PhantomCommand is tracked centrally and already has root .agent state.
- Observed central PhantomCommand ledger lagging at 2026-07-09T01-28-10-04-00.
- Observed repo-local PhantomCommand root .agent had already advanced to 2026-07-09T04-24-06-04-00.
- Excluded LuminaryLabs-Publish/TheCavalryOfRome.
- Selected PhantomCommand for a SourceProfile Fixture Build Gate + Legacy GameHost Consumer Readback pass.
- Read .agent/START_HERE.md.
- Read .agent/current-audit.md.
- Read .agent/next-steps.md.
- Read .agent/known-gaps.md.
- Read .agent/validation.md.
- Read .agent/kit-registry.json.
- Read package.json.
- Read game.html.
- Read src/kits/construct-spiral-intro-kit/index.js.
- Read tests/construct-spiral-intro-kit-smoke.mjs.
- Read scripts/build-static.mjs.
- Read central repo-ledger entries for Publish repo comparison.
- Updated required repo-local .agent audit files.
- Added architecture-audit/2026-07-09T04-38-39-04-00-sourceprofile-fixture-build-gate-dsk-map.md.
- Added render-audit/2026-07-09T04-38-39-04-00-gamehost-sourceprofile-consumer-readback.md.
- Added gameplay-audit/2026-07-09T04-38-39-04-00-construct-result-blocker-loop.md.
- Added source-profile-audit/2026-07-09T04-38-39-04-00-sourceprofile-fixture-build-gate-contract.md.
- Added scenario-bootstrap-audit/2026-07-09T04-38-39-04-00-bootstrap-remains-blocked.md.
- Added deploy-audit/2026-07-09T04-38-39-04-00-fixture-build-before-static-artifact.md.
- Added a new timestamped tracker entry.
- Added a new timestamped turn-ledger entry.
- Updated central repo ledger with latest follow-up state.
- Added central internal change-log entry.
```

## Runtime validation not performed

```txt
- npm install was not run.
- npm run build was not run.
- npm start was not run.
- node tests/construct-spiral-intro-kit-smoke.mjs was not run.
- node tests/phantom-command-source-profile-fixture.mjs was not run because this pass did not implement it.
- Browser smoke was not run.
- GitHub Pages deploy was not checked after this docs-only pass.
- No Playwright or DOM automation was run.
- No implementation source files were changed.
```

## Current evidence from source inspection

```txt
package/source readback declares:
- build copies static files into dist through node scripts/build-static.mjs.
- vite dev/preview run on port 4173.

index/game route readback declares:
- main menu routes to game.html.
- game.html owns the live smooth-ring-handoff-v6 construct inline.

game.html declares:
- BUILD_ID smooth-ring-handoff-v6
- RING_COUNT 10
- RING_GAP_BASE 0
- RING_GAP_GROWTH 0
- MOVE_SECONDS 2.6
- RING_HANDOFF 0.72
- PART_STAGGER 0.025
- inline ringParts() policy
- inline makePiece() wedge construction
- inline construct(seq) progress and phase mutation
- window.GameHost.skipConstruct
- window.GameHost.restartConstruct
- window.GameHost.getState

construct-spiral-intro-kit declares:
- CONSTRUCT_SPIRAL_INTRO_KIT_ID construct-spiral-intro-kit
- CONSTRUCT_SPIRAL_INTRO_DOMAIN_PATH n:sequence:construct:spiral-intro
- DEFAULT_CONSTRUCT_SPIRAL_INTRO_CONFIG for generic active/spiral/window behavior
- installPieces/reset/update/snapshot service surface
- pending/active/settled/newlyActive/newlySettled piece query surface

build-static declares:
- dist is removed and recreated.
- index.html, game.html, docs, and config are copied if present.
- no fixture script is run before copy yet.
```

## Next validation needed

```txt
npm install
node tests/phantom-command-source-profile-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run build
browser smoke for index.html -> game.html -> GameHost surface
post-deploy Pages route check
```

## New fixture target

```txt
profile_build_id_matches_live_game_html
profile_ring_count_matches_10
profile_gap_policy_matches_zero_gap
ring_part_counts_match_live_array
piece_descriptor_count_matches_92
timeline_total_build_seconds_matches_19_923
handoff_values_match_ring_handoff_0_72_and_part_stagger_0_025
ring_start_times_match_live_formula
source_snapshot_is_serializable
source_fingerprint_is_stable
profile_parity_report_has_no_errors
gamehost_source_diagnostics_shape_is_additive
legacy_gamehost_fields_are_unchanged
construct_result_is_blocked_until_source_profile_parity_passes
central_ledger_points_to_latest_source_profile_gate
scenario_bootstrap_is_blocked_until_construct_result_exists
fixture_runs_without_dom_canvas_or_three
fixture_build_gate_runs_before_static_artifact_upload
```

## Current proof status

```txt
repo-list comparison: performed
central ledger comparison: performed
source readback: performed
root .agent updated: performed
tracker created: performed
turn ledger created: performed
central change-log created: performed
runtime implementation changed: no
build proof: missing
browser proof: missing
fixture replay proof: missing
branch created: no
pushed to main: yes
```
