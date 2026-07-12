# Render Audit: Audio Setting and Runtime State Gap

**Timestamp:** `2026-07-12T07-29-32-04-00`

## Finding

The settings panel renders `ambience` from persisted preference only. It does not project the actual AudioContext state, graph generation, activation result, interruption state or teardown result.

```txt
visible setting: ambience = on
possible runtime states:
  no context
  context suspended
  context interrupted
  context closed
  old graph fading while a new graph runs
  navigation teardown pending
```

The menu frame can therefore continue to present ambience as enabled while no running context is proven.

## Current render path

```txt
settings.ambience
  -> graveyard art settings panel
  -> CRT source upload
  -> visible ON/OFF projection
```

No audio observation is included in the render descriptor or `window.PhantomMenu.getState()`.

## Required projection contract

```txt
AudioStatusProjection
  preferenceEnabled
  lifecycleStatus
  contextGeneration
  graphGeneration
  observedContextState
  activationRequired
  interruptionReason
  lastResultId
  revision
```

Visual settings may remain simple, but diagnostics must distinguish preference from admitted runtime state. A frame claiming running ambience must cite the audio result and graph generation it observed.

## Proof gate

```txt
preference on + running context
preference on + suspended context
preference on + rejected activation
preference off + graph disposed
rapid off/on with one current generation
navigation frame with retirement pending/completed
```

No visual/audio state-coherence claim is made by the current implementation.