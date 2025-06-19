import Player from '../core/player';
import GameboardUI from './gameboardUI';
import UI from './ui';

export default class Game {
  static start() {
    const person = new Player('person');
    const computer = new Player('computer');
    GameboardUI.generate(person);
    GameboardUI.generate(computer);
    GameboardUI.placeShip(person, computer);
  }
}
