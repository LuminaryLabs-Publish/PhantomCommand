# Deploy Audit: Lifecycle Teardown Fixture Gate

**Timestamp:** `2026-07-11T19-48-09-04-00`

## Summary

Current checks validate source patterns and the static build. They do not execute menu/campaign teardown, bfcache behavior, WebGL deletion, global revocation or restart leak tests.

## Plan ledger

**Goal:** define the executable gate required before lifecycle behavior is considered deployable.

- [x] Review current package scripts.
- [x] Identify missing lifecycle fixtures.
- [x] Define Node/browser proof layers.
- [ ] Wire the gate during implementation.

## Required fixtures

```txt
fixture:lifecycle-admission
fixture:resource-lease-idempotency
fixture:listener-retirement
fixture:audio-retirement
fixture:crt-retirement
fixture:global-revocation
fixture:stale-callback-fence
fixture:bfcache-policy
fixture:restart-generation
```

## Required browser smoke

```txt
smoke:lifecycle-cycle
  -> start menu
  -> enter campaign
  -> restart campaign
  -> exit to menu
  -> repeat 20 times
  -> assert one RAF chain per session
  -> assert stable listener/audio/WebGL/global lease counts
  -> assert predecessor callbacks are rejected
  -> assert first replacement frame identity
```

## Future gate

```txt
npm run check
npm run fixture:lifecycle
npm run build
npm run smoke:lifecycle-cycle
```

Pages success alone must not be interpreted as lifecycle correctness.
