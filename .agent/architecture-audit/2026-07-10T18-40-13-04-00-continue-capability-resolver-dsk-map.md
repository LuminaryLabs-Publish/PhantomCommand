# Continue Capability Resolver DSK Map

**Timestamp:** `2026-07-10T18-40-13-04-00`

## Current authority

```txt
src/menu/graveyard-menu.js
  owns candidate keys
  owns storage access
  owns raw presence checks
  owns Continue enabled/note projection
  owns new/continue route emission

src/campaign/campaign-scene.js
  owns descriptors
  owns campaign state and counters
  owns input and command mutation
  owns fixed-step simulation
  owns persistence write
  owns world/UI/CRT rendering
  owns GameHost diagnostics
```

The menu and campaign have no shared session or persistence authority.

## Current DSK inventory

| Kit | Service | Authority |
|---|---|---|
| `menu-route-kit` | selection, panels, route transition | menu module |
| `menu-save-presence-kit` | Boolean scan of three keys and two layers | menu module |
| `menu-settings-persistence-kit` | CRT, grain, ambience preferences | menu module |
| `campaign-route-shell-kit` | campaign canvas route | game page |
| `pixel-campaign-runtime-kit` | descriptors, state, commands, simulation, save, render | campaign module |
| `fixed-step-campaign-simulation-kit` | 1/60 accumulator updates | campaign module |
| `pixel-campaign-render-kit` | world, HUD, minimap, modal, CRT | campaign module |
| `legacy-gamehost-diagnostics-kit` | mutable runtime surface and counters | campaign module |
| `campaign-static-check-kit` | source-pattern checks | Node scripts |
| `static-build-copy-kit` | deployment artifact copy | Node scripts |

## Proposed composed boundary

```txt
phantom-command-candidate-slot-registry-kit
  -> declares 6 stable slots

phantom-command-save-classifier-kit
  -> parses and classifies one raw candidate

phantom-command-candidate-precedence-kit
  -> ranks classified candidates deterministically

phantom-command-save-candidate-resolver-kit
  -> enumerates once
  -> returns all rows
  -> selects at most one winner

phantom-command-continue-capability-kit
  -> projects continueEnabled and decisionReason

phantom-command-candidate-provenance-kit
  -> exposes immutable selected and rejected evidence

phantom-command-campaign-session-mode-kit
  -> parses new or continue intent
```

## Required service contracts

### Candidate slot

```txt
slotId
key
storageLayer
owner
schemaFamily
priority
```

### Classification row

```txt
slotId
present
readStatus
parseStatus
classification
schemaVersion
sceneId
fingerprint
resumable
reason
```

### Resolution result

```txt
inspectedCandidates[]
selectedCandidate | null
continueEnabled
selectionPolicyVersion
decisionReason
```

## Composition rule

The menu and campaign must consume the same resolver implementation and policy version. Neither may reimplement key order, storage order, classification, or fallback rules.

## Dependency order

```txt
slot registry
  -> classifier
  -> precedence policy
  -> resolver
  -> Continue capability projection
  -> menu integration
  -> campaign session-mode integration
  -> full save envelope and hydration
```

## Safe boundary

Do not extract the full campaign runtime or renderer during this slice. The next change should be additive, DOM-free at its core, and preserve all current gameplay and visual behavior.