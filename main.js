var flips = 0;
var cardList = [
  "cloudy",
  "cold",
  "hot",
  "windy",
  "sun",
  "moon",
  "thunder",
  "partlyCloudy",
  "rainy",
  "snow",
];

var cardSet;
var board = [];
var rows = 4;
columns = 5;

var card1Selected;
var card2Selected;

window.onload = function () {
  shuffleCards();
  startGame();
};

function shuffleCards() {
  // Create a deck with two of each card by concatenating the card list with itself
  cardSet = cardList.concat(cardList);
  // Log the initial cardSet for debugging
  console.log(cardSet);

  // Shuffle the cardSet array
  for (let i = 0; i < cardSet.length; i++) {
    // Generate a random index j between 0 and cardSet.length - 1
    let j = Math.floor(Math.random() * cardSet.length);

    // Swap cards
    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }

  // console.log(cardSet);
}

function startGame() {
  // Arrange the board with 4 rows and 5 columns
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      // Get a card image from the card set
      let cardImg = cardSet.pop();
      // Add the card image to the current row
      row.push(cardImg);

      // Create a new image element for the card
      let card = document.createElement("img");
      // Set the card's ID to its position in the board (row.column)
      card.id = i.toString() + "." + j.toString();
      // Set the card's source to the image path
      card.src = cardImg + ".jpg";
      // Add the "card" class for styling
      card.classList.add("card");
      // Add an event listener to handle card clicks
      card.addEventListener("click", selectCard);
      // Append the card to the board element
      document.getElementById("board").append(card);
    }
    // Add the row to the board array
    board.push(row);
  }

  // console.log(board);
  // Hide the cards after a 1-second delay to allow players to see the initial board state
  setTimeout(hideCards, 1000);
}

function hideCards() {
  // Loop through each cell in the board
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // Get the card element by its ID
      let card = document.getElementById(i.toString() + "." + j.toString());
      // Set the card's source to the back image to hide its face
      card.src = "back.jpg";
    }
  }
}

function selectCard() {
  // Check if the clicked card is face down
  if (this.src.includes("back")) {
    // If no card is currently selected, set the clicked card as the first selected card
    if (!card1Selected) {
      card1Selected = this;

      // Get the coordinates from the card's ID
      let coords = card1Selected.id.split(".");
      let i = parseInt(coords[0]);
      let j = parseInt(coords[1]);

      // Reveal the card's face by setting its source to the corresponding image
      card1Selected.src = board[i][j] + ".jpg";
    }
    // If a second card is not selected and the clicked card is not the first card
    else if (!card2Selected && this != card1Selected) {
      card2Selected = this;

      // Get the coordinates from the card's ID
      let coords = card2Selected.id.split(".");
      let i = parseInt(coords[0]);
      let j = parseInt(coords[1]);

      // Reveal the card's face by setting its source to the corresponding image
      card2Selected.src = board[i][j] + ".jpg";
      // Call the update function after 1 second to check for a match
      setTimeout(update, 1000);
    }
  }
}

function update() {
  // Check if the two selected cards do not match
  if (card1Selected.src != card2Selected.src) {
    // Hide the two cards by setting their source back to the back image
    card1Selected.src = "back.jpg";
    card2Selected.src = "back.jpg";
    // Increment the flip counter
    flips += 1;
    // Update the displayed number of flips
    document.getElementById("flips").innerText = flips;
  }
  // Reset the selected cards
  card1Selected = null;
  card2Selected = null;
}

//Image by freepik(https://www.freepik.com)
