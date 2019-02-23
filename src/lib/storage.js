const LEVEL_SCORES_KEY = 'levelScores';

export class Storage {
  constructor() {
    if (this._get(LEVEL_SCORES_KEY) == null) {
      this._set(LEVEL_SCORES_KEY, []);
    }
  }

  saveLevelScore(levelIndex, score) {
    this._update(LEVEL_SCORES_KEY, levelScores => {
      levelScores[levelIndex] = score;
      return levelScores;
    });
  }

  loadLevelScore(levelIndex) {
    return this._get(LEVEL_SCORES_KEY)[levelIndex] || 0;
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
