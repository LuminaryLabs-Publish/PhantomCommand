# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-11T03-41-49-04-00`

## Summary

PhantomCommand is a static pixel-isometric RTS with a procedural menu and a fixed-step grave-ring campaign. Continue resolution remains the queue head, action-result authority remains the second gate, and this audit defines the third gate: one lifecycle owner must construct, run, transition, stop, and dispose menu or campaign resources without duplicate RAF chains, stale listeners, leaked audio/WebGL objects, or unleased globals.

## Plan ledger

**Goal:** preserve current gameplay and presentation while making menu and campaign runtime ownership explicit, restartable, observable, and safely disposable.

- [ ] Implement the Continue capability resolver and save-candidate precedence fixtures.
- [ ] Implement typed campaign commands and fixed-step action-result authority.
- [ ] Introduce one runtime-session owner for each active route.
- [ ] Retain exactly one RAF request and reject stale callbacks by run generation.
- [ ] Register every listener, global exposure, timer, audio node, and CRT resource in an ownership ledger.
- [ ] Add startup rollback, transition completion, ordered teardown, and idempotent disposal.
- [ ] Add DOM-free lifecycle fixtures plus browser remount and navigation smoke coverage.
- [ ] Add the versioned full-session save envelope only after the earlier gates pass.

## Current implementation queue

```txt
1. PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. PhantomCommand Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. PhantomCommand Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. PhantomCommand Versioned Save Envelope + Atomic Resume Fidelity Gate
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `LuminaryLabs-Publish/TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state. PhantomCommand was selected because its central ledger was the oldest eligible entry and its newer `2026-07-11T03-41-49-04-00` repo-local lifecycle breakdown was not yet represented centrally.

## Product route

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html?campaign=new|continue
  -> src/campaign/campaign-scene.js
```

The campaign uses a `640 x 360` source canvas, seven rings, four lanes, generated build pads, six starter allies, three tower types, seven unit archetypes, six waves, exact `1/60` simulation steps, HUD, minimap, terminal overlay, CRT presentation, victory-summary persistence, and `window.GameHost`.

## Current interaction loop

```txt
menu module import
  -> allocate art, source canvas, CRT renderer, mutable state, listeners and optional audio
  -> start an untracked recursive RAF
  -> Begin or Continue starts a timed fade
  -> location navigation abandons the route without an explicit teardown result

campaign module import
  -> allocate source canvas, CRT renderer, descriptors and mutable state
  -> install canvas and window listeners
  -> start an untracked recursive RAF
  -> mutate camera and gameplay from callbacks
  -> apply exact 1/60 simulation steps
  -> render world, HUD, minimap, modal and CRT
  -> reload or navigate away without an explicit teardown result
```

## Lifecycle finding

Both routes are module-scope singletons. Neither retains its RAF request, listener registrations, global lease, or complete resource ledger. `createCrtRenderer()` returns its raw WebGL context but no `dispose()`. Menu audio schedules delayed context close without retaining the timer. `window.PhantomMenu` and `window.GameHost` overwrite prior values without ownership tokens. Re-import, remount, hot reload, failed startup, or embedded navigation therefore has no deterministic exactly-once cleanup boundary.

## Domains in use

```txt
route shell and menu presentation
settings persistence and procedural audio
raw save-presence detection and Continue capability
menu transition timing and navigation
campaign content and mutable state
selection, building, orders, wave start, pause and camera input
fixed-step spawning, AI, combat, economy and terminal progression
world, HUD, minimap, overlay and CRT rendering
victory-summary persistence
PhantomMenu and GameHost diagnostics
runtime allocation, RAF, listeners, globals, audio, WebGL and navigation lifecycle
source checks, static build, Pages deployment and central audit sync
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
.agent/trackers/2026-07-11T03-41-49-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T03-41-49-04-00.md
.agent/architecture-audit/2026-07-11T03-41-49-04-00-runtime-session-lifecycle-dsk-map.md
.agent/render-audit/2026-07-11T03-41-49-04-00-crt-resource-disposal-gap.md
.agent/gameplay-audit/2026-07-11T03-41-49-04-00-route-transition-teardown-loop.md
.agent/interaction-audit/2026-07-11T03-41-49-04-00-listener-global-lease-map.md
.agent/lifecycle-audit/2026-07-11T03-41-49-04-00-single-raf-ordered-dispose-contract.md
.agent/deploy-audit/2026-07-11T03-41-49-04-00-menu-campaign-lifecycle-fixture-gate.md
```

## Validation state

Documentation only. Runtime source, scripts, dependencies, routes, gameplay, rendering, persistence and deployment configuration did not change. No branch or pull request was created. The required lifecycle fixtures do not yet exist and were not run.
