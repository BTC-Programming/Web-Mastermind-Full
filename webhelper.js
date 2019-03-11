window.onload = start;

var turn=0;
var colors=[], code=[], guess=[], feedback=[];
colors = ["r","b","g","w","c","y"];
var thisTurn = [], turnRecords = [];

function start() {
	setup();
}

function setup() {
	var board = document.getElementById("board");
	board.removeChild(board.childNodes[0]);
	var title = document.getElementById("title");
	title.innerHTML = "Mastermind!";
	boardReset("Here are instructions.");
	var buttonElement = document.getElementById("submit-guess");
	buttonElement.innerHTML = "Start Game";
	buttonElement.onclick = function () {
		code=startGame();
	}
}

function startGame() {
	code=setCode(colors);
	var buttonElement = document.getElementById("submit-guess");
	board.removeChild(board.childNodes[1]);
	boardReset("Code Is Set up!<br /><br />\nPick your four choices for your first guess.");
	buttonElement.innerHTML = "Submit Guess";
	for (i=0;i<4;i++) {
		g=document.getElementById(i);
		guess[i]=g.options[g.selectedIndex].value;
	}
	buttonElement.onclick = function () {
		newGetGuess(code);
	}
	return code;
}

function newGetGuess(code) {
	var guess =[];
	var g = 0;
	turn++;
	if (turn > 6){
		document.getElementById("board").style.height = 320+(20*turn);
	}
	for (i=0;i<4;i++) {
		g=document.getElementById(i);
		guess[i]=g.options[g.selectedIndex].value;
	}
  masterMain(code,guess,turn);
}

function masterMain(code,guess,turn){
  var board = document.getElementById("board");
  board.removeChild(board.lastChild);
	var node = document.createElement('ul');
	board.appendChild(node).setAttribute("id","turns");
	feedback = testGuess(code,guess);
	thisTurn = addTurn(guess,feedback);
	turnRecords.push(thisTurn);
	if(feedback[3]=="b"){
	  boardReset("You won in "+turn+" turns!");
		board.style.backgroundImage="url('https://media.giphy.com/media/13vfiD0VBeksYE/giphy.gif')";
		newGame();
	}
	else if(guess[0]=="q"){
	  boardReset("Quitter! Play again?");
		board.style.backgroundColor = "red";
		board.style.color = "white";
		newGame();
	}
	else{
	  newFormatTurnRecords(turnRecords,turn);
	}
}

function boardReset(message){
  var board = document.getElementById("board");
  board.removeChild(board.childNodes[2]);
  var messageArea = document.createElement("p");
  messageArea.innerHTML=message;
  board.appendChild(messageArea);
}

function newGame(){
	var buttonElement = document.getElementById("submit-guess");
	buttonElement.innerHTML="Play Again";
	buttonElement.onclick = function () {
		document.location.reload();
	}
}

function newFormatTurnRecords(turnRecords,turn){
	var thisGuess = "";
	var thisFeedback = "";
	var board=document.getElementById("board");
	for (var row=0;row<turn;row++) {
	    var turnList = document.getElementById("turns");
	    var node = document.createElement("li");
	    turnList.appendChild(node);
	    var newTurn = document.getElementById("turns").lastChild;
	    var ulNode = document.createElement("ul");
	    newTurn.appendChild(ulNode).setAttribute("class", "turn");
	    for (var peg=0;peg<turnRecords[row].length;peg++){
	      var newList = document.getElementsByClassName("turn");
	      var liNode = document.createElement("li");
	      newList[row].appendChild(liNode).setAttribute("class", turnRecords[row][peg]);
	  }
	}
}
