# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-08T12-41-31-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `PhantomCommand`.

Read this file before changing runtime code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, or missing sampled root `.agent/START_HERE.md` state.

`PhantomCommand` was selected as the oldest eligible fallback because its previous central follow-up was older than the sampled non-Cavalry Publish repos, and the current public route still needs source-profile ownership before scenario bootstrap or RTS gameplay expansion.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled follow-up 2026-07-08T12:01:23-04:00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled follow-up 2026-07-08T12:29:17-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled follow-up 2026-07-08T12:21:20-04:00
LuminaryLabs-Publish/MyCozyIsland        tracked / root .agent present / latest sampled follow-up 2026-07-08T11:40:00-04:00
LuminaryLabs-Publish/PhantomCommand      selected fallback / previous central update 2026-07-08T10:58:46-04:00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled follow-up 2026-07-08T12:09:27-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled follow-up 2026-07-08T11:49:04-04:00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled follow-up 2026-07-08T11:28:38-04:00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled follow-up 2026-07-08T11:19:53-04:00
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

## Target source-profile boundary loop

```txt
source-owned smooth-ring-handoff-v6 profile
  -> normalized profile
  -> source fingerprint
  -> source snapshot
  -> ring descriptors
  -> piece descriptors
  -> timing descriptors
  -> profile parity report
  -> additive GameHost source diagnostics
  -> DOM-free source-profile fixture
  -> later ConstructEventResult and ScenarioBootstrapResult
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/architecture-audit/2026-07-08T12-41-31-04-00-dsk-domain-breakdown.md
.agent/render-audit/construct-render-audit.md
.agent/render-audit/2026-07-08T12-41-31-04-00-gamehost-source-profile-readback.md
.agent/gameplay-audit/construct-to-rts-gap.md
.agent/scenario-bootstrap-audit/2026-07-08T12-41-31-04-00-source-profile-implementation-boundary.md
.agent/trackers/2026-07-08T12-41-31-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T12-41-31-04-00.md
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
PhantomCommand Source Profile Implementation Boundary
```

Keep `index.html -> game.html`, the `smooth-ring-handoff-v6` visual, and `window.GameHost.skipConstruct/restartConstruct/getState` stable while adding source-profile modules, descriptor parity, source fingerprints, source snapshots, additive GameHost diagnostics, and a DOM-free source-profile fixture. Do not start scenario bootstrap reducers until this source-profile boundary passes.