# PhantomCommand Agent Start

**Repository:** `LuminaryLabs-Publish/PhantomCommand`  
**Branch:** `main`  
**Last aligned:** `2026-07-13T00-40-00-04-00`  
**Status:** `combat-modifier-application-central-reconciled`

## Summary

PhantomCommand is a static pixel-isometric campaign with a procedural graveyard menu, CRT presentation, fixed-step combat, browser persistence and public diagnostics. The current source-backed boundary is Combat Modifier Application Authority: Grave Ward projectiles retain `slow: 0.34`, but impact applies only damage and a transient visual effect. No accepted modifier changes target movement or reaches a revision-matched visible frame.

## Plan ledger

**Goal:** keep repo-local and central documentation aligned while defining the authority required to make authored combat modifiers deterministic, target-bound and visibly provable.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only PhantomCommand because its repo-local combat audit was newer than central tracking.
- [x] Verify the complete interaction loop, domains, 20 implemented kits and offered services.
- [x] Re-read tower specs, projectile construction, impact, movement and rendering.
- [x] Add the timestamped reconciliation tracker and system audits.
- [x] Refresh required root `.agent` state and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime modifier application and executable fixtures remain future work.

## Read this first

```txt
.agent/trackers/2026-07-13T00-40-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T00-40-00-04-00.md
.agent/architecture-audit/2026-07-13T00-40-00-04-00-combat-modifier-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-13T00-40-00-04-00-modifier-visible-frame-central-reconciliation-gap.md
.agent/gameplay-audit/2026-07-13T00-40-00-04-00-grave-ward-slow-central-reconciliation.md
.agent/interaction-audit/2026-07-13T00-40-00-04-00-projectile-impact-admission-central-reconciliation.md
.agent/combat-effect-audit/2026-07-13T00-40-00-04-00-effect-state-central-reconciliation-contract.md
.agent/deploy-audit/2026-07-13T00-40-00-04-00-combat-modifier-central-fixture-gate.md
.agent/central-sync-audit/2026-07-13T00-40-00-04-00-repo-ledger-combat-modifier-reconciliation.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

The original Combat Modifier Application audit at `2026-07-13T00-31-09-04-00` remains the immediate source-analysis predecessor. Campaign Bootstrap/Continue Resume, keyboard admission, spatial input and action-result audits remain retained.

## Current combat loop

```txt
build Grave Ward for 55 souls
  -> tower spec includes slow = 0.34
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

Do not claim the Grave Ward slows enemies from its cost, color or projectile payload. Completion requires accepted modifier state, deterministic movement difference, duration and retirement proof, plus a matching visible-frame acknowledgement.