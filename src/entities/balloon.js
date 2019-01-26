export class Balloon {
  constructor(scene, balloonX, balloonY) {
    this.scene = scene;

    this.balloon = scene.physics.add.sprite(balloonX, balloonY, 'balloon-1');
    this.balloon.setOrigin(0.5);
    this.balloon.setScale(0.1);
    this.balloon.body.allowGravity = false;

    this.string = scene.physics.add.sprite(balloonX, 265, 'balloon-string');
    this.string.setOrigin(0.5, 1);
    this.string.displayHeight = 265 - (balloonY + this.balloon.displayHeight / 2);
    this.string.displayWidth = 5;
    this.string.body.allowGravity = false;
  }

  pop() {
    this.scene.physics.world.disableBody(this.balloon.body);

    this.balloon.once('animationcomplete', () => {
      this.balloon.visible = false;
      this.balloon.active = false;
    });

    this.balloon.play('balloon-pop');
    this.scene.tweens.add({
      targets: [this.string],
      props: {
        scaleY: 0
      },
      duration: 200,
      easing: Phaser.Math.Easing.Quadratic.Out,
    });
  }
}
