# PhantomCommand Architecture Audit: SourceProfile Fixture Row Refresh DSK Map

**Timestamp:** `2026-07-09T16-20-45-04-00`

## Scope

Docs-only breakdown of the active `PhantomCommand` architecture after comparing the accessible `LuminaryLabs-Publish` repo list against central `LuminaryLabs-Dev/LuminaryLabs` tracking.

`PhantomCommand` was selected as the oldest eligible documented-selection fallback. `TheCavalryOfRome` remains excluded.

## Current architecture shape

```txt
index.html
  -> menu route
  -> game.html
     -> Three.js CDN import
     -> inline renderer / scene / fog / lights / camera
     -> inline smooth-ring-handoff-v6 construct constants
     -> inline ring descriptor math
     -> inline piece descriptor math
     -> inline wedge geometry
     -> inline construct animation timeline
     -> inline HUD mutation
     -> inline input/pan/zoom/skip/restart controls
     -> window.GameHost legacy diagnostics
```

## Runtime DSK/domain breakdown

```txt
static-route-shell-domain
  owns index/game static page boundary

menu-route-domain
  owns user entry to game.html

three-cdn-runtime-domain
  owns browser module import of Three.js

render-frame-domain
  owns WebGLRenderer frame submission through inline code

construct-profile-domain
  owns BUILD_ID, ring count, ring sizing, handoff, stagger, prewarm, start radius, and start height values inline

ring-descriptor-domain
  owns no-gap ring derivation and part count math inline

piece-descriptor-domain
  owns per-piece start/final transform descriptors inline

construct-timeline-domain
  owns ringStartTimes, delay, local progress, radial/drop easing, and done count inline

hud-projection-domain
  owns bar/count/phase/status DOM mutation inline

input-control-domain
  owns keyboard pan, skip, restart, blur, resize, and wheel zoom inline

legacy-gamehost-diagnostics-domain
  owns skipConstruct, restartConstruct, and getState compatibility surface

construct-spiral-intro-kit-domain
  owns generic schedule/state-machine helpers, but not the live smooth-ring-handoff-v6 source profile
```

## Kit services present

```txt
construct-spiral-intro-kit:
  createConstructSpiralIntroPieceId(piece)
  createConstructSpiralIntroSchedule(pieces, config)
  createConstructSpiralIntroKit(options)
  installPieces(pieces)
  reset()
  update(dt)
  snapshot()
  schedule()
  activePieces()
  settledPieces()
  pendingPieces()
```

## Live inline services that need source-owned kits

```txt
smooth-ring-handoff-v6 profile values
ring descriptor derivation
ring part count derivation
piece descriptor derivation
timeline descriptor derivation
totalBuildSeconds derivation
source fingerprint
source snapshot
parity report
GameHost source diagnostics
DOM-free fixture rows
build fixture gate
central ledger readback
```

## Target DSK map

```txt
phantom-command-smooth-handoff-profile-kit
  -> exports the live profile and normalizer

phantom-command-ring-descriptor-kit
  -> derives no-gap ring descriptors and live ring part counts

phantom-command-piece-descriptor-kit
  -> derives 92 live piece descriptors without Three.js

phantom-command-handoff-timeline-contract-kit
  -> derives ringStartTimes, per-piece delays, totalBuildSeconds, and prewarm values

phantom-command-source-profile-fingerprint-kit
  -> produces stable serializable fingerprints

phantom-command-source-profile-snapshot-kit
  -> produces source snapshot used by diagnostics and central ledger proof

phantom-command-profile-parity-report-kit
  -> separates ok/warning/error/missing parity rows

phantom-command-gamehost-source-diagnostics-kit
  -> adds sourceProfile diagnostics without removing legacy GameHost fields

phantom-command-sourceprofile-fixture-kit
  -> proves parity without DOM, canvas, Three.js, or browser timing

phantom-command-build-fixture-gate-kit
  -> wires fixture proof before static artifact copy

central-ledger-readback-kit
  -> verifies repo-local tracker and central ledger alignment
```

## Main architecture finding

The architecture is blocked at the source-profile seam, not the renderer. The live visual should remain intact while source-owned profile, descriptors, timeline, and fixture rows are introduced.

## Deferred

```txt
scenario bootstrap
RTS gameplay
resource economy
renderer extraction
new visual pass
construct result authority
```
