# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-08T18-41-41-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `PhantomCommand`.

Read this file before changing runtime code.

## Current selection result

The accessible `LuminaryLabs-Publish` repository set was checked against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from central tracking, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`PhantomCommand` was selected because central repo-ledger state still pointed at `2026-07-08T15-58-59-04-00` while repo-local state had already advanced to `2026-07-08T18-29-21-04-00`. This pass keeps one-repo scope and advances the same source-profile gate into an exact fixture manifest + central ledger sync handoff.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          tracked / latest central update 2026-07-08T17-49-51-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / latest central update 2026-07-08T18-19-43-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / latest central update 2026-07-08T18-09-21-04-00
LuminaryLabs-Publish/MyCozyIsland        tracked / latest central update 2026-07-08T17-09-48-04-00
LuminaryLabs-Publish/PhantomCommand      selected / central ledger catch-up + source-profile fixture manifest
LuminaryLabs-Publish/PrehistoricRush     tracked / latest central update 2026-07-08T16-51-11-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked / latest central update 2026-07-08T17-31-22-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / latest central update 2026-07-08T16-19-57-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / latest central update 2026-07-08T16-20-00-04-00
```

## Current product read

`PhantomCommand` is a static Vite / Three.js single-player PvE undead RTS prototype.

The live public surface is still:

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
  -> DOM-free fixture rows
  -> game.html additive sourceProfile consumer readback
  -> central ledger and repo-local kit registry point at the same fixture gate
  -> ConstructEventResult blocker remains deferred until sourceProfile parity is proven
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T18-41-41-04-00-source-profile-fixture-manifest-dsk-breakdown.md
.agent/render-audit/2026-07-08T18-41-41-04-00-gamehost-source-profile-consumer-readback.md
.agent/gameplay-audit/2026-07-08T18-41-41-04-00-construct-result-bootstrap-blocker.md
.agent/source-profile-audit/2026-07-08T18-41-41-04-00-source-profile-fixture-manifest.md
.agent/scenario-bootstrap-audit/2026-07-08T18-41-41-04-00-scenario-bootstrap-blocker-contract.md
.agent/deploy-audit/2026-07-08T18-41-41-04-00-fixture-script-build-integration.md
.agent/trackers/2026-07-08T18-41-41-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T18-41-41-04-00.md
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

Keep `index.html -> game.html`, the live `smooth-ring-handoff-v6` visual, `window.GameHost.skipConstruct`, `window.GameHost.restartConstruct`, and legacy `window.GameHost.getState()` fields stable.

Do not add scenario bootstrap, unit control, economy, wave, objective, or render extraction until source-profile fixture rows prove profile constants, ring descriptors, piece descriptors, timeline descriptors, source fingerprint, source snapshot, parity report, and additive GameHost readback.

## Current next safe ledge

```txt
PhantomCommand Source Profile Fixture Manifest + Central Ledger Sync Gate
```

Stop that ledge when DOM-free fixture rows prove build id, ring count, zero gaps, part counts, 92 pieces, 19.923 total seconds, handoff values, ring start times, source fingerprint stability, source snapshot serialization, parity report shape, additive GameHost source diagnostics, unchanged legacy GameHost compatibility, and central ledger readback points to the same latest repo-local fixture gate.
