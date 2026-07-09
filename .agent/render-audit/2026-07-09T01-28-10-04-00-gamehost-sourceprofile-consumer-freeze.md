# PhantomCommand Render Audit: GameHost SourceProfile Consumer Freeze

**Timestamp:** `2026-07-09T01-28-10-04-00`

## Render surface

`game.html` owns the full visual runtime inline.

```txt
canvas#game
  -> Three.WebGLRenderer
  -> Scene background/fog
  -> Ambient + directional lights
  -> PerspectiveCamera
  -> stone material palette
  -> wedge geometry
  -> seam meshes
  -> center disc
  -> Grim Reaper Totem
  -> Phantom Commander figure
  -> construct animation
  -> HUD mutation
```

## Current render loop

```txt
requestAnimationFrame(frame)
  -> construct(time - startedAt)
  -> update tower / commander idle motion
  -> update zoom and orbit
  -> update pan input
  -> set camera position
  -> camera.lookAt(pan target)
  -> renderer.render(scene, camera)
```

## Render authority gap

The renderer currently consumes inline constants and inline ring/piece records. It cannot prove that the visible construct was derived from a reusable source profile.

## GameHost readback gap

Current `window.GameHost.getState()` exposes legacy build state only:

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

It does not yet expose:

```txt
sourceProfile
sourceFingerprint
sourceSnapshot
ringDescriptorParity
pieceDescriptorParity
timelineDescriptorParity
fixtureStatus
centralLedgerPointer
```

## Render-safe next contract

Add sourceProfile diagnostics beneath a nested field only.

```txt
window.GameHost.getState()
  -> legacy fields unchanged
  -> sourceProfile: {
       buildId,
       fingerprint,
       snapshot,
       parityReport,
       fixtureRows,
       centralLedgerReadback
     }
```

## Validation target

The next fixture should prove that adding the nested diagnostics does not alter existing legacy fields, control methods, route behavior, ring counts, piece counts, timing values, or visible build id.
