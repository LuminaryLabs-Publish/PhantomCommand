# Known Gaps

**Generated:** `2026-07-16T00-00-40-04-00`  
**Status:** `campaign-audio-event-projection-authority-audited`

## Current priority

- The campaign route creates no `AudioContext` or audio-provider owner.
- Menu ambience and UI tones retire with the menu route and are not a campaign audio domain.
- The campaign does not read or adopt the persisted ambience preference.
- Wave, spawn, build, order, combat, core-damage, pause, victory and defeat transitions have no stable audio event identity.
- No cue descriptor registry exists.
- No campaign ambience lifecycle exists.
- No listener or source projection exists.
- No duplicate-event suppression exists.
- No voice pool, priority or concurrent-voice budget exists.
- Pause, blur, visibility, retry, pagehide and route-exit settlement is absent.
- No `CampaignAudioProjectionResult` exists.
- No `FirstAudibleCampaignCueAck` exists.
- No `FirstCampaignAudioVisualConvergenceAck` exists.
- No browser fixture proves unlock, mute, cue, lifecycle or budget behavior.

## Source-backed evidence

```txt
menu AudioContext and ambience: present
game.html campaign module: campaign-scene.js only
campaign AudioContext: absent
campaign audio import: absent
campaign audio preference adoption: absent
accepted visual transitions: present
campaign cue projection: absent
campaign audible result: absent
```

## Not claimed

```txt
audible campaign gameplay
browser-unlock reliability
persisted mute correctness
cue timing or deduplication
spatial correctness
voice-budget correctness
pause and lifecycle settlement
audiovisual convergence
built artifact or Pages parity
production readiness
```

## Retained gaps

Pointer capture and cancellation, pointer feedback, menu audio lifecycle, public diagnostics, device coverage, render order, pause input, terminal settlement, startup readiness, settings adoption, victory persistence, route retirement, fixed-step scheduling, WebGL recovery, accessibility, combat modifiers, campaign bootstrap, keyboard commands and spatial input remain separately documented.