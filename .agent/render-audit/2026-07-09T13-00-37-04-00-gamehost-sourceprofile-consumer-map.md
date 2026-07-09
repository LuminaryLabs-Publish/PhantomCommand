# PhantomCommand GameHost SourceProfile Consumer Map

**Timestamp:** `2026-07-09T13-00-37-04-00`

## Render surface

`game.html` owns the visible render path:

```txt
canvas#game
  -> THREE.WebGLRenderer
  -> scene background/fog
  -> perspective camera
  -> ambient/sun/fill lights
  -> material palette
  -> ring wedge meshes
  -> center disc
  -> command tower
  -> command figure
  -> HUD DOM
  -> help DOM
```

## Current readback

`window.GameHost.getState()` currently exposes construct runtime fields:

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

## Missing render-source readback

```txt
sourceProfile
sourceProfileFingerprint
sourceSnapshot
ringDescriptorParity
pieceDescriptorParity
timelineDescriptorParity
profileParityReport
sourceprofileConsumerReadback
fixtureStatus
legacyFieldCompatibility
```

## Required next consumer contract

The next implementation should add diagnostics additively:

```txt
window.GameHost.getState().sourceProfile = {
  buildId,
  ringCount,
  ringPartCounts,
  totalPieces,
  totalBuildSeconds,
  fingerprint,
  parity,
  fixtureStatus
}
```

Existing fields must not be removed or renamed.

## Render recommendation

Do not rewrite the renderer in the next pass. Keep the current `game.html` render path and use it as the consumer of source-owned descriptor records only after DOM-free parity passes.
