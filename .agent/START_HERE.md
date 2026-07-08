# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-08T15-58-59-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `PhantomCommand`.

Read this file before changing runtime code.

## Current selection result

The accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`PhantomCommand` was selected as the oldest eligible fallback in the current central readback. Its previous central alignment was `2026-07-08T14-08-24-04-00`, and the live construct still needs a source-profile consumer splice before scenario bootstrap or RTS gameplay expansion.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / newer central follow-up observed
LuminaryLabs-Publish/PhantomCommand      selected fallback / previous central update 2026-07-08T14-08-24-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / newer central follow-up observed
```

## Current product read

`PhantomCommand` is a static Vite / Three.js single-player PvE undead RTS prototype.

The live public surface is still:

```txt
index.html
  -> game.html
  -> inline smooth-ring-handoff-v6 construct proof
```

`README.md` describes `index.html` as the main menu, `game.html` as the opening construct scene, and GitHub Pages deployment from `main` through `.github/workflows/deploy-pages.yml`.

`package.json` exposes `start`, `dev`, `build`, and `preview`; `build` runs `node scripts/build-static.mjs`.

`game.html` imports Three.js from CDN and owns the live renderer, scene, fog, lights, camera, HUD, input, construct constants, ring descriptors, wedge geometry, timeline, skip/restart controls, and `window.GameHost` inline.

## Current live construct evidence

```txt
build id: smooth-ring-handoff-v6
rings: 10
ring gaps: all 0
ring parts: [5,5,5,5,6,8,10,12,16,20]
total pieces: 92
total build seconds: 19.923
legacy GameHost: skipConstruct, restartConstruct, getState
```

## Current interaction loop

```txt
open index.html
  -> Start/Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline smooth-ring-handoff-v6 constants define the construct
  -> inline ring math derives 10 no-gap rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge factory creates 92 stone pieces
  -> requestAnimationFrame drives construct(seq)
  -> keyboard/mouse/buttons pan, zoom, skip, and restart
  -> HUD mutates count, progress, phase, and status
  -> GameHost exposes skipConstruct/restartConstruct/getState
  -> visual phase becomes command online
```

## Target source-profile consumer loop

```txt
source-owned smooth-ring-handoff-v6 modules
  -> normalized profile
  -> ring descriptors
  -> piece descriptors
  -> handoff/timeline descriptors
  -> source fingerprint
  -> source snapshot
  -> profile parity report
  -> DOM-free source-profile fixture
  -> additive game.html consumer splice
  -> GameHost sourceProfile diagnostics
  -> later ConstructEventResult and ScenarioBootstrapResult
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T15-58-59-04-00-source-profile-consumer-dsk-breakdown.md
.agent/render-audit/2026-07-08T15-58-59-04-00-gamehost-source-consumer-readback.md
.agent/gameplay-audit/2026-07-08T15-58-59-04-00-construct-to-bootstrap-consumer-gate.md
.agent/source-profile-audit/2026-07-08T15-58-59-04-00-consumer-splice-map.md
.agent/trackers/2026-07-08T15-58-59-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T15-58-59-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
README.md
package.json
index.html
game.html
scripts/build-static.mjs
src/kits/construct-spiral-intro-kit/index.js
tests/construct-spiral-intro-kit-smoke.mjs
.github/workflows/deploy-pages.yml
```

## Main rule

Do not turn the publish repo into a generic kit foundry.

The repo should prove the PhantomCommand game slice. Extract reusable construct, scenario, RTS command, replay, and diagnostics logic only when the local proof is stable, documented, and covered by fixtures.

## Current next safe ledge

```txt
PhantomCommand Source Profile Consumer Splice Map + Fixture Gate
```

Keep `index.html -> game.html`, the `smooth-ring-handoff-v6` visual, and `window.GameHost.skipConstruct/restartConstruct/getState` stable while adding source-profile modules, descriptor parity, source fingerprints, source snapshots, additive GameHost source diagnostics, and a DOM-free source-profile fixture. Do not start scenario bootstrap reducers until this source-profile boundary passes.
