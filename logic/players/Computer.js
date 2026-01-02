import Player from './Player';

export default class Computer extends Player {
  constructor(...args) {
      super(...args);
      this.type = Player.TYPES.COMPUTER;
    }

  action() {
    return {
      type: 'call',
    };
  }
}

