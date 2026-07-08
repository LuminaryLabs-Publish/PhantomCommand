# PhantomCommand GameHost Source Consumer Readback

**Timestamp:** `2026-07-08T15-58-59-04-00`

## Goal

Document how the render surface should consume source-profile records without changing the current visible construct.

## Current render loop

```txt
game.html
  -> import Three.js from CDN
  -> create WebGLRenderer on canvas#game
  -> create scene background and fog
  -> create perspective camera
  -> create ambient, sun, and fill lights
  -> create stone materials
  -> create wedge geometry and seam meshes
  -> create center disc, totem, and commander figure
  -> animate pieces through construct(seq)
  -> update HUD count, phase, status, and progress
  -> render scene each requestAnimationFrame
  -> expose window.GameHost.getState()
```

## Current GameHost readback

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

## Render risk

The current render surface is visually stable but source-opaque. `game.html` both creates the source constants and renders the result, so there is no independent source snapshot proving the rendered 92-piece construct came from a stable profile.

## Additive consumer target

`window.GameHost.getState()` should keep every current field and add only a nested source diagnostic block after fixture proof exists.

```txt
sourceProfile: {
  buildId,
  profileVersion,
  fingerprint,
  expectedRingCount,
  observedRingCount,
  expectedRingParts,
  observedRingParts,
  expectedTotalPieces,
  observedTotalPieces,
  expectedTotalBuildSeconds,
  observedTotalBuildSeconds,
  parityStatus,
  parityErrors,
  snapshotVersion
}
```

## Consumer splice rule

```txt
Do not replace visual math first.
First add pure source modules.
Then prove parity with DOM-free fixtures.
Then import proven descriptor/snapshot helpers into game.html.
Then expose additive GameHost sourceProfile diagnostics.
Only later remove duplicated inline constants.
```

## Render parity rows

```txt
render_build_id_matches_source_profile
render_ring_count_matches_source_profile
render_gap_policy_matches_source_profile
render_ring_parts_match_source_profile
render_piece_count_matches_source_profile
render_total_build_time_matches_source_profile
render_gamehost_legacy_fields_unchanged
render_gamehost_source_profile_added_additively
render_no_dom_fixture_dependency
```

## Main finding

The render pass should be a consumer splice, not a visual rewrite. The next source change should make `game.html` read a stable source-profile snapshot while preserving the current player-facing construct, HUD, camera, and GameHost compatibility.
