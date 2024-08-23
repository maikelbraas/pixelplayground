let rows = document.getElementsByClassName('row');
let input = document.getElementById('answer');
let orange = [];
let woord = localStorage.getItem('randomWoord');
let answers = [];
let greens = [];
let row;
let end = false;
let save = localStorage.getItem('saved');
let used = document.getElementById('keys');
let score = 1000;
input.addEventListener('keypress', (event) => {
    if(event.key == "Enter" && !end){
        // console.log(checkInput(input.value));
        if(input.value.length == 5 && localStorage.getItem('answerCount') < 6 && checkInput(input.value)){
            row = rows[localStorage.getItem('answerCount')];
            for(let i = 0; i < row.children.length; i++){
                usedLetters(input.value[i]);
                if(woord[i] == input.value[i] && !greens.includes(input.value[i])){
                    greens.push(input.value[i]);
                    orange.splice(orange.indexOf(input.value[i]), 1);
                    score += 100;
                }
                if(woord.includes(input.value[i]) && !orange.includes(input.value[i]) && !greens.includes(input.value[i])){
                    orange.push(input.value[i]);
                    score += 50;
                }
                if(!woord.includes(input.value[i])){
                    score -= 10;
                }
                row.children[i].classList.add('addShow');
                row.children[i].innerHTML = input.value[i];
            }
            localStorage.setItem('answerCount', parseInt(localStorage.getItem('answerCount'))+1);
            answers.push(input.value);
            localStorage.setItem('answersGiven', JSON.stringify(answers));
            localStorage.setItem('orange', [JSON.stringify(orange)]);
            localStorage.setItem('greens', [JSON.stringify(greens)]);
            checkColor(row);
            greens = [];     
        }

            winner(input)
            gameOver();
        input.value = "";
        localStorage.setItem('saved', JSON.stringify(document.getElementById('wordlePlayfield').innerHTML));
    }
})

function checkColor(row){
    for(let i = 0; i < answers.length; i++){
        for(let j = 0; j < answers[i].length; j++){
            if(orange.includes(row.children[j].innerHTML) && 
            greens.includes(row.children[j].innerHTML)){
                row.children[j].style.backgroundColor = "white";
                orange.splice(orange.indexOf(row.children[j].innerHTML), 1);
            }
            else if(orange.includes(row.children[j].innerHTML)){
                row.children[j].style.backgroundColor = "orange";
                orange.splice(orange.indexOf(row.children[j].innerHTML), 1);
            }
            if(row.children[j].innerHTML == woord[j]){
                row.children[j].style.backgroundColor = "green";
                greens.splice(orange.indexOf(row.children[j].innerHTML), 1);
            }
            row.children[j].classList.add('addShow');

        }
        orange = JSON.parse(localStorage.getItem('orange'));
        // greens = JSON.parse(localStorage.getItem('greens'));
    }
}

async function getWoord(){
    let url = "5letterWords.json";
    const response = await fetch(url);
    const woordenlijst = await response.json();
    return woordenlijst;
}

function usedLetters(usedKey){
    for(let kRows of used.children){
        for(let key of kRows.children){
            if(key.innerHTML == usedKey){
                key.style.backgroundColor = "grey";
            }
            if(end){
                key.style.backgroundColor = "white";
            }
        }
    }
}

function winner(input){
    if(input.value == woord){
        document.getElementById('message').classList.add('winner');
        document.getElementById('message-text').innerHTML = "You are the winner! It took " + localStorage.getItem('answerCount') + " guesses. <br> Your score is: " + score + "! <br> Press 'Eneter' to reset.";
        end = true;
        score += 500;
        document.getElementById('reset').focus();
        let highscore = {highscore: score, game_id: 1};
        fetch('../highscore/highscore.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(highscore)
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Log de respons van het PHP-bestand
            // Voeg hier eventueel andere acties toe na ontvangst van de respons
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function gameOver(){
    if(localStorage.getItem('answerCount') > 5 && !end){
        document.getElementById('message').classList.add('loser');
        document.getElementById('message-text').innerHTML = "Loser! The word was " + woord + " <br> Press 'Eneter' to reset.";
        end = true;
        document.getElementById('reset').focus();
    }
}

function reset(){
    for(let row of rows){
        for(let letter of row.children){
            letter.classList.remove('addShow');
            letter.innerHTML = "";
            letter.style.backgroundColor = "";
        }
    }
    document.getElementById('message').classList.remove('winner');
    document.getElementById('message').classList.remove('loser');
    document.getElementById('answer').focus();
    localStorage.clear();
    answers = [];
    orange = [];
    greens = [];
    score = 1000;
    resetWoord();
    checkAnswersGiven();
    usedLetters(null);
    end = false;
}

function checkInput(input){
    for(let woords of JSON.parse(localStorage.getItem('allWords')).fiveLetterWords){
        if(input == woords){
            return true;
        }
    }
    return false;
}

function resetWoord(){
    if(localStorage.getItem('randomWoord') == null)
        getWoord().then( (woordenlijst) => {
            localStorage.setItem('randomWoord', woordenlijst.fiveLetterWords[Math.floor(Math.random()*woordenlijst.fiveLetterWords.length)]);
            woord = localStorage.getItem('randomWoord');
            localStorage.setItem('allWords', JSON.stringify(woordenlijst));
        })
    
}

function checkAnswersGiven(){
    if(localStorage.getItem('answerCount') > 0 && localStorage.getItem('answerCount') < 6){
        for(let i = 0; i < localStorage.getItem('answerCount'); i++){
            for(let j = 0; j < rows[i].children.length; j++){
                rows[i].children[j].innerHTML = JSON.parse(localStorage.getItem('answersGiven'))[i][j];
            }
            checkColor(rows[i]);
        }
    }else{
        localStorage.setItem('answerCount', 0);
        localStorage.setItem('answersGiven', answers);
    }
}

function init(){
    if(localStorage.getItem('answersGiven') != null && localStorage.getItem('answersGiven') != ""){
        answers = JSON.parse(localStorage.getItem('answersGiven'));
    }

    if(localStorage.getItem('orange') != null){
        orange = JSON.parse(localStorage.getItem('orange'));
    }

    if(save != null){
        document.getElementById('wordlePlayfield').innerHTML = JSON.parse(save);
    }
    resetWoord();
    checkAnswersGiven();
    document.getElementById('reset').addEventListener('click', reset);
}

init();
