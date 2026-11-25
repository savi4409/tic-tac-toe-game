const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restart = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const human = "X";
const computer = "O";

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

// Human player move
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {

        if (board[index] !== "" || !gameActive) {
            return;
        }

        makeMove(index, human);

        if (gameActive) {
            status.textContent = "Computer is thinking...";

            setTimeout(computerMove, 500);
        }
    });
});

// Make a move
function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;

    if (checkWinner(player)) {
        status.textContent =
            player === human ? "You Win!" : "Computer Wins!";
        gameActive = false;
    }
    else if (!board.includes("")) {
        status.textContent = "It's a Draw!";
        gameActive = false;
    }
}

// Check winning pattern
function checkWinner(player) {
    return winningPatterns.some(pattern =>
        pattern.every(index => board[index] === player)
    );
}

// Computer move
function computerMove() {

    if (!gameActive) return;

    // Try to win
    let move = findBestMove(computer);

    // Block player's winning move
    if (move === -1) {
        move = findBestMove(human);
    }

    // Take center if available
    if (move === -1 && board[4] === "") {
        move = 4;
    }

    // Choose any available position
    if (move === -1) {
        let empty = board
            .map((value, index) => value === "" ? index : -1)
            .filter(index => index !== -1);

        move = empty[Math.floor(Math.random() * empty.length)];
    }

    makeMove(move, computer);

    if (gameActive) {
        status.textContent = "Your Turn (X)";
    }
}

// Find winning or blocking move
function findBestMove(player) {

    for (let pattern of winningPatterns) {

        let values = pattern.map(index => board[index]);

        if (
            values.filter(value => value === player).length === 2 &&
            values.includes("")
        ) {
            return pattern[values.indexOf("")];
        }
    }

    return -1;
}

// Restart game
restart.addEventListener("click", () => {

    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    status.textContent = "Your Turn (X)";
});
