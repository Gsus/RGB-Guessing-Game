let numSquares = 6;
let colors = generateRandomColors(6);
let pickedColor = pickColor();

const squares = document.querySelectorAll(".square");
const mainDisplay = document.querySelector("h1");
const messageDisplay = document.querySelector("#message");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");

// init();

// function init(){
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons.forEach(function (modeButton) {
        modeButton.classList.remove("selected");
      });
      this.classList.add("selected");
      if (this === modeButtons[0]) { // If Easy mode
        numSquares = 3;
        resetGame();
        hideSquares();
      } else { // If Hard or Designer mode
        numSquares = 6;
        displaySquares();
        resetGame();
      }
    });
  }
// }


// ---------------- Main stuff and functions ------------

resetButton.addEventListener("click", resetGame);

mainDisplay.innerHTML = `The Great <br><span style = "font-size:200%;">${pickedColor}</span><br> Guessing Game`;

addColorsAndEvent();

function addColorsAndEvent() { // Main function; pretty much the core of the game
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
        // Change header's background color to pickedColor
        mainDisplay.style.backgroundColor = pickedColor;
        // Change button text
        resetButton.textContent = "Play again?";
      } else {
        // Change clicked square's color to body's background color
        this.style.backgroundColor = "#232323";
        // Show message
        messageDisplay.textContent = "Try Again";
        // Check for Game Over
        let isFinalMove = finalMove();
        if (isFinalMove) {
          // Change header's background color to red
          mainDisplay.style.backgroundColor = "rgb(255, 66, 66)";
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
  return remainingSquares === 1;
}

function resetGame() {
  // If on easy or hard mode
  if (!modeButtons[2].classList.contains("selected")) {
    // Make disabled squares great again
    enableSquares();
    // Change message when clicking a button to default
    messageDisplay.textContent = "";
    // Change header background color to default
    mainDisplay.style.backgroundColor = "steelblue";
    // Change button text to default
    resetButton.textContent = "New Colors";
    // Generate and pick a color from said colors
    generateAndPickColor();
    // Change header rgb text to picked color
    mainDisplay.innerHTML = `The Great <br><span style = "font-size:200%;">${pickedColor}</span><br> Guessing Game`;
    // Add colors and click listeners to squares
    addColorsAndEvent();
  } else { // If on designer mode
    // Make disabled squares great again
    enableSquares();
    // Change message when clicking a button to default
    messageDisplay.textContent = "";
    // Change header background color to default
    mainDisplay.style.backgroundColor = "steelblue";
    // Change button text to default
    resetButton.textContent = "New Colors";
    // Generate and pick a color
    generateAndPickColor();
    // Generate variations
    generateVariations();
    // Change header rgb text to picked color
    mainDisplay.innerHTML = `The Great <br><span style = "font-size:200%;">${pickedColor}</span><br> Guessing Game`;
  }
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
      // Easier-reading variables
      let pickedR = pickedColorValues[0];
      let pickedG = pickedColorValues[1];
      let pickedB = pickedColorValues[2];
      // Get up to 35%~ of each rgb value
      let r = Math.floor(parseInt(pickedR) * (Math.random() * 0.35 + 0.01));
      let g = Math.floor(parseInt(pickedG) * (Math.random() * 0.35 + 0.01));
      let b = Math.floor(parseInt(pickedB) * (Math.random() * 0.35 + 0.01));
      // If 1, add variations; if 0, substract 'em
      let flipCoin = Math.floor(Math.random() * 2);
      if (flipCoin === 1) {
        // Add variation and substract remainings
        r = parseInt(pickedR) + r;
        r = getRemaining(r);
        g = parseInt(pickedG) + g;
        g = getRemaining(g);
        b = parseInt(pickedB) + b;
        b = getRemaining(b);
      } else {
        r = parseInt(pickedR) - r;
        g = parseInt(pickedG) - g;
        b = parseInt(pickedB) - b;
      }
      // Assign those variations as new colors so that they can be added later
      colors[i] = `rgb(${r}, ${g}, ${b})`;
    }
  };
  // Add colors and click listeners to squares
  addColorsAndEvent();
}

function getRemaining(result) {
  const max = 255;
  if (result > max) {
    let difference = result - max;
    result = max - difference;
    return result;
  } else {
    return result;
  }
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

function pickColor() {
  // Generate random number between 0 and 5
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function changeColors() {
  // Loop through each square and change its color to pickedColor
  squares.forEach(function (square) {
    square.style.backgroundColor = pickedColor;
  });
}

function generateAndPickColor() {
  // Generate new colors
  colors = generateRandomColors(numSquares);
  // Pick a color from said colors
  pickedColor = pickColor();
}

function hideSquares(){
  // If there's not a next color, hide the square
  for (let i = 0; i < squares.length; i++) {
    if (!colors[i]) {
      squares[i].style.display = "none";
    }
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