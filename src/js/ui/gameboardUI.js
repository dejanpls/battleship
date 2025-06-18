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

  static placeShip(player) {
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

          console.log('All ships placed! Ready to start game.');
          // Call next game phase here (for tomorrow!!)
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
}
