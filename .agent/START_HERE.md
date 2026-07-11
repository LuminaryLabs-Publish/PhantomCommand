# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-10T21-49-26-04-00`

## Current implementation queue

```txt
1. PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. PhantomCommand Campaign Action Result Authority + Fixed-Step Frame Fixture Gate
3. PhantomCommand Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. PhantomCommand Versioned Save Envelope + Atomic Resume Fidelity Gate
```

Continue resolution remains first because the menu exposes a Boolean capability while the campaign ignores route intent. Action-result authority remains second because gameplay commands need deterministic results before lifecycle can reject terminal or stale-session requests consistently. This pass makes route lifecycle and resource ownership implementation-ready.

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. All nine eligible non-Cavalry repositories are centrally tracked and have root `.agent` state. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

```txt
PhantomCommand       selected / prior 2026-07-10T20-19-35-04-00
ZombieOrchard        tracked  / 2026-07-10T20-30-23-04-00
TheUnmappedHouse     tracked  / 2026-07-10T20-38-24-04-00
MyCozyIsland         tracked  / 2026-07-10T20-48-55-04-00
PrehistoricRush      tracked  / 2026-07-10T21-00-16-04-00
AetherVale           tracked  / 2026-07-10T21-08-52-04-00
IntoTheMeadow        tracked  / 2026-07-10T21-19-36-04-00
TheOpenAbove         tracked  / 2026-07-10T21-31-01-04-00
HorrorCorridor       tracked  / 2026-07-10T21-39-22-04-00
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
menu module constructs source canvas, art, CRT renderer, state, listeners, optional audio, and RAF loop
  -> Begin or Continue starts fade and browser navigation
  -> campaign module constructs descriptors, fresh mutable state, CRT renderer, listeners, and RAF loop
  -> pointer and keyboard callbacks mutate camera or campaign state
  -> fixed 1/60 simulation updates
  -> world, HUD, minimap, modal, and CRT render
  -> win/loss freezes simulation
  -> R reloads or Escape navigates to menu
```

## Main findings

### Queue head

The menu scans three keys across two storage layers, collapses evidence into Boolean presence, and the campaign ignores `campaign=new|continue`.

### Campaign action authority

`selectAt()`, `build()`, `order()`, and `startWave()` mutate live state and return no typed accepted, rejected, or no-op result. Browser and GameHost actions are not sequenced to fixed simulation ticks or committed frames.

### Runtime lifecycle authority

Both routes construct at module evaluation, install listeners, and recursively request animation frames without retaining frame IDs. The menu owns AudioContext resources. Both routes own CRT WebGL programs, buffers, textures, and shaders. No route host provides `stop()`, `dispose()`, startup rollback, restart, lifecycle state, resource ownership, or idempotency proof. Reload/navigation is currently the only cleanup boundary.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T21-49-26-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T21-49-26-04-00.md
.agent/architecture-audit/2026-07-10T21-49-26-04-00-runtime-session-lifecycle-authority-dsk-map.md
.agent/render-audit/2026-07-10T21-49-26-04-00-crt-resource-disposal-frame-loop-gap.md
.agent/gameplay-audit/2026-07-10T21-49-26-04-00-menu-campaign-session-start-stop-reentry-loop.md
.agent/interaction-audit/2026-07-10T21-49-26-04-00-listener-route-transition-lifecycle-map.md
.agent/lifecycle-audit/2026-07-10T21-49-26-04-00-menu-campaign-stop-dispose-restart-contract.md
.agent/deploy-audit/2026-07-10T21-49-26-04-00-lifecycle-idempotency-fixture-gate.md
```

## Validation state

Documentation only. Runtime source, package scripts, dependencies, routes, gameplay, rendering, persistence, and deployment configuration did not change. No branch or pull request was created.