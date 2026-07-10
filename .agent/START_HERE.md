# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-10T17-08-36-04-00`

## Purpose

This root `.agent/` folder is the repo-local operating memory for architecture, interaction, rendering, persistence, validation, and deployment work on `PhantomCommand`.

Read it before changing runtime code. Push only to `main`; do not create branches.

## Selection result

The full accessible `LuminaryLabs-Publish` inventory contains 10 repositories. All nine eligible non-Cavalry repositories are centrally tracked and have root `.agent` state. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

`PhantomCommand` was selected as the oldest eligible documented fallback. A newer repo-local `HorrorCorridor` audit at `2026-07-10T17-00-54-04-00` was treated as fresh activity even though its central ledger had not yet caught up.

```txt
PhantomCommand       selected / prior central activity 2026-07-10T15-38-40-04-00
ZombieOrchard        tracked  / 2026-07-10T15-55-49-04-00
TheUnmappedHouse     tracked  / 2026-07-10T16-07-30-04-00
MyCozyIsland         tracked  / 2026-07-10T16-17-08-04-00
TheOpenAbove         tracked  / 2026-07-10T16-28-54-04-00
PrehistoricRush      tracked  / 2026-07-10T16-37-25-04-00
AetherVale           tracked  / 2026-07-10T16-48-42-04-00
IntoTheMeadow        tracked  / 2026-07-10T16-51-37-04-00
HorrorCorridor       repo-local fresh / 2026-07-10T17-00-54-04-00
TheCavalryOfRome     excluded by rule
```

## Product read

`PhantomCommand` is a static Vite browser game with a graveyard menu and a pixel-isometric grave-ring campaign route:

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html?campaign=new|continue
  -> src/campaign/campaign-scene.js
```

The campaign uses a `640 x 360` source canvas, seven rings, four lanes, 58 generated build pads, six starter allies, three tower types, seven unit archetypes, six waves, a fixed `1/60` simulation step, HUD, minimap, CRT presentation, win-only persistence, and `window.GameHost` diagnostics.

## Current interaction loop

```txt
open menu
  -> read settings
  -> detect raw save-key presence across localStorage and sessionStorage
  -> Begin emits campaign=new
  -> Continue emits campaign=continue when any candidate key exists
  -> campaign module ignores session mode and save candidates
  -> fresh campaign initializes
  -> select units or pads
  -> build towers
  -> order allies
  -> start waves
  -> fixed-step combat/economy/core loop
  -> render world, HUD, minimap, modal, CRT
  -> victory writes a minimal completion summary
```

## Current main finding

The immediate blocker is save-admission and resume-fidelity authority.

The menu treats any value under `phantomCommand.save`, `nexus.sceneSnapshot`, or `phantom.command.campaign` in either storage layer as resumable. The campaign reads none of them. Its only write is a victory summary containing `scene`, `souls`, and `wave`, which cannot reconstruct a live campaign.

A correct Continue path therefore needs candidate classification, a versioned resumable envelope, deterministic hydration, explicit fallback results, full-state fingerprint parity, and immutable session readback before command-correlation or content expansion proceeds.

## First files to read next

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-10T17-08-36-04-00-save-admission-resume-fidelity-dsk-map.md
.agent/render-audit/2026-07-10T17-08-36-04-00-session-provenance-render-readback-gap.md
.agent/gameplay-audit/2026-07-10T17-08-36-04-00-continue-hydrate-resume-loop.md
.agent/interaction-audit/2026-07-10T17-08-36-04-00-continue-admission-result-map.md
.agent/session-authority-audit/2026-07-10T17-08-36-04-00-save-candidate-classification-contract.md
.agent/persistence-audit/2026-07-10T17-08-36-04-00-resume-state-coverage-matrix.md
.agent/deploy-audit/2026-07-10T17-08-36-04-00-save-admission-resume-fixture-gate.md
.agent/trackers/2026-07-10T17-08-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T17-08-36-04-00.md
.agent/kit-registry.json
```

## Next safe ledge

```txt
PhantomCommand Save Admission Authority + Resume Fidelity Fixture Gate
```

Complete that proof boundary before command journaling, new waves, economy expansion, save/load UX redesign, camera rewrites, renderer replacement, enemy art expansion, multiplayer expansion, or legacy construct-profile work.
