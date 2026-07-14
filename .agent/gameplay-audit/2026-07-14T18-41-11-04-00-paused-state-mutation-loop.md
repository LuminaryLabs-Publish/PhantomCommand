# Paused State Mutation Loop

**Timestamp:** `2026-07-14T18-41-11-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

`update()` returns while paused, but direct event handlers remain authoritative. The player can alter the next resumed campaign state without an explicit tactical-pause policy.

## Plan ledger

**Goal:** classify every state-changing action at the pause boundary.

- [x] Identify simulation actions gated by `update()`.
- [x] Identify direct actions outside `update()`.
- [ ] Define strict-pause defaults.
- [ ] Define a separate tactical-planning policy only if desired.
- [ ] Prove resume begins from one accepted state.

## Direct mutations accepted while paused

```txt
Space -> startWave() -> waveActive, spawn queue and message
click/double selection -> selected and selectedPad
pad activation -> build() -> souls, towers, pad ownership and effects
right click -> order() -> target and move
1/2/3 -> towerType
F -> camera position and targetZoom
wheel -> targetZoom and camera anchor
middle drag -> camera x/z
R -> document reload
Escape -> menu route
GameHost.startWave/build/setZoom -> direct public mutation
```

## Policy requirement

A strict pause should block campaign and camera mutations except resume and explicit route escape. A tactical-planning mode may allow selection, camera and orders, but it must be separately named, versioned and tested rather than inferred from missing guards.
