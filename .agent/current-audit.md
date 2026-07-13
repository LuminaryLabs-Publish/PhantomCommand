# PhantomCommand Current Audit

**Timestamp:** `2026-07-12T19-58-07-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `campaign-spatial-input-admission-authority-audited`

## Summary

The current audit isolates Campaign Spatial Input Admission Authority. Campaign pointer paths use raw projected coordinates without enforcing visible-source containment, inverse CRT geometry, pointer identity or transform revisions. Rectangle selection also inverse-projects only two corners of the visible marquee, producing incorrect world membership.

## Plan ledger

**Goal:** admit only current, contained and revision-correct pointer evidence, then produce one typed spatial result before campaign mutation.

- [x] Compare all eligible Publish repositories and select only `PhantomCommand`.
- [x] Inspect campaign pointer, selection, order, camera and CRT projection paths.
- [x] Identify the complete interaction loop and all active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define surface, pointer, projection, polygon, result and frame-proof boundaries.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` state and central tracking.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement and execute the authority later.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new/ledger-missing/root-agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/PhantomCommand
selection reason: oldest eligible central-ledger entry
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
campaign boot
  -> create source canvas, CRT renderer, authored content and mutable state
  -> attach pointer, wheel, keyboard and blur listeners
  -> expose window.GameHost
  -> start RAF

pointer ingress
  -> screenToSource calculates x, y and inside
  -> inside is retained but never used as an admission gate
  -> visible CRT curve is not inverted
  -> pointer identity and capture are not tracked

campaign input
  -> left click selects ally or pad
  -> second pad click may build
  -> drag rectangle replaces selection
  -> right click orders selected units
  -> middle drag pans camera
  -> wheel zooms around projected pointer

simulation and presentation
  -> accumulator advances update(1/60)
  -> world, HUD and minimap consume current state
  -> CRT presents contained and curved source canvas
  -> no spatial-input result is correlated with the frame
```

## Source-backed findings

```txt
screenToSource returns inside: yes
campaign enforces inside: no
CRT shader curvature enabled: yes
input inverse CRT curvature: no
pointer ID tracking: no
pointer capture/cancel lifecycle: no
surface/focus generation: no
viewport/CRT/camera/entity revisions: no
drag selection transforms all four corners: no
typed projection/selection/order/camera result: no
first visible spatial-result frame acknowledgement: no
```

### Exact drag-selection failure

```txt
camera: (0,0)
zoom: 1
source rectangle: (300,160) to (340,180)

top-left world:     (-83.33,-55.56)
bottom-right world: (-27.78,-55.56)
runtime z interval: approximately zero

top-right world:    (-55.56,-83.33)
bottom-left world:  (-55.56,-27.78)
actual visible z span: approximately 55.55 units
```

The visible rectangle is a world parallelogram. Using two inverse-projected corners as a world-axis rectangle can omit nearly the entire visible footprint.

## Domains in use

```txt
menu and campaign route shells
menu settings, save presence, panels, fade, navigation and audio
viewport containment and source projection
CRT visual presentation and transform
browser pointer, keyboard, wheel, blur and context-menu input
campaign input surface and gesture lifecycle
screen, source, world and isometric coordinate spaces
camera pan, focus and zoom
point/additive/pad selection
rectangle selection and entity membership
order targeting and unit orders
economy, tower type, pad occupancy and building
wave phase, spawn queue and progression
fixed-step combat, projectiles, damage and rewards
pause, restart and terminal outcomes
world, HUD, minimap and terminal rendering
public GameHost commands and readback
browser persistence
validation, static build, Pages deployment and audit tracking
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

## Offered services

```txt
menu drawing, selection, settings, save-presence scanning, panels, fade and routing
viewport containment, screen-to-source projection and CRT presentation
pointer, keyboard, wheel and hidden-control activation
AudioContext ambience, UI tones and delayed close
campaign state, selection, building, orders, waves, pause, camera and restart
fixed-step spawning, movement, targeting, projectiles, damage, rewards and terminal mutation
world, HUD, minimap and overlay rendering
public snapshots and direct mutation capabilities
construction intro scheduling and piece-state updates
source checks, static build and GitHub Pages deployment
```

## Required authority

```txt
phantom-command-campaign-spatial-input-admission-authority-domain
```

### Required transaction

```txt
PointerEvent
  -> surface/focus generation admission
  -> pointer/button/capture admission
  -> viewport and CRT inverse projection
  -> typed source containment
  -> revisioned source-to-world projection
  -> selection polygon, order target or camera gesture result
  -> reject stale/outside/mismatched evidence with zero mutation
  -> publish terminal SpatialInputResult
  -> feed accepted result into Campaign Action Result Authority
  -> acknowledge first visible successor frame
```

## Candidate kits

```txt
campaign-input-surface-id-kit
campaign-input-surface-generation-kit
campaign-pointer-sample-id-kit
campaign-pointer-sequence-kit
campaign-primary-pointer-policy-kit
campaign-pointer-button-policy-kit
campaign-pointer-capture-kit
campaign-pointer-cancel-kit
campaign-viewport-transform-revision-kit
campaign-crt-transform-revision-kit
campaign-crt-inverse-projection-kit
campaign-source-containment-result-kit
campaign-screen-point-kit
campaign-source-point-kit
campaign-world-point-kit
campaign-world-projection-result-kit
campaign-selection-gesture-kit
campaign-selection-polygon-kit
campaign-selection-membership-result-kit
campaign-order-target-admission-kit
campaign-camera-gesture-result-kit
campaign-spatial-input-command-kit
campaign-spatial-input-result-kit
stale-campaign-input-rejection-kit
duplicate-campaign-input-rejection-kit
campaign-spatial-input-observation-kit
campaign-spatial-input-journal-kit
campaign-spatial-visible-frame-ack-kit
campaign-containment-fixture-kit
campaign-crt-projection-fixture-kit
campaign-drag-selection-geometry-fixture-kit
campaign-pointer-identity-fixture-kit
campaign-pages-spatial-input-smoke-kit
```

## Repo-local output

```txt
.agent/trackers/2026-07-12T19-58-07-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T19-58-07-04-00.md
.agent/architecture-audit/2026-07-12T19-58-07-04-00-campaign-spatial-input-admission-authority-dsk-map.md
.agent/render-audit/2026-07-12T19-58-07-04-00-crt-visible-world-selection-geometry-gap.md
.agent/gameplay-audit/2026-07-12T19-58-07-04-00-campaign-pointer-selection-order-loop.md
.agent/interaction-audit/2026-07-12T19-58-07-04-00-pointer-sample-projection-selection-result-map.md
.agent/campaign-input-audit/2026-07-12T19-58-07-04-00-containment-crt-drag-polygon-contract.md
.agent/deploy-audit/2026-07-12T19-58-07-04-00-campaign-spatial-input-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime, campaign input, selection, orders, camera, rendering, package scripts, dependencies and deployment were not changed. No executable spatial-input fixture was run.
