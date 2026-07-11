# PhantomCommand Fixed-Step Replay Fixture Gate

**Timestamp:** `2026-07-10T23-40-35-04-00`

## Current gate

```txt
npm run check
  -> node scripts/check-menu.mjs
  -> node scripts/check-campaign.mjs

npm run build
  -> node scripts/build-static.mjs
```

The current checks prove source patterns and expected route files. They do not execute campaign commands, fixed-step admission, replay, fingerprints, committed frames, or render-consumption readback.

## Required fixture files

```txt
tests/phantom-command-action-result-fixture.mjs
tests/phantom-command-fixed-step-replay-fixture.mjs
tests/phantom-command-frame-consumption-fixture.mjs
tests/fixtures/phantom-command-action-cases.json
```

## Fixture 1: action results

Prove stable accepted, rejected, and no-op rows for:

```txt
selection replace and toggle
pad selection
tower build success
insufficient-souls build
occupied-pad build
move order
unit-target order
order with no selection
wave start
wave start while active
request after win
request after loss
unsupported command
stale command
```

Required assertions:

```txt
- stable reason vocabulary
- one result per request
- rejected/no-op fingerprint immutability
- deterministic ID allocation for accepted mutation
- clone-safe journal rows
```

## Fixture 2: fixed-step replay

Run a pure campaign state through an ordered command stream without DOM, Canvas, WebGL, RAF, or wall-clock dependencies.

```txt
initial state
  -> submit commands with sequences and target ticks
  -> advance exact fixed ticks
  -> collect results and events
  -> collect final canonical fingerprint
  -> repeat from the same initial state
```

Required assertions:

```txt
- result equality
- event equality
- ID equality
- final fingerprint equality
- same-tick commands apply in sequence order
- rejected commands do not change the final fingerprint
```

## Fixture 3: frame consumption

Use pure render consumers or spies to prove:

```txt
world
HUD
minimap
modal
CRT upload
CRT draw
GameHost readback
```

all reference one committed frame ID and fingerprint for one browser render pass.

## Proposed scripts

```json
{
  "fixture:action-results": "node tests/phantom-command-action-result-fixture.mjs",
  "fixture:fixed-step-replay": "node tests/phantom-command-fixed-step-replay-fixture.mjs",
  "fixture:frame-consumption": "node tests/phantom-command-frame-consumption-fixture.mjs"
}
```

Do not add these scripts until the fixtures run independently and pass.

## Gate order

```txt
1. candidate resolver fixture
2. action-result fixture
3. fixed-step replay fixture
4. committed-frame consumption fixture
5. existing source-pattern checks
6. static build
7. browser smoke
8. Pages deployment
```

## Browser smoke

After headless fixtures pass, verify:

```txt
- existing menu and campaign visuals remain unchanged
- controls remain responsive
- one source request creates one command receipt
- GameHost exposes clone-safe journals and committed frame readback
- rejected commands show no visible or fingerprint mutation
- world, HUD, minimap, modal, and CRT report the same frame identity
```

## Deployment rule

No Pages deployment should be treated as validated until headless action/replay/frame fixtures and the existing `npm run check` and `npm run build` gates pass on the exact deployed commit.

## Current validation state

```txt
action-result fixture: absent
fixed-step replay fixture: absent
frame-consumption fixture: absent
npm run check in this docs pass: not run
npm run build in this docs pass: not run
browser smoke in this docs pass: not run
runtime source changed: no
```
