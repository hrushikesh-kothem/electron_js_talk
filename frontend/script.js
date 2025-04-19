let ipcRenderer;

if (isElectron()) {
  const { ipcRenderer: _ipcRenderer } = require("electron");
  ipcRenderer = _ipcRenderer;
}

const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

const clickSound = new Audio("./assets/click.wav");
const winSound = new Audio("./assets/win.wav");

let currentPlayer = "X";
let board = Array(9).fill("");

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

function startGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
    cell.addEventListener("click", handleClick, { once: true });
    cell.style.animation = "none";
  });
  board.fill("");
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(e) {
  const cell = e.target;
  const index = Array.from(cells).indexOf(cell);

  if (board[index] !== "") return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  clickSound.play();

  if (checkWin()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    endGame();
  } else if (board.every((cell) => cell !== "")) {
    statusText.textContent = "It's a Draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  let winner = null;
  winningCombos.forEach((combination) => {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      highlightWinningCells(combination);
    }
  });
  if (winner) {
    const time = new Date().toLocaleString();
    const message = `[${time} : ${currentPlayer} won the game]\n`;
    isElectron() && ipcRenderer.send("save-score", message);
    winSound.play();
    triggerCelebration();
  }
  return winner;
}

function endGame() {
  cells.forEach((cell) => cell.removeEventListener("click", handleClick));
}

function triggerCelebration() {
  const confettiContainer = document.getElementById("confetti");
  confettiContainer.style.display = "none";

  // Generate confetti pieces
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti-piece");
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random() * 1}s`;
    confettiContainer.appendChild(confetti);
  }
  endGame();
  confettiContainer.style.display = "block";
  // Hide confetti after animation
  setTimeout(() => {
    confettiContainer.style.display = "none";
    document
      .querySelectorAll(".confetti-piece")
      .forEach((piece) => piece.remove());
  }, 4000);
}

function highlightWinningCells(combination) {
  combination.forEach((index) => {
    const cell = cells[index];
    cell.classList.add("bounce");
    cell.style.animation = "bounce 2s ease infinite";
  });
}

function isElectron() {
  return (
    typeof window !== "undefined" &&
    typeof window.process === "object" &&
    window.process.type === "renderer"
  );
}

restartBtn.addEventListener("click", startGame);
