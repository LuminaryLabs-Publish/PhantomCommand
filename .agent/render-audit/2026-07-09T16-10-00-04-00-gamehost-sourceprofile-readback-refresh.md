# PhantomCommand Render Audit

**Timestamp:** `2026-07-09T16-10-00-04-00`

## Render surface

`PhantomCommand` has a visual/render surface in `game.html`.

The current render path is inline and browser-only:

```txt
game.html
  -> import Three.js CDN
  -> create WebGLRenderer
  -> create Scene / Fog / PerspectiveCamera
  -> create ambient, sun, and fill lights
  -> create material palette
  -> create wedge geometry per construct piece
  -> create center disc, tower, and command figure
  -> requestAnimationFrame(frame)
  -> construct(time - startedAt)
  -> update camera orbit/pan/zoom
  -> renderer.render(scene, camera)
```

## Readback available today

```txt
window.GameHost.getState()
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

This is enough to confirm the live route shape, but not enough to prove source ownership.

## Missing render/readback boundary

```txt
- No sourceProfile object under GameHost.
- No source fingerprint under GameHost.
- No source snapshot under GameHost.
- No browser-consumer readback row comparing GameHost to Node fixture output.
- No DOM-free descriptor parity report.
- No assertion that legacy GameHost fields stayed unchanged after adding source diagnostics.
- No build script gate before dist copy.
```

## Render rule

Do not rewrite visual composition next.

Do not extract the renderer next.

Do not replace the construct geometry next.

The render pass should only receive additive diagnostics after source-profile parity passes.

## Required next readback shape

```txt
window.GameHost.getState().sourceProfile = {
  buildId,
  profileVersion,
  sourceFingerprint,
  ringCount,
  ringPartCounts,
  totalPieces,
  zeroGapPolicy,
  ringStartTimes,
  totalBuildSeconds,
  parity: {
    okCount,
    warningCount,
    errorCount,
    errors
  },
  fixture: {
    fixtureName,
    passed,
    checkedAt
  }
}
```

## Render finding

The renderer can remain inline while the source profile becomes explicit. The safe render change is additive `GameHost` readback only, not a renderer extraction.
