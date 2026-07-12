# Runtime Lifecycle Audit: RAF, Listener, WebGL and Audio Resource Contract

**Timestamp:** `2026-07-12T11-48-43-04-00`

## Summary

PhantomCommand currently depends on browser page destruction as its aggregate cleanup mechanism. The runtime needs an explicit resource ledger because callbacks, GPU objects, audio nodes and public hosts have different retirement semantics and failure modes.

## Plan ledger

**Goal:** specify one machine-readable ownership contract for every route-scoped resource and one idempotent retirement result.

- [x] Classify all source-backed route resources.
- [x] Define resource identity, owner and lifecycle fields.
- [x] Define allocation, activation, loss and retirement states.
- [x] Define aggregate retirement and residual-resource reporting.
- [x] Define context restoration and successor-session isolation.
- [ ] Implement the resource ledger and fixtures.

## Resource classes

```txt
callback resources
  RAF request IDs
  timeout IDs
  canvas listeners
  document listeners
  window listeners
  hidden-button listeners

WebGL resources
  context generation
  vertex shader
  fragment shader
  linked program
  fullscreen vertex buffer
  source texture
  attribute and uniform locations

Web Audio resources
  AudioContext
  master gain
  drone oscillator and gain
  wind source, filter and gain
  transient UI oscillators and gains
  delayed close timer

public resources
  window.PhantomMenu
  window.GameHost
```

## Resource record

```txt
RuntimeResourceRecord
  resourceId
  resourceKind
  runtimeSessionId
  runtimeGeneration
  routeId
  createdAtMs
  phase: Candidate | Active | Lost | Retiring | Retired | Failed
  nativeHandlePresent
  successorSchedulingAllowed
  disposalPolicy
  disposalAttempts
  lastResult
```

## Aggregate retirement result

```txt
RuntimeResourceRetirementResult
  retirementId
  runtimeSessionId
  runtimeGeneration
  status: Retired | AlreadyRetired | PartialFailure | RejectedStale
  recordsBefore
  recordsRetired
  recordsFailed
  residualResourceIds
  successorCallbacksRejected
  completedAtMs
```

## Specific ownership findings

```txt
CRT renderer
  creates shaders/program/buffer/texture
  exposes raw gl
  has no inventory or dispose

menu
  owns recursive RAF and multiple listeners
  may own AudioContext graph
  owns delayed audio close timer
  exposes PhantomMenu

campaign
  owns recursive RAF and fixed-step accumulator
  owns pointer/keyboard/wheel/blur listeners
  owns CRT resources
  exposes live GameHost
```

## Context-loss policy

```txt
webglcontextlost
  -> prevent default when recovery is supported
  -> mark context generation LOST
  -> reject draws and frame acknowledgements
  -> preserve or pause simulation by explicit policy
  -> publish loss result

webglcontextrestored
  -> verify session is still READY or DEGRADED
  -> create candidate context generation N+1
  -> rebuild and validate complete resource set
  -> install atomically
  -> present first restored frame
  -> retire predecessor records
```

## Retirement rules

```txt
RAF must be cancelled before GPU deletion.
Listeners must be removed before public host revocation completes.
Audio sources stop before AudioContext close.
Delayed close timers are cancelled or transferred into the retirement transaction.
WebGL deletion failures are recorded without reviving the session.
A successor session never inherits predecessor resource handles.
```

Documentation only. No resource ownership changed.