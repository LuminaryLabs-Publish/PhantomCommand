# PhantomCommand Runtime Session Lifecycle Authority DSK Map

**Timestamp:** `2026-07-10T21-49-26-04-00`

## Current ownership graph

```txt
index.html
  -> graveyard-menu.js module evaluation
     -> source canvas
     -> graveyard art
     -> CRT renderer/WebGL resources
     -> settings and menu state
     -> optional AudioContext graph
     -> canvas/document/button listeners
     -> recursive RAF loop
     -> timed navigation to game.html

game.html
  -> campaign-scene.js module evaluation
     -> source canvas
     -> CRT renderer/WebGL resources
     -> descriptors and mutable campaign state
     -> canvas/window listeners
     -> recursive RAF loop
     -> fixed-step simulation
     -> render and GameHost publication
     -> reload or navigation exit
```

No object owns the complete lifetime of either route after module evaluation.

## Existing domains

### Route construction domain

Services:

```txt
create canvases and route-local state
construct rendering resources
install route listeners
start animation frames
navigate or reload on exit
```

Gap: construction is implicit, eager, and not transactional.

### Menu state and transition domain

Services:

```txt
menu selection
settings and credits panels
settings persistence
raw save presence
fade transition
route navigation
```

Gap: no transition result, cancellation, teardown ordering, or lifecycle readback.

### Menu audio domain

Services:

```txt
lazy AudioContext creation
drone and wind sources
UI tones
ambience disable and delayed context close
```

Gap: route exit does not explicitly stop sources or close the context.

### Campaign simulation domain

Services:

```txt
fresh state construction
input mutation
fixed-step simulation
win/loss state
victory summary persistence
```

Gap: no session state or session ID scopes simulation state, counters, frames, commands, or persistence.

### CRT render domain

Services:

```txt
shader compilation and program link
buffer and texture creation
source upload
CRT draw
resize and pointer mapping
```

Gap: no release method deletes program, shaders, buffer, or texture.

### Diagnostics domain

Services:

```txt
PhantomMenu.getState and activate
GameHost mutable state and camera
GameHost startWave, build, getState, and setZoom
```

Gap: no lifecycle command, lifecycle state, resource count, or disposal result.

## Missing lifecycle domains

```txt
runtime-session-authority-domain
runtime-session-state-domain
runtime-session-id-domain
startup-transaction-domain
partial-start-rollback-domain
animation-frame-ownership-domain
listener-registration-ledger-domain
audio-resource-ownership-domain
webgl-resource-ownership-domain
ordered-teardown-domain
idempotent-disposal-domain
route-transition-result-domain
runtime-restart-domain
lifecycle-result-journal-domain
lifecycle-observation-domain
```

## Candidate DomainServiceKits

```txt
phantom-command-runtime-session-authority-kit
phantom-command-runtime-session-state-kit
phantom-command-runtime-session-id-kit
phantom-command-startup-transaction-kit
phantom-command-partial-start-rollback-kit
phantom-command-animation-frame-owner-kit
phantom-command-listener-ledger-kit
phantom-command-audio-resource-owner-kit
phantom-command-crt-resource-owner-kit
phantom-command-ordered-dispose-kit
phantom-command-idempotent-disposal-kit
phantom-command-route-transition-result-kit
phantom-command-runtime-restart-kit
phantom-command-lifecycle-result-journal-kit
phantom-command-gamehost-lifecycle-observation-kit
phantom-command-lifecycle-fixture-kit
phantom-command-lifecycle-build-gate-kit
```

## Required contract

```txt
createRouteSession(kind)
  -> state: starting
  -> allocate sessionId
  -> construct child resources through an ownership ledger
  -> install named listener registrations
  -> retain RAF request ID
  -> state: running

stop(reason)
  -> state: stopping
  -> cancel future RAF scheduling
  -> cancel retained RAF request
  -> reject new route/gameplay admission
  -> state: stopped

dispose(reason)
  -> stop if needed
  -> remove listeners in reverse registration order
  -> stop and close audio resources
  -> delete CRT texture, buffer, program, and shader resources
  -> clear exported global handles owned by the session
  -> append immutable lifecycle result
  -> state: disposed

restart(reason)
  -> dispose old session exactly once
  -> create a new session with a new sessionId
  -> prove one RAF loop, one listener set, and one resource set
```

## Invariants

- At most one running session exists per route host.
- Each scheduled RAF belongs to exactly one session.
- Every installed listener has one removal record.
- Every audio and WebGL allocation has one release result or explicit browser-owned exemption.
- `stop()` and `dispose()` are idempotent.
- Partial startup failure rolls back all already-created resources.
- A disposed session cannot accept menu, camera, or gameplay commands.
- Restart creates a new session ID and leaves no live resources attributed to the old session.
- Lifecycle observations are clone-safe and bounded.

## Ordering with existing work

The shared Continue resolver remains first because it determines valid campaign admission. Campaign action-result authority remains second because it creates deterministic gameplay command boundaries. Lifecycle authority follows and should scope those resolver/action/frame records beneath a stable route-session ID.