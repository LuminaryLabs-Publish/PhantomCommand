# Campaign Terminal Outcome Settlement DSK Map

**Timestamp:** `2026-07-14T13-40-59-04-00`

## Summary

Campaign terminal truth is currently split across mutable flags, wave mutation, rewards, localStorage, HUD projection and browser-global readback. One coordinating domain must settle conflicting proposals before any consumer adopts victory or defeat.

## Plan ledger

**Goal:** define domain ownership and service boundaries for exclusive campaign outcome settlement.

- [x] Map current source-backed domains and kits.
- [x] Identify every terminal participant.
- [x] Define one parent authority and child services.
- [ ] Implement only through existing owning domains or one coordinating DSK family.

## Current domain chain

```txt
fixed-step scheduler
  -> unit movement and sanctum breach
  -> tower and projectile updates
  -> wave-clear detection
  -> reward mutation
  -> victory save attempt
  -> HUD and CRT projection
  -> GameHost readback
```

## Ownership problem

```txt
sanctum loss owner: updateUnit()
final-wave victory owner: update()
reward owner: update() and damage()
persistence owner: update()
presentation owner: drawUI()
retry owner: keyboard reload
public truth owner: mutable state exposed by GameHost
exclusive settlement owner: absent
```

## Required parent domain

```txt
phantom-command-campaign-terminal-outcome-conflict-settlement-authority-domain
```

## Child kit map

| Kit | Service |
|---|---|
| `campaign-run-identity-kit` | Stable run identity and generation |
| `simulation-step-identity-kit` | Fixed-step identity and ordering |
| `wave-identity-kit` | Wave revision and attempt identity |
| `terminal-proposal-kit` | Typed proposal envelope |
| `sanctum-loss-proposal-kit` | Core-depletion loss proposal |
| `final-wave-clear-proposal-kit` | Final-clear victory proposal |
| `terminal-conflict-classifier-kit` | Zero, single, duplicate and conflicting proposal classification |
| `outcome-precedence-policy-kit` | Versioned terminal precedence |
| `campaign-terminal-settlement-kit` | Exactly-once accepted outcome |
| `terminal-result-fingerprint-kit` | Immutable result fingerprint |
| `reward-policy-revision-kit` | Versioned kill, wave and terminal reward rules |
| `wave-reward-settlement-kit` | Idempotent reward receipt |
| `victory-save-candidate-kit` | Save candidate derived from accepted victory |
| `save-commit-result-kit` | Typed persistence commit result |
| `terminal-state-projection-kit` | HUD and overlay descriptor from accepted result |
| `gamehost-outcome-readback-kit` | Immutable public outcome readback |
| `first-terminal-frame-ack-kit` | First frame matching the accepted result |
| `campaign-retry-command-kit` | Explicit successor-run command |
| `retry-lineage-kit` | Predecessor and successor linkage |
| `stale-step-rejection-kit` | Rejection of predecessor work |
| `outcome-journal-kit` | Bounded retained result history |
| `source-build-pages-outcome-fixture-kit` | Cross-artifact terminal proof |

## Required services

```txt
propose terminal condition
classify conflict
apply versioned precedence
settle one outcome
settle rewards exactly once
commit or reject save candidate
publish immutable readback
project matching terminal UI
acknowledge first matching frame
allocate retry lineage
reject stale predecessor work
retain bounded outcome history
```

## Admission contract

```txt
CampaignTerminalSettlementCommand {
  runId
  stepId
  waveId
  campaignRevision
  rewardPolicyRevision
  outcomePolicyRevision
  proposals[]
}

CampaignTerminalSettlementResult =
  Accepted | NoTerminal | Duplicate | ConflictResolved | Stale | Failed
```

## Validation boundary

Architecture documentation only. No DSK or runtime implementation was added.