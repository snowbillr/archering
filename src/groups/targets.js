import { config } from '../config';

export class Targets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene, {
      defaultKey: 'target',
      allowGravity: false,
      immovable: true,
      classType: Phaser.Physics.Arcade.Image,
    });

    scene.sys.updateList.add(this);
  }

  createTargetsForLevel(level) {
    level.targets.forEach(coordinates => {
      const target = this.get();
      this.scene.physics.world.enableBody(target);

      target.alpha = 1;
      target.active = true;

      target.x = coordinates.x;
      target.y = config.layouts.game.targets.y;
    });
  }

  getFurthestTargetX() {
    return this.getChildren().reduce((furthestX, target) => {
      if (target.x > furthestX) {
        return target.x;
      } else {
        return furthestX;
      }
    }, 0);
  }

  onTargetHit(target) {
    this.scene.physics.world.disableBody(target.body);
    target.active = false;
  }
}
