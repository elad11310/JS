'use strict';

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'Correct secretNumber';

// document.querySelector('.secretNumber').textContent = 13;
// document.querySelector('.score').textContent = 10;

// document.querySelector('.guess').value = 100;
// console.log(document.querySelector('.guess').value);

let secretNumber = Math.trunc(Math.random() * 20) + 1; // secretNumber between 1-20

let score = 20;
let highScore = 0;

function resetGame() {
  score = 20;
  document.querySelector('.score').textContent = 20;
  document.querySelector('body').style.backgroundColor = '#000';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  secretNumber = Math.trunc(Math.random() * 20) + 1; // secretNumber between 1-20
}

const displayMessage = (type, message) => {
  document.querySelector(type).textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    //if there is no secretNumber at all at the input box
    displayMessage('.message', '👺No secretNumber');
    // document.querySelector('.message').textContent = '👺No secretNumber';
    // if player wins
  } else if (guess === secretNumber) {
    document.querySelector('body').style.backgroundColor = '#60b347';
    displayMessage('.message', 'Correct Number');
    displayMessage('.number', secretNumber);
    displayMessage('.number', '30rem');
    // document.querySelector('.message').textContent = 'Correct Number';
    // document.querySelector('.number').textContent = secretNumber;
    // document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      displayMessage('.highscore', highScore);
      // document.querySelector('.highscore').textContent = highScore;
    }
    //if player is mistaken
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        '.message',
        guess > secretNumber ? 'Too high!' : 'Too low!'
      );
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? 'Too high!' : 'Too low!';
      score--;
      displayMessage('.score', score);
      //document.querySelector('.score').textContent = score;
    } else {
      displayMessage('.message', 'You lost the game!');
      displayMessage('.score', 0);
      // document.querySelector('.message').textContent = 'You lost the game!';
      // document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  resetGame();
});
