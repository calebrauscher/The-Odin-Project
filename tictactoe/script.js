// Player Factory
// Returns an object literal with players name and symbol (X, O)
const player = (name, symbol) => {
    return {
        name,
        symbol,
    };
};

// Gameboard Module
const gameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const getGameBoard = () => gameboard;

    const getSquare = (square) => gameboard[square];

    const updateBoard = (square, symbol) => {
        gameboard[square] = symbol;
    };

    const resetBoard = () => {
        gameboard = ["", "", "", "", "", "", "", "", ""];
    };

    const checkWin = (symbol) => {
        const winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2],
        ];
        let winnerFound = false;
        winCombos.forEach((square, i) => {
            if (gameboard[square[0]] === symbol && gameboard[square[1]] === symbol && gameboard[square[2]] === symbol) {
                winnerFound = true;
            }
        });
        return winnerFound;
    };

    const checkTie = () => {
        return gameboard.every((square) => square == "X" || square == "O");
    };

    return {
        getGameBoard,
        getSquare,
        updateBoard,
        resetBoard,
        checkWin,
        checkTie,
    };
})();

// Game Module
const game = ((doc) => {
    let squares = Array.from(doc.querySelectorAll(".square"));
    let modal = doc.getElementById("form-modal");
    let form = doc.getElementById("form");
    let playerStatus = doc.getElementById("status");
    let player1Name = doc.getElementById("player1");
    let player2Name = doc.getElementById("player2");
    let container = doc.getElementById("container");
    let newButton = doc.getElementById("newGame");
    let resetButton = doc.getElementById("resetGame");
    let winningPlayer = doc.getElementById("winner");
    let turnCounter = 1;

    const getCurrentPlayer = () => {
        return turnCounter % 2 == 0 ? player2 : player1;
    };

    const render = () => {
        squares.forEach((square) => {
            square.innerHTML = gameBoard.getSquare(square.id.slice(-1));
        });
    };

    const checkGame = (player) => {
        let winCombo = gameBoard.checkWin(player.symbol);
        let currentPlayer = getCurrentPlayer();
        if (winCombo) {
            winningPlayer.innerHTML = `${currentPlayer.name} is the winner`;
            return true;
        }
        if (gameBoard.checkTie()) {
            winningPlayer.innerHTML = `It's a tie!`;
            return true;
        }
        return false;
    };

    const makeMove = (event) => {
        let currentPlayer = getCurrentPlayer();
        if (event.target.innerHTML === "") {
            gameBoard.updateBoard(event.target.id.slice(-1), currentPlayer.symbol);
            event.target.classList.add("occupied");
            render();
            /*if (checkGame(currentPlayer)) {
                newGame();
            } else {
                turnCounter++;
            }*/
            if (!checkGame(currentPlayer)) {
                turnCounter++;
            }
        }
        currentPlayer = getCurrentPlayer();
        playerStatus.innerHTML = `It is ${currentPlayer.name}'s turn!`;
    };

    const resetGame = () => {
        gameBoard.resetBoard();
        turnCounter = 1;
        winningPlayer.innerHTML = "";
        playerStatus.innerHTML = "";
        squares.forEach((square) => {
            square.classList.remove("occupied");
        });
        playerStatus.innerHTML = `It is ${player1.name}'s turn!`;
        render();
    };

    const newGame = () => {
        resetGame();
        form.reset();
        container.style.display = "none";
        modal.style.display = "block";
    }

    // Event Listeners
    squares.forEach((square) => {
        square.addEventListener("click", makeMove);
    });

    resetButton.addEventListener("click", resetGame);
    newButton.addEventListener("click", newGame);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        player1 = player(player1Name.value, "X");
        player2 = player(player2Name.value, "O");
        modal.style.display = "none";
        container.style.display = "grid";
        playerStatus.innerHTML = `It is ${player1.name}'s turn!`;
    });

    return {
        render: render,
    };
})(document);

game.render();