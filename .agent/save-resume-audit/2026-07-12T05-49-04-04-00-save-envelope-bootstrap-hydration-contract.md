# Save and Resume Audit: Envelope, Bootstrap and Hydration Contract

**Timestamp:** `2026-07-12T05-49-04-04-00`

## Canonical save envelope

```txt
CampaignSaveEnvelope
  schema
  version
  productId
  sceneId
  contentFingerprint
  campaignGeneration
  stateRevision
  checkpointKind
  savedAtMs
  payload
  payloadFingerprint
```

## Minimum payload for a resumable checkpoint

```txt
state time, souls, core, wave and phase
spawn queue
units and all references
towers and pad ownership
projectiles and targets, when mid-wave checkpoints are supported
effects policy
selection and selected pad
tower type
paused, won and lost policy
message or derived message policy
camera position, velocity and zoom
unit, projectile and tower ID counters
```

## Save admission

```txt
read canonical key
  -> parse JSON safely
  -> validate envelope identity
  -> validate supported version
  -> verify payload fingerprint
  -> verify scene/content compatibility
  -> migrate when explicitly supported
  -> validate semantic invariants
  -> return SaveAdmissionResult
```

## Hydration

```txt
admitted envelope
  -> construct detached state candidate
  -> rebuild maps and arrays
  -> verify every unit target
  -> verify every projectile target
  -> verify every selected ID
  -> verify pad/tower ownership
  -> calculate next ID counters
  -> calculate state fingerprint
  -> return HydrationResult
```

## Atomic bootstrap

The live campaign runtime must not be incrementally mutated while a save is parsed or hydrated. Commit only after all validation passes. Failure leaves no partially resumed state and returns a typed rejection.

## Legacy keys

```txt
phantomCommand.save
nexus.sceneSnapshot
phantom.command.campaign
```

A migration adapter may inspect legacy keys, but only one explicit policy may select a candidate. The first truthy string is not a valid precedence rule.

## New-run policy

Choose and document one policy:

```txt
retain predecessor save until first durable successor checkpoint
archive predecessor save immediately
remove predecessor save immediately
```

The choice must return a result and must not be implicit.

## Save commit

```txt
prepare canonical envelope
  -> write durable candidate
  -> read back and verify fingerprint when supported
  -> publish CampaignSaveCommitResult
  -> update menu ResumeCapabilityResult
```

## Completion criteria

```txt
malformed and incompatible saves are safely rejected
supported legacy saves migrate deterministically
round-trip state parity is proven
hydrated references and counters are valid
new-run policy is deterministic
bootstrap and first frame share one generation and fingerprint
```

The current terminal payload is a progress marker, not a complete resumable checkpoint.