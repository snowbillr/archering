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
    level: {
      arrow: {
        x: 50,
        y: 210,
      },
      targets: { y: 202 },
      balloons: {
        string: {
          bottomY: 230,
          width: 5,
        }
      },
      groundZone: {
        x: 0,
        y: 238,
        width: viewportWidth,
        height: 40,
      },
      scrollZones: {
        width: 100,
        height: viewportHeight - 100,
        leftX: 0,
        rightX: 540,
        y: 60,
      },
      background: {
        width: viewportWidth,
        height: 270,
      }
    },
    results: {
      title: {
        x: 320,
        y: 40,
        size: 32,
      },
      background: {
        x: viewportWidth / 2,
        y: viewportHeight / 2,
        width: viewportWidth * 1.3,
        height: viewportHeight * 1.3,
      },
      levelSelectButton: {
        x: 320,
        y: 260,
      },
      scores: {
        y: 80,
        yStep: 30,
        labelX: 250,
        valueX: 350,
        size: 24,
      },
      stars: {
        yTopMargin: 18,
        x: 275,
        xStep: 40,
        width: 36,
        height: 36,
      }
    },
    ui: {
      background: {
        x: -30,
        y: 240,
        width: viewportWidth + 70,
        height: viewportHeight - 230,
      },
      goldIcon: {
        x: 270,
        y: viewportHeight - 30,
        width: 40,
        height: 40,
      },
      goldText: {
        x: 300,
        y: viewportHeight - 28,
        size: 28,
      },
      quiverLabel: {
        x: 15,
        y: 250,
        size: 22,
      },
      arrows: {
        x: 105,
        xStep: 20,
        y: 258,
        rotation: -45,
      },
      chargeLabel: {
        x: 15,
        y: 273,
        size: 22,
      },
      chargeGauge: {
        x: 95,
        y: 272,
      },
      restartButton: {
        x: 600,
        y: 15,
      }
    }
  },
  entities: {
    level: {
      arrow: {
        minCharge: 200,
        maxCharge: 700,
      },
      notify: {
        size: 20,
      }
    }
  }
}
