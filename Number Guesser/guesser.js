let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//Ui elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessInput = document.querySelector('#guess-input'),
  guessBtn = document.querySelector('#guess-btn'),
  message = document.querySelector('.message');

guessInput.style.borderColor = 'blue';

//assigning max and min
minNum.textContent = min;
maxNum.textContent = max;

//listen to play again events
game.addEventListener('mousedown', function(e) {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
});

//listen to events
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  if (guess === winningNum) {
    //game won

    gameOver(true, ` ${winningNum} is correct, YOU WIN!!`);
  } else {
    //game lost
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      gameOver(
        false,
        ` Game Over, you lost.The correct number was ${winningNum}!`
      );
    } else {
      guessInput.style.borderColor = 'red';
      guessBtn.style.borderColor = 'red';

      guessInput.value = '';

      setMessage(
        ` ${guess} is not correct. ${guessesLeft} guesses left`,
        'red'
      );
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');

  guessInput.disabled = true;

  guessInput.style.borderColor = color;
  guessBtn.style.borderColor = color;
  message.style.color = color;

  setMessage(msg);

  guessBtn.value = 'Play Again';
  guessBtn.className = 'btn btn-outline-info mb-2 play-again';
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
