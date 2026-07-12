# Interaction Audit: User Activation to Audio Admission

**Timestamp:** `2026-07-12T07-29-32-04-00`

## Current map

```txt
document keydown
  -> ensureAudio()
  -> classify key
  -> mutate menu or panel

canvas pointerdown
  -> ensureAudio()
  -> resolve pointer hit
  -> mutate menu or panel

hidden DOM button click
  -> activateMain()
  -> no explicit activation receipt
```

The runtime attempts audio creation before deciding whether a key is relevant. It does not capture `navigator.userActivation`, event trust, command identity, menu session or context generation.

## Required map

```txt
browser event
  -> normalize interaction intent
  -> observe trusted user activation
  -> classify whether audio action is required
  -> issue AudioLifecycleCommand
  -> validate menu session and expected generation
  -> create/resume/no-op/reject
  -> publish AudioLifecycleResult
  -> execute menu command
  -> include audio result in the next detached menu observation
```

## Admission rules

```txt
untrusted synthetic event: cannot create or resume audio
irrelevant key: does not create audio unless explicit prewarm policy admits it
repeated gesture while running: idempotent no-op
valid gesture while suspended/interrupted: resume attempt
closed/failed current context: replacement transaction
stale generation: reject with zero mutation
transition already committed: no new audio graph
```

## Retirement events

```txt
ambience disabled
visibility hidden
pagehide
navigation commit
menu session replacement
module disposal
```

Each event must normalize into an idempotent lifecycle command rather than mutating nodes or timers directly.