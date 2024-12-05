let restartButton = document.createElement("button");
let toWin = 0;
let ghostsEaten = 0; // Contador de fantasmas comidos
// Variáveis para armazenar o tempo e o melhor tempo
let startTime;  // Hora de início do jogo
let gameTime = 0;  // Tempo de jogo em segundos

// Função que atualiza o tempo de jogo
function updateGameTime() {
    gameTime = Math.floor((Date.now() - startTime) / 1000);  // Calcula o tempo de jogo em segundos
    document.getElementById('score').innerText = gameTime;  // Atualiza o tempo no elemento da tela
}

// Função para iniciar o jogo
function startGame() {
    startTime = Date.now();  // Registra o momento em que o jogo começa
    gameTime = 0;  // Reinicia o tempo de jogo
    updateGameTime();  // Atualiza o tempo na tela imediatamente
    setInterval(updateGameTime, 1000);  // Atualiza o tempo a cada segundo enquanto o jogo estiver em andamento
}

document.getElementById("play").addEventListener("click", function game() {
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
		4,4,4,4,4,1,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,1,4,4,4,4,4,
		1,1,1,1,1,1,0,1,1,1,0,1,0,0,0,0,1,0,1,1,1,0,1,1,1,1,1,1,
		1,1,1,1,1,1,0,1,4,1,0,0,0,0,0,0,0,0,1,4,1,0,0,0,0,0,5,1,
		1,1,1,1,1,1,0,1,1,1,0,1,0,0,0,0,1,0,1,1,1,0,1,1,1,1,1,1,
		4,4,4,4,4,1,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,1,4,4,4,4,4,
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
  let targetIndex = layout.indexOf(5); // Encontrar a posição de special-area (onde o valor é 5)
	const squares = [];
  
  
  // Variáveis de tempo
let startTime = Date.now(); // Marca o início do jogo
let gameTime = 0; // Variável para armazenar o tempo de jogo

      // Função para calcular o tempo de jogo
    function updateGameTime() {
        gameTime = Math.floor((Date.now() - startTime) / 1000); // Tempo em segundos
        document.getElementById('score').innerText = gameTime;  // Atualiza o tempo no elemento com id="score"
    }

    // Chame a função `startGame()` quando o jogo começar
    startGame();  // Inicia o jogo e começa a contagem do tempo


function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement("div");
        grid.appendChild(square);
        squares.push(square);

        // Adicionando classes ao grid conforme o layout
        if (layout[i] === 0) {
            squares[i].classList.add("pac-dot");
        } else if (layout[i] === 1) {
            squares[i].classList.add("wall");
        } else if (layout[i] === 2) {
            squares[i].classList.add("ghost-lair");
            totalGhosts++; // Conta o número de fantasmas no início
        } else if (layout[i] === 3) {
            squares[i].classList.add("power-pellet");
        } else if (layout[i] === 4) {
            squares[i].classList.add("empty");
        } else if (layout[i] === 5) {
            squares[i].classList.add("special-area");
        }
    }
}
createBoard();

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
  
  // Iniciar o jogo ao clicar no botão de play
document.getElementById('play').addEventListener('click', function() {
    startGame();
    // Adicionar outras inicializações do jogo aqui, como a posição inicial do Pac-Man
});
	
// Starting position of Pac-Man
	let pacmanCurrentIndex = 518;
	squares[pacmanCurrentIndex].classList.add("pac-man");

// Move Pac-Man
	function movePacman (e) {
    // Função para mover Pac-Man (exemplo)
function movePacMan(direction) {
    // Lógica de movimento de Pac-Man (dependendo da direção)
    // Atualize a posição de Pac-Man aqui

    // Verifique se Pac-Man chegou à special-area
    const pacManPosition = getPacManPosition(); // Função que retorna a posição atual do Pac-Man
    if (layout[pacManPosition] === 5) {
        pacManInSpecialArea = true;
    }
  if (pacmanCurrentIndex === targetIndex && ghostsEaten === totalGhosts) {
        showVictoryMessage();  // Exibe a vitória com o tempo
    }

    checkWinCondition(); // Verificar condição de vitória
    updateGameTime();
}

    
    // Chame a função `startGame()` quando o jogo começar
document.getElementById('play').addEventListener('click', function() {
    startGame();  // Inicia o jogo
    this.style.display = 'none';  // Esconde o botão de início
    document.getElementById('footer').style.display = 'none';  // Esconde o rodapé
    document.getElementById('mobile').style.display = 'none';  // Esconde a mensagem mobile
});
    
    function moveToNextPosition(newIndex) {
    pacmanCurrentIndex = newIndex;
    movePacMan();  // Verifica se o Pac-Man chegou à vitória após o movimento
}
    
    // Função fictícia para pegar a posição do Pac-Man (baseado na sua lógica)
function getPacManPosition() {
    // Retorne a posição atual de Pac-Man no layout
    return pacManPositionIndex; // Substitua por seu cálculo
}
    
// Função para verificar a condição de vitória
function checkWinCondition() {
    if (ghostsEaten === totalGhosts && pacManInSpecialArea) {
        alert("Você ganhou!");
        // Pode adicionar lógica para reiniciar o jogo ou dar outra recompensa
    }
}

		squares[pacmanCurrentIndex].classList.remove("pac-man");
		switch(e.keyCode){
			case 37:
				if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains("wall") && !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair")) {
					pacmanCurrentIndex -=1;
					squares[pacmanCurrentIndex].style.transform = "scaleX(-1) rotate(0deg)";
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
					squares[pacmanCurrentIndex].style.transform = "scaleY(1) rotate(0deg)";
					// If Pac-Man is on the right exit
					if(pacmanCurrentIndex + 1 === 392) {
						pacmanCurrentIndex = 364;
				}}
				break;
			case 40:
				if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains("wall") && !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")) {
					pacmanCurrentIndex += width;
					squares[pacmanCurrentIndex].style.transform = "rotate(0deg)";
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
					squares[pacmanCurrentIndex].style.transform = "scaleX(-1) rotate(0deg)";
					// If Pac-Man is on the left exit
					if (pacmanCurrentIndex - 1 === 363) {
						pacmanCurrentIndex = 391;
				}}
			} else {
				// Swipe Right
				if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex +1].classList.contains("wall") && !squares[pacmanCurrentIndex +1].classList.contains("ghost-lair")){ pacmanCurrentIndex += 1;
					squares[pacmanCurrentIndex].style.transform = "scaleY(1) rotate(0deg)";
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
					squares[pacmanCurrentIndex].style.transform = "rotate(00deg)";
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
			toWin++;
			squares[pacmanCurrentIndex].classList.remove("pac-dot");
		}
	}

// When Pac-Man eats a Power-Pellet
		function powerPelletEaten () {
			if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
				toWin += 10;
				ghosts.forEach(ghost => ghost.isScared = true);
				setTimeout(unScareGhosts, 7000);
				squares[pacmanCurrentIndex].classList.remove("power-pellet");
			}
		}


// Create Ghost template

class Ghost {
	constructor(className, startIndex, speed) {
		this.className = className;
		this.startIndex = startIndex;
		this.speed = speed;
		this.currentIndex = startIndex;
		this.timerId = NaN;
		this.isScared = false;
		this.isRemoved = false; // Estado para verificar se o fantasma foi removido
	}
}

const ghosts = [
	new Ghost("blinky", 348, 290),
	new Ghost("pinky", 376, 380),
	new Ghost("inky", 351, 200),
	new Ghost("clyde", 379, 250),
];
const totalGhosts = ghosts.length; // Número total de fantasmas
  
  // Função para simular a ação de Pac-Man comer fantasmas
function eatGhost(pacManPosition) {
    const ghostPosition = layout[pacManPosition];

    if (ghostPosition === 2) { // Verifica se Pac-Man está na posição de um fantasma
        layout[pacManPosition] = 4; // Remover fantasma do layout
        ghostsEaten++; // Incrementa a contagem de fantasmas comidos
        updateGrid(); // Atualiza o grid após comer o fantasma
    }
}

// Give back their colors to the ghosts
function unScareGhosts() {
	ghosts.forEach(ghost => {
		if (!ghost.isRemoved) {
			ghost.isScared = false;
		}
	});
}

// Draw the ghosts onto the grid
ghosts.forEach(ghost => {
	if (!ghost.isRemoved) {
		squares[ghost.currentIndex].classList.add(ghost.className);
		squares[ghost.currentIndex].classList.add("ghost");
	}
});

// Move the ghosts
ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost) {
	const directions = [-1, +1, width, -width];
	let direction = directions[Math.floor(Math.random() * directions.length)];

	ghost.timerId = setInterval(function () {
		if (ghost.isRemoved) {
			clearInterval(ghost.timerId); // Para o movimento se o fantasma foi removido
			return;
		}

		if (
			!squares[ghost.currentIndex + direction].classList.contains("ghost") &&
			!squares[ghost.currentIndex + direction].classList.contains("wall")
		) {
			// Remove as classes do fantasma da posição atual
			squares[ghost.currentIndex].classList.remove(ghost.className);
			squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");

			// Move para a nova posição
			ghost.currentIndex += direction;
			squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
		} else if (ghost.currentIndex - 1 === 363) {
			// Teletransporte do túnel esquerdo
			squares[ghost.currentIndex].classList.remove(ghost.className, "ghost");
			ghost.currentIndex = 391;
			squares[ghost.currentIndex].classList.add("ghost");
		} else if (ghost.currentIndex + 1 === 392) {
			// Teletransporte do túnel direito
			squares[ghost.currentIndex].classList.remove(ghost.className, "ghost");
			ghost.currentIndex = 364;
			squares[ghost.currentIndex].classList.add("ghost");
		} else {
			// Escolhe uma nova direção aleatória
			direction = directions[Math.floor(Math.random() * directions.length)];
		}

		// Adiciona a classe "scared-ghost" se o fantasma estiver assustado
		if (ghost.isScared) {
			squares[ghost.currentIndex].classList.add("scared-ghost");
		}

		// Lógica ao comer um fantasma assustado
		if (
			ghost.isScared &&
			squares[pacmanCurrentIndex].classList.contains(ghost.className)
		) {
			// Remove apenas o fantasma comido
			squares[ghost.currentIndex].classList.remove(
				ghost.className,
				"ghost",
				"scared-ghost"
			);
			ghost.isRemoved = true; // Marca o fantasma como removido
			clearInterval(ghost.timerId); // Para o movimento do fantasma

			ghostsEaten++; // Incrementa o contador de fantasmas comidos
			checkForWin(); // Verifica se a vitória foi alcançada
		}

		checkForGameOver();
	}, ghost.speed);
}

// Lógica do Pac-Man para verificar se a vitória foi alcançada
document.addEventListener("keydown", function (e) {
	// Sua lógica de movimento do Pac-Man

	// Se o Pac-Man alcançar a posição 5 e já tiver comido todos os fantasmas
	if (pacmanCurrentIndex === targetIndex && ghostsEaten === totalGhosts) {
		// O Pac-Man ganha se atingir o ponto 5 e todos os fantasmas forem comidos
		showVictoryMessage(); // Exibe a vitória
	}
});

  // Função para mover o robô até a posição 5 no layout
function movePacmanToTarget() {
	let moveInterval = setInterval(() => {
		// Verifica se o Pac-Man já está na posição alvo
		if (pacmanCurrentIndex === targetIndex) {
			clearInterval(moveInterval); // Para o movimento automático

			// Exibe a mensagem de vitória
			showVictoryMessage();
		} else {
			// Calcula o próximo movimento do Pac-Man
			if (pacmanCurrentIndex > targetIndex) {
				pacmanCurrentIndex -= width; // Move para cima
			} else if (pacmanCurrentIndex < targetIndex) {
				pacmanCurrentIndex += width; // Move para baixo
			}

			// Atualiza a posição do Pac-Man no grid
			squares.forEach(square => square.classList.remove("pacman"));
			squares[pacmanCurrentIndex].classList.add("pacman");
		}
	}, 200); // Ajuste a velocidade conforme necessário
}

// Função para mostrar a vitória e o melhor tempo
function showVictoryMessage() {
    // Verifica se o tempo de jogo é melhor que o melhor tempo armazenado
    if (bestTime === null || gameTime < bestTime) {
        bestTime = gameTime; // Atualiza o melhor tempo
        localStorage.setItem('bestTime', bestTime); // Armazena o novo melhor tempo no localStorage
    }

    // Exibe a mensagem de vitória
    alert(`Parabéns, você venceu! Tempo de jogo: ${gameTime} segundos`);

}
  
// Check for Game Over
	function checkForGameOver () {
		if (squares[pacmanCurrentIndex].classList.contains("ghost") && !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
			ghosts.forEach(ghost => clearInterval(ghost.timerId));
			document.removeEventListener("keydown", movePacman);
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
// Função para verificar vitória
function checkForWin() {
	// Se todos os fantasmas foram comidos e o Pac-Man está na posição 5
	if (ghostsEaten === totalGhosts && pacmanCurrentIndex === targetIndex) {
		// Para o movimento de todos os fantasmas
		ghosts.forEach(ghost => clearInterval(ghost.timerId));
    clearInterval(updateGameTime);
    console.log("Tempo de jogo finalizado:", gameTime, "segundos");

		// Exibe a mensagem de vitória
		showVictoryMessage();
	}
}
  
// Função para exibir a mensagem de vitória
// Função para mostrar a vitória e o melhor tempo
// Função para mostrar a mensagem de vitória
function showVictoryMessage() {
    const winMessage = document.createElement('div');
    winMessage.innerText = `Você venceu! Tempo: ${gameTime} segundos`;
    document.body.appendChild(winMessage);
    let youWon = document.createElement("div");
			youWon.classList.add("won");
			document.body.append(youWon);
			restartButton.classList.add("restart");
			document.body.append(restartButton);
			document.getElementById("play").removeEventListener("click", game);
			restartButton.addEventListener("click", () => {window.location.reload(false)})
}

// Função para salvar o melhor tempo
function saveBestTime() {
    if (!bestTime || gameTime < bestTime) {
        localStorage.setItem('bestTime', gameTime);
        bestTime = gameTime;
    }
}


}) 
