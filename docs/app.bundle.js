webpackJsonp([0],{

/***/ 1388:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArcadeHitboxPlugin = exports.ArcadeHitboxPlugin = function (_Phaser$Plugins$Scene) {
  _inherits(ArcadeHitboxPlugin, _Phaser$Plugins$Scene);

  function ArcadeHitboxPlugin(scene, pluginManager) {
    _classCallCheck(this, ArcadeHitboxPlugin);

    var _this = _possibleConstructorReturn(this, (ArcadeHitboxPlugin.__proto__ || Object.getPrototypeOf(ArcadeHitboxPlugin)).call(this, scene, pluginManager));

    _this.hitboxes = [];

    _this.scene.events.on('update', function () {
      return _this._update();
    });
    _this.scene.events.on('shutdown', function () {
      return _this._shutdown();
    });
    _this.scene.events.on('destroy', function () {
      return _this._destroy();
    });
    return _this;
  }

  /*
    Takes a HitboxConfig object
    {
      parent?: any,
      onCreate?: hitbox => void,
      xOffset: number,
      yOffset: number,
      width: number,
      height: number,
    }
   */


  _createClass(ArcadeHitboxPlugin, [{
    key: 'add',
    value: function add(sprite, hitboxConfig) {
      var xOffset = hitboxConfig.xOffset,
          yOffset = hitboxConfig.yOffset,
          width = hitboxConfig.width,
          height = hitboxConfig.height;

      var hitbox = this.scene.add.zone(sprite.x + xOffset, sprite.y + yOffset, width, height);
      this.scene.physics.add.existing(hitbox);

      var parent = hitboxConfig.parent || sprite;
      hitbox.hitboxParent = parent;

      if (hitboxConfig.onCreate) {
        hitboxConfig.onCreate(hitbox);
      }

      this.hitboxes.push(Object.assign({}, hitboxConfig, { parent: parent, sprite: sprite, hitbox: hitbox }));

      return hitbox;
    }
  }, {
    key: 'addGroup',
    value: function addGroup(sprite, hitboxConfigs) {
      var _this2 = this;

      var defaultConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var hitboxes = hitboxConfigs.map(function (hitboxConfig) {
        return _this2.add(sprite, Object.assign({}, hitboxConfig, defaultConfig));
      });

      return this.scene.physics.add.group(hitboxes);
    }
  }, {
    key: '_update',
    value: function _update() {
      this.hitboxes.forEach(this._syncHitbox);
    }
  }, {
    key: '_syncHitbox',
    value: function _syncHitbox(hitboxConfig) {
      hitboxConfig.hitbox.x = hitboxConfig.sprite.x + hitboxConfig.xOffset;
      hitboxConfig.hitbox.y = hitboxConfig.sprite.y + hitboxConfig.yOffset;

      Phaser.Math.RotateAround(hitboxConfig.hitbox, hitboxConfig.sprite.x, hitboxConfig.sprite.y, hitboxConfig.sprite.rotation);
    }
  }, {
    key: '_shutdown',
    value: function _shutdown() {
      var _this3 = this;

      this.hitboxes.forEach(function (hitboxConfig) {
        _this3.scene.physics.world.disableBody(hitboxConfig.hitbox.body);

        var parent = hitboxConfig.parent || hitboxConfig.sprite;
        delete parent.hitbox;
        delete hitboxConfig.hitbox.hitboxParent;
      });

      this.hitboxes.splice(0, this.hitboxes.length);
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      this._shutdown();
      delete this.hitboxes;
    }
  }]);

  return ArcadeHitboxPlugin;
}(Phaser.Plugins.ScenePlugin);

/***/ }),

/***/ 1389:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _balloon = __webpack_require__(503);

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

/***/ 1390:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreloadScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(95);

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
      this._loadFonts();

      this._loadSharedImages();
      this._loadLevelSelectImages();
      this._loadLevelImages();
      this._loadUiImages();
      this._loadResultsImages();

      this._loadGameSounds();
    }
  }, {
    key: 'create',
    value: function create() {
      this._createGameAnimations();

      this.scene.start('level-select');
    }
  }, {
    key: '_loadFonts',
    value: function _loadFonts() {
      this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');
      this.load.bitmapFont('font-outline', 'assets/fonts/font-outline.png', 'assets/fonts/font-outline.xml');
    }
  }, {
    key: '_loadSharedImages',
    value: function _loadSharedImages() {
      this.load.image('star', 'assets/star.png');
      this.load.image('star-gray', 'assets/star-gray.png');

      this.load.image('arrow', 'assets/arrow.png');
    }
  }, {
    key: '_loadLevelSelectImages',
    value: function _loadLevelSelectImages() {
      this.load.image('menu-bg-0', 'assets/menu-bg-0.png');
      this.load.image('menu-bg-1', 'assets/menu-bg-1.png');
      this.load.image('menu-bg-2', 'assets/menu-bg-2.png');
      this.load.image('menu-bg-3', 'assets/menu-bg-3.png');
      this.load.image('menu-bg-4', 'assets/menu-bg-4.png');
    }
  }, {
    key: '_loadLevelImages',
    value: function _loadLevelImages() {
      this.load.image('background-back', 'assets/background-back.png');
      this.load.image('background-middle', 'assets/background-middle.png');
      this.load.image('background-front', 'assets/background-front.png');

      this.load.image('target', 'assets/target.png');

      this.load.image('balloon-1', 'assets/balloon/1.png');
      this.load.image('balloon-2', 'assets/balloon/2.png');
      this.load.image('balloon-3', 'assets/balloon/3.png');
      this.load.image('balloon-4', 'assets/balloon/4.png');
      this.load.image('balloon-5', 'assets/balloon/5.png');
      this.load.image('balloon-6', 'assets/balloon/6.png');
      this.load.image('balloon-string', 'assets/balloon/string.png');
    }
  }, {
    key: '_loadUiImages',
    value: function _loadUiImages() {
      this.load.image('gauge-outline', 'assets/gauge-outline.png');
      this.load.image('gauge-fill', 'assets/gauge-fill.png');
    }
  }, {
    key: '_loadResultsImages',
    value: function _loadResultsImages() {
      this.load.image('background-parchment', 'assets/background-parchment.png');
    }
  }, {
    key: '_loadGameSounds',
    value: function _loadGameSounds() {
      this.load.audio('arrow-release-low', 'assets/sounds/arrow_release_low.wav');
      this.load.audio('arrow-release-medium', 'assets/sounds/arrow_release_medium.wav');
      this.load.audio('arrow-release-high', 'assets/sounds/arrow_release_high.wav');

      this.load.audio('balloon-pop', 'assets/sounds/balloon_pop.wav');
    }
  }, {
    key: '_createGameAnimations',
    value: function _createGameAnimations() {
      this.anims.create({
        key: 'balloon-pop',
        frames: [{ key: 'balloon-1' }, { key: 'balloon-2' }, { key: 'balloon-3' }, { key: 'balloon-4' }, { key: 'balloon-5' }, { key: 'balloon-6' }]
      });
    }
  }]);

  return PreloadScene;
}(_phaser2.default.Scene);

/***/ }),

/***/ 1391:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _levelStates = __webpack_require__(239);

var STATES = _interopRequireWildcard(_levelStates);

var _effects = __webpack_require__(1392);

var _arrow = __webpack_require__(1395);

var _parallaxBackground = __webpack_require__(1396);

var _targets = __webpack_require__(1397);

var _groundZone = __webpack_require__(1399);

var _scrollZone = __webpack_require__(1400);

var _balloons = __webpack_require__(1401);

var _config = __webpack_require__(32);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LevelScene = exports.LevelScene = function (_Phaser$Scene) {
  _inherits(LevelScene, _Phaser$Scene);

  function LevelScene() {
    _classCallCheck(this, LevelScene);

    return _possibleConstructorReturn(this, (LevelScene.__proto__ || Object.getPrototypeOf(LevelScene)).call(this, { key: 'level' }));
  }

  _createClass(LevelScene, [{
    key: 'create',
    value: function create(_ref) {
      var _this2 = this;

      var levelConfig = _ref.levelConfig;

      this.levelConfig = levelConfig;

      this.registry.set('charge', _config.config.entities.level.arrow.minCharge);
      this.registry.set('scrollingDirection', 0);
      this.registry.set('state', STATES.PANNING_TO_TARGETS);

      this.parallaxBackground = new _parallaxBackground.ParallaxBackground(this, 'background-back', 'background-middle', 'background-front');
      this.arrow = new _arrow.Arrow(this);
      this.targets = new _targets.Targets(this);
      this.balloons = new _balloons.Balloons(this);
      this.groundZone = new _groundZone.GroundZone(this);
      this.leftScrollZone = new _scrollZone.ScrollZone(this, -1);
      this.rightScrollZone = new _scrollZone.ScrollZone(this, 1);

      this.cameras.main.setBounds(0, 0, _config.config.dimensions.world.width, _config.config.dimensions.world.height);

      this.input.setDefaultCursor('crosshair');

      this.input.on('pointerdown', this._startCharge, this);
      this.input.on('pointerup', this._fireArrow, this);

      this._loadLevel();

      this.physics.add.collider(this.arrow.getHitbox(), this.targets.getHitboxes(), function (arrow, target) {
        return _this2._onArrowTargetCollide(arrow, target);
      });
      this.physics.add.collider(this.arrow.getHitbox(), this.targets.getBullseyeHitboxes(), function (arrow, target) {
        return _this2._onArrowTargetBullseyeCollide(arrow, target);
      });
      this.balloons.addBalloonOverlap(this.arrow.getHitbox(), function (arrow, balloon) {
        return _this2._onArrowBalloonCollide(balloon);
      });
      this.balloons.addStringOverlap(this.arrow.getHitbox(), function (arrow, balloon) {
        return _this2._onArrowBalloonStringCollide(balloon);
      });
      this.physics.add.collider(this.arrow.getHitbox(), this.groundZone, function () {
        return _this2._onArrowGroundCollide();
      });

      this.scene.launch('ui');
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
    key: 'restartLevel',
    value: function restartLevel() {
      this._immediateScroll(0, true);

      this._resetRegistry();

      this.targets.resetTargetsForLevel(this.levelConfig);
      this.balloons.resetBalloonsForLevel(this.levelConfig);

      this._introPan();
    }
  }, {
    key: '_loadLevel',
    value: function _loadLevel() {
      this._resetRegistry();

      this.targets.createTargetsForLevel(this.levelConfig);
      this.balloons.createBalloonsForLevel(this.levelConfig);

      this._introPan();
    }
  }, {
    key: '_resetRegistry',
    value: function _resetRegistry() {
      this.registry.set('initialArrows', this.levelConfig.arrows);
      this.registry.set('initialTargets', this.levelConfig.targets.length);
      this.registry.set('initialBalloons', this.levelConfig.balloons.length);

      this.registry.set('remainingArrows', this.levelConfig.arrows);
      this.registry.set('remainingTargets', this.levelConfig.targets.length);
      this.registry.set('remainingBalloons', this.levelConfig.balloons.length);
      this.registry.set('poppedBalloons', 0);
    }
  }, {
    key: '_introPan',
    value: function _introPan() {
      var _this3 = this;

      this.registry.set('state', STATES.PANNING_TO_TARGETS);

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
      if (this.registry.get('state') === STATES.REST) {
        this.tweens.killTweensOf(this.cameras.main);

        this.registry.set('scrollDirection', 0);
        this.registry.set('state', STATES.CHARGE);
        this._tweenScroll(0, 200);
      }
    }
  }, {
    key: '_fireArrow',
    value: function _fireArrow() {
      if (this.registry.get('state') === STATES.CHARGE) {
        this.tweens.killTweensOf(this.cameras.main);

        this.cameras.main.startFollow(this.arrow.getSprite(), true);
        this.registry.set('state', STATES.FLY);
        this.arrow.fire();
      }
    }
  }, {
    key: '_onArrowGroundCollide',
    value: function _onArrowGroundCollide() {
      var _this4 = this;

      this.registry.set('remainingArrows', this.registry.get('remainingArrows') - 1);
      this.registry.set('state', STATES.HIT);

      this.arrow.onHit();

      _effects.Effects.flashOut([this.arrow.getSprite()], function () {
        _this4.registry.set('state', STATES.REST);

        _this4._checkLevelOver();
        _this4._reset();
      });
    }
  }, {
    key: '_onArrowTargetCollide',
    value: function _onArrowTargetCollide(arrow, targetHitbox) {
      var _this5 = this;

      this.registry.set('remainingArrows', this.registry.get('remainingArrows') - 1);
      this.registry.set('remainingTargets', this.registry.get('remainingTargets') - 1);
      this.registry.set('state', STATES.HIT);

      this.arrow.onHit();
      targetHitbox.hitboxParent.onHit();

      _effects.Effects.flashOut([this.arrow.getSprite(), targetHitbox.hitboxParent.getSprite()], function () {
        _this5.registry.set('state', STATES.REST);

        _this5._checkLevelOver();
        _this5._reset();
      });
    }
  }, {
    key: '_onArrowTargetBullseyeCollide',
    value: function _onArrowTargetBullseyeCollide(arrow, targetBullseyeHitbox) {
      var target = targetBullseyeHitbox.hitboxParent;

      this._onArrowTargetCollide(arrow, targetBullseyeHitbox);
      _effects.Effects.notify(this, target.sprite.x, target.sprite.y, 'Bullseye!');
    }
  }, {
    key: '_onArrowBalloonCollide',
    value: function _onArrowBalloonCollide(balloon) {
      this.registry.set('remainingBalloons', this.registry.get('remainingBalloons') - 1);
      this.registry.set('poppedBalloons', this.registry.get('poppedBalloons') + 1);

      balloon.pop();
    }
  }, {
    key: '_onArrowBalloonStringCollide',
    value: function _onArrowBalloonStringCollide(balloon) {
      this.registry.set('remainingBalloons', this.registry.get('remainingBalloons') - 1);

      balloon.cutString();
    }
  }, {
    key: '_checkLevelOver',
    value: function _checkLevelOver() {
      var isLevelOver = this.registry.get('remainingArrows') === 0 || this.registry.get('remainingTargets') === 0;

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
      this.rightScrollZone.updatePosition(targetScrollX + _config.config.layouts.level.scrollZones.rightX);
      this.groundZone.updatePosition(targetScrollX);
    }
  }, {
    key: '_endLevel',
    value: function _endLevel() {
      this.scene.stop('level');
      this.scene.stop('ui');
      this.scene.start('results');
    }
  }]);

  return LevelScene;
}(Phaser.Scene);

/***/ }),

/***/ 1392:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Effects = undefined;

var _flashOut = __webpack_require__(1393);

var _notify = __webpack_require__(1394);

var Effects = exports.Effects = {
  flashOut: _flashOut.flashOut,
  notify: _notify.notify
};

/***/ }),

/***/ 1393:
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

/***/ 1394:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notify = notify;

var _config = __webpack_require__(32);

function notify(scene, x, y, string) {
  var size = _config.config.entities.level.notify.size;

  var text = scene.add.bitmapText(x, y, 'font', string, size);
  text.setOrigin(0.5, 1);

  text.y -= size;
  text.alpha = 0;

  var tweens = [{
    targets: [text],
    props: {
      alpha: 1,
      y: '-=' + size
    },
    duration: 600
  },
  /*
  {
    targets: [text],
    props: {
      y: `-=${size / 2}`,
    },
    duration: 300,
  },
  */
  {
    targets: [text],
    props: {
      alpha: 0,
      y: '-=' + size
    },
    duration: 600,
    delay: 300
  }];

  scene.tweens.timeline({ tweens: tweens });
}

/***/ }),

/***/ 1395:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Arrow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(95);

var _phaser2 = _interopRequireDefault(_phaser);

var _levelStates = __webpack_require__(239);

var STATES = _interopRequireWildcard(_levelStates);

var _config = __webpack_require__(32);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrowLayoutConfig = _config.config.layouts.level.arrow;
var arrowConfig = _config.config.entities.level.arrow;

var Arrow = exports.Arrow = function () {
  function Arrow(scene) {
    _classCallCheck(this, Arrow);

    this.scene = scene;

    this.sprite = this.scene.physics.add.sprite(0, 0, 'arrow');
    this.sprite.setDisplaySize(48, 12);

    this.hitbox = this.scene.arcadeHitbox.add(this.sprite, {
      parent: this,
      xOffset: 24,
      yOffset: 0,
      width: 6,
      height: 6
    });

    this.releaseSounds = {
      low: this.scene.sound.add('arrow-release-low'),
      medium: this.scene.sound.add('arrow-release-medium'),
      high: this.scene.sound.add('arrow-release-high')
    };

    this.reset();
  }

  _createClass(Arrow, [{
    key: 'update',
    value: function update() {
      var state = this.scene.registry.get('state');

      if (state === STATES.FLY) {
        this.sprite.rotation = _phaser2.default.Math.Angle.BetweenPoints(_phaser2.default.Math.Vector2.ZERO, this.sprite.body.velocity);
      }

      if (state === STATES.REST || state === STATES.CHARGE) {
        this._angleToPointer();
      }

      if (state === STATES.CHARGE) {
        var chargeAmount = this.scene.registry.get('charge');
        var newCharge = _phaser2.default.Math.Clamp(chargeAmount + 5, arrowConfig.minCharge, arrowConfig.maxCharge);
        this.scene.registry.set('charge', newCharge);
      }
    }
  }, {
    key: 'getSprite',
    value: function getSprite() {
      return this.sprite;
    }
  }, {
    key: 'getHitbox',
    value: function getHitbox() {
      return this.hitbox;
    }
  }, {
    key: 'fire',
    value: function fire() {
      var chargePercent = (this.scene.registry.get('charge') - arrowConfig.minCharge) / (arrowConfig.maxCharge - arrowConfig.minCharge);
      if (chargePercent < 0.33) {
        this.releaseSounds.low.play();
      } else if (chargePercent < 0.66) {
        this.releaseSounds.medium.play();
      } else {
        this.releaseSounds.high.play();
      }

      this.hitbox.body.enable = true;
      this.sprite.body.allowGravity = true;
      this.scene.physics.velocityFromRotation(this.sprite.rotation, this.scene.registry.get('charge'), this.sprite.body.velocity);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.scene.registry.set('charge', arrowConfig.minCharge);

      this.sprite.body.enable = true;
      this.hitbox.body.enable = false;

      this.sprite.x = arrowLayoutConfig.x;
      this.sprite.y = arrowLayoutConfig.y;

      this.sprite.alpha = 1;

      this.sprite.body.allowGravity = false;
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = 0;

      this.hitbox.body.allowGravity = false;
    }
  }, {
    key: 'onHit',
    value: function onHit() {
      this.sprite.body.enable = false;
      this.hitbox.body.enable = false;
    }
  }, {
    key: '_angleToPointer',
    value: function _angleToPointer() {
      var angle = _phaser2.default.Math.Angle.BetweenPoints(this.sprite, this.scene.input.activePointer);
      this.sprite.rotation = angle;
    }
  }]);

  return Arrow;
}();

/***/ }),

/***/ 1396:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParallaxBackground = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(32);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParallaxBackground = exports.ParallaxBackground = function () {
  function ParallaxBackground(scene, backKey, middleKey, frontKey) {
    _classCallCheck(this, ParallaxBackground);

    this.backgroundBack = this._addBackground(scene, backKey);
    this.backgroundMiddle = this._addBackground(scene, middleKey);
    this.backgroundFront = this._addBackground(scene, frontKey);
  }

  _createClass(ParallaxBackground, [{
    key: 'update',
    value: function update(scrollAmount) {
      this.backgroundBack.tilePositionX = scrollAmount / 3;
      this.backgroundMiddle.tilePositionX = scrollAmount / 2;
      this.backgroundFront.tilePositionX = scrollAmount;
    }
  }, {
    key: '_addBackground',
    value: function _addBackground(scene, key) {
      var displayWidth = _config.config.layouts.level.background.width;
      var displayHeight = _config.config.layouts.level.background.height;

      var bgHeight = scene.textures.get(key).get().height;
      var heightScaleFactor = 1 + (displayHeight - bgHeight) / displayHeight;

      var bg = scene.add.tileSprite(0, 0, displayWidth, displayHeight, key);
      bg.tileScaleY = heightScaleFactor;
      bg.setOrigin(0, 0);
      bg.setScrollFactor(0);

      return bg;
    }
  }]);

  return ParallaxBackground;
}();

/***/ }),

/***/ 1397:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Targets = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(32);

var _target = __webpack_require__(1398);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Targets = exports.Targets = function () {
  function Targets(scene) {
    _classCallCheck(this, Targets);

    this.scene = scene;
    this.targets = [];
  }

  _createClass(Targets, [{
    key: 'getHitboxes',
    value: function getHitboxes() {
      return this.targets.map(function (target) {
        return target.getHitboxes();
      });
    }
  }, {
    key: 'getBullseyeHitboxes',
    value: function getBullseyeHitboxes() {
      return this.targets.map(function (target) {
        return target.getBullseyeHitbox();
      });
    }
  }, {
    key: 'createTargetsForLevel',
    value: function createTargetsForLevel(levelConfig) {
      var _this = this;

      levelConfig.targets.forEach(function (coordinates) {
        var target = new _target.Target(_this.scene, coordinates.x, _config.config.layouts.level.targets.y);

        _this.targets.push(target);
      });
    }
  }, {
    key: 'resetTargetsForLevel',
    value: function resetTargetsForLevel() {
      this.targets.forEach(function (target) {
        return target.reset();
      });
    }
  }, {
    key: 'getFurthestTargetX',
    value: function getFurthestTargetX() {
      return this.targets.reduce(function (furthestX, target) {
        if (target.getSprite().x > furthestX) {
          return target.getSprite().x;
        } else {
          return furthestX;
        }
      }, 0);
    }
  }]);

  return Targets;
}();

/***/ }),

/***/ 1398:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Target = exports.Target = function () {
  function Target(scene, x, y) {
    _classCallCheck(this, Target);

    this.scene = scene;

    this.sprite = scene.add.sprite(x, y, 'target');

    this.hitboxes = this.scene.arcadeHitbox.addGroup(this.sprite, [{
      xOffset: -1,
      yOffset: -25,
      width: 11,
      height: 15
    }, {
      xOffset: -3,
      yOffset: 3,
      width: 10,
      height: 13
    }], {
      parent: this,
      onCreate: function onCreate(hitbox) {
        hitbox.body.allowGravity = false;
        hitbox.body.immovable = true;
      }
    });

    this.bullseyeHitbox = this.scene.arcadeHitbox.add(this.sprite, {
      parent: this,
      xOffset: -3,
      yOffset: -11,
      width: 12,
      height: 12,
      onCreate: function onCreate(hitbox) {
        hitbox.body.allowGravity = false;
        hitbox.body.immovable = true;
      }
    });
  }

  _createClass(Target, [{
    key: 'reset',
    value: function reset() {
      this.sprite.alpha = 1;
      this.bullseyeHitbox.body.enable = true;
      this.hitboxes.children.each(function (hitbox) {
        hitbox.body.enable = true;
      });
    }
  }, {
    key: 'getSprite',
    value: function getSprite() {
      return this.sprite;
    }
  }, {
    key: 'getHitboxes',
    value: function getHitboxes() {
      return this.hitboxes;
    }
  }, {
    key: 'getBullseyeHitbox',
    value: function getBullseyeHitbox() {
      return this.bullseyeHitbox;
    }
  }, {
    key: 'onHit',
    value: function onHit() {
      this.getHitboxes().getChildren().forEach(function (hitbox) {
        hitbox.body.enable = false;
      });

      this.getBullseyeHitbox().body.enable = false;
    }
  }]);

  return Target;
}();

/***/ }),

/***/ 1399:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroundZone = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(32);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroundZone = exports.GroundZone = function (_Phaser$GameObjects$Z) {
  _inherits(GroundZone, _Phaser$GameObjects$Z);

  function GroundZone(scene) {
    _classCallCheck(this, GroundZone);

    var _this = _possibleConstructorReturn(this, (GroundZone.__proto__ || Object.getPrototypeOf(GroundZone)).call(this, scene, _config.config.layouts.level.groundZone.x, _config.config.layouts.level.groundZone.y));

    scene.add.existing(_this);

    _this.setSize(_config.config.layouts.level.groundZone.width, _config.config.layouts.level.groundZone.height);
    _this.setScrollFactor(0);

    scene.physics.world.enable(_this);
    _this.body.allowGravity = false;
    _this.body.immovable = true;
    return _this;
  }

  _createClass(GroundZone, [{
    key: 'updatePosition',
    value: function updatePosition(x) {
      this.x = x;
    }
  }]);

  return GroundZone;
}(Phaser.GameObjects.Zone);

/***/ }),

/***/ 1400:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollZone = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _levelStates = __webpack_require__(239);

var STATES = _interopRequireWildcard(_levelStates);

var _config = __webpack_require__(32);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var scrollZonesConfig = _config.config.layouts.level.scrollZones;

var ScrollZone = exports.ScrollZone = function () {
  function ScrollZone(scene, scrollingDirection) {
    var _this = this;

    _classCallCheck(this, ScrollZone);

    this.scene = scene;
    this.scrollingDirection = scrollingDirection;

    if (scrollingDirection === -1) {
      // left
      this.zone = scene.add.zone(scrollZonesConfig.leftX, scrollZonesConfig.y).setSize(scrollZonesConfig.width, scrollZonesConfig.height).setInteractive({ cursor: 'w-resize' });
    } else {
      // right
      this.zone = scene.add.zone(scrollZonesConfig.rightX, scrollZonesConfig.y).setSize(scrollZonesConfig.width, scrollZonesConfig.height).setInteractive({ cursor: 'e-resize' });
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

/***/ 1401:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Balloons = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _balloon = __webpack_require__(503);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Balloons = exports.Balloons = function () {
  function Balloons(scene) {
    _classCallCheck(this, Balloons);

    this.scene = scene;
    this.balloons = [];
  }

  _createClass(Balloons, [{
    key: 'createBalloonsForLevel',
    value: function createBalloonsForLevel(levelConfig) {
      var _this = this;

      if (!levelConfig.balloons) {
        return;
      }

      levelConfig.balloons.forEach(function (balloon) {
        _this.balloons.push(new _balloon.Balloon(_this.scene, balloon.x, balloon.y));
      });
    }
  }, {
    key: 'resetBalloonsForLevel',
    value: function resetBalloonsForLevel(levelConfig) {
      var _this2 = this;

      if (!levelConfig.balloons) {
        return;
      }

      levelConfig.balloons.forEach(function (balloon, index) {
        _this2.balloons[index].reset(balloon.x, balloon.y);
      });
    }
  }, {
    key: 'getFurthestBalloonX',
    value: function getFurthestBalloonX() {
      return this.balloons.reduce(function (furthestX, balloon) {
        if (balloon.balloon.x > furthestX) {
          return balloon.balloon.x;
        } else {
          return furthestX;
        }
      }, 0);
    }
  }, {
    key: 'addBalloonOverlap',
    value: function addBalloonOverlap(arrow, callback) {
      var _this3 = this;

      this.balloons.forEach(function (balloon) {
        _this3.scene.physics.add.overlap(arrow, balloon.balloon.hitbox, function (arrow) {
          return callback(arrow, balloon);
        });
      });
    }
  }, {
    key: 'addStringOverlap',
    value: function addStringOverlap(arrow, callback) {
      var _this4 = this;

      this.balloons.forEach(function (balloon) {
        _this4.scene.physics.add.overlap(arrow, balloon.string.hitbox, function (arrow) {
          return callback(arrow, balloon);
        });
      });
    }
  }]);

  return Balloons;
}();

/***/ }),

/***/ 1402:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(32);

var _restartButton = __webpack_require__(1403);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var arrowConfig = _config.config.entities.level.arrow;
var uiConfig = _config.config.layouts.ui;

var UiScene = exports.UiScene = function (_Phaser$Scene) {
  _inherits(UiScene, _Phaser$Scene);

  function UiScene() {
    _classCallCheck(this, UiScene);

    return _possibleConstructorReturn(this, (UiScene.__proto__ || Object.getPrototypeOf(UiScene)).call(this, { key: 'ui' }));
  }

  _createClass(UiScene, [{
    key: 'create',
    value: function create() {
      this.events.on('shutdown', this._cleanupRegistryListeners, this);

      this.registry.events.on('changedata-remainingArrows', this._updateArrows, this);
      this.registry.events.on('changedata-charge', this._updateCharge, this);

      this.add.image(uiConfig.background.x, uiConfig.background.y, 'background-parchment').setDisplaySize(uiConfig.background.width, uiConfig.background.height).setOrigin(0, 0);

      this.restartButton = new _restartButton.RestartLevelButton(this);

      this.arrowsText = this.add.bitmapText(uiConfig.quiverLabel.x, uiConfig.quiverLabel.y, 'font', 'Quiver:', uiConfig.quiverLabel.size);
      this.arrowsImages = this.add.group([], {
        classType: Phaser.GameObjects.Image,
        key: 'arrow',
        setXY: { x: uiConfig.arrows.x, stepX: uiConfig.arrows.xStep, y: uiConfig.arrows.y },
        setRotation: { value: uiConfig.arrows.rotation },
        setScale: { x: 0.30, y: 0.30 },
        repeat: this.registry.get('remainingArrows') - 1
      });

      this.chargeText = this.add.bitmapText(uiConfig.chargeLabel.x, uiConfig.chargeLabel.y, 'font', 'Power:', uiConfig.chargeLabel.size);
      this.chargeGaugeOutline = this.add.image(uiConfig.chargeGauge.x, uiConfig.chargeGauge.y, 'gauge-outline').setOrigin(0).setDisplaySize(128, 20);
      this.chargeGaugeFill = this.add.image(uiConfig.chargeGauge.x, uiConfig.chargeGauge.y, 'gauge-fill').setOrigin(0).setDisplaySize(128, 20);

      this._updateArrows(null, this.registry.get('remainingArrows'));
      this._updateCharge(null, this.registry.get('charge'));
    }
  }, {
    key: '_cleanupRegistryListeners',
    value: function _cleanupRegistryListeners() {
      this.registry.events.off('changedata-remainingArrows', this._updateArrows, this);
      this.registry.events.off('changedata-charge', this._updateCharge, this);
    }
  }, {
    key: '_updateArrows',
    value: function _updateArrows(parent, remainingArrows) {
      this.arrowsImages.getChildren().forEach(function (lifeImage, i) {
        if (i < remainingArrows) {
          lifeImage.visible = true;
        } else {
          lifeImage.visible = false;
        }
      });
    }
  }, {
    key: '_updateCharge',
    value: function _updateCharge(parent, value) {
      var minCharge = arrowConfig.minCharge;
      var maxCharge = arrowConfig.maxCharge;
      var chargePercent = (value - minCharge) / (maxCharge - minCharge);

      this.chargeGaugeFill.scaleX = chargePercent;
    }
  }]);

  return UiScene;
}(Phaser.Scene);

/***/ }),

/***/ 1403:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestartLevelButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(32);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RestartLevelButton = exports.RestartLevelButton = function () {
  function RestartLevelButton(scene) {
    _classCallCheck(this, RestartLevelButton);

    this.scene = scene;

    this.button = this.scene.add.bitmapText(_config.config.layouts.ui.restartButton.x, _config.config.layouts.ui.restartButton.y, 'font', 'R', 28).setInteractive({ cursor: 'pointer' }).on('pointerdown', this._triggerLevelRestart, this);
  }

  _createClass(RestartLevelButton, [{
    key: '_triggerLevelRestart',
    value: function _triggerLevelRestart() {
      this.scene.scene.get('level').restartLevel();
    }
  }]);

  return RestartLevelButton;
}();

/***/ }),

/***/ 1404:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelSelectScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(95);

var _phaser2 = _interopRequireDefault(_phaser);

var _config = __webpack_require__(32);

var _levels = __webpack_require__(1405);

var _levels2 = _interopRequireDefault(_levels);

var _storage = __webpack_require__(504);

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

      this._createBackgroundImage('menu-bg-0');
      this._createBackgroundImage('menu-bg-1');
      this._createBackgroundImage('menu-bg-2');
      this._createBackgroundImage('menu-bg-3');
      this._createBackgroundImage('menu-bg-4');

      this.add.bitmapText(320, 50, 'font-outline', 'Level Select', 12).setOrigin(0.5);

      var buttonXStep = 120;
      for (var i = 0; i < _levels2.default.length; i++) {
        this._createLevelButton(i, 100 + buttonXStep * i, 150);
      }
    }
  }, {
    key: '_createBackgroundImage',
    value: function _createBackgroundImage(key) {
      this.add.image(0, 0, key).setDisplaySize(_config.config.dimensions.viewport.width, _config.config.dimensions.viewport.height).setOrigin(0);
    }
  }, {
    key: '_createLevelButton',
    value: function _createLevelButton(levelIndex, x, y) {
      var _this2 = this;

      var levelText = levelIndex;
      var starCount = this.storage.loadLevelStars(levelIndex);

      this.add.bitmapText(x + 28, y, 'font', levelText, 28).setOrigin(0.5, 0);

      var starXStep = 28;
      for (var i = 0; i < 3; i++) {
        var starAsset = i < starCount ? 'star' : 'star-gray';
        this.add.image(x + starXStep * i, y + 30, starAsset).setOrigin(0.5, 0).setDisplaySize(24, 24);
      }

      this.add.zone(x - 14, y, 80, 54).setOrigin(0, 0).setInteractive({ cursor: 'pointer' }).once('pointerup', function () {
        _this2.registry.set('levelIndex', levelIndex);
        _this2.scene.start('level', { levelConfig: _levels2.default[levelIndex] });
      });
    }
  }]);

  return LevelSelectScene;
}(_phaser2.default.Scene);

/***/ }),

/***/ 1405:
/***/ (function(module, exports) {

module.exports = [{"arrows":3,"targets":[{"x":500},{"x":600},{"x":900}],"balloons":[]},{"arrows":3,"targets":[{"x":250},{"x":350}],"balloons":[]},{"arrows":3,"targets":[{"x":400}],"balloons":[{"x":200,"y":150},{"x":700,"y":150}]},{"arrows":2,"targets":[{"x":200}],"balloons":[]}]

/***/ }),

/***/ 1406:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResultsScene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = __webpack_require__(504);

var _config = __webpack_require__(32);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var resultsConfig = _config.config.layouts.results;
var SCORE_MULTIPLIERS = {
  targets: 150,
  balloons: 200,
  arrows: 100
};

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

      this.add.image(resultsConfig.background.x, resultsConfig.background.y, 'background-parchment').setDisplaySize(resultsConfig.background.width, resultsConfig.background.height);

      var didWin = this.registry.get('remainingTargets') === 0;

      var titleText = didWin ? 'Level Passed!' : 'Level Failed!';
      this.add.bitmapText(resultsConfig.title.x, resultsConfig.title.y, 'font', titleText, resultsConfig.title.size).setOrigin(0.5, 0);

      if (didWin) {
        var scores = this._calculateScore();

        this._saveScore(scores);

        this._displayScores(scores, function () {
          _this2._showReturnToLevelSelectButton();
        });
      } else {
        this._showReturnToLevelSelectButton();
      }
    }
  }, {
    key: '_showReturnToLevelSelectButton',
    value: function _showReturnToLevelSelectButton() {
      var _this3 = this;

      this.add.text(resultsConfig.levelSelectButton.x, resultsConfig.levelSelectButton.y, 'Back to Level Select', {
        fill: '#000',
        backgroundColor: '#6c6',
        padding: 6
      }).setOrigin(0.5, 0).setInteractive({ cursor: 'pointer' }).once('pointerup', function () {
        _this3.scene.stop('results');
        _this3.scene.start('level-select');
      });
    }
  }, {
    key: '_calculateScore',
    value: function _calculateScore() {
      var initialArrows = this.registry.get('initialArrows');
      var remainingArrows = this.registry.get('remainingArrows');
      var arrowScore = remainingArrows * SCORE_MULTIPLIERS.arrows;

      var initialTargets = this.registry.get('initialTargets');
      var remainingTargets = this.registry.get('remainingTargets');
      var targetScore = (initialTargets - remainingTargets) * SCORE_MULTIPLIERS.targets;

      var initialBalloons = this.registry.get('initialBalloons');
      var poppedBalloons = this.registry.get('poppedBalloons');
      var balloonScore = poppedBalloons * SCORE_MULTIPLIERS.balloons;

      var totalScore = arrowScore + targetScore + balloonScore;
      var maxPossibleScore = initialTargets * SCORE_MULTIPLIERS.targets + initialBalloons * SCORE_MULTIPLIERS.balloons + (initialArrows - initialTargets) * SCORE_MULTIPLIERS.arrows;
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
    key: '_saveScore',
    value: function _saveScore(scores) {
      var storage = new _storage.Storage();

      var levelIndex = this.registry.get('levelIndex');
      var existingStars = storage.loadLevelStars(levelIndex);

      if (scores.stars > existingStars) {
        storage.saveLevelStars(levelIndex, scores.stars);
      }
    }
  }, {
    key: '_displayScores',
    value: function _displayScores(scores, onComplete) {
      var _this4 = this;

      var y = resultsConfig.scores.y;
      var yStep = resultsConfig.scores.yStep;

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

        _this4.add.bitmapText(resultsConfig.scores.labelX, y, 'font', scoreTypeLabels[scoreType], resultsConfig.scores.size);
        var valueText = _this4.add.bitmapText(resultsConfig.scores.valueX, y, 'font', 0, resultsConfig.scores.size);
        y += yStep;

        tweens.push({
          targets: [{ value: 0 }],
          props: { value: scores[scoreType] },
          duration: scores[scoreType] > 0 ? 600 : 1,
          onUpdate: function onUpdate(tween) {
            valueText.setText(Phaser.Math.RoundTo(tween.getValue()));
          }
        });
      });

      var starY = y + resultsConfig.stars.yTopMargin;
      for (var i = 0; i < 3; i++) {
        var starX = resultsConfig.stars.x + i * resultsConfig.stars.xStep;
        var grayStar = this.add.image(starX, starY, 'star-gray');
        grayStar.setDisplaySize(resultsConfig.stars.width, resultsConfig.stars.height);
        grayStar.setOrigin(0.5);
      }
      for (var _i = 0; _i < scores.stars; _i++) {
        var _starX = resultsConfig.stars.x + _i * resultsConfig.stars.xStep;
        var star = this.add.image(_starX, starY, 'star');
        star.alpha = 0;
        star.setDisplaySize(resultsConfig.stars.width * 2, resultsConfig.stars.height * 2);
        star.setOrigin(0.5);

        tweens.push({
          targets: [star],
          props: {
            alpha: 1,
            displayWidth: resultsConfig.stars.width,
            displayHeight: resultsConfig.stars.height
          },
          duration: 150,
          delay: 200
        });
      }

      this.tweens.timeline({ tweens: tweens, onComplete: onComplete });
    }
  }]);

  return ResultsScene;
}(Phaser.Scene);

/***/ }),

/***/ 239:
/***/ (function(module, exports) {

module.exports = {"PANNING_TO_TARGETS":0,"REST":1,"CHARGE":2,"FLY":3,"HIT":4}

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var viewportWidth = 640;
var viewportHeight = 300;

var config = exports.config = {
  dimensions: {
    viewport: {
      width: viewportWidth,
      height: viewportHeight
    },
    world: {
      width: 1500,
      height: viewportHeight
    }
  },
  layouts: {
    level: {
      arrow: {
        x: 50,
        y: 210
      },
      targets: { y: 202 },
      balloons: {
        string: {
          bottomY: 230,
          width: 5
        }
      },
      groundZone: {
        x: 0,
        y: 238,
        width: viewportWidth,
        height: 40
      },
      scrollZones: {
        width: 100,
        height: viewportHeight - 100,
        leftX: 0,
        rightX: 540,
        y: 60
      },
      background: {
        width: viewportWidth,
        height: 270
      }
    },
    results: {
      title: {
        x: 320,
        y: 40,
        size: 32
      },
      background: {
        x: viewportWidth / 2,
        y: viewportHeight / 2,
        width: viewportWidth * 1.3,
        height: viewportHeight * 1.3
      },
      levelSelectButton: {
        x: 320,
        y: 260
      },
      scores: {
        y: 80,
        yStep: 30,
        labelX: 250,
        valueX: 350,
        size: 24
      },
      stars: {
        yTopMargin: 18,
        x: 275,
        xStep: 40,
        width: 36,
        height: 36
      }
    },
    ui: {
      background: {
        x: -30,
        y: 240,
        width: viewportWidth + 70,
        height: viewportHeight - 230
      },
      quiverLabel: {
        x: 15,
        y: 250,
        size: 22
      },
      arrows: {
        x: 105,
        xStep: 20,
        y: 258,
        rotation: -45
      },
      chargeLabel: {
        x: 15,
        y: 273,
        size: 22
      },
      chargeGauge: {
        x: 95,
        y: 272
      },
      restartButton: {
        x: 600,
        y: 15
      }
    }
  },
  entities: {
    level: {
      arrow: {
        minCharge: 200,
        maxCharge: 700
      },
      notify: {
        size: 20
      }
    }
  }
};

/***/ }),

/***/ 503:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Balloon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(32);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var balloonStringConfig = _config.config.layouts.level.balloons.string;

var Balloon = exports.Balloon = function () {
  function Balloon(scene, balloonX, balloonY) {
    _classCallCheck(this, Balloon);

    this.scene = scene;

    this.balloon = scene.add.sprite(balloonX, balloonY, 'balloon-1');
    this.balloon.setOrigin(0.5);
    this.balloon.setScale(0.1);
    this.balloon.hitbox = this.scene.arcadeHitbox.add(this.balloon, {
      xOffset: 0,
      yOffset: -2,
      width: 30,
      height: 37
    });
    this.balloon.hitbox.body.allowGravity = false;

    this.string = scene.add.sprite(balloonX, balloonStringConfig.bottomY, 'balloon-string');
    this.string.setOrigin(0.5, 1);
    this.string.displayHeight = balloonStringConfig.bottomY - (balloonY + this.balloon.displayHeight / 2);
    this.string.displayWidth = balloonStringConfig.width;
    this.string.hitbox = this.scene.arcadeHitbox.add(this.string, {
      xOffset: 0,
      yOffset: -(this.string.displayHeight / 2),
      width: 6,
      height: this.string.displayHeight
    });
    this.string.hitbox.body.allowGravity = false;

    this.popSound = scene.sound.add('balloon-pop');
  }

  _createClass(Balloon, [{
    key: 'reset',
    value: function reset(x, y) {
      console.log('resetging balloon');
      this.balloon.x = x;
      this.balloon.y = y;
      this.balloon.setTexture('balloon-1');

      this.string.x = x;
      this.string.y = balloonStringConfig.bottomY;
      this.string.displayHeight = balloonStringConfig.bottomY - (y + this.balloon.displayHeight / 2);

      this.scene.physics.world.enable(this.balloon.hitbox);
      this.scene.physics.world.enable(this.string.hitbox);

      this.balloon.visible = true;
      this.balloon.active = true;

      this.string.visible = true;
      this.string.active = true;
    }
  }, {
    key: 'pop',
    value: function pop() {
      var _this = this;

      this.scene.physics.world.disableBody(this.balloon.hitbox.body);
      this.scene.physics.world.disableBody(this.string.hitbox.body);

      this.popSound.play();

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
      this.scene.physics.world.disableBody(this.balloon.hitbox.body);
      this.scene.physics.world.disableBody(this.string.hitbox.body);

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

/***/ 504:
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

/***/ 505:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(95);

var _config = __webpack_require__(32);

var _arcadeHitbox = __webpack_require__(1388);

var _testScene = __webpack_require__(1389);

var _preloadScene = __webpack_require__(1390);

var _levelScene = __webpack_require__(1391);

var _uiScene = __webpack_require__(1402);

var _levelSelectScene = __webpack_require__(1404);

var _resultsScene = __webpack_require__(1406);

var gameConfig = {
  width: _config.config.dimensions.viewport.width,
  height: _config.config.dimensions.viewport.height,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      x: 0,
      y: 0,
      width: _config.config.dimensions.world.width,
      height: _config.config.dimensions.world.height,
      gravity: {
        y: 400
      },
      checkCollision: { up: false, down: true, left: true, right: true }
    }
  },
  plugins: {
    scene: [{
      key: 'arcadeHitboxPlugin',
      plugin: _arcadeHitbox.ArcadeHitboxPlugin,
      mapping: 'arcadeHitbox' }]
  },
  scene: [_preloadScene.PreloadScene, _levelSelectScene.LevelSelectScene, _levelScene.LevelScene, _uiScene.UiScene, _resultsScene.ResultsScene]
};

new Phaser.Game(gameConfig);

/***/ })

},[505]);