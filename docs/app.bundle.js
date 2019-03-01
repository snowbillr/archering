webpackJsonp([0],{

/***/ 1151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _balloon = __webpack_require__(467);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestScene = exports.TestScene = function (_Phaser$Scene) {
  _inherits(TestScene, _Phaser$Scene);

  function TestScene() {
    _classCallCheck(this, TestScene);

    return _possibleConstructorReturn(this, (TestScene.__proto__ || Object.getPrototypeOf(TestScene)).call(this, { key: 'test' }));
  }

  _createClass(TestScene, [{
    key: 'preload',
    value: function preload() {
      this.load.image('balloon-1', 'assets/balloon/1.png');
      this.load.image('balloon-2', 'assets/balloon/2.png');
      this.load.image('balloon-3', 'assets/balloon/3.png');
      this.load.image('balloon-4', 'assets/balloon/4.png');
      this.load.image('balloon-5', 'assets/balloon/5.png');
      this.load.image('balloon-6', 'assets/balloon/6.png');
      this.load.image('balloon-string', 'assets/balloon/string.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.anims.create({
        key: 'balloon-pop',
        frames: [{ key: 'balloon-1' }, { key: 'balloon-2' }, { key: 'balloon-3' }, { key: 'balloon-4' }, { key: 'balloon-5' }, { key: 'balloon-6' }]
      });

      var balloon = new _balloon.Balloon(this, 100, 100);
      balloon.x = 100;
      balloon.y = 100;
    }
  }]);

  return TestScene;
}(Phaser.Scene);

/***/ }),

/***/ 1152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreloadScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(73);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreloadScene = exports.PreloadScene = function (_Phaser$Scene) {
  _inherits(PreloadScene, _Phaser$Scene);

  function PreloadScene() {
    _classCallCheck(this, PreloadScene);

    return _possibleConstructorReturn(this, (PreloadScene.__proto__ || Object.getPrototypeOf(PreloadScene)).call(this, { key: 'preload' }));
  }

  _createClass(PreloadScene, [{
    key: 'preload',
    value: function preload() {
      this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');
    }
  }, {
    key: 'create',
    value: function create() {
      this.scene.start('level-select');
    }
  }]);

  return PreloadScene;
}(_phaser2.default.Scene);

/***/ }),

/***/ 1153:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameStates = __webpack_require__(221);

var STATES = _interopRequireWildcard(_gameStates);

var _arrow = __webpack_require__(1154);

var _effects = __webpack_require__(1155);

var _parallaxBackground = __webpack_require__(1157);

var _targets = __webpack_require__(1158);

var _groundZone = __webpack_require__(1159);

var _scrollZone = __webpack_require__(1160);

var _balloons = __webpack_require__(1161);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameScene = exports.GameScene = function (_Phaser$Scene) {
  _inherits(GameScene, _Phaser$Scene);

  function GameScene() {
    _classCallCheck(this, GameScene);

    return _possibleConstructorReturn(this, (GameScene.__proto__ || Object.getPrototypeOf(GameScene)).call(this, { key: 'game' }));
  }

  _createClass(GameScene, [{
    key: 'preload',
    value: function preload() {
      this.load.image('target', 'assets/target.png');
      this.load.image('arrow', 'assets/arrow.png');

      this.load.image('balloon-1', 'assets/balloon/1.png');
      this.load.image('balloon-2', 'assets/balloon/2.png');
      this.load.image('balloon-3', 'assets/balloon/3.png');
      this.load.image('balloon-4', 'assets/balloon/4.png');
      this.load.image('balloon-5', 'assets/balloon/5.png');
      this.load.image('balloon-6', 'assets/balloon/6.png');
      this.load.image('balloon-string', 'assets/balloon/string.png');

      this.load.image('background-back', 'assets/background-back.png');
      this.load.image('background-middle', 'assets/background-middle.png');
      this.load.image('background-front', 'assets/background-front.png');
    }
  }, {
    key: 'create',
    value: function create(_ref) {
      var _this2 = this;

      var level = _ref.level;

      this.anims.create({
        key: 'balloon-pop',
        frames: [{ key: 'balloon-1' }, { key: 'balloon-2' }, { key: 'balloon-3' }, { key: 'balloon-4' }, { key: 'balloon-5' }, { key: 'balloon-6' }]
      });

      this.registry.set('charge', 200);
      this.registry.set('scrollingDirection', 0);
      this.registry.set('state', STATES.PANNING_TO_TARGETS);

      this.scene.launch('ui');

      this.parallaxBackground = new _parallaxBackground.ParallaxBackground(this, 'background-back', 'background-middle', 'background-front');
      this.arrow = new _arrow.Arrow(this);
      this.targets = new _targets.Targets(this);
      this.balloons = new _balloons.Balloons(this, level);
      this.groundZone = new _groundZone.GroundZone(this);
      this.leftScrollZone = new _scrollZone.ScrollZone(this, -1);
      this.rightScrollZone = new _scrollZone.ScrollZone(this, 1);

      this.cameras.main.setBounds(0, 0, 1500, 300);

      this.input.setDefaultCursor('crosshair');

      this.input.on('pointerdown', this._startCharge, this);
      this.input.on('pointerup', this._fireArrow, this);

      this._loadLevel(level);

      this.physics.add.collider(this.arrow, this.targets, function (arrow, target) {
        return _this2._onArrowTargetCollide(arrow, target);
      });
      this.balloons.addBalloonOverlap(this.arrow, function (arrow, balloon) {
        return _this2._onArrowBalloonCollide(balloon);
      });
      this.balloons.addStringOverlap(this.arrow, function (arrow, balloon) {
        return _this2._onArrowBalloonStringCollide(balloon);
      });
      this.physics.add.collider(this.arrow, this.groundZone, function () {
        return _this2._onArrowWorldBoundsCollide();
      });
    }
  }, {
    key: 'update',
    value: function update() {
      this.arrow.update();

      var state = this.registry.get('state');

      if (state === STATES.REST) {
        this._immediateScroll(this.cameras.main.scrollX + 6 * this.registry.get('scrollingDirection'));
      } else if (state === STATES.FLY) {
        this._immediateScroll(this.cameras.main.scrollX, false);
      }
    }
  }, {
    key: '_loadLevel',
    value: function _loadLevel(level) {
      var _this3 = this;

      this.registry.set('initialTargets', level.targets.length);
      this.registry.set('initialBalloons', level.balloons.length);

      this.registry.set('arrows', 3);
      this.registry.set('targets', level.targets.length);
      this.registry.set('balloons', level.balloons.length);

      this.targets.createTargetsForLevel(level);
      this.balloons.createBalloonsForLevel(level);

      var furthestTargetX = this.targets.getFurthestTargetX();
      var furthestBalloonX = this.balloons.getFurthestBalloonX();
      var furthestX = Math.max(furthestTargetX, furthestBalloonX);

      if (furthestX > 600) {
        this._tweenScroll(furthestX - 500, 800, {
          yoyo: true,
          delay: 400,
          hold: 500,
          ease: Phaser.Math.Easing.Quadratic.InOut,
          onComplete: function onComplete() {
            _this3.registry.set('state', STATES.REST);
          }
        });
      } else {
        this.registry.set('state', STATES.REST);
      }
    }
  }, {
    key: '_startCharge',
    value: function _startCharge() {
      this.tweens.killTweensOf(this.cameras.main);

      this.registry.set('scrollDirection', 0);
      this.registry.set('state', STATES.CHARGE);
      this._tweenScroll(0, 200);
    }
  }, {
    key: '_fireArrow',
    value: function _fireArrow() {
      this.tweens.killTweensOf(this.cameras.main);

      this.cameras.main.startFollow(this.arrow, true);
      this.registry.set('state', STATES.FLY);
      this.arrow.fire();
    }
  }, {
    key: '_onArrowWorldBoundsCollide',
    value: function _onArrowWorldBoundsCollide() {
      var _this4 = this;

      this.registry.set('arrows', this.registry.get('arrows') - 1);
      this.registry.set('state', STATES.HIT);

      this.arrow.onHit();

      _effects.Effects.flashOut([this.arrow], function () {
        _this4.registry.set('state', STATES.REST);

        _this4._checkLevelOver();
        _this4._reset();
      });
    }
  }, {
    key: '_onArrowTargetCollide',
    value: function _onArrowTargetCollide(arrow, target) {
      var _this5 = this;

      this.registry.set('arrows', this.registry.get('arrows') - 1);
      this.registry.set('targets', this.registry.get('targets') - 1);
      this.registry.set('state', STATES.HIT);

      this.arrow.onHit();
      this.targets.onTargetHit(target);

      _effects.Effects.flashOut([arrow, target], function () {
        _this5.registry.set('state', STATES.REST);

        _this5._checkLevelOver();
        _this5._reset();
      });
    }
  }, {
    key: '_onArrowBalloonCollide',
    value: function _onArrowBalloonCollide(balloon) {
      this.registry.set('balloons', this.registry.get('balloons') - 1);

      balloon.pop();
    }
  }, {
    key: '_onArrowBalloonStringCollide',
    value: function _onArrowBalloonStringCollide(balloon) {
      balloon.cutString();
    }
  }, {
    key: '_checkLevelOver',
    value: function _checkLevelOver() {
      var isLevelOver = this.registry.get('arrows') === 0 || this.registry.get('targets') === 0 && this.registry.get('balloons') === 0;

      if (isLevelOver) {
        this._endLevel();
      }
    }
  }, {
    key: '_reset',
    value: function _reset() {
      this.cameras.main.stopFollow();
      this._tweenScroll(0, 300);
      this.arrow.reset();
    }
  }, {
    key: '_tweenScroll',
    value: function _tweenScroll(targetScrollX, duration) {
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
          _this6._immediateScroll(_this6.cameras.main.scrollX, false);
        }
      };
      var tweenProps = Object.assign(defaultTweenProps, additionalTweenProps);

      this.tweens.add(tweenProps);
    }
  }, {
    key: '_immediateScroll',
    value: function _immediateScroll(targetScrollX) {
      var includeCamera = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (includeCamera) this.cameras.main.scrollX = targetScrollX;
      this.parallaxBackground.update(targetScrollX);
      this.leftScrollZone.updatePosition(targetScrollX);
      this.rightScrollZone.updatePosition(targetScrollX + 540);
      this.groundZone.updatePosition(targetScrollX);
    }
  }, {
    key: '_endLevel',
    value: function _endLevel() {
      this.scene.pause('game');
      this.scene.stop('ui');
      this.scene.launch('results');
    }
  }]);

  return GameScene;
}(Phaser.Scene);

/***/ }),

/***/ 1154:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Arrow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(73);

var _phaser2 = _interopRequireDefault(_phaser);

var _gameStates = __webpack_require__(221);

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

    _this.reset();
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

      if (state === STATES.CHARGE) {
        var chargeAmount = this.scene.registry.get('charge');
        var newCharge = _phaser2.default.Math.Clamp(chargeAmount + 5, 200, 700);
        this.scene.registry.set('charge', newCharge);
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
      this.scene.registry.set('charge', 200);

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

/***/ 1155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Effects = undefined;

var _flashOut = __webpack_require__(1156);

var Effects = exports.Effects = {
  flashOut: _flashOut.flashOut
};

/***/ }),

/***/ 1156:
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

/***/ 1157:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParallaxBackground = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(73);

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

/***/ 1158:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Targets = exports.Targets = function (_Phaser$Physics$Arcad) {
  _inherits(Targets, _Phaser$Physics$Arcad);

  function Targets(scene) {
    _classCallCheck(this, Targets);

    var _this = _possibleConstructorReturn(this, (Targets.__proto__ || Object.getPrototypeOf(Targets)).call(this, scene.physics.world, scene, {
      defaultKey: 'target',
      allowGravity: false,
      immovable: true,
      classType: Phaser.Physics.Arcade.Image
    }));

    scene.sys.updateList.add(_this);
    return _this;
  }

  _createClass(Targets, [{
    key: 'createTargetsForLevel',
    value: function createTargetsForLevel(level) {
      var _this2 = this;

      level.targets.forEach(function (coordinates) {
        var target = _this2.get();
        _this2.scene.physics.world.enableBody(target);

        target.alpha = 1;
        target.active = true;

        target.x = coordinates.x;
        target.y = coordinates.y;
      });
    }
  }, {
    key: 'getFurthestTargetX',
    value: function getFurthestTargetX() {
      return this.getChildren().reduce(function (furthestX, target) {
        if (target.x > furthestX) {
          return target.x;
        } else {
          return furthestX;
        }
      }, 0);
    }
  }, {
    key: 'onTargetHit',
    value: function onTargetHit(target) {
      this.scene.physics.world.disableBody(target.body);
      target.active = false;
    }
  }]);

  return Targets;
}(Phaser.Physics.Arcade.Group);

/***/ }),

/***/ 1159:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroundZone = exports.GroundZone = function (_Phaser$GameObjects$Z) {
  _inherits(GroundZone, _Phaser$GameObjects$Z);

  function GroundZone(scene) {
    _classCallCheck(this, GroundZone);

    var _this = _possibleConstructorReturn(this, (GroundZone.__proto__ || Object.getPrototypeOf(GroundZone)).call(this, scene, 0, 260));

    scene.add.existing(_this);

    _this.setSize(640, 40);
    _this.setScrollFactor(0);

    scene.physics.world.enable(_this);
    _this.body.allowGravity = false;
    _this.body.immovable = true;
    return _this;
  }

  _createClass(GroundZone, [{
    key: "updatePosition",
    value: function updatePosition(x) {
      this.x = x;
    }
  }]);

  return GroundZone;
}(Phaser.GameObjects.Zone);

/***/ }),

/***/ 1160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollZone = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameStates = __webpack_require__(221);

var STATES = _interopRequireWildcard(_gameStates);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollZone = exports.ScrollZone = function () {
  function ScrollZone(scene, scrollingDirection) {
    var _this = this;

    _classCallCheck(this, ScrollZone);

    this.scene = scene;
    this.scrollingDirection = scrollingDirection;

    if (scrollingDirection === -1) {
      // left
      this.zone = scene.add.zone(0, 0).setSize(100, 300).setInteractive({ cursor: 'w-resize' });
    } else {
      // right
      this.zone = scene.add.zone(540, 0).setSize(100, 300).setInteractive({ cursor: 'e-resize' });
    }

    this.zone.on('pointerover', function () {
      return _this._updateScrollingDirection(scrollingDirection);
    });
    this.zone.on('pointerout', function () {
      return _this._updateScrollingDirection(0);
    });
  }

  _createClass(ScrollZone, [{
    key: 'updatePosition',
    value: function updatePosition(x) {
      this.zone.x = x;
    }
  }, {
    key: '_updateScrollingDirection',
    value: function _updateScrollingDirection(scrollingDirection) {
      var state = this.scene.registry.get('state');

      if (state === STATES.REST) {
        this.scene.registry.set('scrollingDirection', scrollingDirection);
      }
    }
  }]);

  return ScrollZone;
}();

/***/ }),

/***/ 1161:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Balloons = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _balloon = __webpack_require__(467);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Balloons = exports.Balloons = function () {
  function Balloons(scene, level) {
    _classCallCheck(this, Balloons);

    this.scene = scene;
    this.level = level;
    this.balloons = [];
  }

  _createClass(Balloons, [{
    key: 'createBalloonsForLevel',
    value: function createBalloonsForLevel() {
      var _this = this;

      if (!this.level.balloons) {
        return;
      }

      this.level.balloons.forEach(function (balloon) {
        _this.balloons.push(new _balloon.Balloon(_this.scene, balloon.x, balloon.y));
      });
    }
  }, {
    key: 'getFurthestBalloonX',
    value: function getFurthestBalloonX() {
      return this.level.balloons.reduce(function (furthestX, balloon) {
        if (balloon.x > furthestX) {
          return balloon.x;
        } else {
          return furthestX;
        }
      }, 0);
    }
  }, {
    key: 'addBalloonOverlap',
    value: function addBalloonOverlap(arrow, callback) {
      var _this2 = this;

      this.balloons.forEach(function (balloon) {
        _this2.scene.physics.add.overlap(arrow, balloon.balloon, function (arrow) {
          return callback(arrow, balloon);
        });
      });
    }
  }, {
    key: 'addStringOverlap',
    value: function addStringOverlap(arrow, callback) {
      var _this3 = this;

      this.balloons.forEach(function (balloon) {
        _this3.scene.physics.add.overlap(arrow, balloon.string, function (arrow) {
          return callback(arrow, balloon);
        });
      });
    }
  }]);

  return Balloons;
}();

/***/ }),

/***/ 1162:
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

      this.registry.events.on('changedata_arrows', this._updateArrows, this);
      this.registry.events.on('changedata_charge', this._updateCharge, this);

      this.arrowsText = this.add.bitmapText(30, 15, 'font', 'Quiver:', 24);
      this.arrowsImages = this.add.group([], {
        classType: Phaser.GameObjects.Image,
        key: 'arrow',
        setXY: { x: 120, stepX: 20, y: 22 },
        setRotation: { value: -45 },
        setScale: { x: 0.30, y: 0.30 },
        repeat: 2
      });

      this.chargeGaugeOutline = this.add.image(30, 40, 'gauge-outline').setOrigin(0).setScale(1, 0.8);
      this.chargeGaugeFill = this.add.image(30, 40, 'gauge-fill').setOrigin(0).setScale(1, 0.8);

      this._updateArrows(null, this.registry.get('arrows'));
      this._updateCharge(null, this.registry.get('charge'));
    }
  }, {
    key: '_cleanupRegistryListeners',
    value: function _cleanupRegistryListeners() {
      this.registry.events.off('changedata_arrows', this._updateArrows, this);
      this.registry.events.off('changedata_charge', this._updateCharge, this);
    }
  }, {
    key: '_updateArrows',
    value: function _updateArrows(parent, value) {
      this.arrowsImages.getChildren().forEach(function (lifeImage, i) {
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

/***/ 1163:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelSelectScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(73);

var _phaser2 = _interopRequireDefault(_phaser);

var _levels = __webpack_require__(1164);

var _levels2 = _interopRequireDefault(_levels);

var _storage = __webpack_require__(468);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LevelSelectScene = exports.LevelSelectScene = function (_Phaser$Scene) {
  _inherits(LevelSelectScene, _Phaser$Scene);

  function LevelSelectScene() {
    _classCallCheck(this, LevelSelectScene);

    return _possibleConstructorReturn(this, (LevelSelectScene.__proto__ || Object.getPrototypeOf(LevelSelectScene)).call(this, { key: 'level-select' }));
  }

  _createClass(LevelSelectScene, [{
    key: 'create',
    value: function create() {
      this.storage = new _storage.Storage();

      this.add.bitmapText(320, 50, 'font', 'Level Select', 38).setOrigin(0.5);

      var levelButtons = [];
      for (var i = 0; i < _levels2.default.length; i++) {
        levelButtons.push(this._createLevelButton(i));
      }

      _phaser2.default.Actions.GridAlign(levelButtons, {
        width: 8,
        height: -1,
        cellWidth: 60,
        cellHeight: 20,
        x: 200,
        y: 150
      });
    }
  }, {
    key: '_createLevelButton',
    value: function _createLevelButton(levelIndex) {
      var _this2 = this;

      var text = levelIndex + 1 + ': ' + this.storage.loadLevelStars(levelIndex);
      return this.add.bitmapText(50, 50, 'font', text, 28).setOrigin(0.5, 0).setInteractive({ cursor: 'pointer' }).once('pointerup', function () {
        _this2.registry.set('levelIndex', levelIndex);
        _this2.scene.start('game', { level: _levels2.default[levelIndex] });
      });
    }
  }]);

  return LevelSelectScene;
}(_phaser2.default.Scene);

/***/ }),

/***/ 1164:
/***/ (function(module, exports) {

module.exports = [{"targets":[{"x":500,"y":230},{"x":600,"y":230},{"x":900,"y":230}],"balloons":[]},{"targets":[{"x":450,"y":230},{"x":550,"y":230}],"balloons":[]},{"targets":[{"x":400,"y":230}],"balloons":[{"x":200,"y":150},{"x":700,"y":150}]},{"targets":[{"x":200,"y":230}],"balloons":[]}]

/***/ }),

/***/ 1165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResultsScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = __webpack_require__(468);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SCORE_MULTIPLIERS = {
  targets: 100,
  balloons: 150,
  arrows: 200
};

var ResultsScene = exports.ResultsScene = function (_Phaser$Scene) {
  _inherits(ResultsScene, _Phaser$Scene);

  function ResultsScene() {
    _classCallCheck(this, ResultsScene);

    return _possibleConstructorReturn(this, (ResultsScene.__proto__ || Object.getPrototypeOf(ResultsScene)).call(this, { key: 'results' }));
  }

  _createClass(ResultsScene, [{
    key: 'preload',
    value: function preload() {
      this.load.image('star', 'assets/star.png');
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      var storage = new _storage.Storage();
      var didWin = this.registry.get('targets') === 0;

      var resultText = didWin ? 'Level Passed!' : 'Level Failed!';
      this.add.bitmapText(320, 40, 'font', resultText, 32).setOrigin(0.5, 0);

      var scores = this._calculateScore();
      storage.saveLevelStars(this.registry.get('levelIndex'), scores.stars);
      this._displayScores(scores, function () {
        _this2.add.text(320, 260, 'Back to Level Select', {
          fill: '#000',
          backgroundColor: '#6c6',
          padding: 6
        }).setOrigin(0.5, 0).setInteractive({ cursor: 'pointer' }).once('pointerup', function () {
          _this2.scene.stop('game');
          _this2.scene.stop('results');
          _this2.scene.start('level-select');
        });
      });
    }
  }, {
    key: '_calculateScore',
    value: function _calculateScore() {
      var remainingArrows = this.registry.get('arrows');
      var arrowScore = remainingArrows * SCORE_MULTIPLIERS.arrows;

      var initialTargets = this.registry.get('initialTargets');
      var remainingTargets = this.registry.get('targets');
      var targetScore = (initialTargets - remainingTargets) * SCORE_MULTIPLIERS.targets;

      var initialBalloons = this.registry.get('initialBalloons');
      var remainingBalloons = this.registry.get('balloons');
      var balloonScore = (initialBalloons - remainingBalloons) * SCORE_MULTIPLIERS.balloons;

      var totalScore = arrowScore + targetScore + balloonScore;
      var maxPossibleScore = initialTargets * SCORE_MULTIPLIERS.targets + initialBalloons * SCORE_MULTIPLIERS.balloons;
      var percentageScore = totalScore / maxPossibleScore;

      return {
        arrow: arrowScore,
        target: initialTargets > 0 ? targetScore : null,
        balloon: initialBalloons > 0 ? balloonScore : null,
        total: totalScore,
        stars: Phaser.Math.CeilTo(Phaser.Math.FromPercent(percentageScore, 1, 4))
      };
    }
  }, {
    key: '_displayScores',
    value: function _displayScores(scores, onComplete) {
      var _this3 = this;

      var y = 80;
      var yStep = 30;

      var scoreTypeOrder = ['target', 'balloon', 'arrow', 'total'];
      var scoreTypeLabels = {
        'target': 'Targets:',
        'balloon': 'Balloons:',
        'arrow': 'Arrows:',
        'total': 'Total:'
      };

      var tweens = [];
      scoreTypeOrder.forEach(function (scoreType) {
        if (scores[scoreType] == null) {
          return;
        }

        _this3.add.bitmapText(250, y, 'font', scoreTypeLabels[scoreType], 24);
        var valueText = _this3.add.bitmapText(350, y, 'font', 0, 24);
        y += yStep;

        tweens.push({
          targets: [{ value: 0 }],
          props: { value: scores[scoreType] },
          duration: 600,
          onUpdate: function onUpdate(tween) {
            valueText.setText(Phaser.Math.RoundTo(tween.getValue()));
          }
        });
      });

      for (var i = 0; i < scores.stars; i++) {
        var star = this.add.image(275 + i * 40, y, 'star');
        star.alpha = 0;
        star.setDisplaySize(36, 36);
        star.setOrigin(0.5, 0);

        tweens.push({
          targets: [star],
          props: {
            alpha: 1
          },
          duration: 1,
          delay: i * 200
        });
      }

      this.tweens.timeline({ tweens: tweens, onComplete: onComplete });
    }
  }]);

  return ResultsScene;
}(Phaser.Scene);

/***/ }),

/***/ 221:
/***/ (function(module, exports) {

module.exports = {"PANNING_TO_TARGETS":0,"REST":1,"CHARGE":2,"FLY":3,"HIT":4}

/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Balloon = exports.Balloon = function () {
  function Balloon(scene, balloonX, balloonY) {
    _classCallCheck(this, Balloon);

    this.scene = scene;

    this.balloon = scene.physics.add.sprite(balloonX, balloonY, 'balloon-1');
    this.balloon.setOrigin(0.5);
    this.balloon.setScale(0.1);
    this.balloon.body.allowGravity = false;

    this.string = scene.physics.add.sprite(balloonX, 265, 'balloon-string');
    this.string.setOrigin(0.5, 1);
    this.string.displayHeight = 265 - (balloonY + this.balloon.displayHeight / 2);
    this.string.displayWidth = 5;
    this.string.body.allowGravity = false;
  }

  _createClass(Balloon, [{
    key: 'pop',
    value: function pop() {
      var _this = this;

      this.scene.physics.world.disableBody(this.balloon.body);
      this.scene.physics.world.disableBody(this.string.body);

      this.balloon.once('animationcomplete', function () {
        _this.balloon.visible = false;
        _this.balloon.active = false;

        _this.string.visible = false;
        _this.string.active = false;
      });

      this.balloon.play('balloon-pop');
      this._collapseString();
    }
  }, {
    key: 'cutString',
    value: function cutString() {
      this.scene.physics.world.disableBody(this.balloon.body);
      this.scene.physics.world.disableBody(this.string.body);

      this._collapseString();
      this._floatBalloonAway();
    }
  }, {
    key: '_collapseString',
    value: function _collapseString() {
      this.scene.tweens.add({
        targets: [this.string],
        props: {
          scaleY: 0
        },
        duration: 200,
        easing: Phaser.Math.Easing.Quadratic.Out
      });
    }
  }, {
    key: '_floatBalloonAway',
    value: function _floatBalloonAway() {
      var balloonDrift = Phaser.Math.RND.pick(['+=50', '-=50']);

      this.scene.tweens.add({
        targets: [this.balloon],
        props: {
          y: 0 - this.balloon.displayHeight / 2
        },
        duration: 700,
        easing: Phaser.Math.Easing.Expo.In
      });

      this.scene.tweens.add({
        targets: [this.balloon],
        props: {
          x: balloonDrift
        },
        duration: 700,
        easing: Phaser.Math.Easing.Cubic.InOut
      });
    }
  }]);

  return Balloon;
}();

/***/ }),

/***/ 468:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LEVEL_STARS_KEY = 'levelStars';

var Storage = exports.Storage = function () {
  function Storage() {
    _classCallCheck(this, Storage);

    if (this._get(LEVEL_STARS_KEY) == null) {
      this._set(LEVEL_STARS_KEY, []);
    }
  }

  _createClass(Storage, [{
    key: 'saveLevelStars',
    value: function saveLevelStars(levelIndex, score) {
      this._update(LEVEL_STARS_KEY, function (levelScores) {
        levelScores[levelIndex] = score;
        return levelScores;
      });
    }
  }, {
    key: 'loadLevelStars',
    value: function loadLevelStars(levelIndex) {
      return this._get(LEVEL_STARS_KEY)[levelIndex] || 0;
    }
  }, {
    key: '_get',
    value: function _get(key) {
      return JSON.parse(localStorage.getItem(key));
    }
  }, {
    key: '_set',
    value: function _set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, {
    key: '_update',
    value: function _update(key, updater) {
      var value = this._get(key);
      var updatedValue = updater(value);
      this._set(key, updatedValue);
    }
  }]);

  return Storage;
}();

window.Storage = new Storage();

/***/ }),

/***/ 469:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(73);

var _testScene = __webpack_require__(1151);

var _preloadScene = __webpack_require__(1152);

var _gameScene = __webpack_require__(1153);

var _uiScene = __webpack_require__(1162);

var _levelSelectScene = __webpack_require__(1163);

var _resultsScene = __webpack_require__(1165);

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
  scene: [_preloadScene.PreloadScene, _levelSelectScene.LevelSelectScene, _gameScene.GameScene, _uiScene.UiScene, _resultsScene.ResultsScene]
};

new Phaser.Game(gameConfig);

/***/ })

},[469]);