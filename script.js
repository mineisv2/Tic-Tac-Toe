var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();

myCanvas.width = width = 300;
myCanvas.height = height = 300;

var numSide = 3;

var blockSides = width/numSide;

var player = "player1";

var moves = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

var moveCt = 0;


//This function gets the position of where the players click and puts the move onto the board by moddifying the moves array and calling the drawMoves function
function getClickPosition(e) {
    var xPosition = e.clientX;
    var yPosition = e.clientY;

		var horiz = Math.floor(xPosition/blockSides);

		var vert = Math.floor(yPosition/blockSides);
		if(player == "player1" && moves[horiz][vert] == 0){
			moveCt ++;
			moves[horiz][vert] = 1;
			player = "player2"
		}else if (moves[horiz][vert] == 0){
			moveCt ++;
			moves[horiz][vert] = 2;
			player = "player1"
		}
		drawMoves();
		score();
		console.log(moveCt);
}

//This function takes the information from the moves array to draw the players moves on the game board
function drawMoves(){
	for(var i = 0; i < moves.length; i++){
		for(var j = 0; j < moves[i].length; j++){
			if(moves[i][j] == 1){
				var X = document.getElementById("X");
	  		ctx.drawImage(X, blockSides*i+5, blockSides*j+5, blockSides-10, blockSides-10);
			}else if(moves[i][j] == 2){
				var O = document.getElementById("O");
	  		ctx.drawImage(O, blockSides*i+5, blockSides*j+5, blockSides-10, blockSides-10);
			}
		}
	}
}

//This function draws the 9 cubes for the game board
function drawBoard(){
	for(var i = 0; i < numSide; i++){
		for(var j = 0; j < numSide; j++){
			ctx.rect(blockSides*j, blockSides*i, blockSides, blockSides);
			ctx.stroke();
		}
	}
}

//This funciton keeps track of if a player wins the game. it checks every possible way that you can wins the game.
function score(){
	drawMoves();
	if(player == "player1"){
		var checker = 2;
	}else{
		var checker = 1;
	}
	console.log(moves);
	console.log("checker ", checker);
	if(moves[0][0] == checker && moves[1][0] == checker && moves[2][0] == checker){
		endGame();
	}else if(moves[0][1] == checker && moves[1][1] == checker && moves[2][1] == checker){
		endGame();
	}else if(moves[0][2] == checker && moves[1][2] == checker && moves[2][2] == checker){
		endGame();
	}else if(moves[0][0] == checker && moves[0][1] == checker && moves[0][2] == checker){
		endGame();
	}else if(moves[1][0] == checker && moves[1][1] == checker && moves[1][2] == checker){
		endGame();
	}else if(moves[2][0] == checker && moves[2][1] == checker && moves[2][2] == checker){
		endGame();
	}else if(moves[0][0] == checker && moves[1][1] == checker && moves[2][2] == checker){
		endGame();
	}else if(moves[0][2] == checker && moves[1][1] == checker && moves[2][0] == checker){
		endGame();
	}else if(moveCt == 9){
		var keepPlaying = confirm("Nobody won :( \nWould you like to play again?");
		if(keepPlaying){
			reset();
		}
	}
}

//This function will reset the game board and prepart for a new game
function reset(){
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
	moves = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
	moveCt = 0;
	drawBoard();
}

//This funciton finds who the winner was(x or o) then it checks if the player wants to play again
function endGame(){
	if(player == "player2"){
		var winner = "X";
	}else{
		var winner = "O";
	}
	var keepPlaying = confirm(winner + " WON! \nWould you like to play again?");
	if(keepPlaying){
		reset();
	}
}

//////Program\\\\\\
addEventListener("click", getClickPosition, false);

game();

function game(){
	drawBoard();
	drawMoves();
}
