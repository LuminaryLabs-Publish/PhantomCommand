# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-11T03-31-26-04-00`

## Summary

The live product is a static pixel-isometric RTS with a procedural menu and fixed-step grave-ring campaign. The queue head remains Continue/save-candidate resolution; the newly mapped second gate is campaign action-result authority because browser and GameHost requests currently mutate live state outside fixed-step application and return no typed result.

## Plan ledger

**Goal:** preserve current gameplay and presentation while establishing one admitted campaign session, deterministic command application, and committed-frame proof.

- [ ] Implement the Continue capability resolver and save-candidate precedence fixtures.
- [ ] Add typed campaign commands, target ticks, preflight, results, and fixed-step application.
- [ ] Add command, event, fingerprint, replay, and committed-frame fixtures.
- [ ] Add explicit menu and campaign lifecycle ownership.
- [ ] Add a versioned full-session save envelope only after the earlier authority gates pass.

## Current implementation queue

```txt
1. PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. PhantomCommand Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. PhantomCommand Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. PhantomCommand Versioned Save Envelope + Atomic Resume Fidelity Gate
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state. `PhantomCommand` was selected as the oldest documented fallback from its prior central timestamp, `2026-07-11T01-20-51-04-00`.

## Product route

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html?campaign=new|continue
  -> src/campaign/campaign-scene.js
```

The campaign uses a `640 x 360` source canvas, seven rings, four lanes, generated build pads, six starter allies, three tower types, seven unit archetypes, six waves, exact `1/60` simulation steps, HUD, minimap, terminal modal, CRT presentation, victory-summary persistence, and `window.GameHost` diagnostics.

## Current interaction loop

```txt
menu evaluates
  -> reads settings and raw save presence
  -> emits campaign=new or campaign=continue
  -> campaign ignores route intent and creates fresh mutable state
  -> pointer, keyboard, and GameHost mutate live state directly
  -> RAF advances camera with variable dt
  -> accumulator applies zero or more exact 1/60 updates
  -> world, HUD, minimap, modal, CRT, and GameHost observe mutable state
  -> victory writes a three-field completion summary
```

## Queue-head finding

The menu scans three keys in both local and session storage and reduces all evidence to Boolean presence. The campaign never consumes the route mode or a selected candidate. The current `{ scene, souls, wave }` victory payload is a completion summary, not resumable session state.

## Newly mapped action-authority finding

```txt
selectAt(), build(), order(), startWave()
  -> immediate live-state mutation
  -> successful/rejected/no-op return: undefined
  -> no command ID, sequence, target tick, preflight, result, journal, or fingerprint
```

`selectAt()` combines unit selection, toggling, pad selection, second-click building, and deselection. Browser callbacks and GameHost calls can mutate state between fixed simulation steps. The frame path publishes no simulation tick range, applied command sequences, canonical state fingerprint, render-consumption rows, or CRT acknowledgement.

## Domains in use

```txt
route shell and menu presentation
settings persistence and procedural audio
raw save-presence detection and Continue capability
campaign content and mutable state
selection, building, orders, wave start, pause, and camera input
fixed-step spawning, AI, combat, economy, and terminal progression
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
.agent/trackers/2026-07-11T03-31-26-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T03-31-26-04-00.md
.agent/architecture-audit/2026-07-11T03-31-26-04-00-campaign-action-result-authority-dsk-map.md
.agent/render-audit/2026-07-11T03-31-26-04-00-committed-frame-consumption-gap.md
.agent/gameplay-audit/2026-07-11T03-31-26-04-00-command-preflight-application-loop.md
.agent/interaction-audit/2026-07-11T03-31-26-04-00-input-gamehost-command-admission-map.md
.agent/action-authority-audit/2026-07-11T03-31-26-04-00-command-sequence-target-tick-contract.md
.agent/deploy-audit/2026-07-11T03-31-26-04-00-action-replay-frame-fixture-gate.md
```

## Validation state

Documentation only. Runtime source, scripts, dependencies, routes, gameplay, rendering, persistence, and deployment configuration did not change. No branch or pull request was created. The required behavioral fixtures do not yet exist and were not run.