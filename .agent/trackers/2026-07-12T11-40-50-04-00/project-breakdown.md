# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-12T11-40-50-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`

## Summary

This documentation pass isolates campaign world-pointer admission. The CRT renderer returns source coordinates plus an `inside` flag, but the campaign accepts pointer drag, selection, orders, middle-button pan and wheel anchoring without requiring `inside === true`. The CPU projection also performs only contain-letterbox conversion while the visible CRT shader additionally curves texture coordinates, so a valid source coordinate is not necessarily the world point shown under the pointer.

## Plan ledger

**Goal:** define one campaign pointer transaction that proves the event belongs to the visible source surface, inverts the active display transform, binds the result to the current camera and display generations, and admits exactly one typed gameplay or camera command.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Detect newer unsynchronized `IntoTheMeadow` repo-local work at `2026-07-12T11-29-40-04-00` and avoid overlapping it.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` as the next-oldest synchronized eligible repository.
- [x] Inspect menu startup, campaign startup, CRT display projection, pointer handlers, camera mapping, simulation, rendering, diagnostics, checks, build and deployment.
- [x] Identify the complete interaction loop.
- [x] Identify all domains in use.
- [x] Preserve all 20 implemented kits and their services.
- [x] Trace letterbox, curved-display, drag, selection, order, pan and wheel command paths.
- [x] Define a DSK/domain boundary, command/result contracts, observations and fixture gates.
- [x] Add timestamped tracker and audit files under the root `.agent` folder.
- [x] Refresh required root `.agent` routing and registry files.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable campaign-pointer fixtures remain future work.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

IntoTheMeadow   central 2026-07-12T09-21-40-04-00, repo-local 2026-07-12T11-29-40-04-00, skipped as newer unsynchronized work
PhantomCommand  central/repo-local 2026-07-12T09-28-05-04-00, selected next-oldest synchronized repository
HorrorCorridor  2026-07-12T09-48-15-04-00
ZombieOrchard   2026-07-12T10-09-07-04-00
MyCozyIsland    2026-07-12T10-20-02-04-00
TheUnmappedHouse 2026-07-12T10-30-00-04-00
AetherVale      2026-07-12T10-48-19-04-00
TheOpenAbove    2026-07-12T11-15-16-04-00
PrehistoricRush 2026-07-12T11-21-01-04-00
TheCavalryOfRome excluded
```

## Complete interaction loop

```txt
menu boot
  -> create 480x270 source canvas and procedural graveyard art
  -> create CRT WebGL renderer
  -> read settings and save presence
  -> install pointer, keyboard and hidden-button handlers
  -> start recursive menu RAF
  -> publish window.PhantomMenu

menu activation
  -> Begin or Continue starts a fade
  -> navigate to game.html with campaign query

campaign boot
  -> create 640x360 source canvas and CRT renderer
  -> create rings, lanes, pads, units, economy, camera and fixed-step state
  -> install pointer, keyboard, wheel, blur and context-menu handlers
  -> start recursive campaign RAF
  -> publish window.GameHost

campaign pointer
  -> screenToSource(clientX, clientY)
  -> retain x, y and inside
  -> left drag selects units or build pads
  -> right click issues an order
  -> middle drag pans camera
  -> wheel changes zoom around the projected point

campaign frame
  -> sample bounded RAF delta
  -> update camera
  -> drain 1/60 fixed steps
  -> spawn, move, target, damage, reward and resolve waves
  -> draw world, HUD, minimap and overlays to source canvas
  -> upload source canvas and present through CRT shader
```

## Domains in use

```txt
static menu and campaign route shells
menu selection panels settings save presence fade and navigation
viewport containment source-coordinate projection and CRT curve presentation
pointer keyboard wheel drag focus and browser lifecycle
campaign selection build order wave pause camera and restart
fixed-step spawning movement targeting projectile damage reward and terminal state
campaign rings lanes pads towers units projectiles economy and persistence
procedural graveyard source rendering
campaign world HUD minimap and overlay source rendering
WebGL context shader program buffer texture upload and display projection
Web Audio activation ambience UI tones and teardown
public menu and campaign host diagnostics
source checks static build GitHub Pages deployment and audit tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `crt-renderer-kit` | WebGL context, shader program, buffer, texture upload, contain display, source projection, CRT curve, grain and fade |
| `graveyard-art-kit` | Procedural graveyard, menu, settings and credits drawing |
| `menu-route-kit` | Menu selection, panels, activation, fade and campaign routing |
| `menu-settings-persistence-kit` | CRT, grain and ambience preference persistence |
| `menu-save-presence-kit` | Presence-only scan across three save keys and local/session storage |
| `menu-audio-kit` | AudioContext, ambience graph, UI tones and delayed close |
| `campaign-route-shell-kit` | Campaign page startup and route shell |
| `pixel-campaign-runtime-kit` | State, selection, build, orders, wave, pause, camera, restart and navigation |
| `fixed-step-campaign-simulation-kit` | Spawn, movement, targeting, damage, rewards and terminal mutation |
| `pixel-campaign-render-kit` | World, HUD, minimap, pause and terminal rendering |
| `legacy-gamehost-diagnostics-kit` | Public state read and direct mutation surfaces |
| `menu-static-check-kit` | Menu source and token checks |
| `campaign-static-check-kit` | Campaign source and token checks |
| `static-build-copy-kit` | Static deployable output assembly |
| `pages-deploy-kit` | GitHub Pages build and deployment |
| `construct-spiral-intro-kit` | Construction-intro orchestration |
| `construct-spiral-schedule-kit` | Construction timing schedule |
| `construct-piece-id-kit` | Stable construction-piece identity |
| `construct-piece-state-kit` | Construction-piece lifecycle state |
| `construct-sequence-update-kit` | Construction-sequence progression |

## Main finding

`screenToSource()` returns coordinates outside the source rectangle and marks them with `inside: false`. The campaign copies this result into `input.pointer`, but its pointer handlers do not use the flag as an admission condition.

```txt
left pointerdown outside source
  -> creates drag start
  -> pointerup can select a world point or rectangle

right pointerdown outside source
  -> screenToWorld(outside coordinates)
  -> issues orders and effects

middle drag outside source
  -> changes camera position

wheel outside source
  -> derives before/after world points
  -> changes camera zoom and position
```

The display path also applies `curveUv()` when CRT is enabled. The CPU `screenToSource()` path performs contain conversion only and does not invert that curve. Therefore `inside === true` is necessary but not sufficient for visible-world targeting.

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

## Required transaction

```txt
PointerEventEnvelope
  -> validate runtime/input session
  -> validate current display generation
  -> classify inside or outside the visible source frame
  -> invert the active CRT display transform
  -> bind source coordinates to the current camera revision
  -> derive a typed world projection
  -> admit selection, order, pan, drag or zoom by policy
  -> reject outside, stale and invalid projections with zero mutation
  -> commit one typed command result
  -> correlate result with state, camera and visible-frame revisions
  -> append bounded observation and journal rows
```

## Validation boundary

Documentation only. Runtime source, input behavior, camera behavior, simulation, rendering, audio, persistence, package scripts, dependencies and deployment were not changed. Existing checks were inspected but not executed.