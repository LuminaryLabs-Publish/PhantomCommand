# PhantomCommand Project Breakdown Tracker

**Timestamp:** `2026-07-11T01-20-51-04-00`

## Plan ledger

**Goal:** make the menu-to-campaign Continue decision implementation-ready by replacing six-slot Boolean presence with one deterministic, clone-safe save-candidate resolution contract shared by menu admission, route intent, campaign startup, diagnostics, and validation.

- [x] Enumerate all accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the nine eligible repositories with the central ledger.
- [x] Confirm central tracking and root `.agent` state for all eligible repositories.
- [x] Select only `LuminaryLabs-Publish/PhantomCommand` as the oldest eligible documented fallback.
- [x] Read the menu, campaign, checks, package scripts, deployment workflow, and prior audits.
- [x] Trace the interaction loop from storage scan through route navigation and campaign initialization.
- [x] Identify all active domains, implemented kits, and kit-provided services.
- [x] Map the six physical storage slots and current victory-summary writer.
- [x] Define candidate classification, precedence, decision, route-intent, and startup-admission contracts.
- [x] Add timestamped architecture, render, gameplay, interaction, save-authority, deploy, and turn-ledger records.
- [x] Refresh the required root `.agent` documents.
- [x] Update the central repo ledger.
- [x] Add the central internal change-log entry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.

## Selected repository

`LuminaryLabs-Publish/PhantomCommand`

All nine eligible non-Cavalry repositories were already tracked and had root `.agent` state. `PhantomCommand` had the oldest current central-ledger timestamp, `2026-07-10T23-40-35-04-00`.

## Principal result

The menu scans three keys in local and session storage, calls the scan twice, and reduces all evidence to a Boolean. Any non-empty value can enable Continue. The campaign never reads `campaign=new|continue`, never consumes a selected candidate, and always initializes the same fresh state. The only current writer stores a victory summary `{ scene, souls, wave }`, which is not a resumable session.

## Queue

```txt
1. Continue Capability Resolver + Save Candidate Precedence Fixture Gate
2. Campaign Action Result Authority + Fixed-Step Replay/Frame Fixture Gate
3. Runtime Session Lifecycle Authority + Menu/Campaign Teardown Fixture Gate
4. Versioned Save Envelope + Atomic Resume Fidelity Gate
```
