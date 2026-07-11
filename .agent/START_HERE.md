# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-11T01-20-51-04-00`

## Current implementation queue

```txt
1. PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. PhantomCommand Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. PhantomCommand Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. PhantomCommand Versioned Save Envelope + Atomic Resume Fidelity Gate
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state. `PhantomCommand` was selected as the oldest current documented fallback from its prior central timestamp, `2026-07-10T23-40-35-04-00`.

## Product read

`PhantomCommand` is a static Vite browser RTS prototype with a procedural graveyard menu and a pixel-isometric grave-ring campaign.

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html?campaign=new|continue
  -> src/campaign/campaign-scene.js
```

The campaign uses a `640 x 360` source canvas, seven rings, four lanes, generated build pads, six starter allies, three tower types, seven unit archetypes, six waves, exact `1/60` simulation, HUD, minimap, terminal modal, CRT presentation, victory-summary persistence, and `window.GameHost` diagnostics.

## Current interaction loop

```txt
menu evaluates
  -> reads settings
  -> scans 3 keys x 2 storage layers
  -> collapses evidence to Boolean Continue capability
  -> constructs art, CRT, audio, listeners, and RAF
  -> emits campaign=new or campaign=continue
  -> campaign ignores route intent
  -> constructs the same fresh state
  -> pointer, keyboard, and GameHost paths mutate live state
  -> fixed 1/60 simulation advances
  -> world, HUD, minimap, modal, CRT, and GameHost expose uncorrelated mutable observations
  -> victory writes a three-field completion summary
```

## Queue-head finding

`hasCampaignSave()` checks these keys in both local and session storage:

```txt
phantomCommand.save
nexus.sceneSnapshot
phantom.command.campaign
```

It returns only Boolean presence and is called twice during menu construction. Any non-empty value can enable Continue. No slot ID, parse result, schema, version, candidate kind, precedence, selected candidate, or decision reason survives the scan.

The campaign never parses `campaign=new|continue`, so Continue currently starts the same fresh state as Begin Campaign. The only current writer stores `{ scene, souls, wave }` after victory. That payload is a completion summary, not a resumable session.

## Required admission boundary

```txt
stable six-slot registry
  -> candidate reader
  -> parser and classifier
  -> deterministic precedence
  -> immutable Continue decision
  -> route-intent admission
  -> fresh or resume startup result
  -> menu, campaign, PhantomMenu, GameHost, and fixture projections
```

## Domains in use

```txt
route shell and menu presentation
settings persistence and procedural audio
raw save-presence detection
menu transition and route emission
campaign content and mutable state
fixed-step simulation and spawn queues
selection, building, orders, and wave start
AI, pathing, targeting, projectiles, damage, rewards, and terminal state
camera and input
world, HUD, minimap, modal, and CRT rendering
victory-summary persistence
PhantomMenu and GameHost diagnostics
source checks, static build, Pages deployment, and central audit sync
```

## Implemented kits

```txt
crt-renderer-kit
graveyard-art-kit
menu-route-kit
menu-settings-persistence-kit
menu-save-presence-kit
menu-audio-kit
campaign-route-shell-kit
pixel-campaign-runtime-kit
fixed-step-campaign-simulation-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
menu-static-check-kit
campaign-static-check-kit
static-build-copy-kit
pages-deploy-kit
retained construct kits
```

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/trackers/2026-07-11T01-20-51-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T01-20-51-04-00.md
.agent/architecture-audit/2026-07-11T01-20-51-04-00-continue-capability-resolver-dsk-map.md
.agent/render-audit/2026-07-11T01-20-51-04-00-resume-provenance-projection-gap.md
.agent/gameplay-audit/2026-07-11T01-20-51-04-00-new-continue-startup-loop.md
.agent/interaction-audit/2026-07-11T01-20-51-04-00-menu-route-session-admission-map.md
.agent/save-authority-audit/2026-07-11T01-20-51-04-00-six-slot-candidate-precedence-contract.md
.agent/deploy-audit/2026-07-11T01-20-51-04-00-candidate-resolver-fixture-gate.md
```

## Validation state

Documentation only. Runtime source, package scripts, dependencies, routes, gameplay, rendering, persistence, and deployment configuration did not change. No branch or pull request was created. Behavioral fixtures remain absent and were not run.
