# PhantomCommand Committed-Frame Render Consumption Gap

**Timestamp:** `2026-07-10T23-40-35-04-00`

## Current render flow

```txt
live campaign state
  -> drawWorld()
  -> drawEntity()
  -> drawSanctum()
  -> drawUI()
  -> drawMinimap()
  -> source canvas
  -> crt.render(performance time, settings)
  -> texSubImage2D upload
  -> WebGL drawArrays
```

The route renders from the same mutable objects used by input callbacks and fixed-step simulation. No immutable frame object separates simulation commit from presentation consumption.

## Verified gaps

```txt
- no simulation tick ID is published
- no committed presentation frame ID exists
- no state fingerprint is attached to a frame
- render() returns no result
- drawWorld, drawUI, drawMinimap, and modal rendering expose no consumption row
- CRT upload and draw have no source-frame identity
- GameHost getState() is an independent aggregate clone, not the exact rendered frame
- browser performance time is passed to CRT but is not correlated with a simulation commit
- multiple fixed simulation steps may occur before one visual frame without an explicit commit record
- zero simulation steps may occur before a visual frame without an explicit repeated-frame record
```

## Failure modes

```txt
input mutates selection before render but after the last fixed tick
  -> visual state changes without a simulation commit

several fixed ticks run in one browser frame
  -> only the final mutable state is visible
  -> intermediate accepted commands and events have no render proof

GameHost getState() is called between mutation and render
  -> diagnostic state may not match the next displayed frame

CRT upload succeeds or fails
  -> no structured result identifies the source frame consumed
```

## Required committed frame

```txt
CommittedCampaignFrame
  sessionId
  tickId
  frameId
  previousFrameId
  lastAppliedSequence
  stateFingerprint
  campaign
    souls
    core
    wave
    waveActive
    won
    lost
    message
  selection
  pads
  towers
  units
  projectiles
  effects
  cameraProjection
  renderPolicy
```

The exact payload may use compact projections, but it must be immutable and clone-safe.

## Required consumption rows

```txt
world-render consumed frameId
entity-render consumed frameId
hud-render consumed frameId
minimap-render consumed frameId
modal-render consumed frameId
crt-upload consumed frameId
crt-draw consumed frameId
gamehost-readback exposed frameId
```

Each row should record:

```txt
consumer
frameId
tickId
stateFingerprint
sequence
status
reason
```

## Kit boundary

```txt
phantom-command-committed-frame-kit
phantom-command-world-render-consumer-kit
phantom-command-hud-render-consumer-kit
phantom-command-minimap-render-consumer-kit
phantom-command-modal-render-consumer-kit
phantom-command-crt-upload-result-kit
phantom-command-render-consumption-kit
phantom-command-gamehost-frame-readback-kit
```

## Compatibility rule

Preserve the current `640 x 360` source canvas, pixel-art composition, camera behavior, CRT shaders, HUD, minimap, and modal presentation. This boundary adds proof and ownership; it does not require a renderer rewrite.

## Acceptance proof

```txt
- every browser render references one committed frame
- all consumers in one render pass reference the same frame ID and fingerprint
- repeated visual frames are explicitly identified
- multiple fixed steps before a visual frame preserve command and event history
- GameHost frame readback matches the rendered committed frame
- rejected commands cannot alter the committed frame fingerprint
```
