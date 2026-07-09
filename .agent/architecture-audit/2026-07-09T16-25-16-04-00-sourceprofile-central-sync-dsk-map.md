# Architecture Audit: SourceProfile Central Sync DSK Map

**Timestamp:** `2026-07-09T16-25-16-04-00`

## Current route architecture

```txt
index.html
  -> menu shell
  -> game.html
  -> inline Three.js import
  -> inline construct runtime
  -> inline GameHost diagnostics
```

## Current DSK/domain map

```txt
static-route-shell
  owns index.html route and menu UX

scene-route
  owns game.html static route

vite-static-build
  owns npm run build through scripts/build-static.mjs

three-cdn-runtime
  owns browser-side Three.js import

inline-construct-profile
  owns BUILD_ID, ring count, radii, width policy, zero gap policy, handoff timing, part stagger, prewarm, start radius, and start height

ring-descriptor-inline-math
  owns inner/outer/gap/n descriptor calculation

piece-descriptor-inline-math
  owns piece placement, start/final transforms, seed variance, and delay rows

construct-timeline-inline-math
  owns ringStartTimes, totalBuild, skip, restart, construct progress, phase, and complete state

legacy-gamehost-diagnostics
  owns skipConstruct, restartConstruct, and getState legacy projection

construct-spiral-intro-kit
  owns reusable generic active/pending/settled schedule semantics but does not yet own the live v6 profile
```

## Required next-cut kits

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-profile-parity-report-kit
phantom-command-gamehost-source-diagnostics-kit
phantom-command-sourceprofile-consumer-readback-kit
phantom-command-sourceprofile-fixture-kit
phantom-command-build-fixture-gate-kit
central-ledger-readback-kit
```

## Architecture constraint

Do not replace `game.html` rendering first. The next implementation should add source-owned modules, fixture proof, and additive diagnostics while preserving the existing legacy `GameHost` fields.
