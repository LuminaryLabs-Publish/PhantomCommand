# Deploy audit: campaign action result fixture build gate

Timestamp: 2026-07-10T14-11-51-04-00

## Deploy posture

No runtime source, deploy config, branch, or workflow was changed in this pass. This was a docs-only `.agent` breakdown.

## Existing scripts

`package.json` exposes:

```txt
npm run check
npm run build
```

`npm run check` currently runs menu and campaign checks. `npm run build` copies static artifacts. The campaign action-result fixture does not exist yet.

## Required gate before deploy-sensitive work

Before camera rewrites, renderer replacement, wave expansion, economy expansion, enemy art expansion, or RTS system expansion, add a campaign fixture gate that proves:

- campaign source manifest and fingerprint;
- source dimensions 640 x 360;
- ring count 7 and lane count 4;
- tower catalog: spire, lantern, ward;
- unit catalog: guard, archer, runner, shield, zealot, brute, wraith;
- wave count 6;
- accepted/rejected select, build, order, and start-wave ActionResult rows;
- simulation frame rows;
- render readback rows;
- legacy GameHost fields preserved;
- additive `GameHost.getState().campaign` proof block.

## Validation for this pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
construct smoke: not run
campaign fixture: not run because proof files do not exist yet
browser smoke: not run
pushed to main: yes
central ledger updated: yes
```
