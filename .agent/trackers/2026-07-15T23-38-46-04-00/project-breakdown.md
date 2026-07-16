# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-15T23-38-46-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `pointer-gesture-capture-cancel-authority-audited`

## Summary

The full 11-repository Publish inventory was compared with ten eligible central ledgers and root `.agent` states. TheCavalryOfRome was excluded. No new, ledger-missing, root-agent-missing or undocumented repository was found. PhantomCommand had the oldest synchronized central timestamp and was selected alone.

The campaign starts selection-drag and camera-pan gestures on the canvas without pointer capture. Release is processed only by canvas `pointerup`; cancellation, lost capture, outside release and gesture generation are absent. A gesture can remain latched after the pointer leaves until a later blur or matching canvas release.

## Plan ledger

**Goal:** document one pointer-gesture authority that guarantees completion or cancellation across the full browser lifecycle.

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Select only PhantomCommand by oldest synchronized timestamp.
- [x] Trace menu, campaign boot, input, simulation, rendering, persistence and deployment.
- [x] Identify all 20 implemented kits and their services.
- [x] Define one parent authority and 19 coordinating surfaces.
- [x] Add the timestamped audit family and refresh root state.
- [ ] Implement and execute pointer lifecycle fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead at selection: 0

PhantomCommand     2026-07-15T18-39-30-04-00 selected
AetherVale         2026-07-15T18-58-52-04-00
TheLongHaul        2026-07-15T19-38-38-04-00
MyCozyIsland       2026-07-15T19-58-42-04-00
IntoTheMeadow      2026-07-15T20-38-13-04-00
PrehistoricRush    2026-07-15T20-59-46-04-00
HorrorCorridor     2026-07-15T21-39-15-04-00
TheOpenAbove       2026-07-15T22-00-36-04-00
ZombieOrchard      2026-07-15T22-40-29-04-00
TheUnmappedHouse   2026-07-15T23-00-03-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
menu
  -> restore settings and save presence
  -> render procedural graveyard through Canvas2D and CRT
  -> route New or Continue to the campaign

campaign boot
  -> create source and public canvases
  -> create rings pads units towers camera state and listeners
  -> publish GameHost
  -> start fixed-step RAF

active play
  -> keyboard pans camera and triggers waves structures pause reload focus and exit
  -> left pointer begins point or drag selection
  -> right pointer submits unit orders
  -> middle pointer begins camera pan
  -> wheel zooms around the projected pointer
  -> simulation advances waves movement combat rewards and terminal state
  -> Canvas2D draws world HUD minimap and overlays
  -> WebGL presents the CRT frame

pointer lifecycle gap
  -> primary or middle pointerdown starts mutable gesture state
  -> no pointer capture is acquired
  -> canvas pointerup is the only ordinary completion path
  -> outside release cancel or lost capture has no result
  -> gesture can remain active until blur or later canvas evidence
```

## Domains in use

```txt
static routes and ES modules
browser document RAF navigation blur and page lifecycle
procedural menu art settings save presence audio and routing
Canvas2D source rendering and pixel typography
WebGL context shaders texture upload viewport and CRT presentation
campaign world rings lanes pads towers units waves and archetypes
fixed-step scheduling movement targeting projectiles damage rewards and effects
isometric camera projection pan zoom focus and bounds
keyboard pointer wheel context-menu and blur input
pointer identity capture gesture generation release cancellation and retirement
selection build order drag and camera command admission
HUD minimap pause and terminal presentation
localStorage victory marker and retry
public diagnostic capability
construction choreography
source checks static build Pages and central tracking
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `crt-renderer-kit` | WebGL context, source upload, shaders, resize, CRT presentation and screen/source mapping. |
| `graveyard-art-kit` | Procedural animated menu art. |
| `menu-route-kit` | Selection, panels, fade and navigation. |
| `menu-settings-persistence-kit` | Preference read, write and projection. |
| `menu-save-presence-kit` | Save-marker detection and Continue state. |
| `menu-audio-kit` | Audio context, persistent ambience, UI tones and preference settlement. |
| `campaign-route-shell-kit` | Campaign canvas, hidden-cursor policy, semantic fallback and bootstrap. |
| `pixel-campaign-runtime-kit` | Campaign state, camera, listeners, selection, build and order mutation. |
| `fixed-step-campaign-simulation-kit` | Accumulator, waves, movement, combat, rewards and terminal gates. |
| `pixel-campaign-render-kit` | World, entities, effects, HUD, minimap, drag outline and overlays. |
| `legacy-gamehost-diagnostics-kit` | Live references, direct commands and summary readback. |
| `menu-static-check-kit` | Menu source-marker assertions. |
| `campaign-static-check-kit` | Campaign source and build-marker assertions. |
| `static-build-copy-kit` | Static output assembly. |
| `pages-deploy-kit` | Pages artifact publication. |
| `construct-spiral-intro-kit` | Intro construction choreography. |
| `construct-spiral-schedule-kit` | Timed construction schedule. |
| `construct-piece-id-kit` | Stable construction identity. |
| `construct-piece-state-kit` | Piece state and visibility. |
| `construct-sequence-update-kit` | Construction sequence advancement. |

```txt
implemented source-backed kits: 20
planned pointer-gesture authority surfaces: 19
```

## Main finding

`pointerdown` sets `input.drag` for button 0 or `input.middle=true` for button 1. No call to `setPointerCapture()` exists. `pointerup` clears those values only when the release is delivered to the canvas. There are no `pointercancel` or `lostpointercapture` handlers and no pointer-id/generation binding. Blur clears mutable state but does not publish why the gesture ended. Rendering and camera movement continue to consume the latched flags.

This is a source-backed lifecycle gap. No stuck selection, unintended camera motion or browser-specific failure was reproduced.

## Required authority

`phantom-command-pointer-gesture-capture-cancel-authority-domain`

```txt
PointerGestureAdmissionCommand
  -> bind surface pointer button route camera selection and policy revisions
  -> allocate PointerGestureGeneration
  -> request pointer capture when supported
  -> publish accepted unsupported or rejected admission

PointerGestureEvidenceCommand
  -> accept move release cancel lost-capture blur visibility and retirement evidence
  -> require matching pointer id and generation
  -> reject stale duplicate and superseded evidence

PointerGestureSettlementCommand
  -> complete or cancel selection drag or camera pan exactly once
  -> release owned pointer capture
  -> clear mutable gesture state
  -> publish PointerGestureResult
  -> acknowledge FirstGestureEffectFrameAck
```

## Output

```txt
.agent/trackers/2026-07-15T23-38-46-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T23-38-46-04-00.md
.agent/architecture-audit/2026-07-15T23-38-46-04-00-pointer-gesture-capture-cancel-dsk-map.md
.agent/render-audit/2026-07-15T23-38-46-04-00-latched-drag-pan-visible-frame-gap.md
.agent/gameplay-audit/2026-07-15T23-38-46-04-00-outside-release-stuck-gesture-loop.md
.agent/interaction-audit/2026-07-15T23-38-46-04-00-pointer-gesture-command-result-map.md
.agent/pointer-gesture-audit/2026-07-15T23-38-46-04-00-capture-release-cancel-contract.md
.agent/deploy-audit/2026-07-15T23-38-46-04-00-pointer-lifecycle-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T23-38-46-04-00-oldest-selection-pointer-gesture-reconciliation.md
```
