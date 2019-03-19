/* Mr. M */
var games=0;
var turns=0;
var average=0;

function newGame(turn){
  board.className = "";
  games++;
  turns+=turn;  
  average=turns/games;  
  message=("Your average over "+games+" games is "+average+" turns. See if you can get that lower. Good luck!");
  boardReset(message);
  buttonElement.setAttribute("onclick","startGame()");
}
