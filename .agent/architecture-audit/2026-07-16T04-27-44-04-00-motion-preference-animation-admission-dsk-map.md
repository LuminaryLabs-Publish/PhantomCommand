# Architecture Audit — Motion Preference Animation Admission DSK Map

**Timestamp:** `2026-07-16T04-27-44-04-00`  
**Status:** `motion-preference-animation-admission-authority-audited`

## Summary

PhantomCommand has route-local animation and rendering systems but no semantic motion-policy domain. The missing boundary must sit between capability/preferences and presentation adapters, while leaving campaign simulation authoritative.

## Plan ledger

**Goal:** define the smallest domain-service-kit family that can admit one motion policy and project it consistently across both routes.

- [x] Keep menu, campaign, rendering, input and simulation ownership unchanged.
- [x] Separate essential gameplay motion from optional presentation motion.
- [x] Bind every adopted policy to document, route and frame revisions.
- [x] Define typed result and first-frame acknowledgement surfaces.
- [ ] Implement providers and fixtures.

## Domain map

```txt
Browser Capability
  -> motion-capability-observer-kit
  -> prefers-reduced-motion state and change events

Product Preference
  -> motion-preference-override-kit
  -> motion-preference-policy-kit
  -> motion-policy-revision-kit

Classification
  -> menu-animation-classifier-kit
  -> campaign-animation-classifier-kit
  -> essential simulation remains active
  -> ornamental motion receives normal/reduced/static policy

Projection
  -> crt-motion-adapter-kit
  -> menu-fog-motion-adapter-kit
  -> menu-parallax-motion-adapter-kit
  -> menu-character-motion-adapter-kit
  -> menu-selection-pulse-adapter-kit
  -> route-transition-motion-adapter-kit
  -> campaign-camera-motion-adapter-kit
  -> campaign-effect-motion-adapter-kit
  -> construction-motion-adapter-kit

Settlement
  -> motion-preference-change-listener-kit
  -> motion-projection-result-kit
  -> first-reduced-motion-menu-frame-ack-kit
  -> first-reduced-motion-campaign-frame-ack-kit
  -> motion-browser-fixture-gate-kit
```

## Parent contract

`phantom-command-motion-preference-animation-admission-authority-domain`

```txt
MotionPreferenceAdmissionCommand {
  documentGeneration
  routeGeneration
  preferenceRevision
  policyRevision
  requestedMode
  operatingSystemPreference
}

MotionProjectionResult {
  acceptedMode
  reducedSurfaces[]
  preservedEssentialSurfaces[]
  suppressedSurfaces[]
  routeGeneration
  frameRevision
  status
}
```

## Ownership rules

- Fixed-step campaign state, combat and terminal settlement remain simulation-owned.
- Input hit testing and command admission must not depend on animation intensity.
- Menu and campaign renderers consume immutable motion policy snapshots.
- Shader, Canvas2D and camera adapters do not infer user preference independently.
- Live media-query changes create a new policy revision and cannot mutate retired routes.
- A reduced-motion acknowledgement requires a presented frame, not only a preference read.

## Implemented domain inventory retained

```txt
menu route and settings
menu audio
procedural menu art
Canvas2D source rendering
WebGL CRT presentation
campaign route and state
fixed-step simulation
campaign rendering
camera and spatial input
local persistence
diagnostics and checks
static build and Pages
construction choreography
```

## Gap boundary

No runtime implementation was added. This architecture does not claim that every motion surface is harmful; it establishes that the product currently has no authority capable of applying a user-selected reduced-motion policy coherently.