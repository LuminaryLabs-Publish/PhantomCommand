# PhantomCommand Current Audit

**Timestamp:** `2026-07-11T09-40-19-04-00`

## Summary

PhantomCommand renders through a CRT transform but accepts input through a different coordinate transform. The WebGL shader applies containment and radial curvature before sampling the source canvas, while `screenToSource()` applies only containment. Menu and campaign input can therefore target a different source point than the one visibly under the pointer.

## Plan ledger

**Goal:** catalogue the current interaction/runtime architecture and define one authoritative projection chain from display pixels to source-canvas coordinates, isometric world coordinates and typed campaign commands.

- [x] Reconcile the full Publish inventory and central ledgers.
- [x] Skip active same-window work on `HorrorCorridor`.
- [x] Select only `PhantomCommand` as the oldest stable eligible fallback.
- [x] Read CRT shader, screen mapping, menu hit tests, campaign input, render and validation source.
- [x] Identify all domains, implemented kits and services.
- [x] Trace display-to-source, source-to-world, wheel-anchor and drag-selection paths.
- [x] Define projection descriptors, revisions, typed results and parity fixtures.
- [ ] Implement shared CPU/GLSL projection authority.
- [ ] Add behavioral fixtures and browser pointer smoke.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9/9
root .agent state: 9/9
active same-window repo skipped: HorrorCorridor
selected: LuminaryLabs-Publish/PhantomCommand
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Interaction loops

### Menu

```txt
pointer client coordinate
  -> CRT canvas CSS rectangle
  -> screenToSource contain correction
  -> menuHitIndex or panelHitIndex
  -> hover, selection or activation
```

### Campaign click and order

```txt
pointer client coordinate
  -> screenToSource contain correction
  -> screenToWorld inverse isometric transform
  -> nearest ally, pad or enemy
  -> direct select, build or order mutation
```

### Campaign drag selection

```txt
source-screen rectangle
  -> inverse-project only two diagonal corners
  -> create axis-aligned world bounds
  -> admit allies inside that world AABB
```

### Render

```txt
source canvas
  -> containUv(output UV)
  -> curveUv(contained UV) when CRT enabled
  -> source texture sample
  -> scanline, grille, grain, vignette and fade
```

## Exact projection gap

`screenToSource()` reproduces the shader's containment transform but not its CRT curve. For a displayed point near an edge, the shader samples a curved source UV while input reports the uncurved UV.

```txt
render source UV = curveUv(containUv(display UV))
input source UV  = containUv(display UV)
```

The same `screenToSource()` result drives menu hit tests, campaign selection, orders, wheel zoom anchoring and drag endpoints.

## Drag-selection gap

An axis-aligned rectangle in source-screen space maps to a rotated parallelogram in world space. The runtime inverse-projects only two diagonal corners and converts them into a world AABB. That test can include allies visually outside the drag box or omit allies visibly inside it.

The stable rule is simpler: project each selectable ally into the committed source frame and test that projected point against the visual drag rectangle.

## Domains in use

### Route and menu

```txt
static-route-shell-domain
menu-route-domain
campaign-route-domain
menu-selection-domain
menu-panel-domain
menu-settings-persistence-domain
menu-save-presence-domain
menu-continue-capability-domain
menu-transition-domain
menu-audio-domain
graveyard-art-domain
source-canvas-domain
```

### Presentation and projection

```txt
crt-display-domain
contain-projection-domain
crt-curve-domain
source-resolution-domain
display-to-source-domain-next
source-to-world-domain
world-to-source-domain
pointer-hit-domain
wheel-anchor-domain
drag-selection-domain
projection-revision-domain-next
```

### Campaign content and simulation

```txt
ring-map-domain
lane-domain
build-pad-domain
unit-archetype-domain
tower-archetype-domain
wave-script-domain
souls-economy-domain
sanctum-core-health-domain
selection-domain
campaign-message-domain
campaign-terminal-state-domain
camera-pan-zoom-domain
identity-counter-domain
build-action-domain
order-action-domain
wave-start-action-domain
pause-resume-action-domain
spawn-queue-domain
unit-ai-domain
enemy-pathing-domain
ally-targeting-domain
tower-targeting-domain
projectile-domain
damage-reward-domain
effect-domain
win-loss-domain
save-on-win-domain
fixed-step-simulation-domain
```

### Render, observation and proof

```txt
world-render-domain
hud-projection-domain
minimap-domain
modal-overlay-domain
crt-upload-domain
crt-draw-domain
phantom-menu-diagnostics-domain
gamehost-diagnostics-domain
projection-parity-proof-domain-next
runtime lifecycle and checkpoint domains
source checks, static build, Pages deploy and central sync
```

## Implemented kits and services

| Kit | Current services |
|---|---|
| `crt-renderer-kit` | WebGL setup, source texture upload, contain framing, CRT curvature, scanlines, grain, draw, resize and partial coordinate projection |
| `graveyard-art-kit` | Procedural menu composition and animated source-canvas drawing |
| `menu-route-kit` | Menu selection, panels, Begin/Continue routing and fade timing |
| `menu-settings-persistence-kit` | Read, normalize and write CRT, grain and ambience settings |
| `menu-save-presence-kit` | Scan three keys across two storage layers and return Boolean presence |
| `menu-audio-kit` | Lazy AudioContext, ambience, UI tones and delayed close |
| `campaign-route-shell-kit` | Campaign canvas boot and module execution |
| `pixel-campaign-runtime-kit` | Content descriptors, mutable state, pointer/world actions, building, orders, wave and camera input |
| `fixed-step-campaign-simulation-kit` | Exact `1/60` spawning, AI, combat, projectiles, rewards and terminal updates |
| `pixel-campaign-render-kit` | World, HUD, minimap, overlay and source-frame drawing |
| `legacy-gamehost-diagnostics-kit` | Mutable state/camera exposure and direct action bypasses |
| check/build/deploy kits | Source-pattern checks, static artifact copy and Pages publishing |
| retained construct kits | Historical concentric construction descriptors and sequence helpers |

## Candidate projection kits

```txt
phantom-command-presentation-transform-kit
phantom-command-contain-projection-kit
phantom-command-crt-curve-projection-kit
phantom-command-display-to-source-kit
phantom-command-pointer-projection-result-kit
phantom-command-source-to-world-projection-kit
phantom-command-screen-selection-volume-kit
phantom-command-wheel-anchor-projection-kit
phantom-command-projection-revision-kit
phantom-command-projection-journal-kit
phantom-command-projection-observation-kit
phantom-command-cpu-glsl-projection-parity-fixture-kit
phantom-command-pointer-roundtrip-fixture-kit
phantom-command-drag-selection-visual-parity-fixture-kit
```

## Required projection chain

```txt
committed frame identity
  -> PresentationTransform
       output rect
       source resolution
       contain mode
       CRT enabled
       curve coefficient
       transform revision
  -> displayToSource(clientX, clientY)
  -> PointerProjectionResult
  -> optional sourceToWorld()
  -> typed campaign command
  -> action result
  -> render acknowledgement
```

## Required proof

```txt
CPU projection matches shader sampling within tolerance
CRT off maps display center and edges correctly
CRT on maps the visible source point under the pointer
letterbox and pillarbox outside regions reject
wheel zoom preserves the visually anchored world point
drag selection equals source-screen inclusion
menu and campaign use the same transform revision
stale pointer projections reject after resize or settings change
```

## Ordered implementation queue

```txt
1. Continue Capability Resolver
2. Campaign Action Result Authority
   2a. CRT Display/Input Projection Authority
   2b. Campaign Phase Admission Authority
   2c. Fixed-Step Replay and Committed Frame Authority
3. Runtime Session Lifecycle Authority
4. Versioned Campaign Checkpoint and Atomic Resume Authority
```

## Validation status

Documentation only. Runtime behavior was not changed. `npm run check`, `npm run build`, projection fixtures and browser pointer smoke were not run.