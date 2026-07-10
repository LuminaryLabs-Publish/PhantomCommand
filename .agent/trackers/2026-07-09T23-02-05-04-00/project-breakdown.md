# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-09T23-02-05-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/PhantomCommand`.

The public `LuminaryLabs-Publish` organization page showed 9 repositories. `LuminaryLabs-Publish/TheCavalryOfRome` was excluded by standing rule. No checked public non-Cavalry repo was new, absent from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`PhantomCommand` was selected by the documented fallback rule because its central ledger remained the oldest eligible checked non-Cavalry entry at `2026-07-09T18-41-55-04-00`.

## Public repo comparison

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T19-09-44-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T19-00-15-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T18-49-13-04-00
LuminaryLabs-Publish/PhantomCommand       selected / oldest eligible fallback / central latest 2026-07-09T18-41-55-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T22-50-53-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T19-29-23-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T22-40-25-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T19-21-19-04-00
```

## Current product surface

`PhantomCommand` is a static Vite / Three.js construct proof.

```txt
index.html menu
  -> game.html scene route
  -> inline Three.js smooth-ring-handoff-v6 construct runtime
```

The visible route is stable enough to preserve. The current bottleneck is proof that the live `smooth-ring-handoff-v6` profile, ring descriptors, piece descriptors, timing, and `GameHost` readback are source-owned and fixture-readable.

## Current interaction loop

```txt
open index.html
  -> menu renders Phantom Command copy and route controls
  -> Start button or Open Scene link navigates to game.html
  -> game.html imports Three.js from CDN
  -> inline runtime creates renderer, scene, fog, lights, camera, materials, HUD nodes, and input state
  -> inline constants define smooth-ring-handoff-v6
  -> inline ring math creates 10 no-gap construct rings
  -> inline ringParts() computes [5,5,5,5,6,8,10,12,16,20]
  -> inline wedge geometry creates 92 stone pieces
  -> construct(seq) animates each piece by ring delay plus part delay
  -> WASD/arrows pan the camera target
  -> mouse wheel updates zoom target
  -> Space/Skip jumps construct to completion
  -> R/Restart resets construct timing
  -> renderer renders the scene
  -> window.GameHost exposes skipConstruct(), restartConstruct(), and getState()
```

## Domains in use

```txt
static-route-shell
menu-route
scene-route
vite-static-build
three-cdn-runtime
browser-render-loop
inline-smooth-ring-handoff-profile
ring-descriptor-inline-math
piece-descriptor-inline-math
construct-timeline-inline-math
wedge-geometry-authoring
material-palette
lighting-and-fog
hud-projection
keyboard-pan-control
wheel-zoom-control
skip-restart-control
legacy-gamehost-diagnostics
construct-spiral-intro-kit
construct-spiral-schedule
construct-piece-state-machine
source-profile-parity-next
source-fingerprint-next
source-snapshot-next
gamehost-sourceprofile-readback-next
profile-fixture-next
build-fixture-gate-next
central-ledger-sync
```

## Kit services

```txt
construct-spiral-intro-kit:
  normalizes piece ids, derives generic spiral schedules, advances active/settled/pending state, enforces active windows, and emits generic construct snapshots.

game.html inline runtime:
  owns the live smooth-ring-handoff-v6 constants, derives rings/pieces/timing, creates meshes, animates construct state, mutates HUD, handles input, and exposes legacy GameHost state.

build-static script:
  copies index.html, game.html, docs, and config into dist without any source-profile fixture gate.
```

## Kits

Current explicit kits:

```txt
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

Current inline/runtime kits:

```txt
legacy-inline-smooth-ring-handoff-profile
legacy-inline-ring-descriptor-runtime
legacy-inline-piece-descriptor-runtime
legacy-inline-timeline-runtime
legacy-inline-hud-projection
legacy-inline-camera-input-runtime
legacy-inline-gamehost-diagnostics
```

Next-cut kits:

```txt
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

Do not begin next with scenario bootstrap, RTS gameplay, economy, camera changes, renderer extraction, or new visual work.

The durable blocker is source-profile consumer proof. `game.html` owns the live `smooth-ring-handoff-v6` constants and descriptor math inline. The existing `construct-spiral-intro-kit` is useful generic scheduling, but it does not prove live v6 profile parity.

## Next safe ledge

```txt
PhantomCommand SourceProfile Consumer Refresh + GameHost Fixture Gate
```

Source-own the live profile, ring descriptors, piece descriptors, timeline descriptors, fingerprint, snapshot, parity report, additive `GameHost.getState().sourceProfile`, DOM-free fixture rows, and build fixture gate while preserving the current visible route and legacy GameHost fields.

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm run build: not run
construct smoke: not run
source-profile fixture: not run because it does not exist yet
browser smoke: not run
pushed to main: yes, documentation only
```
