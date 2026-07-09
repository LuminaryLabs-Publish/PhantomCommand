# PhantomCommand Render Audit: GameHost SourceProfile Consumer Readback

**Timestamp:** `2026-07-09T07-19-41-04-00`

## Render surface

`game.html` is a visual/render surface.

The route imports Three.js from CDN, creates a WebGL renderer, builds a fogged stone construct scene, creates wedge meshes for 92 stone pieces, animates the construct with `requestAnimationFrame`, and mutates HUD fields directly from inline runtime state.

## Current render loop

```txt
canvas#game
  -> THREE.WebGLRenderer
  -> scene background/fog
  -> ambient/directional lights
  -> material palette
  -> wedge geometry per ring piece
  -> center disc / tower / commander proxy
  -> construct(seq) mutates mesh position and rotation
  -> updatePan(dt) mutates camera target
  -> camera orbit/zoom resolves each frame
  -> renderer.render(scene, camera)
  -> HUD text/progress writes
  -> GameHost.getState exposes construct state
```

## Render blocker

The renderer consumes inline constants and inline descriptors. It does not yet read a source-owned profile or descriptor snapshot.

The next render-safe move is **not** to extract renderer internals first. The next safe move is to add readback proof that the renderer-visible values can be generated from source-owned descriptors while keeping the existing visual unchanged.

## Readback contract to add

```txt
GameHost.getState().sourceProfile = {
  buildId,
  profileFingerprint,
  sourceSnapshot,
  ringDescriptorsSummary,
  pieceDescriptorSummary,
  timelineSummary,
  parityReport,
  fixtureStatus
}
```

Existing top-level fields must remain compatible:

```txt
buildId
phase
progress
pieces
rings
ringParts
ringGaps
ringStartTimes
animation
```

## Fixture rows needed

```txt
gamehost_source_diagnostics_shape_is_additive
legacy_gamehost_fields_are_unchanged
sourceprofile_consumer_readback_matches_fixture
profile_parity_report_has_no_errors
fixture_runs_without_dom_canvas_or_three
```

## Render conclusion

Keep the visual route intact. Add source-profile readback and GameHost diagnostics first, then consider renderer extraction only after descriptor parity is proven.
