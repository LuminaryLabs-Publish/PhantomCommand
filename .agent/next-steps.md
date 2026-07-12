# PhantomCommand Next Steps

**Timestamp:** `2026-07-12T05-49-04-04-00`

## Goal

Implement one campaign bootstrap and resume authority so Begin and Continue produce distinct, validated and observable runtime generations.

## Plan ledger

- [ ] Introduce one canonical `CampaignLaunchIntent` parsed from the campaign route.
- [ ] Define one canonical save key and explicit fallback/legacy-key policy.
- [ ] Replace presence-only Continue enablement with a typed resume-capability result.
- [ ] Add a versioned `CampaignSaveEnvelope` with schema and content fingerprints.
- [ ] Parse, validate, migrate or quarantine candidate saves before runtime construction.
- [ ] Define explicit new-run handling for predecessor saves.
- [ ] Build new or resumed campaign state as a detached candidate.
- [ ] Validate unit, tower, projectile, pad and selection references before commit.
- [ ] Reseed unit, projectile and tower ID counters from hydrated content.
- [ ] Commit one campaign generation atomically.
- [ ] Return a typed `CampaignBootstrapResult`.
- [ ] Return a typed `CampaignSaveCommitResult` for checkpoint writes.
- [ ] Publish detached bootstrap diagnostics instead of raw mutable owners.
- [ ] Bind the first visible resumed frame to bootstrap ID and campaign generation.
- [ ] Add Node fixtures and real-browser route/storage smokes.
- [ ] Run `npm run check` and `npm run build` after fixture wiring.

## Existing owners to update

```txt
src/menu/graveyard-menu.js
src/campaign/campaign-scene.js
menu-save-presence-kit
menu-route-kit
campaign-route-shell-kit
pixel-campaign-runtime-kit
legacy-gamehost-diagnostics-kit
scripts/check-menu.mjs
scripts/check-campaign.mjs
package.json
```

## Bootstrap result contract

```txt
CampaignBootstrapResult
  bootstrapId
  launchIntent
  campaignGeneration
  status
  sourceKey
  sourceScope
  sourceVersion
  migrationCount
  quarantined
  stateRevision
  stateFingerprint
  reason
  committedAtMs
```

## Save commit result contract

```txt
CampaignSaveCommitResult
  saveCommitId
  campaignGeneration
  stateRevision
  key
  scope
  schemaVersion
  payloadFingerprint
  durable
  status
  reason
  committedAtMs
```

## Fixture gate

```txt
Begin creates a clean generation regardless of stale presence data
Continue rejects malformed JSON without partial hydration
Continue rejects unrelated Nexus snapshot payloads
legacy compatible payload migrates exactly once
invalid reference graphs are quarantined
hydrated counters cannot collide with existing IDs
winning save round-trips into an equivalent resumed read model
new-run predecessor-save policy is deterministic
first resumed frame cites bootstrap and campaign generation
menu Continue state matches validated resume capability
```

## Dependency order

```txt
Campaign Bootstrap and Continue Resume Authority
  -> Public Host Owner Quarantine and Typed Command Admission
  -> CRT Display/Input Projection Authority
  -> Campaign Phase Admission Authority
  -> Fixed-Step Command Scheduling and Committed Frame Authority
  -> Combat and Terminal Authorities
  -> Runtime Session and Menu Audio Lifecycle Authorities
  -> Versioned Full Checkpoint Capture Authority
```

Do not add more save keys. Consolidate identity and compatibility through one admitted envelope and one explicit migration surface.