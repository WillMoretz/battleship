import { displayGame, displaySetup } from "./display";
import { gameBoard } from "./game";

displayGame();

const shipsArray = [
  [
    { col: "a", row: 1 },
    { col: "a", row: 2 },
  ],
  [
    { col: "d", row: 9 },
    { col: "e", row: 9 },
    { col: "f", row: 9 },
    { col: "g", row: 9 },
  ],
  [
    { col: "j", row: 6 },
    { col: "j", row: 7 },
    { col: "j", row: 8 },
  ],
  [
    { col: "c", row: 3 },
    { col: "c", row: 4 },
    { col: "c", row: 5 },
    { col: "c", row: 6 },
    { col: "c", row: 7 },
  ],
  [
    { col: "e", row: 7 },
    { col: "f", row: 7 },
    { col: "g", row: 7 },
  ],
];

function initGame(ships) {
  ships.forEach((ship) => {
    ship.forEach((square) => {
      const element = document
        .querySelector(".player-board")
        .querySelector(`.${square.col}${square.row}`);
      element.classList.add("ship");
    });
  });
}

initGame(shipsArray);

function advanceGame(col, row) {
  if (gameBoard.isRepeatedAttack(col, row)) return;
}
