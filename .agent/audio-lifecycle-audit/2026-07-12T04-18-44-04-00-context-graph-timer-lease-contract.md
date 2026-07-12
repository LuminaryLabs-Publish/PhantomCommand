# Audio Lifecycle Audit: Context, Graph and Timer Lease Contract

**Timestamp:** `2026-07-12T04-18-44-04-00`

## Context contract

```txt
audioSessionId
contextGeneration
desiredState
observedState
gestureAdmissionId
lastStateChangeAtMs
```

## Lease contract

```txt
master gain lease
drone oscillator lease
wind source lease
filter/gain node leases
UI tone voice leases
delayed close timer lease
```

## Retirement transaction

```txt
suspend new voice admission
cancel/fence predecessor timers
ramp or stop according to policy
stop/disconnect owned sources
close or suspend context
observe terminal context state
release leases
publish AudioRetirementResult
```

## Stale callback rule

A delayed callback carries `audioSessionId` and `contextGeneration`. It may close only the exact predecessor context it owns and cannot mutate current audio state.

## Proof

```txt
zero mandatory live leases after retire
one active graph after rapid toggle
suspended context resumes only after accepted gesture
bfcache and navigation follow explicit policy
settings observation matches lifecycle result
```
