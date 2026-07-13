# PhantomCommand Current Audit

**Timestamp:** `2026-07-13T17-00-59-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `route-session-resource-retirement-authority-audited`

## Summary

Menu and campaign are independent browser route sessions, but neither owns a typed lifetime. They allocate canvases, CRT resources, RAF callbacks, event listeners and public capabilities at module scope. The menu may also allocate an AudioContext and persistent ambience. Navigation and restart use browser location APIs directly, with no resource manifest, retirement generation, disposal receipt, navigation result, failure fallback or first-successor-frame proof.

## Plan ledger

**Goal:** require every route transition to retire the complete predecessor resource set and prove successor readiness.

- [x] Compare the complete Publish repository list with central tracking.
- [x] Exclude TheCavalryOfRome.
- [x] Select only PhantomCommand under the oldest eligible rule.
- [x] Read menu, campaign, CRT renderer, package and prior audit state.
- [x] Identify the interaction loop and active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Trace RAF, listeners, audio, GPU resources, public hosts and navigation.
- [x] Add the timestamped audit family and refresh root `.agent` state.
- [ ] Implement and execute the authority later.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
new eligible repositories: 0
ledger-missing eligible repositories: 0
selected: LuminaryLabs-Publish/PhantomCommand
selection reason: oldest eligible central timestamp, 2026-07-13T11-41-10-04-00
```

## Complete interaction loop

```txt
menu
  -> create canvases, art and CRT WebGL renderer
  -> register canvas, document and hidden-button listeners
  -> create audio lazily after input
  -> publish window.PhantomMenu
  -> recursive RAF
  -> transition fade
  -> location.href
  -> implicit browser cleanup

campaign
  -> create canvases and CRT WebGL renderer
  -> register canvas and global keyboard/blur listeners
  -> publish window.GameHost
  -> recursive RAF and fixed-step simulation
  -> Escape location.href or R location.reload
  -> implicit browser cleanup
```

## Source-backed findings

### No route generation or manifest

Neither route identifies a session generation or inventories its callbacks, listeners, audio, WebGL resources, canvases, timeout work and public capabilities.

### No explicit RAF retirement

Recursive RAF IDs are not retained. No stop method, cancellation receipt or stale-callback rejection exists before navigation or reload.

### No CRT disposal surface

The renderer creates shaders, a program, buffer and texture but returns no `dispose()` operation. It exposes the raw WebGL context.

### No route-driven audio retirement

Audio is closed only when ambience is disabled. Route transition, page hide and page replacement do not own a typed suspend or close result.

### No listener or public-host retirement

Listeners are registered directly. Public hosts have no generation and remain callable until document replacement.

### No terminal navigation result

The menu later assigns `location.href`; campaign exit and restart call browser location APIs directly. Success, failure, timeout and supersession are unclassified.

### No successor visible proof

A route transition is treated as complete without proof that the successor route initialized and presented a frame.

## Domains in use

```txt
menu and campaign route shells
browser navigation reload pagehide and document lifecycle
route generation transition admission retirement failure and restoration
RAF callback ownership and stale work rejection
pointer keyboard wheel drag and native-button input
AudioContext ambience tones activation suspension and closure
Canvas2D source rendering and WebGL CRT presentation
campaign camera simulation combat rewards and outcomes
settings save presence and victory persistence
public PhantomMenu and GameHost capabilities
construction choreography
source checks build Pages deployment and audit tracking
```

## Implemented kits and offered services

```txt
crt-renderer-kit: WebGL context shaders buffer texture resize mapping upload and draw
graveyard-art-kit: procedural menu and panel drawing
menu-route-kit: selection panels fade transition and location navigation
menu-settings-persistence-kit: settings read/write
menu-save-presence-kit: save-key scanning
menu-audio-kit: AudioContext ambience tones and setting-driven delayed close
campaign-route-shell-kit: campaign document and source canvas
pixel-campaign-runtime-kit: state input selection building orders pause and camera
fixed-step-campaign-simulation-kit: accumulator waves movement targeting projectiles damage and outcomes
pixel-campaign-render-kit: world HUD minimap terminal and source-canvas rendering
legacy-gamehost-diagnostics-kit: public state and direct capabilities
menu-static-check-kit: menu source-marker checks
campaign-static-check-kit: campaign source-marker checks
static-build-copy-kit: deployable static copy
pages-deploy-kit: GitHub Pages delivery
construct-spiral-intro-kit: intro choreography
construct-spiral-schedule-kit: ring and piece timing
construct-piece-id-kit: stable construction identity
construct-piece-state-kit: construction state projection
construct-sequence-update-kit: sequence advancement
```

## Required authority

```txt
phantom-command-route-session-resource-retirement-authority-domain
```

## Required transaction

```txt
RouteTransitionCommand
  -> bind source route generation and target
  -> reject duplicate stale or retired commands
  -> freeze predecessor command admission
  -> collect resource manifest and participant receipts
  -> cancel RAF and listener leases
  -> suspend or close audio
  -> dispose CRT resources
  -> revoke public capabilities
  -> publish ResourceRetirementResult
  -> admit browser navigation
  -> publish RouteTransitionResult
  -> show bounded fallback or restore predecessor on failure
  -> publish FirstRouteFrameAck from successor
```

## Validation boundary

Documentation-only. No route, audio, input, RAF, WebGL, gameplay, persistence, script, dependency or deployment behavior changed.
