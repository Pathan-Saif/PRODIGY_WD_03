let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const statusDisplay = document.getElementById('status');

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleResultValidation() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            statusDisplay.textContent = `Player ${currentPlayer} has won!`;
            gameActive = false;
            condition.forEach(cellIndex => document.querySelector(`.cell[data-index="${cellIndex}"]`).classList.add('winning-cell'));
            return;
        }
    }
    if (!gameBoard.includes('')) {
        statusDisplay.textContent = 'Game ended in a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    }
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    if (!gameActive || gameBoard[clickedCellIndex] !== '') return;
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    handleResultValidation();
}

function handleRestartGame() {
    gameBoard.fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('resetButton').addEventListener('click', handleRestartGame);
statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
