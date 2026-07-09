# PhantomCommand SourceProfile Ledger Repair DSK Map

**Timestamp:** `2026-07-09T13-00-37-04-00`

## Architecture read

`PhantomCommand` is currently a static page application where the live construct authority sits inside `game.html`, while a reusable `construct-spiral-intro-kit` exists as a related but not authoritative scheduling helper.

## Current route graph

```txt
index.html
  -> menu route
  -> game.html
  -> Three.js CDN
  -> inline smooth-ring-handoff-v6 runtime
  -> window.GameHost
```

## Current domain tree

```txt
phantom-command
├─ static-route-shell
│  ├─ index-menu-route
│  └─ game-scene-route
├─ browser-runtime
│  ├─ three-cdn-runtime
│  ├─ renderer-loop
│  ├─ resize-loop
│  └─ legacy-gamehost-diagnostics
├─ construct-domain
│  ├─ live-profile-inline-constants
│  ├─ ring-descriptor-inline-math
│  ├─ piece-descriptor-inline-math
│  ├─ wedge-geometry-authoring
│  ├─ handoff-timeline-inline-math
│  └─ construct-animation-driver
├─ presentation-domain
│  ├─ material-palette
│  ├─ lighting-and-fog
│  ├─ camera-orbit-zoom
│  ├─ HUD-progress-projection
│  └─ scene-decoration
├─ control-domain
│  ├─ keyboard-pan
│  ├─ mouse-wheel-zoom
│  ├─ skip-control
│  └─ restart-control
├─ implemented-kit-domain
│  └─ construct-spiral-intro-kit
└─ next-source-profile-domain
   ├─ smooth-handoff-profile-kit
   ├─ ring-descriptor-kit
   ├─ piece-descriptor-kit
   ├─ handoff-timeline-contract-kit
   ├─ source-profile-fingerprint-kit
   ├─ source-profile-snapshot-kit
   ├─ profile-parity-report-kit
   ├─ gamehost-source-diagnostics-kit
   ├─ sourceprofile-fixture-kit
   └─ build-fixture-gate-kit
```

## Services mapped

```txt
static-route-shell:
  serve menu and game pages

browser-runtime:
  import Three.js
  own render frame loop
  expose window.GameHost

construct-domain:
  define live constants
  derive ring widths/gaps/counts
  derive pieces and delays
  animate construct into final placement

presentation-domain:
  render fog/lights/materials/HUD/camera

control-domain:
  pan/zoom/skip/restart

construct-spiral-intro-kit:
  generic schedule/state helper for construct pieces
  not the current smooth-ring-handoff-v6 live authority

next-source-profile-domain:
  source-own the exact live profile
  fixture-prove parity
  expose additive diagnostics
  block scenario/bootstrap work until parity passes
```

## Boundary decision

The next kit cut should not be a renderer extraction. It should be a source-profile authority slice that creates serializable profile, ring, piece, timeline, fingerprint, snapshot, parity, and GameHost diagnostic records without changing the visual behavior.
