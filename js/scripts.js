//player constructor, sets player to X or O based on random
function Player(){
  if (Math.random() < 0.5) {
    this.sign = 'X';
  } else {
    this.sign = 'O';
  }
  this.winner = false;
  //array to store spaces marked
  this.marked=[];

  this.myTurn=false;
  this.winner=false;
}

//access X or O value
Player.prototype.getSign = function(){
  return this.sign;
}

//individual space in tic-tac-toe grid
function Space(x,y){
  this.x=x;
  this.y=y;
  this.marked=false;
  this.playerMarked=null; //indidcates which player marked Space
};

//mutator: how players mark "X" or "O" on Space
Space.prototype.mark = function(player){
  
  if(player.marked.indexOf(this.loc)){
    this.marked=true;
    //set playerMarked to the player that marked Space
    this.playerMarked=player; 
    //add location value to array ***NOTE: loc is initialized in Board() Object
    player.marked.push(this.loc);
  }
  
};


//accessor: gets Player that marked Space
Space.prototype.markedBy = function(){
  return this.playerMarked.sign;
};



//holds 9 space objects, the 3x3 grid of tic-tac-toe
function Board(){
  //stores Space objects
  this.spaces = {};
  //current position of Space object in Board grid
  this.currentSpace = 0;
  this.newSpace=null;
}

//increment position based on Space added to spaces
Board.prototype.assignPosition = function(){
  if (this.currentSpace<10){
    this.currentSpace+=1;
  }
  return this.currentSpace;
}

//add Space at position loc to spaces
Board.prototype.addSpace = function(space){
  
  //**NOTE: loc is initialized HERE
  space.loc = this.assignPosition();
  this.spaces[space.loc] = space;
  console.log("gameboard filled: ");
}


//create cardinal 3x3 grid (x,y)
Board.prototype.start =  function(){
  for(let i=1; i<4; i++){
    for (let j=1; j<4; j++){

      this.newSpace = new Space(i,j); 
      this.addSpace(this.newSpace);
      
    }
   }
}

//returns Space object at specified position 
Board.prototype.findSpace = function(loc){
  if(this.spaces[loc]!==undefined){
    return this.spaces[loc];
  }
}

// Update the isWin method
Board.prototype.isWin = function (player) {
  // Define all possible winning combinations
  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  return winningCombinations.some((combination) =>
    combination.every((position) => player.marked.includes(position))
  );
};

//game logic, sets 2 players and a board
function Game(){
  this.player1 = new Player();
  this.player2 = new Player();
  this.gameBoard = new Board();

  //keeps track of whose turn it is
  this.currentTurn = 1;
  this.whoseTurn = null;
  
  this.gameOver = false;

  if(this.player1.sign === "X"){
    this.player2.sign = "O";
  }
  else if (this.player1.sign ==="O"){
    this.player2.sign="X";
  }
}

// defining a sigle turn: Player marks Space at loc
Game.prototype.turn= function(player, loc)
{ console.log(this.gameBoard.findSpace(loc).marked);
  if (!this.gameBoard.findSpace(loc).marked)
   {
     this.gameBoard.findSpace(loc).mark(player);
     this.currentTurn+=1;
   }
  
};

//ends game if either player wins
Game.prototype.setGameOver = function () {
  if (this.gameBoard.isWin(this.player1)) {
    this.gameOver = true;
    this.player1.winner = true;
  } else if (this.gameBoard.isWin(this.player2)) {
    this.gameOver = true;
    this.player2.winner = true;
  }
};

//player 1's turn when currentTurn is odd, player2 when even
Game.prototype.isTurn = function () {
  if (this.currentTurn % 2 === 1) {
    return this.player1;
  } else if (this.currentTurn % 2 === 0) {
    return this.player2;
  }
};


function processWin(game){
  const winDiv = document.getElementById("win-message");
  const player1WinMessage = "Congratulations, Player 1! You WIN!";
  const player2WinMessage = "Congratulations, Player 2! You WIN!";
  const resetBtn = document.getElementById("reset");
  if(game.player1.winner){
    winDiv.append(player1WinMessage);
    resetBtn.removeAttribute("class");
  }
  else if(game.player2.winner){
    winDiv.append(player2WinMessage);
    resetBtn.removeAttribute("class");
  }
}




function updateBoardDisplay(spaceNumber, player) {
  const spaceId = "space" + spaceNumber;
  const spaceElement = document.getElementById(spaceId);

  const mark = document.createElement("i");
  mark.setAttribute("class", player.getSign() === "X" ? "fa-solid fa-xmark" : "fa-solid fa-o");
  spaceElement.append(mark);
}


function handlePlayerInput(game, position) {
  const boardDiv = document.getElementById("board");
  const turnDiv = document.getElementById("display-turn");
  const player1Turn = "Player 1, it is your turn";
  const player2Turn = "Player 2, it is your turn";

  const currentPlayer = game.isTurn();
  game.turn(currentPlayer, position);

  if (!game.gameOver) {
    updateBoardDisplay(position, currentPlayer);
    game.setGameOver();

    if (game.gameOver) {
      processWin(game);
      boardDiv.classList.add("hidden");
    } else {
      turnDiv.innerText = currentPlayer === game.player1 ? player2Turn : player1Turn;
    }
  }
}

function startGame(){
  let currentGame = new Game();
  currentGame.gameBoard.start();
  const parent = document.querySelector('.parent');
  const boardDiv = document.getElementById("board");
  let num, spaceDiv;

  console.log(currentGame.player1.getSign());
  console.log(currentGame.player2.getSign());

  boardDiv.classList.remove("hidden");



  parent.addEventListener('click', function(event) {
    if (event.target.classList.contains('space')) {

      spaceDiv = event.target;
      num = parseInt(event.target.id.substring(5));

  
      handlePlayerInput(currentGame, num);
   }
  });
  }


window.addEventListener("load", function(){

  const start= document.getElementById("start-btn");


  start.addEventListener("click",startGame);


});