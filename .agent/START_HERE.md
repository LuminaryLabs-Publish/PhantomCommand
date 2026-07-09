# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-09T16-29-23-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `PhantomCommand`.

Read this folder before changing runtime code.

## Current selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local `.agent/START_HERE.md` state where needed.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`PhantomCommand` was selected because the repo-local `.agent` had advanced to `2026-07-09T16-25-16-04-00`, while the central `LuminaryLabs-Dev/LuminaryLabs` ledger still pointed at `2026-07-09T13-00-37-04-00` at read time. This made it the highest-priority central-ledger source-profile pointer repair target.

This pass keeps runtime source unchanged and refreshes the next implementation target around source-owned `smooth-ring-handoff-v6` profile parity, additive `GameHost` source-profile readback, DOM-free fixture rows, build fixture gating, and central ledger sync.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T16-00-13-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       selected / central-ledger pointer repair / central latest 2026-07-09T13-00-37-04-00 before this run / repo-local latest 2026-07-09T16-25-16-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T15-31-40-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T13-38-15-04-00
```

## Current product read

`PhantomCommand` is a static Vite/Three.js construct proof with two routes:

```txt
index.html
  -> game.html
  -> inline Three.js smooth-ring-handoff-v6 construct runtime
```

The visible construct scene is stable and should not be rewritten first.

The live construct still keeps its source constants, ring math, piece math, construct timeline, HUD mutation, camera control, input, and `GameHost` state inside `game.html`.

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
  -> construct(seq) animates each piece by ring delay plus part delay
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
  -> npm build runs fixture before static copy
  -> central ledger latest-tracker parity row
  -> construct result and scenario bootstrap remain blocked until source parity passes
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T16-29-23-04-00-central-ledger-sourceprofile-readback-dsk-map.md
.agent/render-audit/2026-07-09T16-29-23-04-00-gamehost-sourceprofile-readback-refresh.md
.agent/gameplay-audit/2026-07-09T16-29-23-04-00-construct-proof-source-profile-loop.md
.agent/source-profile-audit/2026-07-09T16-29-23-04-00-live-v6-profile-ledger-parity.md
.agent/scenario-bootstrap-audit/2026-07-09T16-29-23-04-00-bootstrap-deferred-by-source-proof.md
.agent/deploy-audit/2026-07-09T16-29-23-04-00-sourceprofile-fixture-build-central-sync.md
.agent/trackers/2026-07-09T16-29-23-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T16-29-23-04-00.md
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