'use strict';
const randomNumber = () => {
  return Math.round(Math.random() * 19) + 1;
};

let score = 20,
  highScore = 0,
  numberToGuess = randomNumber(),
  isGuessed = false;

function initializeGame() {
  isGuessed = false;
  score = 20;
  numberToGuess = randomNumber();
  document.querySelector('.guess').value = '';
  document.querySelector('.message').textContent = ' Start Guessing... ';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').readOnly = false;
}

const checkNumber = guess => {
  return guess === numberToGuess;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = " 🚫 It's not a number ";
  } else if (!isGuessed) {
    document.querySelector('.message').textContent = ' Start Guessing... ';
    isGuessed = checkNumber(guess);
    if (!isGuessed && score > 0) {
      console.log(`el guessed es ${isGuessed}`);
      score--;
      document.querySelector('.message').textContent = `${
        guess < numberToGuess ? '📉 too low' : '📈 Too high'
      }`;
      document.querySelector('.score').textContent = score;
    }
    if (!isGuessed && score === 0) {
      document.querySelector('.message').textContent = `💥 You lost the game`;
    }
    if (isGuessed) {
      console.log(`el guessed es ${isGuessed}`);
      highScore < score ? (highScore = score) : highScore;
      document.querySelector('.message').textContent = `🎉 Correct Number!`;
      document.querySelector('.highscore').textContent = highScore;
      document.querySelector('.number').textContent = guess;
      document.querySelector('.number').style.width = '30rem';
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.guess').readOnly = true;
    }
  }
});

document.querySelector('.again').addEventListener('click', initializeGame);
