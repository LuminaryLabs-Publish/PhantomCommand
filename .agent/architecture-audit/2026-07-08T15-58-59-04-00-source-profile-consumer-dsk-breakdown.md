# PhantomCommand Source Profile Consumer DSK Breakdown

**Timestamp:** `2026-07-08T15-58-59-04-00`

## Goal

Define the source-profile domain split for moving `smooth-ring-handoff-v6` authority out of inline `game.html` and consuming it additively without changing the visible construct proof.

## Current architecture

```txt
index.html
  -> menu route
  -> game.html
      -> Three.js CDN import
      -> inline profile constants
      -> inline descriptor math
      -> inline geometry/material/render setup
      -> inline animation loop
      -> inline HUD mutation
      -> inline GameHost diagnostics
```

## Target architecture

```txt
profile kit
  -> owns source constants and normalization
ring descriptor kit
  -> derives ring descriptors from normalized profile
piece descriptor kit
  -> derives 92 serializable piece descriptors
timeline contract kit
  -> derives ringStartTimes, piece delays, settle windows, and total build seconds
fingerprint kit
  -> creates stable source profile fingerprint
snapshot kit
  -> emits serializable source snapshot
parity report kit
  -> reports live parity rows and errors
GameHost diagnostics kit
  -> creates additive sourceProfile diagnostics
game.html
  -> keeps current visual runtime and legacy GameHost fields
```

## Domain breakdown

```txt
n:phantom-command:route
n:phantom-command:construct:profile
n:phantom-command:construct:rings
n:phantom-command:construct:pieces
n:phantom-command:construct:timeline
n:phantom-command:construct:source-proof
n:phantom-command:host:diagnostics
n:phantom-command:fixtures:source-profile
n:phantom-command:construct:result
n:phantom-command:scenario-bootstrap
```

## Current kit services

```txt
construct-spiral-intro-kit
  -> create generic construct piece ids
  -> create generic schedules
  -> install pieces
  -> reset state
  -> update progress
  -> emit snapshots
  -> list active, pending, settled, newly active, and newly settled pieces
  -> read per-piece progress and status
```

## Next-cut services

```txt
phantom-command-smooth-handoff-profile-kit
  -> create default v6 profile
  -> normalize profile values
  -> expose required constants

phantom-command-ring-descriptor-kit
  -> derive no-gap ring descriptors
  -> derive live part counts

phantom-command-piece-descriptor-kit
  -> derive deterministic piece ids
  -> derive ring, part, angle, and pose descriptors without Three.js

phantom-command-handoff-timeline-contract-kit
  -> derive ringStartTimes
  -> derive piece delays
  -> derive totalBuildSeconds

phantom-command-source-profile-fingerprint-kit
  -> stable stringify source profile payload
  -> emit deterministic fingerprint

phantom-command-source-profile-snapshot-kit
  -> emit serializable profile, ring, piece, and timeline snapshot

phantom-command-profile-parity-report-kit
  -> produce pass/fail rows
  -> report expected and observed values

phantom-command-gamehost-source-diagnostics-kit
  -> project sourceProfile diagnostics
  -> preserve legacy getState fields

phantom-command-source-profile-fixture-kit
  -> run DOM-free fixture rows
  -> prove source profile parity before game.html consumption
```

## Consumer splice boundary

```txt
build id smooth-ring-handoff-v6
ring count 10
gap policy zero
ring parts [5,5,5,5,6,8,10,12,16,20]
piece count 92
total build seconds 19.923
ringHandoff 0.72
partStagger 0.025
source fingerprint stable
source snapshot serializable
GameHost additive diagnostics keep legacy fields
```

## Deferred domains

```txt
ConstructEventEnvelope
ConstructEventResult
ConstructEventJournal
ConstructSnapshot
ScenarioBootstrapCommand
ScenarioBootstrapResult
ScenarioBootstrapSnapshot
unit selection
roster runtime
economy loop
wave/objective loops
```

## Main finding

The DSK split should be publish-local and proof-first. Do not move these kits to NexusEngine or ProtoKits until the PhantomCommand route has stable local source-profile fixtures and a safe additive GameHost consumer splice.
