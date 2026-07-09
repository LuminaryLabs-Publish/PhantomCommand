# PhantomCommand Render Audit: GameHost SourceProfile Readback Contract

**Timestamp:** `2026-07-09T01-20-59-04-00`

## Render surface

`game.html` owns the full current visual surface:

```txt
canvas#game
  -> THREE.WebGLRenderer
  -> scene background and fog
  -> perspective camera
  -> ambient / sun / fill lights
  -> stone material palette
  -> wedge geometry pieces
  -> seam meshes
  -> center disc
  -> Grim Reaper Totem
  -> Phantom Commander visual
  -> HUD panel and progress bar
```

## Render interaction loop

```txt
requestAnimationFrame(frame)
  -> construct(time - startedAt)
  -> mutate piece transforms
  -> mutate HUD count / phase / progress
  -> update pan velocity
  -> update camera orbit / zoom
  -> renderer.render(scene, camera)
  -> expose current construct diagnostics through GameHost
```

## Source/render mismatch

```txt
- Render code consumes inline constants.
- Ring descriptors are not source-owned.
- Piece descriptors are not source-owned.
- Timeline descriptors are not source-owned.
- The renderer has no proof that its visible build matches an imported source profile.
- GameHost exposes legacy construct diagnostics but not sourceProfile parity diagnostics.
```

## SourceProfile readback target

```txt
window.GameHost.getState()
  -> legacy fields stay unchanged
  -> sourceProfile added additively
    -> buildId
    -> profileFingerprint
    -> sourceSnapshot
    -> ringDescriptorCount
    -> pieceDescriptorCount
    -> timelineTotalBuildSeconds
    -> parityRows
    -> fixtureStatus
    -> compatibilityStatus
```

## Acceptance rows

```txt
sourceprofile_readback_is_additive
legacy_getstate_fields_are_unchanged
sourceprofile_build_id_matches_live_state
sourceprofile_ring_count_matches_live_state
sourceprofile_piece_count_matches_live_state
sourceprofile_ring_parts_match_live_state
sourceprofile_timeline_matches_live_state
renderer_still_uses_existing_canvas
hud_output_remains_construct_count_phase_progress
```

## Rendering rule

Do not extract or restyle the renderer in the same pass as sourceProfile proof.

First prove the route consumes a source-owned profile without changing what the player sees.
