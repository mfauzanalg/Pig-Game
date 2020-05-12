/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePLaying, diceBefore1, diceBefore2;

function init(){
    gamePLaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    diceBefore1 = 0;
    diceBefore2 = 0;
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}

init();


document.querySelector('.btn-roll').addEventListener('click', btnRoll);
function btnRoll(){
    if (gamePLaying){
        // Random number
        var dice1 = Math.floor(Math.random()*6+1);
        var dice2 = Math.floor(Math.random()*6+1);

        // Display the result
        var dice1DOM = document.querySelector('#dice-1');
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';

        var dice2DOM = document.querySelector('#dice-2');
        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + dice2 + '.png';

       
        if (diceBefore1 === 6 && dice1 === 6 && diceBefore2 === 6 && dice2 === 6){
            nextPlayer();
        } 
        else{
             // Update the round score if the roller number != 1
            if (!(dice1 === 1 || dice2 === 1)){
                // Add score
                roundScore += dice1+dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
            else{
                // Next player
                nextPlayer();
            }
            diceBefore1 = dice1;
            diceBefore2 = dice2;
        }
    }
}


document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePLaying){
        // Add Current score to global score
        scores[activePlayer] += roundScore;
    
        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    
        var input = document.querySelector('.final-score').value;

        // Undeined, 0, null "" -> falsy
        // Anything -> true
        if(input){
            var winningScore = input;
        } else{
            var winningScore = 100;
        }
        console.log(winningScore);

        // Check if player win the game
        if (scores[activePlayer] >= winningScore){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePLaying = false;
        } else{
            // Next Player
            nextPlayer();
        }
    }
});


function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);