# PhantomCommand Construct Source Authority Fixture Gate

**Timestamp:** `2026-07-08T04:40:21-04:00`

## Goal

Capture the exact source-authority seam that should be cut before adding more RTS gameplay or renderer restructuring.

## Current live authority

`game.html` currently owns the live construct source directly:

```txt
BUILD_ID sequential-ring-v5
RING_COUNT 10
FIRST_INNER_RADIUS 10
FIRST_RING_WIDTH 7
RING_WIDTH_GROWTH 1.25
MAX_RING_WIDTH 120
RING_GAP_BASE 0
RING_GAP_GROWTH 0
MOVE_SECONDS 2.0
DROP_START_SECONDS .08
RING_STAGGER 3.25
PART_STAGGER .035
PREWARM_SECONDS .55
START_RADIUS_MULTIPLIER 1.45
START_HEIGHT_BASE 28
```

The same file also owns:

```txt
ringParts(inner, outer)
wedge(inner, outer, span, height)
makePiece(ring, idx, inner, outer, span, angle)
construct(seq)
skip()
restart()
updatePan(dt)
frame(ms)
window.GameHost.getState()
```

## Required source-authority split

```txt
phantom-command-source-construct-profile-kit
  -> owns constants and normalized values
  -> emits profile id, version, and source hash

phantom-command-ring-descriptor-kit
  -> derives inner radius, outer radius, gap, width, and parts per ring
  -> proves zero physical gaps

phantom-command-piece-descriptor-kit
  -> derives ring index, part index, angle, span, seed, final position, and start policy inputs
  -> proves 92 total pieces

phantom-command-inner-first-timeline-contract-kit
  -> derives move seconds, drop start, ring stagger, part stagger, and total build time
  -> proves every ring has positive completion margin before the next outer ring begins

phantom-command-construct-result-kit
  -> accepts construct_complete exactly once
  -> rejects duplicate completion with duplicate_construct_complete

phantom-command-scenario-bootstrap-gate-kit
  -> rejects bootstrap before construct completion with construct_incomplete
  -> accepts scenario_001_raise_the_host after construct completion
  -> rejects duplicate bootstrap with duplicate_scenario_bootstrap
```

## Descriptor parity target

```txt
buildId: sequential-ring-v5
ringCount: 10
ringGaps: [0,0,0,0,0,0,0,0,0,0]
ringParts: [5,5,5,5,6,8,10,12,16,20]
totalPieces: 92
totalBuildSeconds: 31.915
legacyHostSurface: skipConstruct, restartConstruct, getState
```

## Renderer handoff target

Renderer code should eventually consume descriptors only:

```txt
constructProfile
ringDescriptors
pieceDescriptors
timingDescriptors
constructSnapshot
scenarioBootstrapSnapshot
```

Renderer code should not own:

```txt
profile constants
ring count policy
ring width growth policy
gap policy
piece count policy
piece id policy
completion idempotency
bootstrap acceptance rules
journal shape
snapshot shape
```

## Fixture matrix

```txt
profile-normalization.fixture.mjs
  -> accepts valid sequential-ring-v5 profile
  -> fills defaults
  -> rejects non-finite numeric values

ring-descriptor-parity.fixture.mjs
  -> proves 10 rings
  -> proves zero gaps
  -> proves part counts [5,5,5,5,6,8,10,12,16,20]

piece-descriptor-parity.fixture.mjs
  -> proves 92 pieces
  -> proves deterministic ids
  -> proves deterministic seed inputs

inner-first-timeline.fixture.mjs
  -> proves ring n completes before ring n+1 begins
  -> proves totalBuildSeconds 31.915

construct-result.fixture.mjs
  -> accepts first construct_complete
  -> rejects duplicate construct_complete

scenario-bootstrap.fixture.mjs
  -> rejects early bootstrap
  -> accepts scenario_001_raise_the_host after completion
  -> rejects duplicate bootstrap

snapshot-shape.fixture.mjs
  -> proves ConstructSnapshot serializes
  -> proves ScenarioBootstrapSnapshot serializes
  -> proves no DOM, Canvas, WebGL, or Three.js object leaks into snapshots
```

## Stop condition for next implementation cut

```txt
- Public route still opens index.html -> game.html.
- Live visual remains sequential-ring-v5.
- GameHost skipConstruct/restartConstruct/getState still work.
- DOM-free fixtures prove profile, rings, pieces, timeline, completion idempotency, bootstrap gating, and snapshots.
- No RTS gameplay expansion happens before this gate is complete.
```
