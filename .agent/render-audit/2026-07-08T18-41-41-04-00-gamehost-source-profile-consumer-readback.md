# Render Audit: GameHost Source Profile Consumer Readback

**Timestamp:** `2026-07-08T18-41-41-04-00`

## Render surface

`PhantomCommand` has a visual/render surface.

Current render route:

```txt
game.html
  -> canvas#game
  -> Three.js CDN import
  -> WebGLRenderer
  -> Fog / directional lights / ambient light
  -> stone material palette
  -> 92 wedge meshes and seam meshes
  -> center disc / Grim Reaper Totem / Phantom Commander visual markers
  -> requestAnimationFrame(frame)
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
  -> animation config
```

## Missing render readback

```txt
- No sourceProfile object is exposed.
- No sourceFingerprint is exposed.
- No sourceSnapshot is exposed.
- No descriptorParity report is exposed.
- No timingParity report is exposed.
- No centralLedgerReadback status is exposed.
- No fixtureStatus object is exposed.
```

## Rule for next render change

Do not retune camera, fog, materials, wedge geometry, orbit speed, pan bounds, zoom bounds, piece motion, or HUD layout during the source-profile pass.

The only allowed browser-side render/readback change for the next implementation is additive `window.GameHost.getState().sourceProfile` diagnostics after the DOM-free source-profile fixture passes.

## Target additive state

```txt
window.GameHost.getState().sourceProfile = {
  buildId,
  fingerprint,
  snapshot,
  ringCount,
  ringPartCounts,
  totalPieces,
  totalBuildSeconds,
  parityReport,
  centralLedgerReadback,
  fixtureStatus
}
```

## Stop condition

The visual construct remains unchanged and all existing GameHost fields remain available.
