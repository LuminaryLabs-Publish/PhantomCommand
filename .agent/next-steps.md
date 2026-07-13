# PhantomCommand Next Steps

**Timestamp:** `2026-07-13T05-59-03-04-00`

## Summary

Implement WebGL Context Lifecycle and Recovery Authority before claiming that the CRT presentation surface survives GPU resets, tab pressure, driver faults or context restoration. Start with typed context/resource generations, then add deterministic rebuild, fallback projection, public readback and executable browser proof.

## Plan ledger

**Goal:** replace one-shot WebGL allocation with an explicit context state machine whose resources can be retired, rebuilt, adopted and proven visible.

### Context identity and events

- [ ] Give every display canvas a stable CRT surface ID.
- [ ] Allocate a WebGL context ID and monotonic context generation.
- [ ] Register `webglcontextlost` and `webglcontextrestored` before starting RAF.
- [ ] Publish typed loss, restore-pending, restored, rejected and disposed states.
- [ ] Bind every context event to route, surface and lifecycle generation.
- [ ] Reject stale context events from retired route generations.

### Resource ownership

- [ ] Move program, shaders, buffer, texture, uniforms and attribute locations into a resource-generation object.
- [ ] Delete shaders after successful linking.
- [ ] Delete partial shader/program allocations on compilation or link failure.
- [ ] Add idempotent resource disposal.
- [ ] Recreate all WebGL resources after restoration.
- [ ] Validate texture dimensions, uniform locations and attribute locations before adoption.
- [ ] Stop exposing raw mutable `gl`; expose bounded readback instead.

### Presentation transaction

- [ ] Give each source-canvas result a source-frame revision.
- [ ] Bind each CRT draw to a live context and resource generation.
- [ ] Return typed Presented, ContextLost, RestorePending, ResourceRejected, DrawFailed, Disposed and Stale results.
- [ ] Keep simulation/source ownership independent from display failure.
- [ ] Prevent a display exception from silently terminating RAF ownership.
- [ ] Track the last successfully presented frame and reason for degradation.

### Recovery and fallback

- [ ] Define when context-loss recovery is approved and call `preventDefault()` only through that policy.
- [ ] Pause GPU submission while retaining bounded source-state updates.
- [ ] Project a DOM fallback status that does not depend on WebGL.
- [ ] Add a retry or route-exit control for unrecoverable failure.
- [ ] Rebuild resources into a detached candidate generation.
- [ ] Submit a probe frame before adopting restored resources.
- [ ] Publish the first recovered visible-frame acknowledgement.

### Proof

- [ ] Use `WEBGL_lose_context` in browser fixtures when available.
- [ ] Prove loss retires the active generation and produces bounded fallback status.
- [ ] Prove restore recreates program, buffer, texture and locations.
- [ ] Prove the first recovered frame cites the successor generation.
- [ ] Prove failed rebuild leaves no partially adopted resources.
- [ ] Prove menu and campaign follow the same lifecycle contract.
- [ ] Run source, built-output and Pages lifecycle fixtures.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Existing owners to update

```txt
index.html
game.html
src/menu/crt-renderer.js
src/menu/graveyard-menu.js
src/campaign/campaign-scene.js
crt-renderer-kit
menu-route-kit
campaign-route-shell-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
menu-static-check-kit
campaign-static-check-kit
scripts/check-menu.mjs
scripts/check-campaign.mjs
package.json
```

## Dependency order

```txt
Context Identity and State
  -> Resource Generation Ownership
  -> Typed Presentation Results
  -> Context-Loss Fallback
  -> Resource Rebuild and Adoption
  -> First Recovered Frame Ack
  -> source/build/Pages lifecycle proof
```

Do not implement this as only two event listeners around the existing closure. The resource handles, frame identity, public diagnostics, fallback UI and route lifecycle must all participate in one authority.