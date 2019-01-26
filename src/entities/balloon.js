export class Balloon {
  constructor(scene, balloonX, balloonY) {
    this.scene = scene;

    const bg = scene.add.graphics();
    bg.fillStyle(0xFFFFFF);
    bg.fillRect(0, 0, 640, 300);

    this.balloon = scene.physics.add.sprite(balloonX, balloonY, 'balloon-1');
    this.balloon.setOrigin(0.5);
    this.balloon.setScale(0.2);
    this.balloon.body.allowGravity = false;
    this.balloon.setInteractive();
    this.balloon.once('pointerup', () => this.pop());

    this.string = scene.physics.add.sprite(balloonX, 300, 'balloon-string');
    this.string.setOrigin(0.5, 1);
    this.string.displayHeight = balloonY + this.balloon.displayHeight / 2;
    this.string.body.allowGravity = false;
  }

  pop() {
    this.balloon.once('animationcomplete', () => {
      this.scene.physics.world.disableBody(this.balloon.body);
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
