import Player from './core/player';
import GameboardUI from './ui/UIboard';

export default class App {
  static init() {
    const person = new Player('person');
    const computer = new Player('computer');
    GameboardUI.generate(person);
    GameboardUI.generate(computer);
  }
}
