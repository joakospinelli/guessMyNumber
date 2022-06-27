'use strict';

const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const guessInput = document.querySelector('.guess');
const scoreboard = document.querySelector('.score');
const highscoreBoard = document.querySelector('.highscore');
const message = document.querySelector('.message');
const number = document.querySelector('.number');

let randomNumber = generateRandomNumber();
let score = 20;
let highscore;

function generateRandomNumber(){
    return Math.floor(Math.random() * 20) + 1;
}

function setMessage(msg){
    message.textContent = msg;
}

window.addEventListener('DOMContentLoaded', function(){
    // Le agregué al proyecto que guarde el Highscore en Local Storage para mantenerlo incluso al recargar página
    if (this.localStorage.getItem('highscore')){
        highscore = localStorage.getItem('highscore');
        highscoreBoard.textContent = highscore;
    } else hscore = 0;
});

checkButton.addEventListener('click', function(){

    const guess = Number(guessInput.value);
    if (!guess){
        setMessage('Write a number!');
    } else {

        if (guess === randomNumber){
            setMessage("Correct number!");
            document.querySelector('body').style.backgroundColor = '#60b347';
            number.textContent = randomNumber;
            number.style.width = '30rem';

            if (score > highscore) {
                highscore = score;
                highscoreBoard.textContent = highscore;
                localStorage.setItem('highscore',highscore);
            }
        } else {
            if (score > 1){
                score--;
                setMessage(guessInput.value > randomNumber ? "Too high!" : "Too low!");
            } else {
                setMessage("You lost...");
                score = 0;
                checkButton.disabled = true;
            }
            scoreboard.textContent = score;
        }
    }
});

againButton.addEventListener('click', function(){
    score = 20;
    randomNumber = generateRandomNumber();

    document.querySelector('body').style.backgroundColor = '#222';
    number.style.width = '15rem';
    number.textContent = '?';
    guessInput.value = '';

    checkButton.disabled = false;
    scoreboard.textContent = score;
    setMessage('Start guessing...');
});