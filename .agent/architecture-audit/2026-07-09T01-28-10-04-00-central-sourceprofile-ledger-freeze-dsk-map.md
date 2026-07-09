# PhantomCommand Architecture Audit: Central SourceProfile Ledger Freeze DSK Map

**Timestamp:** `2026-07-09T01-28-10-04-00`

## Intent

Bring repo-local `.agent` state and the central `LuminaryLabs-Dev/LuminaryLabs` ledger back into alignment while preserving the next source-safe implementation seam: a source-owned `smooth-ring-handoff-v6` profile and fixture-readable GameHost consumer gate.

## Current runtime architecture

```txt
index.html
  -> menu route
  -> Start/Open Scene
  -> game.html
  -> Three.js CDN
  -> inline renderer / scene / camera / HUD / input
  -> inline smooth-ring-handoff-v6 constants
  -> inline ring descriptor math
  -> inline piece descriptor math
  -> inline construct animation
  -> window.GameHost construct diagnostics
```

## Interaction loop

```txt
open menu
  -> route to construct scene
  -> create renderer, scene, camera, lights, fog, HUD, materials, and input state
  -> derive ten no-gap rings inline
  -> derive 92 wedge pieces inline
  -> animate pieces by ringStartTimes + partIndex * PART_STAGGER
  -> pan, zoom, skip, or restart
  -> update HUD
  -> expose build state through GameHost
```

## Domains in use

```txt
static-app-shell
main-menu-routing
static-game-route
vite-static-build
github-pages-deploy
browser-render-host
webgl-canvas-host
three-render-scene
scene-fog-lighting
stone-material-palette
camera-navigation
keyboard-pan-input
wheel-zoom-input
button-input
hud-diagnostics
gamehost-authority
inline-construct-runtime
smooth-ring-handoff-v6-profile
construct-source-authority
construct-profile-normalization
construct-profile-parity
construct-source-fingerprint
construct-source-snapshot
construct-source-fixture-runner
ring-descriptor-generation
piece-descriptor-generation
piece-delay-policy
piece-settle-policy
handoff-timeline-contract
source-profile-consumer-splice
central-ledger-readback
fixture-build-integration
construct-event-result
scenario-bootstrap-gate
```

## Kit services currently available

```txt
construct-spiral-intro-kit
  -> createConstructSpiralIntroPieceId
  -> createConstructSpiralIntroSchedule
  -> createConstructSpiralIntroKit
  -> installPieces
  -> reset
  -> update
  -> snapshot
  -> schedule
  -> activePieces
  -> settledPieces
  -> pendingPieces
  -> newlyActivePieces
  -> newlySettledPieces
  -> getPieceProgress
  -> getPieceStatus

construct-spiral-intro-kit-smoke
  -> smoke validates generic spiral intro kit install/update/settle behavior
```

## Kits in use or targeted

```txt
implemented:
  construct-spiral-intro-kit
  construct-spiral-intro-kit-smoke

inline runtime candidates:
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

next-cut kits:
  phantom-command-smooth-handoff-profile-kit
  phantom-command-source-profile-fingerprint-kit
  phantom-command-source-profile-snapshot-kit
  phantom-command-ring-descriptor-kit
  phantom-command-piece-descriptor-kit
  phantom-command-handoff-timeline-contract-kit
  phantom-command-profile-parity-report-kit
  phantom-command-gamehost-source-diagnostics-kit
  phantom-command-source-profile-fixture-kit
  phantom-command-gamehost-source-consumer-kit
  phantom-command-central-ledger-readback-kit
  phantom-command-fixture-build-integration-kit
  phantom-command-construct-event-envelope-kit
  phantom-command-construct-event-result-kit
  phantom-command-scenario-bootstrap-gate-kit
  phantom-command-scenario-bootstrap-blocker-kit
```

## Main finding

The architecture should not move to RTS mechanics yet. The current highest-value seam is source ownership for the live construct profile, then sourceProfile diagnostics added to `GameHost` without changing the visual route.

## Stop line

Do not rewrite `game.html`, extract rendering, or add scenario bootstrap until fixture rows prove source profile parity, GameHost additive compatibility, build-gate execution, and central ledger pointer parity.
