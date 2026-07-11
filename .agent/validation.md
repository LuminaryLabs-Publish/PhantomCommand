# PhantomCommand Validation

**Timestamp:** `2026-07-11T03-41-49-04-00`

## Summary

This pass changed documentation only. The repository still has source-pattern checks and a static build, but no executable lifecycle fixture.

## Plan ledger

**Goal:** distinguish verified repository state from planned lifecycle proof.

- [x] Confirm default branch is `main`.
- [x] Confirm no branch or pull request was created.
- [x] Read menu, campaign, CRT and package source.
- [x] Record current scripts and missing fixtures.
- [ ] Run behavioral validation after lifecycle implementation exists.

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
persistence changed: no
deployment workflow changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
```

## Missing future gate

```txt
npm run fixture:lifecycle
```

Required assertions:

```txt
one active session owns one pending RAF
stale RAF callbacks cannot mutate or render
listener add/remove counts match
global leases restore safely
startup failure leaves zero owned resources
menu and campaign transition exactly once
audio sources stop and context close is tracked
CRT texture, buffer, program and shaders are released exactly once
dispose is idempotent
no render or input is admitted after disposal
two mount/dispose cycles leave zero retained resources
```

## Browser smoke

```txt
load menu
start and cancel panel interactions
begin campaign transition
verify menu teardown before navigation
load campaign
exercise input and render
restart or exit
verify campaign teardown
remount both routes
confirm one RAF chain, one listener set and no retained audio/WebGL resources
```
