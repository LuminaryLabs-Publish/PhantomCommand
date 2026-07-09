# Architecture Audit: SourceProfile Consumer Ledger Catch-up DSK Map

**Timestamp:** `2026-07-09T12-50-00-04-00`

## Current architecture

```txt
index.html
  -> route controls
  -> game.html
      -> Three.js CDN import
      -> inline smooth-ring-handoff-v6 constants
      -> inline ring descriptors
      -> inline piece descriptors
      -> inline wedge geometry
      -> inline construct animation
      -> inline HUD mutation
      -> inline camera navigation
      -> inline window.GameHost surface
```

`src/kits/construct-spiral-intro-kit/index.js` exists, but it is a generic scheduling kit. It does not yet own the live `smooth-ring-handoff-v6` profile consumed by `game.html`.

## DSK/domain breakdown

```txt
phantom-command-route-domain
  owns: index.html -> game.html route handoff
  current state: implemented as static menu and direct link/button routing

phantom-command-render-host-domain
  owns: canvas, renderer, scene, fog, lights, camera, materials
  current state: inline in game.html

phantom-command-source-profile-domain
  owns: buildId, ring count, radii, widths, gaps, timing, start transform policy
  current state: inline constants in game.html
  next kit: phantom-command-smooth-handoff-profile-kit

phantom-command-ring-descriptor-domain
  owns: inner/outer radii, gaps, ring part counts
  current state: inline loops in game.html
  next kit: phantom-command-ring-descriptor-kit

phantom-command-piece-descriptor-domain
  owns: ring/part ids, final positions, start positions, delay, seeded variation
  current state: inline makePiece() side effects
  next kit: phantom-command-piece-descriptor-kit

phantom-command-timeline-domain
  owns: ringStartTimes, part stagger, move seconds, prewarm, total build seconds
  current state: inline ringStartTimes and totalBuild formula
  next kit: phantom-command-handoff-timeline-contract-kit

phantom-command-gamehost-domain
  owns: skipConstruct, restartConstruct, getState compatibility and sourceProfile readback
  current state: inline GameHost object with construct-only fields
  next kit: phantom-command-gamehost-source-diagnostics-kit

phantom-command-fixture-domain
  owns: DOM-free parity rows and fixture-before-build gate
  current state: planned only
  next kit: phantom-command-source-profile-fixture-kit

phantom-command-central-ledger-domain
  owns: central repo-ledger pointer parity
  current state: docs only
  next kit: phantom-command-central-ledger-readback-kit

phantom-command-construct-result-domain
  owns: typed construct_complete result and idempotency
  current state: deferred
  next kit: phantom-command-construct-event-result-kit

phantom-command-scenario-bootstrap-domain
  owns: scenario bootstrap gate after construct completion
  current state: deferred
  next kit: phantom-command-scenario-bootstrap-gate-kit
```

## Implemented kits

```txt
construct-spiral-intro-kit
  file: src/kits/construct-spiral-intro-kit/index.js
  domain path: n:sequence:construct:spiral-intro
  role: generic construct-piece scheduling and state snapshot kit

construct-spiral-intro-kit-smoke
  file: tests/construct-spiral-intro-kit-smoke.mjs
  role: regression smoke for the generic construct kit
```

## Next extraction sequence

```txt
1. phantom-command-smooth-handoff-profile-kit
2. phantom-command-ring-descriptor-kit
3. phantom-command-piece-descriptor-kit
4. phantom-command-handoff-timeline-contract-kit
5. phantom-command-source-profile-fingerprint-kit
6. phantom-command-source-profile-snapshot-kit
7. phantom-command-profile-parity-report-kit
8. phantom-command-gamehost-source-diagnostics-kit
9. phantom-command-source-profile-fixture-kit
10. phantom-command-gamehost-source-consumer-kit
11. phantom-command-central-ledger-readback-kit
12. phantom-command-fixture-build-integration-kit
```

## Main architectural rule

Do not rewrite the render scene first.

Source ownership and fixture parity must precede render extraction, construct result contracts, scenario bootstrap, RTS gameplay, or movement/selection systems.
