export class Balloon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'balloon-1');
    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);
    scene.physics.world.enableBody(this);

    this.setScale(0.2);
    this.body.allowGravity = false;

    this.setInteractive();
    this.once('pointerup', () => this.pop());
  }

  pop() {
    this.once('animationcomplete', () => {
      this.scene.physics.world.disableBody(this.body);
      this.visible = false;
      this.active = false;
    });

    this.anims.play('balloon-pop');
  }
}
