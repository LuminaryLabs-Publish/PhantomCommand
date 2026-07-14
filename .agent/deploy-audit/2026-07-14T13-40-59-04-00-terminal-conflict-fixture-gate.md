# Terminal Conflict Fixture Gate

**Timestamp:** `2026-07-14T13-40-59-04-00`

## Summary

Current checks only inspect source markers and static-copy wiring. They cannot prove exclusive terminal settlement, reward idempotency, save eligibility or terminal-frame parity.

## Plan ledger

**Goal:** require the same terminal conflict matrix for source, built output and GitHub Pages.

- [x] Identify current validation boundary.
- [x] Define headless and browser fixtures.
- [x] Define artifact parity requirements.
- [ ] Implement the fixture gate later.

## Required headless fixtures

```txt
last enemy killed before breach -> victory
last enemy breaches with core above zero -> continue or clear by policy
last enemy breaches and core reaches zero on final wave -> defeat only
simultaneous loss and final-clear proposals -> one policy-defined result
repeated settlement command -> duplicate without second reward
stale StepId -> rejected
save failure -> accepted outcome retained with failed save receipt
retry -> successor RunId and predecessor lineage
```

## Required browser fixtures

```txt
terminal overlay matches accepted result
GameHost exposes one terminal artifact
Canvas2D and CRT frame cite matching fingerprint
R/retry does not erase retained predecessor evidence
reload and menu return preserve declared policy
```

## Required artifact matrix

```txt
source route
built dist route
GitHub Pages route
```

Each must report the same outcome policy revision, result fingerprint, reward receipt, save status and first terminal-frame acknowledgement.

## Existing proof boundary

```txt
npm run check: source regular expressions
npm run build: static copy
terminal simulation fixture: absent
storage fixture: absent
browser terminal capture: absent
Pages terminal proof: absent
```

No deployment parity or terminal correctness claim is made.