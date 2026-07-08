# PhantomCommand GameHost Render Readback Audit

**Timestamp:** `2026-07-08T10-58-46-04-00`

## Current render surface

`game.html` is the current visual/runtime authority.

It creates:

```txt
WebGL canvas
Three.js renderer
scene background and fog
PerspectiveCamera
ambient and directional lights
stone material palette
ring wedge geometry
seam line meshes
center disc
Grim Reaper Totem
Phantom Commander figure
HUD progress/status panel
camera pan and zoom loop
window.GameHost diagnostics
```

## Current render loop

```txt
requestAnimationFrame(frame)
  -> compute dt
  -> construct(time - startedAt)
  -> update tower and commander idle motion
  -> update zoom and orbit
  -> update pan target from keyboard input
  -> camera.lookAt(pan target)
  -> renderer.render(scene, camera)
  -> loop
```

## Current readback surface

`window.GameHost.getState()` currently returns the construct facts that matter most for source parity:

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

This is enough to preserve the current public compatibility surface while adding richer source and result records.

## Main render gap

Render code still consumes inline live values directly. It does not yet consume a source-owned profile, ring descriptor list, piece descriptor list, construct result projection, or scenario bootstrap projection.

That means the visual can look correct while the source authority remains implicit.

## Required readback additions

The next implementation should add to `GameHost.getState()` without removing current keys:

```txt
sourceProfile.buildId
sourceProfile.fingerprint
sourceSnapshot.ringCount
sourceSnapshot.totalPieces
sourceSnapshot.totalBuildSeconds
profileParity.ok
profileParity.expectedRingParts
profileParity.actualRingParts
profileParity.expectedGaps
profileParity.actualGaps
constructResult.lastAcceptedEventId
constructResult.rejectedEvents
constructSnapshot.complete
constructSnapshot.completedAt
scenarioBootstrap.accepted
scenarioBootstrap.scenarioId
scenarioBootstrap.rejections
scenarioBootstrapSnapshot.mode
fixtureSummary.profileParity
fixtureSummary.constructIdempotency
fixtureSummary.bootstrapGate
```

## Renderer-safe rule

Do not replace the live renderer in the same pass that adds acceptance fixtures.

The next source change should be additive:

```txt
keep game.html visuals stable
  -> add pure source/result helpers
  -> add fixture script
  -> optionally import the helpers into game.html
  -> expose helper output through GameHost
  -> keep existing visual constants equivalent until parity is proven
```

## Acceptance readback target

```txt
GameHost still exposes skipConstruct
GameHost still exposes restartConstruct
GameHost still exposes getState
getState still exposes current buildId/rings/pieces/timing keys
getState additionally exposes source profile/fingerprint/parity/result/bootstrap diagnostics
DOM-free fixture can reproduce the same expected values without opening game.html
```
