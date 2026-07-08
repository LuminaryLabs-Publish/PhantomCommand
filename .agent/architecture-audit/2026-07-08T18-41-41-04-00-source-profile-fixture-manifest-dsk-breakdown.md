# Architecture Audit: Source Profile Fixture Manifest DSK Breakdown

**Timestamp:** `2026-07-08T18-41-41-04-00`

## Current architecture

```txt
index.html
  -> menu shell
  -> game.html
     -> inline Three.js import
     -> inline source constants
     -> inline ring descriptor math
     -> inline piece descriptor math
     -> inline construct animation
     -> inline HUD mutation
     -> inline GameHost projection
```

## Current issue

`game.html` is both the render host and the source authority. This makes the construct visually correct but not fixture-readable as a reusable domain/kit boundary.

## DSK/domain map

```txt
phantom-command-source-profile-domain
  -> phantom-command-smooth-handoff-profile-kit
  -> phantom-command-source-profile-normalizer-kit
  -> phantom-command-source-profile-fingerprint-kit
  -> phantom-command-source-profile-snapshot-kit

phantom-command-construct-descriptor-domain
  -> phantom-command-ring-descriptor-kit
  -> phantom-command-piece-descriptor-kit
  -> phantom-command-handoff-timeline-contract-kit

phantom-command-fixture-domain
  -> phantom-command-profile-parity-report-kit
  -> phantom-command-source-profile-fixture-kit
  -> phantom-command-central-ledger-readback-kit

phantom-command-host-consumer-domain
  -> phantom-command-gamehost-source-diagnostics-kit
  -> phantom-command-gamehost-source-consumer-kit
  -> legacy-gamehost-compatibility-adapter

phantom-command-deferred-scenario-domain
  -> phantom-command-construct-event-envelope-kit
  -> phantom-command-construct-event-result-kit
  -> phantom-command-scenario-bootstrap-gate-kit
  -> phantom-command-scenario-bootstrap-blocker-kit
```

## Current source-backed kits

```txt
construct-spiral-intro-kit
  domainPath: n:sequence:construct:spiral-intro
  status: implemented generic scheduling kit
  provides: piece ids, schedules, install/reset/update/snapshot, active/pending/settled queries

construct-spiral-intro-kit-smoke
  status: implemented smoke/regression guard
  provides: generic kit validation only
```

## Not source-backed yet

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
phantom-command-central-ledger-readback-kit
```

## Service contract to implement next

```txt
load profile
  -> normalize profile
  -> derive rings
  -> derive pieces
  -> derive timeline
  -> fingerprint profile
  -> snapshot profile
  -> parity report
  -> GameHost source diagnostics
  -> DOM-free fixture rows
  -> central ledger pointer readback
```

## Acceptance line

Stop when the source-profile fixture can prove the live `game.html` values without importing DOM, canvas, Three.js, HUD, or browser timing.
