let letter = document.getElementById('letter');
let answer = document.getElementById('answer');
let guessedLetters = document.getElementById('guessedLetters');
let error = document.getElementById('error');
let word = document.getElementById('word');
let data = JSON.parse(localStorage.getItem('cachedWoord'));
let hint = document.getElementById('hint_location');
let score = 1000;

/**
 * Controleer of al een woord opgehaald is, als dit zo is gebruik gecachte woord.
 * Als er nog geen woord is, haal uit de JSON een woord / zin.
 * Sla woord of zin op in localStorage voor gebruik als je van de pagina af gaat.
 * @returns null;
 */
async function getWord(){
    if(localStorage.getItem('cachedWoord') != null){
        guessedLetters.innerHTML = localStorage.getItem('guessed');
        return null;
    }
    let url = "woordenlijst.json";

    const response = await fetch(url);

    if(!response.ok){
        console.error("Het JSON bestand kon niet gevonden worden. Controleer of je de correcte URL hebt mee gegeven.");
    }

    const woordenLijst = await response.json();
    localStorage.setItem('cachedWoord', JSON.stringify(woordenLijst[Math.floor(Math.random()*woordenLijst.length)]));
    createStorage();
}

/**
 * Maak de localStorage aan voor het spel.
 */
function createStorage(){
    data = JSON.parse(localStorage.getItem('cachedWoord'));
    localStorage.setItem('guessed', ' ');
    localStorage.setItem('answers', '');
}

function removeStorage(){
    localStorage.removeItem('cachedWoord');
    localStorage.removeItem('guessed');
    localStorage.removeItem('answers');
}

/**
 * Laat het geraden woord, letters of strepen zien.
 */
function showWord(){
    word.innerHTML = "";
    for(let i = 0; i <= data.woord.length-1; i++){
        if(localStorage.getItem('guessed').includes(data.woord[i])){
            word.innerHTML += data.woord[i];
        }else if(data.woord[i] == "-"){
            word.innerHTML += "-";
        }else{
            word.innerHTML += "_";
        }
    }
}
/**
 * Controleer of het geraden woord of de geraden letter voor komt in het woord.
 * Als letter al voorkomt in geraden letter, laat een error zien.
 */
function guessWord(){
    error.innerHTML = "";
    if(letter.value != "" &&
    !localStorage.getItem('guessed').includes(letter.value)){
        localStorage.setItem('guessed', localStorage.getItem('guessed') + letter.value);
        guessedLetters.innerHTML = localStorage.getItem('guessed');
        letter.value = "";
        showWord();
    }else if(answer.value != ""){
        localStorage.setItem('answer', answer.value);
        answer.value = "";
    }else{
        error.innerHTML = "Niets ingevoerd of letter al geraden.";
        letter.value = "";
    }
}
/**
 * Controleer of je gewonnen hebt.
 * Laat winnaar scherm zien wanneer dit zo is, je kan dan het spel reseten.
 */
function winner(){
    if(word.innerHTML == data.woord || 
        localStorage.getItem('answer') == data.woord){
            guessedLetters.innerHTML = "";
            word.innerHTML = data.woord;
            document.getElementById('winner').style.display = 'grid';
            let highscore = {highscore: score, game_id: 3};
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

/**
 * Start het spel, haal het woord op wanneer nodig en anders maak gebruik van het gecachete woord.
 */
function init(){
    hint.innerHTML = "";
    error.innerHTML = "";
    getWord().then(() => {
        showWord();
        document.getElementById('guess').addEventListener('click', () => {
            guessWord();
            winner();
        });
        /**
         * Inplaats van op de knop drukken op enter drukken.
         */
        window.addEventListener('keypress', (event) => {
            if(event.key == "Enter" && event.target.parentElement.id == "inputs"){
                guessWord();
                winner();
            }
        })
    });
}

/**
 * Reset het spel
 */
document.getElementById('reset').addEventListener('click', () => {
    removeStorage();
    getWord().then(() => {showWord()});
    document.getElementById('winner').style.display = "none";
})

document.getElementById('hint').addEventListener('click', () => {
    hint.innerHTML = data.betekenis;
})


//Start het spel.
init();