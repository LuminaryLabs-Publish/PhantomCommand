# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-15T08-41-37-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `public-diagnostic-capability-frame-admission-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with a procedural Canvas2D menu, fixed-step combat simulation, Canvas2D world/HUD/minimap rendering, WebGL CRT presentation, local persistence, construction choreography, static checks and Pages delivery.

The current audit isolates the public diagnostic host. `window.GameHost` exports the live mutable `state` and `camera` objects plus direct `startWave`, `build` and `setZoom` capabilities. An external caller can therefore change campaign truth or camera presentation outside the normal keyboard, pointer, fixed-step and render path without a caller identity, capability revision, expected state revision, typed result, retirement receipt or matching Canvas2D/CRT frame acknowledgement.

## Plan ledger

**Goal:** replace ambient raw runtime access with a versioned least-authority diagnostic surface whose accepted mutations settle once and are acknowledged by both presentation layers.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible repositories with ten central-ledger entries and root `.agent` states.
- [x] Confirm no eligible repository is new, ledger-missing, root-agent-missing, undocumented or runtime-ahead.
- [x] Select only PhantomCommand through the oldest synchronized central timestamp rule.
- [x] Inspect `game.html`, `src/campaign/campaign-scene.js`, `scripts/check-campaign.mjs`, `package.json` and existing agent state.
- [x] Identify the complete interaction loop, domains, all 20 implemented kits and their offered services.
- [x] Identify the raw public capability and visible-frame evidence gap.
- [x] Define a 19-surface public capability authority family.
- [x] Add a new timestamped tracker and focused audit family.
- [x] Refresh every required root `.agent` document and registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement the authority and execute browser, build and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing repositories: 0
undocumented repositories: 0
runtime-ahead repositories: 0

selected repository: LuminaryLabs-Publish/PhantomCommand
selection rule: oldest synchronized central timestamp
prior central timestamp: 2026-07-15T03-24-35-04-00
next oldest eligible timestamp: AetherVale at 2026-07-15T03-41-50-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu
  -> procedural graveyard art
  -> settings, save presence and browser audio
  -> fade and navigate to game.html

campaign bootstrap
  -> create 640 x 360 source canvas
  -> create WebGL CRT display surface
  -> author rings, lanes, pads, units, towers, waves, camera and state
  -> attach keyboard, pointer, wheel, context-menu and blur listeners
  -> publish window.GameHost
  -> start recursive RAF and fixed-step simulation

normal player path
  -> input listeners mutate camera, selection, orders, construction, waves and pause
  -> fixed-step update resolves movement, targeting, combat, rewards and outcomes
  -> Canvas2D draws the accepted mutable state
  -> CRT renderer uploads and presents the source canvas

public diagnostic path
  -> external caller obtains live GameHost.state or GameHost.camera references
  -> caller mutates campaign or camera fields directly
  -> or caller invokes startWave, build or setZoom
  -> no command envelope or expected revision is checked
  -> no typed mutation result is published
  -> next RAF consumes the out-of-band state
  -> Canvas2D and CRT present a later frame without a mutation/frame identity
```

## Domains in use

```txt
static HTML routes and ES module lifecycle
browser document RAF performance blur and navigation lifecycle
procedural menu art settings save presence audio and routing
Canvas2D source rendering and pixel typography
WebGL context shaders texture upload and CRT presentation
campaign rings lanes pads towers units waves and archetypes
fixed-step scheduling and mutable campaign simulation
spawn movement targeting projectiles damage rewards and effects
isometric camera projection pan zoom and focus
keyboard pointer wheel context-menu and touch-pointer input
selection construction unit orders and wave admission
HUD minimap pause and terminal presentation
localStorage victory marker and reload retry
public host publication and ambient diagnostic capabilities
state snapshot and revision ownership
public command admission idempotency and retirement
Canvas2D and CRT frame evidence
construction intro choreography and sequence state
source checks static build Pages and central tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `crt-renderer-kit` | WebGL context creation, source texture upload, CRT shaders, screen/source mapping and disposal. |
| `graveyard-art-kit` | Procedural animated menu art and menu scene drawing. |
| `menu-route-kit` | Menu selection, panels, fade transition and navigation. |
| `menu-settings-persistence-kit` | CRT, grain and ambience preference read/write and projection. |
| `menu-save-presence-kit` | Save-marker detection and Continue availability. |
| `menu-audio-kit` | AudioContext ambience, wind and UI tones. |
| `campaign-route-shell-kit` | Campaign canvas, accessibility fallback and module bootstrap. |
| `pixel-campaign-runtime-kit` | Campaign state, authored content, listeners, lifecycle and host publication. |
| `fixed-step-campaign-simulation-kit` | Accumulator, 60 Hz update, waves, movement, combat, rewards and outcomes. |
| `pixel-campaign-render-kit` | World, pads, entities, effects, sanctum, HUD, minimap and overlays. |
| `legacy-gamehost-diagnostics-kit` | Live state/camera exposure, wave start, build, zoom and summary readback. |
| `menu-static-check-kit` | Menu source-marker assertions. |
| `campaign-static-check-kit` | Campaign HTML, source, CRT and build marker assertions. |
| `static-build-copy-kit` | Static product copy into build output. |
| `pages-deploy-kit` | GitHub Pages artifact publication. |
| `construct-spiral-intro-kit` | Intro construction choreography. |
| `construct-spiral-schedule-kit` | Timed construction schedule. |
| `construct-piece-id-kit` | Stable construction-piece identity. |
| `construct-piece-state-kit` | Construction-piece state and visibility. |
| `construct-sequence-update-kit` | Construction sequence advancement. |

```txt
implemented source-backed kits: 20
planned public capability authority surfaces: 19
```

## Service groups

```txt
menu:
  procedural drawing
  selection and panels
  settings persistence
  save presence
  fade and navigation

audio:
  AudioContext creation
  ambience drone and wind
  UI tones

campaign:
  state and authored content
  selection and construction
  unit orders and waves
  fixed-step simulation
  combat rewards pause and terminal flags
  victory marker persistence

render:
  Canvas2D menu and campaign surfaces
  world HUD minimap pause and terminal overlays
  WebGL CRT presentation
  screen/source coordinate mapping

input:
  keyboard
  primary pointer selection
  secondary pointer orders
  middle pointer pan
  wheel zoom
  blur settlement

public diagnostics:
  raw state reference
  raw camera reference
  direct startWave
  direct build
  direct setZoom
  cloned summary readback

construction:
  choreography
  scheduling
  identity
  state
  sequence advancement

delivery:
  static source checks
  static build
  GitHub Pages
  central audit tracking
```

## Main finding

The campaign publishes:

```js
window.GameHost = {
  state,
  camera,
  startWave,
  build,
  getState: () => structuredClone(...),
  setZoom: (z) => camera.targetZoom = clamp(...)
};
```

`state` and `camera` are the same mutable objects consumed by the fixed-step update and render loop. The public surface therefore permits operations such as:

```txt
change souls core wave paused won or lost
insert delete or mutate units towers projectiles and effects
move the camera outside listener ownership
change zoom targets directly
invoke wave start or construction outside player command admission
retain references after a future route or runtime generation should be retired
```

The static campaign check explicitly requires the `window.GameHost` marker, but it does not constrain the capability set or prove command settlement. No public capability generation, caller lease, expected state revision, idempotency key, typed mutation result, retirement receipt, Canvas2D frame revision or CRT frame acknowledgement exists.

This is a source-backed authority and evidence gap. It is not a claim that an external mutation was reproduced in a browser.

## Required authority

```txt
phantom-command-public-diagnostic-capability-frame-admission-authority-domain
```

```txt
PublicCapabilityPublicationCommand
  -> bind RouteRevision RuntimeGeneration and CapabilityPolicyRevision
  -> publish immutable campaign and camera snapshots
  -> publish only allowlisted diagnostic commands
  -> exclude live state camera and internal function references
  -> publish PublicCapabilitySetResult

PublicDiagnosticMutationCommand
  -> bind CapabilitySetId CallerLeaseId CommandId
     ExpectedCampaignRevision and ExpectedCameraRevision
  -> reject stale duplicate retired unsupported or ineligible work
  -> settle exactly once through the normal campaign authority
  -> publish PublicDiagnosticMutationResult
  -> publish CanvasFrameRevision and CrtFrameRevision
  -> acknowledge FirstPublicMutationVisibleFrameAck

PublicCapabilityRetirementCommand
  -> revoke capability sets and caller leases
  -> remove public references
  -> reject late callers
  -> publish retirement receipts
```

## Planned authority kits

```txt
public-capability-policy-kit
public-capability-set-kit
diagnostic-session-lease-kit
immutable-campaign-snapshot-kit
campaign-state-revision-kit
camera-state-revision-kit
public-command-envelope-kit
expected-revision-admission-kit
public-command-idempotency-kit
allowlisted-campaign-command-kit
allowlisted-camera-command-kit
public-mutation-settlement-kit
public-mutation-result-kit
capability-retirement-kit
late-caller-rejection-kit
canvas-frame-revision-kit
crt-frame-revision-kit
first-public-mutation-frame-ack-kit
public-capability-browser-fixture-kit
```

## Required repo-local output

```txt
.agent/trackers/2026-07-15T08-41-37-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T08-41-37-04-00.md
.agent/architecture-audit/2026-07-15T08-41-37-04-00-public-diagnostic-capability-dsk-map.md
.agent/render-audit/2026-07-15T08-41-37-04-00-direct-host-mutation-visible-frame-gap.md
.agent/gameplay-audit/2026-07-15T08-41-37-04-00-gamehost-out-of-band-mutation-loop.md
.agent/interaction-audit/2026-07-15T08-41-37-04-00-public-capability-command-result-map.md
.agent/host-capability-audit/2026-07-15T08-41-37-04-00-gamehost-read-write-contract.md
.agent/deploy-audit/2026-07-15T08-41-37-04-00-public-capability-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T08-41-37-04-00-oldest-selection-public-capability-reconciliation.md
```

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
public API behavior changed: no
gameplay changed: no
Canvas2D rendering changed: no
WebGL CRT rendering changed: no
persistence changed: no
package scripts and dependencies changed: no
tests workflows build and deployment changed: no
branch created: no
pull request created: no

npm run check: not run
npm run build: not run
public capability fixture: unavailable
stale and duplicate command fixture: unavailable
capability retirement fixture: unavailable
Canvas2D and CRT frame convergence fixture: unavailable
built-output and Pages parity: not run
```

No least-authority publication, command admission, mutation settlement, capability retirement, visible-frame convergence, artifact parity, Pages parity or production readiness is claimed.