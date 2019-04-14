export class Bomb {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = scene.physics.add.sprite(x, y, 'bomb')
      .setCircle(32)
      .setDisplaySize(32, 32)
  }
}
