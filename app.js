let colors = generateRandomColors(6);

const squares = document.querySelectorAll(".square");
const headerMainText = document.querySelector("h1");
const messageDisplay = document.querySelector("#message");
const resetButton = document.querySelector("#reset");
let pickedColor = pickColor();
let isFinalMove;

resetButton.addEventListener("click", function(){
  // Make disabled squares clickable again
  squares.forEach(function(square) {
    if (square.classList.contains("disabled")) {
      square.classList.toggle("disabled");
    }
  });
  // Generate new colors
  colors = generateRandomColors(6);
  // Pick a color from that array
  pickedColor = pickColor();
  // Change header rgb text to picked color
  headerMainText.textContent = `The Great ${pickedColor} Color Game`;
  messageDisplay.textContent = "";
  // Add colors and click listeners to squares
  addColorsAndEvent();
  // Change header background color to default
  headerMainText.style.backgroundColor = "#232323";
  // Change button text to default
  resetButton.textContent = "New Colors";
});

headerMainText.textContent = `The Great ${pickedColor} Color Game`;

addColorsAndEvent();

function addColorsAndEvent(){
  for (let i = 0; i < squares.length; i++) {
    // Add initial colors to squares
    squares[i].style.backgroundColor = colors[i];
    // Add click listeners to squares
    squares[i].addEventListener("click", function(){
      // Grab color of clicked square
      let clickedColor = this.style.backgroundColor;
      // Compare color to pickedColor
      if (clickedColor === pickedColor) {
        // Show message
        messageDisplay.textContent = "Correct!";
        // Change squares color to match correct square's color.
        changeColors();
        // Change headerMainText's background color to pickedColor
        headerMainText.style.backgroundColor = pickedColor;
        // Change button text
        resetButton.textContent = "Play again?";
      } else {
        // Change clicked square's color to body's background color
        this.style.backgroundColor = "#232323";
        // Show message
        messageDisplay.textContent = "Try again";
        // Check for Game Over
        isFinalMove = finalMove();
        if (isFinalMove) {
          headerMainText.style.backgroundColor = "red";
          messageDisplay.textContent = "Game Over!";
          squares.forEach(function(square) {
            if (!square.classList.contains("disabled")){
              square.classList.toggle("disabled");
            }
          });
        }
      }
    })
  }   
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

function finalMove(){
  // Variable to keep track of remaining squares in the forEach loop
  let remainingSquares = 0;
  squares.forEach(function(square){
    // If the current square is not gone, add 1 to remainingSquare
    if (square.style.backgroundColor !== "rgb(35, 35, 35)") {
      remainingSquares++;
    }
  });
  // Return depending on if there's only one square reamaining
  if (remainingSquares === 1) {
    return true;
  } else {
    return false;
  }
}