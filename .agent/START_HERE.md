# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-09T07-19-41-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `PhantomCommand`.

Read this folder before changing runtime code.

## Current selection result

The full accessible `LuminaryLabs-Publish` organization repo list was compared against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger entries and sampled repo-local `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, missing root `.agent` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`PhantomCommand` was selected as the oldest eligible central-ledger fallback and central-ledger catch-up target. The central ledger still pointed at `2026-07-09T04-50-00-04-00`, while repo-local `.agent` state already had a `2026-07-09T07-10-00-04-00` source-profile ledger catch-up pass.

This pass keeps runtime code unchanged and narrows the next implementation to a source-profile readback ledger, additive `GameHost` sourceProfile diagnostics, DOM-free fixture rows, and build-gate proof before any RTS/scenario bootstrap expansion.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T07-05-52-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T06-01-30-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       selected / central ledger stale at 2026-07-09T04-50-00-04-00 / repo-local latest 2026-07-09T07-10-00-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T05-11-22-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T05-38-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T05-20-42-04-00
```

## Current product read

`PhantomCommand` is a static Vite/Three.js construct proof with two routes:

```txt
index.html
  -> game.html
  -> inline Three.js smooth-ring-handoff-v6 construct runtime
```

The visible scene is stable and should not be rewritten first.

The live construct still keeps its source constants, ring math, piece math, construct timeline, HUD mutation, camera control, and `GameHost` state inside `game.html`.

## Current interaction loop

```txt
open index.html
  -> menu renders Phantom Command route controls
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 no-gap rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates each piece by ring delay and part delay
  -> WASD/arrows pan, wheel zooms, Space/Skip jumps to completion, R/Restart resets
  -> HUD reports constructed count, phase, build id, and progress
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
```

## Next target loop

```txt
source-owned smooth-ring-handoff-v6 profile
  -> normalized profile
  -> ring descriptors
  -> piece descriptors
  -> timeline descriptors
  -> source fingerprint
  -> source snapshot
  -> profile parity report
  -> DOM-free source-profile fixture rows
  -> additive GameHost sourceProfile diagnostics
  -> legacy GameHost compatibility check
  -> game.html sourceProfile consumer readback
  -> fixture build gate before static artifact copy
  -> central ledger latest-tracker parity row
  -> construct result and scenario bootstrap remain blocked until source parity passes
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T07-19-41-04-00-sourceprofile-readback-ledger-dsk-map.md
.agent/render-audit/2026-07-09T07-19-41-04-00-gamehost-sourceprofile-consumer-readback.md
.agent/gameplay-audit/2026-07-09T07-19-41-04-00-construct-proof-sourceprofile-gate-loop.md
.agent/source-profile-audit/2026-07-09T07-19-41-04-00-sourceprofile-central-ledger-parity-gate.md
.agent/scenario-bootstrap-audit/2026-07-09T07-19-41-04-00-scenario-bootstrap-remains-blocked.md
.agent/deploy-audit/2026-07-09T07-19-41-04-00-sourceprofile-fixture-build-splice-map.md
.agent/trackers/2026-07-09T07-19-41-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T07-19-41-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
package.json
index.html
game.html
scripts/build-static.mjs
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
```

## Next safe ledge

```txt
PhantomCommand SourceProfile Readback Ledger + Fixture Build Consumer Gate
```
