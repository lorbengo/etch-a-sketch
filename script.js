const grid = document.getElementById("grid");
const fragment = new DocumentFragment();

for (let row = 0; row < 16; row++) {
  for (let col = 0; col < 16; col++) {
    const cell = document.createElement("div");
    cell.style.cssText =
      "width: 16px; height: 16px; border-right: 1px solid black; border-bottom: 1px solid black";
    fragment.appendChild(cell);
  }
}

grid.appendChild(fragment);
