# Save Candidate Classification Contract

**Repository:** `LuminaryLabs-Publish/PhantomCommand`

**Timestamp:** `2026-07-10T17-08-36-04-00`

## Authority rule

A storage value is not a session. A candidate may authorize Continue only after parsing, schema-family identification, version validation, scene validation, checksum validation, and adapter or migration resolution.

## Candidate registry

```txt
phantomCommand.save
  owner: PhantomCommand
  current observed payload: legacy completion summary
  adapter today: none

nexus.sceneSnapshot
  owner: external/other system
  schema family: unknown to campaign runtime
  adapter today: none

phantom.command.campaign
  owner: legacy or external campaign surface
  schema family: unknown to current runtime
  adapter today: none
```

## Stable classifications

```txt
absent
invalid-json
foreign-schema
legacy-completion-summary
resumable-current
resumable-migrated
unsupported-version
wrong-scene
checksum-failed
invariant-failed
```

## Deterministic selection

Candidate priority must be explicit and stable. Suggested order:

```txt
1. current-schema PhantomCommand resumable envelope in localStorage
2. current-schema PhantomCommand resumable envelope in sessionStorage
3. supported migrated PhantomCommand envelope in localStorage
4. supported migrated PhantomCommand envelope in sessionStorage
5. no selection
```

Foreign, malformed, legacy-summary, unsupported, and checksum-failed candidates remain visible in diagnostics but cannot enable Continue.

## Atomicity

Hydration must occur into an isolated candidate state. The live campaign state may be replaced only after all parsing, migration, checksum, invariant, fingerprint, and identifier-counter checks pass.

## Fallback policy

A direct `campaign=continue` request with no admissible candidate must produce a typed result:

```txt
status: rejected | fallback-new
reason: no-resumable-candidate | candidate-invalidated | hydration-failed
```

The policy must be deterministic and observable through immutable diagnostics.
