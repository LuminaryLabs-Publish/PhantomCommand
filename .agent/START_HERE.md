# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-09T04-38-39-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `PhantomCommand`.

Read this file before changing runtime code.

## Current selection result

The accessible `LuminaryLabs-Publish` repository set was checked against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from central tracking, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`PhantomCommand` was selected because the central ledger was stale relative to repo-local `.agent` state: central still pointed at `2026-07-09T01-28-10-04-00`, while the repo-local root had already advanced to `2026-07-09T04-24-06-04-00`. This pass advances both repo-local docs and central tracking to the current source-profile fixture/readback gate.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central latest observed 2026-07-09T04-19-00-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central latest observed 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central latest observed 2026-07-09T03-29-29-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      selected / tracked / root .agent present / central stale at 2026-07-09T01-28-10-04-00 / repo-local previous 2026-07-09T04-24-06-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central latest observed 2026-07-09T03-10-05-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central latest observed 2026-07-09T02-05-52-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central latest observed 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / central latest observed 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / central latest observed 2026-07-09T02-11-07-04-00
```

## Current product read

`PhantomCommand` is a static Vite / Three.js single-player PvE undead RTS prototype shell.

The live public surface remains a two-route static proof:

```txt
index.html
  -> game.html
  -> inline smooth-ring-handoff-v6 construct scene
```

The current player loop is a construct-viewer loop: open menu, enter the construct scene, watch the stone platform assemble, pan/zoom, skip/restart, and stop at `command online`.

## Current interaction loop

```txt
open index.html
  -> main menu renders title, subtitle, Start button, and Open Scene link
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline smooth-ring-handoff-v6 constants create 10 no-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates pieces by ringStartTimes and partIndex * PART_STAGGER
  -> WASD/arrows pan the camera
  -> mouse wheel zooms
  -> Space/Skip completes the construct
  -> R/Restart resets the construct
  -> HUD reports constructed count, phase, build id, and progress
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
```

## Target proof loop

```txt
source-owned smooth-ring-handoff-v6 profile
  -> normalizeSmoothHandoffProfile
  -> derivePhantomCommandRingDescriptors
  -> derivePhantomCommandPieceDescriptors
  -> derivePhantomCommandTimelineContract
  -> derivePhantomCommandSourceFingerprint
  -> createPhantomCommandSourceSnapshot
  -> createPhantomCommandProfileParityReport
  -> createGameHostSourceProfileDiagnostics
  -> DOM-free sourceProfile fixture rows
  -> package build fixture execution
  -> game.html additive sourceProfile consumer readback
  -> legacy GameHost compatibility proof
  -> central ledger latest-tracker readback
  -> ConstructEventResult stays blocked until sourceProfile parity passes
  -> scenario bootstrap remains deferred
```

## First files to read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T04-38-39-04-00-sourceprofile-fixture-build-gate-dsk-map.md
.agent/render-audit/2026-07-09T04-38-39-04-00-gamehost-sourceprofile-consumer-readback.md
.agent/gameplay-audit/2026-07-09T04-38-39-04-00-construct-result-blocker-loop.md
.agent/source-profile-audit/2026-07-09T04-38-39-04-00-sourceprofile-fixture-build-gate-contract.md
.agent/scenario-bootstrap-audit/2026-07-09T04-38-39-04-00-bootstrap-remains-blocked.md
.agent/deploy-audit/2026-07-09T04-38-39-04-00-fixture-build-before-static-artifact.md
.agent/trackers/2026-07-09T04-38-39-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T04-38-39-04-00.md
.agent/kit-registry.json
```

## Source files to inspect before implementation

```txt
README.md
package.json
index.html
game.html
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
scripts/build-static.mjs
.github/workflows/deploy-pages.yml
```

## Source files to add next

```txt
src/kits/phantom-command-smooth-handoff-profile-kit/index.js
src/kits/phantom-command-ring-descriptor-kit/index.js
src/kits/phantom-command-piece-descriptor-kit/index.js
src/kits/phantom-command-handoff-timeline-contract-kit/index.js
src/kits/phantom-command-source-profile-fingerprint-kit/index.js
src/kits/phantom-command-source-profile-snapshot-kit/index.js
src/kits/phantom-command-profile-parity-report-kit/index.js
src/kits/phantom-command-gamehost-source-diagnostics-kit/index.js
tests/phantom-command-source-profile-fixture.mjs
```

## Main rule

Do not begin RTS gameplay, scenario bootstrap, renderer extraction, or shared-kit promotion until the source-profile fixture and legacy GameHost consumer readback prove the live construct profile values without DOM/canvas/Three.js dependencies.
