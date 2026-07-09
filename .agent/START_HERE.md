# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-09T10-29-02-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `PhantomCommand`.

Read this folder before changing runtime code.

## Current selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger entries and sampled repo-local `.agent` state.

No checked non-Cavalry Publish repo was fully new, absent from central tracking, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`PhantomCommand` was selected as the oldest eligible central-ledger fallback among the checked non-Cavalry repos. Its central ledger had just been aligned to `2026-07-09T10-20-44-04-00`, but it remains the oldest current fallback after the latest Publish repo comparison.

This pass keeps runtime code unchanged and refreshes the next implementation target around source-profile ledger parity, additive GameHost readback, and fixture build-gate proof before any RTS or scenario bootstrap work.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T09-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T09-59-27-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T08-50-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T07-41-29-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T08-02-33-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T08-29-38-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T09-36-24-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible central fallback / central latest 2026-07-09T10-20-44-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T09-10-50-04-00
```

## Current product read

`PhantomCommand` is a static Vite/Three.js construct proof with two routes:

```txt
index.html
  -> game.html
  -> inline Three.js smooth-ring-handoff-v6 construct runtime
```

The visible construct scene is stable and should not be rewritten first.

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
.agent/architecture-audit/2026-07-09T10-29-02-04-00-sourceprofile-ledger-parity-dsk-map.md
.agent/render-audit/2026-07-09T10-29-02-04-00-gamehost-sourceprofile-consumer-readback.md
.agent/gameplay-audit/2026-07-09T10-29-02-04-00-construct-profile-result-blocker-loop.md
.agent/source-profile-audit/2026-07-09T10-29-02-04-00-live-v6-ledger-parity-contract.md
.agent/scenario-bootstrap-audit/2026-07-09T10-29-02-04-00-construct-result-precondition-freeze.md
.agent/deploy-audit/2026-07-09T10-29-02-04-00-sourceprofile-fixture-build-gate.md
.agent/trackers/2026-07-09T10-29-02-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T10-29-02-04-00.md
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
