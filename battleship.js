

var view = {
  // this method takes a string messge and displays it in the message display area
  // use the DOM to get the element with the id "messageArea";
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    // update the text of the messageArea by setting its innerHTML to 'msg';
    messageArea.innerHTML = msg;

  },

  displayHits: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");

  },

  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");

  }
};



// THE MODEL
// the model is were we keep the state of the game
// it hold logic to hoe the state changes
// in this case it incluedes the location of the ship,has the ship beeen hit or has it been sunk
  // bordSize: the size of the grid for he board
  // numship
  // ships
  // shipsSunk
  // shipLength
  // fire

// we will be representing each ships as an object that holsthe location it sits in
// each ship has an array of three locations and an array to track hits


// so we build the model from the properties listed above
var model = {

  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  
  // INITIAL SHIPS--TESTER
  // ships: [{locations: ["06", "16", "26"], hits: ["", "", ""] }, 
  //         {locations: ["24", "34", "44"], hits: ["", "", ""] }, 
  //         {locations: ["10", "11", "12"], hits: ["", "", ""] }],
  
  // the size of the ship array and the locatins and hit arrays.
  ships: [
    {locations: [0, 0, 0], hits: ["", "", ""] }, 
    {locations: [0, 0, 0], hits: ["", "", ""] }, 
    {locations: [0 ,0, 0], hits: ["", "", ""] }
  ],

  // we are using the guess parameter to control the output of the fire method
  // so we need the index of the guess string in the location array;
  // we iterate through the ships array fires
  // then we access the location of the ships by assigning it a variable 'ship'
  // we also access the locations array by using the 'ship.locations'
  fire: function(guess) {
    // iterate through the array to examine one ship at a time
    // indexOf takes a value and returns the index of that value in an array
    // it returns -1 if it can find the value;
    // location = ships.locations -- this gets the locations array from the ships object;  
    // if the index of guess in locatio is  '>=0' we have a hit
    // call the displayHits and displayMessage mthod
    // increase the number of ships sunk in the model after a ship has been sunk
    // call displayMessage method for display;
    for (var i = 0; i < this.numShips; i++) {
      
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);
      console.log(ship)
      console.log(index)

      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayMessage("HIT!");
        view.displayHits(guess);

        if (this.isSunk(ship)) {
          this.shipsSunk++
          view.displayMessage("bastard! You sunk my ship");
        }
        return true;
      }
    }
    view.displayMiss(guess)
    view.displayMessage("You missed");
    return false;
  },


// we can also chaining to shorten some referencE
// var index = ship.locations.indexOf(guess);

// no we write a code to check if the ship is sunk;
// a battleship is sunk if its locations are hit;

// method isSunk takes a ship and check every location for a hit;
// returns true if the the ship has been sunk;
  isSunk: function(ship) {
    for(var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
    },

// HOW TO PLACE SHIPS
// weare going to organise our code into three method that are part of our model object;
// genereteShipsLocations--create a ship array;
// genereteShips--create a single ship located on the board;
// collision--makes sure a ship dosn't collide with another on board;
// we are adding the method to the modal object;
// check for overlap if tere is try again;
generateShipLocations: function() {
  var locations;
  for (var i = 0; i < this.numShips; i++) {
    do {
      locations = this.generateShip();
    } while (this.collision(locations));
    this.ships[i].locations = locations;
  }
  console.log("Ships array: ");
  console.log(this.ships);
},

// creating  function to generate ship
// generate a horizontal ship if the direction is 1
// generate an horizontal ship if the direction is 0
generateShip: function() {
  var direction = Math.floor(Math.random()*2);
  var row, col;

  if (direction === 1) { // Horizontal
    row = Math.floor(Math.random() * this.boardSize);
    col = Math.floor(Math.random() * (this.boardSize - this.shipLength)); 
  } else { // Vertical
    row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    col = Math.floor(Math.random() * this.boardSize);
  }

  // pushing a new location onto the newShipLocations array;
  // the location is a string made up of row 
  // and the 'col+i' so as to get something like "01", "02", "03" in the Array;
  var newShipLocations = [];
  for (var i = 0; i < this.shipLength; i++) {
    if (direction === 1) {
      newShipLocations.push(row + "" + (col + i));
      console.log(newShipLocations);
    } else {
      newShipLocations.push((row + i) + "" + col);
      console.log(newShipLocations);
    }
  }
  return newShipLocations;
},


// AVOIDING A COLLISION
// for each ship already on the board 
// check to see if the index of the locations matches an existing generated location
// hence index is greater than or equal to 0
// return true if there is collision
collision: function(locations) {
for (var i = 0; i < this.numShips; i++) {
  var ship = model.ships[i];
  for (var j = 0; j < locations.length; j++) {
    if (ship.locations.indexOf(locations[j]) >= 0) {
      return true;
    }
  }
}
return false;
}


};


// THE CONTROLLER
// at a high level, the controller glues everything together
// getting a guess, processing the guess, getting it to the model
// keeping track of the guesses and the players progress in the game;
  // guesses: keeps number of guesses
  // processGues: pass to the end of the model. Detect the end of the game;
  var controller = {

    guesses: 0,

    processGuess: function(guess) {
      var location = parseGuess(guess);
      if (location) {
        this.guesses++;
        var hit = model.fire(location);
        if (hit && model.shipsSunk === model.numShips) {
          view.displayMessage("You sank all my battleships, in " + this.guesses + "guesses");
        }
      }

    }
};


function parseGuess(guess) {
      // an array of the valid alphabets(guess) of the rows
    // check for null and maake sure the charcters are not more than two;
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];
    
    if (guess === null || guess.length !== 2) {
      alert("oops, please enter a letter and a number on the board");
    } else {
      // grab the first characterof the guess;
      // get the number corresponding to the letter from the guess
      // write the index to the variable 'row' 
      // get the second character in the string wch represents the variable colomn;
      firstChar = guess.charAt(0);
      var row = alphabet.indexOf(firstChar);
      var column = guess.charAt(1);

      // check to see if the rows and column is not a number;
      // check if the numbers are between  0-6;
      // else return the row + column;
      if (isNaN(row) || isNaN(column)) {
        alert("oops, that isn't a number on the board");
      } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
        alert("oops thats off the board");
      } else {
        return row + column;
      }
    }
    return null;

  }

// getting a players guess using 'event handlers';
// get a reference to the fireButton using the button's id;
// then we add a click handler function named 'handleFireButton';
// code to handle a return key
function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;

  // Place the ships on the game board
  model.generateShipLocations();
}

// handleFireButton function--function to be called when the fire buton is clicked;
// get the id for the guessInput
// pass the player's guess to the 'controller'
// reset the form input element to an empty string ""
function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value.toUpperCase();
    controller.processGuess(guess);

    guessInput.value = "";
}

// to handle the return key
function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton");

  e = e || window.event;
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

window.onload = init;


