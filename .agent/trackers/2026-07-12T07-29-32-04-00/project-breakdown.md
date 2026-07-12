# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-12T07-29-32-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Scope:** documentation only

## Summary

This run selects `PhantomCommand` as the oldest stable eligible Publish repository after reconciling central-ledger and repo-local timestamps. The audit isolates the menu Web Audio lifecycle: the first admitted pointer or keyboard event creates and starts a context graph, but the runtime never observes context state, resumes a suspended/interrupted context, owns context generations, cancels delayed close work, or retires audio during visibility loss, navigation, pagehide, or module disposal.

## Plan ledger

**Goal:** define one user-activation and audio-lifecycle authority so ambience and UI tones are created, resumed, suspended, replaced, stopped and disposed through revisioned transactions with typed results and browser proof.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm the nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Reconcile repo-local timestamps and avoid `IntoTheMeadow`, which advanced after its central ledger timestamp.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand`.
- [x] Inspect menu settings, audio creation, UI tones, ambience toggling, input events, transition timing and recursive RAF ownership.
- [x] Identify the complete interaction loop, all active domains, all 20 implemented kits and their services.
- [x] Define context-state, activation, generation, resume, stop, teardown, observation and fixture contracts.
- [x] Refresh required root `.agent` files and add a new timestamped audit family.
- [x] Write only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable audio lifecycle fixtures remain future work.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/PhantomCommand
selection basis: oldest stable eligible repo-local/central timestamp
prior selected timestamp: 2026-07-12T05-49-04-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu module evaluation
  -> create 480x270 source canvas
  -> create graveyard art and CRT renderer
  -> read CRT, grain and ambience settings
  -> scan three save keys
  -> create menu state with audio = null
  -> install pointer and keyboard listeners
  -> start recursive menu RAF
  -> publish window.PhantomMenu

first document keydown or display-canvas pointerdown
  -> call ensureAudio() before action classification
  -> if ambience is enabled and state.audio is null:
       construct AudioContext
       construct master gain
       construct and start drone oscillator
       construct and start looping wind buffer source
       store { context, master, drone, wind }
  -> perform menu action

UI interaction
  -> playUiTone()
  -> ensureAudio()
  -> create one oscillator and gain
  -> schedule oscillator stop

ambience off
  -> set settings.ambience = false
  -> stopAmbience()
  -> clear state.audio immediately
  -> fade old master
  -> schedule context.close() after 300 ms

ambience on
  -> ensureAudio()
  -> create a new graph immediately
  -> previous delayed close remains untracked

Begin or Continue
  -> play transition tone
  -> keep ambience graph and RAF active during fade
  -> navigate after 0.95 seconds
  -> no explicit audio or frame-loop disposal transaction
```

## Source-backed findings

```txt
AudioContext state observation: absent
context.statechange handling: absent
context.resume() path: absent
context.suspend() path: absent
user-activation receipt: absent
context generation identity: absent
audio graph generation identity: absent
node registry and ownership: partial ad hoc object only
delayed close timer identity/cancellation: absent
rapid off/on overlap prevention: absent
visibilitychange handling: absent
pagehide handling: absent
blur handling: absent
navigation teardown result: absent
module dispose API: absent
typed activation/resume/stop result: absent
audio observation/journal: absent
browser audio lifecycle fixtures: absent
```

### Suspended context can remain permanently accepted

`ensureAudio()` returns immediately whenever `state.audio` is truthy. It does not check whether the stored context is `running`, `suspended`, `interrupted` or `closed`, and it never calls `resume()`. If the browser suspends the context after backgrounding, interruption or activation-policy handling, later valid gestures continue to see a non-null audio object and cannot restore the graph.

### Rapid toggles can overlap generations

`stopAmbience()` clears `state.audio` before its 300 ms delayed close executes. Re-enabling ambience during that window creates and starts a new context while the prior graph is still fading and its close timer remains pending. The timer has no identity, cancellation, generation fence or completion result.

### Navigation has no ordered retirement

The transition path starts a long UI tone, keeps the drone and wind graph running during the fade, then assigns `window.location.href`. No source stops nodes, disconnects the graph, closes the context, cancels delayed work, marks a terminal audio state or proves teardown before navigation.

### Any keydown attempts activation

The document-level handler calls `ensureAudio()` before determining whether the key maps to a menu command. Unrelated keydowns can therefore attempt context creation. The runtime records no trusted user-activation evidence or command result.

## Domains in use

```txt
static menu and campaign route shells
menu selection, panels, settings, save presence and fade transition
campaign launch intent, bootstrap and resume admission gaps
browser persistence, save envelope, migration, quarantine and commit gaps
procedural graveyard source rendering
CRT WebGL context, program, buffer, texture and projection
Web Audio context activation, graph construction, UI tones and ambience
pointer, keyboard, wheel, focus, visibility, page and navigation lifecycle
campaign rings, lanes, pads, waves, economy, core and terminal state
selection, building, orders, pause, camera and fixed-step simulation
unit, tower, projectile, combat, reward and terminal mutation
CPU world, HUD, minimap and overlay rendering
public menu and campaign host capabilities
runtime session, frame-loop and disposal authority gaps
source checks, static build, Pages deployment and audit tracking
```

## Implemented kits

```txt
crt-renderer-kit
graveyard-art-kit
menu-route-kit
menu-settings-persistence-kit
menu-save-presence-kit
menu-audio-kit
campaign-route-shell-kit
pixel-campaign-runtime-kit
fixed-step-campaign-simulation-kit
pixel-campaign-render-kit
legacy-gamehost-diagnostics-kit
menu-static-check-kit
campaign-static-check-kit
static-build-copy-kit
pages-deploy-kit
construct-spiral-intro-kit
construct-spiral-schedule-kit
construct-piece-id-kit
construct-piece-state-kit
construct-sequence-update-kit
```

## Offered services

```txt
menu routing, selection, panels, fade and hidden-button activation
settings persistence and CRT, grain and ambience selection
presence-only save scanning across legacy keys and storage scopes
procedural graveyard source-canvas drawing
AudioContext construction, master gain, drone oscillator, looping wind source, UI tone oscillators and delayed context close
WebGL context, shader program, buffer, texture upload, curve, scanline and chromatic projection
default campaign content and mutable state construction
selection, building, orders, wave start, pause, camera, restart and navigation
fixed-step spawning, AI movement, targeting, damage, rewards and terminal mutation
minimal victory save writing
world, HUD, minimap, pause and terminal overlay rendering
mutable public host read and direct mutation
construction intro sequencing
source checks, static build and GitHub Pages deployment
```

## Required parent domain

```txt
phantom-command-menu-audio-activation-lifecycle-authority-domain
```

## Candidate coordinating kits

```txt
phantom-command-audio-session-id-kit
phantom-command-audio-context-generation-kit
phantom-command-audio-graph-generation-kit
phantom-command-audio-user-activation-evidence-kit
phantom-command-audio-activation-command-kit
phantom-command-audio-activation-admission-kit
phantom-command-audio-context-state-kit
phantom-command-audio-context-statechange-adapter-kit
phantom-command-audio-node-registry-kit
phantom-command-audio-resume-transaction-kit
phantom-command-audio-suspend-transaction-kit
phantom-command-audio-stop-transaction-kit
phantom-command-audio-delayed-close-kit
phantom-command-audio-delayed-work-cancellation-kit
phantom-command-audio-visibility-adapter-kit
phantom-command-audio-pagehide-adapter-kit
phantom-command-audio-navigation-retirement-kit
phantom-command-audio-disposal-kit
phantom-command-audio-command-result-kit
phantom-command-audio-observation-kit
phantom-command-audio-journal-kit
phantom-command-audio-activation-fixture-kit
phantom-command-audio-background-resume-fixture-kit
phantom-command-audio-rapid-toggle-fixture-kit
phantom-command-audio-navigation-teardown-smoke-kit
```

## Required transaction

```txt
AudioLifecycleCommand
  -> validate menu session, audio generation and command identity
  -> require trusted user-activation evidence for creation or resume
  -> observe current context state
  -> create, resume, suspend, stop or dispose one detached graph candidate
  -> register every node and delayed task under one graph generation
  -> cancel predecessor delayed work before replacement
  -> atomically commit the current audio graph generation
  -> publish a typed AudioLifecycleResult
  -> update bounded observations and journal
  -> acknowledge running, suspended or disposed terminal state
```

## Required invariants

```txt
state.audio never implies running without an observed context state
one current graph generation per menu session
suspended or interrupted contexts can be resumed by a later admitted gesture
closed or failed contexts cannot block replacement
rapid off/on cannot leave overlapping current generations
all delayed close work is identifiable, cancellable and generation-fenced
pagehide, navigation and disposal retire nodes, timers and context exactly once
rejected or stale commands perform zero audio mutation
settings projection cites the current audio lifecycle result
static source checks do not substitute for real browser audio proof
```

## Repo-local output

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

Added:

```txt
.agent/trackers/2026-07-12T07-29-32-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T07-29-32-04-00.md
.agent/architecture-audit/2026-07-12T07-29-32-04-00-menu-audio-activation-lifecycle-dsk-map.md
.agent/render-audit/2026-07-12T07-29-32-04-00-audio-setting-runtime-state-gap.md
.agent/gameplay-audit/2026-07-12T07-29-32-04-00-suspended-audio-menu-loop.md
.agent/interaction-audit/2026-07-12T07-29-32-04-00-user-activation-audio-admission-map.md
.agent/audio-audit/2026-07-12T07-29-32-04-00-context-generation-resume-teardown-contract.md
.agent/deploy-audit/2026-07-12T07-29-32-04-00-audio-lifecycle-browser-fixture-gate.md
```

## Validation boundary

```txt
runtime source changed: no
audio behavior changed: no
menu behavior changed: no
campaign behavior changed: no
rendering changed: no
persistence changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser audio smoke: not run
```

No audio activation, resume, interruption recovery, rapid-toggle safety, ordered teardown or browser compatibility claim is made.