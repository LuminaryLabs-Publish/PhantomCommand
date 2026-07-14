# PhantomCommand Known Gaps

**Timestamp:** `2026-07-14T02-58-28-04-00`

## Summary

Ritual Settings are currently menu-local in application behavior even though they are stored across routes. Campaign presentation ignores saved CRT and grain values and has no explicit ambience capability.

## Plan ledger

**Goal:** keep every blocker to reliable cross-route settings behavior explicit.

- [x] Record current source-backed settings gaps.
- [ ] Close them through runtime implementation and executable proof.

## Current settings gaps

```txt
versioned settings schema: absent
settings revision and fingerprint: absent
legacy migration result: absent
verified storage write/readback: absent
storage failure classification: absent
route settings capability manifest: absent
campaign settings document read: absent
campaign CRT adoption: absent
campaign grain adoption: absent
campaign ambience support classification: absent
atomic participant adoption and rollback: absent
public campaign settings readback: absent
first settings revision frame acknowledgement: absent
browser/build/Pages settings fixtures: absent
```

## Current risks

```txt
CRT can be disabled in the menu and silently re-enabled in gameplay
grain can be set high in the menu and silently reset to low in gameplay
ambience has route-local meaning without an explicit scope
storage failure looks the same as successful persistence
future settings changes have no schema or compatibility boundary
public diagnostics cannot prove which settings produced a campaign frame
```

## Retained gaps

The durable save/resume, route-resource retirement, fixed-step scheduling, WebGL recovery, accessibility, input and combat-settlement gaps remain retained in their timestamped audits.