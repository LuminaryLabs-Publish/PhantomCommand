# Render Audit: GameHost SourceProfile Readback Freeze

**Timestamp:** `2026-07-09T12-50-00-04-00`

## Current render surface

`game.html` owns the full render surface inline:

```txt
canvas id=game
Three.WebGLRenderer
Three.Scene
Fog
PerspectiveCamera
AmbientLight
DirectionalLight
stone material palette
wedge extrude geometry
ring piece groups
center disc
Grim Reaper Totem proxy
Phantom Commander proxy
HUD DOM mutation
camera orbit / pan / zoom
resize handling
requestAnimationFrame loop
```

## Render consumption issue

The render path consumes inline runtime constants directly. There is no source-owned profile descriptor proving that the visible build was generated from the same profile a fixture can verify.

Current high-value render values:

```txt
BUILD_ID: smooth-ring-handoff-v6
RING_COUNT: 10
RING_GAP_BASE: 0
RING_GAP_GROWTH: 0
ringParts: [5,5,5,5,6,8,10,12,16,20]
total pieces: 92
total build seconds: 19.923
```

## Required readback before render extraction

```txt
window.GameHost.getState().sourceProfile
window.GameHost.getState().sourceProfile.buildId
window.GameHost.getState().sourceProfile.fingerprint
window.GameHost.getState().sourceProfile.ringPartCounts
window.GameHost.getState().sourceProfile.totalPieces
window.GameHost.getState().sourceProfile.totalBuildSeconds
window.GameHost.getState().sourceProfile.parity.rows
window.GameHost.getState().sourceProfile.fixtureStatus
```

## Freeze rule

Do not modify the visual composition, materials, camera, or animation feel in the next source-profile pass.

The next render-facing change should be additive sourceProfile diagnostics only.

## Next render fixture rows

```txt
render_source_profile_build_id_matches_live_route
render_ring_part_counts_match_source_profile
render_total_piece_count_matches_source_profile
render_total_build_seconds_matches_source_profile
legacy_gamehost_render_fields_are_unchanged
sourceprofile_consumer_readback_matches_fixture
```

## Deferred render work

```txt
extract wedge geometry helpers
extract material palette helpers
extract construct animation renderer
extract HUD renderer
extract camera navigation
replace inline GameHost render state with source-owned diagnostics
```

These remain blocked until source-profile fixture parity passes.
