# Interaction Audit: Gesture, Visibility and Audio Command Map

**Timestamp:** `2026-07-12T04-18-44-04-00`

## Current ingress

```txt
pointerdown -> ensureAudio
keydown -> ensureAudio
settings toggle -> ensureAudio or stopAmbience
transition -> no audio command
visibility/pagehide/pageshow -> no audio command
```

## Required ingress

```txt
qualifying gesture -> START_OR_RESUME
ambience off -> SUSPEND_OR_RETIRE
visibility hidden -> policy-driven SUSPEND
visibility visible -> gesture-gated RESUME candidate
pagehide persisted -> BFCACHE_SUSPEND
pagehide not persisted -> RETIRE
transition -> TRANSFER_OR_RETIRE
```

Every command returns accepted, rejected or no-change with session and generation identity. Repeated events must be idempotent.
