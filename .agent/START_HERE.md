# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-10T15-38-40-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for breakdown and implementation work on `PhantomCommand`.

Read it before changing runtime code. Push only to `main`; do not create branches.

## Selection result

The complete accessible `LuminaryLabs-Publish` inventory contains 10 repositories. All nine eligible non-Cavalry repositories have central ledger entries and root `.agent/START_HERE.md` state. `TheCavalryOfRome` remains excluded.

`PhantomCommand` was selected as the oldest eligible documented fallback because its prior central timestamp was `2026-07-10T14-11-51-04-00`; every other eligible repo had a newer central audit timestamp.

## Product read

`PhantomCommand` is a static Vite browser game with a menu route and a pixel-isometric grave-ring campaign route:

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html?campaign=new|continue
  -> src/campaign/campaign-scene.js
```

The campaign uses a `640 x 360` source canvas, seven rings, four enemy lanes, 58 generated build pads, six starter allies, three tower types, seven unit archetypes, six waves, a fixed `1/60` simulation step, HUD, minimap, CRT presentation, win-only persistence, and `window.GameHost` diagnostics.

## Current interaction loop

```txt
open menu
  -> read settings
  -> detect save presence
  -> Begin emits campaign=new
  -> Continue emits campaign=continue
  -> campaign module ignores session mode and save hydration
  -> fresh campaign initializes
  -> select units or pads
  -> build towers
  -> order allies
  -> start waves
  -> fixed-step combat/economy/core loop
  -> render world, HUD, minimap, modal, CRT
  -> victory writes minimal completion payload
```

## Current main finding

The menu exposes a Continue intent but the campaign has no continuation authority. It does not parse `campaign=continue`, validate or hydrate a save, or distinguish resumable state from legacy completion summaries.

Campaign commands are also untyped and uncorrelated: rejected `build`, `order`, and `startWave` branches are silent; pad selection and build are combined; no command journal links player intent to simulation frames and render output; and `GameHost` exposes direct mutable state rather than immutable session and command readback.

## First files to read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T15-38-40-04-00-campaign-session-command-correlation-dsk-map.md
.agent/render-audit/2026-07-10T15-38-40-04-00-session-frame-render-readback-gap.md
.agent/gameplay-audit/2026-07-10T15-38-40-04-00-new-continue-wave-command-loop.md
.agent/interaction-audit/2026-07-10T15-38-40-04-00-command-intent-result-correlation-map.md
.agent/session-authority-audit/2026-07-10T15-38-40-04-00-new-continue-save-contract.md
.agent/deploy-audit/2026-07-10T15-38-40-04-00-session-fixture-check-build-gate.md
.agent/trackers/2026-07-10T15-38-40-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T15-38-40-04-00.md
.agent/kit-registry.json
```

## Next safe ledge

```txt
PhantomCommand Campaign Session Authority + Command Correlation Fixture Gate
```

Complete that proof boundary before new waves, economy expansion, save/load UX work, camera rewrites, renderer replacement, enemy art expansion, or legacy construct-profile work.
