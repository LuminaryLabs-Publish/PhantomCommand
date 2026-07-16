# Architecture Audit — Campaign Audio Event Projection DSK Map

**Timestamp:** `2026-07-16T00-00-40-04-00`  
**Status:** `campaign-audio-event-projection-authority-audited`

## Summary

Campaign simulation, visual rendering and menu audio already have distinct ownership. The missing architectural seam is a campaign-audio projection domain that consumes accepted campaign results, owns browser-audio lifecycle and publishes typed effect evidence.

## Plan ledger

**Goal:** define the smallest DSK composition that adds campaign sound without merging audio, gameplay, input or rendering authority.

- [x] Preserve campaign simulation as the source of gameplay truth.
- [x] Preserve the CRT renderer as visual presentation only.
- [x] Preserve menu audio as route-local menu presentation.
- [x] Define one campaign-audio parent domain.
- [x] Define semantic-event, cue, lifecycle, preference, budget and proof child kits.
- [ ] Implement the domain and validate provider behavior.

## Existing domain boundaries

```txt
menu domain
  menu state settings save presence route
  -> menu-audio-kit
  -> menu Canvas2D and CRT

campaign domain
  campaign state fixed-step simulation commands and results
  -> pixel-campaign-render-kit
  -> Canvas2D and CRT

missing projection seam
  accepted campaign transition
  -> no CampaignAudioEvent
  -> no audio result
```

## Required parent domain

`phantom-command-campaign-audio-event-projection-authority-domain`

The parent owns composition and policy, not campaign truth or raw browser input.

## Child DSK map

| Surface | Ownership |
|---|---|
| `campaign-audio-capability-observer-kit` | Detect supported browser audio capabilities. |
| `campaign-audio-gesture-unlock-kit` | Admit one accepted user gesture and report unlock state. |
| `campaign-audio-context-lifecycle-kit` | Create, suspend, resume and retire the campaign context and buses. |
| `campaign-audio-policy-kit` | Define mute, volume, priority, spatial and lifecycle policy. |
| `campaign-audio-event-id-kit` | Allocate stable session-scoped semantic event identity. |
| `campaign-audio-transition-adapter-kit` | Convert accepted campaign transitions into immutable audio events. |
| `campaign-audio-cue-registry-kit` | Resolve semantic events to procedural cue descriptors. |
| `campaign-wave-cue-kit` | Wave start, spawn and clear cues. |
| `campaign-build-order-cue-kit` | Structure build, selection and order cues. |
| `campaign-combat-cue-kit` | Attack, projectile, hit, death and sanctum-damage cues. |
| `campaign-terminal-cue-kit` | Victory and defeat cues. |
| `campaign-ambience-kit` | Graveyard ambience loop ownership. |
| `campaign-listener-projection-kit` | Listener transform from accepted camera state. |
| `campaign-source-projection-kit` | Optional world-source transforms from accepted simulation state. |
| `campaign-audio-preference-kit` | Adopt persisted ambience/mute policy into the campaign route. |
| `campaign-cue-deduplication-kit` | Reject replayed or repeated semantic event IDs. |
| `campaign-voice-budget-kit` | Pool voices and enforce priority/concurrency budgets. |
| `campaign-audio-projection-result-kit` | Publish played, suppressed, failed and retired outcomes. |
| `first-audible-campaign-cue-ack-kit` | Prove one admitted cue reached an audible provider path. |
| `first-campaign-audiovisual-convergence-ack-kit` | Bind one accepted event to matching audio and visible frame evidence. |
| `campaign-audio-browser-fixture-gate-kit` | Define source, build and deployed-origin fixture gates. |

## Command and result flow

```txt
accepted campaign transition
  -> CampaignAudioEventId
  -> CampaignAudioProjectionCommand
  -> capability preference lifecycle and budget admission
  -> cue descriptor and optional source transform
  -> audio provider effect
  -> CampaignAudioProjectionResult
  -> audible acknowledgement
  -> matching visible-frame acknowledgement
```

## Ownership constraints

- Raw `keydown`, `pointerdown` or `pointerup` must not assert successful sound-worthy gameplay.
- The renderer must not infer semantic events from visual differences.
- The menu AudioContext must not become an implicit campaign singleton.
- Campaign audio may read accepted camera/world snapshots but may not mutate them.
- A muted or unavailable provider still publishes a typed suppression result.
- Route retirement must settle all loops, scheduled envelopes and voices.

## Validation boundary

This is a documentation architecture. No DSK, provider, event adapter or fixture is implemented.