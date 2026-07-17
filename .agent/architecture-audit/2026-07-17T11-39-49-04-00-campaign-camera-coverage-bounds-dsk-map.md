# Architecture Audit — Campaign Camera Coverage Bounds DSK Map

**Timestamp:** `2026-07-17T11-39-49-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `campaign-camera-coverage-bounds-authority-audited`

## Intent

Separate camera intent, arena geometry, visible-footprint policy, boundary settlement and rendered-frame proof into explicit coordinating surfaces without restructuring the existing campaign runtime.

## Existing composition

```txt
PhantomCommand
├─ menu route
│  ├─ procedural Canvas2D art
│  ├─ settings and save presence
│  ├─ WebAudio
│  └─ WebGL CRT
├─ campaign route
│  ├─ fixed 640x360 Canvas2D source
│  ├─ rings, lanes and pads
│  ├─ camera and browser input
│  ├─ units, towers, waves and combat
│  ├─ HUD, controls, minimap and overlays
│  └─ WebGL CRT
├─ validation and static build
└─ Pages deployment
```

## Implemented DSK and kit census

| Domain/kit | Offered services |
|---|---|
| `crt-renderer-kit` | WebGL context, shaders, texture upload, viewport resize, CRT effects, contain projection and browser/source mapping. |
| `graveyard-art-kit` | Procedural graveyard, fog, twinkle, characters, parallax, panels and selection pulse. |
| `menu-route-kit` | Menu selection, panels, enabled state, transition effects and campaign navigation. |
| `menu-settings-persistence-kit` | Defaults, parsing, CRT/grain/ambience settings and localStorage write. |
| `menu-save-presence-kit` | Save-key probing and Continue projection. |
| `menu-audio-kit` | AudioContext, master bus, drone, wind, UI tones and retirement. |
| `campaign-route-shell-kit` | Campaign document, application canvas, semantic fallback and module bootstrap. |
| `pixel-campaign-runtime-kit` | Arena, camera, input, units, towers, projectiles, effects, selection, building and orders. |
| `fixed-step-campaign-simulation-kit` | Accumulator, waves, spawning, movement, targeting, combat, rewards and terminal state. |
| `pixel-campaign-render-kit` | Isometric projection, entities, effects, HUD, minimap, selection and overlays. |
| `legacy-gamehost-diagnostics-kit` | State readback, mutable camera references, wave/build commands and zoom mutation. |
| `menu-static-check-kit` | Menu entry and source-marker assertions. |
| `campaign-static-check-kit` | Campaign entry and source-marker assertions. |
| `static-build-copy-kit` | Dist cleanup, directory creation and static file copy. |
| `pages-deploy-kit` | Install, build, artifact upload and Pages deployment. |
| `construct-spiral-intro-kit` | Opening construct choreography. |
| `construct-spiral-schedule-kit` | Timed construct schedule. |
| `construct-piece-id-kit` | Stable construct-piece identity. |
| `construct-piece-state-kit` | Construct-piece state and visibility. |
| `construct-sequence-update-kit` | Sequence advancement and settlement. |

## Current ownership split

```txt
arena geometry
  -> rings and outerRadius

camera intent
  -> keyboard velocity
  -> middle-pointer source deltas
  -> wheel-anchor correction
  -> F focus command
  -> public GameHost camera reference

camera constraint
  -> frame-local independent x/z clamp

visible footprint
  -> source/world transform and CRT projection
  -> not consulted by camera constraint

frame proof
  -> render()
  -> no camera-boundary result or acknowledgement
```

## Required parent domain

`phantom-command-campaign-camera-coverage-bounds-authority-domain`

## Proposed DSK map

```txt
phantom-command-campaign-camera-coverage-bounds-authority-domain
├─ circular-playfield-extent-kit
│  └─ publish arena center, outer radius and allowed overscan
├─ source-viewport-footprint-kit
│  └─ publish 640x360 source bounds and projection offset
├─ isometric-visible-world-footprint-kit
│  └─ inverse-project all source corners for the accepted zoom/camera revision
├─ camera-coverage-policy-kit
│  └─ choose center, footprint, sanctum, selection or minimum-coverage invariant
├─ zoom-aware-camera-envelope-kit
│  └─ compile the admissible camera envelope for the current zoom
├─ camera-target-admission-kit
│  └─ normalize keyboard, middle-pan, wheel, focus and host intents
├─ keyboard-pan-camera-constraint-kit
├─ middle-pan-camera-constraint-kit
├─ wheel-anchor-camera-constraint-kit
├─ focus-camera-constraint-kit
├─ public-host-camera-constraint-kit
├─ camera-boundary-settlement-kit
│  └─ solve one accepted camera generation before render
├─ stale-camera-revision-rejection-kit
├─ camera-coverage-result-kit
├─ first-camera-bounds-frame-ack-kit
├─ camera-bounds-browser-fixture-kit
├─ built-artifact-camera-bounds-parity-kit
├─ pages-camera-bounds-parity-kit
└─ central-reconciliation-kit
```

## Command/result contract

```txt
CameraCoverageManifestCommand
  -> CameraCoverageManifestResult

CameraTargetAdmissionCommand
  -> CameraTargetAdmissionResult

CameraBoundarySettlementCommand
  -> CameraCoverageResult

CameraProjectionCommitCommand
  -> CameraProjectionCommitResult
  -> FirstCameraBoundsFrameAck
```

## Compatibility constraints

- Preserve the current 640×360 source surface and isometric transforms.
- Preserve existing keyboard, middle-pan, wheel-anchor and focus feel unless the accepted boundary policy requires settlement.
- Preserve camera zoom range unless a future runtime change explicitly revises it.
- Do not move simulation ownership into the renderer.
- Keep CRT presentation as an adapter over accepted source frames.
- Add no new branch, runtime dependency or build requirement for documentation-only work.

## Boundary

This audit defines a proposed authority only. No runtime DSK, camera solver, result surface or fixture was implemented.