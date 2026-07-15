# PhantomCommand Next Steps

**Timestamp:** `2026-07-14T23-38-29-04-00`

## Summary

Implement Isometric Render Order Frame Authority before treating the Canvas2D or CRT frame as proof of correct near/far occlusion around the sanctum.

## Plan ledger

**Goal:** replace fixed class-order drawing with a stable, versioned render plan that includes every world-space item.

- [ ] Add `FrameId`, `SimulationRevision`, `CameraRevision` and render-policy revision.
- [ ] Normalize sanctum, towers, units, projectiles and effects into world-renderable descriptors.
- [ ] Derive `depthKey = x + z` through one shared service.
- [ ] Add stable tie breaks based on class policy and item identity.
- [ ] Insert the sanctum at depth zero instead of drawing it last.
- [ ] Admit projectiles and effects into the world order or an explicit versioned overlay layer.
- [ ] Choose and document the health-bar occlusion policy.
- [ ] Build one immutable `IsometricRenderPlan` per accepted snapshot.
- [ ] Publish per-item draw receipts and `RenderFrameResult`.
- [ ] Acknowledge the first CRT-visible frame matching the plan fingerprint.
- [ ] Add far-side, near-side and equal-depth headless fixtures.
- [ ] Add deterministic Canvas2D pixel probes around the sanctum.
- [ ] Run the same fixture against source, `dist` and GitHub Pages.

## Completion gate

```txt
one snapshot
one camera revision
one ordered world-item plan
one Canvas2D draw result
one matching CRT-visible frame acknowledgement
```

Do not claim render-order correctness before all five identities converge.
