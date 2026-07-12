# Gameplay Audit: Public Owner Bypass Loop

**Timestamp:** `2026-07-11T23-28-29-04-00`

## Summary

The public campaign host can alter live gameplay state without using selection, build, wave, combat or terminal admission. This makes automation and diagnostics a second gameplay authority and invalidates assumptions made by the fixed-step loop, persistence and terminal rendering.

## Plan ledger

**Goal:** identify every gameplay authority bypass reachable through the public host and define zero-mutation rejection requirements.

- [x] Inspect raw state fields exposed through `GameHost.state`.
- [x] Inspect direct public mutators.
- [x] Trace update and terminal early exits.
- [x] Define representative bypass loops.
- [x] Define gameplay fixture requirements.
- [ ] Replace bypasses with typed commands.

## Bypass loops

### Terminal fabrication

```txt
GameHost.state.won = true
  -> next fixed update returns immediately
  -> next render shows GRAVE RING SECURED
  -> no final-wave predicate
  -> no exclusive terminal transaction
  -> no success persistence receipt
```

### Economy fabrication

```txt
GameHost.state.souls = 999999
  -> build cost checks accept the fabricated balance
  -> no economy command or audit result
```

### Entity graph replacement

```txt
GameHost.state.units = {}
  -> existing unit references held by local code become detached
  -> enemy/allied queries see a replacement collection
  -> no combat, death or liveness result
```

### Wave manipulation

```txt
GameHost.state.wave = 5
GameHost.state.waveActive = false
GameHost.startWave()
  -> wave six queue is admitted without prior-wave proof
```

### Camera poison

```txt
GameHost.setZoom(NaN)
  -> non-finite targetZoom
  -> non-finite zoom on the next frame
  -> invalid world/screen transforms
```

## Required gameplay policy

```txt
public host cannot set gameplay fields
public host cannot replace entity collections
public host cannot set terminal flags
public host cannot set camera internals
host wave/build/camera requests use typed commands
host commands obey the same active/paused/terminal policy as browser input
host commands are scheduled against one fixed simulation tick
host commands return typed results and later frame receipts
```

## Required fixtures

```txt
raw state property absent
raw camera property absent
attempted mutation of read model has no runtime effect
terminal fabrication impossible
souls fabrication impossible
entity collection replacement impossible
wave skip rejected
build without valid selected pad rejected
build during pause or terminal rejected
NaN zoom rejected with zero camera mutation
browser and host command parity
```

## Validation boundary

No gameplay behavior changed. The bypasses remain active until implementation and fixtures land.
