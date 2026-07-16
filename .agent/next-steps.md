# Next Steps

**Generated:** `2026-07-16T00-00-40-04-00`  
**Status:** `campaign-audio-event-projection-authority-audited`

## Plan ledger

**Goal:** add one lifecycle-safe campaign-audio projection downstream of accepted campaign transitions.

- [ ] Add stable `CampaignAudioEventId`, campaign session generation and frame revision values.
- [ ] Convert accepted wave start, spawn, build, order, attack, hit, death, core-damage, pause, victory and defeat transitions into immutable semantic audio events.
- [ ] Keep event creation in campaign-result settlement rather than raw keyboard or pointer handlers.
- [ ] Add campaign audio capability observation and accepted user-gesture unlock.
- [ ] Create one campaign `AudioContext` owner with master, ambience, effects and UI buses.
- [ ] Read the existing `phantomCommand.menuSettings` ambience preference without letting menu code own campaign lifecycle.
- [ ] Define deterministic cue descriptors and procedural providers for wave, build, order, combat, sanctum and terminal events.
- [ ] Add graveyard ambience that starts, suspends, resumes and retires with the campaign route.
- [ ] Project listener and source positions from the accepted camera and world frame where spatial cues add value.
- [ ] Deduplicate events by campaign session and event identity.
- [ ] Add voice pools, priority, maximum concurrent voices and per-frame cue budgets.
- [ ] Settle loops and contexts on pause, blur, visibility loss, pagehide, retry and route exit.
- [ ] Publish `CampaignAudioProjectionResult` for played, suppressed, duplicate, muted, suspended, failed and retired work.
- [ ] Publish `FirstAudibleCampaignCueAck` and `FirstCampaignAudioVisualConvergenceAck`.
- [ ] Add fake-clock and fake-audio provider fixtures.
- [ ] Add browser fixtures for unlock, persisted mute, wave, build, combat, terminal, pause/resume and route retirement.
- [ ] Prove rapid combat does not exceed the voice budget.
- [ ] Run `npm run check`, `npm run build`, built-output smoke and Pages-origin audio smoke.

## Required first vertical slice

```txt
accepted startWave result
  -> CampaignAudioEventId
  -> campaign audio capability and unlock admission
  -> wave cue descriptor
  -> bounded provider effect
  -> CampaignAudioProjectionResult
  -> matching visible wave frame
  -> FirstCampaignAudioVisualConvergenceAck
```

## Keep separate

Menu audio, campaign simulation, pointer admission, fixed-step scheduling, rendering, persistence and deployment remain separate authorities composed by event and frame revisions.