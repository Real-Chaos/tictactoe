function createPlayer(name, marker) {
  return { name, marker }
}

const gameBoard = {
  board: [],
  boardDOM: Array.from(document.querySelectorAll('.game-board div')),
  boardEventListener: function (func) {
    this.boardDOM.forEach((div) => {
      div.addEventListener('click', (e) => {
        func(e, div)
      })
    })
  },
  clearBoard: function () {
    this.board = []
  },
}

const playerObject = {
  playerX: createPlayer('Player X', 'X'),
  playerO: createPlayer('Player O', 'O'),
  playerTurn: '',
  playerTurnDom: document.querySelector('.player-turn'),
  checkPlayerTurn: function () {
    const { board } = gameBoard
    if (board.length === 0) this.playerTurn = this.playerX
    else if (board.length > 0 && board[board.length - 1] === 'X') {
      this.playerTurn = this.playerO
    } else this.playerTurn = this.playerX
    return this.playerTurn
  },
  changePlayerTurnDom: function() {this.playerTurnDom.textContent = this.playerTurn}
}

const gameFlow = {
  winner: null,
  winningCases: {
    case1: [0, 1, 2],
    case2: [3, 4, 5],
    case3: [6, 7, 8],
    case4: [0, 3, 6],
    case5: [1, 4, 7],
    case6: [2, 5, 8],
    case7: [0, 4, 8],
    case8: [2, 4, 6],
  },
  indexOfX: [],
  indexOfO: [],

  checkWinner: function (marker, index, board) {
    marker === 'X'
      ? this.indexOfX.push(Number(index))
      : this.indexOfO.push(Number(index))

    const checker = (arr, target) => target.every((c) => arr.includes(c))

    for (keys in this.winningCases) {
      const checkForX = checker(this.indexOfX, this.winningCases[keys])
      const checkForO = checker(this.indexOfO, this.winningCases[keys])

      if (checkForX) {
        this.winner = playerObject.playerX.name
        return this.winner
      } else if (checkForO) {
        this.winner = playerObject.playerO.name
        return this.winner
      } else if (board.length === 9) {
        this.winner = 'Nobody'
        return this.winner
      }
    }
  },

  restartBtn: document.querySelector('.restart-btn'),

  restart: function () {
    this.winner = null
    gameBoard.clearBoard()
    this.indexOfX = []
    this.indexOfO = []
    playerObject.playerTurn = playerObject.playerX
    playerObject.changePlayerTurnDom()

    gameBoard.boardDOM.forEach((div) => {
      div.textContent = ''
    })
    playerObject.playerTurnDom.textContent = playerObject.playerTurn.name
  },
}

const addMarker = (function () {
  const addMarkerDOM = (e, div) => {
    if (
      gameBoard.board.length < 9 &&
      div.textContent.length < 1 &&
      gameFlow.winner === null
    ) {
      const playerTurn = playerObject.checkPlayerTurn()
      gameBoard.board.push(playerTurn.marker)
      div.textContent = playerTurn.marker
      const winner = gameFlow.checkWinner(
        div.textContent,
        div.getAttribute('data-index'),
        gameBoard.board
      )
      handleTurnsDOM()
    } else if (gameFlow.winner !== null) {
      const winner = gameFlow.checkWinner(
        div.textContent,
        div.getAttribute('data-index'),
        gameBoard.board
      )
    }
  }
  gameBoard.boardEventListener(addMarkerDOM)
})()

const handleTurnsDOM = () => {
  if (gameFlow.winner) {
    playerObject.playerTurnDom.textContent = `${gameFlow.winner} won!`
  } else {
    playerObject.playerTurnDom.textContent = playerObject.checkPlayerTurn().name
  }
}

const restartGame = (function () {
  gameFlow.restartBtn.addEventListener('click', () => gameFlow.restart())
})()
