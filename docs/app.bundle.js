webpackJsonp([0],{

/***/ 1149:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _levels = __webpack_require__(1150);

var _levels2 = _interopRequireDefault(_levels);

var _gameStates = __webpack_require__(466);

var STATES = _interopRequireWildcard(_gameStates);

var _arrow = __webpack_require__(1151);

var _effects = __webpack_require__(1152);

var _parallaxBackground = __webpack_require__(1154);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameScene = exports.GameScene = function (_Phaser$Scene) {
  _inherits(GameScene, _Phaser$Scene);

  function GameScene() {
    _classCallCheck(this, GameScene);

    var _this = _possibleConstructorReturn(this, (GameScene.__proto__ || Object.getPrototypeOf(GameScene)).call(this, { key: 'game' }));

    _this.levelIndex = 0;
    return _this;
  }

  _createClass(GameScene, [{
    key: 'preload',
    value: function preload() {
      this.load.image('target', 'assets/target.png');
      this.load.image('arrow', 'assets/arrow.png');

      this.load.image('background-back', 'assets/background-back.png');
      this.load.image('background-middle', 'assets/background-middle.png');
      this.load.image('background-front', 'assets/background-front.png');
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.registry.set('lives', 3);
      this.registry.set('charge', 200);
      this.scene.launch('ui');

      this.parallaxBackground = new _parallaxBackground.ParallaxBackground(this, 'background-back', 'background-middle', 'background-front');

      this.arrow = new _arrow.Arrow(this);
      this.arrow.reset();

      this.targets = this.physics.add.group({
        defaultKey: 'target',
        allowGravity: false,
        immovable: true,
        classType: Phaser.Physics.Arcade.Image
      });

      this.groundZone = this.add.zone(0, 260).setSize(640, 40).setScrollFactor(0);
      this.physics.world.enable(this.groundZone);
      this.groundZone.body.allowGravity = false;
      this.groundZone.body.immovable = true;

      this.scrollingLeft = false;
      this.leftScrollZone = this.add.zone(0, 0).setSize(100, 300).setInteractive();
      this.leftScrollZone.on('pointerover', function () {
        return _this2.scrollingLeft = true;
      });
      this.leftScrollZone.on('pointerout', function () {
        return _this2.scrollingLeft = false;
      });

      this.scrollingRight = false;
      this.rightScrollZone = this.add.zone(540, 0).setSize(100, 300).setInteractive();
      this.rightScrollZone.on('pointerover', function () {
        return _this2.scrollingRight = true;
      });
      this.rightScrollZone.on('pointerout', function () {
        return _this2.scrollingRight = false;
      });

      this.registry.set('state', STATES.PANNING_TO_TARGETS);

      this.input.setDefaultCursor('crosshair');

      this.input.on('pointerdown', this._startCharge, this);
      this.input.on('pointerup', this._fireArrow, this);

      this.physics.add.collider(this.arrow, this.targets, function (arrow, target) {
        return _this2._onArrowTargetCollide(arrow, target);
      });
      this.physics.add.collider(this.arrow, this.groundZone, function () {
        return _this2._onArrowWorldBoundsCollide();
      });

      this._loadLevel();
    }
  }, {
    key: 'update',
    value: function update() {
      this.arrow.update();

      var state = this.registry.get('state');

      if (state === STATES.REST) {
        if (this.scrollingLeft) {
          this.cameras.main.scrollX -= 6;
        } else if (this.scrollingRight) {
          this.cameras.main.scrollX += 6;
        }

        this.parallaxBackground.update(this.cameras.main.scrollX);

        this.leftScrollZone.x = this.cameras.main.scrollX;
        this.rightScrollZone.x = this.cameras.main.scrollX + 540;
      }
      if (state === STATES.CHARGE) {
        var chargeAmount = this.registry.get('charge');
        var newCharge = Phaser.Math.Clamp(chargeAmount + 5, 200, 700);
        this.registry.set('charge', newCharge);
      } else if (state === STATES.FLY) {
        this.groundZone.x = this.cameras.main.scrollX;

        var xScrollAmount = this.arrow.x - 50 - 400;
        if (xScrollAmount > 0) {
          this.cameras.main.scrollX = xScrollAmount;

          this.parallaxBackground.update(xScrollAmount);
        }
      }
    }
  }, {
    key: '_loadNextLevel',
    value: function _loadNextLevel() {
      this.levelIndex += 1;
      this._loadLevel();
    }
  }, {
    key: '_loadLevel',
    value: function _loadLevel() {
      var _this3 = this;

      var level = _levels2.default[this.levelIndex];

      level.targets.forEach(function (coordinates) {
        var target = _this3.targets.get();
        _this3.physics.world.enableBody(target);
        target.alpha = 1;
        target.active = true;

        target.x = coordinates.x;
        target.y = coordinates.y;
      });

      var furthestTargetCoordinates = level.targets.reduce(function (furthest, coordinates) {
        if (coordinates.x > furthest.x) {
          return coordinates;
        } else {
          return furthest;
        }
      }, { x: 0, y: 0 });

      this._scroll(furthestTargetCoordinates.x - 500, 800, {
        yoyo: true,
        delay: 400,
        hold: 500,
        ease: Phaser.Math.Easing.Quadratic.InOut,
        onComplete: function onComplete() {
          _this3.registry.set('state', STATES.REST);
        }
      });
    }
  }, {
    key: '_startCharge',
    value: function _startCharge() {
      this.registry.set('state', STATES.CHARGE);
      this._scroll(0, 200);
    }
  }, {
    key: '_fireArrow',
    value: function _fireArrow() {
      this.registry.set('state', STATES.FLY);
      this.arrow.fire();
    }
  }, {
    key: '_onArrowWorldBoundsCollide',
    value: function _onArrowWorldBoundsCollide() {
      var _this4 = this;

      this.registry.set('state', STATES.HIT);
      this.arrow.onHit();

      var nextLives = this.registry.get('lives') - 1;
      if (nextLives === 0) {
        this._endGame();
      }

      this.registry.set('lives', nextLives);

      _effects.Effects.flashOut([this.arrow], function () {
        _this4.registry.set('state', STATES.REST);

        _this4._reset();
      });
    }
  }, {
    key: '_onArrowTargetCollide',
    value: function _onArrowTargetCollide(arrow, target) {
      var _this5 = this;

      this.registry.set('state', STATES.HIT);
      this.arrow.onHit();

      _effects.Effects.flashOut([arrow, target], function () {
        _this5.registry.set('state', STATES.REST);

        _this5._reset();

        _this5.physics.world.disableBody(target.body);
        target.active = false;

        if (_this5.targets.countActive() === 0) {
          _this5._loadNextLevel();
        }
      });
    }
  }, {
    key: '_endGame',
    value: function _endGame() {
      this.scene.stop('game');
      this.scene.stop('ui');
      this.scene.start('results');
    }
  }, {
    key: '_reset',
    value: function _reset() {
      this.groundZone.x = 0;
      this._scroll(0, 300);
      this.arrow.reset();
      this.registry.set('charge', 200);
    }
  }, {
    key: '_scroll',
    value: function _scroll(targetScrollX, duration) {
      var _this6 = this;

      var additionalTweenProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var defaultTweenProps = {
        targets: this.cameras.main,
        props: {
          scrollX: targetScrollX
        },
        duration: duration,
        ease: Phaser.Math.Easing.Quadratic.Out,
        onUpdate: function onUpdate() {
          _this6.parallaxBackground.update(_this6.cameras.main.scrollX);
        }
      };
      var tweenProps = Object.assign(defaultTweenProps, additionalTweenProps);

      this.tweens.add(tweenProps);
    }
  }]);

  return GameScene;
}(Phaser.Scene);

/***/ }),

/***/ 1150:
/***/ (function(module, exports) {

module.exports = [{"targets":[{"x":500,"y":230},{"x":600,"y":230},{"x":900,"y":230}]},{"targets":[{"x":450,"y":230},{"x":550,"y":230}]}]

/***/ }),

/***/ 1151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Arrow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(106);

var _phaser2 = _interopRequireDefault(_phaser);

var _gameStates = __webpack_require__(466);

var STATES = _interopRequireWildcard(_gameStates);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Arrow = exports.Arrow = function (_Phaser$Physics$Arcad) {
  _inherits(Arrow, _Phaser$Physics$Arcad);

  function Arrow(scene) {
    _classCallCheck(this, Arrow);

    var _this = _possibleConstructorReturn(this, (Arrow.__proto__ || Object.getPrototypeOf(Arrow)).call(this, scene, 0, 0, 'arrow'));

    scene.sys.displayList.add(_this);
    scene.sys.updateList.add(_this);
    scene.physics.world.enableBody(_this);

    _this.setScale(0.75);
    _this.body.collideWorldBounds = true;
    _this.body.onWorldBounds = true;
    _this.body.allowGravity = false;
    return _this;
  }

  _createClass(Arrow, [{
    key: 'update',
    value: function update() {
      var state = this.scene.registry.get('state');

      if (state === STATES.FLY) {
        this.rotation = _phaser2.default.Math.Angle.BetweenPoints(_phaser2.default.Math.Vector2.ZERO, this.body.velocity);
      }

      if (state === STATES.REST || state === STATES.CHARGE) {
        this.angleToPointer();
      }
    }
  }, {
    key: 'angleToPointer',
    value: function angleToPointer() {
      var angle = _phaser2.default.Math.Angle.BetweenPoints(this, this.scene.input.activePointer);
      this.rotation = angle;
    }
  }, {
    key: 'fire',
    value: function fire() {
      this.body.allowGravity = true;
      this.scene.physics.velocityFromRotation(this.rotation, this.scene.registry.get('charge'), this.body.velocity);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.body.enable = true;

      this.x = 50;
      this.y = 240;

      this.alpha = 1;

      this.body.enable = true;
      this.body.allowGravity = false;
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
    }
  }, {
    key: 'onHit',
    value: function onHit() {
      this.body.enable = false;
    }
  }]);

  return Arrow;
}(_phaser2.default.Physics.Arcade.Sprite);

/***/ }),

/***/ 1152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Effects = undefined;

var _flashOut = __webpack_require__(1153);

var Effects = exports.Effects = {
  flashOut: _flashOut.flashOut
};

/***/ }),

/***/ 1153:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flashOut = flashOut;
function flashOut(gameObjects, callback) {
  if (gameObjects.length === 0) {
    callback();
  }

  var scene = gameObjects[0].scene;
  scene.tweens.add({
    targets: gameObjects,
    props: {
      alpha: 0
    },
    duration: 200,
    yoyo: true,
    repeat: 1,
    onComplete: function onComplete() {
      scene.tweens.add({
        targets: gameObjects,
        props: {
          alpha: 0
        },
        duration: 200,
        onComplete: function onComplete() {
          callback();
        }
      });
    }
  });
}

/***/ }),

/***/ 1154:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParallaxBackground = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(106);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParallaxBackground = exports.ParallaxBackground = function () {
  function ParallaxBackground(scene, backKey, middleKey, frontKey) {
    _classCallCheck(this, ParallaxBackground);

    this.scene = scene;

    this.backgroundBack = scene.add.tileSprite(0, 0, 640, 300, backKey);
    this.backgroundBack.setOrigin(0, 0);
    this.backgroundBack.setTileScale(1, 1.35);
    this.backgroundBack.setScrollFactor(0);

    this.backgroundMiddle = scene.add.tileSprite(0, 0, 640, 300, middleKey);
    this.backgroundMiddle.setOrigin(0, 0);
    this.backgroundMiddle.setTileScale(1, 1.35);
    this.backgroundMiddle.setScrollFactor(0);

    this.backgroundFront = scene.add.tileSprite(0, 0, 640, 300, frontKey);
    this.backgroundFront.setOrigin(0, 0);
    this.backgroundFront.setTileScale(1, 1.35);
    this.backgroundFront.setScrollFactor(0);
  }

  _createClass(ParallaxBackground, [{
    key: 'update',
    value: function update(scrollAmount) {
      this.backgroundBack.tilePositionX = scrollAmount / 3;
      this.backgroundMiddle.tilePositionX = scrollAmount / 2;
      this.backgroundFront.tilePositionX = scrollAmount;
    }
  }]);

  return ParallaxBackground;
}();

/***/ }),

/***/ 1155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UiScene = exports.UiScene = function (_Phaser$Scene) {
  _inherits(UiScene, _Phaser$Scene);

  function UiScene() {
    _classCallCheck(this, UiScene);

    return _possibleConstructorReturn(this, (UiScene.__proto__ || Object.getPrototypeOf(UiScene)).call(this, { key: 'ui' }));
  }

  _createClass(UiScene, [{
    key: 'preload',
    value: function preload() {
      this.load.image('gauge-outline', 'assets/gauge-outline.png');
      this.load.image('gauge-fill', 'assets/gauge-fill.png');

      this.load.image('arrow', 'assets/arrow.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.events.on('shutdown', this._cleanupRegistryListeners, this);

      this.registry.events.on('changedata_lives', this._updateLives, this);
      this.registry.events.on('changedata_charge', this._updateCharge, this);

      this.livesText = this.add.text(30, 15, 'Quiver:');
      this.livesImages = this.add.group([], {
        classType: Phaser.GameObjects.Image,
        key: 'arrow',
        setXY: { x: 120, stepX: 20, y: 22 },
        setRotation: { value: -45 },
        setScale: { x: 0.30, y: 0.30 },
        repeat: 2
      });

      this.chargeGaugeOutline = this.add.image(30, 40, 'gauge-outline').setOrigin(0).setScale(1, 0.8);
      this.chargeGaugeFill = this.add.image(30, 40, 'gauge-fill').setOrigin(0).setScale(1, 0.8);

      this._updateLives(null, this.registry.get('lives'));
      this._updateCharge(null, this.registry.get('charge'));
    }
  }, {
    key: '_cleanupRegistryListeners',
    value: function _cleanupRegistryListeners() {
      this.registry.events.off('changedata_lives', this._updateLives, this);
      this.registry.events.off('changedata_charge', this._updateCharge, this);
    }
  }, {
    key: '_updateLives',
    value: function _updateLives(parent, value) {
      this.livesImages.getChildren().forEach(function (lifeImage, i) {
        if (i < value) {
          lifeImage.visible = true;
        } else {
          lifeImage.visible = false;
        }
      });
    }
  }, {
    key: '_updateCharge',
    value: function _updateCharge(parent, value) {
      var baseCharge = 200;
      var maxCharge = 700;
      var chargePercent = (value - baseCharge) / (maxCharge - baseCharge);

      this.chargeGaugeFill.scaleX = chargePercent;
    }
  }]);

  return UiScene;
}(Phaser.Scene);

/***/ }),

/***/ 1156:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsScene = exports.ResultsScene = function (_Phaser$Scene) {
  _inherits(ResultsScene, _Phaser$Scene);

  function ResultsScene() {
    _classCallCheck(this, ResultsScene);

    return _possibleConstructorReturn(this, (ResultsScene.__proto__ || Object.getPrototypeOf(ResultsScene)).call(this, { key: 'results' }));
  }

  _createClass(ResultsScene, [{
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.add.text(320, 50, 'Results').setOrigin(0.5, 0);
      this.add.text(320, 100, 'Score: ' + this.registry.get('score')).setOrigin(0.5, 0);

      this.add.text(320, 150, 'Play Again', {
        fill: '#000',
        backgroundColor: '#6c6',
        padding: 6
      }).setOrigin(0.5, 0).setInteractive({ cursor: 'pointer' }).once('pointerup', function () {
        return _this2.scene.start('game');
      });
    }
  }]);

  return ResultsScene;
}(Phaser.Scene);

/***/ }),

/***/ 466:
/***/ (function(module, exports) {

module.exports = {"PANNING_TO_TARGETS":0,"REST":1,"CHARGE":2,"FLY":3,"HIT":4}

/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(106);

var _gameScene = __webpack_require__(1149);

var _uiScene = __webpack_require__(1155);

var _resultsScene = __webpack_require__(1156);

var gameConfig = {
  width: 640,
  height: 300,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      x: 0,
      y: 0,
      width: 1500,
      height: 300,
      gravity: {
        y: 400
      }
    }
  },
  scene: [_gameScene.GameScene, _uiScene.UiScene, _resultsScene.ResultsScene]
};

new Phaser.Game(gameConfig);

/***/ })

},[467]);