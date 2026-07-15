# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-15T18-39-30-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `campaign-pointer-feedback-projection-authority-audited`

## Summary

PhantomCommand remains a static pixel-isometric campaign game with procedural Canvas2D menu art, browser audio, fixed-step combat, Canvas2D world/HUD/minimap rendering and WebGL CRT presentation. This breakdown isolates campaign pointer feedback: the campaign canvas hides the native cursor, tracks source-space pointer coordinates, and accepts point selection, pad selection, right-click orders, drag selection, middle-button panning and wheel zoom, but the normal frame renders no pointer cursor, hover reticle, candidate target, order anchor or build-pad hover state.

The source proves a missing visible-feedback contract. It does not prove that a browser user cannot complete the campaign or that a specific misclick occurred.

## Plan ledger

**Goal:** give every admitted campaign pointer sample one visible, revision-bound affordance before a selection, build, order, pan or zoom command commits.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and ten root `.agent` states.
- [x] Compare every eligible current `main` head with its recorded repo-local documentation head.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repositories.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` by the oldest synchronized central timestamp.
- [x] Inspect campaign HTML, pointer production, screen/source/world projection, selection, orders, build pads, camera gestures, Canvas2D drawing, CRT presentation, checks and deployment.
- [x] Identify the complete interaction loop, all active domains, all 20 implemented kits and their services.
- [x] Define one parent pointer-feedback authority and 19 coordinating surfaces.
- [x] Add the timestamped tracker and focused audit family.
- [x] Refresh every required root `.agent` document and the machine registry.
- [ ] Implement and execute pointer-presence, hover, selection-preview, order-preview, contrast, artifact and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
undocumented eligible repositories: 0
runtime-ahead eligible repositories: 0

selected repository: LuminaryLabs-Publish/PhantomCommand
selection reason: oldest synchronized eligible repository
prior central timestamp: 2026-07-15T13-41-25-04-00
next oldest: LuminaryLabs-Publish/AetherVale at 2026-07-15T14-01-52-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Only `LuminaryLabs-Publish/PhantomCommand` is modified in the Publish organization.

## Complete interaction loop

```txt
menu
  -> restore settings and save presence
  -> render procedural graveyard through Canvas2D and WebGL CRT
  -> New or Continue navigates to game.html

campaign boot
  -> create fixed 640 x 360 source canvas
  -> create WebGL CRT presentation on the public canvas
  -> create rings pads units waves state camera and input
  -> hide the native cursor through game.html CSS
  -> attach pointer wheel keyboard context-menu and blur listeners
  -> publish window.GameHost
  -> start recursive RAF with fixed-step simulation

normal pointer sample
  -> pointermove calls crt.screenToSource
  -> store source x y and inside
  -> render world HUD minimap and CRT frame
  -> draw no cursor reticle or hover candidate

point selection
  -> left pointerdown begins a drag record
  -> left pointerup below the drag threshold inverse-projects the point
  -> select nearest allied unit or unoccupied build pad
  -> no precommit target preview

drag selection
  -> while dragging draw only the rectangular drag outline
  -> pointerup calculates candidate membership and mutates selection
  -> no candidate-unit preview before commit

order
  -> right pointerdown inverse-projects the hidden pointer position
  -> choose nearest enemy or movement destination
  -> mutate selected unit targets or destinations
  -> emit a transient world effect after commit
  -> no precommit enemy or ground-anchor preview

camera
  -> middle drag pans using hidden pointer movement
  -> wheel zooms around the hidden pointer anchor
  -> no persistent pointer anchor visualization
```

## Domains in use

```txt
static HTML routes and ES module lifecycle
browser document RAF blur navigation and page lifecycle
procedural menu art settings save presence audio and routing
Canvas2D menu and campaign source rendering
WebGL context shaders texture upload containment and CRT presentation
campaign rings lanes pads towers units waves archetypes and mutable state
fixed-step scheduling spawning movement targeting combat projectiles rewards and outcomes
camera isometric projection pan zoom focus and bounds
keyboard pointer wheel context-menu and blur input
screen source world and CRT coordinate projection
pointer presence visibility mode and feedback projection
unit hover selection candidate and drag-preview policy
build-pad hover and structure candidate policy
order-target and ground-anchor preview policy
cursor reticle contrast and visibility policy
selection tower construction unit orders and wave admission
HUD minimap pause and terminal presentation
localStorage persistence and route retry
public GameHost diagnostics and direct capabilities
construction intro choreography and sequence state
source checks static build Pages deployment and central tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `crt-renderer-kit` | WebGL acquisition, shader compilation, source texture upload, viewport resize, CRT effects and screen-to-source projection |
| `graveyard-art-kit` | Procedural menu graveyard, title, panels and selection drawing |
| `menu-route-kit` | Menu selection, panels, fade, transition and navigation |
| `menu-settings-persistence-kit` | Settings parsing, defaults, mutation and storage write |
| `menu-save-presence-kit` | Browser save-key presence scan |
| `menu-audio-kit` | AudioContext, persistent ambience, UI tones and delayed shutdown |
| `campaign-route-shell-kit` | Campaign HTML, public canvas, hidden native cursor and static instructions |
| `pixel-campaign-runtime-kit` | Mutable campaign state, camera, pointer/keyboard ingress, selection, build and order mutation |
| `fixed-step-campaign-simulation-kit` | Accumulator, waves, spawning, movement, targeting, projectiles, damage, rewards and outcomes |
| `pixel-campaign-render-kit` | World, entities, HUD, minimap, drag outline, overlays and CRT submission |
| `legacy-gamehost-diagnostics-kit` | Public state/camera references, direct wave/build/zoom commands and summary readback |
| `menu-static-check-kit` | Menu source-marker assertions |
| `campaign-static-check-kit` | Campaign HTML/source/CRT/build marker assertions |
| `static-build-copy-kit` | Static distribution assembly |
| `pages-deploy-kit` | GitHub Pages publication |
| `construct-spiral-intro-kit` | Construction intro composition |
| `construct-spiral-schedule-kit` | Ring and piece timing schedule |
| `construct-piece-id-kit` | Stable construction piece identity |
| `construct-piece-state-kit` | Construction-state projection |
| `construct-sequence-update-kit` | Construction sequence advancement |

```txt
implemented source-backed kits: 20
planned pointer-feedback authority surfaces: 19
```

## Source-backed findings

### The public campaign canvas hides the system cursor

`game.html` applies `cursor:none` to every canvas. The campaign has no alternate HTML pointer surface.

### Pointer position is tracked but not normally rendered

`setPointer()` stores `x`, `y` and `inside`. The render path draws the world, entities, HUD, minimap, pause/terminal overlays and a drag rectangle only while `input.drag` exists. It does not draw a cursor, reticle, pointer dot, hover ring or source-space anchor during ordinary point selection, ordering, panning or zooming.

### Target candidates are resolved only when the command commits

```txt
unit point-selection radius: 7 world units
build-pad point-selection radius: 7 world units
order enemy-target radius: 8 world units
```

No hover query publishes which unit, pad, enemy or ground point would be selected before the button transition mutates state.

### Post-commit effects do not replace precommit feedback

Selection rings appear after units become selected. `order()` emits a transient effect after targets or destinations are assigned. Build-pad highlighting represents `selectedPad`, not the pad currently under the hidden pointer. These are accepted-state projections, not pointer-candidate feedback.

### Existing checks do not exercise visible pointer feedback

`scripts/check-campaign.mjs` asserts campaign, CRT and build source markers. It does not create a browser pointer, verify native-cursor policy, inspect hover targets, compare feedback with committed selection/order results, capture a frame or smoke the deployed origin.

## Main finding

The campaign combines a hidden native cursor with pointer-driven selection, building, orders, panning and zooming, while normal frames publish no replacement pointer or hover affordance. The input runtime knows the current projected position, but presentation does not expose the candidate unit, pad, enemy or ground anchor that the next command would use. There is no pointer-feedback revision, result or first matching frame acknowledgement.

## Required parent domain

```txt
phantom-command-campaign-pointer-feedback-projection-authority-domain
```

This authority coordinates the existing spatial-input, camera, selection, build, order and render owners. It does not own campaign truth or replace the prior spatial-input admission authority.

## Planned authority surfaces

```txt
campaign-pointer-feedback-policy-kit
campaign-input-surface-generation-kit
pointer-sample-revision-kit
pointer-presence-observer-kit
pointer-visibility-mode-kit
screen-source-pointer-projection-kit
pointer-hover-query-kit
pointer-hover-target-result-kit
selection-candidate-preview-kit
order-target-preview-kit
build-pad-hover-preview-kit
drag-selection-preview-kit
pointer-reticle-descriptor-kit
cursor-contrast-policy-kit
pointer-feedback-frame-plan-kit
pointer-feedback-result-kit
stale-pointer-feedback-rejection-kit
first-pointer-feedback-frame-ack-kit
browser-pointer-feedback-fixture-kit
```

## Required transaction

```txt
PointerSample
  -> bind InputSurfaceGeneration PointerSampleRevision
     ViewportRevision CrtTransformRevision CameraRevision
     EntitySetRevision PadSetRevision and SelectionRevision
  -> reject outside stale duplicate or retired evidence
  -> project the admitted point into source and world coordinates
  -> resolve immutable hover candidates for unit pad enemy and ground
  -> choose one feedback mode from the current command and device policy
  -> prepare reticle hover ring build preview order anchor or drag candidates
  -> publish PointerFeedbackResult
  -> render one pointer-feedback frame against the same revisions
  -> publish FirstPointerFeedbackFrameAck

PointerCommand
  -> cite the accepted PointerFeedbackResult when policy requires it
  -> resolve selection build order pan or zoom against the same projection
  -> reject stale feedback or return an explicit miss
  -> publish the existing gameplay command result
```

## Validation boundary

Documentation only. No runtime JavaScript, HTML, CSS, input, camera, gameplay, Canvas2D, WebGL, persistence, tests, package scripts, workflow or deployment behavior changed. No browser pointer-feedback fixture was run.