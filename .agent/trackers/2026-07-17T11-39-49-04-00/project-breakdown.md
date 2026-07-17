# Project Breakdown — Campaign Camera Coverage Bounds

**Timestamp:** `2026-07-17T11-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Selection:** oldest synchronized eligible repository  
**Reviewed pre-audit repository head:** `8a773ba4c6a954759d47564611153fed02696f94`  
**Reviewed runtime source revision:** `e92f61c79ed20998fdb4edfb962cac3754d3a651`  
**Status:** `campaign-camera-coverage-bounds-authority-audited`

## Summary

The full `LuminaryLabs-Publish` inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten have central ledger records, root `.agent` state and `main` heads matching their documented repo-local heads. PhantomCommand had the oldest synchronized central timestamp and is the only selected repository.

The focused finding is camera-boundary ownership. The campaign arena is circular with an outer radius of `147`, while the camera center is constrained independently on `x` and `z` to `[-147, 147]`. That square admits corner camera centers approximately `207.89` world units from the arena origin, about `60.89` units beyond the outer ring. The constraint also ignores zoom, the asymmetric isometric viewport footprint, CRT/source dimensions and the amount of playable arena that remains visible.

This does not prove that overscan is undesirable. It proves that the runtime has no explicit policy deciding whether camera bounds protect the center point, the visible footprint, a minimum arena-coverage ratio, the sanctum, selected units or a configurable overscan envelope.

## Intent

Make one camera-coverage authority resolve keyboard pan, middle-drag pan, wheel-anchor zoom, focus commands and public host mutations against the same accepted arena, viewport, projection and zoom revisions before the frame is rendered.

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm every eligible `main` head matches its documented repo-local head.
- [x] Select only PhantomCommand through the oldest documented-selection rule.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Trace arena extents, source/world projection, zoom, camera mutations and frame clamping.
- [x] Define 19 camera-coverage authority surfaces.
- [x] Add a new timestamped tracker and focused audit family.
- [ ] Implement the camera envelope and execute source, artifact and Pages fixtures.

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
selected prior central timestamp: 2026-07-17T06-38-14-04-00
pre-audit repository head: 8a773ba4c6a954759d47564611153fed02696f94
reviewed runtime source revision: e92f61c79ed20998fdb4edfb962cac3754d3a651
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu
  -> restore settings and save presence
  -> procedural Canvas2D menu and WebAudio
  -> WebGL CRT presentation
  -> campaign route

campaign
  -> keyboard, pointer and wheel evidence
  -> camera intent and fixed-step simulation
  -> selection, construction, orders, waves, combat, rewards and outcomes
  -> Canvas2D world, HUD, controls, minimap and overlays
  -> WebGL CRT presentation

camera path today
  -> WASD/arrow keys integrate camera velocity
  -> middle drag mutates camera x/z directly
  -> wheel zoom preserves one source-space anchor and mutates camera x/z
  -> F focuses selected-unit centroid or sanctum
  -> GameHost exposes mutable camera references
  -> frame clamps x and z independently to +/- outerRadius
  -> clamp ignores circular distance, zoom and visible source footprint
  -> render commits without a camera-boundary result or matching frame acknowledgement
```

## Domains in use

```txt
static HTML routes and ES modules
browser document, RAF, focus, blur, pointer, keyboard, wheel and storage lifecycle
procedural menu art, settings, save presence, audio and routing
Canvas2D world, HUD, controls, minimap, overlays and pixel typography
WebGL context, shaders, source texture upload, viewport, CRT and source mapping
campaign rings, lanes, pads, towers, units, waves, resources and terminal state
fixed-step movement, targeting, projectiles, combat, rewards and effects
camera position, velocity, zoom, source/world transforms, pan, focus and clamping
circular arena extent, visible isometric footprint, camera envelope and frame proof
click/marquee selection, construction, orders, pause, restart and diagnostics
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
planned camera-coverage authority surfaces: 19
```

## Source-backed finding

The current source establishes:

```txt
ring count: 7
last ring inner radius: 132
last ring outer radius: 147
camera x clamp: -147..147
camera z clamp: -147..147
admitted square-corner radial distance: sqrt(147^2 + 147^2) = 207.89
corner excess beyond outer ring: 60.89
corner excess ratio: 41.42%
source surface: 640x360
visual camera origin in source projection: (320, 210)
zoom range: 0.34..2.45
default zoom: 0.78
```

Using the current inverse isometric transform, the farthest source corner is approximately:

```txt
at minimum zoom 0.34: 1525.18 world units from camera center
at default zoom 0.78: 664.82 world units from camera center
at maximum zoom 2.45: 211.66 world units from camera center
```

The viewport therefore cannot be treated as a small symmetric circle around the camera. It is an asymmetric projected quadrilateral whose scale changes with zoom. A correct policy must choose its intended invariant rather than merely replacing the square clamp with a circular clamp.

## Current gaps

```txt
explicit camera-boundary policy: absent
circular arena center constraint: absent
zoom-aware camera envelope: absent
source-viewport footprint calculation: absent
minimum arena-coverage policy: absent
sanctum/selection visibility policy: absent
shared constraint for keyboard, middle pan, wheel and focus: absent
shared constraint for public GameHost camera mutation: absent
pre-render camera-boundary settlement: absent
stale camera/viewport/zoom revision rejection: absent
CameraCoverageResult: absent
FirstCameraBoundsFrameAck: absent
browser, artifact and Pages fixtures: absent
```

This is a source-backed camera-policy and visible-frame gap. No production camera-loss incident, playability failure or visual regression was reproduced.

## Required authority

`phantom-command-campaign-camera-coverage-bounds-authority-domain`

```txt
CameraCoverageManifestCommand
  -> bind arena extent, source viewport, projection offset, zoom and render generation
  -> publish the accepted coverage policy

CameraTargetAdmissionCommand
  -> normalize keyboard, middle-pan, wheel-anchor, focus and host camera intents
  -> reject stale route, viewport, zoom and camera generations

CameraBoundarySettlementCommand
  -> solve the accepted center/envelope policy
  -> preserve requested anchors where possible
  -> publish CameraCoverageResult

CameraProjectionCommitCommand
  -> render one accepted camera generation
  -> publish FirstCameraBoundsFrameAck
```

## Planned authority surfaces

```txt
phantom-command-campaign-camera-coverage-bounds-authority-domain
circular-playfield-extent-kit
source-viewport-footprint-kit
isometric-visible-world-footprint-kit
camera-coverage-policy-kit
zoom-aware-camera-envelope-kit
camera-target-admission-kit
keyboard-pan-camera-constraint-kit
middle-pan-camera-constraint-kit
wheel-anchor-camera-constraint-kit
focus-camera-constraint-kit
public-host-camera-constraint-kit
camera-boundary-settlement-kit
stale-camera-revision-rejection-kit
camera-coverage-result-kit
first-camera-bounds-frame-ack-kit
camera-bounds-browser-fixture-kit
built-artifact-camera-bounds-parity-kit
pages-camera-bounds-parity-kit
central-reconciliation-kit
```

The parent plus coordinating kits above represent 20 named lines including central reconciliation; the machine census records 19 proposed authority surfaces by treating central reconciliation as governance rather than runtime/product surface.

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, camera behavior, gameplay, simulation, rendering, pointer behavior, audio, persistence, packages, tests, workflows, build and deployment remain unchanged. No camera-boundary correctness, viewport-coverage guarantee, anchor preservation, browser fixture, artifact parity, Pages parity or production readiness is claimed.