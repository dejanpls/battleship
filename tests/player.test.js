import Gameboard from '../src/js/gameboard';
import Player from '../src/js/player';

let player = new Player('person');
let computer = new Player('computer');

test('Player type is a computer.', () => {
  expect(computer.isComputer()).toBe(true);
});

test('Player gameboard is instance of Gameboard class.', () => {
  expect(player.gameboard).toBeInstanceOf(Gameboard);
});

test('Player has not lost yet.', () => {
  expect(player.hasLost()).toBe(false);
});
