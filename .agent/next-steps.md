# PhantomCommand Next Steps

**Timestamp:** `2026-07-11T03-41-49-04-00`

## Summary

Keep the dependency order intact. Continue resolution and action-result authority remain first; the lifecycle implementation should then wrap the existing menu and campaign modules without changing their visuals or rules.

## Plan ledger

**Goal:** implement deterministic runtime ownership from startup through navigation and disposal, then prove it with scheduler, listener, global, audio and WebGL fixtures.

- [ ] Finish save-candidate resolution first.
- [ ] Finish fixed-step command/action-result authority second.
- [ ] Extract menu and campaign construction from module scope into factories.
- [ ] Add a shared runtime-session authority.
- [ ] Add fake-environment lifecycle fixtures.
- [ ] Add browser remount/navigation smoke coverage.
- [ ] Only then add the versioned resumable save envelope.

## Ordered implementation sequence

1. **Extract route factories**
   - Add `createMenuSession(environment, options)`.
   - Add `createCampaignSession(environment, options)`.
   - Keep current entry modules as thin boot adapters.
   - Do not change drawing, timings, controls or gameplay.

2. **Add session identity and state**
   - Allocate `sessionId`, `runId` and monotonic `runGeneration`.
   - Use explicit states: `constructing`, `running`, `transitioning`, `stopping`, `disposed`, `failed`.
   - Reject invalid transitions with typed reasons.

3. **Add startup transaction and rollback**
   - Register cleanup immediately after each resource acquisition.
   - Roll back in reverse order if any later acquisition fails.
   - Publish a clone-safe startup result.

4. **Own the RAF**
   - Retain the exact pending request ID.
   - Cancel before transition, restart or dispose.
   - Capture the generation in each callback.
   - Reject callbacks from stale generations.
   - Never permit more than one pending callback per session.

5. **Own listeners and timers**
   - Replace anonymous handlers with named functions.
   - Register through a listener lease ledger.
   - Retain fade/navigation and audio-close timers.
   - Cancel or settle them during teardown.

6. **Lease globals**
   - Install `PhantomMenu` or `GameHost` through a lease.
   - Record the previous property descriptor/value.
   - Restore only when the disposing session still owns the lease.
   - Expose immutable lifecycle readback instead of raw ownership objects.

7. **Own audio**
   - Track context, sources, nodes and close promise.
   - Stop and disconnect sources once.
   - Cancel delayed-close timers.
   - Await or record context close completion.

8. **Own CRT/WebGL**
   - Retain shader handles until post-link cleanup.
   - Add `dispose()` and `getLifecycleState()`.
   - Delete texture, buffer, program and retained shaders exactly once.
   - Reject `render`, `resize` and coordinate operations after disposal with typed results.

9. **Add transition authority**
   - Normalize Begin, Continue, Restart and Exit as transition commands.
   - Admit at most one terminal transition per session.
   - Stop new input and command admission.
   - Complete teardown before navigation or reload.
   - Publish transition and disposal results.

10. **Add lifecycle observation**
    - Bounded journal with sequence, sessionId, runGeneration, state, operation, result and resource counts.
    - Clone-safe menu/campaign host snapshot.
    - No raw WebGL, AudioContext, mutable state or mutable camera references.

11. **Add fixtures**
    - Startup success and failure rollback.
    - Duplicate start/stop/dispose.
    - Stale RAF callback after restart.
    - Exact listener add/remove parity.
    - Global lease restoration and ownership conflict.
    - Audio close timer cancellation.
    - CRT resource deletion and render-after-dispose rejection.
    - Menu-to-campaign navigation teardown.
    - Campaign restart and exit teardown.
    - Two mount/dispose cycles with zero retained resources.

12. **Add deployment gate**
    - Run `npm run check`.
    - Run `npm run build`.
    - Add `npm run fixture:lifecycle`.
    - Add a browser smoke that mounts, transitions, remounts and confirms one RAF chain and zero leaked resources.

## First target files

```txt
src/runtime/runtime-session.js
src/runtime/resource-ledger.js
src/runtime/listener-lease.js
src/runtime/global-lease.js
src/menu/graveyard-menu.js
src/menu/crt-renderer.js
src/campaign/campaign-scene.js
tests/runtime-lifecycle.fixture.mjs
scripts/check-lifecycle.mjs
package.json
```

## Out of scope for this ledge

```txt
new waves or units
camera rewrite
renderer replacement
visual polish
new save UI
full save hydration
networking
construct-profile revival
```
