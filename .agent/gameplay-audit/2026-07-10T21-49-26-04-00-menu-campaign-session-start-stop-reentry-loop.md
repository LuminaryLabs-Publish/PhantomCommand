# PhantomCommand Menu and Campaign Session Start, Stop, and Reentry Loop

**Timestamp:** `2026-07-10T21-49-26-04-00`

## Current loop

```txt
load index.html
  -> menu module constructs immediately
  -> menu loop runs until browser navigation
  -> game.html campaign module constructs immediately
  -> campaign loop runs until reload or browser navigation
  -> R reloads fresh campaign state
  -> Escape navigates to menu
```

## Current terminal behavior

```txt
win:
  state.won = true
  minimal completion summary written
  overlay rendered
  simulation update returns early

loss:
  state.lost = true
  overlay rendered
  simulation update returns early

restart:
  key R calls location.reload()

exit:
  Escape assigns location.href = "./"
```

## Gameplay lifecycle gaps

```txt
- no explicit campaign session ID
- no session status such as starting, running, paused, won, lost, stopping, disposed
- pause is a simulation Boolean rather than a lifecycle state
- no typed restart command or restart result
- no typed exit command or transition result
- win/loss does not close command admission explicitly
- no final committed session snapshot
- no session-scoped identifier reset proof
- no proof that a stale callback cannot mutate old state after restart
- no proof that a disposed session cannot write persistence
- no in-process reentry fixture
```

## Required gameplay lifecycle contract

```txt
new campaign
  -> sessionId allocated
  -> fresh state factory
  -> status running
  -> command and frame records scoped to sessionId

win or loss
  -> status terminal
  -> reject new gameplay commands with stable terminal reason
  -> commit final state fingerprint
  -> perform persistence through one terminal transaction

restart
  -> stop old session
  -> dispose listeners, frames, audio/render resources, and globals
  -> create fresh state with new sessionId
  -> prove counters, pads, units, camera, accumulator, and journals reset

exit to menu
  -> stop and dispose campaign session
  -> emit transition result
  -> navigate only after teardown result is committed
```

## Acceptance rows

```txt
running -> pause -> resume preserves sessionId
running -> win closes gameplay command admission
running -> loss closes gameplay command admission
terminal -> restart disposes old session and creates exactly one new session
running -> exit disposes before navigation admission
restart twice rapidly yields one replacement session
old session callback after restart produces rejected/stale-session result
old session persistence attempt after disposal produces rejected/stale-session result
```

## Relationship to action authority

Action-result authority should land first so terminal and stale-session rejections use the same command/result vocabulary. Lifecycle authority then scopes those commands, results, events, ticks, and frames under one campaign session.