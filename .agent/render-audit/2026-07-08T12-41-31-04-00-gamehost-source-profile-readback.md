# PhantomCommand Render / GameHost Source Profile Readback — 2026-07-08T12-41-31-04-00

## Summary

The current render path is useful and should be preserved. The issue is not the visual result; the issue is that the visual result cannot yet be proven from a source-owned profile outside `game.html`.

## Current render loop

```txt
game.html
  -> import Three.js CDN
  -> create WebGLRenderer
  -> create Scene, Fog, PerspectiveCamera, AmbientLight, DirectionalLight, materials
  -> create ring wedge meshes inline
  -> animate construct pieces inside construct(seq)
  -> update HUD DOM nodes directly
  -> update camera pan/orbit/zoom directly
  -> renderer.render(scene, camera)
  -> window.GameHost.getState() exposes construct-only runtime values
```

## Render source readback

Current source-backed values visible through `game.html`:

```txt
BUILD_ID = smooth-ring-handoff-v6
RING_COUNT = 10
RING_GAP_BASE = 0
RING_GAP_GROWTH = 0
MOVE_SECONDS = 2.6
DROP_START_SECONDS = 0.08
RING_HANDOFF = 0.72
PART_STAGGER = 0.025
PREWARM_SECONDS = 0.45
START_RADIUS_MULTIPLIER = 1.38
START_HEIGHT_BASE = 24
ringParts = [5,5,5,5,6,8,10,12,16,20]
totalPieces = 92
totalBuildSeconds = 19.923
```

## Current GameHost surface

```txt
window.GameHost.skipConstruct()
window.GameHost.restartConstruct()
window.GameHost.getState()
```

Current `getState()` exposes useful live fields:

```txt
buildId
phase
progress
pieces
rings
ringParts
ringGaps
ringStartTimes
animation.prewarmSeconds
animation.moveSeconds
animation.ringHandoff
animation.partStagger
animation.ringGapBase
animation.ringGapGrowth
animation.totalBuildTime
```

## Missing render proof

```txt
No sourceProfile object is exposed.
No sourceFingerprint is exposed.
No sourceSnapshot is exposed.
No ringDescriptor parity report is exposed.
No pieceDescriptor parity report is exposed.
No timingDescriptor parity report is exposed.
No ConstructSnapshot is exposed.
No ScenarioBootstrapSnapshot is exposed.
No fixtureSummary is exposed.
No proof ties the visible 92-piece render to a DOM-free descriptor source.
```

## Additive GameHost target

Keep all current GameHost methods and add a nested diagnostics payload only:

```txt
window.GameHost.getState() -> {
  buildId,
  phase,
  progress,
  pieces,
  rings,
  ringParts,
  ringGaps,
  ringStartTimes,
  animation,
  sourceProfile: {
    buildId,
    profileFingerprint,
    sourceSnapshot,
    ringDescriptorParity,
    pieceDescriptorParity,
    timingDescriptorParity,
    fixtureStatus
  }
}
```

## Render compatibility rule

Do not change:

```txt
index.html -> game.html routing
visible smooth-ring-handoff-v6 construct
camera pan / zoom controls
Space skip behavior
R restart behavior
current HUD copy
window.GameHost.skipConstruct
window.GameHost.restartConstruct
window.GameHost.getState legacy fields
```

## Next render validation rows

```txt
gamehost_legacy_shape_still_available
gamehost_source_profile_nested_payload_available
render_build_id_matches_profile_build_id
render_ring_count_matches_profile_ring_count
render_ring_parts_match_profile_descriptor_counts
render_gap_policy_matches_profile_zero_gap
render_total_pieces_matches_profile_piece_descriptors
render_timing_matches_profile_timing_descriptors
fixture_can_compute_profile_without_game_html_dom
```