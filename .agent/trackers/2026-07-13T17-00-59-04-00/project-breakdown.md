# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-13T17-00-59-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `route-session-resource-retirement-authority-audited`

## Summary

PhantomCommand has two independent browser routes. Each route allocates canvases, a CRT WebGL renderer, recursive RAF work, global event listeners and public host capabilities at module scope. Menu navigation, campaign exit and campaign restart rely on `location.href` or `location.reload()` and therefore delegate retirement to implicit browser teardown. No route generation, resource manifest, cancellation lease, disposal receipt, failure fallback or first-successor-frame acknowledgement exists.

## Plan ledger

**Goal:** define one route-transition transaction that retires the active menu or campaign generation, disposes owned resources, admits navigation and proves the first frame of the successor route.

- [x] Compare the ten accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries.
- [x] Confirm no new or ledger-missing eligible repository exists.
- [x] Select only PhantomCommand as the oldest eligible central entry.
- [x] Inspect menu boot, campaign boot, recursive RAF ownership, listeners, audio, WebGL resources, public hosts and navigation commands.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define the route-session resource-retirement authority and 24 candidate kits.
- [x] Add the timestamped audit family and refresh root `.agent` state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement explicit retirement and executable source/build/Pages fixtures later.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
new eligible repositories: 0
ledger-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/PhantomCommand
selection reason: oldest eligible central timestamp
prior central timestamp: 2026-07-13T11-41-10-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu boot
  -> acquire display and source canvases
  -> create Canvas2D art and CRT WebGL resources
  -> register canvas, document and hidden-button listeners
  -> optionally create an AudioContext and persistent ambience nodes
  -> publish window.PhantomMenu
  -> start an untracked recursive RAF loop

menu navigation
  -> beginTransition records target URL and wall-clock time
  -> menu RAF, listeners, audio and WebGL rendering continue during fade
  -> assign window.location.href after 0.95 seconds
  -> browser teardown is expected to retire every resource implicitly
  -> no transition or disposal result exists

campaign boot
  -> acquire canvases and create CRT WebGL resources
  -> register canvas and global keyboard/blur listeners
  -> publish window.GameHost
  -> start an untracked recursive RAF loop

campaign exit or restart
  -> Escape assigns location.href="./"
  -> R invokes location.reload()
  -> active callbacks and resources have no explicit retirement generation
  -> no successor-route first-frame acknowledgement exists
```

## Domains in use

```txt
menu and campaign route shells
browser document location reload pagehide and unload lifecycle
route transition identity admission retirement and failure
recursive RAF ownership and stale callback rejection
canvas pointer keyboard wheel drag and hidden-button input
AudioContext ambience UI tones activation and closure
Canvas2D menu world HUD minimap and terminal projection
WebGL CRT context shader buffer texture and draw resources
campaign camera simulation waves units towers projectiles and outcomes
settings save presence and minimal victory persistence
public PhantomMenu and GameHost capabilities
construction intro choreography
source checks static build GitHub Pages and audit tracking
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL creation shaders buffer texture resize source upload screen mapping and CRT draw
graveyard-art-kit: procedural menu and panel drawing
menu-route-kit: selection panel state fade transition and location navigation
menu-settings-persistence-kit: settings read and write
menu-save-presence-kit: local and session storage save-key scan
menu-audio-kit: AudioContext ambience UI tones and delayed close when ambience is disabled
campaign-route-shell-kit: campaign document source canvas and assistive description
pixel-campaign-runtime-kit: mutable state input selection building orders pause and camera
fixed-step-campaign-simulation-kit: accumulator drain waves movement targeting projectiles damage and outcomes
pixel-campaign-render-kit: world HUD minimap terminal and source-canvas presentation
legacy-gamehost-diagnostics-kit: public mutable state and direct capabilities
menu-static-check-kit: menu source-marker checks
campaign-static-check-kit: campaign source-marker checks
static-build-copy-kit: deployable static copy
pages-deploy-kit: GitHub Pages deployment
construct-spiral-intro-kit: construction intro choreography
construct-spiral-schedule-kit: ring and piece timing
construct-piece-id-kit: stable construction identity
construct-piece-state-kit: construction state projection
construct-sequence-update-kit: sequence advancement
```

## Source-backed findings

### Route resources have no manifest

Menu and campaign modules allocate their resources at module scope. Neither publishes a route generation or a manifest of RAF callbacks, listeners, audio nodes, WebGL objects, canvases and public capabilities that must be retired.

### RAF work cannot be cancelled explicitly

Both routes call `requestAnimationFrame(frame)` recursively but retain no callback ID and expose no `stop`, `dispose` or terminal scheduler state. A transition can only depend on document replacement.

### CRT resources have no disposal contract

`createCrtRenderer()` creates a program, shaders, buffer and texture and returns render, resize, screen mapping and the raw WebGL context. It provides no disposal method and exposes the mutable context.

### Audio retirement is setting-driven, not route-driven

Menu audio closes only through `stopAmbience()` when ambience is disabled. Starting a route transition does not stop or suspend the AudioContext, and no `pagehide` owner publishes a closure result.

### Listeners and public hosts have no generation fence

Canvas and document listeners are anonymous or not centrally registered. `window.PhantomMenu` and `window.GameHost` are published without a generation and are never explicitly retired before navigation or reload.

### Navigation has no terminal result

`beginTransition()` stores a target URL and later assigns `window.location.href`. Campaign exit and restart call location APIs directly. No accepted, failed, cancelled, superseded or timed-out result is available.

### Successor visibility is unproven

The outgoing route never receives proof that the successor route initialized or rendered. Failed or blocked navigation has no bounded fallback and leaves the outgoing route in a fully faded but still active state.

## Required authority

```txt
phantom-command-route-session-resource-retirement-authority-domain
```

## Required transaction

```txt
RouteTransitionCommand
  -> bind source route generation and requested target
  -> freeze duplicate transition admission
  -> snapshot the owned resource manifest
  -> stop new input and gameplay command admission
  -> retire RAF and event-listener leases
  -> suspend or close audio under an explicit policy
  -> dispose CRT resources and revoke raw public capabilities
  -> publish ResourceRetirementResult
  -> admit navigation only after accepted retirement
  -> classify Accepted Failed Cancelled Superseded or TimedOut
  -> project a route-independent failure fallback when navigation fails
  -> let the successor allocate a new route generation
  -> publish FirstRouteFrameAck
```

## Candidate authority kits

```txt
route-transition-id-kit
route-generation-kit
route-transition-command-kit
route-transition-policy-kit
route-transition-result-kit
route-resource-manifest-kit
raf-loop-lease-kit
event-listener-lease-kit
webgl-resource-lease-kit
audio-context-lease-kit
public-host-generation-kit
navigation-admission-kit
pagehide-retirement-kit
beforeunload-retirement-kit
stale-callback-rejection-kit
candidate-retirement-kit
resource-disposal-receipt-kit
route-failure-fallback-kit
first-route-frame-ack-kit
menu-to-campaign-transition-fixture-kit
campaign-to-menu-transition-fixture-kit
reload-retirement-fixture-kit
failed-navigation-fixture-kit
source-build-pages-route-lifecycle-fixture-kit
```

## Existing owners to update

```txt
index.html
game.html
src/menu/graveyard-menu.js
src/menu/crt-renderer.js
src/campaign/campaign-scene.js
menu-route-kit
menu-audio-kit
crt-renderer-kit
pixel-campaign-runtime-kit
legacy-gamehost-diagnostics-kit
menu-static-check-kit
campaign-static-check-kit
scripts/check-menu.mjs
scripts/check-campaign.mjs
package.json
```

## Validation boundary

This run changes documentation only. No HTML, JavaScript, route behavior, input, audio, RAF, WebGL, gameplay, persistence, scripts, dependencies or deployment workflow is changed.
