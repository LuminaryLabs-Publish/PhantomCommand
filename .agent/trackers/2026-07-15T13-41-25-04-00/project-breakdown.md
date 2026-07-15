# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-15T13-41-25-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `menu-audio-unlock-lifecycle-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with a procedural Canvas2D menu, fixed-step combat, Canvas2D world/HUD/minimap rendering, WebGL CRT presentation, local persistence, construction choreography, static checks and Pages delivery.

This audit isolates menu audio ownership. The menu creates one `AudioContext`, a persistent oscillator, a looping wind source and transient UI tones after input. It does not explicitly resume a suspended context, settle audio on visibility or route changes, retire persistent sources individually, reject late shutdown callbacks or publish audible/silent lifecycle results.

## Plan ledger

**Goal:** make browser audio unlock, preference adoption, persistent ambience, transient cues, route settlement and teardown one versioned lifecycle without changing menu or campaign behavior.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible repositories with ten central-ledger entries and root `.agent` states.
- [x] Confirm no eligible repository is new, ledger-missing, root-agent-missing, undocumented or runtime-ahead.
- [x] Select only PhantomCommand through the oldest synchronized central timestamp rule.
- [x] Inspect `src/menu/graveyard-menu.js`, `src/campaign/campaign-scene.js`, `package.json` and current agent state.
- [x] Identify the complete interaction loop, domains, all 20 implemented kits and their offered services.
- [x] Identify audio unlock, suspension, route settlement and retirement gaps.
- [x] Define an 18-surface menu-audio lifecycle authority family.
- [x] Add a new timestamped tracker and focused audit family.
- [x] Refresh every required root `.agent` document and registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement the authority and execute browser, build and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing repositories: 0
undocumented repositories: 0
runtime-ahead repositories: 0

selected repository: LuminaryLabs-Publish/PhantomCommand
selection rule: oldest synchronized central timestamp
prior central timestamp: 2026-07-15T08-41-37-04-00
next oldest eligible timestamp: AetherVale at 2026-07-15T09-00-08-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu boot
  -> read CRT grain and ambience preferences
  -> inspect save markers
  -> create Canvas2D source surface and WebGL CRT presenter
  -> begin recursive RAF

menu interaction
  -> pointer or keyboard input calls ensureAudio
  -> ensureAudio creates AudioContext master bus drone and looping wind
  -> UI navigation creates short oscillator cues
  -> settings can toggle ambience and call stopAmbience
  -> New or Continue begins visual fade and later navigates to game.html

campaign bootstrap
  -> create 640 x 360 source canvas and WebGL CRT surface
  -> author rings lanes pads units towers waves camera and state
  -> attach keyboard pointer wheel context-menu and blur listeners
  -> publish window.GameHost
  -> start recursive RAF and fixed-step simulation

campaign play
  -> input mutates camera selection orders building waves and pause
  -> fixed-step update resolves movement targeting combat rewards and outcomes
  -> Canvas2D renders the campaign
  -> CRT uploads and presents the source canvas
```

## Domains in use

```txt
static HTML routes and ES module lifecycle
browser document RAF performance blur visibility navigation and page lifecycle
procedural menu art settings save presence audio and routing
Canvas2D source rendering and pixel typography
WebGL context shaders texture upload and CRT presentation
campaign rings lanes pads towers units waves and archetypes
fixed-step scheduling and mutable campaign simulation
spawn movement targeting projectiles damage rewards and effects
isometric camera projection pan zoom and focus
keyboard pointer wheel context-menu and touch-pointer input
selection construction unit orders and wave admission
HUD minimap pause and terminal presentation
localStorage preference victory marker and reload retry
browser AudioContext unlock state persistent sources transient cues and retirement
public host publication and ambient diagnostic capabilities
construction intro choreography and sequence state
source checks static build Pages and central tracking
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `crt-renderer-kit` | WebGL context creation, source texture upload, CRT shaders, screen/source mapping and disposal. |
| `graveyard-art-kit` | Procedural animated menu art and menu scene drawing. |
| `menu-route-kit` | Menu selection, panels, fade transition and navigation. |
| `menu-settings-persistence-kit` | CRT, grain and ambience preference read/write and projection. |
| `menu-save-presence-kit` | Save-marker detection and Continue availability. |
| `menu-audio-kit` | AudioContext creation, master bus, ambience drone, looping wind, UI tones and settings-triggered close. |
| `campaign-route-shell-kit` | Campaign canvas, accessibility fallback and module bootstrap. |
| `pixel-campaign-runtime-kit` | Campaign state, authored content, listeners, lifecycle and host publication. |
| `fixed-step-campaign-simulation-kit` | Accumulator, 60 Hz update, waves, movement, combat, rewards and outcomes. |
| `pixel-campaign-render-kit` | World, pads, entities, effects, sanctum, HUD, minimap and overlays. |
| `legacy-gamehost-diagnostics-kit` | Live state/camera exposure, wave start, build, zoom and summary readback. |
| `menu-static-check-kit` | Menu source-marker assertions. |
| `campaign-static-check-kit` | Campaign HTML, source, CRT and build marker assertions. |
| `static-build-copy-kit` | Static product copy into build output. |
| `pages-deploy-kit` | GitHub Pages artifact publication. |
| `construct-spiral-intro-kit` | Intro construction choreography. |
| `construct-spiral-schedule-kit` | Timed construction schedule. |
| `construct-piece-id-kit` | Stable construction-piece identity. |
| `construct-piece-state-kit` | Construction-piece state and visibility. |
| `construct-sequence-update-kit` | Construction sequence advancement. |

```txt
implemented source-backed kits: 20
planned menu-audio authority surfaces: 18
```

## Service groups

```txt
menu:
  procedural drawing
  selection and panels
  settings persistence
  save presence
  fade and navigation

audio:
  AudioContext creation
  master gain
  persistent drone
  generated looping wind
  transient UI tones
  ambience preference toggle
  delayed context close

campaign:
  state and authored content
  selection and construction
  unit orders and waves
  fixed-step simulation
  combat rewards pause and terminal flags
  victory marker persistence

render:
  Canvas2D menu and campaign surfaces
  world HUD minimap pause and terminal overlays
  WebGL CRT presentation
  screen/source coordinate mapping

input:
  keyboard
  primary pointer selection
  secondary pointer orders
  middle pointer pan
  wheel zoom
  blur settlement

public diagnostics:
  raw state reference
  raw camera reference
  direct startWave
  direct build
  direct setZoom
  cloned summary readback

construction:
  choreography scheduling identity state and sequence advancement

delivery:
  static source checks
  static build
  GitHub Pages
  central audit tracking
```

## Main finding

`ensureAudio()` creates an `AudioContext`, master gain, persistent oscillator and looping buffer source, starts both persistent sources and stores the graph in `state.audio`. It returns immediately whenever `state.audio` already exists, so it does not call `context.resume()` when an existing context is suspended.

`stopAmbience()` is reached only from the ambience setting. It fades the master and schedules `context.close()` after 300 ms. It does not stop or disconnect the persistent sources individually, bind the timeout to an audio generation, reject a stale timeout after a later re-enable, or publish a terminal retirement result.

The menu route transition changes `window.location.href` after a visual fade without explicitly settling audio. There is no `visibilitychange`, `pagehide` or document-retirement audio owner. This is a source-backed lifecycle and evidence gap; it is not a claim that leakage, silence or browser-policy failure was reproduced.

## Required authority

```txt
phantom-command-menu-audio-unlock-lifecycle-authority-domain
```

```txt
MenuAudioUnlockCommand
  -> bind AudioPolicyRevision PreferenceRevision and accepted gesture
  -> create or resume one AudioContextGeneration
  -> publish MenuAudioUnlockResult
  -> reject unsupported or retired generations

MenuAudioProjectionCommand
  -> bind AudioContextGeneration RouteRevision and cue identity
  -> own persistent ambience and transient cue leases
  -> deduplicate stale or duplicate cues
  -> publish MenuAudioProjectionResult
  -> acknowledge FirstAudibleMenuFrameAck

MenuAudioSettlementCommand
  -> bind preference visibility route and page-lifecycle revisions
  -> fade or suspend according to policy
  -> stop and disconnect persistent and transient nodes exactly once
  -> cancel stale retirement callbacks
  -> close the accepted context generation exactly once
  -> publish MenuAudioSettlementResult
  -> acknowledge FirstSilentRouteTransitionAck
```

## Planned authority kits

```txt
menu-audio-policy-kit
audio-context-generation-kit
audio-unlock-admission-kit
audio-context-state-observer-kit
persistent-ambience-source-kit
transient-ui-cue-kit
audio-bus-policy-kit
audio-preference-projection-kit
visibility-audio-settlement-kit
route-audio-settlement-kit
pagehide-audio-retirement-kit
audio-source-retirement-kit
audio-context-retirement-kit
late-audio-callback-rejection-kit
audio-lifecycle-result-kit
first-audible-menu-frame-ack-kit
first-silent-route-transition-ack-kit
browser-audio-lifecycle-fixture-kit
```

## Required repo-local output

```txt
.agent/trackers/2026-07-15T13-41-25-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T13-41-25-04-00.md
.agent/architecture-audit/2026-07-15T13-41-25-04-00-menu-audio-lifecycle-dsk-map.md
.agent/render-audit/2026-07-15T13-41-25-04-00-menu-transition-audio-settlement-gap.md
.agent/gameplay-audit/2026-07-15T13-41-25-04-00-menu-to-campaign-audio-loop.md
.agent/interaction-audit/2026-07-15T13-41-25-04-00-audio-command-result-map.md
.agent/audio-audit/2026-07-15T13-41-25-04-00-context-source-route-retirement-contract.md
.agent/deploy-audit/2026-07-15T13-41-25-04-00-browser-audio-lifecycle-fixture-gate.md
.agent/central-sync-audit/2026-07-15T13-41-25-04-00-oldest-selection-audio-reconciliation.md
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

## Validation boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
audio behavior changed: no
input gameplay persistence Canvas2D and CRT behavior changed: no
packages dependencies tests workflows build and deployment changed: no
branch created: no
pull request created: no

npm run check: not run
npm run build: not run
browser audio unlock fixture: unavailable
suspended-context resume fixture: unavailable
visibility and route settlement fixtures: unavailable
source retirement fixture: unavailable
built-output and Pages parity: not run
```

No audio unlock correctness, lifecycle settlement, source retirement, audible/silent acknowledgement, artifact parity, Pages parity or production readiness is claimed.