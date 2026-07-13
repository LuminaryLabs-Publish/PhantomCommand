# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-13T00-31-09-04-00`  
**Status:** `combat-modifier-application-authority-audited`

## Summary

PhantomCommand is a static pixel-isometric campaign with a procedural graveyard menu, CRT presentation, fixed-step combat, browser persistence and public diagnostics. The current audit isolates Combat Modifier Application Authority: Grave Ward projectiles retain `slow: .34`, but impact resolution applies only damage and a transient visual effect. No slow state changes unit movement or reaches a visible frame.

## Plan ledger

**Goal:** make authored combat modifiers produce typed, target-bound, deterministic simulation and visible-frame results.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `PhantomCommand`, the oldest eligible central entry.
- [x] Inspect tower specs, projectile payloads, impact, movement, rendering and checks.
- [x] Identify the complete interaction loop, all domains, 20 implemented kits and offered services.
- [x] Add the timestamped combat-modifier audit family.
- [x] Refresh required root `.agent` state and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime modifier application and executable fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-13T00-31-09-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T00-31-09-04-00.md
.agent/architecture-audit/2026-07-13T00-31-09-04-00-combat-modifier-application-dsk-map.md
.agent/render-audit/2026-07-13T00-31-09-04-00-unrepresented-slow-state-visible-frame-gap.md
.agent/gameplay-audit/2026-07-13T00-31-09-04-00-grave-ward-projectile-without-slow-loop.md
.agent/interaction-audit/2026-07-13T00-31-09-04-00-projectile-impact-modifier-admission-map.md
.agent/combat-effect-audit/2026-07-13T00-31-09-04-00-slow-duration-stacking-expiry-contract.md
.agent/deploy-audit/2026-07-13T00-31-09-04-00-combat-modifier-fixture-gate.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

Campaign Bootstrap and Continue Resume Authority at `2026-07-12T22-05-12-04-00` remains the immediate persistence predecessor. Campaign Keyboard Command Admission, Campaign Spatial Input Admission and Campaign Action Result audits remain retained.

## Current combat loop

```txt
build Grave Ward for 55 souls
  -> tower spec includes slow = 0.34
  -> tower fires projectile
  -> projectile retains slow = 0.34
  -> impact applies damage
  -> impact draws transient effect
  -> projectile is deleted
  -> target retains authored base speed
```

## Main findings

```txt
modifier payload declared: yes
modifier payload transported: yes
modifier applied to target: no
modifier duration: no
stacking/refresh policy: no
active modifier state: no
derived movement speed: no
expiry and retirement: no
typed modifier result: no
first visible modifier-frame acknowledgement: no
```

## Required authority

```txt
phantom-command-combat-modifier-application-authority-domain
```

Do not claim the Grave Ward slows enemies from its color, cost or projectile payload. Completion requires accepted modifier state, deterministic movement difference, expiry/retirement proof and a matching visible-frame acknowledgement.
