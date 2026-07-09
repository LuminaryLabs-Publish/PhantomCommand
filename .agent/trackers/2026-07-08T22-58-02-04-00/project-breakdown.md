# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-08T22-58-02-04-00`

## Selection

`LuminaryLabs-Publish/PhantomCommand` was selected after comparing the accessible `LuminaryLabs-Publish` repo list against `LuminaryLabs-Dev/LuminaryLabs` central tracking. No checked non-Cavalry repo was fully new, ledger-absent, undocumented, recently added but undocumented, or missing sampled root `.agent` state. `TheCavalryOfRome` remained excluded. `PhantomCommand` was the oldest eligible central alignment at `2026-07-08T20-52-00-04-00`.

## Interaction loop

```txt
open index.html
  -> main menu
  -> Start / Open Scene navigates to game.html
  -> game.html imports Three.js from CDN
  -> inline smooth-ring-handoff-v6 constants are defined
  -> rings are computed with zero gaps
  -> ringParts() yields [5,5,5,5,6,8,10,12,16,20]
  -> 92 wedge pieces are created
  -> construct(seq) animates radial movement and drop per piece
  -> keyboard pans, wheel zooms, Space skips, R restarts
  -> HUD mutates constructed count, phase, build id, and progress
  -> window.GameHost returns legacy construct diagnostics
```

## Domains in use

```txt
static-app-shell
main-menu-routing
static-game-route
vite-static-build
github-pages-deploy
browser-render-host
webgl-canvas-host
three-render-scene
scene-fog-lighting
stone-material-palette
camera-navigation
keyboard-pan-input
wheel-zoom-input
button-input
hud-diagnostics
gamehost-authority
inline-construct-runtime
smooth-ring-handoff-v6-profile
construct-source-authority
construct-profile-normalization
construct-source-fingerprint
construct-source-snapshot
ring-descriptor-generation
piece-descriptor-generation
handoff-timeline-contract
profile-parity-report
source-profile-fixture-row-contract
gamehost-source-diagnostics
gamehost-source-profile-readback
gamehost-legacy-compatibility
fixture-build-integration
construct-event-envelope
construct-event-result
scenario-bootstrap-gate
scenario-bootstrap-blocker
```

## Services the kits offer

```txt
construct-spiral-intro-kit
  -> create generic piece ids
  -> create generic schedule rows
  -> install pieces
  -> reset state
  -> tick progress
  -> emit snapshots
  -> list pending, active, settled, newly active, newly settled pieces
  -> report per-piece progress/status

construct-spiral-intro-kit-smoke
  -> assert kit id/domain path
  -> install generated ring pieces
  -> validate ordered schedule
  -> tick to completion
  -> assert active count cap and active ring window
```

## Current inline services that should become kits

```txt
smooth-ring-handoff-v6 profile constants
ring descriptor math
piece count math
piece descriptor math
ringStartTimes timeline math
wedge geometry generation
construct animation state
HUD projection
GameHost source diagnostics
```

## Kits identified

### Implemented

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

### Next-cut kits

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-profile-parity-report-kit
phantom-command-gamehost-source-diagnostics-kit
phantom-command-source-profile-fixture-kit
phantom-command-gamehost-source-consumer-kit
phantom-command-fixture-build-integration-kit
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-result-kit
phantom-command-scenario-bootstrap-gate-kit
```

## Main finding

The visible construct works and should be preserved. The next high-value pass is not renderer extraction or RTS gameplay; it is source-profile proof. `game.html` still owns the live build constants, ring/piece/timeline math, and GameHost projection inline. Add a source-owned profile plus DOM-free fixture rows first, then splice additive `sourceProfile` diagnostics into `GameHost`.

## Next safe ledge

```txt
PhantomCommand Construct Result Source Readiness Map + SourceProfile Fixture Consumer Build Gate
```

## Required fixture rows

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
scenario_bootstrap_is_blocked_until_construct_result_exists
fixture_runs_without_dom_canvas_or_three
fixture_build_gate_runs_before_static_artifact_upload
```

## Validation status

Docs-only pass. Runtime source was not changed. Local `npm install`, `npm run build`, browser smoke, Pages smoke, and fixture execution were not run.
