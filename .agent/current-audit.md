# PhantomCommand Current Audit

**Timestamp:** `2026-07-12T01-20-00-04-00`

## Summary

The shared CRT renderer has two projection implementations. The fragment shader maps output UV through aspect containment and then radial CRT curvature before sampling the source canvas. The CPU `screenToSource()` mapper applies containment only and has no CRT settings input. Menu hit tests and campaign commands therefore operate on semantic coordinates that do not match the displayed pixels when CRT is enabled. Campaign pointer handlers also ignore `inside`, permitting black border regions to mutate selection, orders and camera state.

## Plan ledger

**Goal:** define one versioned projection contract consumed by WebGL presentation, CPU pointer mapping, command admission and visible-frame evidence.

- [x] Compare the current Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Inspect `src/menu/crt-renderer.js`.
- [x] Inspect `src/menu/graveyard-menu.js`.
- [x] Inspect `src/campaign/campaign-scene.js`.
- [x] Trace menu and campaign pointer consumers.
- [x] Identify the complete interaction loop, domains, kits and services.
- [x] Define projection, admission, parity and frame-receipt contracts.
- [ ] Implement and execute the documented fixtures.

## Selection audit

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

PhantomCommand     2026-07-11T23-28-29-04-00 selected oldest
ZombieOrchard      2026-07-11T23-48-14-04-00
TheUnmappedHouse   2026-07-12T00-01-25-04-00
AetherVale         2026-07-12T00-10-23-04-00
MyCozyIsland       2026-07-12T00-20-01-04-00
PrehistoricRush    2026-07-12T00-30-49-04-00
TheOpenAbove       2026-07-12T00-39-05-04-00
IntoTheMeadow      2026-07-12T00-58-12-04-00
HorrorCorridor     2026-07-12T01-08-06-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/PhantomCommand` is in scope for Publish changes.

## Complete interaction loop

```txt
menu module evaluation
  -> create 480x270 source canvas
  -> create shared CRT renderer
  -> load menu settings and save presence
  -> attach pointer, keyboard and hidden-button listeners
  -> start recursive menu RAF
  -> publish window.PhantomMenu

menu frame
  -> draw source art and UI
  -> submit source canvas to WebGL
  -> apply aspect containment
  -> optionally apply CRT curvature
  -> apply aberration, scanlines, grain, vignette and fade

menu pointer
  -> sample client coordinates
  -> CPU contain-only screenToSource
  -> menu/panel hit test
  -> selection or activation

campaign module evaluation
  -> create 640x360 source canvas
  -> create shared CRT renderer
  -> create content, state, camera, input and IDs
  -> attach pointer, wheel, keyboard, keyup and blur listeners
  -> start fixed-step campaign RAF
  -> publish window.GameHost

campaign frame
  -> integrate camera from held input
  -> execute update(1/60) through accumulator
  -> draw world, HUD, minimap and overlay to source canvas
  -> submit source through contain + always-on curve

campaign pointer
  -> sample client coordinates
  -> CPU contain-only screenToSource
  -> ignore inside flag
  -> map source point to world under current camera
  -> select, drag-select, order, pan or zoom
```

## Source-backed defects

### GLSL and CPU geometry differ

The fragment shader evaluates:

```txt
output UV
  -> containUv
  -> curveUv when CRT enabled
  -> post-curve bounds check
  -> source sample
```

The CPU mapper evaluates:

```txt
client coordinate
  -> canvas CSS normalization
  -> contain correction
  -> pre-curve inside check
  -> source coordinate
```

The CPU path never evaluates the radial curve.

### Menu settings change only display projection

Menu rendering passes `settings.crt`. `screenToSource()` receives no settings or projection descriptor. Toggling CRT changes visible geometry while pointer geometry remains contain-only.

### Campaign always uses the mismatched path

Campaign rendering always submits `{ crt: true }`. Its single click, drag rectangle, right-click order, middle-button pan and wheel-anchor calculations are all based on uncurved source coordinates.

### Campaign ignores outside status

`screenToSource()` returns `inside`, but campaign handlers never reject false values. The shader can also display black when the post-curve UV leaves source bounds while CPU `inside` remains true. Both letterbox/pillarbox and curved-black areas can therefore issue commands.

### Aberration has no semantic sample policy

The visible red and blue channels sample offset source coordinates while green samples the center. No declaration states which source sample owns semantic interaction. A canonical center/green policy is required.

### No projection provenance exists

No:

```txt
projectionId
projectionRevision
outputSurfaceRevision
sourceSurfaceRevision
crtSettingsRevision
pointerSampleId
mappingResultId
semanticSamplePolicy
cameraRevision
visibleFrameId
projectionFrameReceipt
adapterFingerprint
```

correlates input with the visible output.

## Domains in use

```txt
static route and full-window canvas shell
menu selection, panels, settings, audio and fade transition
save-key discovery and Continue capability projection
procedural graveyard source-canvas rendering
campaign rings, lanes, pads, archetypes, waves, economy and core health
selection, construction, orders, pause, camera and fixed-step simulation
unit, tower, projectile, combat, reward and terminal mutation
CPU world, HUD, minimap and terminal overlay rendering
WebGL context, shader, program, buffer and texture lifecycle
output-surface sizing and DPR policy
aspect-contain source projection
CRT curvature, aberration, scanlines, grain, vignette and fade
client-coordinate pointer observation
CPU screen-to-source projection
menu and panel hit testing
campaign screen-to-world projection
public menu and campaign host projection
source checks, static build, Pages deployment and central tracking
```

Missing projection domains:

```txt
projection descriptor, identity and revision
output/source surface observations
settings-aware projection policy
CPU and GLSL adapter parity
canonical semantic sample policy
pointer sample and mapping-result identity
outside-visible-source admission
stale resize/settings result rejection
camera and command correlation
visible projection frame receipt
bounded projection observation journal
pure and browser parity fixtures
```

## Implemented kits

```txt
crt-renderer-kit
graveyard-art-kit
menu-route-kit
menu-settings-persistence-kit
menu-save-presence-kit
menu-audio-kit
campaign-route-shell-kit
pixel-campaign-runtime-kit
fixed-step-campaign-simulation-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
menu-static-check-kit
campaign-static-check-kit
static-build-copy-kit
pages-deploy-kit
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

## Offered services

```txt
menu routing, fade and hidden-button activation
settings persistence and CRT enablement
raw save-presence scanning across three keys and two storage scopes
procedural graveyard source-canvas drawing
AudioContext ambience and UI tones
WebGL context/program/buffer/texture creation
source-canvas texture upload and full-screen drawing
aspect-contain projection and CRT visual effects
CSS-client to source-canvas contain-only mapping
menu and settings-panel hit testing
campaign default-state and content construction
selection, building, orders, wave start, pause and camera control
fixed-step spawning, AI, movement, targeting, damage, rewards and terminal mutation
world, HUD, minimap and terminal overlay rendering
mutable GameHost owner exposure and direct zoom/wave/build mutation
source-pattern checks, static build and GitHub Pages deployment
```

## Required parent domain

```txt
phantom-command-display-input-projection-authority-domain
```

Candidate kits:

```txt
phantom-command-projection-policy-kit
phantom-command-projection-id-kit
phantom-command-projection-revision-kit
phantom-command-output-surface-observation-kit
phantom-command-source-surface-descriptor-kit
phantom-command-crt-settings-revision-kit
phantom-command-contain-projection-kit
phantom-command-curve-projection-kit
phantom-command-semantic-sample-policy-kit
phantom-command-cpu-projection-adapter-kit
phantom-command-glsl-projection-adapter-kit
phantom-command-pointer-sample-id-kit
phantom-command-pointer-mapping-result-kit
phantom-command-surface-admission-kit
phantom-command-stale-projection-rejection-kit
phantom-command-projection-command-correlation-kit
phantom-command-projection-frame-receipt-kit
phantom-command-projection-observation-kit
phantom-command-projection-journal-kit
phantom-command-cpu-glsl-parity-fixture-kit
phantom-command-black-border-admission-fixture-kit
phantom-command-menu-campaign-pointer-parity-fixture-kit
phantom-command-browser-pixel-pick-smoke-kit
```

## Required projection transaction

```txt
PointerObservation
  -> validate route, runtime session and active surface
  -> snapshot output rect, source size, settings and camera revision
  -> resolve canonical projection descriptor
  -> evaluate contain and optional curve using the same policy as GLSL
  -> classify post-transform visible-source admission
  -> select canonical center/green semantic sample
  -> return typed mapping result
  -> reject stale result after resize or settings change
  -> route menu/campaign command
  -> correlate command effect with projection frame receipt
  -> append bounded detached observation
```

## Required result classes

```txt
MAPPED_INSIDE_VISIBLE_SOURCE
REJECTED_OUTSIDE_CANVAS
REJECTED_LETTERBOX_OR_PILLARBOX
REJECTED_CURVED_BLACK_REGION
REJECTED_ZERO_AREA_SURFACE
REJECTED_STALE_SURFACE
REJECTED_STALE_SETTINGS
REJECTED_STALE_FRAME
REJECTED_NON_FINITE_COORDINATE
```

## Required invariants

```txt
CPU and GLSL adapters consume one immutable descriptor
CRT toggle advances one settings/projection revision
post-curve black regions perform zero mutation
campaign commands require inside-visible-source
menu hit tests target the displayed source texel
wheel zoom preserves the displayed source point
selection rectangles cite compatible projection revisions
resize invalidates predecessor mapping results
visible-frame claims include projection receipt
```

## Validation boundary

Documentation only. Runtime source, pointer behavior, gameplay, rendering, persistence, package scripts, dependencies and deployment were not changed. Projection parity, outside-region rejection and visible pointer correctness remain unproved until the documented fixtures exist and pass.