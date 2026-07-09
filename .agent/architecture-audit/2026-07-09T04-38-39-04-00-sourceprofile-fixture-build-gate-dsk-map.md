# PhantomCommand Architecture Audit: SourceProfile Fixture Build Gate DSK Map

**Timestamp:** `2026-07-09T04-38-39-04-00`

## Architectural read

`PhantomCommand` is currently a strong visual proof with weak source separation. `game.html` owns source constants, ring/piece descriptor derivation, timeline math, geometry creation, animation, HUD projection, input handling, and GameHost readback inline.

The next architecture cut should add pure source-profile DSKs and fixture rows before changing the visible construct.

## Domain / DSK map

```txt
phantom-command-static-app
├─ static-app-shell
│  ├─ index-route-kit
│  ├─ menu-copy-kit
│  └─ game-route-link-kit
├─ static-game-route
│  ├─ three-cdn-loader-kit
│  ├─ webgl-render-host-kit
│  ├─ scene-fog-lighting-kit
│  ├─ stone-material-palette-kit
│  ├─ camera-navigation-kit
│  ├─ keyboard-pan-input-kit
│  ├─ wheel-zoom-input-kit
│  ├─ button-input-kit
│  └─ hud-diagnostics-kit
├─ construct-source-authority
│  ├─ smooth-ring-handoff-v6-profile-kit
│  ├─ construct-profile-normalization-kit
│  ├─ ring-descriptor-generation-kit
│  ├─ piece-descriptor-generation-kit
│  ├─ handoff-timeline-contract-kit
│  ├─ construct-source-fingerprint-kit
│  ├─ construct-source-snapshot-kit
│  └─ profile-parity-report-kit
├─ gamehost-consumer-authority
│  ├─ legacy-gamehost-compatibility-kit
│  ├─ source-profile-diagnostics-kit
│  └─ browser-consumer-readback-kit
├─ fixture-domain
│  ├─ source-profile-fixture-kit
│  ├─ legacy-gamehost-shape-fixture-kit
│  ├─ central-ledger-readback-kit
│  └─ fixture-build-integration-kit
└─ deferred-rts-domain
   ├─ construct-event-envelope-kit
   ├─ construct-event-result-kit
   ├─ scenario-bootstrap-gate-kit
   └─ scenario-bootstrap-blocker-kit
```

## Implemented kits

```txt
construct-spiral-intro-kit
  -> generic piece id, schedule, install, reset, update, snapshot, pending/active/settled/newly-active/newly-settled, progress/status helpers

construct-spiral-intro-kit-smoke
  -> generic regression proof for install, schedule order, active ring window, and full-settled state
```

## Next-cut kits

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
phantom-command-central-ledger-readback-kit
phantom-command-fixture-build-integration-kit
phantom-command-construct-event-envelope-kit
phantom-command-construct-event-result-kit
phantom-command-scenario-bootstrap-gate-kit
phantom-command-scenario-bootstrap-blocker-kit
```

## Architecture verdict

The next meaningful implementation is a source-profile fixture/build gate and legacy GameHost consumer readback. Renderer extraction, scenario bootstrap, and RTS mechanics remain blocked until the live profile is reproducible outside the browser route.
