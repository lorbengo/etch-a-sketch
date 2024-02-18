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
  const cell = event.target;
  if (cell.id !== "grid") {
    if (event.ctrlKey) {
      paintBackground(cell, "black");
    }
    if (event.altKey) {
      paintBackground(cell, randomRGB());
    }
    if (event.shiftKey) {
      removeBackground(cell);
    }
  }
}

function changeBackgroundColorCell(event) {
  const cell = event.target;
  if (cell.id !== "grid") {
    if (event.altKey) {
      paintBackground(cell, randomRGB());
    } else if (event.shiftKey) {
      removeBackground(cell);
    } else {
      paintBackground(cell, "black");
    }
  }
}

function paintBackground(cell, color) {
  if (!cell.style.backgroundColor) {
    addBackground(cell, color);
    // } else if (cell.dataset.interactions === "10") {
    //   removeAttributes(cell);
  } else if (cell.dataset.interactions !== "10") {
    updateBackground(cell);
  }
}

function addBackground(cell, color) {
  if (color === "black") {
    monochrome(cell);
  } else {
    colored(cell);
  }
}

function monochrome(cell) {
  const n = 255 - 25.5;
  cell.style.backgroundColor = `rgb(${n}, ${n}, ${n})`;
  cell.dataset.percentRed = 25.5;
  cell.dataset.percentGreen = 25.5;
  cell.dataset.percentBlue = 25.5;
  cell.dataset.red = n;
  cell.dataset.green = n;
  cell.dataset.blue = n;
  cell.dataset.interactions = "1";
}

function colored(cell) {
  cell.style.backgroundColor = randomRGB();
  const [red, green, blue] = cell.style.backgroundColor
    .split(/rgb\((\d+), (\d+), (\d+)\)/)
    .filter(Boolean);
  cell.dataset.percentRed = red / 10;
  cell.dataset.percentGreen = green / 10;
  cell.dataset.percentBlue = blue / 10;
  cell.dataset.red = red;
  cell.dataset.green = green;
  cell.dataset.blue = blue;
  cell.dataset.interactions = "0";
}

function updateBackground(cell) {
  cell.dataset.interactions = `${parseInt(cell.dataset.interactions) + 1}`;
  cell.dataset.red = darkening(cell.dataset.red, cell.dataset.percentRed);
  cell.dataset.green = darkening(cell.dataset.green, cell.dataset.percentGreen);
  cell.dataset.blue = darkening(cell.dataset.blue, cell.dataset.percentBlue);
  cell.style.backgroundColor = `rgb(${cell.dataset.red}, ${cell.dataset.green}, ${cell.dataset.blue})`;
}

function removeBackground(cell) {
  delete cell.dataset.interactions;
  delete cell.dataset.red;
  delete cell.dataset.green;
  delete cell.dataset.blue;
  delete cell.dataset.percentRed;
  delete cell.dataset.percentGreen;
  delete cell.dataset.percentBlue;
  cell.style.backgroundColor = "";
}

function darkening(color, tenPercentColor) {
  return parseFloat(color) - parseFloat(tenPercentColor);
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
