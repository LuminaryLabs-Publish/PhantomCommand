# PhantomCommand Project Breakdown

**Timestamp:** `2026-07-14T02-58-28-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Status:** `settings-route-adoption-visible-frame-authority-audited`

## Summary

PhantomCommand persists three menu settings under `phantomCommand.menuSettings`: CRT enabled, grain level and ambience enabled. The menu reads and applies them continuously. The campaign creates the same CRT renderer but hard-codes `{ crt: true, grain: "low", fade: 0 }`, never reads the saved document and exposes no settings state through `GameHost`. Ambience is implemented only by the menu route with no explicit campaign support classification.

## Plan ledger

**Goal:** make one versioned settings revision survive route changes and produce an explicit application result plus the first matching visible frame.

- [x] Compare all 11 accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all 10 eligible repositories have ledger and root `.agent` coverage.
- [x] Confirm all eligible repository heads match their documented heads.
- [x] Select only `PhantomCommand` through the oldest eligible timestamp rule.
- [x] Trace settings read, mutation, persistence, menu projection and campaign presentation.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Define the settings schema, route capability, adoption and visible-frame authority.
- [ ] Runtime implementation and executable settings-parity fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0
selected: PhantomCommand
prior central timestamp: 2026-07-13T21-02-54-04-00
```

## Complete interaction loop

```txt
menu boot
  -> read phantomCommand.menuSettings
  -> normalize crt, grain and ambience with route-local defaults
  -> render menu through settings-aware CRT uniforms
  -> optionally create menu ambience

settings edit
  -> mutate the live menu object
  -> apply CRT, grain or ambience immediately in the menu
  -> attempt one unverified localStorage write
  -> expose menu-only readback through PhantomMenu

route transition
  -> navigate to game.html
  -> campaign does not read or admit the saved settings revision
  -> campaign renders with hard-coded CRT=true and grain=low
  -> campaign exposes no settings readback or application result
  -> no first frame proves the selected settings reached the campaign
```

## Domains in use

```txt
menu and campaign route shells
browser localStorage and route navigation
settings parsing defaults mutation and writeback
settings schema revision and compatibility
route capability declaration and adoption
Canvas2D source rendering
WebGL CRT grain curve aberration vignette and fade
menu AudioContext ambience and UI tones
campaign fixed-step simulation combat economy and outcomes
pointer keyboard wheel drag and native-button input
public PhantomMenu and GameHost capabilities
construction choreography
source checks static build Pages deployment and central tracking
settings application and first-visible-frame evidence
```

## Implemented kits and offered services

| Kit | Offered services |
|---|---|
| `crt-renderer-kit` | WebGL context, shaders, source upload, CRT/grain uniforms, resize and screen mapping |
| `graveyard-art-kit` | Procedural menu and panel drawing |
| `menu-route-kit` | Selection, panels, fade and navigation |
| `menu-settings-persistence-kit` | Settings parse, defaults and writeback |
| `menu-save-presence-kit` | Local/session save-key presence scan |
| `menu-audio-kit` | Ambience, wind, UI tones and delayed close |
| `campaign-route-shell-kit` | Campaign document and source canvas |
| `pixel-campaign-runtime-kit` | State, input, selection, building, orders, pause and camera |
| `fixed-step-campaign-simulation-kit` | Waves, movement, combat, rewards and outcomes |
| `pixel-campaign-render-kit` | World, HUD, minimap and terminal projection |
| `legacy-gamehost-diagnostics-kit` | Public state readback and direct commands |
| `menu-static-check-kit` | Menu source-marker checks |
| `campaign-static-check-kit` | Campaign source-marker checks |
| `static-build-copy-kit` | Static output assembly |
| `pages-deploy-kit` | GitHub Pages delivery |
| `construct-spiral-intro-kit` | Intro choreography |
| `construct-spiral-schedule-kit` | Ring and piece timing |
| `construct-piece-id-kit` | Construction identity |
| `construct-piece-state-kit` | Construction state projection |
| `construct-sequence-update-kit` | Sequence advancement |

```txt
implemented source-backed kits: 20
planned settings-authority surfaces: 22
```

## Source-backed findings

```txt
settings storage key: phantomCommand.menuSettings
stored fields: crt, grain, ambience
settings schema version: absent
settings revision: absent
write verification: absent
menu application: immediate and implicit
campaign settings read: absent
campaign CRT policy: hard-coded true
campaign grain policy: hard-coded low
campaign ambience capability declaration: absent
route settings handoff result: absent
public campaign settings readback: absent
first settings-frame acknowledgement: absent
source/build/Pages parity fixture: absent
```

## Required authority

```txt
phantom-command-settings-route-adoption-visible-frame-authority-domain
```

## Required transaction

```txt
SettingsChangeCommand
  -> bind SettingsSchemaVersion, SettingsRevision and RouteGeneration
  -> normalize and validate a detached SettingsCandidate
  -> classify route support for crt, grain and ambience
  -> stage, verify and promote the canonical settings document
  -> prepare menu or campaign presentation participants
  -> atomically adopt supported settings or preserve predecessor values
  -> publish SettingsAdoptionResult and capability receipts
  -> expose accepted settings through route-safe public readback
  -> publish FirstSettingsRevisionFrameAck
  -> repeat admission when the successor route starts
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, audio, rendering, package scripts, dependencies, workflows and deployment were not changed. `npm run check`, build, browser and Pages fixtures were not run.