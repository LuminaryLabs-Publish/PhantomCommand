# PhantomCommand Current Audit

**Timestamp:** `2026-07-12T07-29-32-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

The current audit isolates the menu Web Audio lifecycle. `ensureAudio()` creates a context and graph after pointer or keyboard interaction, but it treats any non-null `state.audio` as current without observing `AudioContext.state`. No path resumes a suspended or interrupted context. Ambience shutdown clears the current reference before an untracked delayed close, allowing rapid toggles to overlap graph generations. Visibility loss, pagehide, navigation and module disposal have no ordered audio retirement transaction.

## Plan ledger

**Goal:** define one authoritative audio lifecycle transaction without changing runtime behavior in this documentation pass.

- [x] Compare the full Publish inventory with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Reconcile repo-local timestamps and select only the oldest stable eligible repo.
- [x] Inspect audio settings, context construction, node graph, UI tones, toggle behavior, browser input and navigation.
- [x] Identify the complete interaction loop, all domains, all 20 implemented kits and offered services.
- [x] Define activation, context-state, generation, resume, replacement, stop, disposal, observation and fixture boundaries.
- [x] Change documentation only on `main`.
- [ ] Implement and execute the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new/ledger-missing/root-agent-missing eligible repositories: 0
oldest stable eligible timestamp: PhantomCommand at 2026-07-12T05-49-04-04-00
selected repository: LuminaryLabs-Publish/PhantomCommand
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu startup
  -> create source canvas, graveyard art and CRT renderer
  -> read persisted CRT, grain and ambience settings
  -> scan three save keys
  -> initialize menu state with audio = null
  -> install pointer and keyboard handlers
  -> start recursive RAF
  -> publish window.PhantomMenu

first pointerdown or document keydown
  -> call ensureAudio()
  -> when ambience=true and state.audio=null:
       create AudioContext
       create master gain
       create/start drone oscillator
       create/start looping wind source
       store context/master/drone/wind
  -> classify and execute menu action

UI tone
  -> call ensureAudio()
  -> create transient oscillator and gain
  -> start and schedule stop

ambience off
  -> clear state.audio immediately
  -> fade predecessor master
  -> schedule predecessor context.close() after 300 ms

ambience on before close
  -> create a new context and graph
  -> predecessor close timer remains untracked

Begin or Continue
  -> start transition and long tone
  -> continue menu RAF and ambience during fade
  -> navigate after 0.95 seconds
  -> perform no explicit audio or RAF disposal
```

## Source-backed findings

```txt
AudioContext creation: implemented
master gain: implemented
drone oscillator: implemented
looping wind source: implemented
transient UI tones: implemented
ambience preference persistence: implemented
delayed context close: implemented ad hoc

AudioContext state observation: absent
context.statechange handling: absent
context.resume(): absent
context.suspend(): absent
trusted user-activation receipt: absent
context generation: absent
graph generation: absent
complete node registry: absent
delayed close timer identity: absent
delayed close cancellation: absent
rapid-toggle overlap prevention: absent
visibilitychange handling: absent
pagehide handling: absent
navigation teardown result: absent
module dispose API: absent
typed lifecycle results: absent
audio observation/journal: absent
browser lifecycle fixtures: absent
```

### Non-null state can conceal a non-running context

`ensureAudio()` exits whenever `state.audio` exists. It never distinguishes `running`, `suspended`, `interrupted` or `closed`. If the browser suspends the context, later valid gestures cannot trigger `resume()` because the existence check short-circuits first.

### Rapid toggles can overlap contexts

`stopAmbience()` sets `state.audio = null` before the old context closes. Re-enabling ambience during the 300 ms fade creates a new graph while the predecessor remains alive. The delayed callback is not bound to an audio generation and cannot be cancelled.

### Navigation does not retire audio ownership

The transition path continues the ambience graph and recursive RAF until location assignment. No terminal result proves that oscillators, buffer sources, transient tones, timers or context were retired before the page transfers ownership.

### Audio activation is attempted before command classification

The document key handler invokes `ensureAudio()` before checking whether the key maps to a menu action. The runtime records neither event trust nor browser user-activation evidence.

## Domains in use

```txt
static menu and campaign route shells
menu selection panels settings save presence and fade transition
campaign launch intent bootstrap and resume admission gaps
save key ownership envelope validation migration quarantine and commit gaps
procedural graveyard source rendering
CRT WebGL context program buffer texture and projection
Web Audio activation context graph ambience UI tones and teardown
pointer keyboard wheel focus visibility page navigation and RAF lifecycle
campaign rings lanes pads waves economy core and terminal state
selection building orders pause camera and fixed-step simulation
unit tower projectile combat reward and terminal mutation
CPU world HUD minimap and overlay rendering
public menu and campaign host capabilities
runtime session frame-loop and disposal authority gaps
source checks static build Pages deployment and audit tracking
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
menu routing selection panels fade and hidden-button activation
settings persistence and CRT grain ambience selection
presence-only save scanning across legacy keys and scopes
procedural graveyard drawing
AudioContext creation master gain drone oscillator looping wind buffer UI tones delayed close
WebGL context program buffer texture source upload and CRT presentation
default campaign content and mutable state construction
selection building orders wave start pause camera restart and navigation
fixed-step spawning AI movement targeting damage rewards and terminal mutation
minimal victory save writing
world HUD minimap pause and terminal overlay rendering
mutable public host read and direct mutation
construction intro sequencing
source checks static build and GitHub Pages deployment
```

## Required parent domain

```txt
phantom-command-menu-audio-activation-lifecycle-authority-domain
```

## Candidate kits

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

## Required invariants

```txt
one current audio graph generation per menu session
state.audio never implies running without an observed context state
suspended or interrupted contexts can be resumed by an admitted gesture
closed or failed contexts cannot block a replacement transaction
rapid off/on cannot leave overlapping current generations
every node and delayed task belongs to one graph generation
stale callbacks and commands perform zero mutation
pagehide navigation and disposal retire audio exactly once
settings and diagnostics distinguish preference from runtime lifecycle state
static token checks do not substitute for real-browser audio proof
```

## Retained dependencies

```txt
Campaign Bootstrap and Continue Resume Authority
Public Host Owner Quarantine and Typed Command Admission
CRT Display/Input Projection Authority
Campaign Phase Admission Authority
Fixed-Step Command Scheduling and Committed Frame Authority
Combat Resolution and Exclusive Terminal Outcome Authorities
Runtime Session Lifecycle Authority
Versioned Full Campaign Checkpoint Capture Authority
```

## Validation boundary

Documentation only. Menu behavior, campaign behavior, persistence, rendering, audio, package scripts, dependencies and deployment were not changed.