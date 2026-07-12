# Architecture Audit: Menu Audio Activation and Lifecycle DSK Map

**Timestamp:** `2026-07-12T07-29-32-04-00`

## Current ownership

```txt
src/menu/graveyard-menu.js
  -> settings.ambience
  -> state.audio
  -> ensureAudio()
  -> stopAmbience()
  -> playUiTone()
  -> document keydown
  -> canvas pointerdown
  -> transition and recursive RAF
```

The menu module owns policy, browser activation, node construction, graph mutation, delayed close, settings projection and navigation timing in one ambient scope.

## Required parent domain

```txt
phantom-command-menu-audio-activation-lifecycle-authority-domain
```

## DSK decomposition

```txt
identity
  phantom-command-audio-session-id-kit
  phantom-command-audio-context-generation-kit
  phantom-command-audio-graph-generation-kit

admission
  phantom-command-audio-user-activation-evidence-kit
  phantom-command-audio-activation-command-kit
  phantom-command-audio-activation-admission-kit

state and capability
  phantom-command-audio-context-state-kit
  phantom-command-audio-context-statechange-adapter-kit
  phantom-command-audio-node-registry-kit

transactions
  phantom-command-audio-resume-transaction-kit
  phantom-command-audio-suspend-transaction-kit
  phantom-command-audio-stop-transaction-kit
  phantom-command-audio-navigation-retirement-kit
  phantom-command-audio-disposal-kit

scheduled work
  phantom-command-audio-delayed-close-kit
  phantom-command-audio-delayed-work-cancellation-kit

browser lifecycle
  phantom-command-audio-visibility-adapter-kit
  phantom-command-audio-pagehide-adapter-kit

results and proof
  phantom-command-audio-command-result-kit
  phantom-command-audio-observation-kit
  phantom-command-audio-journal-kit
  phantom-command-audio-activation-fixture-kit
  phantom-command-audio-background-resume-fixture-kit
  phantom-command-audio-rapid-toggle-fixture-kit
  phantom-command-audio-navigation-teardown-smoke-kit
```

## Required result

```txt
AudioLifecycleResult
  commandId
  audioSessionId
  contextGeneration
  graphGeneration
  requestedAction
  previousState
  observedState
  status
  nodeCount
  pendingTaskCount
  userActivationObserved
  reason
  committedAtMs
```

Statuses:

```txt
CreatedRunning
Resumed
Suspended
Stopped
Disposed
RejectedNoActivation
RejectedStaleGeneration
FailedCreation
FailedResume
FailedStop
FailedDispose
```

## Atomic boundary

A replacement graph must be prepared and observed before becoming current. Predecessor timers and nodes must be retired or explicitly transferred. A failed candidate must not clear or corrupt the current graph.

## Dependencies

```txt
Runtime Session Lifecycle Authority
  -> Menu Audio Activation and Lifecycle Authority
  -> menu settings projection
  -> transition/navigation retirement
  -> browser fixture gate
```

Do not place context-state policy in the renderer or infer running audio from a non-null JavaScript object.