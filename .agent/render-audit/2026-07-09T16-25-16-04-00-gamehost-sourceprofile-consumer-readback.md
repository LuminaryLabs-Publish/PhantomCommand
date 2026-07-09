# Render Audit: GameHost SourceProfile Consumer Readback

**Timestamp:** `2026-07-09T16-25-16-04-00`

## Current visual surface

`game.html` owns the full visible scene in a single inline module.

```txt
Three.js CDN import
  -> WebGLRenderer(canvas)
  -> Scene background/fog
  -> PerspectiveCamera
  -> ambient/sun/fill lights
  -> material palette
  -> wedge meshes
  -> center disc
  -> tower
  -> command figure
  -> HUD DOM
  -> frame loop render(scene, camera)
```

## Readback surface today

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
  -> animation constants
```

## Missing readback

```txt
sourceProfile.profileId
sourceProfile.fingerprint
sourceProfile.ringDescriptors
sourceProfile.pieceDescriptorCount
sourceProfile.timelineDescriptors
sourceProfile.parityReport
sourceProfile.fixtureStatus
```

## Render recommendation

Do not extract or replace the renderer next.

First source-own the profile and descriptors, then add non-breaking `sourceProfile` fields to `GameHost.getState()`. The render loop can keep using inline objects until parity is proven.
