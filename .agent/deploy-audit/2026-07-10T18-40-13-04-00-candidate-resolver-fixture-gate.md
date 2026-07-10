# Candidate Resolver Fixture Gate

**Timestamp:** `2026-07-10T18-40-13-04-00`

## Current package gate

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs
```

Current checks validate source patterns. They do not execute save-candidate resolution behavior.

## Required fixture

```txt
tests/phantom-command-candidate-resolver-fixture.mjs
```

The fixture must run without DOM, Canvas, Vite, or browser storage by passing an injected slot-reader interface to the pure resolver.

## Required cases

```txt
empty six-slot storage
one valid local candidate
one valid session candidate
multiple valid candidates
malformed high-priority plus valid lower-priority candidate
foreign schema only
legacy victory summary only
unsupported version
checksum failure
unreadable storage slot
stable tie resolution
menu and campaign resolution parity
```

## Acceptance gate

```txt
node tests/phantom-command-candidate-resolver-fixture.mjs
node tests/phantom-command-save-admission-fixture.mjs
node tests/phantom-command-resume-fidelity-fixture.mjs
npm run check
npm run build
```

Add each command to the package gate only after it passes independently.

## Deployment safety

The resolver slice must not change public routes, source canvas sizes, asset paths, Pages workflow, CRT behavior, gameplay constants, or build artifact layout.

## Current status

```txt
candidate resolver fixture: absent
save admission fixture: absent
resume fidelity fixture: absent
npm run check: not run in docs-only pass
npm run build: not run in docs-only pass
Pages deploy: not checked
```