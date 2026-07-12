# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T04-18-44-04-00`

## Summary

PhantomCommand creates menu ambience lazily through Web Audio, but the audio graph has no lifecycle authority. `ensureAudio()` treats any retained `state.audio` as ready even when its `AudioContext` is suspended or closed, navigation does not retire menu audio before leaving, and page visibility, `pagehide`, bfcache, delayed close, voice ownership and observable start/stop results are absent.

## Plan ledger

**Goal:** make menu audio one gesture-admitted, state-observed and lifecycle-owned capability that suspends, resumes, transfers or retires deterministically across settings changes, visibility changes, navigation and bfcache.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Detect newer concurrent repo-local work in `IntoTheMeadow` and `HorrorCorridor` and avoid overwriting it.
- [x] Select only `PhantomCommand` as the next oldest stable eligible repository.
- [x] Trace menu startup, settings, AudioContext creation, ambience graph, UI tones, transitions, RAF and static checks.
- [x] Identify the interaction loop, all domains, 20 implemented kits and offered services.
- [x] Confirm context state is not observed or resumed.
- [x] Confirm page/transition lifecycle does not own audio retirement.
- [x] Define audio session, graph leases, timers, results, observations and browser fixtures.
- [x] Refresh required root `.agent` documents and registry.
- [ ] Runtime implementation and executable audio fixtures remain future work.

## Current interaction loop

```txt
menu load
  -> read ambience setting
  -> create CRT renderer and recursive RAF
  -> audio remains null

first pointer or key action
  -> ensureAudio()
  -> create AudioContext, master, drone and looping wind
  -> store one mutable state.audio object
  -> play UI tone

settings ambience off
  -> clear state.audio
  -> ramp master toward zero
  -> schedule context.close() after 300 ms

settings ambience on
  -> create another context immediately if state.audio is null

Begin / Continue
  -> begin fade
  -> after 0.95 s assign window.location.href
  -> no audio handoff or retirement result
```

## Main finding

```txt
AudioContext state observation: absent
explicit resume() after suspension: absent
visibility suspend/resume policy: absent
pagehide/bfcache retirement: absent
navigation audio handoff: absent
context generation: absent
graph/voice/timer leases: absent
typed start/stop/resume results: absent
stale delayed-close rejection: absent
audio/menu-frame correlation: absent
browser audio lifecycle fixtures: absent
```

## Domains in use

```txt
menu route, selection, panels, settings and fade transition
save-presence discovery and Continue projection
procedural graveyard drawing
CRT WebGL presentation and pointer projection
Web Audio context, ambience graph and UI tones
menu keyboard/pointer interaction and recursive RAF
campaign shell, mutable state, fixed-step simulation and rendering
campaign phase, command, combat, terminal, lifecycle and checkpoint gaps
static checks, build, Pages deployment and central tracking
```

## Implemented kits and services

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

Services cover menu routing, settings, save detection, procedural art, AudioContext ambience and tones, CRT resources/projection, campaign state/actions/simulation/rendering, public diagnostics, construction sequencing, checks, static build and Pages deployment.

## Required parent domain

```txt
phantom-command-menu-audio-lifecycle-authority-domain
```

## Required transaction

```txt
AudioLifecycleCommand
  -> validate menu session, document lifecycle and gesture admission
  -> observe current context state and generation
  -> start, resume, suspend, transfer or retire the graph
  -> own ambience nodes, UI-tone voices and delayed-close timers as leases
  -> reject stale callbacks from predecessor generations
  -> return one typed AudioLifecycleResult
  -> publish detached audio observation
  -> correlate settings and menu frame with actual audible state
```

## Read this pass first

```txt
.agent/trackers/2026-07-12T04-18-44-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T04-18-44-04-00.md
.agent/architecture-audit/2026-07-12T04-18-44-04-00-menu-audio-lifecycle-authority-dsk-map.md
.agent/render-audit/2026-07-12T04-18-44-04-00-audio-settings-visible-frame-state-gap.md
.agent/gameplay-audit/2026-07-12T04-18-44-04-00-suspended-context-transition-loop.md
.agent/interaction-audit/2026-07-12T04-18-44-04-00-gesture-visibility-audio-command-map.md
.agent/audio-lifecycle-audit/2026-07-12T04-18-44-04-00-context-graph-timer-lease-contract.md
.agent/deploy-audit/2026-07-12T04-18-44-04-00-browser-audio-lifecycle-fixture-gate.md
```

Do not treat `settings.ambience === true` or a non-null `state.audio` as proof that ambience is audible. Completion requires context-state admission, explicit lifecycle results, complete graph/timer retirement and browser proof across suspension, navigation and bfcache.
