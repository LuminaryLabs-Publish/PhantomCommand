# PhantomCommand Project Breakdown

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Timestamp:** `2026-07-12T16-00-03-04-00`  
**Branch:** `main`  
**Status:** `menu-pointer-hit-admission-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign game with a procedural graveyard menu, CRT WebGL presentation, persisted settings, Web Audio ambience, fixed-step campaign combat, browser storage and public diagnostic hosts.

This breakdown isolates menu pointer-hit admission. Both the main menu and settings panel perform a hit test, but pointer-down dispatch does not require the hit to succeed. A click in the letterbox, empty canvas, gap between controls or outside a settings row executes the previously selected action. The logical input transform also removes aspect containment without inverting the visible CRT curve, so visible and logical control geometry can diverge.

## Plan ledger

**Goal:** require every pointer-triggered menu action to cite a current surface, transform, panel generation and successful control hit, while keeping keyboard and accessibility activation as explicit non-pointer command sources.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Select only `PhantomCommand` as the oldest eligible synchronized repository.
- [x] Inspect menu layout, pointer projection, hit testing, panel activation, keyboard activation, hidden controls, CRT curvature and static checks.
- [x] Identify the complete interaction loop and all active domains.
- [x] Preserve all 20 implemented kits and their offered services.
- [x] Trace main-menu miss, panel miss, letterbox, non-primary pointer, duplicate transition and CRT-projection paths.
- [x] Define pointer sample, transform, hit, command, result, observation and visible-frame contracts.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh every required root `.agent` document and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable pointer-admission fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

PhantomCommand     2026-07-12T13-59-50-04-00 selected
PrehistoricRush    2026-07-12T14-10-22-04-00
HorrorCorridor     2026-07-12T14-30-36-04-00
ZombieOrchard      2026-07-12T14-38-35-04-00
MyCozyIsland       2026-07-12T14-59-01-04-00
TheUnmappedHouse   2026-07-12T15-08-07-04-00
AetherVale         2026-07-12T15-18-50-04-00
TheOpenAbove       2026-07-12T15-40-04-04-00
IntoTheMeadow      2026-07-12T15-49-09-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/PhantomCommand` was modified in the Publish organization.

## Complete interaction loop

```txt
menu boot
  -> create 480 × 270 source canvas
  -> create procedural graveyard art and CRT renderer
  -> read settings and probe campaign-save presence
  -> create four main-menu items and optional panels
  -> attach pointer, keyboard and hidden-button listeners
  -> publish PhantomMenu
  -> start recursive RAF

pointer move
  -> project viewport coordinates through aspect containment only
  -> calculate main-menu or settings-row hit
  -> change selection only when a hit succeeds
  -> retain predecessor selection on a miss

main-menu pointer down
  -> project coordinates
  -> calculate menuHitIndex
  -> update selection only when index >= 0
  -> always call activateMain(current selection)
  -> a miss can launch Begin, Continue, Settings or Credits

settings pointer down
  -> project coordinates
  -> calculate panelHitIndex
  -> update row only when index >= 0
  -> always call activatePanel(current selected row)
  -> a miss can toggle CRT, grain or ambience, or close the panel

keyboard/accessibility activation
  -> keyboard Enter/Space or hidden button calls activateMain directly
  -> activation source is not typed or journaled

frame
  -> update fade and pointer velocity
  -> draw source menu
  -> contain and optionally curve source through CRT shader
  -> request successor RAF
```

## Domains in use

```txt
static menu and campaign route shells
menu settings, save presence, selection, panels, fade and navigation
viewport-to-source projection and source containment
CRT curved visual projection and source-to-display presentation
pointer move/down/leave and keyboard activation
hidden accessible button activation
menu control geometry and hit testing
menu action dispatch and route transition
Web Audio activation, ambience, UI tones and delayed close
campaign bootstrap, state, fixed-step combat and persistence
campaign pointer, camera and public host capabilities
procedural graveyard, campaign world, HUD and minimap rendering
WebGL shader/program/buffer/texture lifecycle
source checks, static build, Pages deployment and audit tracking
```

Missing pointer-admission domains:

```txt
input source identity
pointer sample and sequence identity
primary-pointer and primary-button policy
surface and layout generation
viewport transform revision
CRT inverse input projection
containment and hit-test typed results
panel generation and control identity
menu action command and admission result
stale and duplicate result rejection
pointer capture/cancel policy
first visible action-frame acknowledgement
bounded input observation and journal
browser and Pages geometry fixtures
```

## Source-backed findings

### Main-menu misses execute stale selection

The main pointer-down path updates `menu.selected` only when `menuHitIndex(point) >= 0`, then unconditionally calls `activateMain(menu.items[menu.selected])`. A miss therefore executes whichever item was selected before the click.

Concrete miss surfaces include:

```txt
letterbox regions where screenToSource returns inside=false
empty graveyard pixels outside x=55..245
vertical gaps between the four 18-pixel rows
pixels below or above the menu stack
```

### Settings misses mutate stale row

When any panel is open, pointer-down computes `panelHitIndex`, conditionally changes `state.panel.selected`, and then always calls `activatePanel()`. In the settings panel, a miss can toggle the previously selected CRT, grain or ambience row, or close the panel when row 3 was selected.

### Visual and logical geometry are different when CRT is enabled

The fragment shader applies `curveUv()` with `uCurve=0.035` when CRT is enabled. `screenToSource()` reverses only aspect containment. It does not invert the CRT curve. Pointer hover and activation are therefore evaluated against uncurved source geometry while the player sees curved geometry.

### Pointer admission is incomplete

```txt
pointer button check: absent
isPrimary check: absent
pointer capture: absent
pointer cancel handling: absent
pointer down/up sequence: absent
drag threshold: absent
current surface generation: absent
current panel generation: absent
layout revision: absent
transform revision: absent
typed hit result: absent
typed action result: absent
```

### Static checks do not execute input behavior

`scripts/check-menu.mjs` confirms source tokens for the canvas, modules, routes, art and CRT shader. It does not dispatch pointer events, test a miss, verify containment, compare curved geometry or assert zero mutation after rejection.

## Kit and service inventory

### Implemented kits

| Kit | Offered services |
|---|---|
| `crt-renderer-kit` | WebGL context acquisition; shader compile/link; fullscreen buffer; source texture upload; aspect containment; CRT curvature; aberration; grain; fade; draw; resize; viewport-to-source projection |
| `graveyard-art-kit` | procedural graveyard source drawing; title; menu rows; panels; highlights; environmental animation |
| `menu-route-kit` | main-menu action routing; fade transition; target URL selection; hidden-button activation; public `PhantomMenu.activate` |
| `menu-settings-persistence-kit` | settings defaults; localStorage read/write; CRT, grain and ambience values |
| `menu-save-presence-kit` | three-key scan across localStorage and sessionStorage; Continue enabled/disabled projection |
| `menu-audio-kit` | AudioContext creation; master gain; drone oscillator; looping wind buffer; UI tones; ambience stop and delayed close |
| `campaign-route-shell-kit` | campaign HTML/canvas entry; campaign module loading; route surface |
| `pixel-campaign-runtime-kit` | campaign state; entity IDs; selection; construction; orders; waves; pause; camera; restart; public `GameHost` |
| `fixed-step-campaign-simulation-kit` | accumulator; spawning; movement; targeting; projectile resolution; damage; rewards; terminal mutation |
| `pixel-campaign-render-kit` | campaign world; units; towers; projectiles; HUD; minimap; overlays; source-frame composition |
| `legacy-gamehost-diagnostics-kit` | live state exposure; camera exposure; direct mutation capabilities; diagnostic snapshots |
| `menu-static-check-kit` | menu HTML/module/source token checks |
| `campaign-static-check-kit` | campaign HTML/module/runtime/render token checks |
| `static-build-copy-kit` | static output creation; file and source directory copying |
| `pages-deploy-kit` | GitHub Pages build/deploy workflow and artifact publication |
| `construct-spiral-intro-kit` | ring-construction intro composition and ordered reveal |
| `construct-spiral-schedule-kit` | per-ring and per-piece construction timing |
| `construct-piece-id-kit` | stable construction-piece identity |
| `construct-piece-state-kit` | construction-piece progress and completion state |
| `construct-sequence-update-kit` | elapsed-time construction sequence updates and completion projection |

```txt
implemented source-backed kits: 20
planned pointer-admission authority kits: 27
```

## Required parent domain

```txt
phantom-command-menu-pointer-hit-admission-authority-domain
```

## Candidate coordinating kits

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

## Required transaction

```txt
PointerEvent
  -> allocate pointer sample and sequence ids
  -> require primary pointer and admitted button
  -> cite current menu surface, panel and layout generations
  -> project through the current viewport transform
  -> invert the active CRT transform or reject unsupported geometry
  -> produce typed containment result
  -> produce typed control hit result
  -> reject miss, stale surface, stale panel or stale transform with zero action mutation
  -> construct one MenuActionCommand only from a successful current hit
  -> commit one terminal MenuActionResult
  -> render the accepted selection/panel/transition revision
  -> acknowledge the first visible action frame
  -> publish detached observation and bounded journal
```

Keyboard and hidden-button activation remain valid, but must emit `inputSource=Keyboard` or `inputSource=AccessibilityControl` and must not fabricate pointer-hit evidence.

## Required invariants

```txt
A pointer miss never executes the selected action.
A settings-panel miss never toggles the selected row.
A letterbox click returns RejectedOutsideSurface.
A non-primary pointer or non-primary button returns RejectedPointerPolicy.
A stale panel/layout/transform result performs zero mutation.
One physical sequence produces at most one terminal action result.
CRT-on and CRT-off hit geometry matches the visible control geometry.
Keyboard and accessibility activation have explicit source identity.
The first visible menu frame cites the accepted action result.
```

## Validation boundary

```txt
runtime source changed: no
menu behavior changed: no
campaign behavior changed: no
pointer behavior changed: no
render behavior changed: no
audio behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser pointer smoke: not run
Pages pointer smoke: not run
pointer-admission fixtures: not implemented
```

This audit documents the current defect and target authority. It does not claim pointer misses, CRT geometry or duplicate activation are fixed.