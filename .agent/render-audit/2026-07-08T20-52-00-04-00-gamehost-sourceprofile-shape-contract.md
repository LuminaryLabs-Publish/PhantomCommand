# PhantomCommand GameHost SourceProfile Shape Contract

**Timestamp:** `2026-07-08T20-52-00-04-00`

## Render surface

`PhantomCommand` has a visual/render surface. The live route is a single inline Three.js scene in `game.html`.

## Current render loop

```txt
game.html imports Three.js
  -> create WebGLRenderer on canvas#game
  -> create scene/fog/lights/camera/materials
  -> generate wedge meshes and seams from inline ring math
  -> create center disc, Grim Reaper Totem, and Phantom Commander visual props
  -> requestAnimationFrame(frame)
  -> construct(time - startedAt)
  -> update pan/zoom/camera orbit
  -> renderer.render(scene, camera)
  -> mutate HUD text/bar
  -> GameHost.getState reads inline runtime state
```

## Render-authority issue

The visible render is not the immediate problem. The problem is that renderer, source constants, descriptor generation, animation, HUD mutation, and GameHost readback all live in the same inline file.

That means the repo cannot yet prove:

```txt
source profile
  -> derived descriptors
  -> timeline contract
  -> render/animation consumer
  -> HUD readback
  -> GameHost sourceProfile diagnostics
```

## Required sourceProfile GameHost shape

The next implementation should preserve every legacy field and only add `sourceProfile`:

```txt
window.GameHost.getState() legacy fields:
  buildId
  phase
  progress
  pieces
  rings
  ringParts
  ringGaps
  ringStartTimes
  animation

window.GameHost.getState().sourceProfile additive fields:
  status
  buildId
  fingerprint
  sourceSnapshot
  ringDescriptorParity
  pieceDescriptorParity
  timelineParity
  fixtureRows
  legacyCompatibility
  generatedAtFrame
```

## Consumer readback rows

```txt
legacy_gamehost_fields_are_unchanged
sourceprofile_shape_is_additive
sourceprofile_build_id_matches_build_id
sourceprofile_ring_count_matches_rings
sourceprofile_part_counts_match_ringParts
sourceprofile_gap_policy_matches_ringGaps
sourceprofile_total_build_matches_animation_totalBuildTime
sourceprofile_fixture_rows_are_serializable
sourceprofile_missing_or_error_rows_block_scenario_bootstrap
```

## Render pass guidance

Do not rewrite the inline Three.js rendering during the sourceProfile pass.

The first safe render change is additive only:

```txt
import/create sourceProfile diagnostics
  -> compute once from source-owned profile and descriptors
  -> attach to GameHost.getState().sourceProfile
  -> leave renderer geometry, materials, camera, HUD, skip, and restart untouched
```

## Validation gap

No browser smoke or renderer readback ran in this pass. The needed proof is a DOM-free fixture first, then a browser smoke that checks `window.GameHost.getState().sourceProfile` without visual regression.
