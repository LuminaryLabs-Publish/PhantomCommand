# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-15T03-24-35-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric grave-ring defense game with procedural menu art, a fixed-step campaign simulation, Canvas2D world/HUD/minimap rendering, WebGL CRT presentation, localStorage save presence, direct browser input and GitHub Pages delivery.

The current audit isolates device-control coverage. The campaign exposes a single full-screen canvas and documents keyboard, wheel, drag and right-click controls. Touch pointers can select or box-select and can double-tap a pad to build the default tower, but the source provides no touch producer for starting waves, ordering units, selecting tower types, panning, zooming, pausing, restarting, exiting or focusing the camera. A touch-only player cannot begin or complete the campaign loop.

## Plan ledger

**Goal:** preserve the normalized campaign action model while ensuring every admitted device profile can start, command, build, navigate, pause and finish the game through explicit, non-conflicting control surfaces.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the Publish list against ten central ledger entries and ten root `.agent` states.
- [x] Confirm no new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repository.
- [x] Select only PhantomCommand through the oldest synchronized central timestamp rule.
- [x] Inspect `game.html`, `src/campaign/campaign-scene.js`, package checks and existing audit state.
- [x] Identify the complete interaction loop, all active domains, all 20 implemented kits and their services.
- [x] Map keyboard, mouse, wheel and touch action coverage.
- [x] Define the 22-surface device-control authority family.
- [x] Add the timestamped tracker and focused audit family.
- [x] Refresh the required root `.agent` documents and machine registry.
- [x] Preserve product runtime, gameplay, rendering, persistence, build and deployment behavior.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement semantic touch controls and device-profile admission.
- [ ] Execute touch-only, keyboard/mouse and hybrid-device browser fixtures.
- [ ] Prove source, built-output and GitHub Pages control parity.

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

selected: LuminaryLabs-Publish/PhantomCommand
prior central timestamp: 2026-07-14T23-38-29-04-00
selection rule: oldest synchronized central documentation timestamp
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Current accessible Publish inventory:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome
TheLongHaul
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

## Complete interaction loop

```txt
menu
  -> procedural Canvas2D graveyard presentation
  -> settings, save presence, audio and selection
  -> fade and navigate to game.html

campaign bootstrap
  -> create 640 x 360 Canvas2D source surface
  -> create WebGL CRT presentation surface
  -> author rings, lanes, pads, units, towers, waves, camera and state
  -> attach keyboard, pointer, wheel, context-menu and blur listeners
  -> start recursive RAF with fixed-step simulation

keyboard and mouse campaign
  -> WASD or arrows pan camera
  -> wheel zooms around pointer
  -> left click or drag selects units and pads
  -> middle drag pans camera
  -> right click orders selected units
  -> 1, 2 or 3 selects tower type
  -> second pad click builds selected tower type
  -> Space starts a wave
  -> P pauses, R reloads, Escape exits, F focuses selection
  -> simulation resolves waves, combat, rewards, loss and victory
  -> Canvas2D frame uploads into the CRT renderer

touch-only campaign
  -> touch pointer behaves as primary-button pointer
  -> tap or drag can select
  -> repeated pad tap can build the default spire
  -> no right-button order producer
  -> no middle-button pan producer
  -> no wheel zoom producer
  -> no keyboard wave, tower, pause, restart, exit or focus producer
  -> first wave cannot be deliberately started
  -> required campaign actions have no admitted touch surface
```

## Domains in use

1. Static HTML routes and ES-module lifecycle.
2. Browser document, RAF, performance clock, blur and navigation lifecycle.
3. Procedural menu art, settings, save presence, audio and route navigation.
4. Canvas2D pixel-art source rendering and text projection.
5. WebGL context, shader, texture upload and CRT presentation.
6. Campaign rings, lanes, pads, towers, units, waves and archetypes.
7. Fixed-step scheduling and mutable campaign simulation.
8. Spawn, movement, targeting, projectiles, damage, rewards and effects.
9. Camera projection, isometric transforms, pan, zoom and focus.
10. Keyboard, pointer, wheel, context-menu and touch-pointer input.
11. Selection, tower construction, unit orders and wave admission.
12. Device capability classification and action coverage.
13. Gesture ownership, pointer-button semantics and touch-action policy.
14. HUD, minimap, pause and terminal presentation.
15. LocalStorage victory marker and reload retry.
16. GameHost diagnostics and direct capabilities.
17. Construction intro choreography and sequence state.
18. Source checks, static build, Pages and central tracking.

## Implemented kits and offered services

| Kit | Services |
|---|---|
| `crt-renderer-kit` | WebGL context, source texture upload, CRT shaders, source-to-screen mapping and disposal. |
| `graveyard-art-kit` | Procedural animated menu drawing. |
| `menu-route-kit` | Menu selection, panels, fade and campaign navigation. |
| `menu-settings-persistence-kit` | Preference read/write and settings projection. |
| `menu-save-presence-kit` | Victory marker detection and continue presentation. |
| `menu-audio-kit` | AudioContext ambience, wind and UI tones. |
| `campaign-route-shell-kit` | Campaign canvas, accessibility fallback and module bootstrap. |
| `pixel-campaign-runtime-kit` | Authored campaign state, input listeners, lifecycle and public host. |
| `fixed-step-campaign-simulation-kit` | Accumulator, 60 Hz updates, waves, combat, rewards and terminal gates. |
| `pixel-campaign-render-kit` | World, entities, effects, sanctum, HUD, minimap and overlays. |
| `legacy-gamehost-diagnostics-kit` | State/camera readback, wave start, build and zoom mutation. |
| `menu-static-check-kit` | Menu source-marker assertions. |
| `campaign-static-check-kit` | Campaign HTML/source/CRT/build marker assertions. |
| `static-build-copy-kit` | Static product copy into output. |
| `pages-deploy-kit` | GitHub Pages artifact publication. |
| `construct-spiral-intro-kit` | Intro construction choreography. |
| `construct-spiral-schedule-kit` | Timed construction schedule. |
| `construct-piece-id-kit` | Stable construction-piece identity. |
| `construct-piece-state-kit` | Construction-piece state and visibility. |
| `construct-sequence-update-kit` | Construction sequence advancement. |

## Census

```txt
implemented source-backed kits: 20
planned device-control authority surfaces: 22
render surfaces: 3
executable package commands: 4
browser device fixtures: 0
```

## Main finding

`game.html` exposes one canvas with `touch-action:none` and a screen-reader-only instruction block. No visible DOM controls exist on the campaign route.

The campaign source binds actions directly to input modality details:

```txt
primary pointer button
  select units or pads
  box-select units
  second selection of an empty pad builds

middle pointer button
  pan camera

secondary pointer button
  order or attack

wheel
  zoom around pointer

keyboard
  WASD or arrows: pan
  Space: start wave
  1, 2, 3: tower type
  P: pause
  R: restart
  Escape: exit
  F: focus selection
```

Touch pointer events normally arrive as the primary button. The source does not translate touch gestures or visible controls into the remaining actions. The campaign therefore lacks complete touch-only action coverage and provides no typed admission result, control-generation identity, conflict arbitration or matching action-effect frame acknowledgement.

This is a source-backed capability gap. No physical device or browser-emulation fixture was executed.

## Required authority

```txt
phantom-command-device-control-action-coverage-authority-domain
```

```txt
DeviceControlAdmissionCommand
  -> bind document, route, viewport, device-capability,
     control-generation and action-map revisions
  -> resolve compatible ControlProfileDescriptors
  -> require complete coverage for selection, order, build,
     tower choice, wave start, camera pan, camera zoom,
     pause, restart, exit and focus
  -> prepare keyboard, mouse, wheel, touch and hybrid producers
  -> arbitrate pointer and gesture ownership
  -> route every accepted producer into semantic CampaignActionCommands
  -> reject stale, duplicate and conflicting control generations
  -> publish DeviceControlAdmissionResult and coverage receipts
  -> publish FirstDeviceControlSurfaceFrameAck
  -> publish FirstDeviceActionEffectFrameAck
```

## Repo-local output

Added under `2026-07-15T03-24-35-04-00`:

```txt
.agent/trackers/.../project-breakdown.md
.agent/turn-ledger/...md
.agent/architecture-audit/...device-control-action-coverage-dsk-map.md
.agent/render-audit/...touch-control-surface-visible-frame-gap.md
.agent/gameplay-audit/...touch-wave-order-immobility-loop.md
.agent/interaction-audit/...device-action-command-result-map.md
.agent/device-control-audit/...keyboard-pointer-touch-action-coverage-contract.md
.agent/deploy-audit/...device-control-browser-fixture-gate.md
.agent/central-sync-audit/...oldest-selection-device-control-reconciliation.md
```

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
input behavior changed: no
gameplay changed: no
Canvas2D or CRT rendering changed: no
persistence changed: no
package scripts or dependencies changed: no
workflows or deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
touch-only browser fixture: unavailable
hybrid-input fixture: unavailable
source/build/Pages parity: not run
```

No touch playability, device-profile admission, gesture-conflict safety, action-effect convergence, artifact parity, Pages parity or production readiness is claimed.