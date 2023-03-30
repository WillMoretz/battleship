let activeShipLength = 0;
let direction = "colSpan";
let placementValid = true;

function setActiveShipLength(length) {
  activeShipLength = length;
}

function toggleDirection() {
  direction === "rowSpan" ? (direction = "colSpan") : (direction = "rowSpan");
}

function displayHover(col, row) {
  let currentCol = col;
  let currentRow = row;
  let iterationsLeft = activeShipLength;

  document.querySelectorAll(".hovered").forEach((hovered) => {
    hovered.classList.remove("hovered");
  });

  while (iterationsLeft > 0) {
    const square = document.querySelector(`.${currentCol}${currentRow}`);
    if (square === null) {
      placementValid = false;
      break;
    }

    square.classList.add("hovered");
    if (direction === "rowSpan") currentRow += 1;
    else currentCol = String.fromCharCode(currentCol.charCodeAt(0) + 1);

    iterationsLeft -= 1;
  }
}

export { setActiveShipLength, toggleDirection, displayHover };
