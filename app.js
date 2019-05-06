let numSquares = 6;
let colors = generateRandomColors(6);

const squares = document.querySelectorAll(".square");
const headerMainText = document.querySelector("h1");
const messageDisplay = document.querySelector("#message");
const resetButton = document.querySelector("#reset");
const easyBtn = document.querySelector("#easyBtn");
const hardBtn = document.querySelector("#hardBtn");
const designerBtn = document.querySelector("#designerBtn");
let pickedColor = pickColor();
let isFinalMove;

// Easy mode

easyBtn.addEventListener("click", function () {
  easyBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  numSquares = 3;
  resetGame();
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
});

// Hard mode

hardBtn.addEventListener("click", function () {
  hardBtn.classList.add("selected");
  easyBtn.classList.remove("selected");
  numSquares = 6;
  resetGame();
  // Display non-visible squares
  squares.forEach(function (square) {
    if (square.style.display === "none") {
      square.style.display = "block";
    }
  });
});

// Designer mode

designerBtn.addEventListener("click", function () {
  designerBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  easyBtn.classList.remove("selected");
  numSquares = 6;
  resetGame();
});

// ---------------- Rest of the Code ------------

resetButton.addEventListener("click", resetGame);

headerMainText.textContent = `The Great ${pickedColor} Color Game`;

addColorsAndEvent();

function addColorsAndEvent() {
  for (let i = 0; i < colors.length; i++) {
    // Add initial colors to squares
    squares[i].style.backgroundColor = colors[i];
    // Add click listeners to squares
    squares[i].addEventListener("click", function () {
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
          // Change header's background color to red
          headerMainText.style.backgroundColor = "red";
          // Show "Game Over" message
          messageDisplay.textContent = "Game Over!";
          // Change button text
          resetButton.textContent = "Play again?";
          // Disable every square
          squares.forEach(function (square) {
            if (!square.classList.contains("disabled")) {
              square.classList.toggle("disabled");
            }
          });
        }
      }
    });
  }
}

function changeColors() {
  // Loop through each square and change its color to pickedColor
  squares.forEach(function (square) {
    square.style.backgroundColor = pickedColor;
  });
}

function pickColor() {
  // Generate random number between 0 and 5
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
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

function finalMove() {
  // Keep track of remaining squares in the forEach loop
  let remainingSquares = 0;
  squares.forEach(function (square) {
    // If the square is showing
    if (square.style.display !== "none") {
      // If the current square is not gone, add 1 to remainingSquare
      if (square.style.backgroundColor !== "rgb(35, 35, 35)") {
        remainingSquares++;
      }
    }
  });
  // Return depending on if there's only one square reamaining
  if (remainingSquares === 1) {
    return true;
  } else {
    return false;
  }
}

function resetGame() {
  // Make disabled squares clickable again
  squares.forEach(function (square) {
    if (square.classList.contains("disabled")) {
      square.classList.toggle("disabled");
    }
  });
  // Change message when clicking a button to default
  messageDisplay.textContent = "";
  // Change header background color to default
  headerMainText.style.backgroundColor = "#232323";
  // Change button text to default
  resetButton.textContent = "New Colors";
  // Generate new colors
  colors = generateRandomColors(numSquares);
  // Pick a color from said colors
  pickedColor = pickColor();
  // Change header rgb text to picked color
  headerMainText.textContent = `The Great ${pickedColor} Color Game`;
  // Add colors and click listeners to squares
  addColorsAndEvent();
}