import Button from './Button'
import PlayBoard from './PlayBoard'
import { ScoreBoard } from './ScoreBoard'
import styles from './TicTacToe.module.css'
import { useEffect, useState } from 'react'

const WINNING_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
export const TicTacToe = () => {

    const [board, setBoard] = useState(() => {
        const boardFromLocalStorage = localStorage.getItem('board')
        if (!boardFromLocalStorage) return Array(9).fill(null)
        return JSON.parse(boardFromLocalStorage)
    })

    const [playerXTurn, setPlayerXTurn] = useState(() => {
        const playerXTurnFromLocalStorage = localStorage.getItem('playerXTurn')
        if (!playerXTurnFromLocalStorage) return true
        return JSON.parse(playerXTurnFromLocalStorage)
    })

    const [waitingForNewRound, setWaitingForNewRound] = useState(() => {
        const waitingForNewRoundFromLocalStorage = localStorage.getItem('waitingForNewRound')
        if (!waitingForNewRoundFromLocalStorage) return false
        return JSON.parse(waitingForNewRoundFromLocalStorage)
    })

    const [draw, setDraw] = useState(() => {
        const drawFromLocalStorage = localStorage.getItem('draw')
        if (!drawFromLocalStorage) return false
        return JSON.parse(drawFromLocalStorage)
    })

    const [scores, setScores] = useState(() => {
        const scoresFromLocalStorage = localStorage.getItem('scores')
        if (!scoresFromLocalStorage) return { playerXScore: 0, playerOScore: 0 }
        return JSON.parse(scoresFromLocalStorage)
    })

    const resetGame = () => {
        setPlayerXTurn(true)
        setBoard(Array(9).fill(null))
        setScores({
            playerXScore: 0,
            playerOScore: 0
        })
        setWaitingForNewRound(false)
        setDraw(false)
    }

    const resetBoard = () => {
        setBoard(Array(9).fill(null))
        setWaitingForNewRound(false)
        setDraw(false)
    }

    const updateScore = () => {
        if (waitingForNewRound) return
        if (playerXTurn) {
            setScores(prevState => {
                return ({ ...prevState, playerXScore: prevState.playerXScore + 1 })
            })
        } else {
            setScores(prevState => {
                return ({ ...prevState, playerOScore: prevState.playerOScore + 1 })
            })
        }
        setWaitingForNewRound(true)
    }

    const checkIfWin = (board) => {
        WINNING_CONDITIONS.forEach((item, i) => {
            const [x, y, z] = item
            if (board[x] && board[x] === board[y] && board[y] === board[z]) {
                updateScore()
            }
        })
    }

    const handleClick = (id) => {
        if (waitingForNewRound) return
        if (board[id]) return
        const updatedBoard = board.map((item, i) => {
            if (i === id && !item) return playerXTurn ? 'X' : 'O'
            return item
        })
        checkIfWin(updatedBoard)
        setBoard(updatedBoard)
        setPlayerXTurn(prevState => !prevState)
        if (handleDraw(updatedBoard)) setDraw(true)
    }

    const handleDraw = (board) => {
        const boardHasNullElement = board.every(element => element !== null)
        return boardHasNullElement
    }

    useEffect(() => {
        localStorage.setItem('board', JSON.stringify(board))
        localStorage.setItem('playerXTurn', JSON.stringify(playerXTurn))
        localStorage.setItem('waitingForNewRound', JSON.stringify(waitingForNewRound))
        localStorage.setItem('draw', JSON.stringify(draw))
        localStorage.setItem('scores', JSON.stringify(scores))
    }, [board, playerXTurn, waitingForNewRound, draw, scores])

    return (
        <div>
            <ScoreBoard scores={scores} currentPlayer={playerXTurn} waitingForNewRound={waitingForNewRound} draw={draw} />
            <PlayBoard board={board} handleClick={handleClick} />
            <div className={styles.buttonsWrapper}>
                <Button onClick={resetBoard} background={'#ad7b1b'}>Reset board</Button>
                <Button onClick={resetGame} background={'#8b0000'}>End game</Button>
            </div>
        </div>
    )
}

export default TicTacToe
