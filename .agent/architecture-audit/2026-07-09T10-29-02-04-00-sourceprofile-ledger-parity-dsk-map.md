# Architecture Audit: SourceProfile Ledger Parity DSK Map

**Timestamp:** `2026-07-09T10-29-02-04-00`

## Scope

This pass documents the current `PhantomCommand` DSK/domain surface without changing runtime code.

The selected next architecture ledge is:

```txt
PhantomCommand SourceProfile Ledger Parity + Build Gate Readback
```

## Current app composition

```txt
index.html
  -> static menu and route controls
  -> game.html
  -> inline Three.js runtime
  -> inline smooth-ring-handoff-v6 profile
  -> inline ring descriptors
  -> inline piece descriptors
  -> inline construct timeline
  -> inline HUD/camera/input/GameHost projection
```

## Domains

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
construct-source-fixture-row-contract
construct-source-fixture-runner
construct-descriptor-authority
ring-descriptor-generation
piece-descriptor-generation
piece-delay-policy
piece-settle-policy
handoff-timeline-contract
gamehost-source-diagnostics
gamehost-source-profile-readback
gamehost-legacy-compatibility
central-ledger-readback
repo-local-agent-pointer-parity
fixture-build-integration
fixture-before-static-artifact
construct-event-envelope-deferred
construct-event-result-deferred
construct-completion-idempotency-deferred
scenario-bootstrap-gate-deferred
scenario-bootstrap-blocker
```

## Implemented kits

```txt
construct-spiral-intro-kit
  file: src/kits/construct-spiral-intro-kit/index.js
  domain: n:sequence:construct:spiral-intro
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
  file: tests/construct-spiral-intro-kit-smoke.mjs
  services:
    - verify kit id
    - verify domain path
    - verify schedule ordering
    - verify active cap
    - verify active ring window
    - verify completion
```

## Inline runtime kits to extract

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

## Next-cut kits

```txt
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
phantom-command-construct-completion-idempotency-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-blocker-kit
```

## Architecture finding

`game.html` remains the live authority for the route. It owns source constants, descriptor generation, geometry, animation, input, HUD, camera, and GameHost diagnostics in one browser file.

The existing `construct-spiral-intro-kit` is useful as a generic scheduling regression guard, but it does not source-own the live `smooth-ring-handoff-v6` values or prove route parity.

## Required architecture cut

```txt
source profile kit
  -> ring descriptor kit
  -> piece descriptor kit
  -> handoff timeline kit
  -> source fingerprint kit
  -> source snapshot kit
  -> profile parity report kit
  -> source profile fixture kit
  -> GameHost source diagnostics kit
  -> game.html additive consumer splice
  -> build-static fixture gate
```

## Do not do next

```txt
- Do not rewrite the construct render.
- Do not add RTS unit control.
- Do not add scenario bootstrap until construct_complete is a typed result.
- Do not promote local kits to shared NexusEngine kits before publish-local parity is proven.
```
