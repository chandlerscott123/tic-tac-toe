
The tic-tac-toe position grid:

1 | 2 | 3 
___________
4 | 5 | 6
__________
7 | 8 | 9


Describe: isWin();
Test: should return true for player1 with minimum moves
Code:

Const newGame = new Board();
Const player1 = new Player(“X”);
Const player2= new Player(“O”);
newGame.find(1).mark(player1);
newGame.find(2).mark(player1);
newGame.find(3).mark(player1);
Expected Output: isWin(player1) returns true;

Test: should return true for player2 with minimum moves
Code:
Const newGame = new Board();
Const player1 = new Player(“X”);
Const player2= new Player(“O”);
newGame.find(1).mark(player2);
newGame.find(2).mark(player2);
newGame.find(3).mark(player2);
Expected Output: isWin(player2) returns true;


Test: should return false for player1 with incomplete game
Code:

Const newGame = new Board();
Const player1 = new Player(“X”);
Const player2= new Player(“O”);
newGame.find(1).mark(player1);
newGame.find(2).mark(player2);
newGame.find(3).mark(player1);
Expected Output: isWin(player1) returns false;

