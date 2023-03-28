import { displayGame, displaySetup } from "./display";
import { gameBoard } from "./game";

displayGame();

const shipsArray = [
  [{ name: "Patrol Boat" }, { col: "a", row: 1 }, { col: "a", row: 2 }],
  [
    { name: "Battleship" },
    { col: "d", row: 9 },
    { col: "e", row: 9 },
    { col: "f", row: 9 },
    { col: "g", row: 9 },
  ],
  [
    { name: "Destroyer" },
    { col: "j", row: 6 },
    { col: "j", row: 7 },
    { col: "j", row: 8 },
  ],
  [
    { name: "Aircraft Carrier" },
    { col: "c", row: 3 },
    { col: "c", row: 4 },
    { col: "c", row: 5 },
    { col: "c", row: 6 },
    { col: "c", row: 7 },
  ],
  [
    { name: "Submarine" },
    { col: "e", row: 7 },
    { col: "f", row: 7 },
    { col: "g", row: 7 },
  ],
];

const gameInit = (() => {
  const playerBoard = gameBoard();
  const computerBoard = gameBoard();

  function init(ships) {
    ships.forEach((ship) => {
      let first = undefined;
      let name = undefined;
      let last = undefined;
      ship.forEach((square) => {
        if (name === undefined) {
          name = square.name;
          return;
        }
        if (first === undefined) first = { col: square.col, row: square.row };
        last = { col: square.col, row: square.row };
        const element = document
          .querySelector(".player-board")
          .querySelector(`.${square.col}${square.row}`);
        element.classList.add("ship");
      });
      playerBoard.placeShip(first.col, last.col, first.row, last.row, name);
    });
  }

  return { init };
})();

gameInit.init(shipsArray);

function advanceGame(col, row) {
  if (gameBoard.isRepeatedAttack(col, row)) return;
}
