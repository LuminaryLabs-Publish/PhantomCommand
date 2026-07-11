# Terminal Outcome Fixture Gate

**Timestamp:** `2026-07-11T13-28-37-04-00`

## Summary

The existing build and source checks cannot prove terminal outcome exclusivity. Deployment should remain blocked from claiming terminal correctness until pure fixed-step, persistence, replay, browser presentation and restart fixtures pass.

## Plan ledger

**Goal:** define the minimum executable evidence required before the terminal-outcome authority can be treated as deploy-safe.

- [x] Review current check and build coverage.
- [x] Identify missing terminal behavior tests.
- [x] Define fixture commands and assertions.
- [x] Define deployment evidence requirements.
- [ ] Implement fixtures and wire them into CI.

## Current coverage

```txt
npm run check
  -> source-pattern validation

npm run build
  -> static file copy

GitHub Pages workflow
  -> install
  -> build
  -> upload artifact
  -> deploy
```

These checks do not execute campaign state transitions.

## Required scripts

```txt
npm run fixture:terminal-outcome
npm run fixture:terminal-persistence
npm run fixture:terminal-replay
npm run fixture:terminal-frame
npm run fixture:terminal-restart
npm run smoke:terminal-browser
```

## Pure outcome fixture matrix

```txt
active non-terminal tick -> NONE
core reaches zero -> DEFEAT
final wave clear with positive core -> VICTORY
core zero plus final clear -> DEFEAT
repeat terminal evaluation -> idempotent
second different outcome -> rejected
stale run epoch -> rejected
```

## Persistence fixture matrix

```txt
VICTORY + core positive -> success candidate accepted
DEFEAT -> success candidate rejected
simultaneous breach/clear -> success candidate rejected
fingerprint mismatch -> rejected
storage exception -> observed failure, outcome unchanged
```

## Replay fixture

Record the command and event journal for:

```txt
final wave
last enemy breach
simultaneous clear evidence
```

Replay must reproduce:

```txt
same terminal outcome
same terminal reason
same state fingerprint
same persistence decision
```

## Browser fixture

Assert the first terminal frame displays:

```txt
DEFEAT for core 0 simultaneous case
HUD core 0
no victory persistence
one terminal result ID across overlay and GameHost
```

## Restart fixture

```txt
terminal result committed
  -> R or GameHost restart
  -> prior run resources disposed
  -> run epoch advances
  -> prior result rejected as stale
  -> first new-run frame is ACTIVE and uncorrelated with predecessor outcome
```

## CI gate

The Pages deploy job should run the fixture suite before artifact upload. A deployment may claim terminal correctness only when the commit SHA, fixture output and deployed artifact SHA are recorded together.

## Current status

```txt
terminal outcome fixture: absent
terminal persistence fixture: absent
terminal replay fixture: absent
terminal frame fixture: absent
terminal restart fixture: absent
browser terminal smoke: absent
CI gate: absent
```