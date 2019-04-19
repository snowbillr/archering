current:

next up:
- split arrow skill
- skill store
- level builder
- hitbox plugin
  - take scale into account
- tutorial
- "enemy" types
  - deer running away
  - vertical osciallation (animation of helpers turning a lever?)
  - targets hanging from balloons (when balloon goes away the target falls to the ground)
  - horizontal target laying on ground

clean up:
- destroy or reuse notify texts
- skill button args are getting beefy
- some of the colliders are pretty similar, any opportunity to dry them up?
- level scene's load and restart methods are pretty similar, any opportunity to dry them up?

bugs:
- clicking on ui scene shouldn't propagate event down to level scene (https://github.com/photonstorm/phaser/blob/master/src/input/InputManager.js#L318)

ideas:
  - should targets and arrows disappear when they are hit/used up?
  - can buy skill charges with gold
  - can unlock skills and skill upgrades with stars
  - gold icon should change depending on how much gold you have
  - achievements
    - something watching the registry
    - when it happens, show a notification on the screen (banner pops in in the top right?)
    - reward is gold
