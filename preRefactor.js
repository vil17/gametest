// Classes

// Player class
class Player {
    constructor(symbol) {
        this.symbol = symbol;
    }
    // Swap between players
    changePlayer() {
        console.log('Swapping player');
        if (counter === 0) {
            counter = 1;
            totalMoves++;
            console.log("Total moves made: " + totalMoves);
            console.log(game.board);
        }
        else {
            counter = 0;
            totalMoves++;
            console.log("Total moves made: " + totalMoves);
            console.log(game.board);
        }
    }
}

// Square class
class Square {
    constructor(box) {
        this.box = '';
    }
    // Function to mark squares inside table
    markBox() {
        if(counter === 0) {
            return this.box = 'X';
        }
        if(counter === 1) {
            return this.box = 'O';
        }
    }
}

// Board class
class Board {
    constructor(grid) {
        this.grid = [
            [new Square(), new Square(), new Square()],
            [new Square(), new Square(), new Square()],
            [new Square(), new Square(), new Square()]
        ];
    }

    checkWinner() {
        // Game status check 
        if (game.gameStatus === true) {
            // Horizontal check 
            for (var i = 0; i < 3; i++) {
                if (this.grid[i][0].box === this.grid[i][1].box &&
                    this.grid[i][0].box === this.grid[i][2].box &&
                    this.grid[i][0].box != '') {
                    gameOver();
                    printWinner();
                }
            }
            // Vertical check 
            for (var j = 0; j < 3; j++) {
                if (this.grid[0][j].box === this.grid[1][j].box &&
                    this.grid[0][j].box === this.grid[2][j].box &&
                    this.grid[0][j].box != '') {
                    gameOver();
                    printWinner(); 
                }
            }
            // KRISSKROSS
            if (this.grid[0][0].box == this.grid[1][1].box &&
                this.grid[0][0].box == this.grid[2][2].box &&
                this.grid[0][0].box != "" ||
                this.grid[0][2].box == this.grid[1][1].box &&
                this.grid[0][2].box == this.grid[2][0].box &&
                this.grid[0][2].box != "") {
                gameOver();
                printWinner();
            }
            // Draw
            else if(totalMoves === 9) {
                gameOver(); 
                alert("Draw!");
            }
        }
    }
}
// Game class
class Game {
    constructor() {
        console.log("Creating game");
        this.gameStatus = true;
        this.board = new Board();
        this.players = [
            new Player('X'),
            new Player('O')
        ];
        console.log(board);
    }
}

// main.js

var game = new Game();
var counter = 0;
var totalMoves = 1;

// Player scores
var playerX = 0; 
var playerO = 0; 

// Implement in Game class
function playGame() {
    let squares = document.getElementsByClassName('box');
    console.log(squares); // TEST
    // On click, activate function markPlayer
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', (event) => {
            // If the box is empty 
            if(event.target.innerHTML === '' && game.gameStatus === true) {
                event.target.innerHTML = game.players[counter].symbol;
                var squareID = (event.target.id.split(''));  
                console.log(squareID); // TEST
                var row = parseInt(squareID[0]);
                var col = parseInt(squareID[1]);
                // Pass row/col through grid to mark X
                game.board.grid[row][col].markBox();
                // Check winner
                game.board.checkWinner();
                // Change player
                game.players[counter].changePlayer();
            }
            // Box is taken
            else {
                console.log('Box is taken');
            }
        });
    }
}

// Implement in Game class
function gameOver() {
    game.gameStatus = false; 
    document.getElementsByClassName('box').disabled;  
}

// Print winner and increase player score
function printWinner() {
    alert(game.players[counter].symbol + ' is winner!');
    if(counter === 0) {
        playerX++; 
    }
    else {
        playerO++;
    }
}

// Implement in Game class
function resetBoard() {
    let reset = document.getElementById('reset-button');
    reset.addEventListener('click', () => {
        for(var i = 0; i < 9; i++) {
            document.querySelectorAll('.box')[i].innerHTML = '';
        }
        // Reset main variables
        counter = 0; 
        totalMoves = 1; 
        game = new Game(); 
        playGame(); 
    });
}

playGame();
resetBoard(); 

// Extra stuff 
// Player scores
// Scoreboard (database)