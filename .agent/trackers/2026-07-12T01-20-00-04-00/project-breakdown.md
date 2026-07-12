# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-12T01-20-00-04-00`

## Summary

PhantomCommand renders both its menu and campaign through a shared CRT WebGL pass. The visible shader applies aspect-contain mapping and then radial CRT curvature before sampling the source canvas, but the CPU `screenToSource()` path applies only aspect containment. Pointer hit tests, drag selection, orders, zoom anchoring and menu activation therefore use coordinates that do not match the displayed pixels whenever CRT curvature is enabled. Campaign input also ignores the returned `inside` flag, allowing black letterbox or curved-border regions to issue world commands.

## Plan ledger

**Goal:** define one authoritative projection descriptor and transaction from output-surface observation through visible CRT sampling, pointer normalization, semantic hit admission and first correlated frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` as the oldest eligible central entry.
- [x] Trace menu and campaign pointer ingress.
- [x] Trace CPU contain mapping and GLSL contain/curve mapping.
- [x] Trace settings-dependent CRT enablement and campaign-always-on CRT behavior.
- [x] Identify interaction loops, domains, all implemented kits and offered services.
- [x] Define projection identity, surface revision, mapping, admission, result and fixture contracts.
- [x] Add architecture, render, gameplay, interaction, projection-authority and deploy audits.
- [x] Refresh the required root `.agent` files and kit registry.
- [ ] Implement and execute the documented projection fixtures.

## Selection

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

## Interaction loop

```txt
menu module
  -> create 480x270 source canvas
  -> create CRT WebGL renderer
  -> load settings, including CRT enabled/disabled
  -> attach pointer, keyboard and hidden-button interaction
  -> draw source scene
  -> render with contain + optional curve + CRT effects

menu pointer
  -> client coordinates
  -> screenToSource contain-only mapping
  -> menu/panel hit test
  -> selection or activation

campaign module
  -> create 640x360 source canvas
  -> create CRT WebGL renderer
  -> attach pointer, wheel, keyboard and blur interaction
  -> fixed-step simulation and CPU source rendering
  -> render with contain + always-enabled curve + CRT effects

campaign pointer
  -> client coordinates
  -> screenToSource contain-only mapping
  -> screenToWorld
  -> select, drag-select, order, pan or zoom anchor
  -> returned inside flag is not admitted or rejected
```

## Source-backed findings

### Visible and semantic coordinates diverge

The fragment shader transforms output UV through `containUv()` and then `curveUv()` when CRT is enabled. `screenToSource()` performs the contain transform but omits the curve transform. The source coordinate selected by CPU input therefore differs from the source texel displayed under the pointer.

### Settings are not part of pointer mapping

Menu rendering passes the current `settings.crt` value. Pointer mapping receives no settings or projection descriptor, so toggling CRT changes visible geometry without changing semantic mapping.

### Campaign always uses the mismatched path

Campaign rendering always submits `{ crt: true }`, so pointer selection, drag regions, right-click orders and wheel zoom anchoring always operate against the contain-only approximation.

### Black regions can mutate campaign state

The shader rejects post-curve UV outside the source and displays black. `screenToSource()` computes `inside` before curvature. Campaign handlers do not check `inside` at all, so pillarbox, letterbox or curved-border regions can still produce world coordinates and commands.

### No projection provenance exists

No projection ID, output-surface revision, source-surface revision, CRT-settings revision, curve strength, mapping result ID, pointer sample ID, visible frame ID or parity result correlates a command with the displayed frame.

## Domains in use

```txt
static page and full-window canvas shell
menu selection, settings, panels, audio and route transition
save-presence and Continue projection
procedural graveyard source rendering
campaign content, state, economy, combat and terminal mutation
fixed-step simulation and camera integration
CPU source-canvas world, HUD, minimap and overlay rendering
WebGL resource creation and source texture upload
output aspect-contain projection
CRT radial curvature, aberration, scanlines, grain, vignette and fade
CSS/client pointer observation
CPU screen-to-source projection
menu and panel hit testing
campaign screen-to-world projection
selection, drag selection, orders, pan and zoom anchoring
public menu and campaign host projection
validation, static build, Pages deployment and audit tracking
```

Missing coordinating domains:

```txt
projection descriptor and revision authority
CPU/GLSL projection parity
settings-aware pointer mapping
black-region and outside-surface admission
pointer sample and mapping-result identity
semantic pick-channel policy under chromatic aberration
visible-frame and command correlation
resize/projection stale-result rejection
projection observations and bounded journal
browser pixel and interaction fixtures
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
save-presence scanning
procedural source-canvas art
AudioContext ambience and UI tones
WebGL program, buffer and texture construction
contain projection, CRT curve and post effects
source-canvas texture upload and full-screen draw
CSS-client to source-canvas contain mapping
menu and settings hit testing
campaign selection, building, orders, wave, pause and camera controls
fixed-step spawning, AI, combat, rewards and terminal mutation
world, HUD, minimap and terminal rendering
public diagnostics and direct legacy mutation
static source checks, build and Pages deployment
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

## Required transaction

```txt
PointerObservation
  -> admit active route, runtime session and surface revision
  -> snapshot output rect, source size and CRT settings revision
  -> evaluate the same contain and curve policy used by the visible shader
  -> select one declared semantic sample channel
  -> return a typed source coordinate or OUTSIDE_VISIBLE_SOURCE
  -> reject stale mapping results after resize or settings change
  -> route admitted menu/campaign commands
  -> correlate committed effects with the visible projection/frame receipt
  -> append one bounded observation row
```

## Required invariants

```txt
CPU and GLSL mapping share one projection descriptor
CRT toggle changes visible and semantic mapping in the same revision
campaign commands reject outside and curved-black regions
menu hit tests use the source texel displayed under the pointer
wheel zoom preserves the visible source point under the pointer
selection rectangles cite one projection revision
resize invalidates predecessor mapping results
no input result is called frame-coherent without visible-frame evidence
```

## Validation boundary

Documentation only. Runtime source, input behavior, gameplay, rendering, package scripts, dependencies and deployment were not changed. Projection parity and visible interaction correctness remain unproved until pure CPU/GLSL fixtures and browser pixel-pick smokes exist and pass.