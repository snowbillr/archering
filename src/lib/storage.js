const LEVEL_STARS_KEY = 'levelStars';
const GOLD_KEY = 'gold';

export class Storage {
  constructor() {
    if (this._get(LEVEL_STARS_KEY) == null) {
      this._set(LEVEL_STARS_KEY, []);
    }
  }

  loadGold() {
    return this._get(GOLD_KEY) || 0;
  }

  saveLevelStars(levelIndex, score) {
    this._update(LEVEL_STARS_KEY, levelScores => {
      levelScores[levelIndex] = score;
      return levelScores;
    });
  }

  loadLevelStars(levelIndex) {
    return this._get(LEVEL_STARS_KEY)[levelIndex] || 0;
  }

  _get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  _set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  _update(key, updater) {
    const value = this._get(key);
    const updatedValue = updater(value);
    this._set(key, updatedValue);
  }
}

window.Storage = new Storage();
