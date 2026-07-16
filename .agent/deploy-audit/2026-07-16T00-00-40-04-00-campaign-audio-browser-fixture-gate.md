# Deploy Audit — Campaign Audio Browser Fixture Gate

**Timestamp:** `2026-07-16T00-00-40-04-00`  
**Status:** `campaign-audio-event-projection-authority-audited`

## Summary

Static checks and build copying do not prove browser audio unlock, cue correctness, lifecycle settlement or deployed-origin parity. Campaign audio requires deterministic provider fixtures plus browser runs against source, built output and Pages.

## Plan ledger

**Goal:** define the minimum evidence gate before campaign audio can be called reliable.

- [x] Identify current source checks and static build surfaces.
- [x] Define fake-provider and browser fixture rows.
- [x] Define artifact and Pages parity requirements.
- [ ] Implement and execute the fixture gate.

## Required source checks

```txt
npm run check
npm run build
built artifact contains campaign audio modules
built game.html imports the expected campaign entry
no external audio asset dependency is introduced without policy
```

## Deterministic provider fixtures

- Capability unavailable returns `unavailable` without throwing.
- Locked context returns `locked` and later unlocks from an accepted gesture.
- Muted preference returns `muted` without provider calls.
- Duplicate event IDs produce one provider effect and one duplicate result.
- Voice saturation follows priority and budget policy.
- Provider failure produces `failed` and leaves campaign state unchanged.
- Context retirement stops loops, voices and timers.

## Browser fixtures

| Fixture | Required proof |
|---|---|
| First gesture | Context unlock result and first admitted campaign cue. |
| Persisted ambience off | No ambience starts; semantic events return muted/suppressed results. |
| Wave | One accepted wave-start cue and matching visible frame. |
| Build | Failed build attempt is silent; accepted build plays once. |
| Order | No-selection attempt is silent; accepted order plays once. |
| Combat burst | Voices remain within budget and high-priority sanctum cues survive. |
| Pause/resume | Buses settle and old cues do not replay. |
| Visibility | Hidden/resumed lifecycle produces no stale event playback. |
| Victory/defeat | Exactly one terminal cue for the accepted outcome. |
| Retry/route exit | Previous audio generation is fully retired. |

## Environment matrix

```txt
source dev server
built static output
GitHub Pages deployed origin
Chromium-family browser
Firefox-family browser
WebKit-family browser where supported
```

## Evidence receipts

```txt
CampaignAudioProjectionResult log
voice and bus health snapshot
FirstAudibleCampaignCueAck
FirstCampaignAudioVisualConvergenceAck
build artifact identity
Pages deployment identity
```

## Current status

```txt
npm run check: not run
npm run build: not run
fake audio fixtures: unavailable
browser audio fixtures: unavailable
built-output smoke: not run
Pages-origin smoke: not run
```

No artifact parity, deployed parity or production readiness is claimed.