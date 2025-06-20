import Game from './game';
import UI from './ui';

export default class GameboardUI {
  static generate(player) {
    const type = player.isComputer() ? 'computer' : 'person';
    const gameboard = document.getElementById(`${type}Board`);

    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div');

      for (let j = 0; j < 10; j++) {
        const div = document.createElement('div');
        div.className = 'cell';
        div.dataset.x = i;
        div.dataset.y = j;
        row.appendChild(div);
      }

      gameboard.appendChild(row);
    }
  }

  static placeShip(player, computer) {
    const type = player.isComputer() ? 'computer' : 'person';
    const gameboard = document.getElementById(`${type}Board`);
    const rotateBtn = document.getElementById('rotateBtn');

    rotateBtn.addEventListener('mouseup', () => UI.setShipDirection(rotateBtn));

    let shipLength = player.gameboard.nextShipSize();

    gameboard.addEventListener('mouseup', (event) => {
      const coords = UI.getCoordsFromEvent(event, player, shipLength);
      UI.highlightCell(coords, gameboard, 'ship');

      if (coords) {
        player.gameboard.placeShip(coords);
        shipLength = player.gameboard.nextShipSize();

        if (!shipLength) {
          gameboard.classList.add('disabled');
          gameboard.style.pointerEvents = 'none';
          rotateBtn.style.pointerEvents = 'none';

          console.log('All ships placed! Generating computer ship positions.');

          // Now generate all of the ships for computer
          UI.generateComputerPositions(computer);
          this.startBattle(player, computer);
        }
      }
    });

    gameboard.addEventListener('mouseover', (event) => {
      if (!event.target.classList.contains('cell')) return;

      // Clear previous preview
      gameboard
        .querySelectorAll('.cell.preview')
        .forEach((cell) => cell.classList.remove('preview'));

      const coords = UI.getCoordsFromEvent(event, player, shipLength);
      UI.highlightCell(coords, gameboard, 'preview');
    });
  }

  static startBattle(player, computer) {
    UI.hideRotateBtn();
    UI.updateGameInfo("It's time to attack!");

    const gameboard = document.getElementById('computerBoard');
    const playerboard = document.getElementById('personBoard');

    let active = true;

    gameboard.addEventListener('mouseup', (event) => {
      if (!active) return;

      const key = UI.getKeyFromEvent(event);
      const playerResult = player.makeMove(computer, key.join(','));
      const computerResult = computer.makeMove(player);

      const computerMsg = computerResult.sunk
        ? 'ship is destroyed'.toUpperCase()
        : computerResult.result.toUpperCase();
      const playerMsg = playerResult.sunk
        ? 'ship is destroyed'.toUpperCase()
        : playerResult.result.toUpperCase();

      if (player.hasLost()) {
        UI.updateGameInfo(
          `${computerMsg}! Our enemy got the best of us, captain! We've lost.`
        );
        active = false;
      } else if (computer.hasLost()) {
        UI.updateGameInfo(
          `${playerMsg}! We've destroyed all of the enemies ships!`
        );
        active = false;
      } else {
        UI.highlightTarget(
          playerResult.coordinate.split(','),
          gameboard,
          playerResult.result
        );

        UI.updateGameInfo(
          `${playerMsg}! You attacked ${playerResult.coordinate}`
        );

        active = false;

        setTimeout(() => {
          UI.updateGameInfo('Behold! Computer is on the attack!');
        }, 2000);

        setTimeout(() => {
          UI.updateGameInfo(
            `${computerMsg}! Computer attacked ${computerResult.coordinate}`
          );
          UI.highlightTarget(
            computerResult.coordinate.split(','),
            playerboard,
            computerResult.result
          );
        }, 4000);

        setTimeout(() => {
          UI.updateGameInfo("Let's attack again, captain!");
          active = true;
        }, 6000);
      }
    });

    gameboard.addEventListener('mouseover', (event) => {
      if (!event.target.classList.contains('cell')) return;

      if (!active) return;

      // Clear previous preview
      gameboard
        .querySelectorAll('.cell.targetShip')
        .forEach((cell) => cell.classList.remove('targetShip'));

      const coords = UI.getKeyFromEvent(event, computer);
      UI.highlightTarget(coords, gameboard, 'targetShip');
    });
  }
}
