# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-12T22-00-46-04-00`  
**Status:** `campaign-keyboard-command-admission-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign game with procedural menu art, CRT presentation, fixed-step combat, browser persistence and public diagnostics. The current audit isolates Campaign Keyboard Command Admission Authority: the campaign installs global keyboard listeners, accepts shortcuts without route/focus/editable-target admission, applies no `event.repeat` policy, has no keyboard generation, and mutates campaign, camera and navigation state without typed command results or visible-frame proof.

## Plan ledger

**Goal:** require current route, surface, focus, lifecycle generation and command identity before held movement or one-shot keyboard actions can affect the campaign.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand`, the oldest eligible central entry.
- [x] Inspect keyboard, blur, held-state, phase, camera, navigation, render and check paths.
- [x] Identify the complete interaction loop, all domains, 20 implemented kits and offered services.
- [x] Add the timestamped keyboard-admission audit family.
- [x] Refresh required root `.agent` state and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime corrections and executable keyboard fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-12T22-00-46-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T22-00-46-04-00.md
.agent/architecture-audit/2026-07-12T22-00-46-04-00-campaign-keyboard-command-admission-authority-dsk-map.md
.agent/render-audit/2026-07-12T22-00-46-04-00-keyboard-result-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T22-00-46-04-00-global-key-repeat-campaign-loop.md
.agent/interaction-audit/2026-07-12T22-00-46-04-00-key-event-command-consumption-result-map.md
.agent/keyboard-input-audit/2026-07-12T22-00-46-04-00-focus-repeat-generation-contract.md
.agent/deploy-audit/2026-07-12T22-00-46-04-00-campaign-keyboard-browser-fixture-gate.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The Campaign Spatial Input Admission audit at `2026-07-12T19-58-07-04-00` remains the immediate pointer-input predecessor. Campaign Action Result Authority remains the downstream command-consumption dependency.

## Current keyboard loop

```txt
global keydown
  -> lowercase key and add to held Set
  -> no route, focus or editable-target admission
  -> no event.repeat policy
  -> Space, 1/2/3, P, R, Escape and F mutate immediately

global keyup
  -> remove normalized key from held Set

RAF
  -> consume held WASD/Arrow keys for camera movement
  -> advance fixed-step campaign simulation
  -> render world, HUD and minimap through CRT
  -> publish no keyboard result or frame acknowledgement

blur
  -> clear held keys and pointer flags
  -> retire no input generation
```

## Main findings

```txt
global keyboard ownership: yes
canvas/route focus admission: no
editable-target exclusion: no
one-shot repeat policy: no
P can toggle repeatedly during one physical hold: yes
keyboard session/focus generation: no
visibility/page lifecycle fence: no
listener teardown: no
command ID, sequence or duplicate rejection: no
typed keyboard/consumer result: no
first visible keyboard-result frame acknowledgement: no
```

## Kit census

```txt
implemented source-backed kits: 20
planned keyboard-admission authority kits: 28
```

The complete kit-by-kit service inventory is in the current tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
phantom-command-campaign-keyboard-command-admission-authority-domain
```

## Required flow

```txt
KeyboardEvent
  -> route, surface, focus and editable-target admission
  -> keyboard session/generation and monotonic sequence admission
  -> held-state or one-shot classification
  -> repeat, duplicate and stale rejection
  -> typed CampaignKeyboardCommand
  -> Campaign Action / Camera / Navigation consumer result
  -> terminal CampaignKeyboardResult
  -> first visible successor-frame acknowledgement
```

## Validation boundary

Documentation only. Runtime, keyboard, campaign, camera, navigation, rendering, package scripts, dependencies and deployment are unchanged. No keyboard event, browser or Pages fixture was executed.