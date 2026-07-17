# Project Breakdown — Isometric Middle-Pan Anchor Convergence

**Timestamp:** `2026-07-16T23-59-01-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `isometric-middle-pan-anchor-convergence-authority-audited`

## Summary

The full `LuminaryLabs-Publish` inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten remain represented in the central ledger and have root `.agent` state. No repository is new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead. PhantomCommand is therefore selected through the oldest documented-selection rule.

The focused finding is the campaign's middle-button camera pan. Pointer deltas are measured in the 640×360 source surface, but the horizontal delta is converted to world x/z using `1 / 0.72`. The canonical inverse isometric transform uses `1 / 1.44` for horizontal source motion. Horizontal middle-drag therefore moves the camera at twice the displacement required to keep the grabbed world point under the pointer.

## Plan ledger

**Goal:** define one camera-pan authority that resolves source-space drag evidence through the canonical inverse transform and acknowledges the first frame in which the grabbed world anchor remains converged.

- [x] Compare the complete Publish repository inventory with central tracking.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Work on only PhantomCommand.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Preserve all 20 implemented kits and their services.
- [x] Trace CRT screen/source mapping, middle-button evidence, camera mutation, frame settlement and rendering.
- [x] Define 19 middle-pan authority surfaces.
- [x] Add a timestamped tracker and audit family.
- [ ] Implement and execute anchor-convergence fixtures.

## Selection

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
pre-audit documentation head: cf06a4165fc4459bfba2c3ed86c28494d47664be
reviewed runtime source revision: e92f61c79ed20998fdb4edfb962cac3754d3a651
```

## Complete interaction loop

```txt
menu
  -> restore settings and save presence
  -> procedural Canvas2D menu and WebAudio
  -> WebGL CRT presentation
  -> route to campaign

campaign
  -> keyboard, pointer and wheel evidence
  -> camera input and fixed-step simulation
  -> selection, construction, orders, waves, combat, rewards and outcomes
  -> Canvas2D world, HUD, minimap, effects and overlays
  -> WebGL CRT presentation

middle-button camera pan
  -> CRT adapter maps browser coordinates into source coordinates
  -> pointerdown stores source x/y
  -> pointermove calculates source dx/dy
  -> campaign mutates camera x/z with duplicated coefficients
  -> frame clamps camera and renders the resulting projection
  -> no accepted pan result or world-anchor convergence acknowledgement is published
```

## Domains in use

```txt
static HTML routes and ES modules
browser document, RAF, focus, blur, pointer, keyboard, wheel and storage lifecycle
procedural menu art, settings, save presence, audio and routing
Canvas2D fixed-resolution source presentation and pixel typography
WebGL context, shaders, texture upload, viewport, CRT and screen/source mapping
campaign rings, lanes, pads, towers, units, waves, archetypes, resources and terminal state
fixed-step scheduling, movement, targeting, projectiles, damage, rewards and effects
camera position, velocity, zoom, clamping, source/world transforms and focus behavior
click selection, marquee selection, building, orders, pause, restart, route exit and diagnostics
middle-pan evidence, gesture generation, inverse-transform policy, anchor convergence and frame proof
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
planned middle-pan authority surfaces: 19
```

## Source-backed middle-pan path

The canonical inverse transform is:

```txt
worldX = cameraX + sourceY / (zoom * 0.72) + sourceX / (zoom * 1.44)
worldZ = cameraZ + sourceY / (zoom * 0.72) - sourceX / (zoom * 1.44)
```

To preserve the world point grabbed at pointer-down, a source delta should produce:

```txt
deltaCameraX = -deltaY / (zoom * 0.72) - deltaX / (zoom * 1.44)
deltaCameraZ = -deltaY / (zoom * 0.72) + deltaX / (zoom * 1.44)
```

The active middle-pan path instead applies:

```txt
deltaCameraX = -deltaY / (zoom * 0.72) - deltaX / (zoom * 0.72)
deltaCameraZ = -deltaY / (zoom * 0.72) + deltaX / (zoom * 0.72)
```

Vertical conversion matches the canonical inverse. Horizontal conversion is doubled. The implementation also duplicates transform mathematics instead of consuming the existing `screenToWorld` authority.

## Main gaps

```txt
single canonical screen-delta-to-world transform
camera snapshot bound to one pan generation
pointer ID and middle-button lifecycle result
inside-source admission
exact grabbed-world-anchor snapshot
horizontal and vertical convergence result
camera-boundary settlement result
stale route/camera/gesture rejection
MiddlePanResult
FirstMiddlePanFrameAck
PanAnchorConvergenceAck
browser, built-artifact and Pages fixtures
```

This is a source-backed geometry gap. It does not prove that every user perceives the current pan as defective or that keyboard pan, wheel zoom, selection, orders, combat or deployment are broken.

## Required authority

`phantom-command-isometric-middle-pan-anchor-convergence-authority-domain`

```txt
MiddlePanAdmissionCommand
  -> bind document, route, canvas, viewport, pointer, camera and frame revisions
  -> admit one middle-button gesture generation
  -> capture source start and grabbed world anchor
  -> reject outside, stale, cancelled or retired evidence
  -> publish MiddlePanAdmissionResult

MiddlePanProjectionCommand
  -> normalize source deltas
  -> resolve camera displacement through the canonical inverse isometric transform
  -> settle camera bounds
  -> publish MiddlePanResult
  -> render the matching camera projection
  -> publish FirstMiddlePanFrameAck
  -> publish PanAnchorConvergenceAck
```

## Planned authority surfaces

```txt
phantom-command-isometric-middle-pan-anchor-convergence-authority-domain
middle-pointer-evidence-observer-kit
source-viewport-admission-kit
middle-pan-gesture-generation-kit
pan-camera-snapshot-kit
grabbed-world-anchor-snapshot-kit
source-delta-normalizer-kit
isometric-screen-delta-inverse-transform-kit
pan-anchor-world-solver-kit
pan-anchor-convergence-controller-kit
camera-bounds-settlement-kit
stale-pan-generation-rejection-kit
middle-pan-result-kit
first-middle-pan-frame-ack-kit
pan-anchor-convergence-ack-kit
middle-pan-browser-fixture-kit
built-artifact-pan-parity-kit
pages-pan-parity-kit
central-reconciliation-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, camera behavior, input behavior, simulation, rendering, audio, persistence, packages, tests, workflows, build and deployment remain unchanged. No corrected pan coefficient, anchor convergence, artifact parity, Pages parity or production readiness is claimed.