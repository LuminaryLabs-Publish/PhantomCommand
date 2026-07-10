# PhantomCommand Next Steps

**Timestamp:** `2026-07-10T18-40-13-04-00`

## Next safe ledge

```txt
PhantomCommand Continue Capability Resolver + Save Candidate Precedence Fixture Gate
```

## Goal

Create one pure, deterministic resolver that both the menu and campaign startup can consume. It must inspect all six candidate slots, classify each value, choose at most one resumable candidate by an explicit precedence table, and return immutable provenance plus a truthful Continue capability result.

Preserve current routes, visuals, controls, simulation constants, and legacy `window.GameHost` fields.

## Plan ledger

- [ ] Keep `index.html`, `game.html`, gameplay constants, and rendering unchanged.
- [ ] Add `src/campaign/save-candidate-registry.js` with all three keys and both storage layers.
- [ ] Give every slot a stable ID, owner, schema family, storage layer, and priority.
- [ ] Add `src/campaign/save-candidate-resolver.js` as a DOM-free pure function.
- [ ] Return one row per slot, including absent, unreadable, invalid-json, foreign-schema, legacy-summary, unsupported-version, checksum-failed, resumable-current, and resumable-migrated.
- [ ] Define deterministic ordering across key and storage layer.
- [ ] Never let malformed higher-priority data hide a valid lower-priority candidate without reporting the shadowing decision.
- [ ] Return `continueEnabled`, `selectedCandidate`, `inspectedCandidates`, and `decisionReason`.
- [ ] Make menu initialization call the resolver once, not two independent presence scans.
- [ ] Expose immutable resolver output through `PhantomMenu.getState()`.
- [ ] Refresh capability on the browser `storage` event or document why a reload is required.
- [ ] Add `src/campaign/session-mode.js` and parse `campaign=new|continue`.
- [ ] Make campaign startup consume the same resolver result before hydration work begins.
- [ ] Treat the existing `{ scene, souls, wave }` payload as `legacy-completion-summary`, never resumable.
- [ ] Treat `nexus.sceneSnapshot` and `phantom.command.campaign` as foreign until adapters exist.
- [ ] Add `tests/phantom-command-candidate-resolver-fixture.mjs`.
- [ ] Prove empty storage disables Continue.
- [ ] Prove malformed JSON disables Continue and preserves its reason.
- [ ] Prove each of the six slots is inspected exactly once.
- [ ] Prove precedence is deterministic when several resumable candidates exist.
- [ ] Prove a malformed candidate cannot silently shadow a valid candidate.
- [ ] Prove foreign and legacy-summary candidates are visible but non-resumable.
- [ ] Prove menu and campaign receive the same selected candidate ID and fingerprint.
- [ ] Add the fixture to `npm run check` only after it passes independently.
- [ ] Run `node tests/phantom-command-candidate-resolver-fixture.mjs`.
- [ ] Run `npm run check`.
- [ ] Run `npm run build`.
- [ ] Push only to `main`.

## Acceptance rows

```txt
candidateRegistry.slotCount === 6
candidateResolution.inspectedCount === 6
candidateResolution.continueEnabled === false when no resumable candidate exists
candidateResolution.selectedCandidate === null for absent, malformed, foreign, unsupported, checksum-failed, and legacy-summary-only storage
candidateResolution.selectedCandidate.classification === resumable-current | resumable-migrated
candidateResolution.selectedCandidate.slotId is stable
candidateResolution.decisionReason is present
candidateResolution.rows preserve key and storageLayer
menu.getState().continueCapability matches campaign startup resolution
session.mode === new | continue
legacy victory summary remains non-resumable
current routes and campaign constants remain unchanged
legacy window.GameHost fields remain available
```

## Follow-on dependency order

```txt
Continue capability resolver
  -> versioned full-state save envelope
  -> atomic hydration
  -> saved/hydrated fingerprint parity
  -> identifier and fixed-step resume parity
  -> command result journal
  -> frame/render correlation
```

## Defer until after proof

```txt
new waves, units, towers, or economy systems
save/load UI redesign
camera rewrite
renderer replacement
pixel art expansion
multiplayer expansion
legacy construct-profile parity work
```