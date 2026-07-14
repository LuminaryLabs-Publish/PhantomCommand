# PhantomCommand Known Gaps

**Timestamp:** `2026-07-14T07-58-22-04-00`

## Summary

Menu and campaign startup assume required browser capabilities and perform irreversible work during top-level module evaluation. Failure has no typed state, rollback, independent fallback, retry or first-frame proof.

## Plan ledger

**Goal:** keep every blocker to reliable browser-route startup explicit.

- [x] Record current source-backed startup gaps.
- [ ] Close them through runtime implementation and executable browser proof.

## Current startup gaps

```txt
route startup attempt identity: absent
startup phase model: absent
DOM root admission result: absent
Canvas2D context probe result: absent
WebGL capability result: absent
shader compile result: exception only
shader link result: exception only
source-frame probe: absent
CRT-frame probe: absent
candidate resource manifest: absent
listener lease preparation: absent
atomic adoption: absent
startup rollback receipt: absent
route startup result: absent
startup failure projection: absent
independent retry command: absent
superseded attempt rejection: absent
public host startup revision: absent
first route frame acknowledgement: absent
source/build/Pages browser fixtures: absent
```

## Current risks

```txt
module import or evaluation failure can leave a blank route
menu native buttons may exist without active listeners
campaign instructions can describe controls that are unavailable
partial resource allocation has no application-owned retirement evidence
console exceptions are the only failure signal
retries require page reload and have no attempt isolation
host absence cannot be distinguished from loading or failure
source-marker checks can pass while browser startup fails
static build can succeed while copied routes are not bootable
```

## Retained gaps

The settings, durable save/resume, route-resource retirement, scheduler, WebGL recovery, accessibility, spatial/keyboard input, public-host, phase and combat gaps remain retained in their timestamped audits.