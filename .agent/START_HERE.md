# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Last aligned:** `2026-07-11T09-40-19-04-00`

## Summary

PhantomCommand is a static pixel-isometric RTS with a procedural graveyard menu and a fixed-step grave-ring campaign. The current audit adds a display/input projection gate: the CRT shader curves the displayed source image, while pointer mapping only reverses letterbox or pillarbox containment, so visible menu and campaign targets can diverge from the coordinates used for hit tests and world actions.

## Plan ledger

**Goal:** preserve the existing pixel presentation while making display, pointer, world and selection coordinates share one versioned projection contract.

- [ ] Implement the Continue capability resolver and save-candidate precedence fixtures.
- [ ] Route browser and `GameHost` actions through typed campaign commands.
- [ ] Add display-to-source projection parity before command preflight.
- [ ] Apply the same contain and CRT-curve transform used by the shader.
- [ ] Make drag selection test the visually rendered source rectangle.
- [ ] Add canonical campaign phase and mutation admission.
- [ ] Apply admitted commands at deterministic fixed steps.
- [ ] Correlate projection, state and render frame identities.
- [ ] Implement runtime-session lifecycle ownership and ordered teardown.
- [ ] Implement versioned checkpoint capture, validation and atomic resume.
- [ ] Add executable projection, command, phase, lifecycle and checkpoint gates.

## Current implementation queue

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority
   2a. CRT Display/Input Projection Authority + CPU/GLSL Parity Fixture Gate
   2b. Campaign Phase Admission + Paused/Terminal Mutation Fixture Gate
   2c. Fixed-Step Replay + Committed Frame Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Campaign Checkpoint Authority + Atomic Resume/First-Frame Fixture Gate
```

## Selection result

The current Publish inventory contains ten accessible repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state. `HorrorCorridor` was skipped because a same-window documentation sequence was actively writing there; `PhantomCommand` was the oldest stable eligible fallback.

## Product route

```txt
index.html
  -> src/menu/graveyard-menu.js
  -> game.html?campaign=new|continue
  -> src/campaign/campaign-scene.js
```

## Current interaction loop

```txt
browser pointer
  -> canvas client coordinates
  -> crt.screenToSource()
       applies contain correction only
  -> menu hit testing
     or campaign screenToWorld()
  -> select, build, order, pan or wheel-anchor mutation

render
  -> source canvas
  -> containUv()
  -> curveUv() when CRT is enabled
  -> WebGL display
```

The rendered geometry and the input geometry therefore use different transforms whenever CRT curvature is enabled.

## Main finding

```txt
display pixel
  -> containUv
  -> curveUv
  -> sampled source point

pointer pixel
  -> contain correction
  -> uncurved source point
```

This mismatch affects menu hover and activation, campaign click selection, right-click orders, wheel zoom anchoring and drag selection. The error grows toward the display edges. Drag selection has an additional mismatch because an axis-aligned source-screen rectangle is converted into a world AABB from only two inverse-projected corners.

## Domains in use

```txt
route shell and menu presentation
settings persistence and procedural audio
save presence, candidate provenance and Continue capability
CRT containment, curvature, source upload and display projection
pointer, source-canvas and isometric world projection
campaign content, mutable state and fixed-step simulation
selection, building, orders, wave, phase and camera interaction
spawning, AI, combat, economy and terminal progression
world, HUD, minimap, modal overlay and CRT rendering
victory-summary persistence and GameHost diagnostics
runtime allocation, lifecycle and deployment proof
checkpoint capture, migration, hydration, atomic resume and first-frame proof
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
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

The exact current, planned and projection-authority service map is in `.agent/kit-registry.json`.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/trackers/2026-07-11T09-40-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T09-40-19-04-00.md
.agent/architecture-audit/2026-07-11T09-40-19-04-00-display-input-projection-dsk-map.md
.agent/render-audit/2026-07-11T09-40-19-04-00-crt-source-pointer-parity-gap.md
.agent/gameplay-audit/2026-07-11T09-40-19-04-00-pointer-world-action-loop.md
.agent/interaction-audit/2026-07-11T09-40-19-04-00-display-source-world-admission-map.md
.agent/input-projection-audit/2026-07-11T09-40-19-04-00-crt-and-drag-selection-contract.md
.agent/deploy-audit/2026-07-11T09-40-19-04-00-projection-parity-fixture-gate.md
```

## Validation state

Documentation only. Runtime source, scripts, dependencies, routes, gameplay, rendering, persistence and deployment configuration did not change. No branch or pull request was created. Projection parity fixtures and browser pointer smoke do not yet exist and were not run.