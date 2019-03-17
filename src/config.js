const viewportWidth = 640;

export const config = {
  dimensions: {
    viewport: {
      width: viewportWidth,
      height: 300,
    },
    world: {
      width: 1500,
      height: 300,
    }
  },
  layouts: {
    game: {
      arrow: {
        x: 50,
        y: 240,
        minCharge: 200,
        maxCharge: 700,
      },
      targets: { y: 230 },
      balloons: {
        string: {
          bottomY: 260,
          width: 5,
        }
      },
      groundZone: {
        x: 0,
        y: 260,
        width: viewportWidth,
        height: 40,
      },
    }
  }
}
