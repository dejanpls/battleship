export default class GameboardUI {
  static generate(player) {
    const type = player.isComputer() ? 'computer' : 'person';
    const gameboard = document.getElementById(`${type}Board`);

    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div');
      row.id = `row-${i}`;

      for (let j = 0; j < 10; j++) {
        const div = document.createElement('div');
        div.id = `${i},${j}`;
        row.appendChild(div);
      }

      gameboard.appendChild(row);
    }
  }
}
