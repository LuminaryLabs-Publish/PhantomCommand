# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-12T19-58-07-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `campaign-spatial-input-admission-authority-audited`

## Summary

PhantomCommand remains a static pixel-isometric campaign game with a procedural graveyard menu, CRT presentation, fixed-step combat, browser persistence and public diagnostics. This breakdown isolates Campaign Spatial Input Admission Authority: campaign pointer handlers calculate source containment but ignore it, do not invert the visible CRT curve, do not establish pointer ownership, and convert drag rectangles into an incorrect world-axis box using only two transformed corners.

## Plan ledger

**Goal:** require every campaign pointer gesture to prove current surface ownership, visible-source containment, pointer identity and revision-correct projection before selection, orders, camera movement or zoom can mutate campaign state.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Confirm no new, ledger-missing or root-agent-missing repository takes priority.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` as the oldest eligible central entry.
- [x] Inspect campaign pointer projection, selection, ordering, camera pan, wheel zoom, CRT containment and visible curvature.
- [x] Identify the complete interaction loop and all domains in use.
- [x] Preserve all 20 implemented kits and their offered services.
- [x] Define the Campaign Spatial Input Admission authority and proposed kit family.
- [x] Add timestamped architecture, render, gameplay, interaction, campaign-input and deploy audits.
- [x] Refresh every required root `.agent` document and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime corrections and executable spatial-input fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

central last-updated order at selection:
  PhantomCommand   2026-07-12T18-11-53-04-00
  PrehistoricRush  2026-07-12T18-18-59-04-00
  HorrorCorridor   2026-07-12T18-38-51-04-00
  ZombieOrchard    2026-07-12T18-48-07-04-00
  MyCozyIsland     2026-07-12T19-00-22-04-00
  TheUnmappedHouse 2026-07-12T19-11-01-04-00
  AetherVale       2026-07-12T19-21-29-04-00
  TheOpenAbove     2026-07-12T19-31-06-04-00
  IntoTheMeadow    2026-07-12T19-41-13-04-00

selected: LuminaryLabs-Publish/PhantomCommand
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Only `LuminaryLabs-Publish/PhantomCommand` is modified in the Publish organization.

## Complete interaction loop

```txt
menu route
  -> navigate into game.html

campaign boot
  -> create 640 x 360 source canvas
  -> create WebGL CRT presentation
  -> create authored pads, units, waves and mutable campaign state
  -> attach canvas pointer, wheel and global keyboard listeners
  -> expose window.GameHost
  -> start recursive RAF

pointer projection
  -> crt.screenToSource(clientX, clientY)
  -> calculate source x/y and inside flag from aspect containment
  -> retain x/y even when inside is false
  -> do not invert visible CRT curve

campaign gestures
  -> left pointerdown begins drag at projected source point
  -> left pointerup performs point selection or rectangle selection
  -> right pointerdown projects source point to world and orders units
  -> middle drag pans camera
  -> wheel projects pointer to world and zooms around it

selection rectangle
  -> take screen-space min and max diagonal points
  -> inverse-project only those two points to world
  -> build axis-aligned world x/z ranges from the two results
  -> test allied world positions against those ranges

simulation and frame
  -> fixed-step update advances mutable state
  -> world, HUD and minimap draw to source canvas
  -> CRT containment and curve produce visible canvas
  -> no spatial-input result or first-visible-frame acknowledgement exists
```

## Source-backed findings

### Containment is calculated but ignored

`screenToSource()` returns `{ x, y, inside }`. Campaign pointerdown, pointerup, pointermove and wheel paths store `inside` but never reject a pointer outside the visible 640 x 360 source rectangle. Letterboxed canvas regions can therefore generate selection, orders, camera pan and zoom anchors using out-of-range source coordinates.

### Visible CRT geometry is not inverted

The fragment shader applies `curveUv()` when CRT is enabled. `screenToSource()` reverses only aspect containment. Pointer evidence is interpreted against the uncurved source even though the player sees curved control and world geometry.

### Pointer ownership is absent

```txt
pointer ID tracking: absent
primary pointer policy: absent
primary button policy: partial button branching only
setPointerCapture: absent
lostpointercapture: absent
pointercancel: absent
matching down/move/up gesture identity: absent
surface/focus generation: absent
```

A different pointer can move or terminate an active gesture because the runtime stores no pointer identity.

### Drag-selection geometry is mathematically incorrect

The isometric inverse is:

```txt
worldX = sourceDeltaY / 0.72 + sourceDeltaX / 1.44
worldZ = sourceDeltaY / 0.72 - sourceDeltaX / 1.44
```

An axis-aligned source rectangle maps to a world-space parallelogram. The runtime inverse-projects only the top-left and bottom-right corners and treats those two results as an axis-aligned world rectangle.

Concrete source-space example at camera `(0,0)` and zoom `1`:

```txt
top-left:     (300,160) -> world (-83.33,-55.56)
bottom-right: (340,180) -> world (-27.78,-55.56)

runtime world z range: approximately zero width at -55.56

missing top-right:    (340,160) -> world (-55.56,-83.33)
missing bottom-left:  (300,180) -> world (-55.56,-27.78)

actual visible rectangle footprint spans world z from -83.33 to -27.78
```

A common `40 x 20` drag can therefore omit nearly the entire visible selection footprint.

### Point and order hit policy is not revisioned

Point selection uses nearest allied unit within a fixed seven-world-unit radius. Order targeting uses nearest enemy within eight world units. Neither result cites camera, zoom, viewport, CRT, entity-set or selection revisions, and no typed miss or stale-projection result exists.

## Domains in use

```txt
menu and campaign route shells
menu settings, save presence, panels, fade, navigation and audio
viewport aspect containment and source projection
CRT curvature, aberration, grain, vignette and fade presentation
browser pointer, keyboard, wheel, blur and context-menu input
campaign input surface ownership and gesture lifecycle
screen, source, world and isometric coordinate spaces
campaign camera pan, focus and zoom
point selection, additive selection and selected-pad state
rectangle selection and entity membership
right-click order targeting and unit order mutation
economy, tower type, pad occupancy and building
wave phase, spawn queue and progression
fixed-step spawning, combat, projectiles, damage and rewards
pause, restart and terminal outcomes
world, HUD, minimap and terminal rendering
public GameHost commands and readback
browser persistence
source checks, static build, Pages deployment and audit tracking
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL context, shader program, source texture, aspect containment, CRT effects, screen-to-source projection
graveyard-art-kit: procedural graveyard menu drawing
menu-route-kit: menu state, selection, panels, fade and navigation
menu-settings-persistence-kit: settings read/write and presentation options
menu-save-presence-kit: browser storage presence scan
menu-audio-kit: AudioContext, ambience, tones and delayed close
campaign-route-shell-kit: game document and canvas route
pixel-campaign-runtime-kit: authored campaign state, pointer/keyboard ingress, selection, building, orders and camera
fixed-step-campaign-simulation-kit: spawn, movement, targeting, combat, projectiles, rewards and outcomes
pixel-campaign-render-kit: world, entities, HUD, minimap, overlays and CRT presentation
legacy-gamehost-diagnostics-kit: public snapshot and direct mutation capabilities
menu-static-check-kit: static menu source assertions
campaign-static-check-kit: static campaign source assertions
static-build-copy-kit: static dist assembly
pages-deploy-kit: GitHub Pages publication
construct-spiral-intro-kit: construction intro composition
construct-spiral-schedule-kit: construction timing schedule
construct-piece-id-kit: stable construction piece identity
construct-piece-state-kit: construction piece state
construct-sequence-update-kit: construction sequence progression
```

## Required parent domain

```txt
phantom-command-campaign-spatial-input-admission-authority-domain
```

This domain coordinates existing input, camera, selection, order, render and action-result owners. It does not replace campaign action ownership.

## Candidate coordinating kits

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

## Required transaction

```txt
PointerEvent
  -> verify current campaign surface and focus generation
  -> enforce primary pointer and button policy
  -> bind pointer sample, sequence and gesture identity
  -> require current pointer capture for successor gesture events
  -> cite viewport and CRT transform revisions
  -> invert aspect containment and visible CRT curvature
  -> return typed source-containment result
  -> reject outside, stale, duplicate or mismatched evidence with zero mutation
  -> project source point to world with camera and zoom revision
  -> point selection: resolve visible hit evidence
  -> drag selection: test entities in source space or use all four inverse-projected corners
  -> order/camera: construct revision-bound action command
  -> publish one terminal spatial-input result
  -> feed accepted result into Campaign Action Result Authority
  -> acknowledge the first visible frame citing both results
```

## Required invariants

```txt
outside-source pointers cause zero campaign or camera mutation
visible CRT position and logical source position agree within tolerance
one gesture uses one pointer identity from down through terminal event
pointer cancellation releases all gesture state
selection membership equals the visible source rectangle
point/order results cite current camera, zoom, entity and selection revisions
stale projection evidence rejects
one pointer command produces at most one terminal result
first visible frame cites the accepted spatial-input and campaign-action results
source, build and Pages fixtures agree
```

## Repo-local output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
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

```txt
runtime source changed: no
campaign behavior changed: no
pointer behavior changed: no
selection/order/camera behavior changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
target branch: main
npm run check executed: no
npm run build executed: no
browser spatial-input smoke executed: no
Pages spatial-input smoke executed: no
spatial-input fixtures available: no
```

This audit proves the current containment, pointer-ownership and rectangle-projection defects from source. It does not claim they are fixed or that deployed pointer behavior has passed executable geometry tests.
