# Paused and Terminal Overlay State Correlation Gap

**Timestamp:** `2026-07-11T07-38-25-04-00`

## Summary

The pause/win/loss overlay is presentation derived from mutable Boolean flags. It does not prove that the underlying input and gameplay state is frozen, and direct callbacks can change the world beneath the overlay before the next render.

## Plan ledger

**Goal:** require the world, HUD, minimap, modal overlay and CRT draw to consume one committed phase/state identity.

- [x] Trace render ordering.
- [x] Trace mutations that remain possible while overlays are active.
- [x] Define one committed render input.
- [x] Define per-surface consumption rows.
- [ ] Implement render-frame correlation.
- [ ] Add browser proof.

## Current render order

```txt
render()
  -> drawWorld()
  -> drawUI()
       -> HUD
       -> minimap
       -> pause/win/loss overlay
  -> crt.render(performance time, settings)
```

The same live mutable `state` and `camera` are read throughout. There is no immutable frame descriptor, phase sequence, simulation tick, state fingerprint or per-surface acknowledgement.

## Correlation defect

```txt
PAUSED overlay visible
  -> pointerup calls selectAt()
  -> double-click path can call build()
  -> pointerdown right-click calls order()
  -> Space calls startWave()
  -> camera continues to move in frame()
  -> next render shows mutated HUD/world beneath PAUSED
```

The same issue applies to `won` and `lost`: simulation updates stop, but input callbacks can still alter selection, orders, tower construction and camera state.

## Required committed frame

```txt
CampaignRenderFrame {
  frameId,
  sessionId,
  runId,
  phase,
  phaseSequence,
  simulationTick,
  appliedCommandSequence,
  stateFingerprint,
  cameraFingerprint,
  worldProjection,
  hudProjection,
  minimapProjection,
  overlayProjection
}
```

## Required consumption proof

```txt
world consumed frameId
HUD consumed frameId
minimap consumed frameId
overlay consumed frameId and phaseSequence
CRT uploaded the source canvas for frameId
CRT draw completed for frameId
```

A paused or terminal frame is valid only when the overlay phase and underlying authoritative state fingerprint came from the same committed descriptor.

## Render-specific candidate kits

```txt
phantom-command-phase-frame-correlation-kit
phantom-command-render-frame-descriptor-kit
phantom-command-world-consumption-result-kit
phantom-command-hud-consumption-result-kit
phantom-command-minimap-consumption-result-kit
phantom-command-overlay-consumption-result-kit
phantom-command-crt-upload-ack-kit
phantom-command-phase-frame-fixture-kit
```

## Validation matrix

```txt
pause command commits phase sequence N
  -> no gameplay mutation after N until resume
  -> first paused frame acknowledges N

terminal transition commits phase sequence N
  -> no gameplay mutation after N
  -> terminal overlay acknowledges N

rejected paused/terminal command
  -> state fingerprint unchanged
  -> optional rejection feedback can render under a later frame ID
```