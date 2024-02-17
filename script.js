const grid = document.getElementById("grid");
const fragment = new DocumentFragment();

for (let row = 1; row <= 16; row++) {
  for (let col = 1; col <= 16; col++) {
    const cell = document.createElement("div");
    cell.style.cssText = "width: 16px; height: 16px";
    fragment.appendChild(cell);
  }
}
grid.appendChild(fragment);

grid.addEventListener("mouseover", changeBackgroundColorCells);
grid.addEventListener("mousedown", changeBackgroundColorCell);

function changeBackgroundColorCells(event) {
  if (event.altKey) {
    event.target.style.backgroundColor = "black";
  }
}

function changeBackgroundColorCell(event) {
  event.target.style.backgroundColor = "black";
}
