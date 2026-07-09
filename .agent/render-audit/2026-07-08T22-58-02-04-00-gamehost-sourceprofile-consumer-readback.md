# PhantomCommand Render Audit — GameHost SourceProfile Consumer Readback

**Timestamp:** `2026-07-08T22-58-02-04-00`

## Current render surface

`game.html` owns a monolithic inline Three.js runtime:

```txt
canvas#game
  -> WebGLRenderer
  -> Scene / Fog / AmbientLight / DirectionalLight
  -> PerspectiveCamera
  -> stone material palette
  -> wedge geometry and seam meshes
  -> center disc, Grim Reaper Totem, Phantom Commander figure
  -> construct(seq) mutates group transforms
  -> renderer.render(scene, camera)
```

## Current readback surface

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
  -> animation
```

## Render risk

The visible render is currently correct enough to preserve, but it is not source-proven. Render code consumes inline constants and inline ring/piece math directly. There is no way to assert that the browser route consumed the same source profile that a DOM-free fixture validated.

## Required additive readback

```txt
window.GameHost.getState().sourceProfile
  -> buildId
  -> profileFingerprint
  -> sourceSnapshot
  -> ringDescriptorSummary
  -> pieceDescriptorSummary
  -> timelineSummary
  -> parityReport
  -> fixtureGate
  -> legacyCompatibility: true
```

## Non-goals

```txt
- Do not change camera behavior.
- Do not change wedge geometry.
- Do not change colors/materials.
- Do not change the construct animation.
- Do not replace the HUD.
- Do not extract Three.js renderer before sourceProfile parity exists.
```

## Next render validation rows

```txt
gamehost_source_diagnostics_shape_is_additive
legacy_gamehost_fields_are_unchanged
source_snapshot_is_serializable
profile_parity_report_has_no_errors
render_route_consumes_source_profile_after_fixture_pass
```
