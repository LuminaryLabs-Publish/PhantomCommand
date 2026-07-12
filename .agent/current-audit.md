# PhantomCommand Current Audit

**Timestamp:** `2026-07-12T04-18-44-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

The menu owns a Web Audio graph through one mutable `state.audio` reference. The graph can be created and closed, but it has no session identity, context generation, state observation, resume path, callback fencing, page-lifecycle policy, transition handoff, graph lease accounting or typed result. A suspended context remains non-null, so every later `ensureAudio()` call exits without attempting `context.resume()`.

## Plan ledger

**Goal:** define one lifecycle authority for menu audio without changing runtime behavior in this documentation pass.

- [x] Compare the full Publish inventory with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Skip `IntoTheMeadow` and `HorrorCorridor` after detecting newer concurrent repo-local audits.
- [x] Select only `PhantomCommand`.
- [x] Inspect `src/menu/graveyard-menu.js`, menu HTML, static checks, current docs and registry.
- [x] Identify the complete loop, domains, all 20 implemented kits and their services.
- [x] Trace context creation, ambience nodes, tone voices, delayed close, transition and RAF.
- [x] Define lifecycle commands, leases, results, observations and fixture gates.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new/ledger-missing/root-agent-missing eligible repositories: 0
IntoTheMeadow: skipped because repo-local documentation advanced during this run
HorrorCorridor: skipped because repo-local documentation advanced during this run
PhantomCommand: selected as next oldest stable eligible repository
```

## Complete interaction loop

```txt
menu module evaluation
  -> create source canvas, CRT renderer and graveyard art
  -> read settings and save presence
  -> attach pointer, keyboard and hidden-button listeners
  -> start recursive RAF
  -> publish window.PhantomMenu

audio startup
  -> first pointerdown or keydown calls ensureAudio
  -> if ambience false or state.audio non-null, return
  -> create AudioContext, master gain, drone oscillator and looping wind buffer
  -> start drone and wind
  -> store context/master/drone/wind

UI tone
  -> ensureAudio
  -> create oscillator and gain
  -> connect to master
  -> start/stop oscillator
  -> no voice result or explicit disconnect receipt

ambience disable
  -> state.audio = null
  -> ramp old master to zero
  -> schedule old context.close after 300 ms

transition
  -> fade for 0.95 s
  -> assign window.location.href
  -> RAF/listeners/audio have no explicit pre-navigation retirement
```

## Source-backed findings

```txt
context creation is gesture-adjacent: yes
context.state observation: no
context.resume call: no
context suspend policy: no
context generation: no
statechange listener: no
visibilitychange listener: no
pagehide listener: no
pageshow/bfcache restore handler: no
navigation handoff: no
delayed-close timer identity/cancellation: no
ambience graph lease: no
UI-tone voice registry: no
typed lifecycle result: no
audio observation/journal: no
```

### Suspended-context trap

```txt
state.audio exists
  -> AudioContext becomes suspended
  -> later pointer/key action calls ensureAudio()
  -> function returns because state.audio is non-null
  -> context.resume() is never attempted
  -> settings can still display ambience enabled
```

### Toggle churn

```txt
ambience off
  -> old context scheduled to close in 300 ms
  -> state.audio cleared immediately

ambience on before timer fires
  -> new context and graph created
  -> old context remains live until timer
  -> no generation or timer lease distinguishes the two graphs
```

### Navigation and bfcache

The transition changes `window.location.href` after the fade. There is no explicit menu-session stop, audio graph retirement, listener removal or RAF cancellation before navigation. Browser unload may eventually reclaim resources, but the runtime has no result proving retirement and no bfcache policy.

## Domains in use

```txt
static route and source-canvas shell
menu selection, panels, settings, save presence and fade transition
procedural graveyard source rendering
CRT WebGL context/program/buffer/texture and projection
Web Audio context, ambience, UI tone and settings adapter
pointer, keyboard and hidden-button input
recursive menu RAF and document lifecycle
campaign content, state, actions, fixed-step simulation and rendering
public menu/campaign host projection
phase, command, terminal, lifecycle and checkpoint authority gaps
source checks, static build, Pages and audit tracking
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
menu routing, fade and hidden-button activation
settings persistence and CRT/ambience selection
save-presence scanning
procedural graveyard drawing
AudioContext creation, drone/wind ambience and UI tones
CRT shader resources, source upload, contain/curve presentation
campaign defaults, selection, construction, orders, waves, pause and camera
fixed-step spawn, AI, movement, combat, reward and terminal mutation
world, HUD, minimap and overlays
mutable public host read/mutation
construction intro sequencing
source checks, build and Pages deployment
```

## Required parent domain

```txt
phantom-command-menu-audio-lifecycle-authority-domain
```

## Candidate kits

```txt
phantom-command-audio-session-id-kit
phantom-command-audio-context-generation-kit
phantom-command-audio-start-command-kit
phantom-command-audio-gesture-admission-kit
phantom-command-audio-context-state-observation-kit
phantom-command-audio-context-resume-kit
phantom-command-ambience-graph-lease-kit
phantom-command-ui-tone-voice-lease-kit
phantom-command-audio-settings-adapter-kit
phantom-command-visibility-audio-policy-kit
phantom-command-pagehide-audio-retirement-kit
phantom-command-transition-audio-handoff-kit
phantom-command-audio-stop-command-kit
phantom-command-audio-retirement-result-kit
phantom-command-delayed-close-timer-lease-kit
phantom-command-stale-audio-callback-rejection-kit
phantom-command-audio-observation-kit
phantom-command-audio-journal-kit
phantom-command-suspended-context-resume-fixture-kit
phantom-command-audio-toggle-churn-fixture-kit
phantom-command-audio-bfcache-fixture-kit
phantom-command-transition-audio-teardown-smoke-kit
```

## Required invariants

```txt
one active audio generation per menu session
non-null graph does not imply running context
every audible start/resume requires an accepted result
every graph node and delayed timer has a lease
predecessor-generation timers cannot affect the active graph
pagehide/navigation retires or explicitly transfers audio
bfcache restore revalidates document and context state
settings UI cites actual admitted audio state
static checks do not substitute for browser audio proof
```

## Validation boundary

Documentation only. Audio output, Web Audio nodes, menu behavior, navigation, shaders, package scripts, dependencies and deployment were not changed.
