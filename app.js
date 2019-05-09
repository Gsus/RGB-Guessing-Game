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

// -------------- Difficulty modes ---------------

// Easy mode

easyBtn.addEventListener("click", function () {
  easyBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  designerBtn.classList.remove("selected");
  numSquares = 3;
  resetGame();
  // If there's a next color, add it to a square; otherwise don't show the square in the first place.
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
  designerBtn.classList.remove("selected");
  numSquares = 6;
  displaySquares();
  resetGame();
});

// Designer mode

designerBtn.addEventListener("click", function () {
  designerBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  easyBtn.classList.remove("selected");
  numSquares = 6;
  displaySquares();
  // Self-explanatory, lol
  resetGame();
  // Get each rgb value from the picked color
  generateVariations();
});

// ---------------- Main stuff and functions ------------

resetButton.addEventListener("click", resetGame);

headerMainText.textContent = `The Great ${pickedColor} Color Game`;

addColorsAndEvent();

// Main function; pretty much the core of the game
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
          disableSquares();
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

function generateAndPickColor() {
  // Generate new colors
  colors = generateRandomColors(numSquares);
  // Pick a color from said colors
  pickedColor = pickColor();
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
  // Return depending on if there's only one square remaining
  if (remainingSquares === 1) {
    return true;
  } else {
    return false;
  }
}

function resetGame() {
  // If on easy or hard mode
  if (!designerBtn.classList.contains("selected")) {
    // Make disabled squares great again
    enableSquares();
    // Change message when clicking a button to default
    messageDisplay.textContent = "";
    // Change header background color to default
    headerMainText.style.backgroundColor = "#232323";
    // Change button text to default
    resetButton.textContent = "New Colors";
    // Generate and pick a color from said colors
    generateAndPickColor();
    // Change header rgb text to picked color
    headerMainText.textContent = `The Great ${pickedColor} Color Game`;
    // Add colors and click listeners to squares
    addColorsAndEvent();
  } else { // If on designer mode
    // Make disabled squares great again
    enableSquares();
    // Change message when clicking a button to default
    messageDisplay.textContent = "";
    // Change header background color to default
    headerMainText.style.backgroundColor = "#232323";
    // Change button text to default
    resetButton.textContent = "New Colors";
    // Generate and pick a color
    generateAndPickColor();
    // Generate variations
    generateVariations();
    // Change header rgb text to picked color
    headerMainText.textContent = `The Great ${pickedColor} Color Game`;
  }
}

function displaySquares() {
  // Display non-visible squares
  squares.forEach(function (square) {
    if (square.style.display === "none") {
      square.style.display = "block";
    }
  });
}

function disableSquares() {
  // Disable every square
  squares.forEach(function (square) {
    if (!square.classList.contains("disabled")) {
      square.classList.toggle("disabled");
    }
  });
}

function enableSquares() {
  // Make disabled squares great again
  squares.forEach(function (square) {
    if (square.classList.contains("disabled")) {
      square.classList.toggle("disabled");
    }
  });
}

function generateVariations() {
  // Get each rgb value from the picked color
  let pickedColorValues = pickedColor;
  pickedColorValues = pickedColorValues.split("(");
  pickedColorValues = pickedColorValues[1];
  pickedColorValues = pickedColorValues.split(")");
  pickedColorValues = pickedColorValues[0];
  pickedColorValues = pickedColorValues.split(",");
  // Generate color variations
  for (let i = 0; i < colors.length; i++) {
    if (colors[i] !== pickedColor) {
      // Get up to 1/2 of each rgb value
      let r = Math.floor(parseInt(pickedColorValues[0]) * (Math.random() * 0.5));
      let g = Math.floor(parseInt(pickedColorValues[1]) * (Math.random() * 0.5));
      let b = Math.floor(parseInt(pickedColorValues[2]) * (Math.random() * 0.5));
      // If 0, substract; if 1, add variations
      let flipCoin = Math.floor(Math.random() * 2);
      if (flipCoin === 1) {
        r = parseInt(pickedColorValues[0]) + r;
        g = parseInt(pickedColorValues[1]) + g;
        b = parseInt(pickedColorValues[2]) + b;
      } else {
        r = parseInt(pickedColorValues[0]) - r;
        g = parseInt(pickedColorValues[1]) - g;
        b = parseInt(pickedColorValues[2]) - b;
      }
      // Assign those variations as new colors so that they can be added later
      colors[i] = `rgb(${r}, ${g}, ${b})`;
    }
  };
  // Add colors and click listeners to squares
  addColorsAndEvent();
}