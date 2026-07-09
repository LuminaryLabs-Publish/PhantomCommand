# PhantomCommand Render Audit: GameHost SourceProfile Render Readback

**Timestamp:** `2026-07-09T12-38-16-04-00`

## Render surface

`PhantomCommand` has a visual/render surface.

```txt
game.html
  -> canvas#game
  -> Three.js CDN import
  -> WebGLRenderer
  -> Scene, Fog, AmbientLight, DirectionalLight
  -> PerspectiveCamera
  -> MeshStandardMaterial and MeshBasicMaterial palettes
  -> wedge ExtrudeGeometry pieces
  -> center disc, tower, and command proxy meshes
  -> requestAnimationFrame(frame)
  -> renderer.render(scene, camera)
```

## Current render authority

The render path is not yet source-profile driven.

```txt
inline constants
  -> ring descriptor math
  -> piece descriptor math
  -> wedge geometry creation
  -> makePiece adds groups to Three scene
  -> construct(seq) mutates group transforms
  -> HUD progress mutates DOM
  -> frame() mutates camera and renders scene
```

## Readback gap

`window.GameHost.getState()` exposes construct fields, but not sourceProfile readback.

Current fields:

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

Missing additive fields:

```txt
sourceProfile.profileId
sourceProfile.sourceFingerprint
sourceProfile.sourceSnapshot
sourceProfile.ringDescriptorCount
sourceProfile.pieceDescriptorCount
sourceProfile.timeline.totalBuildSeconds
sourceProfile.parity.status
sourceProfile.parity.errors
sourceProfile.fixtureRows
sourceProfile.browserConsumerReadback
```

## Render readback contract

The next render-safe cut should prove these without changing pixels:

```txt
source profile matches live constants
ring descriptors match live ring math
piece descriptors match live part counts and total 92 pieces
timeline matches live ringStartTimes and totalBuildTime
legacy GameHost fields are still present
additive sourceProfile diagnostics are nested and optional
browser route consumes sourceProfile after DOM-free fixture proof
```

## Do not do during next ledge

```txt
Do not replace Three.js setup.
Do not extract wedge geometry before source-profile parity passes.
Do not change material colors.
Do not change ring counts, ring gaps, timing, camera orbit, or HUD copy.
Do not replace renderer or introduce post-processing.
Do not add RTS units yet.
```

## Main render finding

The current render path is stable enough to treat as a consumer. The missing part is a sourceProfile readback layer proving that the visible render was produced by source-owned profile descriptors, not hidden inline constants.
