webpackJsonp([0],{

/***/ 1148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.registry.set('score', 0);
      this.registry.set('lives', 3);
      this.scene.launch('ui');

      this.input.setDefaultCursor('crosshair');

      this.physics.world.setBounds(0, 0, 640, 480);

      this.arrow = this.physics.add.image(50, 400, 'arrow');
      this.arrow.body.collideWorldBounds = true;
      this.arrow.body.onWorldBounds = true;
      this.arrow.setScale(0.75);
      this.arrow.body.allowGravity = false;

      this.target = this.physics.add.image(600, 400, 'target');
      this.target.body.allowGravity = false;
      this.target.body.immovable = true;

      this._resetArrow();
      this._setTargetToRandomPosition();

      this.physics.world.on('worldbounds', function (arrowBody) {
        var nextLives = _this2.registry.get('lives') - 1;
        if (nextLives === 0) {
          _this2._endGame();
        }

        _this2.registry.set('lives', nextLives);

        _this2._resetForNextLife();
      });

      this.physics.add.collider(this.arrow, this.target, function (arrow, target) {
        _this2.registry.set('score', _this2.registry.get('score') + 10);

        _this2._resetForNextLife();
      });
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.arrow.body.allowGravity) {
        this.arrow.rotation = Phaser.Math.Angle.BetweenPoints(Phaser.Math.Vector2.ZERO, this.arrow.body.velocity);
      }
    }
  }, {
    key: '_angleArrowWithMouse',
    value: function _angleArrowWithMouse(pointer) {
      var angle = Phaser.Math.Angle.BetweenPoints(this.arrow, pointer);
      this.arrow.rotation = angle;
    }
  }, {
    key: '_endGame',
    value: function _endGame() {
      this.scene.stop('game');
      this.scene.stop('ui');
      this.scene.start('results');
    }
  }, {
    key: '_resetForNextLife',
    value: function _resetForNextLife() {
      var _this3 = this;

      this.arrow.body.allowGravity = false;
      this.arrow.body.enable = false;

      this.tweens.add({
        targets: [this.arrow, this.target],
        props: {
          alpha: 0
        },
        duration: 200,
        yoyo: true,
        repeat: 1,
        onComplete: function onComplete() {
          _this3.tweens.add({
            targets: [_this3.arrow, _this3.target],
            props: {
              alpha: 0
            },
            duration: 200,
            onComplete: function onComplete() {
              _this3._resetArrow();
              _this3._setTargetToRandomPosition();
            }
          });
        }
      });
    }
  }, {
    key: '_resetArrow',
    value: function _resetArrow() {
      var _this4 = this;

      this.arrow.x = 50;
      this.arrow.y = 400;

      this.arrow.alpha = 1;

      this.arrow.body.enable = true;
      this.arrow.body.allowGravity = false;
      this.arrow.body.velocity.x = 0;
      this.arrow.body.velocity.y = 0;

      this._angleArrowWithMouse(this.input.mousePointer);

      this.input.on('pointermove', this._angleArrowWithMouse, this);

      this.input.once('pointerdown', function (pointer) {
        _this4.input.off('pointermove', _this4._angleArrowWithMouse, _this4);

        _this4.arrow.body.allowGravity = true;
        _this4.physics.velocityFromRotation(_this4.arrow.rotation, 500, _this4.arrow.body.velocity);
      });
    }
  }, {
    key: '_setTargetToRandomPosition',
    value: function _setTargetToRandomPosition() {
      this.target.x = Phaser.Math.RND.integerInRange(500, 650);
      this.target.y = Phaser.Math.RND.integerInRange(300, 500);

      this.target.alpha = 1;
    }
  }]);

  return GameScene;
}(Phaser.Scene);

/***/ }),

/***/ 1149:
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
    key: 'create',
    value: function create() {
      this.scoreText = this.add.text(50, 50, '');
      this.livesText = this.add.text(50, 75, '');

      this._updateScoreText(null, this.registry.get('score'));
      this._updateLivesText(null, this.registry.get('lives'));

      this.registry.events.on('changedata_score', this._updateScoreText, this);
      this.registry.events.on('changedata_lives', this._updateLivesText, this);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.registry.events.off('changedata_score', this._updateScoreText, this);
      this.registry.events.off('changedata_lives', this._updateLivesText, this);
    }
  }, {
    key: '_updateScoreText',
    value: function _updateScoreText(parent, value, previousValue) {
      var _this2 = this;

      this.tweens.addCounter({
        from: previousValue || 0,
        to: value,
        duration: 500,
        onUpdate: function onUpdate(tween) {
          var roundedValue = Phaser.Math.RoundTo(tween.targets[0].value);
          _this2.scoreText.text = 'Score: ' + roundedValue;
        }
      });
    }
  }, {
    key: '_updateLivesText',
    value: function _updateLivesText(parent, value) {
      this.livesText.text = 'Lives: ' + value;
    }
  }]);

  return UiScene;
}(Phaser.Scene);

/***/ }),

/***/ 1150:
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(220);

var _gameScene = __webpack_require__(1148);

var _uiScene = __webpack_require__(1149);

var _resultsScene = __webpack_require__(1150);

var gameConfig = {
  width: 640,
  height: 480,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 400
      }
    }
  },
  scene: [_gameScene.GameScene, _uiScene.UiScene, _resultsScene.ResultsScene]
};

new Phaser.Game(gameConfig);

/***/ })

},[466]);