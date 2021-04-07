// Start Game ---------------------------------------------------------------------------------------------------------------------------------------------------------

function startGame() {
    const playButton = document.querySelector('.play');
    const beforeGame = document.querySelector('.beforeGameLayout');
    const play = playButton.addEventListener('click', ()=> {
        beforeGame.style.display = 'none';
        let player1 = playGame(playerName = document.querySelector('.playerDivName input').value, 'X');
        let player2 = playGame(playerName = document.querySelector('.player2Name input').value, 'O');
    })
}

startGame()

// Game Board ---------------------------------------------------------------------------------------------------------------------------------------------------------

const createGameBoard = (() => {
    const gameBoardArray = [];
    const gameBoard = {
        
    }
    const gameLayout = document.querySelector('.gameLayout');
    for(let i=0; i<9; i++) {
        const gameBoardDiv = document.createElement('div');
        gameBoardDiv.classList.add('gameBoardDiv');
        gameLayout.appendChild(gameBoardDiv);
        gameBoard[i] = gameBoardDiv;
        gameBoardArray.push(gameBoard[i].textContent);
    }

    for(let i=0; i < Object.keys(gameBoard).length; i++) {
        gameBoard[i].addEventListener('click', ()=> {
            gameBoard[i].textContent = gameBoardArray[i];
        })
    }

    placeMarker(gameBoardArray)

})();

// Place Marker-----------------------------------------------------------------------------------------------------------------------------------

function placeMarker(gameBoardArray) {
    let markerPlaced = true;
    for(let i=0; i < gameBoardArray.length; i++) {
        if(markerPlaced) {
            gameBoardArray[i] = 'O';
            markerPlaced = false;
        }

        else {
            gameBoardArray[i] = 'X';
            markerPlaced = true;
        }
    }
}

// PLay Game ----------------------------------------------------------------------------------------------------------------------------------------------------------

const playGame = (name, marker) => {
    let testing = console.log({name, marker});
    return (testing)
}







