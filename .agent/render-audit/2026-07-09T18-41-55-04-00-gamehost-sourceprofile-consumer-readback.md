# PhantomCommand GameHost SourceProfile Consumer Readback

**Timestamp:** `2026-07-09T18-41-55-04-00`

## Render surface

`game.html` owns the active visual surface.

It creates a Three.js renderer, scene, fog, lights, camera, materials, ring wedges, seams, center disc, tower, command figure, HUD, and frame loop inline.

## Current render loop

```txt
requestAnimationFrame(frame)
  -> compute dt
  -> construct(time - startedAt)
  -> update tower and command figure motion
  -> ease zoom
  -> update pan target/current
  -> set camera position and lookAt
  -> renderer.render(scene, camera)
  -> request next frame
```

## Current GameHost readback

```txt
window.GameHost = {
  skipConstruct,
  restartConstruct,
  getState() -> {
    buildId,
    phase,
    progress,
    pieces,
    rings,
    ringParts,
    ringGaps,
    ringStartTimes,
    animation: {
      prewarmSeconds,
      moveSeconds,
      ringHandoff,
      partStagger,
      ringGapBase,
      ringGapGrowth,
      totalBuildTime
    }
  }
}
```

## Gap

The GameHost readback exposes legacy construct state, but it does not prove where the source profile came from.

Missing readback:

```txt
sourceProfile
sourceFingerprint
sourceSnapshot
ringDescriptorParity
pieceDescriptorParity
timelineParity
fixtureStatus
legacyCompatibilityStatus
centralLedgerTrackerParity
```

## Next render-safe change

Do not replace the renderer or animation first.

Add source-profile diagnostics under `GameHost.getState().sourceProfile` only after DOM-free fixture proof shows the source-owned profile exactly matches current inline runtime behavior.
