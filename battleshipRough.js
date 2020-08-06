


var view = {

    displayMessage: function(msg) {
        messageArea = document.getElementById('messageArea');
        messageArea.innerHTML = msg;
    },
    displayShipHits: function(location) {
        cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    },
    displayShipMiss: function(location) {
        cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
    }

}
var model = {

    boardSize: 7,
    numShip: 3,
    shipLen: 3,
    shipSunk: 0,

    ships:  [ {locations: [0,0,0], hits: ["","",""] },
              {locations: [0,0,0], hits: ["","",""] },
              {locations: [0,0,0], hits: ["","",""] } ],

    fire: function(guess) {
        for(var i = 0; i < this.numShip; i++) {
            var ship = this.ships[i];
            var locations = ship.locations;
            var index = locations.indexOf(guess);

            if (index >= 0) {
                ship.hits[index] = 'hit';
                view.displayMessage('HIT');
                view.displayShipHits(guess);

                if (isSunk(ship)) {
                    this.shipSunk++;
                    view.displayMessage('You sank all my battle ship');
                }
                return true;
            }
        }
        view.displayShipMiss(guess);
        view.displayMessage('You Missed')
        return false;
    },

    isSunk: function(ship) {
        for (var i = 0; i < ship.length; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    },

    generateShipLocations: function() {
        var locations = generateShip();
        
    },

    generateShip: function() {
        var direction = Math.floor(Math.random() * 2);
        var row, col;
        if (direction == 1) {
            row = Math.floor(Math.random() * boardSize);
            col = Math.floor(Math.random() * (boardSize-shipLen));
        } else {
            row = Math.floor(Math.random() * (boardSize - shipLen));
            col = Math.floor(Math.random() * boardSize);
        }
        
        newShipLocations = [];
        for (var i = 0; i < boardSize; i++) {
            if (direction === 1) {
                newShipLocations.push(row + '' + (col + i));
            } else {
                newShipLocations.push((row + i) + '' + col);
            }
        }
        return newShipLocations;
    }


}
