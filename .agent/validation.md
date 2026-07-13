# PhantomCommand Validation

**Timestamp:** `2026-07-13T00-40-00-04-00`

## Summary

This documentation-only run verifies the current Grave Ward path and reconciles the repo-local audit with central tracking. Source inspection proves that the tower declares `slow: 0.34`, projectile construction carries it, projectile impact ignores it, unit movement consumes only base speed, and no visible frame carries modifier state.

## Plan ledger

**Goal:** separate source-backed combat-effect defects from unimplemented effect semantics, target state, expiry and executable proof.

- [x] Compare the Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome` and select only PhantomCommand.
- [x] Verify required root `.agent` files and the new timestamped reconciliation family.
- [x] Preserve all 20 implemented kits and offered services.
- [x] Inspect tower specs, projectiles, impact, unit movement, rendering and static checks.
- [x] Preserve predecessor audit families.
- [x] Change documentation only.
- [ ] Execute combat-modifier fixtures after implementation.

## Proven from source

```txt
Grave Ward spec contains slow: 0.34
projectile() copies spec.slow into projectile state
updateProjectiles() reads damage, speed, splash, target and color
updateProjectiles() does not read p.slow
units have no active modifier collection
moveToward() uses u.speed directly
no modifier duration, stacking or refresh policy exists
no modifier expiry or retirement function exists
rendering draws projectiles and transient effects only
campaign checker does not execute combat behavior
```

## Proven documentation state

```txt
START_HERE current: yes
current-audit current: yes
next-steps current: yes
known-gaps current: yes
validation current: yes
kit-registry current: yes
tracker and turn ledger present: yes
architecture/render/gameplay/interaction/combat-effect/deploy audits present: yes
central-sync audit present: yes
bootstrap/resume and input/action predecessors retained: yes
central ledger and internal change log required: yes
```

## Existing checks can establish, when run

```txt
game and campaign entry files exist
campaign source includes towerTypes, waves and authored runtime tokens
unit animation and camera target zoom tokens exist
CRT texture upload and source resolution tokens exist
window.GameHost token exists
static build includes source files
```

## Existing checks cannot establish

```txt
Ward slow application
magnitude interpretation
duration and exact expiry
stacking, refresh, cap or resistance policy
target and projectile generation admission
atomic damage-plus-modifier commit
stale or duplicate impact rejection
derived movement speed
target death/restart retirement
one terminal CombatModifierResult
first visible modifier-frame acknowledgement
source/build/Pages modifier parity
```

## Required deterministic fixtures

```txt
fixture:grave-ward-single-slow
fixture:grave-ward-distance-comparison
fixture:grave-ward-duration-expiry
fixture:grave-ward-refresh
fixture:grave-ward-stacking-cap
fixture:grave-ward-resistance
fixture:grave-ward-stale-projectile
fixture:grave-ward-duplicate-impact
fixture:grave-ward-target-retirement
fixture:grave-ward-run-restart
fixture:grave-ward-visible-frame
```

## Required browser matrix

```txt
source route, built output and GitHub Pages
single Ward versus one moving enemy
unslowed control enemy over the same fixed steps
multiple Ward hits before and after expiry
target death before expiry
restart with active modifier
first visible world/HUD/minimap/CRT modifier receipt
```

## Change boundary

```txt
runtime source changed: no
combat behavior changed: no
tower balance changed: no
movement behavior changed: no
rendering changed: no
input behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
target branch: main
npm run check executed: no
npm run build executed: no
browser combat smoke executed: no
Pages combat smoke executed: no
modifier fixtures available: no
```

## Claim boundary

The audit proves that the current slow payload is transported but unused. It does not claim slow application, balance correctness, duration, stacking, expiry, replay determinism, visible modifier parity or deployed behavior is implemented.