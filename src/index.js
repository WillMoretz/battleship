import { displayGame, displayGameOver, displaySetup } from "./display";
import { gameBoard } from "./game";
import { chooseSquare, randomShipArray } from "./computer";
import { setActiveShip, toggleDirection } from "./placement";

let playerBoard;
let computerBoard;

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
  playerBoard = gameBoard();
  createBoardFromArray(playerShips, playerBoard, "player");
  computerBoard = gameBoard();
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

// Advances Game
function handleSquareClick(col, row) {
  if (computerBoard.isRepeatedAttack(col, row)) return;

  markSquare(computerBoard, col, row, "computer");
  if (computerBoard.allShipsSunk()) {
    displayGameOver("You Won");
    return;
  }

  const computerChoice = chooseSquare(playerBoard);
  markSquare(playerBoard, computerChoice.col, computerChoice.row, "player");
  if (playerBoard.allShipsSunk()) {
    displayGameOver("The Computer Won");
    return;
  }
}

document.addEventListener("placementComplete", (e) => {
  init(e.detail.playerArray, randomShipArray());
});

function handlePlacementShips() {
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
}

window.addEventListener("keydown", (e) => {
  if (e.key === "r") toggleDirection();
});
displaySetup();

export { handleSquareClick, handlePlacementShips };
