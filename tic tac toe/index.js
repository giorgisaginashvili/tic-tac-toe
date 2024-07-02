var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;

window.onload = function() {
    setGame();
    document.getElementById("resetButton").addEventListener("click", resetGame);
}

function setGame() {
    board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ];

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", placeMark); // Adding event listener for tile clicks
            document.getElementById("board").append(tile);
        }
    }
}

function placeMark() {
    if (gameOver) {
        return;
    }
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') {
        return;
    }

    board[r][c] = currPlayer;
    this.innerText = currPlayer;

    if (currPlayer == playerO) {
        currPlayer = playerX;
    } else {
        currPlayer = playerO;
    }

    checkWinner();
}

function checkWinner() {
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            setWinner(r, 0, r, 1, r, 2);
            return;
        }
    }

    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' ') {
            setWinner(0, c, 1, c, 2, c);
            return;
        }
    }

    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        setWinner(0, 0, 1, 1, 2, 2);
        return;
    }

    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        setWinner(0, 2, 1, 1, 2, 0);
        return;
    }
}

function setWinner(r1, c1, r2, c2, r3, c3) {
    document.getElementById(r1.toString() + "-" + c1.toString()).classList.add("winner");
    document.getElementById(r2.toString() + "-" + c2.toString()).classList.add("winner");
    document.getElementById(r3.toString() + "-" + c3.toString()).classList.add("winner");
    gameOver = true;
}

function resetGame() {
    board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ];
    currPlayer = playerO;
    gameOver = false;

    let tiles = document.getElementsByClassName("tile");
    for (let tile of tiles) {
        tile.innerText = "";
        tile.classList.remove("winner");
    }
}
