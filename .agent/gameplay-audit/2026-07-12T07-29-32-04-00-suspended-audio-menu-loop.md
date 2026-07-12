# Gameplay Audit: Suspended Audio Menu Loop

**Timestamp:** `2026-07-12T07-29-32-04-00`

## Reachable loop

```txt
ambience preference is enabled
  -> first admitted gesture creates context and graph
  -> browser or operating system suspends/interupts the context
  -> state.audio remains non-null
  -> later pointer or keyboard gesture calls ensureAudio()
  -> ensureAudio() returns because state.audio exists
  -> context.resume() is never attempted
  -> menu remains visually active with ambience enabled
  -> UI tone calls create nodes against a non-running context
```

The player can receive a functioning visual menu with silently non-running audio and no recovery affordance other than toggling ambience off and on or reloading.

## Rapid-toggle loop

```txt
ambience on
  -> graph generation A running
ambience off
  -> state.audio cleared
  -> generation A fades and close timer waits 300 ms
ambience on before timer fires
  -> generation B created
  -> generation A still alive until delayed close
```

No generation fence or timer cancellation proves that only one graph is current.

## Required gameplay rule

Menu input must not merely call a construction helper. It must submit an audio lifecycle command whose result is reflected in the next menu observation.

```txt
user gesture
  -> activation evidence
  -> create or resume command
  -> typed result
  -> current graph generation
  -> menu observation
```

## Completion gate

The menu audio loop is not complete until a background/foreground cycle, an interruption recovery, a rapid off/on sequence and a navigation transition each finish with one deterministic current or disposed audio generation.