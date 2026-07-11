# Deploy Audit: Continue Capability Fixture Gate

**Timestamp:** `2026-07-11T15-08-41-04-00`

## Summary

The existing source checks and static build cannot prove Continue behavior. Deployment should not claim resumable campaign support until pure candidate-resolution, storage-failure, startup-admission, hydration-rollback and browser first-frame fixtures pass.

## Plan ledger

**Goal:** define the minimum executable evidence required before Continue can be treated as deploy-safe.

- [x] Review current menu and campaign checks.
- [x] Identify missing persistence and startup behavior tests.
- [x] Define pure and browser fixture matrices.
- [x] Define CI and deployment evidence requirements.
- [ ] Implement fixtures and wire them into CI.

## Current coverage

```txt
npm run check
  -> source-pattern assertions only

npm run build
  -> static artifact copy

GitHub Pages
  -> build and deploy static files
```

These paths do not execute storage reads, candidate parsing, menu Continue state, route mode, hydration or first-frame proof.

## Required scripts

```txt
npm run fixture:continue-slots
npm run fixture:continue-candidates
npm run fixture:continue-precedence
npm run fixture:continue-storage-failure
npm run fixture:campaign-startup
npm run fixture:campaign-hydration-rollback
npm run smoke:continue-browser
npm run smoke:resume-first-frame
```

## Slot and candidate fixture matrix

```txt
six empty slots -> disabled
malformed payload -> rejected
unsupported schema -> rejected
completion summary -> not resumable
valid current checkpoint -> enabled
valid legacy migratable checkpoint -> enabled with migration
failed slot plus valid slot -> valid slot selected
malformed higher slot plus valid lower slot -> valid lower selected
multiple equal candidates -> stable tie-break
```

## Startup fixture matrix

```txt
new mode with no candidate -> fresh run accepted
new mode with candidate present -> fresh run accepted, candidate ignored
continue mode without selected candidate -> rejected
continue mode with valid candidate -> resumed run accepted
candidate fingerprint changed -> rejected
content revision mismatch -> rejected or migrated by declared policy
invalid references -> rejected before live mutation
hydration exception -> rollback unchanged
```

## Browser fixture

```txt
seed candidate slots
load menu
observe ContinueCapabilityResult
activate Continue by pointer, keyboard and PhantomMenu
verify one command and one transition
verify campaign mode and candidate identity
verify resumed state differs from default state
verify first frame acknowledges CampaignStartupResult
```

## Failure-frame fixture

When startup fails after navigation:

```txt
no silent fresh campaign
no partial hydrated state
one typed reason
candidate and startup IDs retained for diagnostics
explicit recovery action available
```

## CI gate

A Pages deployment may claim Continue support only when the commit SHA, fixture output and deployed artifact SHA are recorded together. Source-pattern checks may remain, but they are not sufficient evidence.

## Current status

```txt
slot fixture: absent
candidate parser fixture: absent
precedence fixture: absent
storage failure fixture: absent
startup mode fixture: absent
hydration rollback fixture: absent
browser Continue smoke: absent
first resumed-frame smoke: absent
CI gate: absent
```

## Validation boundary

Documentation only. Package scripts, workflow files and deployment configuration were not changed.