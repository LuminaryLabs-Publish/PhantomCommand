# Interaction Audit — Motion Preference Command Result Map

**Timestamp:** `2026-07-16T04-27-44-04-00`

## Summary

Motion preference is currently implicit and absent from command admission. The product needs one explicit command/result flow so menu and campaign adapters cannot diverge or apply stale policy after route replacement.

## Plan ledger

**Goal:** map capability and preference changes into one accepted policy and one acknowledged visible frame.

- [x] Define command identity and revision fields.
- [x] Define accepted, superseded, unsupported and retired outcomes.
- [x] Bind menu and campaign frame acknowledgements.
- [ ] Implement the command bus and browser fixtures.

## Command map

```txt
OS media-query observation or product override
  -> MotionPreferenceAdmissionCommand
     documentGeneration
     routeGeneration
     preferenceRevision
     requestedMode
     osReducedMotion
     overrideSource

  -> validate active document and route
  -> resolve effective mode: normal | reduced | static
  -> classify essential and ornamental surfaces
  -> publish MotionPreferenceAdmissionResult

  -> menu/campaign render adapters consume accepted policy revision
  -> present matching frame
  -> publish FirstReducedMotionMenuFrameAck
     or FirstReducedMotionCampaignFrameAck
```

## Result statuses

```txt
accepted
unchanged
superseded
unsupported
invalid-override
retired-route
failed
```

## Interaction guarantees

- Keyboard, pointer and hidden semantic controls keep the same command meaning.
- Reduced motion does not change hit regions or selected menu/campaign state.
- A live operating-system preference change cannot write into a replaced route.
- Product overrides remain explicit and reversible.
- Rendering code receives resolved policy; it does not query user preference independently.
- Frame acknowledgement references the accepted policy revision.

## Missing current state

No motion command, policy result, override control, change listener or reduced-motion frame acknowledgement exists.