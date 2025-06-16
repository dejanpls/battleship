import Gameboard from '../src/js/gameboard';
import Player from '../src/js/core/player';

let player = new Player('person');
let computer = new Player('computer');

test('Player type is a computer.', () => {
  expect(computer.isComputer()).toBe(true);
});

test('Player gameboard is instance of Gameboard class.', () => {
  expect(player.gameboard).toBeInstanceOf(Gameboard);
});

test('Player misses. No ships set on the field by opponent.', () => {
  expect(player.makeMove(computer, '9,2')).toEqual({
    coordinate: '9,2',
    result: 'miss',
    sunk: false,
  });
});

test('Computer generates valid random coordinate.', () => {
  const coordinate = computer.generateMove(player).split(',');
  expect(parseInt(coordinate[0])).toBeGreaterThan(-1);
  expect(parseInt(coordinate[1])).toBeLessThan(10);
});
