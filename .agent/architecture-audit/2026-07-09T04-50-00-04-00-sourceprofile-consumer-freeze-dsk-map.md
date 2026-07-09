# PhantomCommand Architecture Audit: SourceProfile Consumer Freeze DSK Map

**Timestamp:** `2026-07-09T04-50-00-04-00`

## Architectural status

`PhantomCommand` is a static Vite/Three.js construct proof. The visible runtime is concentrated in `game.html`, while a generic construct scheduling kit exists separately under `src/kits/construct-spiral-intro-kit/`.

The next architecture move is not a visual rewrite. It is a source-authority cut that proves the live `smooth-ring-handoff-v6` build can be represented as source-owned records, consumed by `GameHost`, and guarded by a DOM-free fixture/build gate.

## Current route architecture

```txt
index.html
  -> menu shell
  -> Start / Open Scene route
  -> game.html
  -> Three.js CDN module
  -> inline runtime constants
  -> inline ring descriptor math
  -> inline piece descriptor math
  -> inline wedge/mesh construction
  -> inline construct animation loop
  -> inline HUD mutation
  -> window.GameHost legacy state
```

## Current DSK boundary map

```txt
static-app-shell
  -> owns index.html route menu

static-game-route
  -> owns game.html browser runtime shell

inline-construct-runtime
  -> owns smooth-ring-handoff-v6 source constants
  -> owns ring descriptors
  -> owns piece descriptors
  -> owns timing and animation math
  -> owns construct phase/progress mutation

browser-render-host
  -> owns canvas, renderer, scene, camera, lights, fog, materials

hud-diagnostics
  -> owns DOM text/progress mutation

gamehost-authority
  -> owns skipConstruct, restartConstruct, getState legacy surface

construct-spiral-intro-kit
  -> owns generic schedule/window/active/settled behavior
  -> does not yet own live smooth-ring-handoff-v6 source parity
```

## Target DSK boundary map

```txt
phantom-command-smooth-handoff-profile-kit
  -> owns buildId and live profile constants

phantom-command-ring-descriptor-kit
  -> owns no-gap ring descriptors

phantom-command-piece-descriptor-kit
  -> owns live part counts and 92 piece descriptor rows

phantom-command-handoff-timeline-contract-kit
  -> owns ringStartTimes, part delays, prewarm, totalBuildSeconds

phantom-command-source-profile-fingerprint-kit
  -> owns stable profile fingerprint

phantom-command-source-profile-snapshot-kit
  -> owns serializable source snapshot

phantom-command-profile-parity-report-kit
  -> owns parity rows against expected live values

phantom-command-gamehost-source-diagnostics-kit
  -> owns additive GameHost sourceProfile projection

phantom-command-source-profile-fixture-kit
  -> owns DOM-free source/profile/descriptor/timeline/GameHost fixture rows

phantom-command-central-ledger-readback-kit
  -> owns central latest-tracker pointer parity

phantom-command-fixture-build-integration-kit
  -> owns fixture-before-static-artifact build gate

phantom-command-construct-event-envelope-kit
  -> deferred until sourceProfile parity passes

phantom-command-scenario-bootstrap-gate-kit
  -> deferred until construct result exists
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
source-profile-consumer-splice
fixture-build-integration
fixture-before-static-artifact
construct-event-envelope
construct-event-result
construct-completion-idempotency
scenario-bootstrap-gate
scenario-bootstrap-blocker
```

## Service map

```txt
current services:
  - route from menu to game
  - create renderer/scene/fog/lights/camera/materials
  - create 10 rings inline
  - compute ring parts inline
  - create 92 pieces inline
  - animate radial/drop handoff
  - mutate HUD progress and phase
  - pan/zoom/skip/restart
  - expose GameHost legacy state

needed next services:
  - normalize source profile
  - derive ring descriptors
  - derive piece descriptors
  - derive timeline descriptors
  - fingerprint and snapshot source profile
  - compare profile parity
  - project GameHost source diagnostics
  - assert legacy GameHost shape remains stable
  - run DOM-free fixture rows
  - read back central ledger latest tracker
  - run fixture before static artifact copy
```

## Architecture risk

The main risk is extracting render or gameplay first. That would move the monolith without proving that source-owned descriptor records match the live construct.

The architecture should freeze sourceProfile parity first, then consume it additively from `game.html`, then consider construct event/result authority.

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Freeze + Fixture Build Central Ledger Gate
```
