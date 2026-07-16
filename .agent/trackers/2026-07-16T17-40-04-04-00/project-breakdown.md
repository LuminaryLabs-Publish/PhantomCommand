# PhantomCommand Project Breakdown — Isometric Marquee Selection Geometry

**Timestamp:** `2026-07-16T17-40-04-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible repository  
**Status:** `isometric-marquee-selection-geometry-authority-audited`

## Summary

The current Publish organization contains 11 accessible repositories. Ten remain eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have central ledger records, root `.agent` state and synchronized documentation heads. PhantomCommand was selected because its central timestamp, `2026-07-16T10-38-36-04-00`, was the oldest eligible timestamp.

The focused finding is in campaign drag selection. The renderer draws a source-space rectangle, but pointer-up inverse-transforms only the top-left and bottom-right corners and then filters units through an axis-aligned world x/z box. The isometric inverse transform places the z extrema at the omitted top-right and bottom-left corners, so visible rectangle membership and accepted unit membership are not equivalent.

## Plan ledger

**Goal:** document one camera-bound marquee-selection authority that makes the accepted selected set identical to the visible rectangle and binds it to the matching frame.

- [x] Compare the full Publish inventory against `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Exclude Cavalry of Rome.
- [x] Confirm ten eligible ledger records and ten root `.agent` states.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented or runtime-ahead repositories.
- [x] Select only PhantomCommand by oldest synchronized timestamp.
- [x] Identify the interaction loop and all domains in use.
- [x] Identify all 20 implemented kits and every offered service.
- [x] Trace drag evidence, camera transforms, selection membership and rendered rings.
- [x] Define one parent marquee-selection authority and 18 coordinating surfaces.
- [x] Add the timestamped repo-local audit family.
- [ ] Implement and execute geometry, camera, artifact and Pages fixtures.

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
prior timestamp: 2026-07-16T10-38-36-04-00
next oldest: LuminaryLabs-Publish/AetherVale
next timestamp: 2026-07-16T11-41-17-04-00
selection rule: oldest synchronized eligible repository
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
  -> create rings lanes pads units towers camera and input state
  -> install keyboard pointer wheel contextmenu and blur listeners

campaign frame
  -> read held keyboard camera input
  -> ease camera velocity and zoom
  -> run fixed-step waves movement combat rewards and outcomes
  -> draw world entities effects HUD minimap selection and overlays
  -> upload Canvas2D source to WebGL
  -> present CRT frame

marquee selection
  -> primary pointerdown stores source-space drag origin
  -> pointermove updates source-space pointer
  -> renderer draws normalized source-space rectangle
  -> pointerup inverse-transforms two diagonal corners
  -> runtime derives world x/z bounds from those two points
  -> runtime filters allies against the derived world box
  -> selected rings render for the accepted set
```

## Domains in use

```txt
static HTML routes and ES modules
browser document RAF focus blur pointer keyboard wheel storage and navigation lifecycle
procedural menu art settings save presence audio and routing
Canvas2D fixed-resolution source presentation and pixel typography
WebGL context shaders texture upload viewport CRT curve flicker grain and contain mapping
campaign rings lanes pads towers units waves archetypes resources and terminal state
fixed-step scheduling movement targeting projectiles damage rewards and effects
camera position velocity zoom target zoom clamping and source/world coordinate transforms
selection click drag additive policy building orders pause restart route exit and diagnostics
marquee drag generation camera binding rectangle normalization membership results and frame proof
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
| `pixel-campaign-runtime-kit` | Rings, lanes, pads, camera, input state, units, towers, projectiles, effects, click/drag selection, building and orders. |
| `fixed-step-campaign-simulation-kit` | Accumulator, wave queue, spawning, movement, targeting, attacks, projectiles, damage, rewards, sanctum loss and victory. |
| `pixel-campaign-render-kit` | Isometric projection, world geometry, entities, effects, HUD, minimap, visible drag rectangle, selection rings, overlays and CRT submission. |
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
planned marquee-selection authority surfaces: 19
```

## Main finding

The pointer-up path in `src/campaign/campaign-scene.js` performs:

```txt
screen rectangle:
  minX minY
  maxX maxY

A = screenToWorld(minX, minY)
B = screenToWorld(maxX, maxY)

selected =
  ally.x between min(A.x, B.x) and max(A.x, B.x)
  ally.z between min(A.z, B.z) and max(A.z, B.z)
```

The inverse projection is:

```txt
worldX = cameraX + screenY / 0.72 + screenX / 1.44
worldZ = cameraZ + screenY / 0.72 - screenX / 1.44
```

For a normalized screen rectangle:

```txt
worldX minimum -> top-left
worldX maximum -> bottom-right
worldZ minimum -> top-right
worldZ maximum -> bottom-left
```

The current code computes only the world-x extrema correctly. It omits the corners that determine the world-z range. The resulting world box can be narrower, shifted or otherwise different from the visible drag rectangle.

```txt
visible source rectangle: present
two diagonal corner transforms: present
four-corner world polygon: absent
direct screen-space unit test: absent
camera-bound drag revision: absent
MarqueeSelectionResult: absent
FirstMarqueeSelectionFrameAck: absent
```

This is a source-backed selection-geometry gap. No specific user incident was reproduced.

## Required authority

`phantom-command-isometric-marquee-selection-geometry-authority-domain`

```txt
MarqueeSelectionCommand
  -> bind document route canvas viewport camera and selection revisions
  -> bind pointer ID drag generation start and end source positions
  -> normalize direction and classify click versus marquee
  -> reject outside retired stale or cancelled evidence
  -> project eligible units into source space
  -> evaluate exact visible-rectangle membership
  -> apply replace additive or toggle policy
  -> publish MarqueeSelectionResult

SelectionCommitCommand
  -> bind expected selection revision and accepted result
  -> commit selected IDs exactly once
  -> reject stale duplicate or superseded results
  -> publish SelectionCommitResult
  -> render matching selected rings
  -> publish FirstMarqueeSelectionFrameAck
```

## Planned authority surfaces

```txt
1  phantom-command-isometric-marquee-selection-geometry-authority-domain
2  pointer-drag-evidence-observer-kit
3  source-viewport-admission-kit
4  marquee-drag-generation-kit
5  selection-rectangle-normalizer-kit
6  selection-camera-snapshot-kit
7  isometric-coordinate-transform-kit
8  four-corner-world-polygon-kit
9  unit-source-projection-kit
10 rectangle-membership-evaluator-kit
11 selection-modifier-policy-kit
12 stale-drag-generation-rejection-kit
13 marquee-selection-result-kit
14 selected-state-commit-kit
15 first-marquee-selection-frame-ack-kit
16 marquee-browser-geometry-fixture-kit
17 built-artifact-selection-parity-kit
18 pages-selection-parity-kit
19 central-reconciliation-kit
```

## Required output created

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-16T17-40-04-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T17-40-04-04-00.md
.agent/architecture-audit/2026-07-16T17-40-04-04-00-isometric-marquee-selection-dsk-map.md
.agent/render-audit/2026-07-16T17-40-04-04-00-visible-rectangle-selected-set-gap.md
.agent/gameplay-audit/2026-07-16T17-40-04-04-00-drag-selection-membership-loop.md
.agent/interaction-audit/2026-07-16T17-40-04-04-00-marquee-selection-command-result-map.md
.agent/selection-geometry-audit/2026-07-16T17-40-04-04-00-screen-rectangle-isometric-membership-contract.md
.agent/deploy-audit/2026-07-16T17-40-04-04-00-marquee-selection-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T17-40-04-04-00-oldest-selection-marquee-geometry-reconciliation.md
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, simulation, input behavior, camera behavior, rendering, audio, persistence, dependencies, tests, workflows, build and deployment were not changed. `npm run check`, `npm run build`, browser fixtures, artifact smoke and Pages smoke were not run. No corrected marquee membership, drag-direction equivalence, selected-frame convergence, artifact parity, Pages parity or production readiness is claimed.
