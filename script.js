
const TicTacToe = (function() {
let board = ['','','','','','','','',''];

const winConditions = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

const Player = (name, symbol) => {
return { name, symbol };
};

const playerX = Player('Player 1', 'X');
const playerO = Player('Player 2', 'O');

let currentPlayer = playerX;
const cells = document.querySelectorAll('.cell');
const status = document.querySelector('#statusMessage');
const restartButton = document.querySelector(".restartButton");
let running = true;

function startGame() {
cells.forEach(cell => {
    cell.innerText = '';
    cell.addEventListener('click', cellClicked, { once: true });
});

function restartGame() {
    board = ['','','','','','','','',''];
    cells.forEach(cell=> {
        cell.innerText = '';
    cell.addEventListener('click', cellClicked, { once: true });
    })
    currentPlayer = playerX
    let roundWon = false;
    running = true;
}
restartButton.addEventListener("click", restartGame);

currentPlayer = playerX;
status.textContent = `${currentPlayer.name}'s turn`;
running = true;
}

function cellClicked() {
const cellIndex = this.getAttribute('data-cell-index');

if (board[cellIndex] !== '' || !running) {
    return;
}
updateCell(this, cellIndex);
checkWinner();
}

function updateCell(cell, index) {
board[index] = currentPlayer.symbol;
cell.innerText = currentPlayer.symbol;
currentPlayer = currentPlayer === playerX ? playerO : playerX;
status.textContent = `${currentPlayer.name}'s turn`;
}

function checkWinner() {

let roundWon = false;

for (let i = 0; i < winConditions.length; i++) {
    const winCondition = winConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === '' || b === '' || c === '') {
    continue;
    }
    if (a === b && b === c) {
    roundWon = true;
    break;
    }
}

if (roundWon) {
    status.textContent = `${currentPlayer === playerX ? playerO.name : playerX.name} Wins!`;
    running = false;
    return;
}

if (!board.includes('')) {
    status.textContent = 'Draw!';
    running = false;
}
}

return { startGame };
})();

// Start the game
TicTacToe.startGame();