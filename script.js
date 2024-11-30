let restartButton = document.createElement("button");
let score = 0;
let toWin = 0;
let ghostsEaten = 0;
let lives = 3; // Número inicial de vidas

// Atualizar a exibição dos corações
function updateLivesDisplay() {
  const livesContainer = document.getElementById("lives-container");
  livesContainer.innerHTML = ""; // Limpar o contêiner antes de adicionar os corações
  for (let i = 0; i < lives; i++) {
    const heart = document.createElement("span");
    heart.classList.add("heart");
    heart.textContent = "❤️"; // Adiciona o emoji de coração
    livesContainer.appendChild(heart);
  }
}

function gameOver() {
  alert("Game Over! Você perdeu todas as vidas!");
  // Adiciona a opção de reinício sem recarregar a página
  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart";
  restartButton.classList.add("restart");
  restartButton.addEventListener("click", () => location.reload());
  document.body.appendChild(restartButton);
}

// Quando uma vida é perdida
function loseLife() {
  lives--; // Reduz uma vida
  updateLivesDisplay(); // Atualiza os corações na tela

  if (lives <= 0) {
    gameOver(); // Chama a função de fim de jogo
  }
}

// Função para o fim de jogo
function gameOver() {
  alert("Game Over! Você perdeu todas as vidas!");
  location.reload(); // Reinicia o jogo
}

// Inicializa os corações ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  updateLivesDisplay();
});


document.getElementById("play").addEventListener("click", function game() {
	const scoreDisplay = document.getElementById("score");
	const width = 28; // 28*28 = 784 squares
	const grid = document.querySelector(".grid")
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
		1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,4,4,1,1,1,1,1,1]; 
	// 0 = pac-dot ; 1 = wall ; 2 = ghost-lair ; 3 = power-pellet ; 4 = empty;
	const squares = [];
  
  
function checkCollision() {
  // Suponha que 2 represente o fantasma
  if (squares[pacManCurrentIndex].classList.contains('ghost')) {
    loseLife();
  }
}

function gameLoop() {
    movePacman();
    moveGhosts();
    checkCollision();
}

function resetPositions() {
    pacmanCurrentIndex = pacman.startIndex;
    ghosts.forEach(ghost => {
        ghost.currentIndex = ghost.startIndex;
        ghost.isScared = false; // Restaura o estado original dos fantasmas
    });
}

// Draw the grid
	function createBoard() {
		for (let i = 0; i < layout.length ; i++){
			const square = document.createElement("div");
			grid.appendChild(square);
			squares.push(square);

		// Add layout to the board
			if (layout[i] === 0) {
				squares[i].classList.add("pac-dot");
			} else if (layout[i] === 1) {
				squares[i].classList.add("wall");
			} else if (layout[i] === 2) {
				squares[i].classList.add("ghost-lair");
			} else if (layout[i] === 3) {
				squares[i].classList.add("power-pellet");
			} else if (layout[i] === 4) {
				squares[i].classList.add("empty");
			}
		}
	}
	createBoard();
	
//User's best score
function bestScoreCount(score) {
    const bestScore = Number(localStorage.getItem("bestScore")) || 0;
    if (score > bestScore) {
        localStorage.setItem("bestScore", score);
    }
    document.getElementById("bestScore").textContent = localStorage.getItem("bestScore");
}
  

	
// Starting position of Pac-Man
	let pacmanCurrentIndex = 518;
	squares[pacmanCurrentIndex].classList.add("pac-man");

// Move Pac-Man
	function movePacman (e) {
		squares[pacmanCurrentIndex].classList.remove("pac-man");
		switch(e.keyCode){
			case 37:
				if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains("wall") && !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair")) {
					pacmanCurrentIndex -=1;
					squares[pacmanCurrentIndex].style.transform = "scaleX(-1) rotate(95deg)";
					// If Pac-Man is on the left exit
					if (pacmanCurrentIndex - 1 === 363) {
						pacmanCurrentIndex = 391;
				}}
				break;
			case 38:
				if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains("wall") && !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")) { 
          pacmanCurrentIndex -= width;
					squares[pacmanCurrentIndex].style.transform = "scaleY(1)";
				}
				break;
			case 39:
				if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex +1].classList.contains("wall") && !squares[pacmanCurrentIndex +1].classList.contains("ghost-lair")){ 
          pacmanCurrentIndex += 1;
					squares[pacmanCurrentIndex].style.transform = "scaleY(1) rotate(95deg)";
					// If Pac-Man is on the right exit
					if(pacmanCurrentIndex + 1 === 392) {
						pacmanCurrentIndex = 364;
				}}
				break;
			case 40:
				if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains("wall") && !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")) {
					pacmanCurrentIndex += width;
					squares[pacmanCurrentIndex].style.transform = "rotate(190deg)";
				}
				break;
		}

		squares[pacmanCurrentIndex].classList.add("pac-man");

		pacDotEaten();
		powerPelletEaten();
		checkForGameOver();
		checkForWin();
	}

	document.addEventListener("keydown", movePacman);
  
  // Move Pac-Man on mobile devices (Swipe up-down-left-right)
	var initialX = null;
	var initialY = null;

	function startTouch (e) {
		initialX = e.touches[0].clientX;
		initialY = e.touches[0].clientY;
	} 
	
	function moveTouch (e) {
		
		if (initialX === null){
			return;
		}
		if (initialY === null){
			return;
		}
		
		var currentX = e.touches[0].clientX;
		var currentY = e.touches[0].clientY;
		var diffX = initialX - currentX;
		var diffY = initialY - currentY;
    
		squares[pacmanCurrentIndex].classList.remove("pac-man");
    
		if (Math.abs(diffX) > Math.abs(diffY)){
			if (diffX > 0) {
				// Swipe Left
        if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains("wall") && !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair")) {
					pacmanCurrentIndex -=1;
					squares[pacmanCurrentIndex].style.transform = "scaleX(-1) rotate(95deg)";
					// If Pac-Man is on the left exit
					if (pacmanCurrentIndex - 1 === 363) {
						pacmanCurrentIndex = 391;
				}}
			} else {
				// Swipe Right
				if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex +1].classList.contains("wall") && !squares[pacmanCurrentIndex +1].classList.contains("ghost-lair")){ pacmanCurrentIndex += 1;
					squares[pacmanCurrentIndex].style.transform = "scaleY(1) rotate(95deg)";
					// If Pac-Man is on the right exit
					if(pacmanCurrentIndex + 1 === 392) {
						pacmanCurrentIndex = 364;
				}}
			}
		} else {
			if (diffY > 0){
				// Swipe Up
				if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains("wall") && !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")) { pacmanCurrentIndex -= width;
					squares[pacmanCurrentIndex].style.transform = "scaleY(1)";
				}
			} else {
				// Swipe Down
				if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains("wall") && !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")) {
					pacmanCurrentIndex += width;
					squares[pacmanCurrentIndex].style.transform = "rotate(190deg)";
				}
			}
		}
			squares[pacmanCurrentIndex].classList.add("pac-man");
		initialX = null;
		initialY = null;
		
		e.preventDefault();
	

		pacDotEaten();
		powerPelletEaten();
		checkForGameOver();
		checkForWin();
		
	}
	
	document.querySelector(".grid").addEventListener("touchstart", startTouch, false);
	document.querySelector(".grid").addEventListener("touchmove", moveTouch, false);
  
  

// When Pac-Man eats a Pac-Dot
	function pacDotEaten() {
		if (squares[pacmanCurrentIndex].classList.contains("pac-dot")){
			score++;
			toWin++;
			squares[pacmanCurrentIndex].classList.remove("pac-dot");
		}
		scoreDisplay.innerHTML = score;
	}

// When Pac-Man eats a Power-Pellet
		function powerPelletEaten () {
			if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
				score += 10;
				toWin += 10;
				ghosts.forEach(ghost => ghost.isScared = true);
				setTimeout(unScareGhosts, 7000);
				squares[pacmanCurrentIndex].classList.remove("power-pellet");
			}
			scoreDisplay.innerHTML = score;
		}


// Create Ghost template
	class Ghost {
		constructor(className, startIndex, speed){
			this.className = className;
			this.startIndex = startIndex;
			this.speed = speed;
			this.currentIndex = startIndex;
			this.timerId = NaN;
			this.isScared = false;
		}
	}

	const ghosts = [
		new Ghost("blinky", 348, 290),
		new Ghost("pinky", 376, 380),
		new Ghost("inky", 351, 200),
		new Ghost("clyde", 379, 250)
	]
  
  function eatGhost(ghost) {
    // Remove apenas o fantasma comido do tabuleiro
    squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
    ghost.currentIndex = -1; // Marca o fantasma como "removido" ao colocá-lo fora do tabuleiro
    ghosts = ghosts.filter(g => g.currentIndex !== -1); // Atualiza a lista de fantasmas ativos

    // Verifica vitória após comer um fantasma
    if (ghosts.length === 0) {
        // Vence o jogo apenas quando todos os fantasmas forem comidos
        document.removeEventListener('keydown', movePacman);
        setTimeout(() => alert('Você venceu!'), 500);
    }
}

		
// Give back their colors to the ghosts
	function unScareGhosts () {ghosts.forEach(ghost => ghost.isScared = false)}
	
		
// Draw the ghosts onto the grid
	ghosts.forEach(ghost => {
		squares[ghost.currentIndex].classList.add(ghost.className);
		squares[ghost.currentIndex].classList.add("ghost");
	})

// Move the ghosts 
	ghosts.forEach(ghost => moveGhost(ghost));

	// Atualização da função moveGhost
function moveGhost(ghost) {
    const directions = [-1, +1, width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    let stuckCounter = 0; // Contador para detectar se o fantasma está preso

    ghost.timerId = setInterval(function () {
        const nextPosition = ghost.currentIndex + direction;

        // Verifica se o fantasma pode se mover
        if (
            !squares[nextPosition].classList.contains("ghost") &&
            !squares[nextPosition].classList.contains("wall")
        ) {
            // Remove as classes da posição atual
            squares[ghost.currentIndex].classList.remove(
                ghost.className,
                "ghost",
                "scared-ghost"
            );

            // Atualiza a posição
            ghost.currentIndex = nextPosition;

            // Adiciona as classes na nova posição
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            stuckCounter = 0; // Reseta o contador de "preso"
        } else {
            // Se não puder se mover, escolhe uma nova direção
            direction = directions[Math.floor(Math.random() * directions.length)];
            stuckCounter++;
        }

        // Se o fantasma ficar preso por muito tempo, teleporta para a posição inicial
        if (stuckCounter > 10) {
            squares[ghost.currentIndex].classList.remove(
                ghost.className,
                "ghost",
                "scared-ghost"
            );
            ghost.currentIndex = ghost.startIndex;
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            stuckCounter = 0;
        }

        // Verifica se o fantasma está assustado
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add("scared-ghost");
        }

        // Verifica se Pac-Man comeu o fantasma
        if (
            ghost.isScared &&
            pacmanCurrentIndex === ghost.currentIndex &&
            !ghost.isEaten
        ) {
            // Remove o fantasma do tabuleiro
            squares[ghost.currentIndex].classList.remove(
                ghost.className,
                "ghost",
                "scared-ghost"
            );

            // Incrementa a pontuação e o contador de fantasmas comidos
            score += 100;
            ghostsEaten++;
            scoreDisplay.innerHTML = score;

            // Marca o fantasma como comido
            ghost.isEaten = true;

            // Para o movimento do fantasma
            clearInterval(ghost.timerId);

            // Renasce o fantasma após alguns segundos
          
        }
    }, ghost.speed);
}

// Função para verificar se uma posição é inacessível
function isInaccessible(index) {
    // Define os critérios para posições inacessíveis (ajuste conforme necessário)
    const inaccessibleZones = [/* índices das áreas inacessíveis no mapa */];
    return inaccessibleZones.includes(index);
}

// Check for Game Over
	function checkForGameOver () {
		if (squares[pacmanCurrentIndex].classList.contains("ghost") && !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
			ghosts.forEach(ghost => clearInterval(ghost.timerId));
			document.removeEventListener("keydown", movePacman);
			bestScoreCount();
			scoreDisplay.innerHTML = score;
			let gameOver = document.createElement("div");
			gameOver.classList.add("gameOver");
			document.body.append(gameOver);
			restartButton.classList.add("restart");
			document.body.append(restartButton);
			document.getElementById("play").removeEventListener("click", game);
			restartButton.addEventListener("click", () => {window.location.reload(false)})				
		}	
	}

// Check for Win
function checkForWin() {
    if (ghostsEaten === 4) { // Verifica se todos os 4 fantasmas foram comidos
        ghosts.forEach(ghost => clearInterval(ghost.timerId)); // Para todos os movimentos dos fantasmas
        document.removeEventListener("keydown", movePacman); // Remove o controle do Pac-Man
        bestScoreCount(); // Salva a pontuação
        scoreDisplay.innerHTML = score; // Atualiza o placar final

        // Mostra a mensagem de vitória
        let youWon = document.createElement("div");
        youWon.classList.add("won");
        youWon.textContent = "Você venceu!";
        document.body.append(youWon);

        // Botão de reinício
        restartButton.classList.add("restart");
        document.body.append(restartButton);
        document.getElementById("play").removeEventListener("click", game);
        restartButton.addEventListener("click", () => {
            window.location.reload(false);
        });
    }
}
}) 
