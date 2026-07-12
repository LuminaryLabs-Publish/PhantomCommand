# Gameplay Audit: Begin and Continue Default-State Loop

**Timestamp:** `2026-07-12T05-49-04-04-00`

## Current loop

```txt
Begin
  -> campaign=new
  -> default state

Continue
  -> campaign=continue
  -> default state
```

Default state includes:

```txt
souls: 145
core: 24
wave: 0
waveActive: false
six fixed player units
no towers
no projectiles
camera at origin and zoom 0.78
```

## Save loop

```txt
win final wave
  -> set won
  -> write scene, souls and wave
  -> return to menu later
  -> Continue becomes enabled by key presence
  -> launch Continue
  -> saved payload ignored
  -> default wave-zero state created
```

## Gameplay gaps

```txt
resume location and phase: absent
core-health restoration: absent
unit/tower restoration: absent
spawn queue restoration: absent
camera restoration: absent
selection restoration: absent
won/lost restoration policy: absent
checkpoint timing policy: absent
new-run clearing/archive policy: absent
```

## Required gameplay decision

A campaign save must declare whether it is:

```txt
mid-wave checkpoint
between-wave checkpoint
terminal completion record
menu-only progress marker
```

These are not interchangeable. A terminal completion record should not silently masquerade as a mid-campaign Continue checkpoint.

## Required fixtures

```txt
new run starts canonical defaults
between-wave save resumes exact economy, core, towers and units
mid-wave policy is either supported fully or rejected explicitly
terminal completion resumes through a declared completion policy
Begin does not accidentally inherit predecessor runtime state
Continue never falls back silently to a clean run
```

The current game remains playable as a clean run, but Continue does not currently continue gameplay.