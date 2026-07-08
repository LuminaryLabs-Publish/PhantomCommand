# PhantomCommand GameHost Source Diagnostics Readback

**Timestamp:** `2026-07-08T14-08-24-04-00`

## Summary

The render surface is currently acceptable as a construct proof. The missing render-adjacent proof is readback: `window.GameHost.getState()` reports current construct state, but it does not yet report which source profile, descriptor profile, fingerprint, or fixture parity rows produced the visible construct.

## Current render route

```txt
game.html
  -> canvas#game
  -> Three.WebGLRenderer
  -> Scene background/fog/lights
  -> ring wedge meshes
  -> seam meshes
  -> center disc
  -> Grim Reaper Totem
  -> Phantom Commander marker
  -> requestAnimationFrame(frame)
  -> renderer.render(scene, camera)
```

## Current GameHost readback

```txt
window.GameHost.getState()
  -> buildId
  -> phase
  -> progress
  -> pieces
  -> rings
  -> ringParts
  -> ringGaps
  -> ringStartTimes
  -> animation
```

## Readback gap

```txt
- No source profile snapshot is visible in GameHost.
- No source fingerprint is visible in GameHost.
- No descriptor parity result is visible in GameHost.
- No expected versus observed ring descriptor report is visible in GameHost.
- No expected versus observed piece descriptor report is visible in GameHost.
- No fixture status is visible in GameHost.
- No source module version is visible in GameHost.
```

## Additive source diagnostics target

```txt
window.GameHost.getState().sourceProfile = {
  buildId: "smooth-ring-handoff-v6",
  sourceModule: "phantom-command-smooth-handoff-profile-kit",
  sourceVersion: "2026-07-08T14-08-24-04-00",
  profileFingerprint,
  profileSnapshot,
  descriptorSummary: {
    ringCount: 10,
    totalPieces: 92,
    ringPartCounts: [5,5,5,5,6,8,10,12,16,20],
    ringGaps: [0,0,0,0,0,0,0,0,0,0],
    totalBuildSeconds: 19.923
  },
  parity: {
    ok: true,
    rows: [...]
  }
}
```

## Render preservation rule

The first source-profile integration must not change visual output.

```txt
Preserve:
- canvas id
- Three.js CDN import
- renderer construction
- camera controls
- ring piece positions
- material palette
- HUD labels
- skip and restart controls
- legacy GameHost fields
```

## Fixture rows that support readback

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

## Implementation notes

The render audit should not force a renderer extraction. The useful readback is source provenance, not render architecture churn. After additive source diagnostics exist, a later pass can decide whether wedge geometry and animation descriptors should be consumed from source-owned piece descriptors.
