# Project Breakdown: PhantomCommand SourceProfile Fixture Row Refresh

**Timestamp:** `2026-07-09T16-20-45-04-00`

## Goal

Compare the full accessible `LuminaryLabs-Publish` repo list against central `LuminaryLabs-Dev/LuminaryLabs` tracking, select one eligible repo, update root `.agent` docs, identify interaction loop/domains/services/kits, and log the result centrally.

## Checklist

```txt
[x] Listed accessible LuminaryLabs-Publish repositories.
[x] Excluded LuminaryLabs-Publish/TheCavalryOfRome.
[x] Compared checked repos against central LuminaryLabs-Dev/LuminaryLabs tracking.
[x] Selected one repo only: PhantomCommand.
[x] Read PhantomCommand .agent state.
[x] Read central PhantomCommand repo ledger.
[x] Read package.json, game.html, scripts/build-static.mjs, construct kit source, and smoke test.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified kit services.
[x] Identified implemented, inline, and target kits.
[x] Updated required root .agent docs.
[x] Added architecture, render, gameplay, source-profile, scenario-bootstrap, and deploy audits.
[x] Added timestamped tracker and turn ledger.
[x] Updated central repo ledger.
[x] Added central internal change-log entry.
[ ] Did not edit runtime source.
[ ] Did not run local/browser validation.
```

## Repo selected

```txt
LuminaryLabs-Publish/PhantomCommand
```

## Selection reason

No checked non-Cavalry repo was new, missing from the central ledger, missing sampled root `.agent`, or otherwise undocumented.

`PhantomCommand` was selected as the oldest eligible documented-selection fallback because its central ledger was at `2026-07-09T13-00-37-04-00` while the other checked non-Cavalry candidates had newer active tracker state or were not eligible.

## Publish repositories observed

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T15-56-42-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible fallback / central latest 2026-07-09T13-00-37-04-00 before this run
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T15-31-40-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T13-38-15-04-00
```

## Interaction loop

```txt
open index.html
  -> menu renders Phantom Command copy and route controls
  -> Start or Open Scene routes to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, HUD, materials, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 no-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates each piece by ring delay plus part delay
  -> keyboard and buttons mutate skip/restart/pan state
  -> mouse wheel mutates zoom target
  -> frame loop advances construct, camera, tower, command figure, HUD, and renderer
  -> window.GameHost.getState() reports legacy buildId, phase, progress, pieces, rings, ringParts, ringGaps, ringStartTimes, and animation constants
```

## Domains in use

```txt
static-route-shell
menu-route
scene-route
vite-static-build
three-cdn-runtime
browser-render-loop
inline-construct-profile
ring-descriptor-inline-math
piece-descriptor-inline-math
construct-timeline-inline-math
wedge-geometry-authoring
material-palette
lighting-and-fog
hud-projection
input-pan-control
camera-orbit-zoom-control
skip-restart-control
legacy-gamehost-diagnostics
construct-spiral-intro-kit
construct-spiral-schedule
construct-piece-state-machine
source-profile-parity-next
source-fingerprint-next
source-snapshot-next
profile-fixture-next
gamehost-sourceprofile-readback-next
build-fixture-gate-next
central-ledger-sync
```

## Services that kits offer

```txt
construct-spiral-intro-kit:
  create default intro timing config
  normalize and sort piece schedules
  compute piece ids
  install pieces
  reset sequence state
  update active/settled/pending states by dt
  expose active, pending, settled, ring-window, time, and estimated-total snapshots

game.html inline runtime:
  define live smooth-ring-handoff-v6 constants
  derive ring widths, gaps, part counts, and start times
  create wedge meshes and seam geometry
  animate radial/drop/rotation placement
  report HUD progress and phase
  process pan, zoom, skip, and restart input
  expose legacy window.GameHost state

build-static script:
  copy static route into dist
  currently does not gate build on source-profile parity fixture
```

## Kits

```txt
Implemented/source-backed:
  construct-spiral-intro-kit
  construct-spiral-schedule-kit
  construct-piece-id-kit
  construct-piece-state-kit
  construct-sequence-update-kit

Inline/legacy:
  legacy-inline-smooth-ring-handoff-profile
  legacy-inline-ring-descriptor-runtime
  legacy-inline-piece-descriptor-runtime
  legacy-inline-timeline-runtime
  legacy-inline-gamehost-diagnostics

Next-cut:
  phantom-command-smooth-handoff-profile-kit
  phantom-command-ring-descriptor-kit
  phantom-command-piece-descriptor-kit
  phantom-command-handoff-timeline-contract-kit
  phantom-command-source-profile-fingerprint-kit
  phantom-command-source-profile-snapshot-kit
  phantom-command-profile-parity-report-kit
  phantom-command-gamehost-source-diagnostics-kit
  phantom-command-sourceprofile-consumer-readback-kit
  phantom-command-sourceprofile-fixture-kit
  phantom-command-build-fixture-gate-kit
  central-ledger-readback-kit
```

## Main finding

`PhantomCommand` should not get scenario bootstrap, RTS gameplay, renderer replacement, or new visual work next. The stable construct proof is blocked by source-profile proof: `game.html` owns the live v6 profile, descriptors, timeline, and GameHost projection inline, while the existing construct kit is generic and does not prove live v6 parity.

## Next safe ledge

```txt
PhantomCommand SourceProfile Fixture Row Refresh + GameHost Consumer Readback Gate
```

## Files changed in repo-local .agent

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T16-20-45-04-00-sourceprofile-fixture-row-refresh-dsk-map.md
.agent/render-audit/2026-07-09T16-20-45-04-00-gamehost-sourceprofile-readback-contract.md
.agent/gameplay-audit/2026-07-09T16-20-45-04-00-construct-proof-blocker-loop.md
.agent/source-profile-audit/2026-07-09T16-20-45-04-00-live-v6-source-parity-contract.md
.agent/scenario-bootstrap-audit/2026-07-09T16-20-45-04-00-bootstrap-still-blocked.md
.agent/deploy-audit/2026-07-09T16-20-45-04-00-sourceprofile-fixture-build-wire-map.md
.agent/trackers/2026-07-09T16-20-45-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T16-20-45-04-00.md
```

## Validation

Docs-only pass. Runtime source was not changed, no local/browser/fixture validation was run, no branch or PR was created, and updates were pushed to `main`.
