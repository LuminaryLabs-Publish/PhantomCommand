# PhantomCommand Known Gaps

**Timestamp:** `2026-07-12T05-49-04-04-00`

## Summary

The newest documented gap is campaign bootstrap and resume authority. The menu can display Continue and emit a continue URL, but it only checks raw key presence. The campaign ignores launch intent and storage, always constructs the default state, and writes a minimal terminal payload that it never reloads.

## Plan ledger

**Goal:** keep campaign launch, persistence and first-frame ownership explicit while preserving the existing dependency queue.

- [ ] Route launch-intent parsing.
- [ ] Canonical save-key and storage-scope policy.
- [ ] Versioned save envelope and compatibility fingerprint.
- [ ] Parse, validation, migration and quarantine results.
- [ ] Explicit new-run predecessor-save handling.
- [ ] Detached runtime hydration and reference validation.
- [ ] Atomic bootstrap commit and typed result.
- [ ] Typed save commit result.
- [ ] First resumed-frame acknowledgement.
- [ ] Route/storage/browser fixtures.
- [ ] Retain command, render, phase, combat, lifecycle, audio and full-checkpoint gates.

## Bootstrap and resume gaps

```txt
launch intent: URL only, not consumed
Continue capability: raw presence only
canonical save key: absent
key precedence: absent
save schema/version: absent
content fingerprint: absent
parse result: absent
migration result: absent
quarantine: absent
new-run save policy: absent
runtime hydration: absent
reference validation: absent
ID counter reseeding: absent
atomic bootstrap commit: absent
typed bootstrap result: absent
typed save commit result: absent
bootstrap observation/journal: absent
first resumed frame receipt: absent
browser resume fixtures: absent
```

## Concrete risks

```txt
malformed JSON can enable Continue
unrelated nexus.sceneSnapshot data can enable Continue
Begin and Continue both start wave zero with default resources
winning save cannot resume the won or pre-win runtime
old save remains visible after choosing Begin
future hydration could collide entity IDs without reseeding
future partial hydration could leave cross-object references invalid
menu resume state can disagree with campaign capability
```

## Retained gaps

```txt
GameHost exposes live mutable owners
CPU and GLSL CRT projection differ
campaign phase does not fence commands
commands are not fixed-step scheduled
combat liveness and exclusive terminal result remain unimplemented
runtime RAF/listener/WebGL lifecycle remains unowned
menu AudioContext lifecycle remains unowned
full checkpoint capture and replay remain incomplete
```

## Completion boundary

Do not claim Continue works because the menu route exists or because a save string is present. Completion requires validated launch admission, deterministic hydration, a typed bootstrap result and a visible resumed frame tied to the committed campaign generation.