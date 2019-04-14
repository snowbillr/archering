export class Cannonball {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = scene.physics.add.sprite(x, y, 'cannonball')
      .setCircle(32)
      .setDisplaySize(32, 32)
  }
}
