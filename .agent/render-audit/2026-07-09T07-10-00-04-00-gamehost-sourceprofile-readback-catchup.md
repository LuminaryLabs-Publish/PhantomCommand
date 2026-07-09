# Render Audit: GameHost SourceProfile Readback Catch-up

**Timestamp:** `2026-07-09T07-10-00-04-00`

## Visual/render surface

`PhantomCommand` has a visual browser route in `game.html` using Three.js from CDN.

```txt
canvas#game
  -> WebGLRenderer
  -> scene background + fog
  -> ambient/directional/fill lights
  -> PerspectiveCamera
  -> stone material palette
  -> wedge geometries
  -> seam meshes
  -> center disc
  -> Grim Reaper Totem proxy
  -> Phantom Commander proxy
  -> HUD bar/count/phase/status
```

## Current render loop

```txt
requestAnimationFrame(frame)
  -> compute dt
  -> construct(time - startedAt)
  -> animate tower and commander proxy
  -> update zoom/orbit/pan
  -> camera.lookAt(...)
  -> renderer.render(scene, camera)
  -> request next frame
```

## Render source problem

The renderer is not the next blocker. The renderer already shows the intended construct, but the render inputs are hidden in `game.html`:

```txt
BUILD_ID
RING_COUNT
ring widths/gaps
ringParts(inner, outer)
ringStartTimes
piece delays
piece start/final poses
construct(seq) progress
gamehost fields
```

Because those values are inline, a later renderer extraction would not be fixture-readable.

## Required readback before render extraction

```txt
GameHost.getState().sourceProfile.profileBuildId
GameHost.getState().sourceProfile.ringCount
GameHost.getState().sourceProfile.ringPartCounts
GameHost.getState().sourceProfile.totalPieces
GameHost.getState().sourceProfile.zeroGapPolicy
GameHost.getState().sourceProfile.timeline.totalBuildSeconds
GameHost.getState().sourceProfile.timeline.ringStartTimes
GameHost.getState().sourceProfile.fingerprint
GameHost.getState().sourceProfile.snapshotVersion
GameHost.getState().sourceProfile.parity.ok
GameHost.getState().sourceProfile.fixture.rows
```

## Render acceptance rows

```txt
sourceprofile_readback_is_additive
legacy_gamehost_buildId_still_exists
legacy_gamehost_phase_still_exists
legacy_gamehost_progress_still_exists
legacy_gamehost_pieces_still_exists
legacy_gamehost_rings_still_exists
legacy_gamehost_ringParts_still_exists
legacy_gamehost_ringGaps_still_exists
legacy_gamehost_ringStartTimes_still_exists
legacy_gamehost_animation_still_exists
sourceprofile_ring_part_counts_match_legacy_ringParts
sourceprofile_total_pieces_matches_legacy_pieces
sourceprofile_total_build_seconds_matches_legacy_animation_totalBuildTime
```

## Render decision

Do not change geometry, materials, camera, HUD layout, or animation in the next source pass. Only add readback diagnostics after DOM-free fixture proof.
