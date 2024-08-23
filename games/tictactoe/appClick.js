let elements = document.getElementsByClassName('elements');
let gamefield = document.getElementById('gamefield');
let playerElement;
let oldDrag;
let turn = "x";
let wins = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
let playerX = [];
let playerO = [];
let winner = false;
let score = 1000;

gamefield.addEventListener("click", placeAndCheck);
function placeAndCheck(element) {
    if (element.target.classList.contains('space') && !element.target.classList.contains(turn)) {
        turn == 'x' ? turn = 'o' : turn = 'x';
        let playerTurn = document.createElement('div');
        playerTurn.innerHTML = turn;
        playerTurn.classList.add("element");
        playerTurn.classList.add(turn);
        element.target.appendChild(playerTurn);
        if (turn == 'x') {
            playerX.push(parseInt(element.target.id));
        } else {
            playerO.push(parseInt(element.target.id));
        }
        winner = checkWin();

    }
}

let checker = (arr, target) => target.every(v => arr.includes(v));

function checkWin() {
    if (!winner) {
        for (let win of wins) {
            if (checker(playerX, win)) {
                document.getElementById('winner').innerHTML = "Winner! PlayerX";
                document.getElementById('winner').style.visibility = "visible";
                return true;
            }
            if (checker(playerO, win)) {
                document.getElementById('winner').innerHTML = "Winner! PlayerO";
                document.getElementById('winner').style.visibility = "visible";
                return true;
            }
        }
        return false;
    }
}