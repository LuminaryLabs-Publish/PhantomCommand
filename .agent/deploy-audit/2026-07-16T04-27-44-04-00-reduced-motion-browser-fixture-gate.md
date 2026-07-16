# Deploy Audit — Reduced Motion Browser Fixture Gate

**Timestamp:** `2026-07-16T04-27-44-04-00`

## Summary

Source inspection cannot prove that operating-system preference, product override, route changes and rendered frames converge in the built artifact or on GitHub Pages. Deployment readiness requires executable normal/reduced/static fixtures.

## Plan ledger

**Goal:** block reduced-motion readiness claims until both routes prove policy adoption and visible-frame convergence in source, built output and Pages delivery.

- [x] Define source-level fixture requirements.
- [x] Define browser capability and live-change fixtures.
- [x] Define artifact and Pages parity gates.
- [ ] Implement the runtime authority.
- [ ] Run the fixtures.

## Required fixtures

```txt
menu boots with OS no-preference -> normal policy and frame ack
menu boots with OS reduce -> reduced policy and frame ack
product normal override supersedes OS reduce
product reduced override supersedes OS no-preference
clearing override returns to OS policy
live media-query change updates active menu route
menu transition retires menu listener and policy generation
campaign boots with the accepted effective policy
normal and reduced command streams produce identical simulation snapshots
reduced campaign frame suppresses temporal CRT flicker and designated motion
route retry/exit rejects stale policy callbacks
```

## Artifact gate

```txt
npm run check
npm run build
serve dist from a static origin
run normal/reduced/static browser fixtures against dist
record policy results and frame acknowledgements
compare source and built behavior
```

## Pages gate

```txt
fetch deployed index.html and game.html
confirm expected artifact revision
run OS and override preference fixtures at Pages origin
confirm menu and campaign frame acknowledgements
record screenshots or frame descriptors for normal and reduced modes
```

## Current status

No runtime motion authority or browser fixture exists. No artifact or Pages parity was tested in this documentation pass.