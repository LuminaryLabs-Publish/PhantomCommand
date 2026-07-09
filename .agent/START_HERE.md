# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-09T18-41-55-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `PhantomCommand`.

Read this folder before changing runtime code.

## Current selection result

The current public `LuminaryLabs-Publish` repository list was checked against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local root `.agent` state.

No checked public non-Cavalry repo was new, missing from the central ledger, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`PhantomCommand` was selected as the oldest eligible public documented fallback. Its central ledger was at `2026-07-09T16-29-23-04-00`, older than the other checked eligible public entries after recent updates.

## Public Publish repos checked

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T17-48-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T16-58-52-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T16-38-14-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible public documented fallback / central latest 2026-07-09T16-29-23-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T18-30-30-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T18-11-58-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T18-20-18-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T17-58-53-04-00
```

## Current product read

`PhantomCommand` is a static Vite / Three.js construct proof with two routes:

```txt
index.html
  -> game.html
  -> inline Three.js smooth-ring-handoff-v6 construct runtime
```

The visible construct scene is stable and should not be rewritten first.

The live construct still keeps its source constants, ring math, piece math, timeline, HUD mutation, camera control, input, and `GameHost` state inside `game.html`.

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
  -> npm build fixture gate before static copy
  -> central ledger latest-tracker parity row
```

## First files to read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T18-41-55-04-00-sourceprofile-handoff-dsk-map.md
.agent/render-audit/2026-07-09T18-41-55-04-00-gamehost-sourceprofile-consumer-readback.md
.agent/gameplay-audit/2026-07-09T18-41-55-04-00-construct-sourceprofile-loop.md
.agent/source-profile-audit/2026-07-09T18-41-55-04-00-live-profile-fixture-contract.md
.agent/scenario-bootstrap-audit/2026-07-09T18-41-55-04-00-bootstrap-still-deferred.md
.agent/deploy-audit/2026-07-09T18-41-55-04-00-sourceprofile-fixture-build-gate.md
.agent/trackers/2026-07-09T18-41-55-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T18-41-55-04-00.md
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
