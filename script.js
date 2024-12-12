const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const result = document.getElementById("result");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const startGameButton = document.getElementById("startGame");
const playAgainButton = document.getElementById("playAgain");
const player1NameInput = document.getElementById("player1Name");
const player1MarkerSelect = document.getElementById("player1Marker");
const player2NameInput = document.getElementById("player2Name");
const player2MarkerSelect = document.getElementById("player2Marker");
const player1ScoreDisplay = document.getElementById("player1Score");
const player2ScoreDisplay = document.getElementById("player2Score");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let player1Name = "";
let player2Name = "";
let player1Marker = "X";
let player2Marker = "O";
let player1Wins = 0;
let player2Wins = 0;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellClick = (e) => {
  const index = parseInt(e.target.dataset.index);
  if (gameBoard[index] === "" && gameActive) {
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWin()) {
      if (currentPlayer === player1Marker) {
        player1Wins++;
      } else {
        player2Wins++;
      }
      result.textContent = `${
        currentPlayer === player1Marker ? player1Name : player2Name
      } venceu!`;
      gameActive = false;
      updateScoreboard();
    } else if (checkDraw()) {
      result.textContent = "Empate!";
      gameActive = false;
    } else {
      currentPlayer =
        currentPlayer === player1Marker ? player2Marker : player1Marker;
    }
  }
};

const checkWin = () => {
  return winningConditions.some((condition) => {
    return condition.every((index) => gameBoard[index] === currentPlayer);
  });
};

const checkDraw = () => {
  return gameBoard.every((cell) => cell !== "");
};

const startGame = () => {
  player1Name = player1NameInput.value || "Jogador 1";
  player1Marker = player1MarkerSelect.value;
  player2Name = player2NameInput.value || "Jogador 1";
  player2Marker = player2MarkerSelect.value;

  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  updateScoreboard();
  currentPlayer = player1Marker;
  resetGame();
};

const updateScoreboard = () => {
  player1ScoreDisplay.textContent = `${player1Name} (${player1Marker}): ${player1Wins} vitórias`;
  player2ScoreDisplay.textContent = `${player2Name} (${player2Marker}): ${player2Wins} vitórias`;
};

const playAgain = () => {
  resetGame();
  gameActive = true;
  result.textContent = "";
  currentPlayer = player1Marker;
};

const resetGame = () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
};

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
startGameButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", playAgain);
