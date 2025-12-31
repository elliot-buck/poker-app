import Player from './Player';

export default class User extends Player {
  constructor(...args) {
    super(...args);
    this.type = Player.TYPES.USER;
  }
}