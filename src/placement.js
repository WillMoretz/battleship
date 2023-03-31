let activeShipLength = 0;
let direction = "colSpan";
let placementValid = false;

function setActiveShipLength(length) {
  activeShipLength = length;
}

function toggleDirection() {
  direction === "rowSpan" ? (direction = "colSpan") : (direction = "rowSpan");
}

function clearHovered() {
  document.querySelectorAll(".hovered").forEach((hovered) => {
    hovered.classList.remove("hovered");
  });
}

function displayHover(col, row) {
  if (document.querySelector(".selected") === null) return;
  let currentCol = col;
  let currentRow = row;
  let iterationsLeft = activeShipLength;
  console.log(iterationsLeft);

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

function placeShip(col, row) {
  if (!placementValid) return;
  let currentCol = col;
  let currentRow = row;
  let iterationsLeft = activeShipLength;
  while (iterationsLeft > 0) {
    const square = document.querySelector(`.${currentCol}${currentRow}`);
    square.classList.add("ship");
    if (direction === "rowSpan") currentRow += 1;
    else currentCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);
    iterationsLeft -= 1;
  }
  document.querySelector(".selected").remove();
  clearHovered();
}

export { setActiveShipLength, toggleDirection, displayHover, placeShip };
