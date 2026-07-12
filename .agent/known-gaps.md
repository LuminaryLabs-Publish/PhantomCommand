# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T13-59-50-04-00`

## Summary

The newest documented gap is Campaign Bootstrap and Continue Resume Authority. Continue can be enabled by any truthy configured storage value, but the campaign ignores the launch query, reads no save and always creates default state.

## Plan ledger

**Goal:** require complete, versioned and atomic campaign bootstrap before treating Continue as functional.

- [ ] Owned save-key and storage-scope policy.
- [ ] Typed save probe instead of boolean presence.
- [ ] Save schema, version, fingerprint and migration.
- [ ] Complete campaign checkpoint payload.
- [ ] Launch-intent admission and identity.
- [ ] Distinct New and Continue bootstrap paths.
- [ ] Detached candidate construction and validation.
- [ ] Atomic hydration and stale-result rejection.
- [ ] Typed save read/write and bootstrap results.
- [ ] First restored-frame acknowledgement.
- [ ] Local, built and Pages resume fixtures.
- [ ] Retain runtime lifecycle, pointer, phase, fixed-step, combat and host gates.

## Campaign bootstrap gaps

```txt
matched save key retained: no
matched storage scope retained: no
save bytes parsed by menu: no
save compatibility validated: no
campaign launch query consumed: no
new-session predecessor-save policy: no
campaign save read: no
complete checkpoint capture: no
save schema/version: no
save/content fingerprint: no
migration: no
candidate graph: no
atomic hydration: no
save write receipt: no
bootstrap revision: no
stale bootstrap rejection: no
first restored-frame receipt: no
resume browser fixtures: no
```

## Concrete risks

```txt
malformed JSON can mark Continue BOUND
foreign Nexus or legacy data can mark Continue BOUND
Continue always renders a default campaign
victory save cannot reconstruct units, towers, core, camera or IDs
storage write failure is swallowed
Begin does not explicitly clear, archive or supersede an old save
future live-object hydration could leave partial state after failure
restored ID counters could collide unless persisted and validated
HUD, CRT and GameHost cannot prove which save produced the frame
```

## Retained gaps

```txt
Menu pointer misses can execute the selected action
Campaign pointer commands ignore visible-surface and CRT-curve admission
GameHost exposes live mutable owners
Campaign phase does not fence commands
Commands are not fixed-step scheduled
Combat liveness and exclusive terminal result remain unimplemented
Runtime callbacks and WebGL/audio resources lack explicit retirement
Menu audio activation policy remains incomplete
Full checkpoint capture and replay remain incomplete
```

## Completion boundary

Do not claim resume support because Continue is visible, enabled or carries a query string. Completion requires a complete versioned payload, typed save admission, atomic hydration, migration policy, stale-result rejection and first-visible-frame proof.