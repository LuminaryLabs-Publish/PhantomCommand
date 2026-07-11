# Action, Replay, and Frame Fixture Gate

**Timestamp:** `2026-07-11T03-31-26-04-00`

## Current validation boundary

The existing checks are source-pattern checks and static artifact checks. They cannot prove command result semantics, fixed-step admission, replay determinism, committed-frame coherence, or GameHost parity.

## Required fixture files

```txt
tests/phantom-command-action-result-fixture.mjs
tests/phantom-command-fixed-step-replay-fixture.mjs
tests/phantom-command-frame-consumption-fixture.mjs
```

## Action-result fixture matrix

```txt
start-wave:
  accepted first wave
  rejected active wave
  rejected terminal state
  rejected after final wave

build:
  accepted valid pad and sufficient souls
  rejected missing pad
  rejected occupied pad
  rejected insufficient souls
  rejected unknown tower type
  duplicate command ID remains idempotent

order:
  accepted move order
  accepted attack order
  rejected no selection
  rejected invalid point

selection:
  single select
  additive select
  toggle select
  rectangle select
  pad select
  explicit build remains separate
```

## Replay fixture

Use an injected clock and pure session constructor. Run the same initial state and command list under different synthetic RAF chunking:

```txt
60 frames x 1/60
30 frames x 1/30
mixed clamped frame intervals
multiple commands before one target tick
```

All runs must produce identical command results, event rows, tick fingerprints, and final state fingerprints.

## Frame-consumption fixture

Prove one committed frame contains:

```txt
frameId
simulation tick range
applied command sequences
state fingerprint
world/HUD/minimap/modal consumer fingerprints
CRT acknowledgement
```

A failed consumer or CRT acknowledgement must produce a frame-failure row and preserve the previous committed frame.

## Package and workflow integration

Only after the fixtures pass independently:

```txt
add fixture scripts to package.json
include them in npm run check
run npm run check before npm run build
keep Pages artifact validation after the behavioral fixtures
```

## No claim in this pass

No runtime, replay, frame, browser, build, or deployment validation was performed because these fixture surfaces do not yet exist.