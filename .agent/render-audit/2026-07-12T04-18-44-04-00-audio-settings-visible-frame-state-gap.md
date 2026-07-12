# Render Audit: Audio Settings and Visible Frame State Gap

**Timestamp:** `2026-07-12T04-18-44-04-00`

## Finding

The settings panel renders `ambience` from persisted mutable settings. The visible frame has no knowledge of actual `AudioContext.state`, graph generation, start/resume result or retirement state.

```txt
visible setting: ambience on
possible context states:
  running
  suspended
  interrupted
  closed
  absent
```

## Required projection

The settings frame must cite an immutable audio observation:

```txt
audioSessionId
contextGeneration
desiredAmbience
observedContextState
audibleState
lastLifecycleResultId
```

The UI must not present enabled as equivalent to audible.
