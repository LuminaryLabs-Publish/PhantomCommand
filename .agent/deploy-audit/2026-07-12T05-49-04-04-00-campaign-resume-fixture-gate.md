# Deploy Audit: Campaign Resume Fixture Gate

**Timestamp:** `2026-07-12T05-49-04-04-00`

## Current checks

`npm run check` executes source-text checks for menu and campaign files. The checks prove route strings and source tokens exist. They do not execute storage admission, route parsing, hydration or resumed rendering.

## Required Node fixtures

```txt
launch-intent parser
save-key precedence
malformed JSON rejection
wrong-product and wrong-scene rejection
unsupported-version rejection
legacy migration
semantic reference validation
entity counter reseeding
new-run predecessor-save policy
save round-trip read-model parity
bootstrap idempotence
```

## Required browser smokes

```txt
Begin from empty storage
Begin with an existing save
Continue with valid canonical save
Continue with malformed canonical save
Continue with unrelated nexus.sceneSnapshot
Continue after supported migration
reload after accepted bootstrap
return to menu after save commit
first resumed world/HUD/minimap frame correlation
GitHub Pages route and storage smoke
```

## Browser matrix

```txt
Chromium
WebKit
localStorage available/unavailable
sessionStorage fallback present/absent
new/continue query values
valid/malformed/incompatible payloads
```

## Gate

Deployment is not campaign-resume complete until rejected candidates cause no gameplay mutation, accepted candidates hydrate atomically, the menu capability matches campaign admission and the first visible resumed frame cites the committed bootstrap generation.