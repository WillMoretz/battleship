let activeShipLength = 0;
let activeShipName = "";
let direction = "colSpan";
let placementValid = false;

function setActiveShip(length, name) {
  activeShipLength = length;
  activeShipName = name;
}

function clearHovered() {
  document.querySelectorAll(".hovered").forEach((hovered) => {
    hovered.classList.remove("hovered");
  });
}

let startCol = "";
let startRow = "";

function toggleDirection() {
  direction === "rowSpan" ? (direction = "colSpan") : (direction = "rowSpan");
  displayHover(startCol, startRow);
}

function displayHover(col, row) {
  if (col === "" || row === "") return;
  if (document.querySelector(".selected") === null) return;
  startCol = col;
  let currentCol = col;
  startRow = row;
  let currentRow = row;
  let iterationsLeft = activeShipLength;

  clearHovered();

  while (iterationsLeft > 0) {
    const square = document.querySelector(`.${currentCol}${currentRow}`);
    if (square === null) {
      placementValid = false;
      break;
    }
    if (square.classList.contains("ship")) {
      placementValid = false;
      break;
    }

    square.classList.add("hovered");
    if (direction === "rowSpan") currentRow += 1;
    else currentCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);

    iterationsLeft -= 1;
  }

  if (iterationsLeft === 0) placementValid = true;
}

let playerArray = [];
function resetPlacement() {
  playerArray.length = 0;
}

function placeShip(col, row) {
  if (!placementValid) return;
  let shipArray = [{ name: activeShipName }];
  let currentCol = col;
  let currentRow = row;
  let iterationsLeft = activeShipLength;
  while (iterationsLeft > 0) {
    shipArray.push({ col: currentCol, row: currentRow });
    const square = document.querySelector(`.${currentCol}${currentRow}`);
    square.classList.add("ship");
    if (direction === "rowSpan") currentRow += 1;
    else currentCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);
    iterationsLeft -= 1;
  }
  playerArray.push(shipArray);

  clearHovered();
  document.querySelector(".selected").remove();
  placementValid = false;

  // If all ships are placed init the game
  if (document.querySelector(".placementShip") === null) {
    const event = new CustomEvent("placementComplete", {
      detail: { playerArray },
      bubbles: true,
      cancelable: true,
      composed: false,
    });
    document.querySelector("[data-container]").dispatchEvent(event);
  }
}

export {
  setActiveShip,
  toggleDirection,
  displayHover,
  placeShip,
  resetPlacement,
};
