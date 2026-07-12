# Architecture Audit: Menu Audio Lifecycle Authority DSK Map

**Timestamp:** `2026-07-12T04-18-44-04-00`

## Current ownership

```txt
graveyard-menu.js
  settings.ambience
  ensureAudio
  stopAmbience
  playUiTone
  transition and RAF

menu-audio-kit
  AudioContext ambience and UI-tone service label
```

## Required parent domain

```txt
phantom-command-menu-audio-lifecycle-authority-domain
```

## Child kits

```txt
audio-session-id-kit
audio-context-generation-kit
audio-start-command-kit
audio-gesture-admission-kit
audio-context-state-observation-kit
audio-context-resume-kit
ambience-graph-lease-kit
ui-tone-voice-lease-kit
audio-settings-adapter-kit
visibility-audio-policy-kit
pagehide-audio-retirement-kit
transition-audio-handoff-kit
audio-stop-command-kit
audio-retirement-result-kit
delayed-close-timer-lease-kit
stale-audio-callback-rejection-kit
audio-observation-kit
audio-journal-kit
suspended-context-resume-fixture-kit
audio-toggle-churn-fixture-kit
audio-bfcache-fixture-kit
transition-audio-teardown-smoke-kit
```

## Dependency direction

```txt
menu/settings/gesture/page lifecycle adapters
  -> audio command admission
  -> context-state observation
  -> graph/voice/timer lease mutation
  -> typed lifecycle result
  -> detached observation
  -> settings/frame projection
```

## Invariants

```txt
one active audio generation per menu session
every node and timer has a lease
stale timers cannot close current generation
suspended context requires gesture-qualified resume
navigation/pagehide returns a retirement or transfer result
raw AudioContext never becomes a public capability
```
