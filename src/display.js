import handleSquareClick from "./index";
import { displayHover, placeShip, toggleDirection } from "./placement";

const container = document.querySelector("[data-container]");

function createBoard() {
  const board = document.createElement("div");
  for (let i = 1; i < 11; i += 1) {
    for (let j = "a"; j !== "k"; j = String.fromCharCode(j.charCodeAt(0) + 1)) {
      const square = document.createElement("button");
      square.classList.add("square");
      square.classList.add(`${j}${i}`);
      square.addEventListener("click", () => {
        if (square.parentElement.classList.contains("player-board")) return;
        if (square.parentElement.classList.contains("computer-board"))
          handleSquareClick(j, i);
        if (square.parentElement.classList.contains("setup-board")) {
          placeShip(j, i);
        }
      });
      square.addEventListener("mouseover", () => {
        if (!square.parentElement.classList.contains("setup-board")) return;
        displayHover(j, i);
      });
      board.classList.add("board");
      board.appendChild(square);
    }
  }
  return board;
}

function reset() {
  container.textContent = "";
}

function createHeader() {
  const header = document.createElement("header");
  header.textContent = "Battleship";
  return header;
}

function createFooter() {
  const footer = document.createElement("footer");
  footer.textContent = "Made by Will Moretz";
  return footer;
}

function createTitle(text) {
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = text;
  return title;
}

function displayGame() {
  reset();

  const header = createHeader();
  const footer = createFooter();
  const section = document.createElement("section");
  const computerTitle = createTitle("Computer's Board");
  const playerTitle = createTitle("Your Board");
  const computerBoard = createBoard();
  computerBoard.classList.add("computer-board");
  const playerBoard = createBoard();
  playerBoard.classList.add("player-board");

  section.appendChild(computerTitle);
  section.appendChild(computerBoard, null);
  section.appendChild(playerTitle);
  section.appendChild(playerBoard);

  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(footer);
}

function displayGameOver(text) {
  const popUp = document.createElement("div");
  popUp.classList.add("pop-up");

  const gameOverText = document.createElement("div");
  gameOverText.classList.add("game-over-text");
  gameOverText.textContent = text;

  const replayButton = document.createElement("button");
  replayButton.textContent = "Replay";
  replayButton.classList.add("replay-button");

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  popUp.appendChild(gameOverText);
  popUp.appendChild(replayButton);

  container.appendChild(overlay);
  container.appendChild(popUp);
}

function createShip(squareAmount, className) {
  const ship = document.createElement("button");
  ship.classList.add(className);
  ship.classList.add("placementShip");
  for (let i = 0; i < squareAmount; i++) {
    const square = document.createElement("div");
    ship.appendChild(square);
  }
  return ship;
}

function displaySetup() {
  const header = createHeader();
  const footer = createFooter();
  const section = document.createElement("section");
  const title = createTitle("Place Your Ships!");
  const board = createBoard();
  board.classList.add("setup-board");

  const buttons = document.createElement("div");
  buttons.classList.add("buttons");

  const rotateButton = document.createElement("button");
  rotateButton.textContent = "Rotate (r)";
  rotateButton.classList.add("rotate-button");
  rotateButton.addEventListener("click", () => {
    toggleDirection();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "r") toggleDirection();
  });

  const shipsContainer = document.createElement("div");
  shipsContainer.classList.add("ships-container");

  const aircraftCarrier = createShip(5, "aircraft-carrier");
  const battleship = createShip(4, "battleship");
  const submarine = createShip(3, "submarine");
  const destroyer = createShip(3, "destroyer");
  const patrolBoat = createShip(2, "patrol-boat");

  section.appendChild(title);
  section.appendChild(board);

  buttons.appendChild(rotateButton);

  shipsContainer.appendChild(aircraftCarrier);
  shipsContainer.appendChild(battleship);
  shipsContainer.appendChild(submarine);
  shipsContainer.appendChild(destroyer);
  shipsContainer.appendChild(patrolBoat);

  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(buttons);
  container.appendChild(shipsContainer);
  container.appendChild(footer);
}

export { displayGame, displaySetup, displayGameOver };
