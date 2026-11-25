
const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restart = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            status.textContent = "Player " + currentPlayer + " Wins!";
            gameActive = false;
        }
        else if (!board.includes("")) {
            status.textContent = "It's a Draw!";
            gameActive = false;
        }
        else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = "Player " + currentPlayer + "'s Turn";
        }
    });
});

function checkWinner() {
    return winningPatterns.some(pattern => {
        return pattern.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

restart.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    status.textContent = "Player X's Turn";
});
