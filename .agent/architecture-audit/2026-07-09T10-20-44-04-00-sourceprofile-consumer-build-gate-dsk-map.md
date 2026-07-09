# Architecture Audit: SourceProfile Consumer Build Gate DSK Map

**Timestamp:** `2026-07-09T10-20-44-04-00`

## Current boundary

`PhantomCommand` is architecturally split between a thin menu route and a monolithic live construct route.

```txt
index.html
  -> game.html
  -> inline Three.js render host
  -> inline smooth-ring-handoff-v6 source constants
  -> inline ring and piece descriptors
  -> inline animation/HUD/input/GameHost projection
```

## DSK/domain map

```txt
phantom-command-app-domain
├─ static-app-shell
│  ├─ index-menu-route-kit
│  └─ game-route-link-kit
├─ static-game-route
│  ├─ three-render-host-kit [inline]
│  ├─ hud-diagnostics-kit [inline]
│  ├─ camera-navigation-kit [inline]
│  └─ gamehost-construct-diagnostics-kit [inline]
├─ construct-source-domain
│  ├─ smooth-ring-handoff-v6-profile-kit [needed]
│  ├─ ring-descriptor-kit [needed]
│  ├─ piece-descriptor-kit [needed]
│  ├─ handoff-timeline-contract-kit [needed]
│  ├─ source-profile-fingerprint-kit [needed]
│  ├─ source-profile-snapshot-kit [needed]
│  └─ profile-parity-report-kit [needed]
├─ generic-construct-sequence-domain
│  └─ construct-spiral-intro-kit [implemented]
├─ source-consumer-domain
│  ├─ gamehost-source-diagnostics-kit [needed]
│  ├─ gamehost-source-consumer-kit [needed]
│  ├─ legacy-gamehost-compatibility-kit [needed]
│  └─ dom-free-source-profile-fixture-kit [needed]
├─ deploy-proof-domain
│  ├─ fixture-build-integration-kit [needed]
│  └─ pages-static-artifact-copy [existing build path]
└─ scenario-bootstrap-domain [deferred]
   ├─ construct-event-envelope-kit [needed later]
   ├─ construct-event-result-kit [needed later]
   └─ scenario-bootstrap-gate-kit [blocked]
```

## Implemented kit read

`construct-spiral-intro-kit` is a reusable sequence kit with a clean service surface: piece id creation, schedule generation, install/reset/update/snapshot, schedule readback, active/settled/pending queries, newly-active/newly-settled queries, and per-piece progress/status.

It is useful as a regression guard, but it is not yet the live `smooth-ring-handoff-v6` authority because `game.html` computes the current 10 rings and 92 pieces inline.

## Architectural blocker

The next cut should not start by moving renderer code.

It should start by extracting the live construct profile into source-owned descriptors and proving parity with the current browser route. Once the fixture proves the source profile, `game.html` can consume diagnostics additively without changing the visible construct.

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Build Gate + GameHost Readback Fixture
```
