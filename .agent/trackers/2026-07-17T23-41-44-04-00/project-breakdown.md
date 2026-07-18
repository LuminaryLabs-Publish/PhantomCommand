# Project Breakdown — Menu Pointer Target Admission

**Timestamp:** `2026-07-17T23-41-44-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible repository  
**Reviewed pre-audit repository head:** `3ec991ec08f3ccf520ea983a5bbd971e8b45bb7c`  
**Reviewed runtime source revision:** `e92f61c79ed20998fdb4edfb962cac3754d3a651`  
**Status:** `menu-pointer-target-admission-authority-audited`

## Summary

The full `LuminaryLabs-Publish` inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have central ledger records, root `.agent` state and `main` heads matching their documented repo-local heads. PhantomCommand had the oldest synchronized central timestamp and is the only selected repository.

The focused finding is menu pointer-target admission. `graveyard-menu.js` correctly calculates whether the pointer is inside the CRT source and whether it intersects a main-menu or settings-panel row. The pointer-down handler then ignores a miss: background, letterbox and non-row clicks still activate the currently selected main item, while background clicks inside the settings panel still mutate the currently selected setting. Keyboard activation is intentionally selection-based; pointer activation currently inherits that keyboard semantic even without a valid pointer target.

This does not prove a production incident. It proves that the menu has hit-test helpers but no typed pointer-target decision separating `outside`, `background`, `disabled`, `main-item`, `settings-item` and intentional dismiss targets before action admission.

## Intent

Make one menu pointer-target authority resolve CRT/source containment, visible panel state, hit regions, item enablement and action identity before any pointer press can start navigation, mutate settings or dismiss a panel.

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm every eligible `main` head matches its documented repo-local head.
- [x] Select only PhantomCommand through the oldest documented-selection rule.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Trace CRT source mapping, main-menu hit testing, panel hit testing, pointer movement and pointer activation.
- [x] Define 17 product/runtime/fixture authority surfaces plus central reconciliation.
- [x] Add a new timestamped tracker and focused audit family.
- [ ] Implement typed pointer-target admission and execute source, artifact and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/PhantomCommand
selection rule: oldest synchronized eligible repository
selected prior central timestamp: 2026-07-17T11-39-49-04-00
pre-audit repository head: 3ec991ec08f3ccf520ea983a5bbd971e8b45bb7c
reviewed runtime source revision: e92f61c79ed20998fdb4edfb962cac3754d3a651
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu boot
  -> read settings and save presence
  -> create procedural Canvas2D scene and WebAudio state
  -> upload source canvas through the WebGL CRT renderer

keyboard path
  -> move selected menu or settings row
  -> Enter/Space intentionally activates the selected row

pointer path today
  -> map browser coordinates into CRT source coordinates
  -> menuHitIndex or panelHitIndex may return -1
  -> pointer-down still calls activateMain or activatePanel
  -> stale selected row is activated without a pointer target
  -> navigation, settings mutation or panel dismissal can occur
  -> frame renders without MenuPointerTargetResult or matching action acknowledgement

campaign
  -> fixed-step isometric selection, construction, orders, waves and combat
  -> Canvas2D source render and WebGL CRT presentation
```

## Domains in use

```txt
static HTML routes and ES modules
browser document, RAF, focus, blur, pointer, keyboard, wheel and storage lifecycle
procedural menu art, settings, save presence, audio and route transition
CRT browser-screen containment and source-coordinate mapping
menu main rows, settings rows, credits panel, enabled state and selection state
pointer target classification, action admission, action result and visible-frame proof
Canvas2D world, HUD, controls, minimap, overlays and pixel typography
WebGL context, shaders, source texture upload, viewport and CRT
campaign rings, lanes, pads, towers, units, waves, resources and outcomes
fixed-step movement, targeting, projectiles, combat, rewards and effects
camera, selection, building, orders, persistence and diagnostics
static checks, static build, Pages delivery, repo-local governance and central reconciliation
```

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `crt-renderer-kit` | WebGL context, shader compile/link, source texture upload, DPR-capped resize, CRT effects, contain mapping and browser-screen to source mapping. |
| `graveyard-art-kit` | Procedural graveyard, fog, twinkle, characters, pointer parallax, menu panels and selection pulse. |
| `menu-route-kit` | Menu selection, panels, enabled-state handling, transition flash/fade and campaign navigation. |
| `menu-settings-persistence-kit` | Settings parsing/defaults, CRT/grain/ambience mutation and localStorage write. |
| `menu-save-presence-kit` | Save-key probing and Continue availability projection. |
| `menu-audio-kit` | AudioContext, master bus, drone, generated wind, UI tones and ambience retirement. |
| `campaign-route-shell-kit` | Campaign document, application canvas, semantic fallback and module bootstrap. |
| `pixel-campaign-runtime-kit` | Rings, lanes, pads, camera, input, units, towers, projectiles, effects, selection, building and orders. |
| `fixed-step-campaign-simulation-kit` | Accumulator, waves, spawning, movement, targeting, combat, rewards, loss and victory. |
| `pixel-campaign-render-kit` | Isometric world projection, entities, effects, HUD, minimap, drag rectangle, selection rings and overlays. |
| `legacy-gamehost-diagnostics-kit` | State readback, camera references, wave/build commands and controlled zoom mutation. |
| `menu-static-check-kit` | Menu entry and source-marker assertions. |
| `campaign-static-check-kit` | Campaign entry and source-marker assertions. |
| `static-build-copy-kit` | Dist cleanup, directory creation and deployable file copy. |
| `pages-deploy-kit` | Install, build, Pages artifact upload and deployment. |
| `construct-spiral-intro-kit` | Construct opening choreography. |
| `construct-spiral-schedule-kit` | Timed construct schedule. |
| `construct-piece-id-kit` | Stable construct-piece identity. |
| `construct-piece-state-kit` | Construct-piece state and visibility. |
| `construct-sequence-update-kit` | Construction sequence advancement and settlement. |

```txt
implemented source-backed kits: 20
planned menu pointer-target authority surfaces: 17
```

## Source-backed finding

The current source establishes:

```txt
main hit test rejects outside source: yes
main hit test rejects menu background: yes
settings hit test rejects outside source/background: yes
pointer-down requires a valid main hit before activateMain: no
pointer-down requires a valid settings hit before activatePanel: no
keyboard activation of selected row: intentional
pointer activation of stale selected row after hit-test miss: present
static check for background/letterbox click rejection: absent
```

Main-menu pointer flow:

```txt
index = menuHitIndex(point)
if index >= 0: update selected index
activateMain(menu.items[menu.selected])  // unconditional
```

Settings-panel pointer flow:

```txt
index = panelHitIndex(point)
if index >= 0: update selected index
activatePanel()  // unconditional
```

## Current gaps

```txt
typed MenuPointerTargetResult: absent
outside-source rejection before action: absent
background rejection before action: absent
stale selected-row rejection for pointer input: absent
explicit disabled-target result: absent
pointer/keyboard activation semantic separation: absent
settings-row target requirement: absent
menu action admission result: absent
FirstMenuPointerActionFrameAck: absent
browser, artifact and Pages fixtures: absent
```

## Required authority

`phantom-command-menu-pointer-target-admission-authority-domain`

```txt
MenuPointerEvidenceCommand
  -> bind route, source mapping, panel, row-layout and enablement revisions

MenuPointerTargetAdmissionCommand
  -> classify outside, background, disabled, main-item, settings-item or dismiss target
  -> reject stale mapping and panel revisions
  -> publish MenuPointerTargetResult

MenuActionAdmissionCommand
  -> admit only an accepted pointer target
  -> keep keyboard selection activation as a separate explicit producer
  -> publish MenuActionResult

MenuActionProjectionCommitCommand
  -> commit navigation, settings or panel state
  -> publish FirstMenuPointerActionFrameAck
```

## Planned authority surfaces

```txt
phantom-command-menu-pointer-target-admission-authority-domain
crt-source-pointer-evidence-kit
menu-main-hit-region-kit
menu-panel-hit-region-kit
menu-visible-layer-order-kit
menu-item-enablement-admission-kit
menu-background-click-rejection-kit
menu-stale-selection-pointer-rejection-kit
keyboard-selection-activation-separation-kit
menu-pointer-target-result-kit
menu-action-admission-kit
menu-action-result-kit
first-menu-pointer-action-frame-ack-kit
menu-pointer-browser-fixture-kit
built-artifact-menu-pointer-parity-kit
pages-menu-pointer-parity-kit
menu-pointer-static-policy-check-kit
central-reconciliation-kit
```

The machine census records 17 proposed product/runtime/fixture surfaces and treats central reconciliation as governance.

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, pointer behavior, menu navigation, settings, gameplay, simulation, rendering, audio, persistence, packages, tests, workflows, build and deployment remain unchanged. No pointer-target correctness, accidental-action prevention, browser fixture, artifact parity, Pages parity or production readiness is claimed.