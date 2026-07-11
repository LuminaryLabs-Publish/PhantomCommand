# Deploy Audit: Terminal Outcome Fixture Gate

**Timestamp:** `2026-07-11T18-21-09-04-00`

## Summary

The static build and Pages workflow can deploy contradictory terminal behavior because current checks inspect source patterns only. Deployment should remain blocked from any terminal-correctness claim until pure fixtures and a browser frame smoke prove exclusive arbitration, persistence admission and consumer parity.

## Plan ledger

**Goal:** define the executable gate required before terminal outcome behavior is considered deployable and trustworthy.

- [x] Review current `check` and `build` scripts.
- [x] Identify missing terminal behavioral fixtures.
- [x] Define Node and browser proof layers.
- [ ] Add fixture scripts and CI wiring during implementation.

## Current proof

```txt
npm run check
  -> menu source-pattern checks
  -> campaign source-pattern checks

npm run build
  -> static copy to dist

Pages
  -> installs dependencies
  -> builds static artifact
  -> deploys artifact
```

No current command constructs simultaneous terminal evidence or observes storage and rendered consumers.

## Required pure fixtures

```txt
fixture:terminal-victory
fixture:terminal-defeat
fixture:terminal-simultaneous
fixture:terminal-evidence-order-parity
fixture:terminal-duplicate-idempotency
fixture:terminal-latch
fixture:terminal-persistence
fixture:terminal-run-epoch
```

## Required browser smoke

```txt
smoke:terminal-frame
  -> start deterministic final-wave fixture
  -> trigger simultaneous core breach and final clear
  -> read TerminalOutcomeResult
  -> inspect storage
  -> capture world/HUD/overlay/CRT/GameHost acknowledgements
  -> assert one shared outcome, resultId, runEpoch, frameId and fingerprint
```

## Required build gate

```txt
npm run check
npm run fixture:terminal
npm run build
npm run smoke:terminal-frame
```

The browser smoke may run separately from the static build job, but Pages success alone must not be interpreted as terminal correctness.

## Failure conditions

```txt
won and lost both represented as authoritative
multiple TerminalOutcomeResult rows for one run epoch
result changes after latch
victory storage write for DEFEAT
duplicate reward or persistence write
consumer outcome/result mismatch
missing first terminal frame acknowledgement
stale evidence from prior run accepted
```

## Claim boundary

This audit did not modify workflow files or run commands. It defines the future gate only.