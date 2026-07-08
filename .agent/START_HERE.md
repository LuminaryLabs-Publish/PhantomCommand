# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-08T07:50:47-04:00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `PhantomCommand`.

Read this file before changing runtime code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, or missing root `.agent/START_HERE.md` state.

`PhantomCommand` was selected as a fallback follow-up target because it still has an unresolved construct-result and scenario-bootstrap authority seam: the current scene reaches `command online` visually, but construct completion and scenario bootstrap are not yet typed command/result records that can be fixture-tested without DOM, canvas, or Three.js.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Current product read

`PhantomCommand` is a static Vite / Three.js single-player PvE undead RTS prototype.

The current public surface is:

```txt
index.html
  -> game.html
  -> inline smooth-ring-handoff-v6 construct proof
```

`index.html` renders the main menu and routes Start / Open Scene into `game.html`.

`game.html` imports Three.js from CDN and owns the opening construct proof inline: renderer, camera, scene, fog, lights, HUD, input, construct constants, ring descriptors, wedge geometry, construct timing, skip/restart, and `window.GameHost`.

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
  -> Three.js scene initializes inline
  -> smooth-ring-handoff-v6 constants define the construct
  -> inline ring math derives 10 no-gap rings
  -> inline wedge factory creates 92 stone pieces
  -> requestAnimationFrame drives construct(seq)
  -> keyboard/mouse/buttons pan, zoom, skip, and restart
  -> HUD mutates count, progress, phase, and status
  -> GameHost exposes skipConstruct/restartConstruct/getState
  -> visual phase becomes command online
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/architecture-audit/2026-07-08T07-50-47-04-00-dsk-domain-breakdown.md
.agent/render-audit/construct-render-audit.md
.agent/render-audit/2026-07-08T07-50-47-04-00-construct-render-handoff.md
.agent/gameplay-audit/construct-to-rts-gap.md
.agent/construct-source-audit/source-authority-fixture-gate.md
.agent/construct-source-audit/smooth-handoff-v6-source-drift.md
.agent/scenario-bootstrap-audit/construct-result-fixture-matrix.md
.agent/trackers/2026-07-08T07-50-47-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T07-50-47-04-00.md
.agent/kit-registry.json
```

## Prior high-value entries

```txt
.agent/trackers/2026-07-08T06-19-51-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T06-19-51-04-00.md
.agent/trackers/2026-07-08T04-40-21-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T04-40-21-04-00.md
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
PhantomCommand Construct Result + Scenario Bootstrap Fixture Gate
```

Keep `index.html -> game.html`, the `smooth-ring-handoff-v6` visual, and `window.GameHost.skipConstruct/restartConstruct/getState` stable while adding source profile parity, construct event result idempotency, scenario bootstrap gating, serializable snapshots, and DOM-free fixtures.
