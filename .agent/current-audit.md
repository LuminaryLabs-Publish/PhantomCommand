# PhantomCommand Current Audit

**Timestamp:** `2026-07-12T11-40-50-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

The current audit isolates campaign world-pointer admission. `screenToSource()` returns source coordinates plus an `inside` flag, but campaign handlers ignore that flag before selection, orders, middle-button pan and wheel anchoring. The visible CRT shader additionally curves sampled coordinates, while CPU input projection performs containment only.

## Plan ledger

**Goal:** make campaign pointer mutation require a current, display-correct, camera-bound projection and return one typed result without changing runtime behavior in this documentation pass.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Skip unsynchronized newer `IntoTheMeadow` documentation.
- [x] Select only `PhantomCommand` as the next-oldest synchronized eligible repository.
- [x] Inspect menu, CRT, campaign, checks, build and prior authority state.
- [x] Identify the complete interaction loop, domains, all 20 implemented kits and offered services.
- [x] Define display/camera generations, inverse projection, gesture leases, typed results, observations and fixtures.
- [x] Change documentation only on `main`.
- [ ] Implement and execute the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new/ledger-missing/root-agent-missing eligible repositories: 0
IntoTheMeadow: skipped because repo-local 2026-07-12T11-29-40-04-00 work was newer than central tracking
selected repository: LuminaryLabs-Publish/PhantomCommand
prior synchronized timestamp: 2026-07-12T09-28-05-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu startup
  -> create source canvas, graveyard art and CRT renderer
  -> read settings and save presence
  -> install input and start RAF
  -> publish PhantomMenu

campaign startup
  -> create 640x360 source canvas and CRT renderer
  -> create rings, lanes, pads, units, towers, economy and camera
  -> install pointer, keyboard, wheel and blur handlers
  -> start fixed-step RAF
  -> publish GameHost

campaign pointer
  -> project client coordinates through screenToSource()
  -> store x/y/inside
  -> left: point or rectangle selection and build-pad selection
  -> right: world order
  -> middle: camera pan
  -> wheel: zoom around projected world anchor

campaign frame
  -> update camera from keys and target zoom
  -> drain 1/60 simulation steps
  -> spawn, move, target, damage, reward and resolve terminal state
  -> render world, HUD, minimap and overlays
  -> present source through CRT WebGL shader
```

## Source-backed findings

```txt
contain source projection: implemented
inside/outside flag: implemented
campaign command containment check: absent
shader CRT curve: implemented
CPU inverse CRT curve: absent
camera revision identity: absent
display generation identity: absent
gesture lease: absent
typed pointer command/result: absent
pointer observation/journal: absent
browser projection fixtures: absent
```

### Letterbox pointers can mutate campaign state

The campaign copies `screenToSource()` results into `input.pointer`, but right-click always converts the point with `screenToWorld()` and calls `order()`. Left drag begins and completes without containment admission. Middle drag and wheel anchoring also mutate the camera from out-of-range source coordinates.

### Visible and actionable coordinates are not the same transform

The fragment shader applies contain projection and optional `curveUv()` before sampling the source texture. The CPU projection applies contain conversion only. Under CRT mode, a pointer can be inside the source rectangle yet map to a different source/world point than the pixel shown beneath it.

### Gestures have no stable ownership

Drag and middle-pan state are mutable objects/booleans without gesture IDs, display generations, pointer capture leases or stale-result checks. Blur clears some state, but route, display or camera revision changes are not part of admission.

## Domains in use

```txt
static menu and campaign route shells
menu selection panels settings save presence and fade transition
viewport containment source-coordinate projection and CRT curved presentation
pointer keyboard wheel drag focus navigation and RAF lifecycle
campaign launch bootstrap resume and persistence gaps
campaign rings lanes pads units towers projectiles economy and terminal state
selection build orders wave pause camera restart and fixed-step simulation
spawn movement targeting damage rewards and terminal mutation
procedural graveyard rendering
campaign world HUD minimap and overlay rendering
WebGL context program buffer texture upload and display
Web Audio activation ambience UI tones and teardown
public menu and campaign host capabilities
source checks static build Pages deployment and audit tracking
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
menu routing selection panels fade and hidden-button activation
settings persistence and save-presence scanning
viewport contain projection and inside classification
pointer keyboard drag wheel and camera interactions
procedural graveyard drawing
AudioContext ambience and UI tones
WebGL shader program buffer texture upload CRT curve and presentation
campaign state selection building orders waves pause camera restart and navigation
fixed-step spawning AI movement targeting projectiles damage rewards and terminal mutation
world HUD minimap pause and terminal rendering
public state reads and direct mutation
construction intro sequencing
source checks static build and GitHub Pages deployment
```

## Required parent domain

```txt
phantom-command-campaign-world-pointer-admission-authority-domain
```

## Candidate kits

```txt
campaign-input-session-kit
campaign-display-generation-kit
campaign-camera-revision-kit
campaign-pointer-event-envelope-kit
campaign-pointer-containment-kit
campaign-crt-inverse-projection-kit
campaign-source-coordinate-result-kit
campaign-world-ray-result-kit
campaign-pointer-gesture-kit
campaign-drag-lease-kit
campaign-pointer-command-kit
campaign-pointer-command-admission-kit
campaign-pointer-command-result-kit
campaign-camera-command-result-kit
campaign-stale-pointer-rejection-kit
campaign-pointer-observation-kit
campaign-pointer-journal-kit
campaign-letterbox-noop-fixture-kit
campaign-crt-projection-parity-fixture-kit
campaign-drag-boundary-fixture-kit
campaign-pointer-browser-smoke-kit
```

## Required invariants

```txt
OutsideSurface performs zero gameplay or camera mutation.
CRT-enabled input inverts the same curve used by the visible frame.
World projection cites the camera revision used to derive it.
Drag and pan updates require a current gesture lease.
Stale display, camera and gesture generations are rejected.
One event commits at most one terminal command result.
Applied results correlate with state/camera revisions and a visible frame.
```

## Retained dependencies

```txt
Campaign Bootstrap and Continue Resume Authority
Menu Pointer-Hit Admission Authority
Public Host Owner Quarantine and Typed Command Admission
CRT Display/Input Projection Authority
Campaign Phase Admission Authority
Fixed-Step Scheduling Replay and Committed Frames
Combat Resolution and Exclusive Terminal Outcome Authorities
Runtime Session Lifecycle Authority
Menu Audio Activation and Lifecycle Authority
Versioned Full Campaign Checkpoint Capture Authority
```

## Validation boundary

Documentation only. Campaign behavior, camera behavior, simulation, rendering, audio, persistence, package scripts, dependencies and deployment were not changed.