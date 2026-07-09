# Render Audit: GameHost SourceProfile Consumer Readback

**Timestamp:** `2026-07-09T12-55-20-04-00`

## Current visual surface

`game.html` owns the live render surface. It imports Three.js, creates a full-window WebGL renderer, builds fog/lights/materials/camera, generates wedge meshes, and animates all construct pieces inline.

## Current render loop

```txt
requestAnimationFrame(frame)
  -> construct(time - startedAt)
  -> update tower and commander idle animation
  -> smooth zoom
  -> update pan target/current
  -> position camera around current pan point
  -> camera.lookAt(...)
  -> renderer.render(scene, camera)
```

## Render-owned services still inline

```txt
WebGLRenderer creation
scene background and fog
ambient / sun / fill lights
stone material palette
wedge ExtrudeGeometry generation
seam BoxGeometry generation
center disc mesh
tower proxy mesh
commander proxy mesh
piece group construction
piece radial/drop interpolation
camera pan/zoom/orbit
HUD count/phase/progress mutation
```

## Readback gap

`window.GameHost.getState()` reports legacy construct diagnostics, but it does not yet report the source-owned profile snapshot that produced the renderable rings and pieces.

The renderer currently consumes inline constants, not source-owned descriptors.

## Next render readback contract

```txt
sourceProfile:
  buildId
  ringCount
  ringPartCounts
  totalPieces
  zeroGapPolicy
  timing:
    prewarmSeconds
    moveSeconds
    ringHandoff
    partStagger
    ringStartTimes
    totalBuildSeconds
  fingerprint
  parity:
    okRows
    warningRows
    errorRows
  consumer:
    consumedByGameHtml
    legacyFieldsPreserved
```

## Render rule

Do not change visual composition first. Preserve `smooth-ring-handoff-v6` output and add source-profile diagnostics additively.
