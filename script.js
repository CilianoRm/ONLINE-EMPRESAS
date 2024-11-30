// Variáveis globais
let score = 0;
let toWin = 0;
let ghostsEaten = 0;
let lives = 3;
const width = 28; // Tamanho do grid (28x28 = 784 quadrados)
const squares = [];
let pacmanCurrentIndex = 518;
const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");

// Layout do tabuleiro
const layout = [
    1,1,1,1,1,1,1,1,4,4,1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,0,0,0,0,0,0,1,4,4,1,3,1,4,4,1,0,0,0,0,0,0,0,0,0,0,3,1,
		1,0,1,1,1,1,0,1,1,1,1,0,1,4,4,1,1,1,1,0,1,0,1,1,1,0,1,1,
		1,3,1,4,4,1,0,0,0,0,0,0,1,4,4,4,4,4,1,0,0,0,1,4,1,0,1,4,
		1,0,1,4,4,1,0,1,1,0,1,0,1,4,4,4,4,4,1,0,1,0,1,4,1,0,1,4,
		1,0,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,
		1,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,
		1,0,1,1,1,1,0,3,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,
		1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,
		4,4,4,4,4,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,1,4,4,4,4,4,
		4,4,4,4,4,1,0,0,0,0,0,1,1,4,4,1,1,0,0,0,0,0,1,4,4,4,4,4,
		1,1,1,1,1,1,0,1,1,1,0,2,0,0,0,0,2,0,1,1,1,0,1,1,1,1,1,1,
		4,0,0,0,0,0,0,1,4,1,0,0,0,0,0,0,0,0,1,4,1,0,0,0,0,0,0,4,
		1,1,1,1,1,1,0,1,1,1,0,2,0,0,0,0,2,0,1,1,1,0,1,1,1,1,1,1,
		4,4,4,4,4,1,0,0,0,0,0,1,1,4,4,1,1,0,0,0,0,0,1,4,4,4,4,4,
		4,4,4,4,4,1,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,0,1,4,4,4,4,4,
		1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,3,1,0,1,1,1,1,1,1,
		1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,3,1,
		1,0,1,1,1,1,0,3,1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,1,1,1,1,
		1,0,0,0,0,0,0,0,0,0,1,1,4,4,4,4,1,1,0,1,1,0,1,0,1,4,4,4,
		1,1,1,0,1,1,1,1,1,0,1,4,4,4,4,4,4,1,0,0,0,0,1,0,1,4,4,4,
		4,4,1,0,1,4,4,4,1,0,1,4,4,4,4,4,4,1,0,1,1,1,1,0,1,1,1,1,
		1,1,1,0,1,1,1,1,1,0,1,1,1,4,4,1,1,1,0,0,0,0,0,0,0,0,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,0,0,1,1,1,1,0,1,1,0,1,
		1,3,1,1,1,1,1,1,1,1,1,0,1,4,4,1,0,1,0,1,4,4,1,0,1,3,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,0,0,1,4,4,1,0,0,0,0,1,
		1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,4,4,1,1,1,1,1,1
];
	// 0 = pac-dot ; 1 = wall ; 2 = ghost-lair ; 3 = power-pellet ; 4 = empty;

// Classes
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.timerId = NaN;
        this.isScared = false;
        this.isEaten = false;
    }
}

// Funções de UI
function updateLivesDisplay() {
    const livesContainer = document.getElementById("lives-container");
    livesContainer.innerHTML = "";
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement("span");
        heart.classList.add("heart");
        heart.textContent = "❤️";
        livesContainer.appendChild(heart);
    }
}

function updateScoreDisplay() {
    scoreDisplay.textContent = score;
    document.getElementById("bestScore").textContent =
        localStorage.getItem("bestScore") || 0;
}

// Funções principais do jogo
function createBoard() {
    layout.forEach((item, i) => {
        const square = document.createElement("div");
        grid.appendChild(square);
        squares.push(square);

        if (item === 0) square.classList.add("pac-dot");
        else if (item === 1) square.classList.add("wall");
        else if (item === 2) square.classList.add("ghost-lair");
        else if (item === 3) square.classList.add("power-pellet");
        else if (item === 4) square.classList.add("empty");
    });
}

function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove("pac-man");
    let nextIndex = pacmanCurrentIndex;

    switch (e.keyCode) {
        case 37: // Left
            if (pacmanCurrentIndex % width !== 0) nextIndex -= 1;
            break;
        case 38: // Up
            if (pacmanCurrentIndex - width >= 0) nextIndex -= width;
            break;
        case 39: // Right
            if (pacmanCurrentIndex % width < width - 1) nextIndex += 1;
            break;
        case 40: // Down
            if (pacmanCurrentIndex + width < width * width) nextIndex += width;
            break;
    }

    if (
        !squares[nextIndex].classList.contains("wall") &&
        !squares[nextIndex].classList.contains("ghost-lair")
    ) {
        pacmanCurrentIndex = nextIndex;
    }

    squares[pacmanCurrentIndex].classList.add("pac-man");
    pacDotEaten();
    powerPelletEaten();
    checkGameState();
}

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
        score++;
        toWin++;
        squares[pacmanCurrentIndex].classList.remove("pac-dot");
        updateScoreDisplay();
    }
}

function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
        score += 10;
        toWin += 10;
        ghosts.forEach((ghost) => (ghost.isScared = true));
        setTimeout(() => ghosts.forEach((ghost) => (ghost.isScared = false)), 7000);
        squares[pacmanCurrentIndex].classList.remove("power-pellet");
        updateScoreDisplay();
    }
}

function loseLife() {
    lives--;
    updateLivesDisplay();
    if (lives <= 0) gameOver();
}

function gameOver() {
    alert("Game Over! Você perdeu todas as vidas!");
    location.reload();
}

function checkGameState() {
    const ghostOnPacman = squares[pacmanCurrentIndex].classList.contains("ghost");
    const scaredGhost = squares[pacmanCurrentIndex].classList.contains("scared-ghost");

    if (ghostOnPacman && !scaredGhost) loseLife();
    if (ghostOnPacman && scaredGhost) eatGhost();
}

function eatGhost() {
    const ghost = ghosts.find((g) => g.currentIndex === pacmanCurrentIndex);
    if (ghost && ghost.isScared && !ghost.isEaten) {
        score += 100;
        ghostsEaten++;
        updateScoreDisplay();
        squares[ghost.currentIndex].classList.remove(
            ghost.className,
            "ghost",
            "scared-ghost"
        );
        ghost.isEaten = true;
    }
}

function moveGhosts() {
    ghosts.forEach((ghost) => moveGhost(ghost));
}

function moveGhost(ghost) {
    const directions = [-1, 1, -width, width];
    ghost.timerId = setInterval(() => {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const nextIndex = ghost.currentIndex + direction;

        if (
            !squares[nextIndex].classList.contains("ghost") &&
            !squares[nextIndex].classList.contains("wall")
        ) {
            squares[ghost.currentIndex].classList.remove(
                ghost.className,
                "ghost",
                "scared-ghost"
            );
            ghost.currentIndex = nextIndex;
            squares[nextIndex].classList.add(ghost.className, "ghost");
        }

        if (ghost.isScared) {
            squares[nextIndex].classList.add("scared-ghost");
        }
    }, ghost.speed);
}

// Inicializar o jogo
const ghosts = [
    new Ghost("blinky", 348, 300),
    new Ghost("pinky", 376, 400),
    new Ghost("inky", 351, 350),
    new Ghost("clyde", 379, 500),
];

document.addEventListener("DOMContentLoaded", () => {
    createBoard();
    updateLivesDisplay();
    updateScoreDisplay();
    ghosts.forEach((ghost) => squares[ghost.currentIndex].classList.add(ghost.className, "ghost"));
    document.addEventListener("keydown", movePacman);
    moveGhosts();
});
