// Defining Variables
let min = 1,
    max = 10,
    chancesLeft = 3,
    winningScore = Math.floor(Math.random()*(max-min+1) + min);


// Creating UI Variables
const card = document.getElementById('card'),
      minNum = document.getElementById('min-num'),
      maxNum = document.getElementById('max-num'),
      input = document.getElementById('input'),
      submit = document.getElementById('submit'),
      message = document.querySelector('.message');


// Assigning Values
minNum.textContent = min;
maxNum.textContent = max;






// Event Listener for restart
card.addEventListener('mousedown', function(e) {

  // check the target element is restart only
  if(e.target.className === 'submit restart') {
    // reload the page
    window.location.reload();
  }
});







// Event Listener for checking
submit.addEventListener('click', function(e) {


// store the entered string 
let guess = parseInt((input.value));

// #############################################

// check if it is valid
if(guess >= min && guess <= max) {

// *******************************

  if(guess === winningScore) {

  // GAME OVER - WON 
  gameOver(true, `Congrats! ${winningScore} is the correct number, YOU WIN :)`);

  } else {
    
    // reducing chances left
    chancesLeft -= 1 ;

    if(chancesLeft === 0) {
      // GAME OVER - LOST
      gameOver(false, `Game Over! The correct number was ${winningScore}, YOU LOSE :/`)
    } else {
      // WRONG GUESS
      input.value = '';
      setMessage(`OOPS! ${guess} is not correct, ${chancesLeft} guess left.`, 'red');
    }

  }

// *******************************

} else {

  setMessage(`Please enter a number between ${min} and ${max}!`, 'red')

}

// #############################################

e.preventDefault();

});






// SET MESSAGE FUNCTION

function setMessage(msg, color) {

// 1 - put the msg
message.textContent = msg;

// 2 - msg color
message.style.color = color;

// 3 -set margin
message.style.marginTop = '2rem';

}





// GAME OVER FUNCTION

function gameOver(won, msg) {

  let color;
// 1 - assign color based on result
  won === true ? color = 'green' : color = 'red';

// 2 - change border color
input.style.borderColor = color;

// 3 - show msg accordingly
setMessage(msg, color);

// 4 - disable input field
input.disabled = 'true';

// 5 - change submit btn
submit.value = 'Restart';

// 6 - assign a new class for game
submit.className += ' restart';

}