import { config } from '../config';
const balloonStringConfig = config.layouts.game.balloons.string;

export class Balloon {
  constructor(scene, balloonX, balloonY) {
    this.scene = scene;

    this.balloon = scene.add.sprite(balloonX, balloonY, 'balloon-1');
    this.balloon.setOrigin(0.5);
    this.balloon.setScale(0.1);
    this.scene.arcadeHitboxPlugin.addHitbox({
      sprite: this.balloon,
      xOffset: 0,
      yOffset: -2,
      width: 30,
      height: 37,
    });
    this.balloon.hitbox.body.allowGravity = false;

    this.string = scene.add.sprite(balloonX, balloonStringConfig.bottomY, 'balloon-string');
    this.string.setOrigin(0.5, 1);
    this.string.displayHeight = balloonStringConfig.bottomY - (balloonY + this.balloon.displayHeight / 2);
    this.string.displayWidth = balloonStringConfig.width;
    this.scene.arcadeHitboxPlugin.addHitbox({
      sprite: this.string,
      xOffset: 0,
      yOffset: -(this.string.displayHeight / 2),
      width: 6,
      height: this.string.displayHeight,
    });
    this.string.hitbox.body.allowGravity = false;

    this.popSound = scene.sound.add('balloon-pop');
  }

  pop() {
    this.scene.physics.world.disableBody(this.balloon.hitbox.body);
    this.scene.physics.world.disableBody(this.string.hitbox.body);

    this.popSound.play();

    this.balloon.once('animationcomplete', () => {
      this.balloon.visible = false;
      this.balloon.active = false;

      this.string.visible = false;
      this.string.active = false;
    });

    this.balloon.play('balloon-pop');
    this._collapseString();
  }

  cutString() {
    this.scene.physics.world.disableBody(this.balloon.hitbox.body);
    this.scene.physics.world.disableBody(this.string.hitbox.body);

    this._collapseString();
    this._floatBalloonAway();
  }

  _collapseString() {
    this.scene.tweens.add({
      targets: [this.string],
      props: {
        scaleY: 0
      },
      duration: 200,
      easing: Phaser.Math.Easing.Quadratic.Out,
    });
  }

  _floatBalloonAway() {
    const balloonDrift = Phaser.Math.RND.pick(['+=50', '-=50']);

    this.scene.tweens.add({
      targets: [this.balloon],
      props: {
        y: 0 - (this.balloon.displayHeight / 2),
      },
      duration: 700,
      easing: Phaser.Math.Easing.Expo.In,
    });

    this.scene.tweens.add({
      targets: [this.balloon],
      props: {
        x: balloonDrift,
      },
      duration: 700,
      easing: Phaser.Math.Easing.Cubic.InOut,
    });
  }
}
