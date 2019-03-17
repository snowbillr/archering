const viewportWidth = 640;
const viewportHeight = 300;

export const config = {
  dimensions: {
    viewport: {
      width: viewportWidth,
      height: viewportHeight,
    },
    world: {
      width: 1500,
      height: viewportHeight,
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
      scrollZones: {
        width: 100,
        height: viewportHeight,
        leftX: 0,
        rightX: 540,
        y: 0,
      }
    }
  }
}
