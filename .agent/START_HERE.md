# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-10T23-40-35-04-00`

## Current implementation queue

```txt
1. PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. PhantomCommand Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. PhantomCommand Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. PhantomCommand Versioned Save Envelope + Atomic Resume Fidelity Gate
```

Continue resolution remains first because the menu exposes raw Boolean save presence while the campaign ignores `campaign=new|continue`. This pass makes the second slice implementation-ready: every browser, host, and replay request must become a sequenced command with a deterministic target tick, typed result, journal row, state fingerprint, and committed-frame consumption proof.

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

All nine eligible non-Cavalry repositories are centrally tracked and have root `.agent` state. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded. `PhantomCommand` was selected as the oldest eligible documented repository from its prior central timestamp, `2026-07-10T21-49-26-04-00`.

## Product read

`PhantomCommand` is a static Vite browser game with a procedural graveyard menu and a pixel-isometric grave-ring campaign.

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html?campaign=new|continue
  -> src/campaign/campaign-scene.js
```

The live campaign uses a `640 x 360` source canvas, seven rings, four lanes, 58 generated build pads, six starter allies, three tower types, seven unit archetypes, six waves, fixed `1/60` simulation, HUD, minimap, modal overlays, CRT presentation, victory-only persistence, and `window.GameHost` diagnostics.

## Current interaction loop

```txt
menu constructs settings, save presence, art, CRT, audio, listeners, and RAF
  -> Begin or Continue fades and navigates
  -> campaign constructs descriptors, live state, CRT, listeners, and RAF
  -> pointer, keyboard, and GameHost paths mutate live state directly
  -> accumulator advances fixed 1/60 simulation steps
  -> render consumes live state through world, HUD, minimap, modal, and CRT
  -> terminal state freezes update
  -> reload or navigation replaces the route
```

## Current architecture findings

### Queue head

The menu scans three keys across local and session storage, collapses the evidence into Boolean presence, and the campaign does not parse or hydrate the requested session mode.

### Fixed-step command authority

`selectAt()`, `build()`, `order()`, and `startWave()` mutate live state and return no accepted, rejected, or no-op result. Selection and building are coupled. Browser callbacks and GameHost methods have no common command adapter, sequence, target tick, journal, or fingerprint.

```txt
input callback
  -> direct state mutation
  -> fixed-step update may run before or after depending on browser timing
  -> render reads the same mutable state
```

The fixed-step accumulator therefore stabilizes integration but not command ordering or replay.

### Committed-frame proof

World, HUD, minimap, modal, CRT upload/draw, and GameHost readback do not reference one immutable committed frame ID and fingerprint.

### Runtime lifecycle

Both routes still construct eagerly, install unowned listeners, and recursively request frames without retaining request IDs. No route session exposes startup rollback, stop, dispose, restart, or resource-release proof.

## Required action boundary

```txt
source request
  -> CampaignCommand
  -> sequence
  -> target tick
  -> pure preflight
  -> accepted/rejected/no-op result
  -> fixed-step queue application
  -> ordered events
  -> canonical fingerprint
  -> immutable committed frame
  -> render and GameHost consumption rows
```

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-10T23-40-35-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T23-40-35-04-00.md
.agent/architecture-audit/2026-07-10T23-40-35-04-00-fixed-step-command-authority-dsk-map.md
.agent/render-audit/2026-07-10T23-40-35-04-00-committed-frame-render-consumption-gap.md
.agent/gameplay-audit/2026-07-10T23-40-35-04-00-command-preflight-result-loop.md
.agent/interaction-audit/2026-07-10T23-40-35-04-00-input-host-command-admission-map.md
.agent/action-authority-audit/2026-07-10T23-40-35-04-00-command-sequence-target-tick-contract.md
.agent/deploy-audit/2026-07-10T23-40-35-04-00-fixed-step-replay-fixture-gate.md
```

## Validation state

Documentation only. Runtime source, package scripts, dependencies, routes, gameplay, rendering, persistence, and deployment configuration did not change. No branch or pull request was created. Runtime and browser fixtures remain absent and were not run.
