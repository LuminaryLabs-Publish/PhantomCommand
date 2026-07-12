# PhantomCommand Current Audit

**Timestamp:** `2026-07-12T16-00-03-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `menu-pointer-hit-admission-authority-audited`

## Summary

The current audit isolates Menu Pointer-Hit Admission Authority. `pointerdown` calculates a main-menu or settings hit, updates selection only when the hit succeeds, and then unconditionally executes the current selection. A failed hit therefore uses stale selection as action evidence.

The CRT renderer visibly curves the source image when enabled. Pointer projection reverses aspect containment only and does not invert the curve, so the visible and logical control geometries are not governed by one transform revision.

## Plan ledger

**Goal:** make pointer-sourced menu actions require current visible-control hit evidence and produce one typed terminal result with first-visible-frame proof.

- [x] Compare all eligible Publish repositories and select only `PhantomCommand`.
- [x] Inspect menu geometry, CRT projection, pointer listeners, panels, keyboard/accessibility activation and checks.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define pointer, geometry, hit, command, result and frame-proof boundaries.
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
selection reason: oldest eligible synchronized central-ledger entry
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu boot
  -> create 480 × 270 source canvas, graveyard art and CRT renderer
  -> read settings and save presence
  -> create main-menu state and optional panels
  -> attach pointer, keyboard and hidden-button listeners
  -> publish PhantomMenu and start RAF

pointer hover
  -> screenToSource reverses aspect containment
  -> main/panel hit test runs against uncurved source rectangles
  -> selection changes only for a successful hit

main pointer down
  -> compute hit index
  -> optionally replace menu.selected
  -> activateMain(menu.items[menu.selected]) regardless of hit status

panel pointer down
  -> compute settings-row hit index
  -> optionally replace state.panel.selected
  -> activatePanel() regardless of hit status

keyboard/accessibility
  -> Enter/Space or hidden button activates a selected/named item directly
  -> input source and terminal result are not recorded

frame
  -> draw source controls
  -> contain and optionally curve through CRT shader
  -> render fade/grain/aberration
  -> schedule successor RAF
```

## Source-backed findings

```txt
main-menu item count: 4
settings row count: 4
main menu x bounds: 55..245
main row top: 119 + index*22
main row height: 18
settings x bounds: 102..378
settings row top: 110 + index*23
settings row height: 18

main miss terminal rejection: absent
settings miss terminal rejection: absent
letterbox rejection before dispatch: absent
primary button policy: absent
isPrimary policy: absent
pointer capture/cancel: absent
pointer down/up sequence: absent
CRT inverse projection: absent
surface/layout/panel revisions: absent
typed hit result: absent
typed action result: absent
first visible action-frame acknowledgement: absent
pointer behavior fixtures: absent
```

### Main-menu miss executes predecessor selection

The pointer listener calls `activateMain(menu.items[menu.selected])` after the hit test whether or not `menuHitIndex` returned a control. Empty canvas, row gaps and contained-source misses can execute the previously hovered or keyboard-selected item.

### Settings miss mutates predecessor row

When a panel is open, pointer-down always calls `activatePanel()`. A miss in the settings panel can toggle the previously selected setting or close the panel.

### Containment is informative, not authoritative

`screenToSource()` returns `inside=false` for letterbox pixels. Hit testing returns `-1`, but dispatch still occurs. The containment result is not an action-admission fence.

### Visible CRT geometry is not input geometry

The shader uses `curveUv()` when CRT is enabled. The input transform reverses only aspect containment. No shared immutable geometry or inverse curve links the displayed control to the hit test.

### Existing checks do not execute input

`scripts/check-menu.mjs` verifies source tokens. It does not create a browser, dispatch pointer events, compare visible/logical geometry or assert zero mutation after rejected input.

## Domains in use

```txt
static menu and campaign route shells
menu settings, save presence, selection, panels, fade and navigation
viewport-to-source projection and containment
CRT curved visual presentation
pointer, keyboard and hidden accessible control input
menu and settings control layout/hit testing
route and panel action dispatch
Web Audio activation, ambience and UI tones
campaign bootstrap, state, fixed-step combat and persistence
campaign rendering, pointer/camera control and public host
procedural graveyard, HUD, minimap and CRT rendering
WebGL resource lifecycle
source checks, static build, Pages deployment and audit tracking
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
viewport containment, source-coordinate projection and CRT curved presentation
pointer move/down/leave, keyboard and hidden-button activation
AudioContext ambience, UI tones and delayed close
campaign state, selection, building, orders, waves, pause, camera and restart
fixed-step spawning, movement, targeting, projectiles, damage, rewards and terminal mutation
world, HUD, minimap and overlay rendering
public state snapshots and direct mutation capabilities
construction intro scheduling and piece-state updates
source checks, static build and GitHub Pages deployment
```

The exact per-kit service map is retained in the current tracker and machine registry.

## Required authority

```txt
phantom-command-menu-pointer-hit-admission-authority-domain
```

### Required transaction

```txt
physical input
  -> identify source and pointer sequence
  -> enforce primary-pointer/button policy
  -> cite current surface, transform, layout and panel revisions
  -> project through visible geometry
  -> produce typed containment and hit results
  -> reject miss/stale/outside/unsupported paths with zero mutation
  -> create one MenuActionCommand only from admitted evidence
  -> commit one MenuActionResult
  -> acknowledge the first visible menu frame
```

## Candidate kits

```txt
menu-input-source-kind-kit
menu-pointer-sample-id-kit
menu-pointer-sequence-kit
menu-pointer-button-policy-kit
menu-pointer-primary-policy-kit
menu-surface-generation-kit
menu-viewport-transform-revision-kit
menu-crt-inverse-projection-kit
menu-containment-result-kit
menu-control-layout-revision-kit
menu-control-id-kit
menu-hit-test-result-kit
menu-panel-generation-kit
menu-action-command-kit
menu-action-admission-kit
menu-action-result-kit
menu-pointer-capture-kit
stale-menu-pointer-rejection-kit
duplicate-menu-action-rejection-kit
menu-visible-frame-ack-kit
menu-input-observation-kit
menu-input-journal-kit
menu-pointer-miss-fixture-kit
menu-panel-miss-fixture-kit
menu-crt-projection-fixture-kit
menu-accessibility-parity-fixture-kit
menu-pages-input-smoke-kit
```

## Required invariants

```txt
pointer miss performs zero menu/settings/navigation mutation
letterbox click is rejected
settings miss never toggles stale selection
non-primary input is rejected
stale transform/layout/panel evidence is rejected
one physical sequence produces at most one action result
CRT-on and CRT-off hit geometry matches visible controls
keyboard/accessibility activation has explicit source identity
first visible frame cites the accepted result
```

## Repo-local output

```txt
.agent/trackers/2026-07-12T16-00-03-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T16-00-03-04-00.md
.agent/architecture-audit/2026-07-12T16-00-03-04-00-menu-pointer-hit-admission-authority-dsk-map.md
.agent/render-audit/2026-07-12T16-00-03-04-00-crt-visible-control-hit-geometry-gap.md
.agent/gameplay-audit/2026-07-12T16-00-03-04-00-menu-miss-stale-action-loop.md
.agent/interaction-audit/2026-07-12T16-00-03-04-00-pointer-sample-hit-action-result-map.md
.agent/menu-input-audit/2026-07-12T16-00-03-04-00-miss-containment-curve-contract.md
.agent/deploy-audit/2026-07-12T16-00-03-04-00-menu-pointer-browser-fixture-gate.md
```

## Validation boundary

Documentation only. Runtime, pointer, keyboard, menu, settings, navigation, audio, campaign, rendering, package scripts, dependencies and deployment were not changed. No executable pointer fixture was run.