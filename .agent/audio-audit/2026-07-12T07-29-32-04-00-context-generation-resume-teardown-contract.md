# Audio Audit: Context Generation, Resume and Teardown Contract

**Timestamp:** `2026-07-12T07-29-32-04-00`

## Current graph

```txt
AudioContext
  -> master GainNode
     -> destination
  -> drone OscillatorNode
     -> BiquadFilterNode
     -> GainNode
     -> master
  -> looping wind AudioBufferSourceNode
     -> BiquadFilterNode
     -> GainNode
     -> master
  -> transient UI tone OscillatorNode(s)
     -> GainNode(s)
     -> master
```

Only `context`, `master`, `drone` and `wind` are retained. Filter and gain nodes are not registered. Transient tone nodes are not tracked after scheduling.

## Required lifecycle states

```txt
Absent
Creating
Running
Suspended
Interrupted
Stopping
Disposed
Failed
```

## Required generation model

```txt
AudioSession
  audioSessionId
  contextGeneration
  graphGeneration
  stateRevision
  contextState
  nodeRegistry
  pendingTasks
  lastCommandId
  lastResultId
```

## Create or resume

```txt
observe trusted activation
  -> inspect current context state
  -> Running: return idempotent Running result
  -> Suspended/Interrupted: call resume and observe terminal state
  -> Closed/Failed/Absent: prepare a new graph generation
  -> register every node and scheduled task
  -> commit only after current state is observed
```

## Stop and dispose

```txt
fence new tone creation
  -> cancel generation-owned timers
  -> stop all startable sources exactly once
  -> fade or set master according to policy
  -> disconnect registered nodes
  -> close the context
  -> observe closed terminal state or typed failure
  -> clear the current graph only after terminal result
```

## Rapid replacement

A new graph cannot become current while predecessor delayed work is unowned. Replacement must cancel or absorb predecessor close work and reject stale callbacks by generation.

## Browser lifecycle

```txt
visibility hidden: policy-driven suspend or retain, with result
visibility visible: no implicit resume without admission policy
pagehide: ordered disposal
navigation commit: ordered disposal before ownership transfer
browser interruption: statechange observation and recoverable status
```

## Observability

```txt
context state
context and graph generation
registered node count by type
pending delayed task count
last transition status and reason
activation evidence class
creation/resume/close duration
```

Do not infer audible output solely from node construction or oscillator start calls.