# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-10T18-40-13-04-00`

## Current safe ledge

```txt
PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
```

## Selection result

The full accessible `LuminaryLabs-Publish` inventory contains 10 repositories. All nine eligible non-Cavalry repositories are centrally tracked and have root `.agent` state. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

`PhantomCommand` was selected as the oldest eligible documented fallback.

```txt
PhantomCommand       selected / prior 2026-07-10T17-08-36-04-00
ZombieOrchard        tracked  / 2026-07-10T17-18-47-04-00
TheUnmappedHouse     tracked  / 2026-07-10T17-29-23-04-00
MyCozyIsland         tracked  / 2026-07-10T17-38-35-04-00
TheOpenAbove         tracked  / 2026-07-10T17-51-35-04-00
PrehistoricRush      tracked  / 2026-07-10T18-01-03-04-00
AetherVale           tracked  / 2026-07-10T18-08-37-04-00
IntoTheMeadow        tracked  / 2026-07-10T18-22-01-04-00
HorrorCorridor       tracked  / 2026-07-10T18-31-21-04-00
TheCavalryOfRome     excluded by rule
```

## Product read

`PhantomCommand` is a static Vite browser game with a procedural graveyard menu and a pixel-isometric grave-ring campaign route.

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
  -> scan 3 keys across localStorage and sessionStorage
  -> collapse all candidate evidence into one Boolean
  -> snapshot Continue enabled/note state at page construction
  -> Begin emits campaign=new
  -> Continue emits campaign=continue when the Boolean is true
  -> campaign module ignores session mode and candidate storage
  -> fresh campaign initializes
  -> select units or pads
  -> build towers
  -> order allies
  -> start waves
  -> fixed-step combat/economy/core loop
  -> render world, HUD, minimap, modal, and CRT
  -> victory writes a minimal completion summary
```

## Main finding

The immediate blocker is now the shared Continue-capability boundary.

`hasCampaignSave()` searches six storage slots but returns only a Boolean. It does not preserve candidate key, storage layer, raw payload, parse result, schema family, version, priority, or rejection reason. It is called twice while the menu object is constructed, and the resulting Continue state is not refreshed if storage changes while the menu remains open.

The campaign route independently ignores both the `campaign` query parameter and all candidate storage. A truthful Continue path therefore needs one pure resolver shared by menu admission and campaign startup. That resolver must enumerate every slot, classify candidates, select one by a documented precedence table, expose immutable provenance, and produce the same result in DOM-free fixtures.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T18-40-13-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T18-40-13-04-00.md
.agent/architecture-audit/2026-07-10T18-40-13-04-00-continue-capability-resolver-dsk-map.md
.agent/render-audit/2026-07-10T18-40-13-04-00-continue-provenance-render-gap.md
.agent/gameplay-audit/2026-07-10T18-40-13-04-00-new-continue-session-entry-loop.md
.agent/interaction-audit/2026-07-10T18-40-13-04-00-menu-candidate-admission-map.md
.agent/persistence-audit/2026-07-10T18-40-13-04-00-six-slot-candidate-precedence-matrix.md
.agent/deploy-audit/2026-07-10T18-40-13-04-00-candidate-resolver-fixture-gate.md
```

## Validation state

Documentation only. Runtime source, package scripts, dependencies, routes, rendering behavior, persistence behavior, and deployment configuration did not change. No branch or pull request was created.