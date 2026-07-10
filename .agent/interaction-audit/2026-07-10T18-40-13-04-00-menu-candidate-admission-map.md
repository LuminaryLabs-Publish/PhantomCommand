# Menu Candidate Admission Map

**Timestamp:** `2026-07-10T18-40-13-04-00`

## Current interaction path

```txt
page load
  -> hasCampaignSave() for enabled
  -> hasCampaignSave() for note
  -> menu item becomes BOUND or EMPTY
  -> keyboard/pointer activation
  -> transition to game.html?campaign=continue
```

## Current rejection visibility

None. The player cannot distinguish:

```txt
no candidate
malformed JSON
foreign schema
unsupported version
legacy completion summary
checksum failure
valid resumable save
```

All present values produce the same menu capability.

## Target interaction result

```txt
ContinueCapabilityResult {
  enabled,
  selectedSlotId,
  classification,
  decisionReason,
  inspectedCount,
  policyVersion
}
```

The visible menu may continue to use compact copy, but `PhantomMenu.getState()` must expose the full immutable result for tests and diagnostics.

## Input invariants

- Arrow/WASD navigation remains unchanged.
- Pointer hit testing remains unchanged.
- Enter/Space activation remains unchanged.
- Disabled Continue remains skipped during selection movement.
- Settings and credits panels remain unchanged.
- Audio and transition timing remain unchanged.

## Storage-change behavior

Choose and document one policy:

1. Re-resolve on the browser `storage` event and update Continue state, or
2. Declare page reload as the refresh boundary and expose that policy in diagnostics.

Silent stale capability is not acceptable.