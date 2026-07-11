# Listener and Global Lease Map

**Timestamp:** `2026-07-11T03-41-49-04-00`

## Summary

Input and diagnostics surfaces are installed directly on shared browser objects. Exact ownership cannot be recovered later because several handlers are anonymous and globals are replaced without leases.

## Plan ledger

**Goal:** make every input registration and public global attributable to one route session and releasable exactly once.

- [x] Map menu listeners.
- [x] Map campaign listeners.
- [x] Map global exposures.
- [x] Define lease records and release rules.
- [ ] Implement named handlers and lease fixtures.

## Menu listener map

```txt
displayCanvas pointermove -> named onPointerMove
displayCanvas pointerdown -> anonymous
displayCanvas pointerleave -> anonymous
document keydown -> anonymous
each [data-menu-action] button click -> anonymous
```

## Campaign listener map

```txt
canvas pointermove -> anonymous
canvas pointerdown -> anonymous
canvas pointerup -> anonymous
canvas contextmenu -> anonymous
canvas wheel -> anonymous with passive:false
window keydown -> anonymous
window keyup -> anonymous
window blur -> anonymous
```

## Global map

```txt
window.PhantomMenu
  getState()
  activate(action)

window.GameHost
  state
  camera
  startWave()
  build()
  getState()
  setZoom()
```

## Gaps

```txt
anonymous handlers cannot be removed by exact reference
no listener options are retained for removal proof
no session identity is attached to registrations
no active listener count exists
global replacement discards prior ownership
dispose cannot know whether it still owns the property
GameHost leaks mutable state and camera
no lifecycle status or last teardown result is observable
```

## Listener lease row

```txt
listenerId
sessionId
runGeneration
targetKind
eventType
handlerId
options
status
addedSequence
removedSequence
```

## Global lease row

```txt
leaseId
sessionId
objectKind
property
previousDescriptor
installedDescriptor
ownerToken
status
releasedSequence
```

## Release rules

```txt
remove with the same target, type, handler and capture semantics
release is idempotent
a session restores a global only if its owner token still matches
a newer owner cannot be overwritten by an older disposer
public observations are immutable clones
```

## Fixtures

```txt
listener add/remove parity
double removal
startup failure after partial listener registration
two sessions competing for one global
older session disposal after newer global installation
mutable GameHost reference rejection
zero listeners and no owned global after disposal
```
