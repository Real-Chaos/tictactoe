// Start Game ---------------------------------------------------------------------------------------------------------------------------------------------------------

function startGame() {
    const playButton = document.querySelector('.play');
    const beforeGame = document.querySelector('.beforeGameLayout');
    const gameLayout = document.querySelector('.gameLayout');
    gameLayout.style.display = 'none';
    const play = playButton.addEventListener('click', ()=> {
        beforeGame.style.display = 'none';
        let player1 = playerFactory(playerName = document.querySelector('.playerDivName input').value, 'X');
        let player2 = playerFactory(playerName = document.querySelector('.player2Name input').value, 'O');
        if(player1.name === '') {
            player1.name = 'Player 1'
        }
        if(player2.name === '') {
            player2.name = 'Player 2'
        }
        gameLayout.style.display = 'grid';
        createGameBoard.placeMarker(player1.name, player2.name, player1.marker, player2.marker);
        
    });
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
    }

    const placeMarker = (player1Name, player2Name, player1Marker, player2Marker) => {
            let turn = true;
            // let addedOnce = false;
            const turnTeller = document.querySelector('.turnTeller');
            for(let i=0; i < Object.keys(gameBoard).length; i++) {
                turnTeller.textContent = `${player1Name}, Make Your Move`;
                let addedOnce = false;
                gameBoard[i].addEventListener('click', ()=> {
                    if(turn === true && addedOnce === false) {
                        gameBoardArray.push(player1Marker)
                        gameBoard[i].textContent = gameBoardArray[gameBoardArray.length - 1]
                        turnTeller.textContent = `${player2Name}, Make Your Move`;
                        // console.log(gameBoardArray)
                        turn = false;
                        addedOnce = true;
                        
                    }

                    else if(turn === false && addedOnce === false) {
                        gameBoardArray.push(player2Marker)
                        gameBoard[i].textContent = gameBoardArray[gameBoardArray.length - 1]
                        turnTeller.textContent = `${player1Name}, Make Your Move`;
                        // console.log(gameBoardArray);
                        addedOnce = null;
                        turn = true;
                       
                    }
                    winner(gameBoard, player1Name, player2Name, player1Marker, player2Marker, gameBoardArray)
                })
            }

        }
        creatingAI(gameBoard)
    
return {placeMarker}
})();


const playerFactory = (name, marker, img) => {
    return {name, marker}
}

function winner(gameBoard, player1Name, player2Name, player1Marker, player2Marker, gameBoardArray) {
    const winner = document.querySelector('.winner');
    const gameLayout = document.querySelector('.gameLayout');
    const turnTeller = document.querySelector('.turnTeller');
    const restart = document.querySelector('.restart')
    winner.textContent = '';

    function afterWin() {
        gameLayout.style.display = 'none';
        turnTeller.style.display = 'none';
        restart.style.display = 'block';
    }

    function player1Won() {
        winner.textContent = `${player1Name} Won!`;
        afterWin()
    }

    function player2Won() {
        winner.textContent = `${player2Name} Won!`;
        afterWin()
    }

    function tie() {
        winner.textContent = `Tie!`;
        afterWin();
    }

    let winningConditions = [
        [gameBoard[0].textContent, gameBoard[1].textContent, gameBoard[2].textContent],
        [gameBoard[3].textContent, gameBoard[4].textContent, gameBoard[5].textContent],
        [gameBoard[6].textContent, gameBoard[7].textContent, gameBoard[8].textContent],
        [gameBoard[0].textContent, gameBoard[4].textContent, gameBoard[8].textContent],
        [gameBoard[2].textContent, gameBoard[4].textContent, gameBoard[6].textContent],
        [gameBoard[0].textContent, gameBoard[3].textContent, gameBoard[6].textContent],
        [gameBoard[1].textContent, gameBoard[4].textContent, gameBoard[7].textContent],
        [gameBoard[2].textContent, gameBoard[5].textContent, gameBoard[8].textContent]
    ]

    for(let i=0; i<winningConditions.length; i++) {

       let checkWinnerPlayer1 = winningConditions[i].filter(x => x === player1Marker);
       let checkWinnerPlayer2 = winningConditions[i].filter(x => x === player2Marker);

       if(checkWinnerPlayer1.length === 3 && gameBoardArray.length <= 9) {
            player1Won()
       }

       else if(checkWinnerPlayer2.length === 3 && gameBoardArray.length <= 9) {
            player2Won()
        }

        else if(gameBoardArray.length === 9 && winner.textContent !== `${player1Name} Won!` && winner.textContent !== `${player2Name} Won!`) {
            tie()
        }
    }

    restart.addEventListener('click', ()=> {
        location.reload();
        return false;
    });
}


// AI STUFF -------------------------------------------------------------------------------------------------------------------------------------------------

function creatingAI(board) {
    const playerDivImg = document.querySelectorAll('.playerDivImg img');
    const changeImg = Array.from(playerDivImg);
    const profileImages = ['images/player2Icon.gif','images/jerry.gif', 'images/tom.gif', 'images/spike.gif'];
    const rightArrow = document.querySelector('.rightArrow');
    const leftArrow = document.querySelector('.leftArrow');
    const input = document.querySelector('.player2Name input');
    const aiName = document.querySelector('.aiName')
    let current = 0;
    changeImg[1].src = profileImages[0];
    rightArrow.addEventListener('click', ()=> {
        if(current === 3) {
            current = -1;
        }
        if(current == -1) {
            input.style.display = 'block';
            aiName.style.display = 'none';
        }
        else {
            input.style.display = 'none';
            aiName.style.display = 'inline-block';
        }
        switch(current) {
            case 0:
                aiName.textContent = 'Jerry the Mouse';
                input.style.display = 'none';
                break;
            case 1:
                aiName.textContent = 'Tom the Cat';
                break;
            case 2:
                aiName.textContent = 'Spike the Killer';
                break;
        }
        current++
        changeImg[1].src = profileImages[current];
        jerry(aiName.textContent, board)
        tom(aiName.textContent)
        spike(aiName.textContent)
    });

    leftArrow.addEventListener('click', ()=> {
        if(current === 0) {
            current = 4
        }
        if(current == -1) {
            input.style.display = 'block';
        }
        else {
            input.style.display = 'none';
            aiName.style.display = 'inline-block';
        }
        switch(current) {
            case 1:
                input.style.display = 'block'
                aiName.style.display = 'none'
                break;
            case 2:
                aiName.textContent = 'Jerry the Mouse'
                break;
            case 3:
                aiName.textContent = 'Tom the Cat'
                break;
            case 4:
                aiName.textContent = 'Spike the Killer'
        }
        current--
        changeImg[1].src = profileImages[current]
        jerry(aiName.textContent, board)
        tom(aiName.textContent)
        spike(aiName.textContent)
    })
    
}

// creatingAI()


function jerry(name, board) {
    if(name === 'Jerry the Mouse') {
        const jerry = playerFactory('Jerry', 'O');
        for(let i=0; i<Object.keys(board).length; i++) {
            board[i].addEventListener('click', ()=> {
                board[i].textContent = 'B';
                console.log('hi')
            })
        }
    }
}

function tom(name) {
    if(name === 'Tom the Cat') {
        const tom = playerFactory('Tom', 'O');
        
    }
}

function spike(name) {
    if(name === 'Spike the Killer') {
        const spike = playerFactory('Spike', 'O');
        
    }
}




