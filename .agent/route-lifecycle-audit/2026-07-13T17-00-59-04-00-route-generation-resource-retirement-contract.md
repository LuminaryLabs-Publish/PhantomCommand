# Route Generation Resource Retirement Contract

**Timestamp:** `2026-07-13T17-00-59-04-00`

## Summary

This contract defines how menu and campaign route generations own and retire browser resources.

## Plan ledger

**Goal:** prevent orphaned callbacks, audio, GPU resources, listeners and public capabilities during navigation, reload and failure.

- [x] Define resource manifest.
- [x] Define lifecycle states.
- [x] Define prepare, retire and result phases.
- [x] Define failure and recovery policy.
- [ ] Implement later.

## Resource manifest

```txt
routeGeneration
rafCallbackIds
canvasListenerLeases
documentListenerLeases
windowListenerLeases
audioContextAndNodeLeases
webglProgramShaderBufferTextureLeases
publicCapabilityLeases
pendingTimeouts
sourceAndDisplayCanvasIdentity
```

## Lifecycle

```txt
Preparing
Active
Retiring
Retired
NavigationPending
Succeeded
Failed
Restored
```

## Invariants

1. Only the active route generation may admit input or schedule successor RAF work.
2. Retirement is idempotent and returns a detached receipt for every resource class.
3. Public hosts cite the generation and reject calls once it retires.
4. Navigation starts only after accepted retirement unless a policy explicitly permits a bounded overlap.
5. A failed navigation cannot leave a fully faded, command-active predecessor.
6. Readiness belongs to the successor's first matching visible frame.
