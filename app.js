let colors = [
  "rgb(255, 0, 0)",
  "rgb(255, 255, 0)",
  "rgb(0, 255, 0)",
  "rgb(0, 255, 255)",
  "rgb(0, 0, 255)",
  "rgb(255, 0, 255)",
]

let squares = document.querySelectorAll(".square");
let heading = document.querySelector("h1");
let pickedColor = colors[3];

heading.textContent = `The Great ${pickedColor} Color Game`;

for (let i = 0; i < squares.length; i++) {
  // Add initial colors to squares
  squares[i].style.backgroundColor = colors[i];

  // Add click listeners to squares
  squares[i].addEventListener("click", function(){
    // Grab color of clicked square
    let clickedColor = this.style.backgroundColor;
    // Compare color to pickedColor
    if (clickedColor === pickedColor) {
      alert("Correct!");
    } else {
      alert("Wrong, ma' dude");
    }
  })
}