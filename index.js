
if(sessionStorage.getItem('AuthenticationState')===null)
{
    alert("Please Login First!");
    window.open('login.html','_self');
}

let currentPlayer='X';
let xWins=0,oWins=0;

let isGameActive=true;
let board=["","","","","","","","",""];

const winConditions = [[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]];
const status=document.querySelector('.game--status');

status.innerHTML=currentPlayerTurn();
showScores();

function showScores()
{
    let playerXScore="Player-X Score : ";
    let playerOScore="Player-O Score : ";
    const xScore=document.querySelector('.Player-X-score');
    const oScore=document.querySelector('.Player-O-score');

    if(sessionStorage.getItem('xWins')) xWins=sessionStorage.getItem('xWins');

    if(sessionStorage.getItem('oWins')) oWins=sessionStorage.getItem('oWins');
    playerOScore+=oWins.toString();
    playerXScore+=xWins.toString();
    xScore.textContent=playerXScore;
    oScore.textContent=playerOScore;
}

function currentPlayerTurn()
{
    return 'It\'s '+ currentPlayer+ '\'s turn';
}

function displayWinningMessage()
{
    return 'Player ' + currentPlayer + ' won!';
}

function displayDrawMessage()
{
    return 'Game Draw';
}

function changeCurrentPlayer()
{
    if(currentPlayer==='X') currentPlayer='O';
    else currentPlayer='X';
    status.innerHTML=currentPlayerTurn();
}

function updateSquare(currentSquare,squareIndex)
{
    board[squareIndex]=currentPlayer;
    currentSquare.innerHTML=currentPlayer;
}

function validate()
{
    let won=false;

    for(let i=0;i<8;i++)
    {
        if(board[winConditions[i][0]]==='') continue;
        if((board[winConditions[i][0]]===board[winConditions[i][1]])&&(board[winConditions[i][2]]===board[winConditions[i][1]]))
        {
            won=true;
            break;
        }
    }
    if(won)
    {
        if(currentPlayer==='X') xWins++;
        else oWins++;
        sessionStorage.setItem('xWins',xWins);
        sessionStorage.setItem('oWins',oWins);
        status.innerHTML=displayWinningMessage();
        isGameActive=false;
        return;
    }

    let draw=true;
    for(let i=0;i<9;i++)
    {
        if(board[i]==='') draw=false;
    }

    if(draw)
    {
        status.innerHTML=displayDrawMessage();
        isGameActive=false;
        return;
    }
    changeCurrentPlayer();
}

function onSquareClick(clickedSquareEvent)
{
    const currentSquare=clickedSquareEvent.target;
    const squareIndex=parseInt(currentSquare.getAttribute('square-index'));
    
    if((board[squareIndex]!=='') || (!isGameActive)) return;
    updateSquare(currentSquare,squareIndex);
    validate()
}

function newGame()
{
    board=["","","","","","","","",""];
    isGameActive=true;
    currentPlayer='X';
    status.innerHTML=currentPlayerTurn();
    showScores();
    document.querySelectorAll('.square').forEach(square=>square.innerHTML='');
}

document.querySelectorAll('.square').forEach(square=>square.addEventListener('click',onSquareClick));
document.querySelector('.new--game').addEventListener('click',newGame);