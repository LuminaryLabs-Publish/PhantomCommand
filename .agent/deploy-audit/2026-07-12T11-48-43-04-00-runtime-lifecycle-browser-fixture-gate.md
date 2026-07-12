# Deploy Audit: Runtime Lifecycle Browser Fixture Gate

**Timestamp:** `2026-07-12T11-48-43-04-00`

## Summary

Current Node checks validate source tokens and static output, but they do not instantiate browser lifecycle resources, force WebGL context loss, count active listeners/RAF callbacks or prove route retirement on local and Pages deployments.

## Plan ledger

**Goal:** define executable local and deployed proof that one route owns one active runtime generation and retires every callback, GPU, audio and public-host resource.

- [x] Inspect package scripts and existing static checks.
- [x] Identify lifecycle behavior not exercised by Node checks.
- [x] Define deterministic browser fixture rows.
- [x] Define local-build and Pages parity gates.
- [ ] Implement and execute fixtures.

## Existing commands

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs
```

These commands do not prove runtime cleanup or context recovery.

## Required fixture matrix

```txt
fixture:menu-single-raf-owner
fixture:campaign-single-raf-owner
fixture:menu-listener-retirement
fixture:campaign-listener-retirement
fixture:audio-close-and-timer-retirement
fixture:webgl-resource-inventory
fixture:webgl-context-loss-result
fixture:webgl-context-restore-generation
fixture:public-host-revocation
fixture:duplicate-retirement-idempotency
fixture:stale-callback-no-mutation
fixture:repeated-menu-campaign-navigation
smoke:runtime-lifecycle-browser
smoke:runtime-lifecycle-built-output
smoke:runtime-lifecycle-pages
```

## Required assertions

```txt
one active RAF owner per current route
zero predecessor listeners after route retirement
zero predecessor timers after route retirement
zero active predecessor WebGL resource records
closed or transferred AudioContext ownership
PhantomMenu absent after menu retirement
GameHost absent after campaign retirement
forced context loss returns SkippedContextLost rather than uncaught draw behavior
restored context generation is greater than lost generation
stale callback cannot mutate state or schedule a successor RAF
local, built and Pages results have equivalent terminal statuses
```

## Evidence contract

```txt
RuntimeLifecycleFixtureResult
  fixtureId
  environment: local | built | pages
  runtimeSessionId
  runtimeGeneration
  startResult
  retirementResult
  contextLossResult
  contextRestoreResult
  activeResourceCounts
  staleMutationCount
  passed
  reason
```

## Release gate

Do not claim lifecycle completion until repeated route transitions, forced context loss, duplicate retirement and stale callback tests pass in a real browser against local source, built output and the deployed Pages route.

Documentation only. Deployment behavior was not changed.