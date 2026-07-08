# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-08T10-58-46-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `PhantomCommand`.

Read this file before changing runtime code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, or missing sampled root `.agent/START_HERE.md` state.

`PhantomCommand` was selected as a fallback follow-up because the current public route has a stable `smooth-ring-handoff-v6` construct proof, but the transition from visual construct completion to typed scenario bootstrap still needs source-owned acceptance records.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       ledgered with root .agent
LuminaryLabs-Publish/HorrorCorridor      ledgered with root .agent
LuminaryLabs-Publish/AetherVale          ledgered with root .agent
LuminaryLabs-Publish/ZombieOrchard       ledgered with root .agent
LuminaryLabs-Publish/TheUnmappedHouse    ledgered with root .agent
LuminaryLabs-Publish/MyCozyIsland        ledgered with root .agent
LuminaryLabs-Publish/TheOpenAbove        ledgered with root .agent
LuminaryLabs-Publish/PhantomCommand      selected fallback follow-up
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     ledgered with root .agent
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
  -> inline wedge factory creates 92 stone pieces
  -> requestAnimationFrame drives construct(seq)
  -> keyboard/mouse/buttons pan, zoom, skip, and restart
  -> HUD mutates count, progress, phase, and status
  -> GameHost exposes skipConstruct/restartConstruct/getState
  -> visual phase becomes command online
```

## Target acceptance loop

```txt
source-owned smooth-ring-handoff-v6 profile
  -> normalized profile
  -> source fingerprint
  -> source snapshot
  -> ring descriptors
  -> piece descriptors
  -> delay/settle/timeline margin descriptors
  -> parity report against game.html live values
  -> ConstructEventEnvelope
  -> ConstructEventResult
  -> ConstructEventJournal
  -> ConstructSnapshot
  -> ScenarioBootstrapCommand
  -> ScenarioBootstrapResult
  -> ScenarioBootstrapSnapshot
  -> additive GameHost diagnostics
  -> DOM-free fixture rows
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/architecture-audit/2026-07-08T10-58-46-04-00-scenario-acceptance-dsk-breakdown.md
.agent/render-audit/construct-render-audit.md
.agent/render-audit/2026-07-08T10-58-46-04-00-gamehost-render-readback.md
.agent/gameplay-audit/construct-to-rts-gap.md
.agent/scenario-bootstrap-audit/2026-07-08T10-58-46-04-00-construct-scenario-acceptance-matrix.md
.agent/trackers/2026-07-08T10-58-46-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T10-58-46-04-00.md
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
PhantomCommand Construct Scenario Acceptance Matrix
```

Keep `index.html -> game.html`, the `smooth-ring-handoff-v6` visual, and `window.GameHost.skipConstruct/restartConstruct/getState` stable while adding source parity, construct result idempotency, scenario bootstrap gating, serializable snapshots, additive diagnostics, and DOM-free fixtures.
