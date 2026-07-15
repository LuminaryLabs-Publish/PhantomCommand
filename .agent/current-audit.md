# PhantomCommand Current Audit

**Timestamp:** `2026-07-15T13-41-25-04-00`  
**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Status:** `menu-audio-unlock-lifecycle-authority-audited`

## Summary

The menu creates an `AudioContext`, persistent drone, looping wind and transient UI tones after input. Existing suspended contexts are not explicitly resumed, route and visibility transitions do not settle the graph, persistent sources are not retired individually, delayed context close is not generation-bound and no audible/silent lifecycle results exist.

## Plan ledger

**Goal:** turn menu audio from helper-owned mutable resources into a versioned unlock, projection, settlement and retirement authority.

- [x] Trace audio creation, persistent sources and transient cues.
- [x] Trace the ambience preference shutdown path.
- [x] Trace visual fade, navigation and missing audio settlement.
- [x] Define command, result, retirement and acknowledgement surfaces.
- [ ] Implement the authority.
- [ ] Add unlock, suspended-context, visibility, route, retirement and stale-callback fixtures.
- [ ] Prove source, build and Pages parity.

## Current source path

```txt
accepted pointer or keyboard input
  -> ensureAudio
  -> create AudioContext master drone and looping wind
  -> or return immediately when state.audio already exists

menu interaction
  -> playUiTone creates a transient oscillator and gain

ambience disabled
  -> fade master
  -> schedule context.close after 300 ms

New or Continue
  -> play transition tone
  -> render visual fade
  -> assign window.location.href
  -> no explicit audio settlement result
```

## Required authority

```txt
phantom-command-menu-audio-unlock-lifecycle-authority-domain
```

## Validation boundary

Documentation only. No audio, product source, gameplay, rendering, persistence, tests, build or deployment behavior changed.