# Continue Capability Resolver DSK Map

**Timestamp:** `2026-07-11T01-20-51-04-00`

## Goal

Replace independent menu presence checks and campaign fresh-start behavior with one source-neutral session-admission decision shared by all startup consumers.

## Current topology

```txt
menu-save-presence-kit
  -> SAVE_KEYS
       phantomCommand.save
       nexus.sceneSnapshot
       phantom.command.campaign
  -> localStorage lookup
  -> sessionStorage lookup
  -> Boolean presence
  -> menu Continue enabled/disabled
  -> URL query campaign=continue
  -> campaign route ignores query
  -> fresh campaign state
```

## Active domains

```txt
route shell domain
menu presentation domain
menu settings domain
save-presence domain
menu transition domain
campaign route domain
campaign content domain
campaign state domain
fixed-step simulation domain
input domain
camera domain
world render domain
HUD domain
minimap domain
modal domain
CRT presentation domain
victory-summary persistence domain
PhantomMenu diagnostic domain
GameHost diagnostic domain
static validation domain
Pages deployment domain
central audit-ledger domain
```

## Implemented kits and services

```txt
crt-renderer-kit
  WebGL setup, source texture upload, nearest filtering, CRT transform, grain, aberration, fade, resize, screen-to-source conversion

graveyard-art-kit
  procedural menu scene and animation

menu-route-kit
  selection, panel control, activation, fade, new/continue URL emission

menu-settings-persistence-kit
  CRT, grain, and ambience settings read/write

menu-save-presence-kit
  three-key by two-layer non-empty-value scan

menu-audio-kit
  lazy AudioContext, drone, wind, and UI tones

campaign-route-shell-kit
  campaign canvas entry point

pixel-campaign-runtime-kit
  descriptors, mutable state, input, simulation, rendering, victory summary, diagnostics

fixed-step-campaign-simulation-kit
  accumulator and exact 1/60 simulation steps

pixel-campaign-render-kit
  world, entities, selection, HUD, minimap, terminal modal, CRT projection

legacy-gamehost-diagnostics-kit
  mutable state/camera access, direct startWave/build, aggregate clone, zoom control

menu-static-check-kit
  menu source-shape checks

campaign-static-check-kit
  campaign source-shape checks

static-build-copy-kit
  dist artifact copy

pages-deploy-kit
  syntax checks, source checks, artifact checks, Pages upload/deploy

retained construct kits
  historical construct profile proof, inactive in the live campaign
```

## Missing composed domain

```txt
phantom-command-session-admission-domain
  -> save-slot-registry-kit
  -> save-candidate-reader-kit
  -> save-candidate-parser-kit
  -> save-candidate-classifier-kit
  -> save-candidate-precedence-kit
  -> continue-capability-decision-kit
  -> route-session-intent-kit
  -> campaign-startup-admission-kit
  -> session-admission-observation-kit
  -> candidate-resolver-fixture-kit
```

## Required contracts

### Slot registry

Each physical location needs a stable identity:

```txt
local:phantomCommand.save
session:phantomCommand.save
local:nexus.sceneSnapshot
session:nexus.sceneSnapshot
local:phantom.command.campaign
session:phantom.command.campaign
```

A slot row must include layer, key, priority, expected authority, and supported adapters.

### Candidate classification

```txt
absent
unreadable
invalid-json
foreign-shape
unsupported-version
legacy-completion-summary
legacy-resumable
current-resumable
migrated-resumable
```

### Decision result

```js
{
  continueEnabled,
  selectedCandidate,
  inspectedCandidates,
  decisionReason,
  resolverVersion,
  decisionFingerprint
}
```

### Startup admission

```txt
route intent
  -> new | continue | invalid
  -> resolver decision
  -> accepted fresh start
     accepted resume
     rejected continue
     rejected invalid intent
  -> immutable startup result
```

## Ownership rule

The menu may project the decision but must not own candidate policy. The campaign may consume the selected candidate but must not rescan storage independently. `PhantomMenu`, `GameHost`, tests, and future replay tools must read the same immutable decision.

## Dependency order

```txt
slot registry
  -> reader
  -> parser
  -> classifier
  -> precedence
  -> decision
  -> route intent
  -> startup admission
  -> diagnostic projection
  -> fixtures
```
