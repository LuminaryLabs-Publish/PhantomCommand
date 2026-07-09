# PhantomCommand Architecture Audit — Construct Result Source Readiness DSK Map

**Timestamp:** `2026-07-08T22-58-02-04-00`

## Current architecture

```txt
index.html
  -> game.html
  -> inline Three.js scene/runtime
  -> inline smooth-ring-handoff-v6 source constants
  -> inline ring descriptors
  -> inline piece descriptors
  -> inline construct timeline
  -> inline HUD/GameHost projection
```

The only implemented source kit is generic:

```txt
src/kits/construct-spiral-intro-kit/index.js
  -> n:sequence:construct:spiral-intro
  -> generic schedule/install/reset/update/snapshot services
```

It should stay as a regression guard. It is not the live `smooth-ring-handoff-v6` source of truth yet.

## Domain breakdown

```txt
app-shell-domain
  -> index route
  -> game route
  -> Vite static build

render-host-domain
  -> canvas renderer
  -> camera
  -> scene/fog/lights
  -> material palette

construct-source-domain
  -> smooth-ring-handoff-v6 profile
  -> ring descriptors
  -> piece descriptors
  -> timeline contract
  -> source fingerprint
  -> source snapshot

construct-consumer-domain
  -> game.html sourceProfile consumer splice
  -> GameHost source diagnostics
  -> legacy GameHost compatibility

fixture-domain
  -> DOM-free source fixture rows
  -> fixture build gate
  -> central ledger pointer parity

construct-result-domain
  -> ConstructEventEnvelope
  -> ConstructEventResult
  -> duplicate completion guard
  -> scenario bootstrap blocker
```

## Current kits

```txt
construct-spiral-intro-kit
construct-spiral-intro-kit-smoke
```

## Next kits

```txt
phantom-command-smooth-handoff-profile-kit
phantom-command-ring-descriptor-kit
phantom-command-piece-descriptor-kit
phantom-command-handoff-timeline-contract-kit
phantom-command-source-profile-fingerprint-kit
phantom-command-source-profile-snapshot-kit
phantom-command-profile-parity-report-kit
phantom-command-gamehost-source-diagnostics-kit
phantom-command-source-profile-fixture-kit
phantom-command-gamehost-source-consumer-kit
phantom-command-fixture-build-integration-kit
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-result-kit
phantom-command-scenario-bootstrap-gate-kit
```

## Architecture decision

Do not extract render code or start RTS scenario bootstrap next. First create source-owned construct records and prove they reproduce the live inline `game.html` values. Then splice additive source diagnostics into `GameHost`. Only after that should ConstructEventResult and scenario bootstrap become executable authority.
