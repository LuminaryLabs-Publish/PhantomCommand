# Candidate Resolver Fixture Gate

**Timestamp:** `2026-07-11T01-20-51-04-00`

## Current validation surface

`npm run check` executes source-pattern checks. The Pages workflow additionally performs syntax checks, runs both source checks, builds the static artifact, and verifies expected files and source strings.

This proves that menu and campaign files exist and contain expected code shapes. It does not execute storage resolution, route admission, or campaign startup.

## Required DOM-free fixture

Add:

```txt
tests/phantom-command-candidate-resolver-fixture.mjs
```

The fixture must use an in-memory storage adapter and cover:

```txt
all six slots absent
storage read throws
empty string
invalid JSON
foreign object
unsupported version
victory completion summary
one current resumable candidate
multiple valid candidates with deterministic precedence
session/local tie behavior
migration-required candidate
ambiguous candidate policy
route new with and without candidates
route continue with no resumable candidate
route continue with selected candidate
unsupported route mode
mutation resistance of returned observations
stable decision fingerprint
```

## Startup fixture

Add:

```txt
tests/phantom-command-session-admission-fixture.mjs
```

It must prove that:

- `new` commits fresh state without consuming a candidate
- accepted `continue` consumes exactly the selected candidate
- rejected `continue` does not silently commit fresh state
- menu decision, route admission, and campaign startup share IDs and fingerprints
- the victory summary is classified but not hydrated

## Gate integration

After the fixtures pass independently, add them to `npm run check`. The Pages workflow already runs `node scripts/check-menu.mjs` and `node scripts/check-campaign.mjs`; it should run the new behavioral fixtures before `build-static.mjs`.

## Validation not provided by this docs turn

No fixture, browser smoke, build, or workflow run was executed. Runtime source and deployment configuration were not changed.
