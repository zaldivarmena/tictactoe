const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const xScoreDisplay = document.querySelector("#xscore");
const cScoreDisplay = document.querySelector("#cscore");
const startCells = [
    "","","",
    "","","",
    "","",""
]
let go = Math.random() < 0.5 ? "circle" : "cross";
let xScore = 0;
let cScore = 0;


infoDisplay.textContent = `Empieza ${go}`;

function createBoard(){
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
        cellElement.id = index 
        cellElement.addEventListener("click", addGo)
        gameBoard.append(cellElement)
    })
}
createBoard()

function addGo (e){
    console.log("clicked", e)
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "Le toca a " +  go 
    e.target.removeEventListener("click", addGo)
    checkScore()
}

function checkScore(){
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(array=>{
        const circleWins =  array.every( cell => allSquares[cell].firstChild?.classList.contains("circle"))
        if(circleWins){
            infoDisplay.textContent = "Gana Circulo"
            cScore++;
            cScoreDisplay.textContent = `Circulo: ${cScore}`;
            allSquares.forEach(square => square.removeEventListener("click", addGo))
        }
    })
    winningCombos.forEach(array=>{
        const crossWins =  array.every( cell => allSquares[cell].firstChild?.classList.contains("cross"))
        if(crossWins){
            infoDisplay.textContent = "Gana Cruz"
            xScore++;
            xScoreDisplay.textContent = `Cruz: ${xScore}`;
            allSquares.forEach(square => square.removeEventListener("click", addGo))
        }
    })
}

// Restart game function
function restartGame() {
    go = Math.random() < 0.5 ? "circle" : "cross";
    infoDisplay.textContent = `Empieza ${go}`;
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => {
        square.innerHTML = ''; // Clear the content of each cell
        square.addEventListener("click", addGo); // Re-enable the click event listener
    });
}

const restartButton = document.getElementById("reset");
restartButton.addEventListener("click", restartGame);
