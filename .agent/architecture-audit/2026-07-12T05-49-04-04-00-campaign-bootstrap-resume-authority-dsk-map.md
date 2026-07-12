# Architecture Audit: Campaign Bootstrap and Resume Authority

**Timestamp:** `2026-07-12T05-49-04-04-00`

## Current ownership

```txt
menu-save-presence-kit
  -> scans three keys for truthy strings

menu-route-kit
  -> emits campaign=new or campaign=continue

campaign-route-shell-kit
  -> loads campaign-scene.js

pixel-campaign-runtime-kit
  -> constructs one default mutable runtime

terminal persistence
  -> writes one minimal phantomCommand.save payload
```

No owner connects these surfaces into a validated bootstrap transaction.

## Required parent domain

```txt
phantom-command-campaign-bootstrap-resume-authority-domain
```

## DSK composition

```txt
launch identity
  phantom-command-campaign-launch-intent-kit
  phantom-command-bootstrap-command-kit
  phantom-command-bootstrap-id-kit
  phantom-command-bootstrap-generation-kit

save admission
  phantom-command-save-key-policy-kit
  phantom-command-save-envelope-schema-kit
  phantom-command-save-version-kit
  phantom-command-save-canonicalization-kit
  phantom-command-save-parse-result-kit
  phantom-command-save-validation-kit
  phantom-command-save-migration-kit
  phantom-command-save-quarantine-kit
  phantom-command-new-run-reset-policy-kit
  phantom-command-continue-admission-kit

runtime preparation
  phantom-command-runtime-hydration-kit
  phantom-command-entity-reference-validation-kit
  phantom-command-entity-id-reseed-kit

commit and readback
  phantom-command-bootstrap-commit-kit
  phantom-command-bootstrap-result-kit
  phantom-command-save-commit-kit
  phantom-command-save-commit-result-kit
  phantom-command-bootstrap-observation-kit
  phantom-command-bootstrap-journal-kit
  phantom-command-first-resumed-frame-kit

proof
  phantom-command-malformed-save-fixture-kit
  phantom-command-wrong-key-save-fixture-kit
  phantom-command-new-continue-parity-fixture-kit
  phantom-command-resume-frame-fixture-kit
  phantom-command-menu-campaign-route-smoke-kit
```

## Required transaction

```txt
CampaignBootstrapCommand
  -> parse launch intent
  -> resolve canonical save policy
  -> parse and validate candidate envelope
  -> migrate or quarantine when required
  -> prepare new or hydrated runtime candidate
  -> validate references and reseed counters
  -> atomically commit campaign generation
  -> publish CampaignBootstrapResult
  -> project first frame
  -> acknowledge generation and bootstrap identity
```

## Dependency edges

```txt
menu-route-kit
  -> campaign-launch-intent-kit

menu-save-presence-kit
  -> continue-admission-kit
  -> save-key-policy-kit
  -> save-validation-kit

campaign-route-shell-kit
  -> bootstrap-command-kit

pixel-campaign-runtime-kit
  -> runtime-hydration-kit
  -> bootstrap-commit-kit

fixed-step-campaign-simulation-kit
  -> committed campaign generation

pixel-campaign-render-kit
  -> first-resumed-frame-kit

legacy-gamehost-diagnostics-kit
  -> detached bootstrap observation only
```

## Invariants

```txt
raw key presence never authorizes Continue
launch intent is consumed exactly once per generation
invalid payloads cause no partial runtime mutation
migration is deterministic and version-bounded
all hydrated references resolve before commit
all runtime ID counters exceed hydrated IDs
new-run predecessor-save handling is explicit
one bootstrap result identifies one committed generation
one first-frame receipt identifies the same generation
```

This domain precedes full checkpoint capture. Bootstrap authority defines how any future checkpoint becomes an admitted runtime generation.