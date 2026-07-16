# Audio Audit — Campaign Unlock, Cue and Ambience Lifecycle Contract

**Timestamp:** `2026-07-16T00-00-40-04-00`  
**Status:** `campaign-audio-event-projection-authority-audited`

## Summary

The menu already proves that procedural browser audio is feasible, but its AudioContext is route-local and not adopted by the campaign. Campaign audio needs its own explicit unlock, preferences, buses, ambience, cue, budget and retirement contract.

## Plan ledger

**Goal:** define a campaign audio lifecycle that is safe under autoplay policy, pause, visibility changes, retry and route replacement.

- [x] Inspect the menu audio owner and settings key.
- [x] Confirm campaign audio ownership is absent.
- [x] Define unlock and preference admission.
- [x] Define ambience, cue, bus and budget ownership.
- [x] Define lifecycle settlement and typed results.
- [ ] Implement and test the contract.

## Capability and unlock

```txt
game route starts
  -> observe AudioContext capability
  -> read persisted ambience preference
  -> remain locked until accepted campaign user gesture
  -> create or resume one campaign-owned context
  -> publish unlock result
```

The first accepted key or pointer gesture may unlock audio, but it must not imply that the associated gameplay command succeeded.

## Buses

```txt
master
  ambience
  combat
  structures
  UI
  terminal
```

Each bus requires an authored gain policy. The existing menu ambience boolean may initially map to campaign master/ambience admission, but the campaign domain must own its adopted revision.

## Ambience

A procedural graveyard bed may combine low drone, filtered wind and sparse authored accents. It must:

- start only after capability and preference admission;
- avoid creating duplicate loops after repeated gestures;
- suspend or reduce under pause according to policy;
- suspend on hidden documents when required;
- resume without phase or gain spikes;
- stop and disconnect on retry, pagehide or route exit.

## Cue policy

```txt
wave: low-frequency warning and procession layer
build: short construction rise keyed by tower type
order: restrained command confirmation
combat: pooled attack hit and death families
sanctum: prioritized damage alarm
terminal: exclusive victory or defeat settlement
```

High-frequency combat events require pooling, priority and aggregation. The system should not create one unbounded oscillator graph for every hit.

## Deduplication and budgets

```txt
stable CampaignAudioEventId
maximum total voices
maximum voices per cue family
per-frame cue-start budget
priority eviction policy
minimum repeat interval for low-value cues
aggregate near-simultaneous hits when appropriate
```

## Lifecycle settlement

| Boundary | Required behavior |
|---|---|
| Pause | Suspend or duck gameplay buses; publish state. |
| Resume | Restore admitted buses without replaying old events. |
| Blur | Apply authored focus policy and clear pending unlock assumptions. |
| Visibility hidden | Suspend or duck; prevent queued stale cues. |
| Retry/reload | Retire the campaign audio generation. |
| Pagehide/route exit | Stop loops, voices and timers; close or retire the context. |
| Provider failure | Publish failure without changing campaign state. |

## Proof surfaces

```txt
CampaignAudioProjectionResult
FirstAudibleCampaignCueAck
FirstCampaignAudioVisualConvergenceAck
campaign audio health snapshot
browser fixture receipts
```

## Validation boundary

No AudioContext was created during this audit. No audible, lifecycle or budget behavior is proven.