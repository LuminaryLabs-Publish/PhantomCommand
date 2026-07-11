# Runtime Lifecycle Audit: Resource Lease and Retirement Contract

**Timestamp:** `2026-07-11T19-48-09-04-00`

## Summary

Every callback and resource needs a single lease owner. The lease registry is the authoritative inventory used for stop, reverse retirement, leak diagnostics and restart admission.

## Plan ledger

**Goal:** define the ownership contract for all menu and campaign runtime resources.

- [x] Inventory current resource classes.
- [x] Define lease and retirement records.
- [x] Define idempotency and stale-callback rules.
- [ ] Implement the registry and adapters.

## Lease classes

```txt
raf
event-listener
timer
audio-context
audio-node
webgl-shader
webgl-program
webgl-buffer
webgl-texture
global-capability
dom-created-canvas
```

## Lease record

```txt
leaseId
sessionId
runtimeGeneration
kind
owner
dependsOn[]
createdAtRevision
state: ACTIVE | STOPPED | RETIRED | FAILED
retire()
retirementResult
```

## Retirement order

```txt
reject commands
cancel RAF and timers
fence callbacks
remove listeners
stop audio sources and close context
revoke globals
delete CRT texture and buffer
delete program and shaders
release created canvases/references
publish final zero-or-declared lease counts
```

## Required invariants

```txt
one resource -> one active lease
one lease -> at most one successful retirement
duplicates return the retained retirement result
failed retirement keeps the session non-ready
new generation cannot reuse predecessor capabilities
diagnostics expose bounded lease and retirement journals
```
