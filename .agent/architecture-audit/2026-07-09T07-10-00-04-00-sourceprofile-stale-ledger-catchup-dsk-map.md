# Architecture Audit: SourceProfile Stale Ledger Catch-up DSK Map

**Timestamp:** `2026-07-09T07-10-00-04-00`

## Current architecture

```txt
index.html
  -> menu/app shell
  -> game.html route

game.html
  -> Three.js CDN
  -> inline renderer/scene/camera/HUD/input setup
  -> inline smooth-ring-handoff-v6 source constants
  -> inline ring descriptor math
  -> inline piece descriptor math
  -> inline wedge/seam geometry
  -> inline construct(seq) animation and HUD mutation
  -> window.GameHost legacy state

src/kits/construct-spiral-intro-kit/index.js
  -> generic construct scheduling DSK
  -> smoke-tested separately
  -> not yet wired into live game.html source authority
```

## Implemented DSKs

```txt
construct-spiral-intro-kit
  domainPath: n:sequence:construct:spiral-intro
  owns: generic piece scheduling, active/settled/pending state, active cap, active ring window, snapshot readback
  service shape: create schedule, install pieces, reset, update, query status/progress

construct-spiral-intro-kit-smoke
  owns: generic smoke proof for schedule ordering, active cap, active ring window, and completion
```

## Active domains

```txt
app-shell-domain
route-domain
browser-render-host-domain
webgl-canvas-domain
three-scene-domain
camera-navigation-domain
input-domain
hud-domain
gamehost-domain
inline-construct-profile-domain
inline-ring-descriptor-domain
inline-piece-descriptor-domain
inline-timeline-domain
inline-animation-domain
inline-geometry-domain
static-build-domain
pages-deploy-domain
```

## Next-cut DSK boundaries

```txt
phantom-command-smooth-handoff-profile-kit
  owns: canonical smooth-ring-handoff-v6 constants and defaults

phantom-command-ring-descriptor-kit
  owns: inner radius, outer radius, width growth, zero-gap policy, ring part count descriptors

phantom-command-piece-descriptor-kit
  owns: 92 piece records, ring index, part index, angle, span, delay, final ring placement metadata

phantom-command-handoff-timeline-contract-kit
  owns: prewarm, move seconds, ring handoff, part stagger, ringStartTimes, total build seconds

phantom-command-source-profile-fingerprint-kit
  owns: stable source fingerprint for source-owned profile/descriptors

phantom-command-source-profile-snapshot-kit
  owns: serializable source snapshot for fixture and GameHost projection

phantom-command-profile-parity-report-kit
  owns: ok/warn/error rows proving source-owned values match live v6 values

phantom-command-gamehost-source-diagnostics-kit
  owns: additive GameHost sourceProfile diagnostics without changing legacy fields

phantom-command-source-profile-fixture-kit
  owns: DOM-free fixture rows proving parity without Three.js/canvas/browser timing

phantom-command-fixture-build-integration-kit
  owns: fixture execution before static artifact copy

phantom-command-central-ledger-readback-kit
  owns: parity row that central ledger latest tracker matches repo-local tracker
```

## Why not extract renderer first

Renderer extraction would still consume unproven inline source values. The source-profile contract must exist first so any future renderer consumes explicit descriptors rather than hidden constants from `game.html`.

## Why not start RTS gameplay first

The current game is still a construct proof. Scenario bootstrap should stay blocked until sourceProfile parity and a typed construct result exist.

## Architecture decision

The next implementation should be source-first, not render-first:

```txt
source profile -> descriptors -> timeline -> snapshot/fingerprint -> parity fixture -> additive GameHost diagnostics -> build gate -> later construct result -> later scenario bootstrap
```
