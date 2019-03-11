let colors = generateRandomColors(6);

const squares = document.querySelectorAll(".square");
const heading = document.querySelector("h1");
const messageDisplay = document.querySelector("#message");
let pickedColor = pickColor();

heading.textContent = `The Great ${pickedColor} Color Game`;

for (let i = 0; i < squares.length; i++) {
  // Add initial colors to squares
  squares[i].style.backgroundColor = colors[i];

  // Add click listeners to squares
  squares[i].addEventListener("click", function(){
    // Grab color of clicked square
    let clickedColor = this.style.backgroundColor;
    console.log(pickedColor, clickedColor);
    // Compare color to pickedColor
    if (clickedColor === pickedColor) {
      // Show message
      messageDisplay.textContent = "Correct!";
      // Change squares color to match correct square's color.
      changeColors();
      // Change heading's background color to pickedColor
      heading.style.backgroundColor = pickedColor;
    } else {
      // Change clicked square's color to body's background color
      this.style.backgroundColor = "#232323";
      // Show message
      messageDisplay.textContent = "Try again";
    }
  })
}

function changeColors(){
  // Loop through each square and change its color to pickedColor
  squares.forEach(function(square){
    square.style.backgroundColor = pickedColor;
  });
}

function pickColor(){
 let random = Math.floor(Math.random() * colors.length);
 return colors[random];
}

function generateRandomColors(num){
  // Create array
  let arr = [];
  // Fill array with random numbers
  for (let i = 0; i < num; i++) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    arr.push(`rgb(${r}, ${g}, ${b})`);
  }
  // Return array
  return arr;
}