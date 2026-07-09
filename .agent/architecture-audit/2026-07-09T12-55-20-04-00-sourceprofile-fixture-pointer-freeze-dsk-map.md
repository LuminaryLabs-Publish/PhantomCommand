# Architecture Audit: SourceProfile Fixture Pointer Freeze DSK Map

**Timestamp:** `2026-07-09T12-55-20-04-00`

## Current architecture

```txt
index.html
  -> menu route
  -> game.html
  -> inline Three.js runtime
  -> inline smooth-ring-handoff-v6 constants
  -> inline ring descriptors
  -> inline piece descriptors
  -> inline construct timeline
  -> inline HUD and input mutation
  -> window.GameHost legacy diagnostics
```

## Current DSK/domain split

```txt
active static shell
  -> static-app-shell
  -> main-menu-routing
  -> static-game-route
  -> vite-static-build
  -> github-pages-deploy

active render/runtime host
  -> browser-render-host
  -> webgl-canvas-host
  -> three-render-scene
  -> scene-fog-lighting
  -> stone-material-palette
  -> camera-navigation
  -> hud-diagnostics
  -> inline-construct-runtime

implemented generic construct kit
  -> construct-spiral-intro-kit
  -> n:sequence:construct:spiral-intro
  -> installPieces/reset/update/snapshot/schedule/piece queries

missing live source-profile authority
  -> smooth-ring-handoff-v6-profile
  -> construct-profile-normalization
  -> construct-source-fingerprint
  -> construct-source-snapshot
  -> ring-descriptor-generation
  -> piece-descriptor-generation
  -> handoff-timeline-contract
  -> profile-parity-report
  -> source-profile-fixture-row-contract

consumer/readback layer
  -> gamehost-source-diagnostics
  -> source-profile-consumer-splice
  -> legacy-gamehost-compatibility
  -> central-ledger-readback
  -> repo-local-agent-pointer-parity
```

## Services that kits offer now

```txt
construct-spiral-intro-kit:
  createConstructSpiralIntroPieceId
  createConstructSpiralIntroSchedule
  createConstructSpiralIntroKit
  installPieces
  reset
  update
  snapshot
  schedule
  activePieces
  settledPieces
  pendingPieces
  newlyActivePieces
  newlySettledPieces
  getPieceProgress
  getPieceStatus

construct-spiral-intro-kit-smoke:
  validates generic kit id/domain path
  validates schedule ordering
  validates active cap and active-ring window
  validates eventual completion
```

## Services still inline in `game.html`

```txt
source profile declaration
ring descriptor derivation
piece descriptor derivation
ring start timing
total build timing
wedge geometry creation
seam mesh creation
piece radial/drop interpolation
HUD projection
camera orbit/pan/zoom
GameHost projection
```

## Required next kits

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
phantom-command-central-ledger-readback-kit
phantom-command-fixture-build-integration-kit
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
sourceprofile_consumer_readback_matches_fixture
central_ledger_points_to_latest_source_profile_gate
fixture_runs_without_dom_canvas_or_three
fixture_build_gate_runs_before_static_artifact_upload
```

## Implementation boundary

Do not start RTS gameplay, unit commands, scenario bootstrap, construct completion events, or visual rewrite work until live source-profile parity is source-owned and fixture-proven.
