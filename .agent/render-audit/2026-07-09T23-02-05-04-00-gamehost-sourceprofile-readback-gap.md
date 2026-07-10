# PhantomCommand Render Audit: GameHost SourceProfile Readback Gap

**Timestamp:** `2026-07-09T23-02-05-04-00`

## Current render route

```txt
game.html
  -> Three.js CDN import
  -> WebGLRenderer(canvas)
  -> Scene / Fog / PerspectiveCamera
  -> AmbientLight / DirectionalLight / fill light
  -> ring wedge meshes, seams, center disc, tower, commander figure
  -> requestAnimationFrame(frame)
  -> construct(time - startedAt)
  -> update pan, zoom, orbit, camera lookAt
  -> renderer.render(scene, camera)
```

## Render surface status

The visible render should stay stable for the next implementation. The render blocker is not fidelity or extraction; it is readback.

`window.GameHost.getState()` exposes legacy build facts:

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

It does not expose source-profile proof:

```txt
sourceProfile
profileFingerprint
sourceSnapshot
ringDescriptorParity
pieceDescriptorParity
timelineParity
fixtureStatus
consumerReadback
```

## Render domains

```txt
three-cdn-runtime
browser-render-loop
wedge-geometry-authoring
material-palette
lighting-and-fog
hud-projection
keyboard-pan-control
wheel-zoom-control
skip-restart-control
legacy-gamehost-diagnostics
gamehost-sourceprofile-readback-next
```

## Main finding

Do not extract the renderer first. `game.html` can remain the visual consumer while source-profile proof is added additively.

The next render-safe change should add fixture-readable sourceProfile diagnostics under `window.GameHost.getState()` while preserving all legacy fields and current scene behavior.

## Required render proof rows

```txt
legacy buildId remains smooth-ring-handoff-v6
legacy rings remains 10
legacy ringParts remains [5,5,5,5,6,8,10,12,16,20]
legacy pieces remains 92
legacy animation.totalBuildTime remains 19.923
sourceProfile buildId matches legacy buildId
sourceProfile rings match legacy rings
sourceProfile piece count matches legacy pieces
sourceProfile timeline matches legacy ringStartTimes and total build
```

## Deferred

```txt
renderer extraction
visual retuning
mesh replacement
camera rewrite
HUD redesign
scene expansion
```
