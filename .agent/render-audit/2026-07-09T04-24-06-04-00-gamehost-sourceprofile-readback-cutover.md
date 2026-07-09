# Render Audit: GameHost SourceProfile Readback Cutover

**Timestamp:** `2026-07-09T04-24-06-04-00`

## Summary

The render surface should stay visually stable.

The next render-facing cut is not renderer extraction. It is source readback: prove the visible construct is derived from source-owned descriptors and expose that proof through `GameHost.getState().sourceProfile`.

## Current render route

```txt
game.html
  -> canvas#game
  -> Three.WebGLRenderer
  -> Three.Scene + Fog
  -> AmbientLight + DirectionalLights
  -> PerspectiveCamera
  -> materials
  -> generated wedge meshes
  -> center disc
  -> tower / Grim Reaper Totem proxy
  -> Phantom Commander proxy
  -> requestAnimationFrame(frame)
  -> construct(seq)
  -> renderer.render(scene, camera)
```

## Current render coupling

```txt
source constants: inline in game.html
ring descriptors: inline in game.html
piece descriptors: inline in game.html
wedge geometry: inline in game.html
piece animation: inline in game.html
HUD mutation: inline in game.html
GameHost projection: inline in game.html
```

## Render facts to preserve

```txt
canvas route: #game
background: 0x252a2e
fog: 0x252a2e / near 900 / far 9000
camera: PerspectiveCamera 45deg
pixel ratio cap: 2
ring gap policy: zero gap
visible construct: 10 rings / 92 pieces
controls: pan, zoom, skip, restart
GameHost compatibility: skipConstruct, restartConstruct, getState
```

## SourceProfile readback target

`GameHost.getState()` should keep the current shape and gain a nested diagnostic:

```txt
sourceProfile:
  buildId
  fingerprint
  normalizedProfile
  rings
  pieces
  timeline
  parityReport
  fixtureStatus
  legacyCompatible
```

## Additive readback rows

```txt
gamehost_sourceprofile_exists
gamehost_sourceprofile_build_id_matches_legacy_buildId
gamehost_sourceprofile_ring_count_matches_legacy_rings
gamehost_sourceprofile_piece_count_matches_legacy_pieces
gamehost_sourceprofile_ring_parts_match_legacy_ringParts
gamehost_sourceprofile_ring_gaps_match_legacy_ringGaps
gamehost_sourceprofile_ring_start_times_match_legacy_ringStartTimes
gamehost_sourceprofile_animation_values_match_legacy_animation
gamehost_sourceprofile_parity_report_has_no_errors
gamehost_legacy_fields_remain_unchanged
```

## What not to change yet

```txt
Do not change the renderer setup.
Do not change camera orbit behavior.
Do not change controls.
Do not replace wedge geometry.
Do not replace materials.
Do not move GameHost to a framework wrapper.
Do not add RTS scene entities.
Do not extract renderer modules before sourceProfile descriptor parity passes.
```

## Render cutover order

```txt
1. Add source-profile kits.
2. Add DOM-free fixture proving source values.
3. Add GameHost diagnostics helper.
4. Add additive sourceProfile field inside GameHost.getState().
5. Run fixture rows for legacy field compatibility.
6. Keep visual route unchanged.
```

## Validation target

```txt
node tests/phantom-command-source-profile-fixture.mjs
node tests/construct-spiral-intro-kit-smoke.mjs
npm run build
manual browser smoke: index.html -> game.html -> window.GameHost.getState()
```
