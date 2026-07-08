# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-08T04:40:21-04:00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `PhantomCommand`.

Read this file before changing runtime code.

## Current selection result

The full current `LuminaryLabs-Publish` repo list was compared against the tracked repo state in `LuminaryLabs-Dev/LuminaryLabs`.

The checked Publish repos are represented in central tracking. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`PhantomCommand` was selected by oldest eligible follow-up rotation because its last root-agent normalization left a high-value source-authority gap: `game.html` is still the runtime authority for sequential-ring-v5 construct constants, ring descriptors, piece descriptors, timing, completion phase, camera/input, HUD mutation, and `window.GameHost` diagnostics.

## Current product read

`PhantomCommand` is a static Vite / Three.js single-player PvE undead RTS prototype.

The public route remains:

```txt
index.html
  -> game.html
```

`game.html` imports Three.js from CDN and owns the current opening construct proof inline. The scene builds 10 no-gap rings, 92 stone pieces, the central totem, the Phantom Commander figure, skip/restart controls, HUD progress, camera pan/zoom, and `window.GameHost` state.

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/construct-render-audit.md
.agent/gameplay-audit/construct-to-rts-gap.md
.agent/construct-source-audit/source-authority-fixture-gate.md
.agent/trackers/2026-07-08T04-40-21-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T04-40-21-04-00.md
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

Build the **Construct Source Authority + Scenario Bootstrap Fixture Gate**.

Keep `index.html -> game.html`, the sequential-ring-v5 visual, and `window.GameHost.skipConstruct/restartConstruct/getState` stable while moving profile constants, source fingerprints, ring descriptors, piece descriptors, transition margins, completion results, bootstrap gate results, snapshots, and DOM-free fixtures out of the inline runtime.
