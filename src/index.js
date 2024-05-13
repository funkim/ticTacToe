import { style } from "./style.css";

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let roundWon;

class Player {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
  }
}

const cells = document.querySelectorAll(".cell");
const status = document.querySelector("#statusMessage");
const restartButton = document.querySelector(".restartButton");

restartButton.addEventListener("click", initiateGame);

function createPlayers() {
  const playerX = new Player("Player 1", "X");
  const playerO = new Player("Player 2", "O");
  return [playerX, playerO];
}

const players = createPlayers();
const mainPlayer = players[0];
const opponent = players[1];

initiateGame();

function initiateGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = mainPlayer;
  roundWon = false;
  status.textContent = `${currentPlayer.name}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.addEventListener("click", getClickedCell);
  });
}

function getClickedCell() {
  const cellIndex = this.getAttribute("data-cell-index");
  if (board[cellIndex] !== "") {
    return;
  }
  updateCell(this, cellIndex);
  giveResult();
}

function updateCell(cell, index) {
  board[index] = currentPlayer.symbol;
  cell.innerText = currentPlayer.symbol;
  currentPlayer = currentPlayer === mainPlayer ? opponent : mainPlayer;
  status.textContent = `${currentPlayer.name}'s turn`;
}

function giveResult() {
  for (let i = 0; i < winConditions.length; i++) {
    const winCondition = winConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    status.textContent = `${
      currentPlayer === mainPlayer ? opponent.name : mainPlayer.name
    } Wins!`;
  } else if (!board.includes("")) {
    status.textContent = "Draw!";
  }
}
