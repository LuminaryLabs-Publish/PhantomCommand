# PhantomCommand Source Profile Fixture DSK Breakdown

**Timestamp:** `2026-07-08T18-29-21-04-00`

## Goal

Document the DSK/domain split needed to make the live `smooth-ring-handoff-v6` construct source-owned, fixture-readable, and safely consumable by `game.html` without changing the current visual behavior.

## Current authority map

```txt
game.html
  -> imports Three.js CDN
  -> defines smooth-ring-handoff-v6 constants inline
  -> derives ring descriptors inline
  -> derives piece descriptors inline
  -> derives ringStartTimes inline
  -> builds wedge meshes inline
  -> animates pieces inline
  -> mutates HUD inline
  -> exposes window.GameHost inline
```

## Target DSK/domain map

```txt
phantom-command-source-profile-domain
  -> phantom-command-smooth-handoff-profile-kit
  -> phantom-command-source-profile-normalization-kit
  -> phantom-command-source-profile-fingerprint-kit
  -> phantom-command-source-profile-snapshot-kit

phantom-command-construct-descriptor-domain
  -> phantom-command-ring-descriptor-kit
  -> phantom-command-piece-descriptor-kit
  -> phantom-command-handoff-timeline-contract-kit
  -> phantom-command-profile-parity-report-kit

phantom-command-host-readback-domain
  -> phantom-command-gamehost-source-diagnostics-kit
  -> phantom-command-gamehost-source-consumer-kit
  -> phantom-command-source-profile-fixture-kit

phantom-command-scenario-gate-domain
  -> phantom-command-construct-event-envelope-kit
  -> phantom-command-construct-event-result-kit
  -> phantom-command-construct-completion-idempotency-kit
  -> phantom-command-scenario-bootstrap-blocker-kit
```

## Implemented kit inventory

```txt
construct-spiral-intro-kit
  domainPath: n:sequence:construct:spiral-intro
  role: generic construct scheduler and regression guard
  services:
    - createConstructSpiralIntroPieceId
    - createConstructSpiralIntroSchedule
    - createConstructSpiralIntroKit
    - installPieces
    - reset
    - update
    - snapshot
    - schedule
    - activePieces
    - settledPieces
    - pendingPieces
    - newlyActivePieces
    - newlySettledPieces
    - getPieceProgress
    - getPieceStatus

construct-spiral-intro-kit-smoke
  role: generic source-kit smoke coverage
  services:
    - assert kit id/domain path
    - assert schedule order
    - tick until completion
    - assert active cap/window behavior
```

## Inline kits still embedded in `game.html`

```txt
inline-smooth-ring-handoff-v6-profile
inline-ring-descriptor-runtime
inline-piece-descriptor-runtime
inline-piece-delay-runtime
inline-piece-settle-runtime
inline-wedge-geometry-runtime
inline-construct-animation-runtime
inline-construct-hud-runtime
inline-camera-navigation-runtime
inline-gamehost-construct-runtime
```

## Next-cut service contract

```txt
source profile kit emits:
  buildId
  ringCount
  firstInnerRadius
  firstRingWidth
  ringWidthGrowth
  maxRingWidth
  ringGapBase
  ringGapGrowth
  moveSeconds
  dropStartSeconds
  ringHandoff
  partStagger
  prewarmSeconds
  startRadiusMultiplier
  startHeightBase

ring descriptor kit emits:
  ringIndex
  inner
  outer
  width
  gap
  partsPerRing
  span
  offset

piece descriptor kit emits:
  pieceId
  ringIndex
  partIndex
  partsPerRing
  span
  angle
  delay
  seed
  finalRadius
  startRadius
  finalY
  startY

timeline contract kit emits:
  ringStartTimes
  moveSeconds
  ringHandoff
  partStagger
  maxParts
  totalBuildSeconds

parity report emits:
  status
  errors[]
  warnings[]
  expected
  actual
```

## Stop line

Do not use this pass to extract Three.js rendering or add RTS gameplay. The next implementation stops at source ownership, descriptor parity, GameHost sourceProfile diagnostics, and DOM-free fixture proof.