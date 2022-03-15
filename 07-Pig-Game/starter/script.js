'use strict';

const randomDice = () => {
  if (inGame) {
    //generate random number between 1-6.
    let randomDice = Math.trunc(Math.random() * 6) + 1;
    //changing the image source
    diceEl.src = `dice-${randomDice}.png`;
    //display dice.
    diceEl.classList.remove('hidden');

    if (randomDice !== 1) {
      //Add the dice to the current player score
      currentScore += randomDice;

      // adding the score to the current's player.
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //to reset current player score and switch player
      switchPlayer();
    }
  }
};

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  //switching between active player.
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle checks if the class exists in the element and if so delete it , otherwise add it.(style switching)
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const holdTheDice = () => {
  if (inGame) {
    //updating the current player total score
    scores[activePlayer] += currentScore;
    //disapling it on the screen
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if current player wins
    if (scores[activePlayer] >= 50) {
      inGame = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
};

const newGame = () => {
  inGame = true;
  currentScore = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  scores[activePlayer] = 0;
  scores[!activePlayer] = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;
};
// storing the players totals scores that keep accumalting.
const scores = [0, 0];

let currentScore = 0;

//boolean varaible to indicat if we are in game or not.
let inGame = true;

//determine which player's turn
let activePlayer = 0;

const current0El = document.getElementById('current--0');

const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');

const player1El = document.querySelector('.player--1');

//Selecting elements
const score0El = document.querySelector('#score--0');

// another way to get to an id element.
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');

// because only the reference to this dom element is const we can still change it's inner values.
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//selecting the "Roll dice" button.
const btnRoll = document.querySelector('.btn--roll');

btnRoll.addEventListener('click', randomDice);
//selecting the "New Game" button.
const btnNew = document.querySelector('.btn--new');

//selecting the "Hold" button.
const btnHold = document.querySelector('.btn--hold');
btnHold.addEventListener('click', holdTheDice);

btnNew.addEventListener('click', newGame);
