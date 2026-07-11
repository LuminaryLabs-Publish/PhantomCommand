# PhantomCommand Validation

**Timestamp:** `2026-07-11T05-50-43-04-00`

## Summary

This pass changed documentation only. The repository still has source-pattern checks and a static build, but no executable checkpoint/resume fixture or browser Continue smoke.

## Plan ledger

**Goal:** distinguish verified repository state from planned persistence, resume and first-frame proof.

- [x] Confirm default branch is `main`.
- [x] Confirm no branch or pull request was created.
- [x] Read menu, campaign, CRT, package and current `.agent` source.
- [x] Verify the current three-field victory write and missing load path.
- [x] Record current scripts and missing fixtures.
- [ ] Run behavioral validation after checkpoint/resume implementation exists.

## Current scripts

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs
```

## This pass

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
gameplay changed: no
rendering changed: no
persistence behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
```

## Verified by source inspection

```txt
menu scans:
  phantomCommand.save
  nexus.sceneSnapshot
  phantom.command.campaign
  across localStorage and sessionStorage

menu Continue output:
  game.html?campaign=continue

campaign mode read:
  absent

campaign load/hydration path:
  absent

victory write:
  { scene: "grave-ring", souls, wave }

fixed simulation step:
  1/60
```

## Missing future gates

```txt
npm run fixture:candidate-resolver
npm run fixture:action-authority
npm run fixture:lifecycle
npm run fixture:checkpoint
npm run smoke:resume
```

## Checkpoint fixture assertions

```txt
capture occurs only at a committed tick
canonical roundtrip preserves the state fingerprint
schema/content identity are required
all entity and relationship invariants validate
unsupported version/content is rejected
corrupt fingerprint is rejected
migration is deterministic
failed staging or commit leaves active state unchanged
resume epoch advances exactly once
stale session/generation cannot commit
duplicate Resume command is idempotent
input, wall time and accumulator are reset rather than restored
```

## First-frame assertions

```txt
world, HUD and minimap consume the resumed tick/fingerprint
CRT upload acknowledges the same source frame
first-frame acknowledgement occurs once per resume epoch
no partially staged state can render
no stale pre-resume RAF callback can render under the new epoch
```

## Browser smoke

```txt
load menu
install a valid checkpoint candidate
verify Continue resolves the intended candidate
activate Continue
verify candidate identity reaches campaign boot
resume mid-wave state
verify units, towers, pads, projectiles, counters, camera and terminal state
verify first rendered frame acknowledges checkpoint fingerprint and resume epoch
reload and repeat
install malformed candidate
verify typed rejection and no partial mutation
```

## Current claim boundary

```txt
repo inventory compared: yes
root .agent state confirmed: yes
documentation pushed to main: yes
runtime checkpoint implementation: no
Continue resume behavior: no
roundtrip/corruption proof: no
first-frame resume proof: no
```
