# PhantomCommand Render Audit: GameHost SourceProfile Consumer Readback

**Timestamp:** `2026-07-09T04-37-30-04-00`

## Render surface

`PhantomCommand` has a visual/render surface. The active render route is `game.html`, which imports Three.js from CDN and builds the entire scene inline.

## Current render loop

```txt
game.html
  -> canvas#game
  -> new THREE.WebGLRenderer({ canvas, antialias, logarithmicDepthBuffer })
  -> scene background and fog
  -> perspective camera
  -> ambient, sun, and fill lights
  -> stone material palette
  -> ring wedge geometry
  -> seam meshes
  -> center disc
  -> Grim Reaper Totem proxy
  -> Phantom Commander proxy
  -> construct(seq) mutates piece transforms and HUD
  -> frame(ms) updates construct, proxies, zoom, orbit, pan, camera, and renderer
  -> renderer.render(scene, camera)
```

## Render authority problem

```txt
- Render descriptors are not sourced from sourceProfile modules.
- Ring and piece descriptors are computed directly in game.html.
- Wedge geometry creation is bound to live browser/Three runtime.
- Construct animation consumes inline delay and timing values.
- HUD readback consumes inline progress/phase mutation.
- GameHost readback exposes legacy values but not a sourceProfile proof object.
```

## Current GameHost render/readback shape

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
     -> prewarmSeconds
     -> moveSeconds
     -> ringHandoff
     -> partStagger
     -> ringGapBase
     -> ringGapGrowth
     -> totalBuildTime
```

## Required additive sourceProfile readback

```txt
window.GameHost.getState()
  -> existing legacy fields unchanged
  -> sourceProfile
     -> buildId
     -> profileFingerprint
     -> sourceSnapshot
     -> ringDescriptorSummary
     -> pieceDescriptorSummary
     -> timelineSummary
     -> parity
        -> okRows
        -> warningRows
        -> errorRows
        -> blockedRows
     -> fixture
        -> requiredRows
        -> passedRows
        -> failedRows
        -> lastRunMode
     -> centralLedger
        -> expectedTracker
        -> observedTracker
        -> aligned
```

## Render parity rows to prove first

```txt
render_profile_build_id_matches_gamehost_build_id
render_ring_count_matches_source_profile
render_ring_part_counts_match_source_profile
render_piece_count_matches_source_profile
render_ring_gap_policy_matches_source_profile
render_total_build_time_matches_source_profile
render_gamehost_legacy_fields_stay_unchanged
render_source_profile_is_nested_and_additive
render_source_profile_does_not_mutate_visual_construct
```

## Do not extract yet

```txt
- Do not move renderer construction out of game.html in the same cut.
- Do not rewrite wedge geometry in the same cut.
- Do not swap the construct visual.
- Do not alter camera pan/zoom behavior.
- Do not alter HUD copy or layout.
```

## Render verdict

The visual should stay locked. The next render-related work is readback proof: the browser should report that it is consuming the same source-owned profile that the DOM-free fixture validates.
