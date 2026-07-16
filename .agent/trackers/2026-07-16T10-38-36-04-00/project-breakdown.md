# PhantomCommand Project Breakdown — Wheel Zoom Delta and Anchor Convergence

**Timestamp:** `2026-07-16T10-38-36-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible repository  
**Status:** `wheel-zoom-delta-anchor-convergence-authority-audited`

## Summary

The current Publish organization contains 11 accessible repositories. Ten remain eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have central ledger records, root `.agent` state and synchronized documentation heads. PhantomCommand was selected because its central timestamp, `2026-07-16T04-27-44-04-00`, was the oldest after TheUnmappedHouse was reconciled.

The focused finding is in campaign camera zoom. The wheel listener applies one scalar to raw `deltaY` without reading `deltaMode`. It snapshots `before` and `after` world positions while `camera.zoom` is still unchanged, so the immediate pointer-anchor correction is zero. RAF easing changes zoom later and can move the world point beneath the pointer.

## Plan ledger

**Goal:** document one device-normalized, route-bound wheel-zoom authority that preserves the chosen world anchor through eased camera convergence and the matching visible frame.

- [x] Compare the full Publish inventory against `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Exclude Cavalry of Rome.
- [x] Confirm ten eligible ledger records and ten root `.agent` states.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented or runtime-ahead repositories.
- [x] Select only PhantomCommand by oldest synchronized timestamp.
- [x] Identify the interaction loop and all domains in use.
- [x] Identify all 20 implemented kits and every offered service.
- [x] Trace wheel evidence, source mapping, camera targets, easing and rendered projection.
- [x] Define one parent wheel-zoom authority and 18 coordinating surfaces.
- [x] Add the timestamped repo-local audit family.
- [ ] Implement and execute cross-device wheel and pointer-anchor fixtures.

## Selection evidence

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
prior timestamp: 2026-07-16T04-27-44-04-00
selection rule: oldest synchronized eligible repository
previous selected repo: LuminaryLabs-Publish/TheUnmappedHouse
```

## Interaction loop

```txt
page boot
  -> create fixed-resolution Canvas2D source surface
  -> create WebGL CRT output surface
  -> restore menu settings and save presence

menu
  -> keyboard pointer or hidden semantic button input
  -> update selection panels settings audio and route transition
  -> draw procedural graveyard
  -> upload source canvas to WebGL
  -> present CRT frame

campaign boot
  -> create rings lanes pads units towers and camera state
  -> install keyboard pointer wheel contextmenu and blur listeners

campaign frame
  -> read held keyboard camera input
  -> ease camera velocity and zoom
  -> run fixed-step waves movement combat rewards and outcomes
  -> draw world entities effects HUD minimap and overlays
  -> upload Canvas2D source to WebGL
  -> present CRT frame

wheel zoom
  -> map browser coordinates to source coordinates
  -> calculate world point with current zoom
  -> update targetZoom from raw deltaY
  -> calculate the same world point again with unchanged current zoom
  -> apply zero camera correction
  -> ease zoom later in RAF
  -> render a changed projection without anchor/result acknowledgement
```

## Domains in use

```txt
static HTML routes and ES modules
browser document RAF focus blur pointer keyboard wheel and storage lifecycle
procedural menu art settings save presence audio and routing
Canvas2D fixed-resolution source presentation and pixel typography
WebGL context shaders texture upload viewport CRT curve flicker grain and contain mapping
campaign rings lanes pads towers units waves archetypes resources and terminal state
fixed-step scheduling movement targeting projectiles damage rewards and effects
camera position velocity zoom target zoom clamping and source/world coordinate transforms
selection building orders pause restart route exit and diagnostics
wheel evidence units trackpad bursts camera revisions world anchors results and frame proof
source checks static build Pages delivery repo-local audit governance and central reconciliation
```

## Implemented kits and offered services

| Kit | Services offered |
|---|---|
| `crt-renderer-kit` | WebGL context creation, shader compilation/linking, source texture allocation/upload, DPR-capped resize, viewport, CRT curve/flicker/grain, contain mapping and screen-to-source mapping. |
| `graveyard-art-kit` | Procedural graveyard layout, fog, twinkle, crow/reaper animation, pointer parallax, menu labels, panels and selection pulse. |
| `menu-route-kit` | Menu selection, enabled-state handling, panel routing, transition flash/fade and navigation to campaign. |
| `menu-settings-persistence-kit` | Local settings parse, defaults, CRT/grain/ambience mutation and localStorage write. |
| `menu-save-presence-kit` | Save-key probing across localStorage/sessionStorage and Continue availability projection. |
| `menu-audio-kit` | AudioContext creation, master bus, drone, generated wind noise, UI tones, ambience enable/disable and context close. |
| `campaign-route-shell-kit` | Campaign document, application canvas, semantic fallback instructions and module bootstrap. |
| `pixel-campaign-runtime-kit` | Rings, lanes, pads, camera, input state, units, towers, projectiles, effects, selection, building and orders. |
| `fixed-step-campaign-simulation-kit` | Accumulator, wave queue, spawning, movement, targeting, attacks, projectiles, damage, rewards, sanctum loss and victory. |
| `pixel-campaign-render-kit` | Isometric projection, world geometry, entities, effects, HUD, minimap, selection rectangle, overlays and CRT submission. |
| `legacy-gamehost-diagnostics-kit` | Readable campaign state, camera references, wave/build commands and controlled zoom target mutation. |
| `menu-static-check-kit` | Menu entry, source and required marker assertions. |
| `campaign-static-check-kit` | Campaign entry, source and required marker assertions. |
| `static-build-copy-kit` | Deployable static-file enumeration, dist cleanup, directory creation and file copy. |
| `pages-deploy-kit` | Dependency install, static build, Pages artifact upload and Pages deployment. |
| `construct-spiral-intro-kit` | Construct opening choreography and ordered assembly intent. |
| `construct-spiral-schedule-kit` | Timed construction schedule and phase timing. |
| `construct-piece-id-kit` | Stable construct-piece identity. |
| `construct-piece-state-kit` | Piece state, visibility and assembled-state projection. |
| `construct-sequence-update-kit` | Construction sequence advancement and final settlement. |

```txt
implemented source-backed kits: 20
planned wheel-zoom authority surfaces: 19
```

## Main finding

The wheel listener in `src/campaign/campaign-scene.js` performs:

```txt
before = screenToWorld(pointer) with camera.zoom Z
targetZoom = clamp(targetZoom * exp(-deltaY * 0.0012))
after = screenToWorld(pointer) with camera.zoom still Z
camera += before - after
```

Because the current zoom used by both transforms is identical, `before` and `after` are identical and the correction is zero. The current zoom changes only later inside RAF:

```txt
camera.zoom += (camera.targetZoom - camera.zoom) * easing
```

The same handler also ignores `WheelEvent.deltaMode`, so pixel, line and page deltas are treated as if they were the same unit.

```txt
raw deltaY scaling: present
deltaMode normalization: absent
target zoom clamp: present
world anchor snapshot: partial
anchor solve against accepted target/current zoom revision: absent
trackpad burst coalescing: absent
WheelZoomResult: absent
FirstWheelZoomFrameAck: absent
ZoomAnchorConvergenceAck: absent
```

This is a source-backed input and camera-convergence gap. No specific device failure was reproduced.

## Required authority

`phantom-command-wheel-zoom-delta-anchor-convergence-authority-domain`

```txt
WheelZoomAdmissionCommand
  -> bind document route canvas pointer camera policy and frame revisions
  -> normalize pixel line and page wheel units
  -> coalesce trackpad bursts into one accepted zoom revision
  -> snapshot the intended world-space pointer anchor
  -> derive and clamp one target zoom
  -> classify accepted unchanged invalid superseded or retired
  -> publish WheelZoomResult

ZoomAnchorConvergenceCommand
  -> bind the accepted wheel result and camera revision
  -> ease current zoom toward the accepted target
  -> solve camera translation so the stored world point remains beneath the pointer
  -> reject stale route or camera generations
  -> publish FirstWheelZoomFrameAck
  -> publish ZoomAnchorConvergenceAck at tolerance
```

## Planned authority surfaces

```txt
phantom-command-wheel-zoom-delta-anchor-convergence-authority-domain
wheel-evidence-observer-kit
wheel-delta-mode-normalizer-kit
wheel-trackpad-burst-coalescer-kit
wheel-zoom-command-admission-kit
camera-zoom-policy-kit
camera-zoom-revision-kit
zoom-anchor-world-solver-kit
zoom-anchor-convergence-controller-kit
camera-route-generation-guard-kit
stale-wheel-evidence-rejection-kit
zoom-clamp-settlement-kit
wheel-zoom-result-kit
first-wheel-zoom-frame-ack-kit
zoom-anchor-convergence-ack-kit
wheel-browser-device-fixture-kit
built-artifact-zoom-parity-kit
pages-zoom-parity-kit
central-reconciliation-kit
```

## Required output created

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-16T10-38-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T10-38-36-04-00.md
.agent/architecture-audit/2026-07-16T10-38-36-04-00-wheel-zoom-delta-anchor-dsk-map.md
.agent/render-audit/2026-07-16T10-38-36-04-00-pointer-anchor-visible-frame-gap.md
.agent/gameplay-audit/2026-07-16T10-38-36-04-00-device-dependent-camera-zoom-loop.md
.agent/interaction-audit/2026-07-16T10-38-36-04-00-wheel-zoom-command-result-map.md
.agent/camera-zoom-audit/2026-07-16T10-38-36-04-00-delta-normalization-anchor-convergence-contract.md
.agent/deploy-audit/2026-07-16T10-38-36-04-00-wheel-zoom-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T10-38-36-04-00-oldest-selection-wheel-zoom-reconciliation.md
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, simulation, input behavior, camera behavior, rendering, audio, persistence, dependencies, tests, workflows, build and deployment were not changed. `npm run check`, `npm run build`, browser fixtures, artifact smoke and Pages smoke were not run. No cross-device wheel equivalence, pointer-anchor preservation, convergence, artifact parity, Pages parity or production readiness is claimed.