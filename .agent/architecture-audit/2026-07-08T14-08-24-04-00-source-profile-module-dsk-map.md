# PhantomCommand Source Profile Module DSK Map

**Timestamp:** `2026-07-08T14-08-24-04-00`

## Summary

The current runtime is descriptor-rich but still browser-owned. The architectural cut should create small publish-local DSKs that source-own the current `smooth-ring-handoff-v6` construct profile and prove parity before the browser runtime consumes those modules.

## Current architecture

```txt
index.html
  -> menu route
  -> game.html
  -> inline Three.js runtime
  -> inline smooth-ring-handoff-v6 constants
  -> inline ring descriptor math
  -> inline piece descriptor math
  -> inline timeline math
  -> inline HUD / input / GameHost projection
```

## Current source-owned kit

```txt
src/kits/construct-spiral-intro-kit/index.js
  -> generic construct schedule kit
  -> n:sequence:construct:spiral-intro
  -> install/reset/update/snapshot services
  -> pending/active/settled query services
```

This kit is useful, but it is not yet the live v6 authority because the live v6 proof uses no-gap ring descriptors, handoff timing, circumference-derived ring part counts, 92 pieces, and 19.923 total build seconds inline in `game.html`.

## Required local DSK split

```txt
n:phantom-command:construct:source-profile
  phantom-command-smooth-handoff-profile-kit
    -> canonical smooth-ring-handoff-v6 profile
    -> normalizeSmoothHandoffProfile()

n:phantom-command:construct:descriptors:rings
  phantom-command-ring-descriptor-kit
    -> derive ten no-gap ring descriptors
    -> prove inner/outer/gap/n values

n:phantom-command:construct:descriptors:pieces
  phantom-command-piece-descriptor-kit
    -> derive piece ids, ring index, part index, partsPerRing, angles, seeds
    -> prove 92 descriptors

n:phantom-command:construct:timeline
  phantom-command-handoff-timeline-contract-kit
    -> derive ringStartTimes
    -> derive per-piece delay
    -> derive totalBuildSeconds
    -> prove ringHandoff and partStagger values

n:phantom-command:construct:source-proof
  phantom-command-source-profile-fingerprint-kit
    -> stable source fingerprint
  phantom-command-source-profile-snapshot-kit
    -> serializable source snapshot
  phantom-command-profile-parity-report-kit
    -> pass/fail rows with reasons

n:phantom-command:diagnostics:gamehost
  phantom-command-gamehost-source-diagnostics-kit
    -> additive GameHost.sourceProfile payload
    -> no legacy GameHost breakage

n:phantom-command:fixtures:source-profile
  phantom-command-source-profile-fixture-kit
    -> DOM-free row runner
    -> no canvas, WebGL, Three.js, or browser timing
```

## Exact module order

```txt
1. src/kits/phantom-command-smooth-handoff-profile-kit/index.js
2. src/kits/phantom-command-ring-descriptor-kit/index.js
3. src/kits/phantom-command-piece-descriptor-kit/index.js
4. src/kits/phantom-command-handoff-timeline-contract-kit/index.js
5. src/kits/phantom-command-source-profile-fingerprint-kit/index.js
6. src/kits/phantom-command-source-profile-snapshot-kit/index.js
7. src/kits/phantom-command-profile-parity-report-kit/index.js
8. src/kits/phantom-command-gamehost-source-diagnostics-kit/index.js
9. tests/phantom-command-source-profile-fixture.mjs
10. game.html additive import/projection after the fixture passes
```

## Required profile constants

```txt
buildId: smooth-ring-handoff-v6
ringCount: 10
firstInnerRadius: 10
firstRingWidth: 7
ringWidthGrowth: 1.25
maxRingWidth: 120
ringGapBase: 0
ringGapGrowth: 0
moveSeconds: 2.6
dropStartSeconds: 0.08
ringHandoff: 0.72
partStagger: 0.025
prewarmSeconds: 0.45
startRadiusMultiplier: 1.38
startHeightBase: 24
ringPartCounts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
totalBuildSeconds: 19.923
```

## DSK boundary rules

```txt
- Each source-profile kit must be pure, deterministic, and idempotent.
- No source-profile kit should import game.html.
- No source-profile kit should import Three.js.
- No source-profile kit should touch DOM, canvas, WebGL, requestAnimationFrame, performance.now(), or window.
- The first game.html integration must be additive diagnostics only.
- window.GameHost.skipConstruct must stay stable.
- window.GameHost.restartConstruct must stay stable.
- window.GameHost.getState must keep existing top-level fields.
```

## Later domains, not now

```txt
construct-event-envelope
construct-event-result
construct-event-reducer
construct-completion-idempotency
construct-event-journal
scenario-bootstrap-command
scenario-bootstrap-preflight
scenario-bootstrap-result
scenario-bootstrap-gate
scenario-bootstrap-snapshot
rts-unit-command
undead-roster
necropolis-economy
combat-resolution
wave-objective-loop
```

## Main architectural read

The correct next architecture is not a renderer rewrite or a gameplay expansion. It is a source-profile module seam. Once the fixture proves parity, `game.html` can consume source-owned descriptors without changing the current visual surface.
