# PhantomCommand Current Audit

**Timestamp:** `2026-07-12T05-49-04-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`

## Summary

The menu distinguishes Begin and Continue in its URL, but the campaign runtime does not read the query string or any saved state. Continue is enabled through a presence-only scan across three legacy keys. Every launch constructs the same default campaign, and the only terminal save payload is written on victory without schema, version, commit result or later hydration.

## Plan ledger

**Goal:** define one authoritative campaign bootstrap transaction without changing runtime behavior in this documentation pass.

- [x] Compare the full Publish inventory with central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand` as the oldest eligible repository.
- [x] Inspect menu storage scanning, transition routing, campaign startup, fixed-step state, terminal persistence, restart and public host exposure.
- [x] Identify the complete interaction loop, domains, all 20 implemented kits and offered services.
- [x] Trace every available save key and every campaign storage read/write.
- [x] Define launch intent, save envelope, migration, quarantine, hydration, commit result and frame-proof boundaries.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection state

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new/ledger-missing/root-agent-missing eligible repositories: 0
oldest eligible central timestamp: PhantomCommand at 2026-07-12T04-18-44-04-00
selected repository: LuminaryLabs-Publish/PhantomCommand
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu module evaluation
  -> create source canvas, CRT renderer and graveyard art
  -> read settings
  -> scan SAVE_KEYS in localStorage and sessionStorage
  -> mark Continue enabled when any stored value is truthy
  -> install input listeners and recursive RAF
  -> publish window.PhantomMenu

Begin Campaign
  -> beginTransition("./game.html?campaign=new")
  -> fade
  -> assign window.location.href

Continue
  -> beginTransition("./game.html?campaign=continue")
  -> fade
  -> assign window.location.href

campaign module evaluation
  -> create source canvas and CRT renderer
  -> construct authored rings, pads, waves and archetypes
  -> construct camera, input and default mutable state
  -> create six default player units
  -> ignore location.search
  -> read no save key
  -> start recursive fixed-step RAF
  -> publish window.GameHost

campaign victory
  -> set won and terminal message
  -> write phantomCommand.save with scene, souls and wave
  -> return no persistence result
  -> render terminal overlay
```

## Source-backed findings

```txt
menu launch URLs: campaign=new and campaign=continue
campaign query parsing: absent
campaign storage reads: absent
save-key precedence: absent
candidate parse result: absent
schema/version: absent
migration: absent
invalid save quarantine: absent
new-run reset policy: absent
runtime hydration: absent
entity reference validation after hydrate: absent
entity counter reseeding after hydrate: absent
save commit result: absent
resume observation: absent
first resumed frame receipt: absent
```

### Presence-only Continue admission

`hasCampaignSave()` checks these keys:

```txt
phantomCommand.save
nexus.sceneSnapshot
phantom.command.campaign
```

For each key it accepts any truthy localStorage or sessionStorage string. It does not parse JSON, identify the producer, check a scene, validate a version or prove compatibility with the current campaign module.

### Begin and Continue collapse

```txt
Begin
  -> game.html?campaign=new

Continue
  -> game.html?campaign=continue

campaign-scene.js
  -> never reads location.search
  -> never reads storage
  -> always initializes souls=145, core=24, wave=0
  -> always creates the same six player units
```

The routes are visually distinct but behaviorally equivalent at campaign bootstrap.

### Winning save is not a checkpoint

The terminal write contains only:

```json
{"scene":"grave-ring","souls":0,"wave":0}
```

The actual values vary, but the shape omits core health, wave-active state, spawn queue, units, towers, projectiles, effects, selection, pad selection, tower type, pause state, camera, time, accumulator, entity counters, schema version, content fingerprint and commit revision. No source consumes even this minimal payload.

### New-run semantics are also undefined

A Begin launch does not clear, replace or supersede an older save. Returning to the menu can therefore continue to display `BOUND` even after choosing Begin. There is no policy defining whether new-run admission must archive, retain or remove the predecessor save.

### Restart semantics

The campaign `R` key calls `location.reload()`. The current query remains in the URL, but because launch intent is ignored, reload always reconstructs the default campaign. It is neither a typed new-run transaction nor a resumed checkpoint transaction.

## Domains in use

```txt
static menu and campaign route shells
menu selection panels settings save presence and fade transition
campaign launch-intent parsing and bootstrap admission gap
save key ownership envelope validation migration quarantine and commit gap
campaign state construction and runtime hydration gap
procedural graveyard source rendering
CRT WebGL context program buffer texture and projection
Web Audio ambience and UI tone lifecycle
pointer keyboard wheel and browser navigation interaction
campaign rings lanes pads waves economy core and terminal state
selection building orders pause camera and fixed-step simulation
unit tower projectile combat reward and terminal mutation
CPU world HUD minimap and overlay rendering
public menu and campaign host capability projection
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
settings persistence and CRT/ambience selection
presence-only save scanning across legacy keys and storage scopes
procedural graveyard drawing
AudioContext ambience and UI tones
CRT context shader program buffer texture upload and source projection
default campaign content and mutable state construction
selection building orders wave start pause camera and restart
fixed-step spawning AI movement targeting combat rewards and terminal mutation
minimal victory save write
world HUD minimap pause and terminal overlay rendering
mutable public host read and direct mutation
construction intro sequencing
source checks static build and GitHub Pages deployment
```

## Required parent domain

```txt
phantom-command-campaign-bootstrap-resume-authority-domain
```

## Candidate kits

```txt
phantom-command-campaign-launch-intent-kit
phantom-command-save-key-policy-kit
phantom-command-save-envelope-schema-kit
phantom-command-save-version-kit
phantom-command-save-canonicalization-kit
phantom-command-save-parse-result-kit
phantom-command-save-validation-kit
phantom-command-save-migration-kit
phantom-command-save-quarantine-kit
phantom-command-new-run-reset-policy-kit
phantom-command-continue-admission-kit
phantom-command-bootstrap-command-kit
phantom-command-bootstrap-id-kit
phantom-command-bootstrap-generation-kit
phantom-command-runtime-hydration-kit
phantom-command-entity-reference-validation-kit
phantom-command-entity-id-reseed-kit
phantom-command-bootstrap-commit-kit
phantom-command-bootstrap-result-kit
phantom-command-save-commit-kit
phantom-command-save-commit-result-kit
phantom-command-bootstrap-observation-kit
phantom-command-bootstrap-journal-kit
phantom-command-first-resumed-frame-kit
phantom-command-malformed-save-fixture-kit
phantom-command-wrong-key-save-fixture-kit
phantom-command-new-continue-parity-fixture-kit
phantom-command-resume-frame-fixture-kit
phantom-command-menu-campaign-route-smoke-kit
```

## Required invariants

```txt
one explicit launch intent per campaign generation
Continue cannot be admitted from presence alone
only one canonical save key and precedence policy is active
invalid or incompatible payloads never partially hydrate runtime state
new-run handling of predecessor saves is explicit
hydration validates all entity references and reseeds all ID counters
bootstrap commits atomically or leaves the predecessor generation unchanged
save writes return a durable commit result
menu state cites validated resume capability, not raw key presence
first visible resumed frame cites bootstrap ID and campaign generation
static token checks do not substitute for route/storage/browser proof
```

## Validation boundary

Documentation only. Campaign behavior, persistence, rendering, audio, package scripts, dependencies and deployment were not changed.