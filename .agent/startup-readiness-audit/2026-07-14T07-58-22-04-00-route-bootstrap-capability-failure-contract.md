# Route Bootstrap Capability and Failure Contract

**Timestamp:** `2026-07-14T07-58-22-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

This contract defines when a PhantomCommand route may claim readiness and what it must do when a required startup capability fails.

## Plan ledger

**Goal:** give menu and campaign one shared startup contract while allowing route-specific content and optional capabilities.

- [x] Classify required and optional capabilities.
- [x] Define preparation, probe, adoption and rollback boundaries.
- [x] Define route-specific accepted evidence.
- [x] Define fallback and retry obligations.
- [ ] Implement and freeze the contract after browser proof.

## Capability manifest

### Shared required capabilities

```txt
route DOM root
source canvas
Canvas2D context
WebGL context
CRT shader program
source texture upload
one successful CRT draw
one RAF delivery
visible fallback container
```

### Menu required capabilities

```txt
graveyard art preparation
menu state preparation
pointer and keyboard command leases
native-button activation leases
PhantomMenu facade
```

### Menu optional capabilities

```txt
AudioContext
ambience graph
UI tone graph
browser storage
```

Optional failure must be classified as degraded rather than silently conflated with accepted capability.

### Campaign required capabilities

```txt
authored ring, pad, unit and wave state
pointer, wheel, keyboard and blur leases
fixed-step simulation candidate
GameHost facade
first simulation tick probe
```

## Startup phases

```txt
created
probing-capabilities
preparing-candidates
probing-source-frame
probing-crt-frame
adopting
accepted
failed
rolling-back
rolled-back
superseded
```

## Readiness rule

A route is ready only when:

```txt
all required capabilities are accepted
all candidate resources belong to one attempt
listeners and frame submission belong to that attempt
public host cites that attempt
one source frame and one CRT frame succeeded
fallback has been replaced or retired
RouteStartupResult is accepted
FirstRouteFrameAck cites the same attempt
```

## Failure rule

On required-capability failure:

```txt
stop candidate frame submission
remove candidate listeners
release candidate GPU and audio resources
revoke candidate public host publication
preserve or restore parser-owned fallback
publish failed phase and bounded reason
expose retry and safe route escape
```

## Retry rule

Retry must allocate a new attempt ID and new candidate manifest. Completion from the predecessor attempt must not adopt or publish resources.

## Validation rule

Do not mark this authority implemented until source, built output and GitHub Pages pass the same required fault matrix in a real browser.

## Validation boundary

Documentation only.