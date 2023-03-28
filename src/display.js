const container = document.querySelector("[data-container]");

function updateBoardDisplay(board) {}

function createBoard(type) {
  if (type === "setup") {
    // Display Drag and Drop Set up Board
  }
  const board = document.createElement("div");
  for (let i = 1; i < 11; i += 1) {
    for (let j = "a"; j !== "k"; j = String.fromCharCode(j.charCodeAt(0) + 1)) {
      const square = document.createElement("button");
      square.classList.add("square");
      square.classList.add(`${i}${j}`);
      square.addEventListener("click", () => {
        console.log(`${i}${j}`);
      });
      board.appendChild(square);
    }
  }
  return board;
}

function reset() {
  container.textContent = "";
}

function displayGame() {
  console.log("here");
  reset();

  const header = document.createElement("header");
  header.textContent = "Battleship";

  const footer = document.createElement("footer");
  footer.textContent = "Made by Will Moretz";

  const section = document.createElement("section");

  const computerTitle = document.createElement("div");
  computerTitle.classList.add("title");
  computerTitle.textContent = "Computer's Board";

  const playerTitle = document.createElement("div");
  playerTitle.classList.add("title");
  playerTitle.textContent = "Your Board";

  const computerBoard = createBoard();
  computerBoard.classList.add("board");

  const playerBoard = createBoard();
  playerBoard.classList.add("board");

  section.appendChild(computerTitle);
  section.appendChild(computerBoard);
  section.appendChild(playerTitle);
  section.appendChild(playerBoard);

  container.appendChild(header);
  container.appendChild(section);
  container.appendChild(footer);
}
function displaySetup() {}

export { displayGame, displaySetup };
