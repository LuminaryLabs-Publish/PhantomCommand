# Outside-Release Stuck-Gesture Loop

```txt
canvas pointerdown
  -> start selection drag or camera pan
  -> pointer leaves canvas
  -> release occurs outside
  -> canvas pointerup may not run
  -> mutable gesture flag remains active
  -> later move/render can continue consuming it
  -> blur eventually clears it only if blur occurs
```

No runtime reproduction is claimed. The source lacks the ownership and settlement paths needed to rule the loop out.
