# Project Breakdown — Campaign Input Region Arbitration

**Timestamp:** `2026-07-17T06-38-14-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible repository  
**Reviewed pre-audit repository head:** `c36fdc0cb2b9a23e002b4b949efe30f913f3b541`  
**Reviewed runtime source revision:** `e92f61c79ed20998fdb4edfb962cac3754d3a651`  
**Status:** `campaign-input-region-arbitration-authority-audited`

## Summary

The full `LuminaryLabs-Publish` inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have central ledger records, root `.agent` state and synchronized documented heads. PhantomCommand has the oldest eligible central timestamp and is the only selected repository.

The focused finding is campaign pointer-region arbitration. The 640×360 source frame draws world content, HUD panels, tower controls, terminal overlays and a minimap into one Canvas2D surface. Pointer handlers map every canvas event through `screenToSource()` and then issue world selection, marquee or order commands without checking `pointer.inside` or whether the source point is covered by HUD, minimap or terminal UI. A pointer gesture can therefore be interpreted as a world command even when its visible target is a non-world presentation region.

## Intent

Make one source-region authority decide whether pointer evidence belongs to the world, HUD, minimap, modal overlay or excluded letterbox space before any selection, order, build or camera command is admitted.

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Confirm all eligible documented heads are synchronized.
- [x] Select only PhantomCommand through the oldest documented-selection rule.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Trace source mapping, visible UI regions and world-command admission.
- [x] Define 18 campaign input-region authority surfaces.
- [x] Add a new timestamped tracker and focused audit family.
- [ ] Implement region manifests, command arbitration and browser fixtures.

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
prior central timestamp: 2026-07-16T23-59-01-04-00
pre-audit repository head: c36fdc0cb2b9a23e002b4b949efe30f913f3b541
reviewed runtime source revision: e92f61c79ed20998fdb4edfb962cac3754d3a651
excluded: LuminaryLabs-Publish/TheCavalryOfRome
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
  -> Canvas2D world, HUD, minimap, drag rectangle and terminal overlays
  -> WebGL CRT presentation

pointer region path today
  -> browser coordinates map to source coordinates
  -> source point records x, y and inside
  -> pointerdown/up handlers do not consume inside
  -> no HUD, minimap or modal hit-region classification runs
  -> click, marquee or RMB order resolves through screenToWorld
  -> world state mutates behind the visible presentation region
  -> no typed region decision, command result or matching frame acknowledgement exists
```

## Domains in use

```txt
static HTML routes and ES modules
browser document, RAF, focus, blur, pointer, keyboard, wheel and storage lifecycle
procedural menu art, settings, save presence, audio and routing
Canvas2D fixed-resolution world, HUD, controls, minimap, overlays and pixel typography
WebGL context, shaders, texture upload, viewport, CRT and browser/source mapping
campaign rings, lanes, pads, towers, units, waves, archetypes, resources and terminal state
fixed-step scheduling, movement, targeting, projectiles, damage, rewards and effects
camera position, velocity, zoom, clamping and source/world transforms
click selection, marquee selection, construction, orders, pause, restart and route exit
source-region classification, visible occlusion, pointer-command arbitration and frame proof
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
planned input-region authority surfaces: 18
```

## Source-backed finding

The source frame visibly reserves these regions:

```txt
status HUD: x 8..268, y 8..64
tower controls: x 8..338, y 312..352
minimap: x 536..632, y 8..78
paused/won/lost overlay: x 0..640, y 0..360
world presentation: shares the same source surface beneath every region
```

The active evidence path is:

```txt
setPointer(event)
  -> crt.screenToSource(clientX, clientY)
  -> input.pointer = { x, y, inside }

left pointerdown/up
  -> starts click or marquee without checking inside or visible region
  -> screenToWorld(sourcePoint)
  -> selection mutation

right pointerdown
  -> screenToWorld(sourcePoint)
  -> order mutation
```

The `inside` value is recorded but not consumed. No region manifest identifies the HUD, minimap, controls or modal overlay, and no arbitration result proves that a world command originated from an unobscured world region.

## Main gaps

```txt
source presentation region manifest
letterbox/pillarbox rejection
HUD and tower-control occlusion classification
minimap interaction policy
terminal overlay input suspension
pointer gesture region lease
world-command admission result
stale route/frame/region rejection
InputRegionDecisionResult
WorldCommandAdmissionResult
FirstRegionBoundCommandFrameAck
browser, artifact and Pages fixtures
```

This is a source-backed interaction-ownership gap. It does not prove that every click currently causes a visible defect or that simulation, rendering, combat, saves or deployment are otherwise broken.

## Required authority

`phantom-command-campaign-input-region-arbitration-authority-domain`

```txt
InputRegionManifestCommand
  -> bind route, source viewport, render frame and visible UI generation
  -> publish world, HUD, control, minimap, modal and excluded regions

PointerRegionAdmissionCommand
  -> normalize browser evidence through CRT source mapping
  -> reject outside-source and stale evidence
  -> classify the topmost visible source region
  -> bind one gesture to one region lease
  -> publish InputRegionDecisionResult

WorldCommandAdmissionCommand
  -> require an accepted unobscured world region
  -> reject HUD, minimap, modal, excluded and retired evidence
  -> settle click, marquee or order exactly once
  -> publish WorldCommandAdmissionResult
  -> publish FirstRegionBoundCommandFrameAck
```

## Planned authority surfaces

```txt
phantom-command-campaign-input-region-arbitration-authority-domain
source-presentation-region-manifest-kit
crt-source-inside-admission-kit
visible-region-z-order-kit
hud-hit-region-kit
tower-control-hit-region-kit
minimap-hit-region-kit
modal-overlay-hit-region-kit
pointer-region-gesture-lease-kit
world-region-command-admission-kit
stale-region-generation-rejection-kit
input-region-decision-result-kit
world-command-admission-result-kit
first-region-bound-command-frame-ack-kit
input-region-browser-fixture-kit
built-artifact-input-region-parity-kit
pages-input-region-parity-kit
central-reconciliation-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, pointer behavior, camera behavior, simulation, rendering, audio, persistence, packages, tests, workflows, build and deployment remain unchanged. No region arbitration, command suppression, browser fixture, artifact parity, Pages parity or production readiness is claimed.