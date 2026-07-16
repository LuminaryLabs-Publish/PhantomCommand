# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-16T00-00-40-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `campaign-audio-event-projection-authority-audited`

## Summary

PhantomCommand is a static browser campaign game with a procedural Canvas2D menu, menu-owned WebAudio, fixed-step grave-ring combat, Canvas2D world/HUD/minimap rendering, WebGL CRT presentation, local persistence, diagnostics, static build and Pages delivery. The campaign route has accepted wave, build, order, combat, sanctum-damage, pause, victory and defeat transitions, but no campaign audio provider, cue registry, preference adoption, lifecycle result or audible-frame acknowledgement.

## Plan ledger

**Goal:** document one result-driven campaign-audio authority that projects sound from accepted campaign transitions without moving gameplay truth into input handlers or rendering.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and ten root `.agent` states.
- [x] Confirm zero new, ledger-missing or root-agent-missing eligible repositories.
- [x] Detect one documentation-ahead mismatch: central PhantomCommand head `cdb3e9346211d0ddac8bf08798a79259e9f7f78b`, current `main` head `d7df091b3a898e99f804e2af00a307b4df96b09d`.
- [x] Select only PhantomCommand before applying the oldest-documented fallback.
- [x] Identify the complete interaction loop, domains, all kits and offered services.
- [x] Preserve all 20 implemented kit surfaces.
- [x] Define 22 campaign-audio authority surfaces.
- [x] Add the timestamped audit family and refresh root `.agent` state.
- [ ] Implement and execute campaign-audio browser fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
documentation-ahead central mismatch: 1
runtime-ahead: 0

selected: LuminaryLabs-Publish/PhantomCommand
central recorded repo-local head: cdb3e9346211d0ddac8bf08798a79259e9f7f78b
pre-audit main head: d7df091b3a898e99f804e2af00a307b4df96b09d
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu boot
  -> restore settings and save presence
  -> construct procedural graveyard and CRT renderer
  -> accepted pointer or keyboard gesture creates menu AudioContext
  -> ambience and UI tones project
  -> route New or Continue to game.html

campaign boot
  -> construct source and public canvases
  -> construct rings pads units towers waves camera and mutable input
  -> start fixed-step RAF

active campaign
  -> keyboard pointer and wheel produce camera selection build order pause and wave actions
  -> fixed-step simulation settles spawn movement targeting damage rewards core loss and terminal state
  -> Canvas2D draws world HUD minimap effects drag and overlays
  -> WebGL uploads and presents the CRT frame
  -> no campaign audio projection occurs

terminal
  -> victory or defeat state changes message and overlay
  -> victory may persist a save marker
  -> no terminal cue or matching audiovisual acknowledgement exists
```

## Domains in use

```txt
static HTML routes and ES modules
browser document RAF navigation focus blur visibility and page lifecycle
procedural menu art settings save presence audio and routing
Canvas2D source rendering and pixel typography
WebGL context shaders texture upload viewport and CRT presentation
campaign rings lanes pads towers units waves and archetypes
fixed-step scheduling movement targeting projectiles damage rewards effects and terminal settlement
isometric camera projection pan zoom focus and bounds
keyboard pointer wheel selection building orders pause retry and exit
campaign audio capability gesture unlock events cues ambience spatial projection preferences deduplication budgets lifecycle results and proof
localStorage settings and victory save marker
public diagnostics source checks static build Pages and central tracking
```

## Implemented kits and services

| Kit | Services |
|---|---|
| `crt-renderer-kit` | WebGL context, shaders, source texture upload, viewport sizing and screen/source mapping. |
| `graveyard-art-kit` | Procedural animated menu art. |
| `menu-route-kit` | Menu selection, panels, transition fade and navigation. |
| `menu-settings-persistence-kit` | Read, normalize, save and project menu preferences. |
| `menu-save-presence-kit` | Detect supported save markers and expose Continue state. |
| `menu-audio-kit` | Menu AudioContext, master gain, drone, wind, UI tones and ambience preference. |
| `campaign-route-shell-kit` | Campaign canvas, accessibility description and module bootstrap. |
| `pixel-campaign-runtime-kit` | Campaign state, camera, listeners, selection, building and orders. |
| `fixed-step-campaign-simulation-kit` | Accumulator, waves, movement, targeting, combat, rewards and terminal gates. |
| `pixel-campaign-render-kit` | World, entities, effects, HUD, minimap, drag and terminal overlays. |
| `legacy-gamehost-diagnostics-kit` | Live campaign references, commands and summary readback. |
| `menu-static-check-kit` | Menu source-marker validation. |
| `campaign-static-check-kit` | Campaign source and build-marker validation. |
| `static-build-copy-kit` | Static artifact assembly. |
| `pages-deploy-kit` | GitHub Pages artifact delivery. |
| `construct-spiral-intro-kit` | Construction intro choreography. |
| `construct-spiral-schedule-kit` | Timed construction sequencing. |
| `construct-piece-id-kit` | Stable construction piece identity. |
| `construct-piece-state-kit` | Piece state and visibility. |
| `construct-sequence-update-kit` | Construction sequence advancement. |

```txt
implemented source-backed kits: 20
planned campaign-audio authority surfaces: 22
```

## Source-backed finding

```txt
menu AudioContext owner: present
menu ambience preference: present
menu drone wind and UI tones: present
campaign module imports audio provider: no
campaign AudioContext owner: absent
campaign preference adoption: absent
accepted wave/build/order/combat/core/terminal transitions: present
campaign cue descriptors: absent
campaign ambience lifecycle: absent
cue deduplication and voice budgets: absent
CampaignAudioProjectionResult: absent
FirstAudibleCampaignCueAck: absent
FirstCampaignAudioVisualConvergenceAck: absent
```

The source supports a clear asymmetry: menu interactions can create and hear procedural sound, while accepted campaign state transitions project only through effects, messages, HUD, overlays and the CRT frame. This is an architecture and evidence gap, not a reproduced audio failure.

## Required authority

`phantom-command-campaign-audio-event-projection-authority-domain`

```txt
CampaignAudioProjectionCommand
  -> bind document runtime campaign frame event camera and policy revisions
  -> observe browser capability and accepted user-gesture unlock
  -> consume accepted campaign transitions rather than raw input assumptions
  -> resolve wave build order combat sanctum terminal UI and ambience descriptors
  -> reject stale duplicate muted suspended superseded and retired work
  -> project listener and optional spatial-source transforms
  -> enforce persisted preference buses pools priorities and voice budgets
  -> settle pause blur visibility pagehide retry and route-exit lifecycle
  -> publish CampaignAudioProjectionResult
  -> publish FirstAudibleCampaignCueAck
  -> publish FirstCampaignAudioVisualConvergenceAck
```

## Planned authority surfaces

```txt
phantom-command-campaign-audio-event-projection-authority-domain
campaign-audio-capability-observer-kit
campaign-audio-gesture-unlock-kit
campaign-audio-context-lifecycle-kit
campaign-audio-policy-kit
campaign-audio-event-id-kit
campaign-audio-transition-adapter-kit
campaign-audio-cue-registry-kit
campaign-wave-cue-kit
campaign-build-order-cue-kit
campaign-combat-cue-kit
campaign-terminal-cue-kit
campaign-ambience-kit
campaign-listener-projection-kit
campaign-source-projection-kit
campaign-audio-preference-kit
campaign-cue-deduplication-kit
campaign-voice-budget-kit
campaign-audio-projection-result-kit
first-audible-campaign-cue-ack-kit
first-campaign-audiovisual-convergence-ack-kit
campaign-audio-browser-fixture-gate-kit
```

## Repo-local output

Added under `2026-07-16T00-00-40-04-00`:

```txt
.agent/trackers/.../project-breakdown.md
.agent/turn-ledger/...md
.agent/architecture-audit/...campaign-audio-event-projection-dsk-map.md
.agent/render-audit/...silent-campaign-audiovisual-frame-gap.md
.agent/gameplay-audit/...silent-wave-build-combat-outcome-loop.md
.agent/interaction-audit/...campaign-audio-command-result-map.md
.agent/audio-audit/...campaign-unlock-cue-ambience-lifecycle-contract.md
.agent/deploy-audit/...campaign-audio-browser-fixture-gate.md
.agent/central-sync-audit/...documentation-ahead-campaign-audio-reconciliation.md
```

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation

Documentation changed. Runtime JavaScript, HTML, CSS, gameplay, rendering, persistence, audio behavior, dependencies, tests, workflows, build and deployment did not change. Browser audio fixtures, built-output smoke and Pages-origin smoke were not run. No audible-gameplay, cue-correctness, lifecycle, artifact-parity or production-readiness claim is made.