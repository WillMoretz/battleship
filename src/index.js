import { displayGame, displayGameOver, displaySetup } from "./display";
import { gameBoard } from "./game";
import { chooseSquare, randomShipArray } from "./computer";

const playerBoard = gameBoard();
const computerBoard = gameBoard();
let gameActive = true;

function createBoardFromArray(ships, board, boardType) {
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
      if (boardType === "player") {
        const element = document
          .querySelector(".player-board")
          .querySelector(`.${square.col}${square.row}`);
        element.classList.add("ship");
      }
    });
    board.placeShip(first.col, last.col, first.row, last.row, name);
  });
}

function init(playerShips, computerShips) {
  createBoardFromArray(randomShipArray(), playerBoard, "player");
  createBoardFromArray(randomShipArray(), computerBoard, "computer");
}

function markSquare(board, col, row, boardType) {
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

function endGame(text) {
  gameActive = false;
  displayGameOver(text);
}

function handleSquareClick(col, row) {
  if (!gameActive || computerBoard.isRepeatedAttack(col, row)) return;
  markSquare(computerBoard, col, row, "computer");

  if (computerBoard.allShipsSunk()) {
    endGame("You Win!");
    return;
  }
  const computerChoice = chooseSquare(playerBoard);
  markSquare(playerBoard, computerChoice.col, computerChoice.row, "player");
  if (playerBoard.allShipsSunk()) {
    endGame("The Computer Won");
    return;
  }
}

displayGame();
init();

export default handleSquareClick;
