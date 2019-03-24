next up:
- level builder
- restart button for a level
- bullseye bonus (use a hitbox!)

clean up:
- hitbox plugin
  - what should the hitbox plugin return from `addHitbox`?
  - how should hitboxes be accessed from outside the parent/sprite?
  - what happens if a parent has multiple hitboxes?

bugs:
- click zones on level select screen aren't quite accurate
- better "target score" calculation for results. (targets - arrows?)
- if you start holding down the mouse when an arrow is still flashing, it gets stuck at 0 charge for the next shot
