# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-08T02:50:33-04:00`

## Purpose

This folder is the repo-local operating memory for scheduled and manual breakdown work on `PhantomCommand`.

Read this file before changing runtime code.

## Selection reason

`PhantomCommand` was selected from the full `LuminaryLabs-Publish` repo list because the central ledger already tracked it, but the repo was missing the required root `.agent/START_HERE.md`, `current-audit.md`, `known-gaps.md`, `next-steps.md`, and validation entrypoint files.

The current selection rule prefers Publish repos that are new, absent from the ledger, undocumented, or missing root `.agent` audit state before falling back to oldest eligible documented repo selection.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Current product read

`PhantomCommand` is a static Vite / Three.js publish repo for a single-player PvE undead RTS prototype.

The current public flow is:

```txt
index.html
  -> game.html
  -> inline sequential-ring-v5 construct proof
```

The menu route is stable. The live `game.html` scene currently owns renderer setup, construct math, wedge geometry, input, HUD state, animation, and `window.GameHost` inline.

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/construct-render-audit.md
.agent/gameplay-audit/construct-to-rts-gap.md
.agent/trackers/2026-07-08T02-50-33-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T02-50-33-04-00.md
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

Materialize the Construct Source Authority + Scenario Bootstrap Fixture Gate without changing the public look.

Keep `index.html -> game.html`, the sequential-ring-v5 visual, and `window.GameHost.skipConstruct/restartConstruct/getState` stable while moving source profile, ring descriptors, piece descriptors, completion idempotency, bootstrap gating, snapshots, and DOM-free fixtures out of the inline runtime.
