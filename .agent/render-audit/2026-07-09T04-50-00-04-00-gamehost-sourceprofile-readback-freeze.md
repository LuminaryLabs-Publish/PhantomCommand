# PhantomCommand Render Audit: GameHost SourceProfile Readback Freeze

**Timestamp:** `2026-07-09T04-50-00-04-00`

## Current render surface

`game.html` is both the renderer and the source authority for the visible construct.

It creates the WebGL renderer, scene, fog, lights, camera, materials, ring/piece meshes, center disc, totem proxy, commander proxy, HUD, input handlers, animation loop, and `GameHost` state inline.

## Render interaction loop

```txt
game.html loads
  -> import Three.js CDN module
  -> create renderer/canvas
  -> create scene/fog/lights/camera/materials
  -> define smooth-ring-handoff-v6 constants inline
  -> create ring descriptors inline
  -> create wedge meshes inline
  -> create construct parts inline
  -> requestAnimationFrame(frame)
  -> construct(time - startedAt)
  -> update mesh positions and rotations
  -> update HUD progress/count/phase/status
  -> update pan/zoom/camera orbit
  -> render scene
  -> expose current construct diagnostics through window.GameHost.getState()
```

## Current live values to preserve

```txt
buildId: smooth-ring-handoff-v6
ringCount: 10
ringGapBase: 0
ringGapGrowth: 0
moveSeconds: 2.6
ringHandoff: 0.72
partStagger: 0.025
prewarmSeconds: 0.45
startRadiusMultiplier: 1.38
startHeightBase: 24
ringPartCounts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
totalBuildSeconds: 19.923
```

## Render gaps

```txt
- The renderer cannot yet prove it consumed a source-owned smooth-ring-handoff-v6 profile.
- The renderer cannot yet prove ring descriptors came from source-owned modules.
- The renderer cannot yet prove piece descriptors came from source-owned modules.
- The renderer cannot yet prove timeline descriptors came from source-owned modules.
- GameHost does not expose sourceProfile diagnostics.
- GameHost does not expose source fingerprint or source snapshot.
- GameHost does not expose parity report rows.
- There is no fixture proving sourceProfile readback matches live GameHost fields.
- There is no build gate proving fixture success before static artifact copy.
```

## Target render readback contract

```txt
window.GameHost.getState()
  -> legacy fields stay unchanged:
       buildId
       phase
       progress
       pieces
       rings
       ringParts
       ringGaps
       ringStartTimes
       animation
  -> additive sourceProfile fields only:
       sourceProfile.buildId
       sourceProfile.ringCount
       sourceProfile.ringPartCounts
       sourceProfile.totalPieces
       sourceProfile.totalBuildSeconds
       sourceProfile.profileFingerprint
       sourceProfile.sourceSnapshot
       sourceProfile.parityReport
       sourceProfile.fixtureStatus
       sourceProfile.centralLedgerPointer
```

## Readback fixture rows

```txt
gamehost_legacy_build_id_is_smooth_ring_handoff_v6
gamehost_legacy_ring_count_is_10
gamehost_legacy_ring_parts_are_5_5_5_5_6_8_10_12_16_20
gamehost_legacy_pieces_are_92
gamehost_sourceprofile_is_additive
gamehost_sourceprofile_values_match_fixture
gamehost_sourceprofile_fingerprint_is_stable
gamehost_sourceprofile_parity_has_no_errors
sourceprofile_consumer_readback_matches_fixture
```

## Render rule

Do not rewrite the scene, camera, materials, geometry, or HUD before sourceProfile parity exists.

The first render-facing change should be additive readback only: import source-profile diagnostics, expose `sourceProfile` under `GameHost.getState()`, and preserve all visible runtime behavior.

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Freeze + Fixture Build Central Ledger Gate
```
