let countDownEl = document.querySelector('.countdown');

let numberOfWins = document.querySelector('.wins');

let numberOfLosses = document.querySelector('.losses');

 let startButton = document.
 querySelector('.start');

let container = document.querySelector('.container');

let questions = document.querySelector('.questions');

let choice = document.querySelector('.choices');

let scoreAlert = document.querySelector('.score-display');

let scoreText = document.querySelector('.score-div')

let viewScore = document.querySelector('.scores')

let timeLaps = 60;

let answerCount = 0;

let timer;

let youWin = 0;

let youLose = 0;

let storageArray = JSON.parse(window.localStorage.getItem('nameAndScore'));

 user = prompt ('Before you start, enter your name here to save your game score. Ready! Set! Go!');

function show(){
   
    countDownEl.style.visibility= 'visible';
     setTimeout('hide()', 500);
 }

 function hide() {
   
    countDownEl.style.visibility = 'hidden';
    setTimeout('show()', 500);
}

function gameOn() {
    
    timeLaps = 60;

    startTime()
    startQandA()
}

 function startTime(){   
   
    timer = setInterval(function() {

        timeLaps--;
        countDownEl.textContent = timeLaps;

         if (timeLaps <= 0 || answerCount === quiz.length) {
             clearInterval(timer);
        }

        if (timeLaps <= 15){
            countDownEl.style.color = 'red';
            show();
            
        }

        if (timeLaps <= -1){
            countDownEl.textContent = 0;
            clearInterval(timer);
        }

    },1000);

}

function startQandA() {
 
    if (answerCount < quiz.length) {
            questions.innerHTML = quiz[answerCount].question;
             choice.textContent = '';
            
    
        for ( let i = 0; i < quiz[answerCount].choices.length; i++){

          let select = document.createElement('button'); 
          select.innerText = quiz[answerCount].choices[i];
          select.setAttribute('data-id', i);
          select.addEventListener('click', function(event) {
              event.stopPropagation();
             
           if (select.innerText === quiz[answerCount].answer) {
               youWin ++;
            
            } else {
                youLose ++;
                 timeLaps = 
                 timeLaps - 10;
                 
         }
            
            if (answerCount === quiz.length) {
              return;

            } else {
           
                answerCount++;
                startQandA();
                saveWin();
                saveLoss();
                saveGame();
                
         }        
         
    });
         choice.append(select);
            
        }
    }  
}


function saveGame() {

    if (answerCount === quiz.length) {
  choice.textContent = '';
  questions.textContent = '';
    
   scoreAlert.innerHTML =`You got ${youWin} correct, and ${youLose} inccorect.`;

  }
   
};
 

function saveWin() {
                        
   numberOfWins.textContent = youWin;     
   localStorage.setItem('totalWins', youWin);
    
}
                        
function saveLoss() {

    numberOfLosses.textContent = youLose;     
    localStorage.setItem('totalLosses', youLose);
        console.log('hello')
        
}

 
function renderWins() {
                                
    let saveScore = localStorage.getItem('totalWins');

    if (saveScore === 0) {
        youWin = 0;

    }else {
        youWin = saveScore;
    }
       numberOfWins.textContent = youWin;
}                               
                             

function renderLosses() {
                                            
   let loseGame = localStorage.getItem('totalLosses');
                
   if (loseGame === 0) {
        youLose = 0;

        } else {
            youLose = loseGame;
        }
         numberOfLosses.textContent = youLose;
        
    }
    viewScore.addEventListener('click', function(event){
     event.preventDefault();

    
    let nameAndScore = {
        name: user,
        score: youWin,
    };
    
    localStorage.setItem("nameAndScore", JSON.stringify(nameAndScore));
    
    postWins();
    
});


    

function postWins() {

choice.textContent = '';
questions.textContent = '';
scoreAlert.textContent = '';

let storageArray = JSON.parse(window.localStorage.getItem('nameAndScore'));

    if (storageArray !== null){
        scoreText.textContent = storageArray.name + ' ' + storageArray.score + ' ' + 'Correct Answers'
    } 

    if (user === null){
        scoreText.textContent = '';
    }

}
   
startButton.addEventListener('click', gameOn);

