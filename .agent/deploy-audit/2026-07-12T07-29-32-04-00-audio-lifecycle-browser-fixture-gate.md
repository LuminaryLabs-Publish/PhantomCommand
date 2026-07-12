# Deploy Audit: Audio Lifecycle Browser Fixture Gate

**Timestamp:** `2026-07-12T07-29-32-04-00`

## Existing checks

`npm run check` performs static source-token checks. It confirms the menu, campaign, CRT and build files contain expected strings. It does not instantiate a browser AudioContext or observe user activation, context state, backgrounding, interruption, rapid toggles or teardown.

## Required deterministic fixtures

```txt
audio lifecycle reducer transitions
audio context generation allocation
stale generation rejection
node registry ownership
delayed close cancellation
rapid off/on replacement
idempotent stop and dispose
typed create, resume, suspend, stop and dispose results
```

## Required browser smokes

```txt
first pointer activation
first keyboard activation
untrusted synthetic input rejection
context starts suspended then resumes on valid gesture
background then foreground recovery
AudioContext statechange interruption
rapid ambience off/on/off sequence
multiple UI tones followed by disposal
Begin transition retirement
Continue transition retirement
pagehide retirement
reload without predecessor graph leakage
```

## Browser matrix

```txt
Chromium
WebKit
Firefox where supported by the test harness
desktop visible/backgrounded tab
mobile-style page lifecycle where available
AudioContext initially running/suspended
ambience persisted on/off
```

## Required evidence

```txt
command and result IDs
menu session ID
context and graph generations
observed context states
node and pending-task counts
statechange journal
navigation/disposal terminal result
absence of stale callback mutation
```

## Gate

Deployment is not audio-lifecycle complete until real-browser evidence proves activation, recovery, replacement and teardown while static checks and the menu remain functional. A non-null `state.audio` object is not proof of running audio.