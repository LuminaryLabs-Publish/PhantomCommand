# Render Audit: GameHost SourceProfile Readback Fixture

**Timestamp:** `2026-07-09T10-20-44-04-00`

## Current render surface

The visible route is a full-screen Three.js construct scene in `game.html`.

```txt
canvas#game
  -> WebGLRenderer
  -> scene background/fog
  -> ambient, sun, and fill lights
  -> stone materials
  -> wedge geometries and seam meshes
  -> center disc, totem proxy, Phantom Commander proxy
  -> camera orbit / zoom / pan
  -> HUD progress bar, constructed count, phase, and build id
```

## Render authority issue

Render-visible values are currently not source-owned.

```txt
BUILD_ID
RING_COUNT
ring width/gap growth
ringParts() result
piece delays
total build time
progress
phase
GameHost getState shape
```

These values are derived in the same inline browser runtime that renders the scene.

## Do not change visually yet

The current visual is stable enough for the next pass.

The next implementation should not retune materials, camera, geometry, ring count, timing, or construct animation until source-profile parity exists.

## Required render readback fixture rows

```txt
render_build_id_matches_source_profile
render_ring_count_matches_source_profile
render_ring_part_counts_match_source_profile
render_piece_count_matches_source_profile
render_timeline_total_matches_source_profile
render_gamehost_legacy_fields_preserved
render_gamehost_sourceProfile_is_additive
render_sourceprofile_consumer_readback_matches_fixture
```

## Next safe render ledge

```txt
Add sourceProfile readback to GameHost after DOM-free profile fixture proof, without changing current renderer output.
```
