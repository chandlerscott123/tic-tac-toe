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
  this.marked=true;
  //set playerMarked to the player that marked Space
  this.playerMarked=player; 
  //add location value to array ***NOTE: loc is initialized in Board() Object
  player.marked.push(this.loc); 
  
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

//determines if a player has won the game
Board.prototype.isWin =  function(player){

  let playerArr = player.marked;
  let current=1;
  let max=1;

  //sort player.marked in ascending order
  playerArr.sort(function(a, b) {
    return a - b;
  });

  //check arr for 3 consecutive position values 
  for (let i=0; i<playerArr.length; i++){

    if(playerArr[i]===playerArr[i+1]+1){
      current++;
    }
    else{
      current = 1;
    }

    if(current>max){
      max =  current;
    }
    
    if(max==3){
      break;
    }


    //def 3 consecutive diagonal position values 
    if(playerArr.includes(1)&& playerArr.slice(playerArr.indexOf(1)).includes(5)&&playerArr.slice(playerArr.indexOf(5)).includes(9))
    {
      max=3;
      break;
    }
    else if(playerArr.includes(3)&& playerArr.slice(playerArr.indexOf(3)).includes(5)&&playerArr.slice(playerArr.indexOf(5)).includes(7))
    {
      max=3;
      break;
    }
  }

  if(max===3){
    return true;
  }
  else{
    return false;
  }
  
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
}

// defining a sigle turn: Player marks Space at loc
Game.prototype.turn= function(player, loc)
{
  if (!this.gameBoard.spaces[loc].marked)
  {
    this.gameBoard.spaces[loc].mark(player);
    this.currentTurn+=1;
  }
  
};

//ends game if either player wins
Game.prototype.setGameOver = function(){
  if(this.gameBoard.isWin(this.player1)||this.gameBoard.isWin(this.player2)){
    this.gameOver = true;
    if(this.gameBoard.isWin(this.player1)){
      this.player1.winner=true;
    }
    else if (this.gameBoard.isWin(this.player2)){
      this.player2.winner = true;
    }

  }
}

//player 1 will play when current turn is odd, player2 when even
Game.prototype.isTurn =  function(){
  if(this.currentTurn%2===1){
    this.whoseTurn = this.player1;
  }
  else if(this.currentTurn%2===0){
    this.whoseTurn = this.player2;
  }
}


// window.addEventListener("load", function(){



// });