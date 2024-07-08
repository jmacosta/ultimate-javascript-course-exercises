'use strict';

const scoreP0 = document.getElementById('score--0');
const scoreP1 = document.getElementById('score--1');
const currentScoreP0 = document.getElementById('current--0');
const currentScoreP1 = document.getElementById('current--1');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const dice = document.querySelector('.dice');
const players = document.querySelectorAll('section');
const scores = {
  scoreP0,
  scoreP1,
  currentScoreP0,
  currentScoreP1,
};
let hasWinner = false;
let activePlayer;
let diceScore;

//* functions *//

const initialize = () => {
  scoreP0.textContent = 0;
  scoreP1.textContent = 0;
  currentScoreP0.textContent = 0;
  currentScoreP1.textContent = 0;
  players[0].classList.contains('player--winner')
    ? players[0].classList.remove('player--winner')
    : players[1].classList.remove('player--winner');
  if (!players[0].classList.contains('player--active')) {
    changeActivePlayer(0);
  }
  hasWinner = false;
  return 0;
};

const changeActivePlayer = player => {
  let numberPlayer;
  player === 0 ? (numberPlayer = 1) : (numberPlayer = 0);
  players[player].classList.remove('player--active');
  players[numberPlayer].classList.add('player--active');
  return numberPlayer;
};

const saveCurrentScore = player => {
  scores[`scoreP${player}`].textContent =
    Number(scores[`scoreP${player}`].textContent) +
    Number(scores[`currentScoreP${player}`].textContent);
  scores[`currentScoreP${player}`].textContent = 0;
};

const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const checkWinner = player => {
  if (Number(scores[`scoreP${player}`].textContent) >= 100) {
    players[player].classList.add('player--winner');
    return true;
  }
  return false;
};

//* Handlers *//

const handlerNewGame = () => {
  activePlayer = initialize();
};
const handlerHold = () => {
  if (!hasWinner) {
    saveCurrentScore(activePlayer);
    activePlayer = changeActivePlayer(activePlayer);
    hasWinner = checkWinner(activePlayer);
  }
};
const handlerRoll = () => {
  if (!hasWinner) {
    diceScore = rollDice();
    dice.src = `dice-${diceScore}.png`;
    if (diceScore === 1) {
      scores[`currentScoreP${activePlayer}`].textContent = 0;
      activePlayer = changeActivePlayer(activePlayer);
      return;
    }
    scores[`currentScoreP${activePlayer}`].textContent =
      Number(scores[`currentScoreP${activePlayer}`].textContent) + diceScore;
  }
};

//* Listeners *//
btnNewGame.addEventListener('click', handlerNewGame);

btnHold.addEventListener('click', handlerHold);
btnRoll.addEventListener('click', handlerRoll);
activePlayer = initialize();
