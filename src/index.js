import { displayGame, displaySetup } from "./display";
import { gameBoard } from "./game";
import { chooseSquare, computer } from "./computer";

const gameInit = (() => {
  const playerBoard = gameBoard();
  const computerBoard = gameBoard();

  function init(playerShips, computerShips) {
    playerShips.forEach((ship) => {
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

  return { init, playerBoard, computerBoard };
})();

function advanceGame(col, row) {}

function markSquare(board, col, row, boardType) {
  console.log("here");
  board.receiveAttack(col, row);
  if (board.attacks[board.attacks.length - 1].attackHit) {
    document
      .querySelector(`.${boardType}-board`)
      .querySelector(`.${col}${row}`)
      .classList.add("hit");
  } else {
    document
      .querySelector(`.${boardType}-board`)
      .querySelector(`.${col}${row}`)
      .classList.add("missed");
  }
}

function handleSquareClick(col, row) {
  if (gameInit.computerBoard.isRepeatedAttack(col, row)) return;
  markSquare(gameInit.computerBoard, col, row, "computer");

  if (gameInit.computerBoard.allShipsSunk()) return;
  const computerChoice = chooseSquare(gameInit.playerBoard);
  markSquare(
    gameInit.playerBoard,
    computerChoice.col,
    computerChoice.row,
    "player"
  );
}

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
displayGame();
gameInit.init(shipsArray);

export default handleSquareClick;
