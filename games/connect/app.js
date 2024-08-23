let spaces = document.getElementsByClassName('space');
let score = 1000;

let gamefield = document.getElementById('connectPlayerfield');
let lastPlace = "orange";
gamefield.addEventListener('click', checkPlacement);

function checkPlacement(event){
    if(event.target.classList.contains('space'))
        if(event.target.id.slice(5) < 36 && event.target.innerHTML != "O"){
            if(document.getElementById(`space${parseInt(event.target.id.slice(5))+7}`).innerHTML == "O"){
                checkPlaceColor(event);
            }
        }else if(event.target.innerHTML != "O"){
            checkPlaceColor(event);
        }else{
            console.log('piece already placed');
        }
}

function checkPlaceColor(event){
    if(lastPlace == "orange"){
        lastPlace = "blue";
    }else{
        lastPlace = "orange";
    }
    event.target.classList.add(lastPlace);
    event.target.style.color = lastPlace;
    event.target.innerHTML = "O";
    if(checkWinner()){
        stop();
        showWinnerScreen();
        let highscore = {highscore: score, game_id: 2};
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

function checkWinner(){
    let winner = false;
    let spaces = document.getElementsByClassName('space');
    for(let i = 0; i < spaces.length; i++){
        if(i < 39 && spaces[i].style.color == lastPlace){
            if(spaces[i].style.color == lastPlace &&
            spaces[i+1].style.color == lastPlace &&
            spaces[i+2].style.color == lastPlace &&
            spaces[i+3].style.color == lastPlace){
                winner = true;
            }else if(i < spaces.length-21 && spaces[i].style.color == lastPlace &&
                spaces[i+7].style.color == lastPlace &&
                spaces[i+14].style.color == lastPlace &&
                spaces[i+21].style.color == lastPlace){
                    winner = true;
            }else if(i < 22 && i > 3 && 
                spaces[i].style.color == lastPlace &&
                spaces[i+6].style.color == lastPlace &&
                spaces[i+12].style.color == lastPlace &&
                spaces[i+18].style.color == lastPlace){
                    winner = true;
            }else if(i < 19 && i > 0 && 
                spaces[i].style.color == lastPlace &&
                spaces[i+8].style.color == lastPlace &&
                spaces[i+16].style.color == lastPlace &&
                spaces[i+24].style.color == lastPlace){
                    winner = true;
            }
        }
    }
    return winner;
}

function stop(){
    gamefield.removeEventListener('click', checkPlacement);
}

function showWinnerScreen(){
    document.getElementById('winner').style.display = "grid";
    document.getElementById('winner').innerHTML = "The winner is " + lastPlace + " congrats! <br>click here to reset <button id='reset'>Reset</button>";
    document.getElementById('winner').style.color = lastPlace;
    document.getElementById('reset').addEventListener('click', resetGame);
}

function resetGame(){
    for(let space of spaces){
        space.classList.remove('orange');
        space.classList.remove('blue');
        space.style.color = "black";
        space.innerHTML = "";
    }
    lastPlace = "orange";
    document.getElementById('winner').style.display = "none";
    gamefield.addEventListener('click', checkPlacement);
}

