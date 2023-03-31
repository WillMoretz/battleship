import { displayGame, displayGameOver, displaySetup } from "./display";
import { gameBoard } from "./game";
import { chooseSquare, randomShipArray } from "./computer";
import { setActiveShip } from "./placement";

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
      // Display Where Ships Are
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
  displayGame();
  createBoardFromArray(playerShips, playerBoard, "player");
  createBoardFromArray(computerShips, computerBoard, "computer");
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

// Advances Game
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

displaySetup();

document.addEventListener("placementComplete", (e) => {
  init(e.detail.playerArray, randomShipArray());
});

const ships = document.querySelectorAll(".placementShip");
ships.forEach((ship) => {
  ship.addEventListener("click", () => {
    // Toggle Off
    if (ship.classList.contains("selected")) {
      ship.classList.remove("selected");
      setActiveShip(0, "");
      return;
    }
    // Deselect Other Ships
    ships.forEach((aShip) => aShip.classList.remove("selected"));
    // Select Ship
    ship.classList.add("selected");
    setActiveShip(ship.children.length, ship.classList[0]);
  });
});

export default handleSquareClick;
