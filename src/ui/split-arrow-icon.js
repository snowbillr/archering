export class SplitArrowIcon {
  constructor(scene, x, y) {
    scene.add.image(x, y, 'arrow')
      .setAngle(-55)
      .setScale(0.35);

    scene.add.image(x, y, 'arrow')
      .setAngle(-15)
      .setScale(0.35);
  }
}
