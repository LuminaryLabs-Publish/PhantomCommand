# Input Region Browser Fixture Gate

**Timestamp:** `2026-07-17T06-38-14-04-00`

## Required fixtures

```txt
source browser fixture
  click status HUD -> no world selection
  drag tower strip -> no marquee selection
  RMB minimap -> no world order unless explicit map navigation is implemented
  click paused/won/lost overlay -> no world mutation
  click letterbox/pillarbox -> rejected as outside-source
  click unobscured world -> existing selection behavior preserved
  drag unobscured world -> existing marquee behavior preserved
  RMB unobscured world -> existing order behavior preserved

revision fixture
  resize between down/up -> stale manifest rejected
  modal opens during gesture -> gesture retired
  route replacement -> stale gesture rejected

frame fixture
  accepted world command publishes FirstRegionBoundCommandFrameAck
  rejected presentation-region evidence produces no gameplay revision

origin fixture
  source
  built artifact
  GitHub Pages
```

## Gate

Do not claim input-region correctness until the same fixture matrix passes against source, built output and Pages origin with matching command/result digests.

## Current evidence

```txt
static source inspection: complete
browser fixtures: not run
artifact fixtures: not run
Pages fixtures: not run
```

## Boundary

No workflow, test, build or deployment file changed.