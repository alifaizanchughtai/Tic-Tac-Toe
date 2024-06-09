console.log("TicTacToe");

const clickAudio = new Audio("sounds/click.mp3");
const gameoverAudio = new Audio("sounds/gameover.mp3");
const winAudio = new Audio("sounds/win.mp3");
let currentTurn = "X";
let isGameOver = false;

const changeTurn = () => currentTurn === "X" ? "O" : "X";

const checkWin = () => {
    const boxTextElements = document.getElementsByClassName('boxText');
    const boardSize = 3;
    const rowCounts = Array(boardSize).fill(0).map(() => ({ X: 0, O: 0 }));
    const colCounts = Array(boardSize).fill(0).map(() => ({ X: 0, O: 0 }));
    let diag1Counts = { X: 0, O: 0 };
    let diag2Counts = { X: 0, O: 0 };

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const index = i * boardSize + j;
            const cellValue = boxTextElements[index].innerText;

            if (cellValue) {
                rowCounts[i][cellValue]++;
                colCounts[j][cellValue]++;

                if (i === j) {
                    diag1Counts[cellValue]++;
                }

                if (i + j === boardSize - 1) {
                    diag2Counts[cellValue]++;
                }

                if (rowCounts[i][cellValue] === boardSize ||
                    colCounts[j][cellValue] === boardSize ||
                    diag1Counts[cellValue] === boardSize ||
                    diag2Counts[cellValue] === boardSize) {
                    document.querySelector('.info').innerText = `~• ${cellValue} Won`;
                    winAudio.play();
                    isGameOver = true;
                    document.querySelector('.imgbox img').style.width = "250px";
                    return;
                }
            }
        }
    }
};

const boxes = document.querySelectorAll(".box");
boxes.forEach(box => {
    const boxText = box.querySelector('.boxText');
    box.addEventListener('click', () => {
        if (boxText.innerText === '' && !isGameOver) {
            boxText.innerText = currentTurn;
            clickAudio.play();
            checkWin();
            if (!isGameOver) {
                currentTurn = changeTurn();
                document.querySelector('.info').innerText = `~• Turn for ${currentTurn}`;
            }
        }
    });
});

document.getElementById('reset').addEventListener('click', () => {
    const boxTextElements = document.querySelectorAll('.boxText');
    boxTextElements.forEach(boxText => boxText.innerText = '');
    currentTurn = "X";
    isGameOver = false;
    document.querySelector('.info').innerText = `~• Turn for ${currentTurn}`;
    document.querySelector('.imgbox img').style.width = "0px";
});

