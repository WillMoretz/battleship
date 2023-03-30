import handleSquareClick from "./index";
const container = document.querySelector("[data-container]");

function updateBoardDisplay(board, attackHit, col, row) {
  if (attackHit) {
    board.querySelector(`.${row}${col}`).classList.add("missed");
  } else {
    board.querySelector(`.${row}${col}`).classList.add("hit");
  }
}

function createBoard() {
  const board = document.createElement("div");
  for (let i = 1; i < 11; i += 1) {
    for (let j = "a"; j !== "k"; j = String.fromCharCode(j.charCodeAt(0) + 1)) {
      const square = document.createElement("button");
      square.classList.add("square");
      square.classList.add(`${j}${i}`);
      square.addEventListener("click", () => {
        if (square.parentElement.classList.contains("player-board")) return;
        handleSquareClick(j, i);
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

  popUp.appendChild(gameOverText);
  popUp.appendChild(replayButton);
  container.appendChild(popUp);
}

function displaySetup() {
  const header = createHeader();
  const footer = createFooter();
  const section = document.createElement("section");
  const title = createTitle("Place Your Ships!");
  const board = createBoard();

  section.appendChild(title);
  section.appendChild(board);

  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(footer);
}

export { displayGame, displaySetup, updateBoardDisplay, displayGameOver };
