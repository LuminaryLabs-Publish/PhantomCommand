# PhantomCommand Architecture Audit: SourceProfile Readback Ledger DSK Map

**Timestamp:** `2026-07-09T07-19-41-04-00`

## Architecture read

`PhantomCommand` currently has two architecture layers:

```txt
visible route layer:
  index.html -> game.html -> inline Three.js construct runtime

repo-local kit layer:
  src/kits/construct-spiral-intro-kit/index.js
  tests/construct-spiral-intro-kit-smoke.mjs
```

The visible route is not yet driven by the repo-local kit layer.

## DSK/domain breakdown

```txt
PhantomCommand
├─ static-app-shell-domain
│  ├─ index-menu-route-kit
│  ├─ scene-route-link-kit
│  └─ vite-static-build-kit
├─ construct-runtime-domain
│  ├─ inline-smooth-ring-handoff-v6-profile
│  ├─ inline-ring-descriptor-runtime
│  ├─ inline-piece-descriptor-runtime
│  ├─ inline-piece-delay-runtime
│  ├─ inline-piece-settle-runtime
│  ├─ inline-wedge-geometry-runtime
│  ├─ inline-construct-animation-runtime
│  └─ inline-construct-hud-runtime
├─ generic-construct-kit-domain
│  ├─ construct-spiral-intro-kit
│  └─ construct-spiral-intro-kit-smoke
├─ source-profile-domain / next cut
│  ├─ phantom-command-smooth-handoff-profile-kit
│  ├─ phantom-command-ring-descriptor-kit
│  ├─ phantom-command-piece-descriptor-kit
│  ├─ phantom-command-handoff-timeline-contract-kit
│  ├─ phantom-command-source-profile-fingerprint-kit
│  ├─ phantom-command-source-profile-snapshot-kit
│  └─ phantom-command-profile-parity-report-kit
├─ gamehost-consumer-domain / next cut
│  ├─ phantom-command-gamehost-source-diagnostics-kit
│  ├─ phantom-command-source-profile-fixture-kit
│  └─ phantom-command-gamehost-source-consumer-kit
├─ deploy-fixture-domain / next cut
│  ├─ phantom-command-central-ledger-readback-kit
│  └─ phantom-command-fixture-build-integration-kit
└─ scenario-bootstrap-domain / blocked
   ├─ phantom-command-construct-event-envelope-kit
   ├─ phantom-command-construct-event-result-kit
   ├─ phantom-command-construct-completion-idempotency-kit
   ├─ phantom-command-scenario-bootstrap-gate-kit
   └─ phantom-command-scenario-bootstrap-blocker-kit
```

## Services captured

```txt
implemented:
  construct-spiral-intro-kit.installPieces
  construct-spiral-intro-kit.reset
  construct-spiral-intro-kit.update
  construct-spiral-intro-kit.snapshot
  construct-spiral-intro-kit.schedule
  construct-spiral-intro-kit.activePieces
  construct-spiral-intro-kit.settledPieces
  construct-spiral-intro-kit.pendingPieces
  construct-spiral-intro-kit.newlyActivePieces
  construct-spiral-intro-kit.newlySettledPieces
  construct-spiral-intro-kit.getPieceProgress
  construct-spiral-intro-kit.getPieceStatus

inline/live:
  game.html ringParts
  game.html wedge
  game.html makePiece
  game.html construct
  game.html updatePan
  window.GameHost.skipConstruct
  window.GameHost.restartConstruct
  window.GameHost.getState

next:
  normalizeSmoothHandoffProfile
  derivePhantomCommandRingDescriptors
  derivePhantomCommandPieceDescriptors
  derivePhantomCommandHandoffTimeline
  createSourceProfileFingerprint
  createSourceProfileSnapshot
  createProfileParityReport
  createGameHostSourceDiagnostics
  runSourceProfileFixtureRows
  verifyCentralLedgerPointsToLatestTracker
```

## Main architecture gap

The generic `construct-spiral-intro-kit` has a good scheduling service surface, but the live route still uses inline `smooth-ring-handoff-v6` constants and math. Treat the generic kit as a regression guard until a live-profile fixture proves exact parity.

## Next safe ledge

```txt
PhantomCommand SourceProfile Readback Ledger + Fixture Build Consumer Gate
```
