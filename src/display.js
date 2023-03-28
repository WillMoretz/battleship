const container = document.querySelector("[data-container]");

function updateBoardDisplay(board) {}

function createBoard(eventHandler) {
  const board = document.createElement("div");
  for (let i = 1; i < 11; i += 1) {
    for (let j = "a"; j !== "k"; j = String.fromCharCode(j.charCodeAt(0) + 1)) {
      const square = document.createElement("button");
      square.classList.add("square");
      square.classList.add(`${j}${i}`);
      square.addEventListener("click", () => {
        console.log(`${j}${i}`);
        eventHandler();
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

function displayGame(eventHandler) {
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
  section.appendChild(playerBoard, eventHandler);

  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(footer);
}

function displaySetup(eventHandler) {
  const header = createHeader();
  const footer = createFooter();
  const section = document.createElement("section");
  const title = createTitle("Place Your Ships!");
  const board = createBoard(eventHandler);

  section.appendChild(title);
  section.appendChild(board);

  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(footer);
}

export { displayGame, displaySetup };
