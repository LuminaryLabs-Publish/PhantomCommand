# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T11-40-50-04-00`

## Summary

The newest documented gap is campaign world-pointer admission. The renderer computes source coordinates and an `inside` flag, but campaign selection, orders, pan and wheel zoom accept the coordinates without containment admission. The visible CRT curve is also absent from CPU input inversion.

## Plan ledger

**Goal:** require current display, transform, camera and gesture evidence before pointer-driven campaign mutation.

- [ ] Input-session and pointer-event identity.
- [ ] Display-generation and source-frame revision.
- [ ] Camera-revision binding.
- [ ] Typed contain projection result.
- [ ] Inverse CRT curve projection.
- [ ] Typed source-to-world projection result.
- [ ] Selection, order, pan and zoom command admission.
- [ ] Drag and pan gesture leases.
- [ ] Explicit outside-surface no-op results.
- [ ] Stale display/camera/gesture rejection.
- [ ] Pointer action observation and bounded journal.
- [ ] Command-to-visible-frame receipt.
- [ ] Deterministic and browser campaign-pointer fixtures.
- [ ] Retain menu pointer, bootstrap, host, combat, audio, lifecycle and checkpoint gates.

## Campaign pointer gaps

```txt
inside flag consumed by campaign commands: no
inverse CRT curve: no
display generation: no
camera revision: no
pointer event ID: no
gesture ID/lease: no
typed source projection: no
typed world projection: no
typed campaign pointer command/result: no
stale projection rejection: no
command observation/journal: no
visible-frame receipt: no
browser projection fixtures: no
```

## Concrete risks

```txt
right-clicking a letterbox margin can issue an off-screen world order
left-clicking or dragging from a margin can change selection
middle dragging in a margin can move the camera
wheel input in a margin can move and zoom the camera
CRT curvature can shift the actionable world point away from the visible pixel
pointer gestures can survive display or camera changes without revalidation
```

## Retained gaps

```txt
Menu pointer misses can execute the selected action
Campaign Begin and Continue lack validated bootstrap and hydration
GameHost exposes live mutable owners
Campaign phase does not fence commands
Commands are not fixed-step scheduled
Combat liveness and exclusive terminal result remain unimplemented
Runtime RAF/listener/WebGL lifecycle remains unowned
Menu audio activation and lifecycle remain unimplemented
Full checkpoint capture and replay remain incomplete
```

## Completion boundary

Do not claim campaign pointer correctness because `screenToSource()` returns `inside`. Completion requires containment admission, inverse-compatible display projection, camera and gesture generations, typed command results and real-browser evidence.