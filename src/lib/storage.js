const LEVEL_STARS_KEY = 'levelStars';
const GOLD_KEY = 'gold';
const SKILLS_KEY = 'skills';

export class Storage {
  constructor() {
    if (this._get(LEVEL_STARS_KEY) == null) {
      this._set(LEVEL_STARS_KEY, []);
    }

    if (!this._has(GOLD_KEY)) {
      this._set(GOLD_KEY, 0);
    }

    if (!this._has(SKILLS_KEY)) {
      this._set(SKILLS_KEY, {
        spectralArrow: {
          chargeCount: 0,
        },
        cannonball: {
          chargeCount: 0,
        },
        splitArrow: {
          chargeCount: 0,
        },
      });
    }
  }

  saveSkill(skillKey, skillData) {
    this._update(SKILLS_KEY, allSkills => {
      allSkills[skillKey] = skillData;

      return allSkills;
    });
  }

  loadSkill(skillKey) {
    return this._get(SKILLS_KEY)[skillKey];
  }

  saveGold(gold) {
    this._set(GOLD_KEY, gold);
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

  _has(key) {
    return this._get(key) != null;
  }
}

window.Storage = new Storage();
