export class SpectralArrowIcon {
  constructor(scene, x, y) {
    scene.add.image(x, y, 'arrow-glow')
      .setScale(0.45)
      .setAngle(-45);
  }
}
