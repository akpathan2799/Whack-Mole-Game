const startNewGame = document.querySelector('#start-button');
const holes = document.querySelectorAll('.holes');
const gameBoard = document.querySelector('.game-board');
const pauseButton = document.querySelector('#pause-button');
const gamePlayMusic = new Audio('./Assets/gameMusic.mp3') ;
const smashMusic = new Audio('./Assets/smash.mp3')
const score = document.querySelector('#currentScore');
const scoreDiv = document.querySelector('.score-timer')
const timer = document.querySelector('#curentTime');
const popUpMessage = document.querySelector('.pop-up-message');
const scoreMessage = document.querySelector('#score-message');
startNewGame.addEventListener('click', () => {

    startNewGameFunctionality();

});
pauseButton.addEventListener('click', pauseFunction);


// Adding start new game functionality

function startNewGameFunctionality() {

    if (pauseButton.innerText === 'Resume') {
        pauseButton.innerText = 'Pause';
        clearInterval(randomMoleInterval);
        randomMoleInterval = null;

        holes.forEach((hole) => {
            hole.innerHTML = '';
        })
    }

    
    gamePlayMusic.volume=0.5;
    gamePlayMusic.play();
    score.innerText = '0';
    timer.innerText = '60'
    pauseButton.style.display = 'block';
    scoreDiv.style.display = 'flex';
    startNewGame.setAttribute('disabled', '');
    startNewGame.classList.add('disabled-cursor');
    hitingPosition();
    callingRandomMoleInterval();
    timerInterval();
}

let randomMoleInterval = null;
let lastHolePosition = null;
let randomNumber = null;
let timeInterval = null;


// Generating mole in random holes;
function randomMole() {


    if (parseInt(timer.innerText) > 0) {

        holes.forEach((hole) => {
            hole.innerHTML = '';
        })


        randomNumber = Math.floor(Math.random() * 8);



        if (lastHolePosition === null || lastHolePosition !== randomNumber) {

            imageTag = document.createElement('img');

            imageTag.src = './Assets/mole.png';
            imageTag.classList.add('mole');
            holes[randomNumber].appendChild(imageTag);
        } else {
            randomMole();
        }

        lastHolePosition = randomNumber;
    } else {
        clearInterval(randomMoleInterval)
        clearInterval(timeInterval);
        messagePopUp();
    }




}

// Continusly call the  randomMole Function
function callingRandomMoleInterval() {


    randomMoleInterval = setInterval(randomMole, 800);

}

// Adding pause and resume  functionality
function pauseFunction() {
    if (pauseButton.innerText === 'Pause') {
        pauseButton.innerText = 'Resume';
        gamePlayMusic.pause();
        
        clearInterval(randomMoleInterval);
        randomMoleInterval = null;
        clearInterval(timeInterval)
        timeInterval = null;
        startNewGame.removeAttribute('disabled', '');
        startNewGame.classList.remove('disabled-cursor');

    } else if (pauseButton.innerText === 'Resume') {
        pauseButton.innerText = 'Pause';
        randomMoleInterval = null;
        gamePlayMusic.play();
        randomMole();
        startNewGame.setAttribute('disabled', '');
        startNewGame.classList.add('disabled-cursor');
        callingRandomMoleInterval();
    }
}




// Adding hit functionality 

function hitingPosition() {
    holes.forEach((hole) => {
        hole.addEventListener('mousedown', () => {
           
            if (parseInt(hole.id) === randomNumber && pauseButton.innerText === 'Pause') {
                smashMusic.play();
                hole.children[0].src = './Assets/mole-whacked.png'
                score.innerText = parseInt(score.innerText) + 10;
            }
            
        })
    })


}


// Adding timer function
function timerFunctionality() {
    timer.innerText = parseInt(timer.innerText) - 1;
}

// timerinterval;
function timerInterval() {
    timeInterval = setInterval(timerFunctionality, 1000);
}

// message pop up functionality
function messagePopUp() {

    popUpMessage.style.display = 'flex';
    gamePlayMusic.pause()
    scoreMessage.innerText = score.innerText;
    document.querySelector('.back-to-home').addEventListener('click', () => {
        pauseButton.style.display = 'none';
        scoreDiv.style.display = 'none'
        let randomMoleInterval = null;
        let lastHolePosition = null;
        startNewGame.removeAttribute('disabled', '');
        startNewGame.classList.remove('disabled-cursor');
        let randomNumber = null;
        let timeInterval = null;
        popUpMessage.style.display = 'none';
        holes.forEach((hole) => {
            hole.innerHTML = '';
        })
    });

}

// custom hammer functionality


    
