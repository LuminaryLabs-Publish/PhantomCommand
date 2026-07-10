# Session authority audit: new/continue save contract

Timestamp: `2026-07-10T15-38-40-04-00`

## Current session contract

The menu uses three keys only to decide whether Continue is enabled:

```txt
phantomCommand.save
nexus.sceneSnapshot
phantom.command.campaign
```

Begin emits:

```txt
./game.html?campaign=new
```

Continue emits:

```txt
./game.html?campaign=continue
```

The campaign module does not inspect `location.search`, does not select a save key, does not validate a save version, and does not hydrate state. It initializes a new campaign on every load.

On victory it attempts one write:

```txt
phantomCommand.save = {
  scene: "grave-ring",
  souls,
  wave
}
```

This payload cannot reconstruct towers, units, positions, health, core, spawn queue, selections, camera, time, projectiles, effects, pause state, or active wave progress.

## Authority risks

- Continue can be enabled by unrelated or incompatible save keys.
- The query parameter promises a session mode that has no consumer.
- A victory save is mistaken for resumable campaign state.
- No version or source fingerprint exists.
- No invalid-save result or fallback policy exists.
- No distinction exists between resume, completed-node summary, and cross-engine snapshot.
- Direct `GameHost.state` mutation can produce state that no save or command journal can reproduce.

## Required session rows

```txt
CampaignSessionIntent
  mode: new | continue
  requestedSaveKey
  route

CampaignSaveEnvelope
  schema
  version
  sourceRevision
  sessionId
  sceneId
  campaignState
  commandSequence
  simulationTick
  checksum

CampaignSessionResult
  status: created | hydrated | rejected | fallback-new
  reason
  saveKey
  saveVersion
  stateFingerprint
```

## Required compatibility policy

1. Preserve current menu save detection until the new schema is wired.
2. Treat `phantomCommand.save` victory summaries as legacy completion records, not resumable sessions.
3. Do not hydrate `nexus.sceneSnapshot` or `phantom.command.campaign` without explicit adapters.
4. Invalid Continue data must produce a rejected result and a deterministic fallback policy.
5. New-session and continue-session creation must be fixture-readable without DOM, canvas, localStorage, or browser timing.

## Next authority boundary

Implement and prove session mode parsing, versioned save envelopes, legacy classification, valid hydration, invalid rejection, and deterministic fallback before presenting Continue as a true resumed campaign.
