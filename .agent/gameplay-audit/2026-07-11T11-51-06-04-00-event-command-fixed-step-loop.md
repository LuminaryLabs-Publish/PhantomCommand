# Event, Command and Fixed-Step Gameplay Loop

**Timestamp:** `2026-07-11T11-51-06-04-00`

## Summary

Combat updates are fixed-step, but gameplay commands mutate state in browser callbacks. The logical outcome can depend on whether a callback runs before or after the next RAF accumulator drain.

## Plan ledger

**Goal:** move every authoritative gameplay mutation into deterministic target-tick application.

- [x] Trace wave, selection, construction, order, pause and camera inputs.
- [x] Separate immediate event mutation from fixed simulation mutation.
- [x] Define target-tick and sequence ordering.
- [ ] Implement queueing and replay fixtures.

## Current loop

```txt
keydown Space -> startWave() immediately
keydown P -> paused toggle immediately
keydown 1/2/3 -> tower type immediately
pointerup -> selectAt() or build() immediately
pointerdown RMB -> order() immediately
wheel/middle drag -> camera mutation immediately

RAF -> update(1/60) zero or more times
```

## Failure modes

```txt
same click near tick boundary can affect different simulation ticks
same key sequence can order differently at different frame rates
pause can toggle between accumulator ticks without a command receipt
camera-dependent world target can differ by variable frame integration
GameHost can invoke startWave/build/setZoom outside browser input policy
no replay record can reconstruct the run
```

## Target gameplay loop

```txt
browser or GameHost intent
  -> projection and phase admission
  -> CampaignCommand
  -> sequence + target tick
  -> deterministic queue
  -> apply command before target update
  -> update simulation
  -> publish events and fingerprint
  -> commit tick
```

## Gameplay fixture scenarios

```txt
start wave one tick before and after boundary
build with enough and insufficient souls
order selected units with stable target projection
pause and resume around queued commands
duplicate command ID
stale target tick
terminal-state command rejection
same journal at 20/30/60/120 Hz
```