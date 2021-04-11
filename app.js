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

// startGame()


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
            // let emptySpaces = [];
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
                        // if(player2Name !== 'Jerry') {
                            gameBoardArray.push(player2Marker)
                            gameBoard[i].textContent = gameBoardArray[gameBoardArray.length - 1]
                            turnTeller.textContent = `${player1Name}, Make Your Move`;
                            addedOnce = null;
                            turn = true;
                        // }
                        
                    }
                    winner(gameBoard, player1Name, player2Name, player1Marker, player2Marker, gameBoardArray)
                })
                
                // if(player2Name === 'Jerry') {
                //     if(gameBoard[i].textContent === '') {
                //         emptySpaces.push(gameBoard[i])
                //         console.log(emptySpaces)
                //     }
                // }
            }

        }
        creatingAI(gameBoard, gameBoardArray)
    
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
        if(player1Name === '') {
            winner.textContent = `Player 1 Won!`;
        }
        else {
            winner.textContent = `${player1Name} Won!`;
        }
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

        else if(gameBoardArray.length === 9 && winner.textContent !== `${player1Name} Won!` && winner.textContent !== `${player2Name} Won!` && winner.textContent !== `Player 1 Won!`) {
            tie()
        }
    }

    restart.addEventListener('click', ()=> {
        location.reload();
        return false;
    });
}


// AI STUFF -------------------------------------------------------------------------------------------------------------------------------------------------
let current = 0;
function creatingAI(board, boardArray) {
    const playerDivImg = document.querySelectorAll('.playerDivImg img');
    const changeImg = Array.from(playerDivImg);
    const profileImages = ['images/player2Icon.gif','images/jerry.gif'];
    const rightArrow = document.querySelector('.rightArrow');
    const leftArrow = document.querySelector('.leftArrow');
    const input = document.querySelector('.player2Name input');
    const aiName = document.querySelector('.aiName');
    const playBtn = document.querySelector('.play');
    const fight = document.querySelector('.fight');
    // let current = 0;
    fight.addEventListener('click', ()=> {
        jerry(aiName.textContent, board, boardArray)
    })
    changeImg[1].src = profileImages[0];
    rightArrow.addEventListener('click', ()=> {
        if(current === 1) {
            current = -1;
        }
        if(current == -1) {
            input.style.display = 'block';
            aiName.style.display = 'none';
            playBtn.style.display = 'block';
            fight.style.display = 'none';
        }
        else {
            input.style.display = 'none';
            aiName.style.display = 'inline-block';
        }
        switch(current) {
            case 0:
                aiName.textContent = 'Jerry the Mouse';
                input.style.display = 'none';
                playBtn.style.display = 'none';
                fight.style.display = 'block';
                // jerry(aiName.textContent, board)
                break;
            // case 1:
            //     aiName.textContent = 'Tom the Cat';
            //     playBtn.style.display = 'none';
            //     fight.style.display = 'block';
            //     break;
            // case 2:
            //     aiName.textContent = 'Spike the Killer';
            //     playBtn.style.display = 'none';
            //     fight.style.display = 'block';
            //     break;
        }
        current++
        changeImg[1].src = profileImages[current];
        // fight.addEventListener('click', ()=> {
        //     jerry(aiName.textContent, board)
        // })
        // jerry(aiName.textContent, board)
        // tom(aiName.textContent)
        // spike(aiName.textContent)
    });

    leftArrow.addEventListener('click', ()=> {
        if(current === 0) {
            current = 2
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
                playBtn.style.display = 'block';
                fight.style.display = 'none';
                break;
            case 2:
                aiName.textContent = 'Jerry the Mouse'
                playBtn.style.display = 'none';
                fight.style.display = 'block';
                // jerry(aiName.textContent, board)
                break;
            // case 3:
            //     aiName.textContent = 'Tom the Cat'
            //     playBtn.style.display = 'none';
            //     fight.style.display = 'block';
            //     break;
            // case 4:
            //     aiName.textContent = 'Spike the Killer'
            //     playBtn.style.display = 'none';
            //     fight.style.display = 'block';
        }
        current--
        changeImg[1].src = profileImages[current]
        // fight.addEventListener('click', ()=> {
        //     jerry(aiName.textContent, board)
        // })
        // jerry(aiName.textContent, board)
        // tom(aiName.textContent)
        // spike(aiName.textContent)
    })
    
}

// creatingAI()


function jerry(name, board, boardArray) {
    if(name === 'Jerry the Mouse') {
        const jerry = playerFactory('Jerry', 'O');
        const fight = document.querySelector('.fight')
        const beforeGame = document.querySelector('.beforeGameLayout');
        const gameLayout = document.querySelector('.gameLayout');
        gameLayout.style.display = 'none';
        // let turn = true;
        // let addedOnce = false;
        
        // fight.addEventListener('click', ()=> {
            let turn = true;
            let addedOnce = false;
            let boardArray = []
            beforeGame.style.display = 'none';
            gameLayout.style.display = 'grid';
            let player1 = playerFactory(playerName = document.querySelector('.playerDivName input').value, 'X');
            if(player1.name === '') {
                player1.name = 'Player 1'
            }


                for(let i=0; i<Object.keys(board).length; i++) {
                    // let turn = true;
                    // let addedOnce = false;
                    board[i].addEventListener('click', ()=> {
                            if(board[i].textContent === '') {
                            turn = false;
                            addedOnce = true;
                            boardArray.push('X')
                            board[i].textContent = 'X'
                            jerryMove()
                            }
            
                    });
                        
                }

            function jerryMove() {
                let emptySpaces = []
                let emptyBoard = []
                for(let i=0; i<Object.keys(board).length; i++) {
                    if(board[i].textContent === '') {
                        emptySpaces.push(board[i])
                    }
                }
                for(let i=0; i<emptySpaces.length; i++) {
                    emptyBoard[i] = emptySpaces[i]
                }
                const randomJerryMove = Math.floor(Math.random() * emptySpaces.length);
                if(emptySpaces.length !== 0) {
                    emptyBoard[randomJerryMove].textContent = 'O'
                    boardArray.push(emptyBoard[randomJerryMove].textContent)
                }
                
                // else {
                //     boardArray.length = 9
                // }
                winner(board, playerName = document.querySelector('.playerDivName input').value, jerry.name, 'X', 'O', boardArray)
            }            
        
    }
}

// function tom(name) {
//     if(name === 'Tom the Cat') {
//         const tom = playerFactory('Tom', 'O');
        
//     }
// }

// function spike(name) {
//     if(name === 'Spike the Killer') {
//         const spike = playerFactory('Spike', 'O');
        
//     }
// }




startGame()