# Next Steps

**Generated:** `2026-07-16T04-27-44-04-00`  
**Status:** `motion-preference-animation-admission-authority-audited`

## Plan ledger

**Goal:** add one motion-preference authority that preserves gameplay truth while adapting optional presentation across menu and campaign routes.

- [ ] Add `matchMedia('(prefers-reduced-motion: reduce)')` observation with a removable change listener.
- [ ] Add a versioned product override with `system`, `normal`, `reduced` and optional `static` modes.
- [ ] Resolve one effective motion policy and monotonic policy revision.
- [ ] Bind policy adoption to document and route generations.
- [ ] Classify fixed-step campaign simulation as essential and route-local animation as presentation.
- [ ] Adapt menu fog drift, star twinkle, crow flap, reaper sway, selection pulse and pointer parallax.
- [ ] Replace reduced-motion menu transitions with a brief dissolve or immediate route change.
- [ ] Disable temporal CRT flicker and use static or no grain in reduced/static modes.
- [ ] Shorten or remove campaign camera easing without changing camera targets.
- [ ] Replace nonessential hit/projectile motion with low-displacement opacity or static markers.
- [ ] Shorten or collapse construction choreography while preserving final piece state.
- [ ] Keep wave cadence, unit movement, targeting, damage, rewards and terminal settlement unchanged.
- [ ] Publish `MotionProjectionResult` for accepted, unchanged, superseded, unsupported, invalid and retired work.
- [ ] Publish `FirstReducedMotionMenuFrameAck` and `FirstReducedMotionCampaignFrameAck`.
- [ ] Add normal/reduced/static fixtures for menu and campaign routes.
- [ ] Prove identical campaign simulation snapshots under normal and reduced presentation.
- [ ] Prove live OS preference changes cannot write into a retired route.
- [ ] Run `npm run check`, `npm run build`, built-output smoke and Pages-origin fixtures.

## Required first vertical slice

```txt
OS reports prefers-reduced-motion
  -> MotionPreferenceAdmissionCommand
  -> reduced policy revision
  -> menu fog/parallax/pulse and CRT adapters
  -> MotionProjectionResult
  -> presented reduced-motion menu frame
  -> FirstReducedMotionMenuFrameAck
```

## Keep separate

Campaign simulation, input admission, audio, persistence, WebGL recovery, route retirement and deployment remain separate authorities composed through route, policy and frame revisions.