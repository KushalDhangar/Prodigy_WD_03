let playerText=document.getElementById('playerText');
let reserBtn=document.getElementById('restartBtn');

let winningBlock=getComputedStyle(document.body).getPropertyValue('--winning-block');

let boxes=Array.from(document.getElementsByClassName('box'));

const player1="O";
const player2="X";

let currentPlayer=player2;

let spaces=Array(9).fill(null);

const startGame =() =>{
    boxes.forEach(box => box.addEventListener('click',boxClicked));
}
function boxClicked(e){
    const id = e.target.id;
    if(!spaces[id]){
        spaces[id]=currentPlayer;
        e.target.innerText=currentPlayer;
        if(playerHasWon()!==false){
            playerText.innerText= `${currentPlayer} has Won !!!`;
            let winning_blocks = playerHasWon();
            winning_blocks.map(box => boxes[box].style.backgroundColor=winningBlock)
            boxes.forEach(box=>box.removeEventListener('click',boxClicked))

            return;
        }

        currentPlayer=currentPlayer==player2?player1:player2;
    }
}


const winningCombos =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for(const chance of winningCombos){
        let [a,b,c]=chance;
        if(spaces[a] && (spaces[a]==spaces[b] && spaces[a]==spaces[c])){
            return[a,b,c]
        }
    }
    return false;
}

restartBtn.addEventListener('click',restart);
function restart(){
    spaces.fill(null);
    boxes.forEach(box =>{
        box.innerText='';
        box.style.backgroundColor =''
    });
    playerText.innerText='Tic Tac Toe';
    currentPlayer=player2;
    startGame();
}

startGame();