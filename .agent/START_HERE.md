# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-10T20-19-35-04-00`

## Current implementation queue

```txt
1. PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. PhantomCommand Campaign Action Result Authority + Fixed-Step Frame Fixture Gate
```

The first item remains the queue head because the menu still exposes a stale Boolean Continue capability while the campaign ignores session intent. This pass makes the next campaign-internal proof boundary implementation-ready.

## Selection result

The full accessible `LuminaryLabs-Publish` inventory contains ten repositories. All nine eligible non-Cavalry repositories are centrally tracked and have root `.agent` state. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

`PhantomCommand` was selected as the oldest eligible documented fallback.

```txt
PhantomCommand       selected / prior 2026-07-10T18-40-13-04-00
ZombieOrchard        tracked  / 2026-07-10T18-49-54-04-00
TheUnmappedHouse     tracked  / 2026-07-10T19-00-19-04-00
MyCozyIsland         tracked  / 2026-07-10T19-11-19-04-00
PrehistoricRush      tracked  / 2026-07-10T19-30-36-04-00
AetherVale           tracked  / 2026-07-10T19-38-41-04-00
IntoTheMeadow        tracked  / 2026-07-10T19-48-39-04-00
TheOpenAbove         tracked  / 2026-07-10T19-58-34-04-00
HorrorCorridor       tracked  / 2026-07-10T20-08-46-04-00
TheCavalryOfRome     excluded by rule
```

## Product read

`PhantomCommand` is a static Vite browser game with a procedural graveyard menu and a pixel-isometric grave-ring campaign.

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html?campaign=new|continue
  -> src/campaign/campaign-scene.js
```

The campaign uses a `640 x 360` source canvas, seven rings, four lanes, 58 generated build pads, six starter allies, three tower types, seven unit archetypes, six waves, fixed `1/60` simulation, HUD, minimap, modal overlays, CRT presentation, victory-only persistence, and `window.GameHost` diagnostics.

## Current interaction loop

```txt
open menu
  -> read settings
  -> scan 3 keys across 2 storage layers twice
  -> collapse candidate evidence into Boolean Continue state
  -> emit campaign=new or campaign=continue route
  -> campaign ignores route intent and initializes fresh
  -> pointer and keyboard events mutate live campaign state
  -> select allies or pads
  -> repeated pad click implicitly attempts build
  -> right-click implicitly attempts order
  -> Space implicitly attempts wave start
  -> fixed-step combat/economy/core simulation
  -> render live state through world, HUD, minimap, modal, and CRT
  -> expose mutable state/camera and aggregate GameHost counters
  -> victory writes a minimal completion summary
```

## Main finding

The Continue resolver remains unresolved. The newly mapped campaign blocker is action authority: `selectAt()`, `build()`, `order()`, and `startWave()` directly mutate live state and return no typed result. Invalid build, order, and wave-start requests silently return, and repeated pad selection hides a build request inside selection logic.

Browser events also apply gameplay mutations outside the fixed-step queue. No command sequence, target tick, accepted/rejected result, journal, state fingerprint, committed frame, render-consumption row, or correlated GameHost observation exists. Current checks only inspect source patterns.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T20-19-35-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T20-19-35-04-00.md
.agent/architecture-audit/2026-07-10T20-19-35-04-00-campaign-action-result-authority-dsk-map.md
.agent/render-audit/2026-07-10T20-19-35-04-00-committed-frame-render-consumption-gap.md
.agent/gameplay-audit/2026-07-10T20-19-35-04-00-action-precondition-result-loop.md
.agent/interaction-audit/2026-07-10T20-19-35-04-00-pointer-keyboard-command-admission-map.md
.agent/command-authority-audit/2026-07-10T20-19-35-04-00-action-sequence-rejection-journal-contract.md
.agent/deploy-audit/2026-07-10T20-19-35-04-00-action-fixture-build-gate.md
```

## Validation state

Documentation only. Runtime source, package scripts, dependencies, routes, gameplay, rendering, persistence, and deployment configuration did not change. No branch or pull request was created.