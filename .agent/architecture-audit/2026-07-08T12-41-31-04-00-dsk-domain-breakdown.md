# PhantomCommand DSK / Domain Breakdown — 2026-07-08T12-41-31-04-00

## Goal

Map the current `PhantomCommand` runtime into Nexus-style domains and kits, then define the narrowest safe implementation boundary for moving source authority out of inline `game.html` without changing the public visual route.

## Current route

```txt
index.html
  -> game.html
  -> Three.js CDN
  -> inline smooth-ring-handoff-v6 source constants
  -> inline ring descriptors
  -> inline piece descriptors / wedge geometry
  -> inline construct animation
  -> inline HUD and GameHost diagnostics
```

## Current domains

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
construct-profile-parity
construct-source-fingerprint
construct-source-snapshot
construct-descriptor-authority
ring-count-policy
ring-width-policy
ring-growth-policy
no-gap-radius-policy
ring-part-count-policy
ring-descriptor-generation
piece-descriptor-generation
piece-id-policy
piece-seed-policy
piece-angle-policy
piece-start-pose-policy
piece-final-pose-policy
piece-delay-policy
piece-settle-policy
wedge-geometry-generation
stone-material-detail
construct-animation-timeline
inner-first-timeline-contract
ring-transition-margin-policy
construct-event-envelope
construct-event-result
construct-event-reducer
construct-completion-idempotency
construct-event-journal
construct-snapshot-contract
construct-diagnostics-projection
scenario-bootstrap-command
scenario-bootstrap-preflight
scenario-bootstrap-result
scenario-bootstrap-gate
scenario-bootstrap-journal
scenario-bootstrap-snapshot
scenario-mode-state-machine
rts-boundary-placeholder
fixture-script-runner
legacy-gamehost-compatibility
```

## Domain ownership read

| Domain area | Current owner | Correct next owner | Status |
|---|---|---|---|
| App routing | `index.html`, `game.html` | keep as static route | stable |
| Source profile | inline constants in `game.html` | `phantom-command-smooth-handoff-profile-kit` | missing |
| Ring descriptors | inline loop in `game.html` | `phantom-command-ring-descriptor-kit` | missing |
| Piece descriptors | inline `makePiece()` setup | `phantom-command-piece-descriptor-kit` | missing |
| Timing descriptors | inline `ringStartTimes`, `PART_STAGGER`, `MOVE_SECONDS` | `phantom-command-handoff-timeline-contract-kit` | missing |
| Construct completion result | visual phase string | `phantom-command-construct-event-result-kit` | missing |
| Scenario bootstrap | not implemented | `phantom-command-scenario-bootstrap-result-kit` | missing |
| Fixture proof | no Phantom-specific fixture | `phantom-command-source-profile-fixture-kit` | missing |
| Generic construct scheduling | `construct-spiral-intro-kit` | keep as regression guard | implemented |

## Current kit inventory

### Implemented / source-backed

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

### Implemented kit services

```txt
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
```

### Inline runtime kits to extract

```txt
inline-smooth-ring-handoff-v6-profile
inline-ring-descriptor-runtime
inline-piece-descriptor-runtime
inline-piece-delay-runtime
inline-piece-settle-runtime
inline-wedge-geometry-runtime
inline-construct-animation-runtime
inline-construct-hud-runtime
inline-camera-navigation-runtime
inline-gamehost-construct-runtime
```

### Next-cut kits

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-piece-delay-policy-kit
phantom-command-piece-settle-policy-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-profile-parity-report-kit
phantom-command-gamehost-source-diagnostics-kit
phantom-command-source-profile-fixture-kit
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-result-kit
phantom-command-construct-event-reducer-kit
phantom-command-construct-completion-idempotency-kit
phantom-command-construct-event-journal-kit
phantom-command-construct-snapshot-contract-kit
phantom-command-scenario-bootstrap-command-kit
phantom-command-scenario-bootstrap-preflight-kit
phantom-command-scenario-bootstrap-result-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-journal-kit
phantom-command-scenario-bootstrap-snapshot-kit
```

## Source profile boundary

The next implementation should stop at this boundary first:

```txt
sourceProfile
  -> normalizedProfile
  -> profileFingerprint
  -> profileSnapshot
  -> ringDescriptors
  -> pieceDescriptors
  -> timingDescriptors
  -> profileParityReport
  -> GameHost additive source diagnostics
  -> DOM-free fixture pass
```

Do not start RTS units, resources, enemies, waves, or objectives until that source-profile boundary is fixture-proven.

## Acceptance rows for the first source boundary

```txt
profile_build_id_matches_live_game_html
profile_ring_count_matches_10
profile_gap_policy_matches_zero_gap
ring_part_counts_match_live_array
piece_descriptor_count_matches_92
timeline_total_build_seconds_matches_19_923
handoff_values_match_ring_handoff_0_72_and_part_stagger_0_025
profile_snapshot_is_serializable
profile_fingerprint_is_stable
profile_parity_report_has_no_errors
gamehost_additive_diagnostics_keep_legacy_surface
fixture_runs_without_dom_canvas_or_three
```

## Stop condition

Stop the first implementation as soon as the source profile and descriptor parity fixture passes. Construct event reducers and scenario bootstrap reducers are the next ledge after that, not part of the first profile-boundary cut.