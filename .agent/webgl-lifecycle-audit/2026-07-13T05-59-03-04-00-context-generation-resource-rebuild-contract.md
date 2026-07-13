# Context Generation and Resource Rebuild Contract

**Timestamp:** `2026-07-13T05-59-03-04-00`

## Summary

The current renderer stores initial WebGL handles as immutable closure constants. Recovery requires those handles to become one explicitly owned resource-generation record that can be prepared, validated, atomically adopted and idempotently disposed.

## Plan ledger

**Goal:** define the exact resource contract required for safe context restoration.

- [x] Inventory context, program, shader, buffer, texture, uniform and attribute ownership.
- [x] Define context/resource generation states.
- [x] Define candidate preparation and validation.
- [x] Define atomic adoption and failed-candidate disposal.
- [x] Define presentation admission against current generations.
- [ ] Implement later.

## State model

```txt
ContextGeneration
  Creating
  Ready
  Lost
  Restoring
  Failed
  Disposed

ResourceGeneration
  Preparing
  Validated
  Current
  Retired
  Rejected
  Disposed
```

## Resource record

```txt
contextId
contextGeneration
resourceGeneration
program
vertexShader
fragmentShader
positionBuffer
sourceTexture
attributeLocations
uniformLocations
sourceWidth
sourceHeight
createdAtSequence
status
```

## Rebuild contract

1. Create all candidate resources against the restored context.
2. Compile and link with complete failure cleanup.
3. Validate every required attribute and uniform location.
4. Allocate and configure the source texture.
5. Submit a bounded probe upload/draw.
6. Adopt the candidate only after all checks succeed.
7. Dispose the predecessor or failed candidate idempotently.
8. Publish one terminal rebuild result.

## Presentation admission

A draw is accepted only when its context and resource generations are both current, ready, non-disposed and match the source surface. Every other draw returns a typed zero-mutation rejection.

## Public boundary

Do not return raw `gl`. Publish immutable health/readback data and bounded commands so external diagnostics cannot mutate lifecycle-owned resources.