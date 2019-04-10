/*
Game Function:
- Player must guess a number betwen a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/


//Game value
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Element
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector("#guess-input"),
    message = document.querySelector('.message');


// Assign UI min and max          
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener;
game.addEventListener('mousedown', function(e){
    if(e.target.className === "play-again"){
        window.location.reload();
    }
})


// Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value)
    //    console.log(guess)
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //Check if won
    if (guess === winningNum) {
        // Game over true
        gameOver(true, `${winningNum} is correct, YOU WIN ! `)
      
        
    } else {
        //Wrong Number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            //Game over - lost;
          gameOver(false, ` Game Over, you lost. The correct number was ${winningNum }`)
        } else {

            //Chenge border color
            guessInput.style.borderColor = "red" ;

            //Clear the Input 
            guessInput.value = '';
            

            //Tell user its the wrong number
          setMessage(`${guess} is not correct, ${guessesLeft} guesses left `, 'red') 
        }
    }
})

// Game Over 
function gameOver(won, msg){

let color;
won === true ? color ='green' : color = 'red';

    //Disable Input
    guessInput.disabled = true;
    //Game over - won
    guessInput.style.borderColor = color;
    //Set Text Color
    message.style.color = color; 
    // Set message 
    setMessage(msg)

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
    
}


//Get Winning Num
function getRandomNum(min, max){
    // Math.floor(Math.random())
  return  Math.floor(Math.random()*(max-min+1)+min);

}


//Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}