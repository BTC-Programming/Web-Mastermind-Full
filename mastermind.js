/* Class Mastermind */
// note: this is the same as non-web mastermind, except for removed globals. 
// define Main function
function main() {
	// tell player the colors
	alert("Colors include [r]ed, [c]yan, [y]ellow, [w]hite, [b]lack, [g]reen.");
	// set code = setCode(colors)
	code=setCode(colors);
	// we're going to loop as long as the answer is wrong and the player didn't want to quit, so:
	// keep looping while fourth feedback is not a "b" and first guess is not a "q"
	while (feedback[3]!="b" && guess[0]!="q")  {
		// increment turn
		turn++;
		// set guess = getGuess
		guess=getGuess(alertString);
		// set feedback = testGuess(guess)
		feedback=testGuess(code,guess);
    // store guess and feedback in thisTurn
		thisTurn=addTurn(guess,feedback);
		// push thisTurn to turnRecords
		turnRecords.push(thisTurn);
    // alert the guess and feedback for all turns (ugly display)
		//alert("Turn and Feedback "+turnRecords);
		formatTurnRecords(turnRecords,alertString);
		//alert("Guess "+turn+" : "+guess+" returns: "+feedback);
	}
	// alert "Charlie you've won" if while loop ended with first condition
	if (feedback[3]=="b") {
		alert ("Charlie, you've won!");
	}
	// alert "Quitter!" if while loop ended with section condition
	else if (guess[0]=="q"){
		alert("Quitter!");
	}
}

/* Functions */

/* Create the Secret Code */
// define function setCode to pull from six colors to randomly fill code with four values 0-5
function setCode(colors){
	for(var i=0; i<4; i++){
		code[i]=colors[Math.floor(Math.random()*6)];
	}
	console.log("secret code "+code);
	return code;
}

/* Get a Player's Guess */
// define function getGuess to prompt player for each of four values and store in guess array
function getGuess(){
	var correct="n";
	while (correct!="y"){
		var myGuess=prompt(alertString+"\n Guess "+turn+": Enter four colors surrounded by commas: ");
		var guess = myGuess.split(',');
		correct=prompt("Your guess was: "+guess+". Was this correct? y, n or c\(show colors\)");
		if (correct=="c"){
			alert("Colors include [r]ed, [c]yan, [y]ellow, [w]hite, [b]lack, [g]reen.");
		}
	}
	return guess;
}

/* Analyze the Guess */
// define function testGuess to analyze guess against code and produces feedback
function testGuess(code,guess){
	// initialize b, w, as 0;
	var b=0, w=0;
	// initialize tempCode and tempGuess arrays, as copies with array.slice(0);
	var tempCode = code.slice(0);
	var tempGuess = guess.slice(0);
	// count the blacks and erase tempcode and tempguess as you go - one loop
	for (var g=0;g<4;g++){
		if (tempGuess[g]==tempCode[g]) {
			b++;
			tempGuess[g]="";
			tempCode[g]="";
		}
	}
	// count the whites and erase tempcode and tempguess as you go - two nested loops
	for (g=0;g<4;g++){
		for (var c=0;c<4; c++){
			if (tempGuess[g]==tempCode[c] && tempGuess[g]!=""){
				w++;
				tempGuess[g]="";
				tempCode[c]="";
				// use "continue" once a match is found in the inner loop
				continue;
			}
		}
	}
	// console.log the feedback
	// console.log("Blacks = "+b+" and Whites equals "+w);
	// call the feedback function, sending it black and white counts
	var feedback=formatFeedback(b,w);
	// return the feedback
	return feedback;
}

function formatFeedback(b,w){
	var feedback=[];
	for (var i=0;i<b;i++){
		feedback[i]="b";
	}
	for (i=b;i<b+w;i++){
		feedback[i]="w";
	}
	// console.log("Feedback = "+feedback);
	return feedback;
}

/* Define function addTurn to make an array thisTurn from Guess and Feedback */
function addTurn(guess,feedback){
	// initialize thisTurn;
	var thisTurn=[];
	// set turnValues = 4 + length of feedback
	var turnValues=4+feedback.length;
	for (var i=0;i<turnValues;i++) {
		// if index 0 - 3, write guess sub index
		if (i < 4) {
			thisTurn[i]=guess[i];
		}
		// if index > 3, write feedback sub index-4 to correct for position
		if (i > 3) {
			thisTurn[i]=feedback[i-4];
		}
	} // end loop
	// console log thisTurn
	// console.log("thisTurn = "+thisTurn);
  // NOTE: Once you get thisTurn console logged, comment out ALL OTHER console.logs except the code
	// return thisTurn
	return thisTurn;
} // end function

/* Function to format turnRecords */
// Define function formatTurnRecords, with parameters turnRecords and alertString
function formatTurnRecords(turnRecords,alertString){
	// initialize thisGuess string
	var thisGuess = "";
	// initialize thisFeedback string
	var thisFeedback = "";
	// clear alertString
	//alertString="";
	// turnRecords is a 2D array. Each row is one turn. Loop over each turn.
	for (var row=0;row<turn;row++) {
		// For each row, start with “Guess”, then turn number (row + 1) plus colon “:”
		alertString = alertString.concat("Guess "+(row+1)+" : ");
		// Assign to thisGuess the first 4 values of turnRecords for this row (that turn’s guess) and join them with spaces.
		thisGuess=turnRecords[row].slice(0, 4).join(" ");
		// Add thisGuess to alertString (set it equal to itself plus thisGuess)
		alertString = alertString.concat(thisGuess);
		// Add a separator (“||”) to alertString before the feedback
		alertString = alertString.concat(" || ");
		// Pull the feedback elements from turnRecords row (based on turnRecords.length) and add to thisFeedback
		thisFeedback= turnRecords[row].slice(4, turnRecords[row].length).join();
		// Add thisFeedback to alertString
		alertString = alertString.concat(thisFeedback);
		// Add a line break to alertString
		alertString = alertString.concat("<br />\n");
		// end loop
	}
	// return alertString
	return alertString;
// end function
}
