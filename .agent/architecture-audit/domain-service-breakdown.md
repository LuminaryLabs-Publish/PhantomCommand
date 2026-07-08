# PhantomCommand Architecture Audit

**Timestamp:** `2026-07-08T02:50:33-04:00`

## Current architecture

```txt
PhantomCommand
├─ static app shell
│  ├─ index.html
│  │  ├─ menu presentation
│  │  ├─ Start button
│  │  └─ Open Scene link
│  └─ game.html
│     ├─ Three.js CDN import
│     ├─ renderer setup
│     ├─ scene, fog, lights, camera
│     ├─ HUD DOM
│     ├─ input listeners
│     ├─ sequential-ring-v5 constants
│     ├─ ring descriptor math
│     ├─ piece descriptor math
│     ├─ wedge geometry generation
│     ├─ construct animation
│     ├─ progress/phase mutation
│     └─ window.GameHost compatibility surface
├─ source kit island
│  └─ src/kits/construct-spiral-intro-kit/index.js
│     ├─ generic spiral construct piece ids
│     ├─ generic spiral/window schedule
│     ├─ install/reset/update/snapshot
│     └─ pending/active/settled piece queries
├─ smoke proof
│  └─ tests/construct-spiral-intro-kit-smoke.mjs
│     ├─ id/domain assertions
│     ├─ schedule ordering assertion
│     ├─ active count cap assertion
│     ├─ active ring window assertion
│     └─ completion assertion
└─ static build
   └─ scripts/build-static.mjs
      └─ copy index.html, game.html, docs, config into dist
```

## Target architecture

```txt
PhantomCommand
├─ app-shell-domain
│  ├─ menu-route-kit
│  ├─ game-route-kit
│  └─ static-build-surface
├─ construct-source-domain
│  ├─ sequential-ring-v5-profile-kit
│  ├─ profile-normalization-kit
│  ├─ profile-fingerprint-kit
│  ├─ profile-snapshot-kit
│  ├─ ring-descriptor-kit
│  ├─ piece-descriptor-kit
│  ├─ piece-delay-policy-kit
│  ├─ piece-settle-policy-kit
│  ├─ inner-first-timeline-contract-kit
│  └─ profile-parity-report-kit
├─ construct-result-domain
│  ├─ construct-event-envelope-kit
│  ├─ construct-event-result-kit
│  ├─ construct-event-reducer-kit
│  ├─ construct-completion-idempotency-kit
│  ├─ construct-event-journal-kit
│  └─ construct-snapshot-contract-kit
├─ scenario-bootstrap-domain
│  ├─ scenario-bootstrap-command-kit
│  ├─ scenario-bootstrap-preflight-kit
│  ├─ scenario-bootstrap-result-kit
│  ├─ scenario-bootstrap-gate-kit
│  ├─ scenario-bootstrap-journal-kit
│  └─ scenario-bootstrap-snapshot-kit
├─ render-handoff-domain
│  ├─ construct-render-descriptor-consumer
│  ├─ wedge-geometry-view-adapter
│  ├─ stone-material-view-adapter
│  ├─ construct-animation-view-adapter
│  └─ hud-diagnostics-view-adapter
├─ compatibility-domain
│  └─ gamehost-construct-diagnostics-kit
└─ fixture-domain
   ├─ fixture-script-runner-kit
   ├─ profile-parity-smoke
   ├─ ring-descriptor-smoke
   ├─ piece-descriptor-smoke
   ├─ inner-first-timeline-smoke
   ├─ construct-result-smoke
   ├─ scenario-bootstrap-gate-smoke
   └─ legacy-gamehost-compatibility-smoke
```

## Domain rule

A kit should own a small contract and no browser side effects unless it is explicitly a view adapter.

Data-first kits should not import Three.js, DOM APIs, Canvas APIs, browser input, or the frame loop.

`game.html` can remain a view host, but it should consume source/profile descriptors rather than own source math.

## Service ownership map

| Service | Current owner | Target owner |
| --- | --- | --- |
| menu routing | `index.html` | app-shell-domain |
| static build copy | `scripts/build-static.mjs` | static-build-surface |
| sequential-ring-v5 constants | `game.html` | sequential-ring-v5-profile-kit |
| profile normalization | `game.html` implicit constants | profile-normalization-kit |
| source fingerprint | missing | profile-fingerprint-kit |
| source snapshot | missing | profile-snapshot-kit |
| ring descriptors | `game.html` inline | ring-descriptor-kit |
| piece descriptors | `game.html` inline | piece-descriptor-kit |
| delays / settle windows | `game.html` inline | piece-delay/settle policy kits |
| transition margins | missing | inner-first-timeline-contract-kit |
| construct event result | missing | construct-result-domain |
| scenario bootstrap gate | missing | scenario-bootstrap-domain |
| GameHost diagnostics | `game.html` minimal | compatibility-domain |
| fixture replay | generic smoke only | fixture-domain |

## Architecture conclusion

The repo already has the right direction: a small app shell, a construct proof, and a first source kit.

The gap is authority. The live construct still trusts inline `game.html` math more than composable domain kits. The next pass should move authority to descriptor-producing kits while leaving render output visually identical.
