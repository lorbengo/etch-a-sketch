const grid = document.getElementById("grid");
const fragment = new DocumentFragment();
const promptButton = document.getElementById("prompt");

window.addEventListener("DOMContentLoaded", () => gridGenerator());
grid.addEventListener("mouseover", changeBackgroundColorCells);
grid.addEventListener("mousedown", changeBackgroundColorCell);
promptButton.addEventListener("click", gridRegenerator);

function gridGenerator(numberSquares = 16) {
  const size = 640 / numberSquares;
  for (let row = 1; row <= numberSquares; row++) {
    for (let col = 1; col <= numberSquares; col++) {
      const cell = document.createElement("div");
      cell.style.cssText = `width: ${size}px; height: ${size}px`;
      fragment.appendChild(cell);
    }
  }
  grid.appendChild(fragment);
}

function changeBackgroundColorCells(event) {
  if (event.altKey) {
    if (event.target.id !== "grid") {
      event.target.style.backgroundColor = randomRGB();
    }
  }
}

function changeBackgroundColorCell(event) {
  if (event.target.id !== "grid") {
    event.target.style.backgroundColor = randomRGB();
  }
}

function randomRGB() {
  const red = Math.round(Math.random() * 256);
  const green = Math.round(Math.random() * 256);
  const blue = Math.round(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function gridRegenerator() {
  let numberSquares = prompt("Please enter the number of squares");
  if (!numberSquares) {
    numberSquares = 16;
  }
  if (numberSquares > 100) {
    numberSquares = 100;
  }
  grid.innerHTML = "";
  gridGenerator(numberSquares);
}
