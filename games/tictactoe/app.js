let elements = document.getElementsByClassName('elements');
let gamefield = document.getElementById('gamefield');
let dragged;
let oldDrag;
let turn = "x";
let wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let playerX = [];
let playerO = [];

window.addEventListener("mousedown", (element) => {
    if(element.target.classList.contains('element') && element.target.classList.contains(turn)){
        turn == 'x' ? turn = 'o': turn = 'x';
        element.target.addEventListener('drag', () => {
            dragged = null;
            dragged = element.target;
        })
    }
});

gamefield.addEventListener('dragover', (field) => {
    field.preventDefault();
    if(oldDrag != dragged){
    field.target.addEventListener('drop', (space) => {
        dragged.setAttribute('draggable', false);
        space.target.appendChild(dragged);
        oldDrag = dragged;
        turn == 'o' ? playerX.push(parseInt(space.target.id)) : playerO.push(parseInt(space.target.id));
        // dragged = null;
        checkWin()
        });
    }
});

let checker = (arr, target) => target.every(v => arr.includes(v));

function checkWin(){
    if(!winner){
        for(let win of wins){
            if(checker(playerX, win)){
                document.getElementById('winner').innerHTML = "Winner! PlayerX";
                document.getElementById('winner').style.visibility = "visible";
                undrag();
            }
            if(checker(playerO, win)){
                document.getElementById('winner').innerHTML = "Winner! PlayerO";
                document.getElementById('winner').style.visibility = "visible";
                undrag();
            }
        }
    }
}

function undrag(){
    for(let element of elements)
        for(let elemen of element.children)
        elemen.setAttribute('draggable', false);
}