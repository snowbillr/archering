import * as STATES from '../level-states';

export class SplitArrowSkill {
  constructor(scene) {
    this.scene = scene;

    this.validStates = [STATES.FLY];
  }

  activate() {
    console.log('SPLIT!')
  }

  deactivate() {
    console.log('UNSPLIT!')
  }
}
