var model = {

    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    
    // the sze of the ship array and the locatins and hit arrays.
    ships: [{locations: ["10", "20", "30"], hits: ["", "", ""] }, {locations: ["32", "33", "34"], hits: ["", "", ""] }, {locations: ["10", "11", "12"] }],
  
    // we are using the guess parameter to control the output of the fire method
    // so we need the index of the guess string in the location array;
    // we iterate through the ships array fires
    // then we access the location of the ships by assigning it a variable 'ship'
    // we also access the locations array by using the 'ship.locations'
    fire: function(guess) {
  
      // iterate through the array to examine one ship at a time
      for (var i = 0; i < this.ships[i]; i++) {
        
        var ship = this.ships[i];
        location = ships.locations;
        
        // indexOf takes a value and returns the index of that value in an array
        // it returns -1 if it can find the value;
        var index = location.indexOf(guess);
        if (index >= 0) {
          // we have a hit
          ship.hits[index] = "hit";
          // increase the number of ships sunk in the model after a ship has been sunk
          if (this.isSunk(ship)) {
            this.shipsSunk++
          }
          return true;
        }
      }
      return false;
    },
  
  
  // we can also chaining to shorten some reference;
  // example, we 
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
        alert("oops, that isn't on the board");
      } else if (row < 0 || row >= model.boardSize || 
                column < 0 || column >= model.boardSize) {
        alert("oops thats off the board");
      } else {
        return row + column;
      }
    }
    return null;

  }

